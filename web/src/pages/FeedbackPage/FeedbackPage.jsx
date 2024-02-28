import FeedbackForm from 'web/src/components/FeedbackForm/FeedbackForm.jsx'

import { MetaTags } from '@redwoodjs/web'

const ContactPage = () => {
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <FeedbackForm />
    </>
  )
}

export default ContactPage
