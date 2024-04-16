import { Label, Form, Submit, RadioField } from '@redwoodjs/forms'

const Rater = ({ onSubmit, error, loading, formMethods }) => {
  return (
    <>
      <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
        <p className="smalltext"> How was our translation?</p>
        <fieldset className="rating">
          <RadioField
            id="star5"
            name="score"
            value={5}
            validation={{ required: true }}
          />
          <Label
            className="full"
            htmlFor="star5"
            title='response = "Perfect!";'
          ></Label>
          <RadioField
            id="star4"
            name="score"
            value={4}
            validation={{ required: true }}
          />
          <Label
            className="full"
            htmlFor="star4"
            title='response = "mostly correct"'
          ></Label>
          <RadioField
            id="star3"
            name="score"
            value={3}
            validation={{ required: true }}
          />
          <Label
            className="full"
            htmlFor="star3"
            title='response == "needs some tweaks"'
          ></Label>
          <RadioField
            id="star2"
            name="score"
            value={2}
            validation={{ required: true }}
          />
          <Label
            className="full"
            htmlFor="star2"
            title='response == "significant errors'
          ></Label>
          <RadioField
            id="star1"
            name="score"
            value={1}
            validation={{ required: true }}
          />
          <Label
            className="full"
            htmlFor="star1"
            title="error: expected usable code"
          ></Label>
        </fieldset>
        <Submit className="submitbutton bg-button text-white" disabled={loading}>
          Submit
        </Submit>
      </Form>
    </>
  )
}

export default Rater
