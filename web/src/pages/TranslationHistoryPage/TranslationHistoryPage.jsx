// import { Link, routes } from '@redwoodjs/router'
import RecordsCell from 'web/src/components/RecordsCell/RecordsCell.jsx'

import { Metadata } from '@redwoodjs/web'

import arrow from 'web/public/Arrow.png';

const RecordhistoryPage = () => {
  let emil = localStorage.getItem('userEmail')
  return (
    <>
      <Metadata
        title="Translationhistory"
        description="Translationhistory page"
      />

      <h1 className="text">Translation History</h1>
  <div className="flex flex-row justify-center space-x-20">
    <div className="OriginalFilter basis-1/4" style={{width: '600px'}}>
      <label htmlFor="language" className="text-white">
              Filter by Input Language:
            </label>
            <div className="flex flex-row justify-between">
              <select
                name="language"
                id="language"
                className="mt-1 h-7 w-20 basis-3/4 rounded bg-text_box text-center hover:bg-blue-200 "
              >
                <option value="Default">All Languages</option>
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="PHP">PHP</option>
                <option value="Python">Python</option>
                <option value="SQL">SQL</option>
              </select>
            </div>
    </div>
    <div className="flex flex-col justify-center items-center ">
          <img
            alt="arrow"
            className="basis-1/2;"
            src={arrow}
            style={{ width: '75px', height: '50px', align: 'middle', opacity: '0'}}
          ></img>
        </div>
    <div className="OriginalFilter basis-1/4" style={{width: '600px'}}>
      <label htmlFor="language" className="text-white">
      Filter by Output Language:
            </label>
            <div className="flex flex-row justify-between">
              <select
                name="language"
                id="language"
                className="mt-1 h-7 w-20 basis-3/4 rounded bg-text_box text-center hover:bg-blue-200 "
              >
                <option value="Default">All Languages</option>
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="PHP">PHP</option>
                <option value="Python">Python</option>
                <option value="SQL">SQL</option>
              </select>
            </div>
    </div>
  </div>
      <RecordsCell goal={emil} />
    </>
  )
}

export default RecordhistoryPage
