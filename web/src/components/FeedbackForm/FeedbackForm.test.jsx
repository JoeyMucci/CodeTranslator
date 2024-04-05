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

    await waitFor(() => userEvent.click(submitButton)) // Submit without enetering any fields

    // Says fields are missing and does not submit
    expect(screen.getByText('subject is required')).toBeInTheDocument()
    expect(screen.getByText('message is required')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits when valid fields are entered', async () => {
    const subject = 'Help Page'
    // eslint-disable-next-line camelcase
    const b_email = 'valid@email.com'
    const message = "No suggestions, it's perfect!"

    const onSubmit = jest.fn()

    render(<FeedbackForm onSubmit={onSubmit} />)

    const subjectField = screen.getByPlaceholderText('History Page')
    const emailField = screen.getByPlaceholderText('john.smith@gmail.com')
    const messageField = screen.getByPlaceholderText(
      'Please submit any issue or feedback here. We like to gain information on how we can improve our product'
    )
    const submitButton = screen.getByText('Submit')

    // Submit after entering all fields
    await waitFor(() => userEvent.type(subjectField, subject))
    await waitFor(() => userEvent.type(emailField, b_email))
    await waitFor(() => userEvent.type(messageField, message))
    await waitFor(() => userEvent.click(submitButton))

    // Submit is successful and relays the data
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalled()
    expect(onSubmit).toHaveBeenCalledWith(
      // eslint-disable-next-line camelcase
      { subject, b_email, message },
      expect.objectContaining({
        _reactName: 'onSubmit',
        type: 'submit',
      })
    )
  })

  it('submits when valid fields are entered (without email)', async () => {
    const subject = 'Help Page'
    const message = "No suggestions, it's perfect!"

    const onSubmit = jest.fn()

    render(<FeedbackForm onSubmit={onSubmit} />)

    const subjectField = screen.getByPlaceholderText('History Page')
    const messageField = screen.getByPlaceholderText(
      'Please submit any issue or feedback here. We like to gain information on how we can improve our product'
    )
    const submitButton = screen.getByText('Submit')

    // Submit after entering all fields
    await waitFor(() => userEvent.type(subjectField, subject))
    await waitFor(() => userEvent.type(messageField, message))
    await waitFor(() => userEvent.click(submitButton))

    // Submit is successful and relays the data
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalled()
    expect(onSubmit).toHaveBeenCalledWith(
      { subject, b_email: '', message },
      expect.objectContaining({
        _reactName: 'onSubmit',
        type: 'submit',
      })
    )
  })

  it('does not submit with invalid email', async () => {
    const subject = 'Translation Errors'
    const email = 'invalid@.email' // invalid email
    const message = "No suggestions, it's perfect!"

    const onSubmit = jest.fn()

    render(<FeedbackForm onSubmit={onSubmit} />)

    const subjectField = screen.getByPlaceholderText('History Page')
    const emailField = screen.getByPlaceholderText('john.smith@gmail.com')
    const messageField = screen.getByPlaceholderText(
      'Please submit any issue or feedback here. We like to gain information on how we can improve our product'
    )
    const submitButton = screen.getByText('Submit')

    // Enter data (including invalid email)
    await waitFor(() => userEvent.type(subjectField, subject))
    await waitFor(() => userEvent.type(emailField, email))
    await waitFor(() => userEvent.type(messageField, message))
    await waitFor(() => userEvent.click(submitButton))

    // Message saying email is not in correct form displayed, submit is not successful
    expect(
      screen.getByText('Please enter a valid email address')
    ).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('does not submit when some required field is missing', async () => {
    const subject = 'My Name'
    const email = 'valid@email.com'

    const onSubmit = jest.fn()

    render(<FeedbackForm onSubmit={onSubmit} />)

    const subjectField = screen.getByPlaceholderText('History Page')
    const emailField = screen.getByPlaceholderText('john.smith@gmail.com')
    const submitButton = screen.getByText('Submit')

    await waitFor(() => userEvent.type(subjectField, subject))
    await waitFor(() => userEvent.type(emailField, email))
    await waitFor(() => userEvent.click(submitButton))

    expect(screen.getByText('message is required')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
