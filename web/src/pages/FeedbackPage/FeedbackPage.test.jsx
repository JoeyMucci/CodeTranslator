import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'
import { GraphQLHooksProvider } from '@redwoodjs/web'

import FeedbackPage from './FeedbackPage'

describe('FeedbackPage', () => {
  it('renders successfully', () => {
    expect(() => {
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
          <FeedbackPage />
        </GraphQLHooksProvider>
      )
    }).not.toThrow()
  })

  it('renders toast for graphql general error', async () => {
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
        <FeedbackPage />
      </GraphQLHooksProvider>
    )
    const subject = 'Help Page'
    // eslint-disable-next-line camelcase
    const b_email = 'valid@email.com'
    const message = "No suggestions, it's perfect!"

    const subjectField = screen.getByPlaceholderText('History Page')
    const emailField = screen.getByPlaceholderText('john.smith@gmail.com')
    const messageField = screen.getByPlaceholderText(
      'Please submit any issue or feedback here. We like to gain information on how we can improve our product'
    )
    const submitButton = screen.getByText('Submit')

    // Submit after entering all fields
    await waitFor(() => userEvent.type(subjectField, subject))
    await waitFor(() => userEvent.type(emailField, b_email))
    await waitFor(() => userEvent.type(messageField, message))
    await waitFor(() => userEvent.click(submitButton))

    await waitFor(() =>
      expect(
        screen.getByText(/Communication with GraphQL off, try again later/i)
      ).toBeInTheDocument()
    )
  })

  it('renders toast for graphql bad input error', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockImplementation(async () => {
            const problemo = new Error('Bruh')
            problemo.code = 'BAD_USER_INPUT'
            throw problemo
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <FeedbackPage />
      </GraphQLHooksProvider>
    )
    const subject = 'Help Page'
    // eslint-disable-next-line camelcase
    const b_email = 'valid@email.com'
    const message = "No suggestions, it's perfect!"

    const subjectField = screen.getByPlaceholderText('History Page')
    const emailField = screen.getByPlaceholderText('john.smith@gmail.com')
    const messageField = screen.getByPlaceholderText(
      'Please submit any issue or feedback here. We like to gain information on how we can improve our product'
    )
    const submitButton = screen.getByText('Submit')

    // Submit after entering all fields
    await waitFor(() => userEvent.type(subjectField, subject))
    await waitFor(() => userEvent.type(emailField, b_email))
    await waitFor(() => userEvent.type(messageField, message))
    await waitFor(() => userEvent.click(submitButton))

    await waitFor(() =>
      expect(
        screen.getByText(
          /Input not recognized, please enter feedback in form of text/i
        )
      ).toBeInTheDocument()
    )
  })

  it('renders toast for graphql bad request error', async () => {
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockImplementation(async () => {
            const problemo = new Error('Bruh')
            problemo.code = 'BAD_REQUEST'
            throw problemo
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <FeedbackPage />
      </GraphQLHooksProvider>
    )
    const subject = 'Help Page'
    // eslint-disable-next-line camelcase
    const b_email = 'valid@email.com'
    const message = "No suggestions, it's perfect!"

    const subjectField = screen.getByPlaceholderText('History Page')
    const emailField = screen.getByPlaceholderText('john.smith@gmail.com')
    const messageField = screen.getByPlaceholderText(
      'Please submit any issue or feedback here. We like to gain information on how we can improve our product'
    )
    const submitButton = screen.getByText('Submit')

    // Submit after entering all fields
    await waitFor(() => userEvent.type(subjectField, subject))
    await waitFor(() => userEvent.type(emailField, b_email))
    await waitFor(() => userEvent.type(messageField, message))
    await waitFor(() => userEvent.click(submitButton))

    await waitFor(() =>
      expect(
        screen.getByText(/Request could not make it to our server, try again/i)
      ).toBeInTheDocument()
    )
  })
})
