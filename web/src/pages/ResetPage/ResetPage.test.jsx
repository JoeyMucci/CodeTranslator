import userEvent from '@testing-library/user-event'

import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'
import { GraphQLHooksProvider } from '@redwoodjs/web'

import ResetPasswordPage from './ResetPage'

describe('ForgotPasswordPage', () => {
  it('renders successfully', () => {
    window.matchMedia = jest.fn()
    expect(() => {
      render(
        <GraphQLHooksProvider
          useMutation={jest.fn().mockReturnValue([jest.fn()])}
          useQuery={jest.fn().mockReturnValue({ data: {} })}
        >
          <ResetPasswordPage />
        </GraphQLHooksProvider>
      )
    }).not.toThrow()
  })

  it('gives error message for nonmatching passwords', async () => {
    window.matchMedia = jest.fn()
    window.URLSearchParams = jest.fn().mockReturnValue(
      new Map([
        ['token', 'token'],
        ['email', 'email'],
      ])
    )
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn()])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <ResetPasswordPage />
      </GraphQLHooksProvider>
    )
    const newField = screen.getByPlaceholderText('New Password')
    await waitFor(() => userEvent.type(newField, 'secure999999'))

    const oldField = screen.getByPlaceholderText('Confirm Password')
    await waitFor(() => userEvent.type(oldField, 'notsecure999999'))

    const resetButton = screen.getByText('Reset Password')
    await waitFor(() => fireEvent.click(resetButton))

    await waitFor(() =>
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument()
    )
  })

  it('gives error message for weak passwords', async () => {
    window.matchMedia = jest.fn()
    window.URLSearchParams = jest.fn().mockReturnValue(
      new Map([
        ['token', 'token'],
        ['email', 'email'],
      ])
    )
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn()])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <ResetPasswordPage />
      </GraphQLHooksProvider>
    )
    const newField = screen.getByPlaceholderText('New Password')
    await waitFor(() => userEvent.type(newField, 'bad'))

    const oldField = screen.getByPlaceholderText('Confirm Password')
    await waitFor(() => userEvent.type(oldField, 'bad'))

    const resetButton = screen.getByText('Reset Password')
    await waitFor(() => fireEvent.click(resetButton))

    await waitFor(() =>
      expect(screen.getByText(/Passwords is too weak/i)).toBeInTheDocument()
    )
  })

  it('gives success mesage', async () => {
    window.matchMedia = jest.fn()
    window.URLSearchParams = jest.fn().mockReturnValue(
      new Map([
        ['token', 'tokentwo'],
        ['email', 'emailtwo'],
      ])
    )
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockImplementation(() => {
            return {
              user: {
                create: {
                  id: 69,
                  name: 'Phil',
                  email: 'abcd@abc.ab',
                  password: 'r328u90ievfhjbioewuy4fh',
                  resetToken: null,
                  resetTokenExpiresAt: null,
                  roles: 'fo',
                },
              },
            }
          }),
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <ResetPasswordPage />
      </GraphQLHooksProvider>
    )
    const newField = screen.getByPlaceholderText('New Password')
    await waitFor(() => userEvent.type(newField, '#notasbad71'))

    const oldField = screen.getByPlaceholderText('Confirm Password')
    await waitFor(() => userEvent.type(oldField, '#notasbad71'))

    const resetButton = screen.getByText('Reset Password')
    await waitFor(() => fireEvent.click(resetButton))

    await waitFor(() =>
      expect(
        screen.getByText(/Password change successful/i)
      ).toBeInTheDocument()
    )
  })

  it('gives error message', async () => {
    window.matchMedia = jest.fn()
    window.URLSearchParams = jest.fn().mockReturnValue(
      new Map([
        ['token', 'token'],
        ['email', 'email'],
      ])
    )
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockImplementation(() => {
            throw new Error('something went wrong')
          }),
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <ResetPasswordPage />
      </GraphQLHooksProvider>
    )
    const newField = screen.getByPlaceholderText('New Password')
    await waitFor(() => userEvent.type(newField, 'badbunny69*'))

    const oldField = screen.getByPlaceholderText('Confirm Password')
    await waitFor(() => userEvent.type(oldField, 'badbunny69*'))

    const resetButton = screen.getByText('Reset Password')
    await waitFor(() => fireEvent.click(resetButton))

    await waitFor(() =>
      expect(screen.getByText(/Failed change password/i)).toBeInTheDocument()
    )
  })
})
