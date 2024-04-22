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
        <h1 style={{ textAlign: 'center'}}>Feedback Form</h1>

        <div className='form-header flex justify-between'>
          <div className="form-group flex">

            <Label name="subject">
              Subject*:
            </Label>
            <TextField
              className="box bg-text_box"
              name="subject"
              placeholder=" History Page"
              validation={{ required: true }}
              errorClassName="error box"
            />
            <FieldError name="subject" className="error" />
          </div>

          <div className="form-group flex">

            <Label name="b_email">
              Backup Email:
            </Label>
            <TextField
              className="box bg-text_box"
              name="b_email"
              placeholder=" john.smith@gmail.com"
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
        <div className="flex flex-col justify-center space-y-4 ">
          <TextAreaField
            className="box bg-text_box"
            name="message"
            placeholder="Please submit any issue or feedback here. We like to gain information on how we can improve our product"
            rows="20"
            cols="70"
            validation={{ required: true }}
            errorClassName="error box"
          />
          <FieldError name="message" className="error" />

        <br></br>
        <div className='flex justify-center'>
        <Submit className="submitbox bg-button" disabled={loading}>
          Submit
        </Submit>
        </div>
        </div>
      </Form>
    </>
  )
}

export default FeedbackForm
