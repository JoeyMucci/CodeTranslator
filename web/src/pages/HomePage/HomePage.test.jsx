import React from 'react'

import { render, screen } from '@testing-library/react'

import { GraphQLHooksProvider } from '@redwoodjs/web'

import HomePage from './HomePage' // Adjust the import path as necessary

describe('HomePage', () => {
  test('renders the login page', () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <HomePage />
      </GraphQLHooksProvider>
    )

    // Check if the email input field is present
    expect(
      screen.getByPlaceholderText('Example.email@njit.edu')
    ).toBeInTheDocument()

    // Check if the password input field is present
    expect(
      screen.getByPlaceholderText('SuperSecretPassword11!')
    ).toBeInTheDocument()

    // Check if the sign up button is present
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })
})
