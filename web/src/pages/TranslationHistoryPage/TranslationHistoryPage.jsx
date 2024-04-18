// import { Link, routes } from '@redwoodjs/router'
import React, { useState, useRef, useEffect } from 'react';
import RecordsCell from 'web/src/components/RecordsCell/RecordsCell.jsx';
import { Metadata, useQuery, gql, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'


import arrow from 'web/public/Arrow.png';

const QUERY = gql`
query RecordsQuery($goal: String!) {
  records: myTranslations(emmy: $goal){
    id
  }
}
`;

const DELETE_TRANSLATION = gql`
mutation DeleteTranslationMutation($id: Int!) {
  deleteTranslation(id: $id) {
    id
  }
}
`


const RecordhistoryPage = () => {
  let emil = localStorage.getItem('userEmail')

  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: { goal: emil},
  });

  const [deleteTranslation] = useMutation(DELETE_TRANSLATION);


  const languageDropdownRef1 = useRef(null)
  const languageDropdownRef2 = useRef(null)


  //DELETE ALL BUTTON
  const handleDeleteAllTranslations = async () => {

    if (confirm('Are you sure you want to delete all translations? THIS ACTION CANNOT BE UNDONE')) {
      try {
        await Promise.all(data.records.map(async (record) => {
          console.log('deleting record with ID: ', record.id);
          await deleteTranslation({ variables: { id: record.id } });
        }));

          //location.reload();
          await refetch();

        toast.success('GoodBye history!');
      } catch (error) {
        console.error('Error deleting translations:', error);
        toast.error('Failed to delete translations. Please try again later.');
      }
    }
};

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

    <div className={`  ${theme === 'light' ? 'light-theme' : theme === 'dark' ? 'dark-theme' : theme === 'snes' ? 'snes-theme' : theme === 'our' ? 'our-theme' : theme === 'terminal' ? 'terminal-theme' : theme === 'dmg' ? 'dmg-theme' : theme === 'nautilus' ? 'nautilus-theme' : theme === 'copper' ? 'copper-theme' : 'beach-theme'}`} style={{minHeight: '100vh'}}>
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
    <div className="OriginalFilter basis-1/5" style={{width: '600px'}}>
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
    <Toaster />
    <div className="OriginalFilter basis-1/5" style={{width: '600px'}}>
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

<button className="mt-5 w-1/2 justify-center  rounded bg-button "
              onClick={handleDeleteAllTranslations}
              aria-label="Delete"
              style={{width: '200px', border: '2px solid red', color: 'red'}}>Delete All Translations</button>
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
