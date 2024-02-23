import Rater from 'web/src/components/Rater/Rater'

// import { Link, routes } from '@redwoodjs/router'

import { Metadata } from '@redwoodjs/web'

const RateTranslationPage = () => {
  let starCount = 3
  return (
    <>
      <Metadata title="RateTranslation" description="RateTranslation page" />
      <Rater stars={starCount} />
    </>
  )
}

export default RateTranslationPage
