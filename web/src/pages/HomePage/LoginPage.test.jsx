import React from 'react'

import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import { GraphQLHooksProvider } from '@redwoodjs/web'

import '@testing-library/jest-dom/extend-expect'
import LoginForm from './HomePage'

describe('Login Form', () => {
  test('Displays message for incorrect email', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: { loginUserMute: { user: null, error: 'User not found' } },
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <LoginForm />
      </GraphQLHooksProvider>
    )
    const emailInput = screen.getByLabelText('Email:')
    const passwordInput = screen.getByLabelText('Password:')
    const submitButton = screen.getByTestId('login')

    fireEvent.change(emailInput, {
      target: { value: 'test@notregistered.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'securesecure5' },
    })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Email is incorrect')).toBeInTheDocument()
    })
  })

  test('Displays message for incorrect password', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: { loginUserMute: { user: null, error: 'Invalid password' } },
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <LoginForm />
      </GraphQLHooksProvider>
    )
    const emailInput = screen.getByLabelText('Email:')
    const passwordInput = screen.getByLabelText('Password:')
    const submitButton = screen.getByTestId('login')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, {
      target: { value: 'securebutincorrect5' },
    })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Password is incorrect')).toBeInTheDocument()
    })
  })

  test('Displays toast for 500', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockImplementation(async () => {
            const bruh = new Error('500: Server not found')
            throw bruh
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <LoginForm />
      </GraphQLHooksProvider>
    )
    const emailInput = screen.getByLabelText('Email:')
    const passwordInput = screen.getByLabelText('Password:')
    const submitButton = screen.getByTestId('login')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, {
      target: { value: 'securesecure5' },
    })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Cannot authenticate with our API, please wait/i)
      ).toBeInTheDocument()
    )
  })

  test('Displays toast for general error', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockImplementation(async () => {
            const bruh = new Error('Beep boop boop')
            throw bruh
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <LoginForm />
      </GraphQLHooksProvider>
    )
    const emailInput = screen.getByLabelText('Email:')
    const passwordInput = screen.getByLabelText('Password:')
    const submitButton = screen.getByTestId('login')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, {
      target: { value: 'securesecure5' },
    })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText(/Login Failed/i)).toBeInTheDocument()
    )
  })

  // test('Navigates to code translator on success', async () => {
  //   window.matchMedia = jest.fn()
  //   render(
  //     <GraphQLHooksProvider
  //       useMutation={jest.fn().mockReturnValue([
  //         jest.fn().mockReturnValue({
  //           data: {
  //             loginUser: {
  //               token: 'vfrvwe',
  //               user: {
  //                 name: 'fff',
  //                 email: 'blah@blah.co',
  //                 passsword: 'fred3drfcr',
  //               },
  //             },
  //           },
  //         }),
  //         {},
  //       ])}
  //       useQuery={jest.fn().mockReturnValue({ data: {} })}
  //     >
  //       <LoginForm />
  //     </GraphQLHooksProvider>
  //   )
  //   const emailInput = screen.getByLabelText('Email:')
  //   const passwordInput = screen.getByLabelText('Password:')
  //   const submitButton = screen.getByTestId('login')

  //   fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
  //   fireEvent.change(passwordInput, {
  //     target: { value: 'securesecure5' },
  //   })
  //   fireEvent.click(submitButton)

  //   await waitFor(() => {
  //     expect(window.loginUser).toHaveBeenCalledTimes(1)
  //   })
  // })
})
