import Rater from 'web/src/components/Rater/Rater.jsx'

import { useForm } from '@redwoodjs/forms'
import { Metadata, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_RATING = gql`
  mutation CreateRatingMutation($input: CreateRatingInput!) {
    createRating(input: $input) {
      id
    }
  }
`
const RateTranslationPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_RATING, {
    onCompleted: () => {
      toast.success('Thank you for rating us!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    if (data.score == null) return // If the user does not give a star rating do not let that go to db
    data.score = parseInt(data.score) // Covert string to int
    create({ variables: { input: data } })
  }
  return (
    <>
      <Metadata title="RateTranslation" description="RateTranslation page" />
      <Toaster />
      <Rater
        onSubmit={onSubmit}
        error={error}
        loading={loading}
        formMethods={formMethods}
      />
    </>
  )
}

export default RateTranslationPage
