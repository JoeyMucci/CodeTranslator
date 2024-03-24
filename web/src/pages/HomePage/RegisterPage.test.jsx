// registration.test.js

import React from 'react'

import { render, fireEvent, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import RegisterPage from './RegisterPage'

describe('Registration Form', () => {
  test('Valid Registration', async () => {
    const { getByLabelText, getByText, queryByText } = render(<RegisterPage />)
    const emailInput = getByLabelText('Email:')
    const passwordInput = getByLabelText('Password:')
    const confirmPasswordInput = getByLabelText('Confirm Password:')
    const submitButton = getByText('Submit')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword123!' } })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'ValidPassword123!' },
    })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(queryByText('User registered:')).toBeInTheDocument()
    })
  })

  test('Invalid Password', async () => {
    const { getByLabelText, getByText, queryByText } = render(<RegisterPage />)
    const emailInput = getByLabelText('Email:')
    const passwordInput = getByLabelText('Password:')
    const confirmPasswordInput = getByLabelText('Confirm Password:')
    const submitButton = getByText('Submit')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'weak' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'weak' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(queryByText('Passwords do not match.')).toBeInTheDocument()
    })
  })

  // Add more test cases for other scenarios...
})
