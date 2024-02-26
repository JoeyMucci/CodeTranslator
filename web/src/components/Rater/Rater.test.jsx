import { render, screen } from '@redwoodjs/testing/web'

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

  it('one star displays response', () => {
    render(<Rater stars={1} />)
    expect(screen.getByText('expected usable code')).toBeInTheDocument()
  })

  it('two star displays response', () => {
    render(<Rater stars={2} />)
    expect(screen.getByText('"significant errors')).toBeInTheDocument()
  })

  it('three star displays response', () => {
    render(<Rater stars={3} />)
    expect(
      screen.getByText('response == "needs some tweaks"')
    ).toBeInTheDocument()
  })

  it('four star displays response', () => {
    render(<Rater stars={4} />)
    expect(screen.getByText('response = "mostly correct"')).toBeInTheDocument()
  })

  it('five star displays response', () => {
    render(<Rater stars={5} />)
    expect(screen.getByText('response = "Perfect!";')).toBeInTheDocument()
  })
})
