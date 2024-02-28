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

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits when required fields are entered', async () => {
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

  it('submits with the expected, entered data', async () => {
    const name = 'My Name'
    const nickname = 'My Nickname'

    const onSubmit = jest.fn()

    render(<FeedbackForm onSubmit={onSubmit} />)

    const nameField = screen.getByPlaceholderText('Name')
    const nicknameField = screen.getByPlaceholderText('Nickname')
    const submitButton = screen.getByText('Submit')

    await waitFor(() => userEvent.type(nameField, name))
    await waitFor(() => userEvent.type(nicknameField, nickname))
    await waitFor(() => userEvent.click(submitButton))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalled()
    expect(onSubmit).toHaveBeenCalledWith(
      { name, nickname },
      expect.objectContaining({
        _reactName: 'onSubmit',
        type: 'submit',
      })
    )
  })
})
