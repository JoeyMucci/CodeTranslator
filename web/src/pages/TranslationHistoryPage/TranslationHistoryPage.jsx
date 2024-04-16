// import { Link, routes } from '@redwoodjs/router'
import React, { useState, useRef, useEffect } from 'react';
import RecordsCell from 'web/src/components/RecordsCell/RecordsCell.jsx';
import { Metadata, useQuery } from '@redwoodjs/web'


import arrow from 'web/public/Arrow.png';


const RecordhistoryPage = () => {
  let emil = localStorage.getItem('userEmail')



  const languageDropdownRef1 = useRef(null)
  const languageDropdownRef2 = useRef(null)


  //SORTING FOR DATE AND FILTERING
   const [DateAscending, setDateAscending] = useState(false);
   const [inputLanguage, setInputLanguage] = useState('Default');
  const [outputLanguage, setOutputLanguage] = useState('Default');

   const toggleOrder = () => {
    setDateAscending((prevOrder) => !prevOrder);
   };

   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  return (
    <>

    <div className={`  ${theme === 'light' ? 'light-theme' : theme === 'dark' ? 'dark-theme' : theme === 'snes' ? 'snes-theme' : theme === 'our' ? 'our-theme' : theme === 'terminal' ? 'terminal-theme' : theme === 'dmg' ? 'dmg-theme' : theme === 'nautilus' ? 'nautilus-theme' : theme === 'copper' ? 'copper-theme' : 'beach-theme'}`} >
      <Metadata
        title="Translationhistory"
        description="Translationhistory page"
      />
      <br></br>
      <br></br>
      <h1 className="text">Translation History</h1>
      <hr style={{ margin: 'auto' }}></hr>
      <br></br>
      <br></br>

<div className="flex  justify-center  " style={{ margin: 'auto' }}>
  <div className="flex flex-row justify-center space-x-20">
    <div className="OriginalFilter basis-1/4" style={{width: '600px'}}>
      <label htmlFor="language" >
              Filter by Input Language:
            </label>
            <div className="flex flex-row justify-between">
              <select
                ref={languageDropdownRef1}
                onChange={(e) => setInputLanguage(e.target.value)}
                name="language"
                id="language"
                className="mt-1 h-7 w-20 basis-3/4 rounded bg-dropdown text-center "
              >
                <option value="Default">All Languages</option>
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="PHP">PHP</option>
                <option value="Python">Python</option>
                <option value="SQL">SQL</option>
                <option value="Rust">Rust</option>
                <option value="R">R</option>
                <option value="Go">Go</option>
              </select>
            </div>
    </div>

    <div className="OriginalFilter basis-1/4" style={{width: '600px'}}>
      <label htmlFor="language">
      Filter by Output Language:
            </label>
            <div className="flex flex-row justify-between">
              <select
                ref={languageDropdownRef2}
                onChange={(e) => setOutputLanguage(e.target.value)}
                name="language"
                id="language"
                className="mt-1 h-7 w-20 basis-3/4 rounded bg-dropdown text-center  "
              >
                <option value="Default">All Languages</option>
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="PHP">PHP</option>
                <option value="Python">Python</option>
                <option value="SQL">SQL</option>
                <option value="Rust">Rust</option>
                <option value="R">R</option>
                <option value="Go">Go</option>
              </select>
            </div>

    </div>
    <button className="mt-5 w-1/2 justify-center  rounded bg-button text-white "
              onClick={toggleOrder}
              aria-label="FilterSubmission"
              style={{width: '200px'}}>Toggle Date Desc/Asc</button>


  </div>

  </div>
  <br></br>

  <br></br>
  <hr style={{ margin: 'auto' }}></hr>
      <br></br>
      <RecordsCell  goal={emil}  DateAscending={DateAscending} inputLanguage={inputLanguage} outputLanguage={outputLanguage} />
      </div>
    </>
  )
}

export default RecordhistoryPage
