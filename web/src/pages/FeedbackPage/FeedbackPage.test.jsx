import { render } from '@redwoodjs/testing/web'

import FeedbackPage from './FeedbackPage'

describe('FeedbackPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeedbackPage />)
    }).not.toThrow()
  })
})
