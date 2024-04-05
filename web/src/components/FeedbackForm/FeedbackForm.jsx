import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'

const FeedbackForm = ({ onSubmit, error, loading, formMethods }) => {
  return (
    <>
      <Form
        onSubmit={onSubmit}
        className="center"
        config={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        <FormError error={error} wrapperClassName="form-error" />
        <h1 className="text">Feedback Form</h1>
        <div className="form-header">
          <div className="form-group">
            <Label name="subject" className="text">
              Subject:
            </Label>
            <TextField
              className="box"
              name="subject"
              placeholder="History Page"
              validation={{ required: true }}
              errorClassName="error box"
            />
            <FieldError name="subject" className="error" />
          </div>

          <div className="form-group">
            <Label name="b_email" className="text">
              SpareEmail:
            </Label>
            <TextField
              className="box"
              name="b_email"
              placeholder="john.smith@gmail.com"
              validation={{
                required: false,
                pattern: {
                  value: /^[^@]+@[^.]+\..+$/,
                  message: 'Please enter a valid email address',
                },
              }}
              errorClassName="error box"
            />
            <FieldError name="b_email" className="error" />
          </div>
        </div>
        <br></br>
        <div className="reg-flex">
          <TextAreaField
            className="box"
            name="message"
            placeholder="Please submit any issue or feedback here. We like to gain information on how we can improve our product"
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

export default FeedbackForm
