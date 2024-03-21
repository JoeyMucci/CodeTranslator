import { render } from '@redwoodjs/testing/web'

import TranslationhistoryPage from './TranslationhistoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TranslationhistoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TranslationhistoryPage />)
    }).not.toThrow()
  })
})
