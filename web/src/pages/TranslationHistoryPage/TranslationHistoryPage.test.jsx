import { render } from '@redwoodjs/testing/web'

import TranslationHistoryPage from './TranslationHistoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TranslationHistoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TranslationHistoryPage />)
    }).not.toThrow()
  })
})
