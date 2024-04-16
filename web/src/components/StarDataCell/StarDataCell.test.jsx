import { screen, render } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './StarDataCell'
import { standard } from './StarDataCell.mock'

describe('StarDataCell', () => {
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

  it('handles normal case successfully', async () => {
    render(<Success starData={standard().starData[2]} />) // {avg: 4.2 count: 100}
    expect(screen.getByText(/4.2\(100\)/i)).toBeInTheDocument()
  })

  it('handles no data case successfully', async () => {
    render(<Success starData={standard().starData[0]} />) // {avg: null count: 0}
    expect(screen.getByText(/0 ratings/i)).toBeInTheDocument()
  })

  it('handles nonterminating case successfully', async () => {
    render(<Success starData={standard().starData[1]} />) // {avg: 3.333333333 count: 3}
    expect(screen.getByText(/3.33\(3\)/i)).toBeInTheDocument()
  })

  it('shows bar', async () => {
    render(<Success starData={standard().starData[2]} />) // {avg: 4.2 count: 100}
    expect(screen.getByTestId('range')).toHaveValue(4.2)
  })
})
