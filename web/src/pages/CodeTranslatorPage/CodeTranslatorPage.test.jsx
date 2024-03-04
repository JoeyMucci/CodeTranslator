import { render } from '@redwoodjs/testing/web'

import CodeTranslatorPage from './CodeTranslatorPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CodeTranslatorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CodeTranslatorPage />)
    }).not.toThrow()
  })
})
