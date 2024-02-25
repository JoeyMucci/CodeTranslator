import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const CodeTranslatorPage = () => {
  return (
    <>
      <Metadata title="CodeTranslator" description="CodeTranslator page" />

      <h1>CodeTranslatorPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CodeTranslatorPage/CodeTranslatorPage.jsx</code>
      </p>
      <p>
        My default route is named <code>codeTranslator</code>, link to me with `
        <Link to={routes.codeTranslator()}>CodeTranslator</Link>`
      </p>
    </>
  )
}

export default CodeTranslatorPage
