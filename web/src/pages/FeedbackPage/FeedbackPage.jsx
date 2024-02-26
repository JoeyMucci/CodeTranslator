import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
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

  const onSubmit = (data) => {
    create({ variables: { input: data } })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <Form
        onSubmit={onSubmit}
        config={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        <FormError error={error} wrapperClassName="form-error" />
        <h1 className="text">Feedback Form</h1>
        <div className="form-header">
          <div className="form-group">
            <Label name="name" className="text">
              Name:
            </Label>
            <TextField
              className="box"
              name="name"
              validation={{ required: true }}
              errorClassName="error box"
            />
            <FieldError name="name" className="error" />
          </div>

          <div className="form-group">
            <Label name="email" className="text">
              Email:
            </Label>
            <TextField
              className="box"
              name="email"
              validation={{
                required: true,
                pattern: {
                  value: /^[^@]+@[^.]+\..+$/,
                  message: 'Please enter a valid email address',
                },
              }}
              errorClassName="error box"
            />
            <FieldError name="email" className="error" />
          </div>
        </div>
        <br></br>
        <div className="reg-flex">
          <TextAreaField
            className="box"
            name="message"
            rows="20"
            cols="70"
            validation={{ required: true }}
            errorClassName="error box"
          />
          <FieldError name="message" className="error" />
        </div>
        <br></br>
        <Submit className="submitbox" disabled={loading}>
          Submit
        </Submit>
      </Form>
    </>
  )
}

export default ContactPage
