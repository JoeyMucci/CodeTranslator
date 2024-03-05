import { Link, routes } from '@redwoodjs/router'

const TranslatorLayout = ({ children }) => {
  return (
    <>
      <header>
        <h1>
          <Link to={routes.home()}>Code Translator</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.ratetranslation()}>Home</Link>
            </li>
            <li>
              <Link to={routes.feedback()}>Feedback</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default TranslatorLayout