import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const CodeTranslatorPage = () => {
  return (
    <>
      <div className="bg-blue-300 min-h-screen">
        <Metadata title="CodeTranslator" description="CodeTranslator page" />

        <h1 className="text-3xl underline">CodeTranslatorPage</h1>
        <h2 className="text-3xl underline font-bold bg-blue-500"> s </h2>
        <p>
          Find me in{' '}
          <code>./web/src/pages/CodeTranslatorPage/CodeTranslatorPage.jsx</code>
        </p>
        <p>
          My default route is named <code>codeTranslator</code>, link to me with
          `<Link to={routes.codeTranslator()}>CodeTranslator</Link>`
        </p>
        <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
          {'Test'}
        </button>
      </div>
    </>
  )
}

export default CodeTranslatorPage
