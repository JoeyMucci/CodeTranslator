import { render } from '@redwoodjs/testing/web'

import TranslatorLayout from './TranslatorLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TranslatorLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TranslatorLayout />)
    }).not.toThrow()
  })
})
