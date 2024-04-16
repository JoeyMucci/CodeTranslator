import { render, screen } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './FeedbacksCell'
import { standard } from './FeedbacksCell.mock'

describe('FeedbacksCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success feedbacks={standard().feedbacks} />)
    }).not.toThrow()
  })

  it('renders name successfully', async () => {
    render(<Success feedbacks={standard().feedbacks} />)
    expect(screen.getByText(/Posted by: Trevor/i)).toBeInTheDocument()
  })

  it('renders no name successfully', async () => {
    render(<Success feedbacks={standard().feedbacks} />)
    expect(screen.getByText(/Posted by: Anonymous/i)).toBeInTheDocument()
  })

  it('renders dates successfully', async () => {
    render(<Success feedbacks={standard().feedbacks} />)
    expect(
      screen.getByText(/Created on April 06, 2024 at 9:29:31 PM/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Created on May 04, 1999 at 6:09:36 AM/i)
    ).toBeInTheDocument()
  })
})
