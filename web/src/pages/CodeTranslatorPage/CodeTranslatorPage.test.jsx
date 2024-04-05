// import userEvent from '@testing-library/user-event'

// import { runTranslation } from 'api/src/services/gpt/gpt.js'

import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'
import { GraphQLHooksProvider } from '@redwoodjs/web'

import CodeTranslatorPage from './CodeTranslatorPage'

describe('CodeTranslatorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <GraphQLHooksProvider
          useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
          useQuery={jest.fn().mockReturnValue({ data: {} })}
        >
          <CodeTranslatorPage />
        </GraphQLHooksProvider>
      )
    }).not.toThrow()
  })

  test('when download is clicked with no text in the outputBox, make sure theres an alert msg', async () => {
    window.alert = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <CodeTranslatorPage />
      </GraphQLHooksProvider>
    )
    const downloadButton = screen.getByRole('button', { name: 'Download' })

    await waitFor(() => fireEvent.click(downloadButton))
    expect(window.alert).toHaveBeenCalledWith(
      'Translation area is empty. Please enter code before downloading.'
    )
    //expect(codeDiv).toContainHTML('')
  })

  test('when copy is clicked with no text in the outputBox, make sure theres an alert msg', async () => {
    window.alert = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <CodeTranslatorPage />
      </GraphQLHooksProvider>
    )
    const copyButton = screen.getByRole('button', { name: 'Copy' })

    await waitFor(() => fireEvent.click(copyButton))
    expect(window.alert).toHaveBeenCalledWith(
      'Translation area is empty. Please enter code before copying.'
    )
    //expect(codeDiv).toContainHTML('')
  })

  beforeAll(() => {
    global.URL.createObjectURL = jest.fn()
  })

  afterAll(() => {
    global.URL.createObjectURL.mockRestore()
  })

  test('when download is clicked with text in the outputBox, make sure there is no alert msg and download link is created', async () => {
    window.alert = jest.fn()
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: { runTranslationMute: { rescode: 'pineapple' } },
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <CodeTranslatorPage />
      </GraphQLHooksProvider>
    )

    const downloadButton = screen.getByRole('button', { name: 'Download' })
    const translateButton = screen.getByRole('button', { name: 'Translate' })

    fireEvent.change(screen.getByTestId('InputBoxTestId'), {
      target: { value: 'int main() {printf("gollygee")\n' },
    })

    await waitFor(() => fireEvent.click(translateButton))
    await waitFor(() => fireEvent.click(downloadButton))

    expect(window.alert).toHaveBeenCalledTimes(0)
  })

  test('when copy is clicked with text in the outputBox, make sure there is no alert msg', async () => {
    window.alert = jest.fn()
    document.execCommand = jest.fn()
    window.matchMedia = jest.fn()
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: { runTranslationMute: { rescode: 'pineapple' } },
          }),
          {},
        ])}
        useQuery={jest.fn().mockReturnValue({ data: {} })}
      >
        <CodeTranslatorPage />
      </GraphQLHooksProvider>
    )

    const copyButton = screen.getByRole('button', { name: 'Copy' })
    const translateButton = screen.getByRole('button', { name: 'Translate' })

    fireEvent.change(screen.getByTestId('InputBoxTestId'), {
      target: { value: 'int main() {printf("geegee")\n' },
    })

    await waitFor(() => fireEvent.click(translateButton))
    await waitFor(() => fireEvent.click(copyButton))

    expect(window.alert).toHaveBeenCalledTimes(0)
  })

  it('renders toast for graphql error with translate', async () => {
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
        <CodeTranslatorPage />
      </GraphQLHooksProvider>
    )

    const translateButton = screen.getByRole('button', { name: 'Translate' })

    fireEvent.change(screen.getByTestId('InputBoxTestId'), {
      target: { value: 'int main() {printf("geegee")\n' },
    })

    await waitFor(() => fireEvent.click(translateButton))

    await waitFor(() =>
      expect(
        screen.getByText(/Communication with GraphQL off, try again later/i)
      ).toBeInTheDocument()
    )
  })

  it('renders toast for graphql error with rating', async () => {
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
        <CodeTranslatorPage />
      </GraphQLHooksProvider>
    )
    await new Promise((resolve) => setTimeout(resolve, 5000)) // wait because of the previous test
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    const oneStarButton = screen.getByTitle('error: expected usable code')
    await waitFor(() => fireEvent.click(oneStarButton)) // Select one star

    await waitFor(() => fireEvent.click(submitButton))

    await waitFor(() =>
      expect(
        screen.getByText(/Communication with GraphQL off, try again later/i)
      ).toBeInTheDocument()
    )
  }, 10000)
})
