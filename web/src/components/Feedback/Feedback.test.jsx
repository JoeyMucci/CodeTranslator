import { render } from '@redwoodjs/testing/web'

import Feedback from './Feedback'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Feedback', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Feedback />)
    }).not.toThrow()
  })
})
