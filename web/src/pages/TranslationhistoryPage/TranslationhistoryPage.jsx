import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import TranslationCell from 'src/components/TranslationCell'

const TranslationhistoryPage = () => {
  return (
    <>
      <Metadata
        title="Translationhistory"
        description="Translationhistory page"
      />

      <h1 className="text">Translation History</h1>
      <TranslationCell />

    </>
  )
}

export default TranslationhistoryPage
