import { render } from '@redwoodjs/testing/web'

import Record from './Record'

describe('Record', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Record />)
    }).not.toThrow()
  })
})
