import { render } from '@redwoodjs/testing/web'

import Rater from './Rater'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Rater', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Rater />)
    }).not.toThrow()
  })
})
