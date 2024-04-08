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
})

describe('Error communication to user', () => {
  it('renders toast for empty code error', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              runTranslationMute: { rescode: 'ERROR', error: 'mt' },
            },
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
      expect(screen.getByText(/Please enter code/i)).toBeInTheDocument()
    )
  })

  it('renders toast for nonsense code error', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              runTranslationMute: { rescode: 'ERROR', error: 'nonsense' },
            },
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
        screen.getByText(/Your code was not recognized/i)
      ).toBeInTheDocument()
    )
  })

  it('renders toast for already in queue error', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: { runTranslationMute: { rescode: 'ERROR', error: 'spam' } },
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
      expect(screen.getByText(/We're working on it!/i)).toBeInTheDocument()
    )
  })

  it('renders toast for too long error', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              runTranslationMute: { rescode: 'ERROR', error: 'too long' },
            },
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
        screen.getByText(/Code is too long, try breaking up input/i)
      ).toBeInTheDocument()
    )
  })

  it('renders toast for api key error', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              runTranslationMute: {
                rescode: 'ERROR',
                error: 'invalid_api_key',
              },
            },
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
        screen.getByText(/API Key is invalid, please contact us/i)
      ).toBeInTheDocument()
    )
  })

  it('renders toast for traffic error', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              runTranslationMute: {
                rescode: 'ERROR',
                error: 'rate_limit_error',
              },
            },
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
        screen.getByText(/Experiencing heavy traffic, try again later/i)
      ).toBeInTheDocument()
    )
  })

  it('renders toast for openAI server error', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              runTranslationMute: { rescode: 'ERROR', error: 'server_error' },
            },
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
        screen.getByText(/OpenAI is having trouble, try again soon/i)
      ).toBeInTheDocument()
    )
  })

  it('renders toast for openAI not found error', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              runTranslationMute: {
                rescode: 'ERROR',
                error: 'not_found_error',
              },
            },
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
        screen.getByText(/OpenAI resource no longer exists/i)
      ).toBeInTheDocument()
    )
  })

  it('renders toast for wrong language error', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockReturnValue({
            data: {
              runTranslationMute: { rescode: 'ERROR', error: 'wrong lang' },
            },
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
        screen.getByText(/Ensure selected language matches input/i)
      ).toBeInTheDocument()
    )
  })

  it('renders toast for graphql general error with translate', async () => {
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

  it('renders toast for graphql bad input error with translate', async () => {
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
        screen.getByText(
          /Input not recognized, please enter code in form of text/i
        )
      ).toBeInTheDocument()
    )
  })

  it('renders toast for graphql bad request error with translate', async () => {
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
        screen.getByText(/Request could not make it to our server, try again/i)
      ).toBeInTheDocument()
    )
  })

  it('renders toast for graphql general error with rating', async () => {
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

  it('renders toast for graphql bad input error with rating', async () => {
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
        <CodeTranslatorPage />
      </GraphQLHooksProvider>
    )
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    const oneStarButton = screen.getByTitle('error: expected usable code')
    await waitFor(() => fireEvent.click(oneStarButton)) // Select one star

    await waitFor(() => fireEvent.click(submitButton))

    await waitFor(() =>
      expect(
        screen.getByText(
          /Input not recognized, please enter rating appropriately/i
        )
      ).toBeInTheDocument()
    )
  })

  it('renders toast for graphql bad request error with rating', async () => {
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
        <CodeTranslatorPage />
      </GraphQLHooksProvider>
    )
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    const oneStarButton = screen.getByTitle('error: expected usable code')
    await waitFor(() => fireEvent.click(oneStarButton)) // Select one star

    await waitFor(() => fireEvent.click(submitButton))

    await waitFor(() =>
      expect(
        screen.getByText(/Request could not make it to our server, try again/i)
      ).toBeInTheDocument()
    )
  })


})

describe('Tests for loading notification', () => {
  it('renders toast for nonsense code error', async () => {
    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([
          jest.fn().mockImplementation(
            async() => {
              await new Promise((resolve) => setTimeout(resolve, 1000))
              return {
                data: {
                  runTranslationMute: { rescode: 'ERROR', error: 'wrong lang' },
            },
          }
            }
          ),
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
        screen.getByTestId('codeDivTestIdTwo').innerHTML).toBe('loading...')
    )
  })
})