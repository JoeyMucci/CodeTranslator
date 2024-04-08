// UserEditingPage.test.jsx
// import React from 'react'

import { render, screen, fireEvent, waitFor } from '@redwoodjs/testing/web'
import { GraphQLHooksProvider } from '@redwoodjs/web'
import '@testing-library/jest-dom/extend-expect'

import UserEditingPage from './UserEditingPage'
//import { UPDATE_USER } from './UserEditingPage' // Ensure this import path is correct

// const mocks = [
//   {
//     request: {
//       query: UPDATE_USER,
//       variables: {
//         id: 1,
//         input: {
//           name: 'John Doe',
//           email: 'john.doe@example.com',
//         },
//       },
//     },
//     result: {
//       data: {
//         updateUser: {
//           id: 1,
//           name: 'John Doe',
//           email: 'john.doe@example.com',
//         },
//       },
//     },
//   },
// ]

describe('Submission errors', () => {
  it('error for incorrect email one when all info is present', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              updateUserByEmail: { email: 'blah@blah.co' },
            },
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <UserEditingPage />
      </GraphQLHooksProvider>
    )

    const nameInput = screen.getByTestId('name')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    const emailInput = screen.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: 'john.doe@examplecom' } }) // bad email (no dot)

    const submitButton = screen.getByRole('button', { name: /Save/i })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Enter a valid email address/i)
      ).toBeInTheDocument()
    )
  })

  it('error for incorrect email three when all info is present', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              updateUserByEmail: { email: 'blah@blah.co' },
            },
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <UserEditingPage />
      </GraphQLHooksProvider>
    )

    const nameInput = screen.getByTestId('name')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    const emailInput = screen.getByTestId('email')
    fireEvent.change(emailInput, {
      target: { value: 'john.doe@exmaple.cdefgh' },
    }) // bad email (too long suffix)

    const submitButton = screen.getByRole('button', { name: /Save/i })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Enter a valid email address/i)
      ).toBeInTheDocument()
    )
  })

  it('error for incorrect email two when all info is present', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              updateUserByEmail: { email: 'blah@blah.co' },
            },
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <UserEditingPage />
      </GraphQLHooksProvider>
    )

    const nameInput = screen.getByTestId('name')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    const emailInput = screen.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: 'john.doe@exmaple.c' } }) // bad email (too short suffix)

    const submitButton = screen.getByRole('button', { name: /Save/i })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Enter a valid email address/i)
      ).toBeInTheDocument()
    )
  })

  it('error for missing name', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              updateUserByEmail: { email: 'blah@blah.co' },
            },
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <UserEditingPage />
      </GraphQLHooksProvider>
    )

    const emailInput = screen.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: 'john.doe@exmaple.com' } })

    const submitButton = screen.getByRole('button', { name: /Save/i })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument()
    )
  })

  it('error for missing name', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              updateUserByEmail: { email: 'blah@blah.co' },
            },
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <UserEditingPage />
      </GraphQLHooksProvider>
    )

    const nameInput = screen.getByTestId('name')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    const submitButton = screen.getByRole('button', { name: /Save/i })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Enter a valid email address/i)
      ).toBeInTheDocument()
    )
  })
})

describe('Toast notifications', () => {
  test('renders UserEditingPage and displays submit toast', async () => {
    // const { getByLabelText, getByText, getByRole } = render(
    //   <MockedProvider mocks={mocks} addTypename={false}>
    //     <UserEditingPage />
    //   </MockedProvider>
    // )
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              updateUserByEmail: { email: 'blah@blah.co' },
            },
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <UserEditingPage />
      </GraphQLHooksProvider>
    )

    const nameInput = screen.getByTestId('name')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    const emailInput = screen.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })

    const submitButton = screen.getByRole('button', { name: /Save/i })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Your profile is updated! Hang tight!/i)
      ).toBeInTheDocument()
    )
  })

  test('renders UserEditingPage and display reject toast', async () => {
    // const { getByLabelText, getByText, getByRole } = render(
    //   <MockedProvider mocks={mocks} addTypename={false}>
    //     <UserEditingPage />
    //   </MockedProvider>
    // )
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockImplementation(async () => {
            throw new Error('Something went wrong')
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <UserEditingPage />
      </GraphQLHooksProvider>
    )

    const nameInput = screen.getByTestId('name')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    const emailInput = screen.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })

    const submitButton = screen.getByRole('button', { name: /Save/i })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(screen.getByText(/Update user info failed./i)).toBeInTheDocument()
    )
  })
})
