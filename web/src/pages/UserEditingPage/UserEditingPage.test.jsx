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

describe('Theme Buttons', () => {
  it('should change the theme to "light" and update the container style when clicked', () => {

    const {container} = render(<UserEditingPage />);


    const button = screen.getByRole('button', { name: /rosetta/i });
    fireEvent.click(button);

    const firstDiv = container.querySelector('div');
      expect(firstDiv).toHaveClass('light-theme');
      expect(firstDiv).not.toHaveClass('dark-theme');
      expect(firstDiv).not.toHaveClass('snes-theme');
      expect(firstDiv).not.toHaveClass('our-theme');
      expect(firstDiv).not.toHaveClass('terminal-theme');

    expect(button).toHaveClass('button-outline');
    expect(button).toHaveStyle({ backgroundColor: '#0369a1', color: 'white' });
  });

  it('should change the theme to "dark" and update the container style when clicked', () => {

    const {container} = render(<UserEditingPage />);


    const button = screen.getByRole('button', { name: /spade/i });
    fireEvent.click(button);

    const firstDiv = container.querySelector('div');
      expect(firstDiv).toHaveClass('dark-theme');
      expect(firstDiv).not.toHaveClass('light-theme');
      expect(firstDiv).not.toHaveClass('snes-theme');
      expect(firstDiv).not.toHaveClass('our-theme');
      expect(firstDiv).not.toHaveClass('terminal-theme');


    expect(button).toHaveClass('button-outline');
  });

  it('should change the theme to "Ours" and update the container style when clicked', () => {

    const {container} = render(<UserEditingPage />);


    const button = screen.getByRole('button', { name: /ours/i });
    fireEvent.click(button);

    const firstDiv = container.querySelector('div');
      expect(firstDiv).toHaveClass('our-theme');
      expect(firstDiv).not.toHaveClass('light-theme');
      expect(firstDiv).not.toHaveClass('snes-theme');
      expect(firstDiv).not.toHaveClass('dark-theme');
      expect(firstDiv).not.toHaveClass('terminal-theme');


    expect(button).toHaveClass('button-outline');
  });

  it('should change the theme to "snes" and update the container style when clicked', () => {

    const {container} = render(<UserEditingPage />);


    const button = screen.getByRole('button', { name: /snes/i });
    fireEvent.click(button);

    const firstDiv = container.querySelector('div');
      expect(firstDiv).toHaveClass('snes-theme');
      expect(firstDiv).not.toHaveClass('light-theme');
      expect(firstDiv).not.toHaveClass('our-theme');
      expect(firstDiv).not.toHaveClass('dark-theme');
      expect(firstDiv).not.toHaveClass('terminal-theme');


    expect(button).toHaveClass('button-outline');
  });

  it('should change the theme to "Copper" and update the container style when clicked', () => {

    const {container} = render(<UserEditingPage />);


    const button = screen.getByRole('button', { name: /copper/i });
    fireEvent.click(button);

    const firstDiv = container.querySelector('div');
      expect(firstDiv).toHaveClass('copper-theme');
      expect(firstDiv).not.toHaveClass('light-theme');
      expect(firstDiv).not.toHaveClass('our-theme');
      expect(firstDiv).not.toHaveClass('dark-theme');
      expect(firstDiv).not.toHaveClass('terminal-theme');
      expect(firstDiv).not.toHaveClass('dmg-theme');
      expect(firstDiv).not.toHaveClass('nautilus-theme');
      expect(firstDiv).not.toHaveClass('beach-theme');
      expect(firstDiv).not.toHaveClass('snes-theme');


    expect(button).toHaveClass('button-outline');
  });

  it('should change the theme to "Dmg" and update the container style when clicked', () => {

    const {container} = render(<UserEditingPage />);


    const button = screen.getByRole('button', { name: /dmg/i });
    fireEvent.click(button);

    const firstDiv = container.querySelector('div');
      expect(firstDiv).toHaveClass('dmg-theme');
      expect(firstDiv).not.toHaveClass('light-theme');
      expect(firstDiv).not.toHaveClass('our-theme');
      expect(firstDiv).not.toHaveClass('dark-theme');
      expect(firstDiv).not.toHaveClass('terminal-theme');
      expect(firstDiv).not.toHaveClass('copper-theme');
      expect(firstDiv).not.toHaveClass('nautilus-theme');
      expect(firstDiv).not.toHaveClass('beach-theme');
      expect(firstDiv).not.toHaveClass('snes-theme');


    expect(button).toHaveClass('button-outline');
  });

  it('should change the theme to "nautilus" and update the container style when clicked', () => {

    const {container} = render(<UserEditingPage />);


    const button = screen.getByRole('button', { name: /nautilus/i });
    fireEvent.click(button);

    const firstDiv = container.querySelector('div');
      expect(firstDiv).toHaveClass('nautilus-theme');
      expect(firstDiv).not.toHaveClass('light-theme');
      expect(firstDiv).not.toHaveClass('our-theme');
      expect(firstDiv).not.toHaveClass('dark-theme');
      expect(firstDiv).not.toHaveClass('terminal-theme');
      expect(firstDiv).not.toHaveClass('copper-theme');
      expect(firstDiv).not.toHaveClass('dmg-theme');
      expect(firstDiv).not.toHaveClass('beach-theme');
      expect(firstDiv).not.toHaveClass('snes-theme');


    expect(button).toHaveClass('button-outline');
  });

  it('should change the theme to "terminal" and update the container style when clicked', () => {

    const {container} = render(<UserEditingPage />);


    const button = screen.getByRole('button', { name: /terminal/i });
    fireEvent.click(button);

    const firstDiv = container.querySelector('div');
      expect(firstDiv).toHaveClass('terminal-theme');
      expect(firstDiv).not.toHaveClass('light-theme');
      expect(firstDiv).not.toHaveClass('our-theme');
      expect(firstDiv).not.toHaveClass('dark-theme');
      expect(firstDiv).not.toHaveClass('nautilus-theme');
      expect(firstDiv).not.toHaveClass('copper-theme');
      expect(firstDiv).not.toHaveClass('dmg-theme');
      expect(firstDiv).not.toHaveClass('beach-theme');
      expect(firstDiv).not.toHaveClass('snes-theme');


    expect(button).toHaveClass('button-outline');
  });

  it('should change the theme to "Beach" and update the container style when clicked', () => {

    const {container} = render(<UserEditingPage />);


    const button = screen.getByRole('button', { name: /beach/i });
    fireEvent.click(button);

    const firstDiv = container.querySelector('div');
      expect(firstDiv).toHaveClass('beach-theme');
      expect(firstDiv).not.toHaveClass('light-theme');
      expect(firstDiv).not.toHaveClass('our-theme');
      expect(firstDiv).not.toHaveClass('dark-theme');
      expect(firstDiv).not.toHaveClass('nautilus-theme');
      expect(firstDiv).not.toHaveClass('copper-theme');
      expect(firstDiv).not.toHaveClass('dmg-theme');
      expect(firstDiv).not.toHaveClass('terminal-theme');
      expect(firstDiv).not.toHaveClass('snes-theme');


    expect(button).toHaveClass('button-outline');
  });

});


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

  it('error for missing email', async () => {
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
  test('displays submit toast', async () => {
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
