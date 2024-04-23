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
    <Router beforeRouterUpdate={AuthLayout()}>
      <Route path="/translation-history" page={TranslationHistoryPage} name="translationHistory" />
      <Route path="/help" page={HelpPage} name="help" />
      <Route path="/feedback" page={FeedbackPage} name="feedback" />
      <Route path="/code-translator" page={CodeTranslatorPage} name="codeTranslator" />
      <Route path="/profile-editing" page={UserEditingPage} name="userEditing" />
      <Route path="/release-notes" page={ReleaseNotesPage} name="releaseNotes" />
      <Route path="/" page={HomePage} name="Homepage" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="Forgot Password" />
      <Route path="/reset-password" page={ResetPage} name="Reset Password" />
      <Route path="/two-factor" page={FactorPage} name="Two factor Authentification" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
