import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const TranslationhistoryPage = () => {
  return (
    <>
      <Metadata
        title="Translationhistory"
        description="Translationhistory page"
      />

      <h1>TranslationhistoryPage</h1>
      <p>
        Find me in{' '}
        <code>
          ./web/src/pages/TranslationhistoryPage/TranslationhistoryPage.jsx
        </code>
      </p>
      <p>
        My default route is named <code>translationhistory</code>, link to me
        with `<Link to={routes.translationhistory()}>Translationhistory</Link>`
      </p>
    </>
  )
}

export default TranslationhistoryPage
