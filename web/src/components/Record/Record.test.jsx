import { render } from '@redwoodjs/testing/web'

import Record from './Record'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Record', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Record />)
    }).not.toThrow()
  })
})
