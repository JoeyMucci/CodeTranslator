import userEvent from '@testing-library/user-event'

import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'
import { GraphQLHooksProvider } from '@redwoodjs/web'

import ForgotPasswordPage from './ForgotPasswordPage'

describe('ForgotPasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <GraphQLHooksProvider
          useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
          useQuery={jest.fn().mockReturnValue({ data: {} })}
        >
          <ForgotPasswordPage />
        </GraphQLHooksProvider>
      )
    }).not.toThrow()
  })

  it('prompts for email when not given', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <ForgotPasswordPage />
      </GraphQLHooksProvider>
    )
    const resetButton = screen.getByText('Reset Password')
    await waitFor(() => fireEvent.click(resetButton))

    await waitFor(() =>
      expect(screen.getByText(/Please enter your email/i)).toBeInTheDocument()
    )
  })

  it('gives success message', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <ForgotPasswordPage />
      </GraphQLHooksProvider>
    )
    const emailField = screen.getByPlaceholderText('Example.email@njit.edu')
    await waitFor(() => userEvent.type(emailField, 'testemail@job.com'))

    const resetButton = screen.getByText('Reset Password')
    await waitFor(() => fireEvent.click(resetButton))

    await waitFor(() =>
      expect(screen.getByText(/Email Sent/i)).toBeInTheDocument()
    )
  })

  it('gives error message', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockImplementation(() => {
            throw new Error('bruh')
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <ForgotPasswordPage />
      </GraphQLHooksProvider>
    )
    const emailField = screen.getByPlaceholderText('Example.email@njit.edu')
    await waitFor(() => userEvent.type(emailField, 'testemail@job.com'))

    const resetButton = screen.getByText('Reset Password')
    await waitFor(() => fireEvent.click(resetButton))

    await waitFor(() =>
      expect(
        screen.getByText(
          /Failed to send Email, ensure email is linked with account/i
        )
      ).toBeInTheDocument()
    )
  })
})
