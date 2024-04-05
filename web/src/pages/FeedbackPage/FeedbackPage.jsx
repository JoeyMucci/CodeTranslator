import FeedbackForm from 'web/src/components/FeedbackForm/FeedbackForm.jsx'

import { useForm } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!')
      formMethods.reset()
    },
  })

  const onSubmit = async (partialdata) => {
    const fulldata = {
      email: localStorage.getItem('userEmail'),
      subject: partialdata.subject,
      backupEmail: partialdata.b_email,
      message: partialdata.message,
    }
    try {
      await create({ variables: { input: fulldata } })
    } catch (error) {
      toast.error('Communication with GraphQL off, try again later')
      console.error(error)
    }
  }
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <Toaster />
      <FeedbackForm
        onSubmit={onSubmit}
        error={error}
        loading={loading}
        formMethods={formMethods}
      />
    </>
  )
}

export default ContactPage
