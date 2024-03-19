//import userEvent from '@testing-library/user-event'

// import { runTranslation } from 'api/src/services/gpt/gpt.js'

import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'

import CodeTranslatorPage from './CodeTranslatorPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CodeTranslatorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CodeTranslatorPage />)
    }).not.toThrow()
  })

  test('when download is clicked with no text in the outputBox, make sure theres an alert msg', async () => {
    window.alert = jest.fn()
    render(<CodeTranslatorPage />)
    const downloadButton = screen.getByRole('button', { name: 'Download' })

    await waitFor(() => fireEvent.click(downloadButton))
    expect(window.alert).toHaveBeenCalledWith(
      'Translation area is empty. Please enter code before downloading.'
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
    render(<CodeTranslatorPage />)

    const downloadButton = screen.getByRole('button', { name: 'Download' })
    const translateButton = screen.getByRole('button', { name: 'Translate' })

    fireEvent.change(screen.getByTestId('InputBoxTestId'), {
      target: { value: 'int main()' },
    })

    await waitFor(() => fireEvent.click(translateButton))
    await waitFor(() => fireEvent.click(downloadButton))

    expect(window.alert).toHaveBeenCalledTimes(0)
  })
})
