import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import Rater from './Rater'

describe('Rater', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Rater />)
    }).not.toThrow()
  })

  it('displays prompt', () => {
    render(<Rater />)
    expect(screen.getByText('How was our translation?')).toBeInTheDocument()
  })

  it('does not allow a zero-star response', async () => {
    const onSubmit = jest.fn()
    render(<Rater onSubmit={onSubmit} />)
    const submitButton = screen.getByText('Submit')
    await waitFor(() => userEvent.click(submitButton)) // Click submit without selecting a star
    expect(onSubmit).not.toHaveBeenCalled() //onSubmit is not called
  })

  it('does allow a valid repsonse', async () => {
    const onSubmit = jest.fn()
    render(<Rater onSubmit={onSubmit} />)
    const oneStarButton = screen.getByTitle('error: expected usable code')
    const submitButton = screen.getByText('Submit')
    await waitFor(() => userEvent.click(oneStarButton)) // Select one star
    await waitFor(() => userEvent.click(submitButton)) // Then click submit
    expect(onSubmit).toHaveBeenCalled() // onSubmit is called
  })
})
