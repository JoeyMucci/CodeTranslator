// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
import AuthLayout from 'web/src/layouts/AuthLayout'

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/translation-history" page={TranslationHistoryPage} name="translationHistory" beforeRouterUpdate={AuthLayout()} />
      <Route path="/help" page={HelpPage} name="help" />
      <Route path="/feedback" page={FeedbackPage} name="feedback" beforeRouterUpdate={AuthLayout()} />
      <Route path="/code-translator" page={CodeTranslatorPage} name="codeTranslator" beforeRouterUpdate={AuthLayout()} />
      <Route path="/" page={HomePage} name="Homepage" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
