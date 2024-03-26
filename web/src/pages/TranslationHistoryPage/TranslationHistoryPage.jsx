// import { Link, routes } from '@redwoodjs/router'
import RecordsCell from 'web/src/components/RecordsCell/RecordsCell.jsx'

import { Metadata } from '@redwoodjs/web'

const RecordhistoryPage = () => {
  let emil = localStorage.getItem('userEmail')
  return (
    <>
      <Metadata
        title="Translationhistory"
        description="Translationhistory page"
      />

      <h1 className="text">Translation History</h1>
      <RecordsCell goal={emil} />
    </>
  )
}

export default RecordhistoryPage
