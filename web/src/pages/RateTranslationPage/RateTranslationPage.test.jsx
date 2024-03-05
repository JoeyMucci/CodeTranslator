import { render } from '@redwoodjs/testing/web'

import RateTranslationPage from './RateTranslationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RateTranslationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RateTranslationPage />)
    }).not.toThrow()
  })
})
