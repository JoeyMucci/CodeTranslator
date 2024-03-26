// registration.test.js

import React from 'react'

import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import { GraphQLHooksProvider } from '@redwoodjs/web'

import '@testing-library/jest-dom/extend-expect'
import RegisterForm from './HomePage'

describe('Registration Form', () => {
  test('Invalid Password', async () => {
    window.matchMedia = jest.fn()
    const { getByLabelText, getByText } = render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <RegisterForm />
      </GraphQLHooksProvider>
    )
    const signupButton = getByText('Sign Up')
    fireEvent.click(signupButton)
    const emailInput = getByLabelText('Email:')
    const passwordInput = getByLabelText('Password:')
    const confirmPasswordInput = getByLabelText('Confirm Password:')
    const submitButton = getByText('Submit')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'weak' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'weak' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText(
          'Password must be 8 characters long and have at least 1 number'
        )
      ).toBeInTheDocument()
    })
  })

  test('Mismatch password', async () => {
    window.matchMedia = jest.fn()
    const { getByLabelText, getByText } = render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <RegisterForm />
      </GraphQLHooksProvider>
    )
    const signupButton = getByText('Sign Up')
    fireEvent.click(signupButton)
    const emailInput = getByLabelText('Email:')
    const passwordInput = getByLabelText('Password:')
    const confirmPasswordInput = getByLabelText('Confirm Password:')
    const submitButton = getByText('Submit')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'weak' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'wea' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match.')).toBeInTheDocument()
    })
  })

  // Add more test cases for other scenarios...
})
