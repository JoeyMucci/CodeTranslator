import { render, screen } from '@redwoodjs/testing/web'

import Star from './Star'

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
