import { render, screen } from '@redwoodjs/testing/web'

import Star from './Star'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Star', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Star />)
    }).not.toThrow()
  })

  it('empty by default', () => {
    render(<Star />)
    expect(screen.getByAltText('Empty Star')).toBeInTheDocument()
  })

  it('lights up', () => {
    render(<Star hov={true} />)
    expect(screen.getByAltText('Filled Star')).toBeInTheDocument()
  })
})
