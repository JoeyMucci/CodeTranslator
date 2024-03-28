import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'

import HelpPage from './HelpPage'
import { log } from 'console'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HelpPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HelpPage />)
    }).not.toThrow()
  })

  test('tests the attribute link', async () => {
    render(<HelpPage />)
    expect(screen.getByRole('link', { name: 'Java' })).toHaveAttribute('href', 'https://www.java.com/en/download/help/download_options.html')
  })

  test('tests the attribute link python', async () => {
    render(<HelpPage />)
    expect(screen.getByRole('link', { name: 'Python' })).toHaveAttribute('href', 'https://www.python.org/downloads/')
  })

  test('tests the attribute link gcc', async () => {
    render(<HelpPage />)
    expect(screen.getByRole('link', { name: 'C compiler' })).toHaveAttribute('href', 'https://code.visualstudio.com/docs/cpp/config-mingw')
  })

  test('tests the attribute link php', async () => {
    render(<HelpPage />)
    expect(screen.getByRole('link', { name: 'php' })).toHaveAttribute('href', 'https://www.w3schools.com/php/')
  })

  test('Question 1 opens up', async () => {
    render(<HelpPage />)
    toggleFAQ = jest.fn()
    const question = document.getElementsByClassName('faq')[0]
    await waitFor(() => fireEvent.click(questionTest2))
    const myClass = question.classList.contains('open')
   expect(myClass).toBe(true);
  })


  test('Question 3 opens up', async () => {
    render(<HelpPage />)
    toggleFAQ = jest.fn()
    const question = document.getElementsByClassName('faq')[2]
    await waitFor(() => fireEvent.click(question))
    const myClass = question.classList.contains('open')
   expect(myClass).toBe(true);
  })

  test('Question 4 opens up', async () => {
    render(<HelpPage />)
    toggleFAQ = jest.fn()
    const question = document.getElementsByClassName('faq')[3]
    await waitFor(() => fireEvent.click(question))
    const myClass = question.classList.contains('open')
   expect(myClass).toBe(true);
  })

  test('Question 5 opens up', async () => {
    render(<HelpPage />)
    toggleFAQ = jest.fn()
    const question = document.getElementsByClassName('faq')[4]
    await waitFor(() => fireEvent.click(question))
    const myClass = question.classList.contains('open')
   expect(myClass).toBe(true);
  })

  test('Question 6 opens up', async () => {
    render(<HelpPage />)
    toggleFAQ = jest.fn()
    const question = document.getElementsByClassName('faq')[5]
    await waitFor(() => fireEvent.click(question))
    const myClass = question.classList.contains('open')
   expect(myClass).toBe(true);
  })

  test('Question 7 opens up', async () => {
    render(<HelpPage />)
    toggleFAQ = jest.fn()
    const question = document.getElementsByClassName('faq')[6]
    await waitFor(() => fireEvent.click(question))
    const myClass = question.classList.contains('open')
   expect(myClass).toBe(true);
  })

  test('One question closes up when another is clicked on', async () => {
    render(<HelpPage />)
    toggleFAQ = jest.fn()
    const questionTest2 = document.getElementsByClassName('faq')[1]
    const questionTest1 = document.getElementsByClassName('faq')[0]
    await waitFor(() => fireEvent.click(questionTest1))
    await waitFor(() => fireEvent.click(questionTest2))
    const myClass = questionTest1.classList.contains('open')
    const myClass2 = questionTest2.classList.contains('open')
   expect(myClass).toBe(false);
   expect(myClass2).toBe(true);
  })

})
