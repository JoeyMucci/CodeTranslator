import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import FeedbackForm from './FeedbackForm'

describe('FeedbackForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeedbackForm />)
    }).not.toThrow()
  })

  it('does not submit when required fields are empty', async () => {
    const onSubmit = jest.fn()

    render(<FeedbackForm onSubmit={onSubmit} />)

    const submitButton = screen.getByText('Submit')

    await waitFor(() => userEvent.click(submitButton))

    expect(screen.getByText('name is required')).toBeInTheDocument()
    expect(screen.getByText('email is required')).toBeInTheDocument()
    expect(screen.getByText('message is required')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits when valid fields are entered', async () => {
    const name = 'My Name'
    const email = 'valid@email.com'
    const message = "No suggestions, it's perfect!"

    const onSubmit = jest.fn()

    render(<FeedbackForm onSubmit={onSubmit} />)

    const nameField = screen.getByPlaceholderText('John Smith')
    const emailField = screen.getByPlaceholderText('john.smith@gmail.com')
    const messageField = screen.getByPlaceholderText(
      'Please submit any issue or feedback here. We like to gain information on how we can improve our product'
    )
    const submitButton = screen.getByText('Submit')

    await waitFor(() => userEvent.type(nameField, name))
    await waitFor(() => userEvent.type(emailField, email))
    await waitFor(() => userEvent.type(messageField, message))
    await waitFor(() => userEvent.click(submitButton))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalled()
    expect(onSubmit).toHaveBeenCalledWith(
      { name, email, message },
      expect.objectContaining({
        _reactName: 'onSubmit',
        type: 'submit',
      })
    )
  })

  it('does not submit with invalid email', async () => {
    const name = 'My Name'
    const email = 'invalid@.email'
    const message = "No suggestions, it's perfect!"

    const onSubmit = jest.fn()

    render(<FeedbackForm onSubmit={onSubmit} />)

    const nameField = screen.getByPlaceholderText('John Smith')
    const emailField = screen.getByPlaceholderText('john.smith@gmail.com')
    const messageField = screen.getByPlaceholderText(
      'Please submit any issue or feedback here. We like to gain information on how we can improve our product'
    )
    const submitButton = screen.getByText('Submit')

    await waitFor(() => userEvent.type(nameField, name))
    await waitFor(() => userEvent.type(emailField, email))
    await waitFor(() => userEvent.type(messageField, message))
    await waitFor(() => userEvent.click(submitButton))

    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('does not submit when some field is missing', async () => {
    const name = 'My Name'
    const email = 'valid@email.com'

    const onSubmit = jest.fn()

    render(<FeedbackForm onSubmit={onSubmit} />)

    const nameField = screen.getByPlaceholderText('John Smith')
    const emailField = screen.getByPlaceholderText('john.smith@gmail.com')
    const submitButton = screen.getByText('Submit')

    await waitFor(() => userEvent.type(nameField, name))
    await waitFor(() => userEvent.type(emailField, email))
    await waitFor(() => userEvent.click(submitButton))

    expect(screen.getByText('message is required')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
