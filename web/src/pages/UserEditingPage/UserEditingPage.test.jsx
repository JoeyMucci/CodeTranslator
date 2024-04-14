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
    fireEvent.change(emailInput, { target: { value: 'john.doe@exmaple.c' } }) // bad email (too short suffix)

    const submitButton = screen.getByRole('button', { name: /Save/i })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Enter a valid email address/i)
      ).toBeInTheDocument()
    )
  })

  it('Submits with missing name', async () => {
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

    expect(screen.queryByText(/Name is required/i)).not.toBeInTheDocument()
  })

  it('submits with missing email', async () => {
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

    expect(
      screen.queryByText(/Enter a valid email address/i)
    ).not.toBeInTheDocument()
  })
})

describe('Toast notifications', () => {
  test('displays submit toast', async () => {
    // const { getByLabelText, getByText, getByRole } = render(
    //   <MockedProvider mocks={mocks} addTypename={false}>
    //     <UserEditingPage />
    //   </MockedProvider>
    // )
    await new Promise((resolve) => setTimeout(resolve, 3000)) // wait because of the previous test
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

  test('display reject toast', async () => {
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
            throw new Error('Bruh Two')
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
      expect(screen.getByText(/Update user info failed/i)).toBeInTheDocument()
    )
  })

  test('display email already registered toast', async () => {
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
            const bruh = new Error('Bruh Two')
            bruh.graphQLErrors = {
              0: {
                extensions: {
                  originalError: {
                    message: "Unique constraint violated on field 'email'",
                  },
                },
              },
            }
            throw bruh
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <UserEditingPage />
      </GraphQLHooksProvider>
    )

    const nameInput = screen.getByTestId('name')
    fireEvent.change(nameInput, { target: { value: 'Abigail Arya' } }) // data does not matter because of mock

    const emailInput = screen.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: 'a@a.a.aaa' } }) // data does not matter because of mock

    const submitButton = screen.getByRole('button', { name: /Save/i })
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Email is already registered/i)
      ).toBeInTheDocument()
    )
  })
})

describe('Delete Button', () => {
  test('Issues wanrning before deleting account', async () => {
    window.confirm = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <UserEditingPage />
      </GraphQLHooksProvider>
    )
    const deleteButton = screen.getByRole('button', { name: 'Delete' })

    await waitFor(() => fireEvent.click(deleteButton))
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete your account? All feedback submissions and translation history will be lost.'
    )
  })
})
