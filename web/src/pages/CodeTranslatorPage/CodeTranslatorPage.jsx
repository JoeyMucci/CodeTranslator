import React, { useEffect, useRef, useState } from 'react'

// was previously running this directly in the fronted, imrpoved security by using GraphQL mutation
//import { runTranslation } from 'api/src/services/gpt/gpt.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
import Rater from 'web/src/components/Rater/Rater.jsx'
import StarDataCell from 'web/src/components/StarDataCell/StarDataCell.jsx'

//import { Link, routes } from '@redwoodjs/router'
import { useForm } from '@redwoodjs/forms'
import { Metadata, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import isFileOkay from './isFileOkay'

import 'web/src/index.css'

const CREATE_RATING = gql`
  mutation CreateRatingMutation($input: CreateRatingInput!) {
    createRating(input: $input) {
      id
    }
  }
`

const CREATE_TRANSLATION = gql`
  mutation CreateTranslationMutation($input: CreateTranslationInput!) {
    createTranslation(input: $input) {
      id
    }
  }
`

const CREATE_TRANSLATION_REQUEST = gql`
  mutation CreateTranslationRequestMutation(
    $input: CreateTranslationRequestInput!
  ) {
    runTranslationMute(input: $input) {
      rescode
      error
    }
  }
`

const CodeTranslatorPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_RATING, {
    onCompleted: () => {
      toast.success('Thank you for rating us!')
      formMethods.reset()
    },
  })

  // eslint-disable-next-line no-unused-vars
  const [createtrans, { loadingtrans, errortrans }] = useMutation(
    CREATE_TRANSLATION,
    {
      onCompleted: () => {},
    }
  )

  // eslint-disable-next-line no-unused-vars
  const [createtransreq, { loadingtransreq, errortransreq }] = useMutation(
    CREATE_TRANSLATION_REQUEST,
    {
      onCompleted: () => {},
    }
  )

  const onSubmit = async (data) => {
    data.score = parseInt(data.score) // Covert string to int
    try {
      await create({ variables: { input: data } })
    } catch (error) {
      if (error.code == 'BAD_USER_INPUT')
        codeError('Input not recognized, please enter rating appropriately')
      else if (error.code == 'BAD_REQUEST')
        codeError('Request could not make it to our server, try again')
      else codeError('Communication with GraphQL off, try again later')
      console.error(error)
    }
  }

  const [inputText1, setInputText1] = useState('')
  const languageDropdownRef1 = useRef(null)
  const languageDropdownRef2 = useRef(null)
  const [code, setCode] = useState('')

  //for code highlighting

  useEffect(() => {
    // Initialize highlight.js
    hljs.highlightAll()
    // if (languageDropdownRef2.current) {
    //   console.log(languageDropdownRef2.current.value)
    //   // Perform operations
    // }
  }, [])

  //
  const handleInputChange1 = (e) => {
    setInputText1(e.target.value)
  }

  const codeChange = (e) => {
    setCode(e.target.value)
  }

  const fileInputRef = useRef(null)

  const codeError = (message) => {
    setCode('')
    codeRef.current.value = ''
    toast.error(message)
  }

  // Function to simulate click on hidden input
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  // Function to handle file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        const fileContent = await readFileContent(file)
        setInputText1(fileContent)
        // console.log('File content:', fileContent)
      } catch (error) {
        if (error.message == 'non code input')
          toast.error('Please enter a code file')
        else toast.error('File import failed')
        console.error('Error reading file:', error.message)
      }
    }
  }

  const handleTranslateSubmission = () => {
    translateCode()
  }
  //
  const translateCode = async () => {
    // try {
    //   if (codeRef.current.value != '')
    //     codeRef.current.value = rawCodeRef.current.value
    //   console.log(codeRef.current.value)
    //   setCode(codeRef.current.value)
    // } catch (error) {
    //   console.error('Translation error:', error)
    // }
    try {
      setCode('loading...')
      const originalCode = rawCodeRef.current.value
      const originalLanguage = languageDropdownRef1.current.value
      const translatedLanguage = languageDropdownRef2.current.value
      // if (codeRef.current.value != '')
      //   codeRef.current.value = rawCodeRef.current.value
      const response = await createtransreq({
        variables: {
          input: {
            fromLanguage: originalLanguage,
            toLanguage: translatedLanguage,
            code: originalCode,
          },
        },
      })
      const translatedCode = response.data.runTranslationMute.rescode
      if (translatedCode == 'ERROR') {
        const errorcode = response.data.runTranslationMute.error
        if (errorcode == 'nonsense') codeError('Your code was not recognized')
        else if (errorcode == 'mt') codeError('Please enter code')
        else if (errorcode == 'too long')
          codeError('Code is too long, try breaking up input')
        else if (errorcode == 'wrong lang')
          codeError('Ensure selected language matches input')
        else if (errorcode == 'spam') codeError("We're working on it!")
        else if (errorcode == 'invalid_api_key')
          codeError('API Key is invalid, please contact us')
        else if (errorcode == 'rate_limit_error')
          codeError('Experiencing heavy traffic, try again later')
        else if (errorcode == 'server_error')
          codeError('OpenAI is having trouble, try again soon')
        else if (errorcode == 'not_found_error')
          codeError('OpenAI resource no longer exists')
        else codeError('Open AI error: ' + errorcode)
      } else {
        setCode(translatedCode)
        codeRef.current.value = translatedCode
        await createtrans({
          variables: {
            input: {
              userEmail: localStorage.getItem('userEmail'),
              originalCode: originalCode,
              translatedCode: translatedCode,
              originalLanguage: originalLanguage,
              translatedLanguage: translatedLanguage,
            },
          },
        })
        toast.success('Successful translation')
      }
    } catch (error) {
      if (error.code == 'BAD_USER_INPUT')
        codeError('Input not recognized, please enter code in form of text')
      else if (error.code == 'BAD_REQUEST')
        codeError('Request could not make it to our server, try again')
      else codeError('Communication with GraphQL off, try again later')
      console.error(error)
    }
  }
  //handles download button
  const handleDownloadClick = () => {
    const contentToDownload = codeRef.current.value
    const selectedLanguageValue = languageDropdownRef2.current.value

    // Determine the file extension based on the selected language
    if (contentToDownload == '' || contentToDownload == undefined) {
      alert('Translation area is empty. Please enter code before downloading.')
      return
    }

    let fileExtension
    switch (selectedLanguageValue) {
      case 'C':
        fileExtension = 'c'
        break
      case 'C++':
        fileExtension = 'cpp'
        break
      case 'Java':
        fileExtension = 'java'
        break
      case 'PHP':
        fileExtension = 'php'
        break
      case 'Python':
        fileExtension = 'py'
        break
      case 'SQL':
        fileExtension = 'sql'
        break
      case 'Rust':
        fileExtension = 'rs'
        break
      case 'R':
        fileExtension = 'r'
        break
      case 'Go':
        fileExtension = 'go'
        break
      default:
        fileExtension = 'txt'
    }
    const blob = new Blob([contentToDownload], { type: 'text/plain' })

    // Create a download link
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `RosettaCodeTranslated.${fileExtension}`

    // Append the link to the document
    document.body.appendChild(link)

    // Trigger a click on the link to start the download
    link.click()

    // Remove the link from the document
    document.body.removeChild(link)
  }

  const readFileContent = (file) => {
    if (!isFileOkay(file)) throw new Error('non code input')
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target.result)
      }
      reader.onerror = () => {
        reject(new Error('Unable to read file.'))
      }
      reader.readAsText(file)
    })
  }

  //copy button
  //const translatedCodeRef = useRef(null)
  const rawCodeRef = useRef(null)
  const codeRef = useRef(null)
  //const [translatedCode] = useState('')

  const handleCopyClick = () => {
    // Select the text in the textarea
    if (codeRef.current.value == '' || codeRef.current.value == undefined) {
      alert('Translation area is empty. Please enter code before copying.')
      return
    }
    let r = document.createRange()
    r.selectNode(document.getElementById('copy me'))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(r)
    document.execCommand('copy') // DEPRECATED BRUH
    window.getSelection().removeAllRanges()

    toast.success('Copied to clipboard!', {
      position: 'top-right',
      autoClose: 2000, // Milliseconds, set to 0 to stay open until manually closed
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  //

  //function languageMapping(selectedLanguage) {
  // switch (selectedLanguage) {
  //  case 'C':
  //    console.log('we in c for mapping')
  //   return 'c'
  //  case 'C++':
  //  //  return 'cpp'
  // case 'Java':
  //   return 'java'
  // Add other cases as needed
  //  default:
  // return 'plaintext' // Use 'plaintext' for unsupported languages
  // }
  // }

  return (
    <>
      <div className="min-h-screen bg-primary">
        <Metadata title="CodeTranslator" description="CodeTranslator page" />
        <div className="flex w-full justify-center ">
          <img
            src="public/Rosetta_Code.png"
            alt="rosetta code"
            className="mt-20"
          />
        </div>

        <div className="flex flex-row justify-center space-x-20 pt-10">
          {/* Input Box */}

          <div className="flex basis-1/4 flex-col ">
            <label htmlFor="language" className="text-white">
              Choose a coding language:
            </label>
            <div className="flex flex-row justify-between">
              <select
                ref={languageDropdownRef1}
                name="language"
                id="language"
                className="mt-1 h-7 w-20 basis-3/4 rounded bg-text_box text-center hover:bg-blue-200 "
              >
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

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <button
                className=" basis-1/8 w-8 rounded text-white hover:bg-gray-800 "
                aria-label="add file"
                onClick={handleButtonClick}
              >
                {' '}
                <img
                  src="https://img.icons8.com/sf-black-filled/64/FFFFFF/add-file.png"
                  alt="buttonpng"
                  border="0"
                />
              </button>
            </div>

            <textarea
              type="text"
              value={inputText1}
              onChange={handleInputChange1}
              ref={rawCodeRef}
              rows={20}
              placeholder="Enter code to translate"
              className=" mt-5 w-full resize-none rounded border-gray-300 bg-text_box p-4 placeholder-gray-600"
              data-testid="InputBoxTestId"
            />

            <button
              className="mt-5 w-1/2 justify-center  rounded bg-sky-700 text-white hover:bg-sky-800 "
              onClick={handleTranslateSubmission}
              aria-label="Translate"
            >
              Translate
            </button>
          </div>

          {/* Output Box */}
          <div className="flex basis-1/4 flex-col ">
            <label htmlFor="language" className="text-white">
              Choose a coding language to translate to:
            </label>
            <div className="flex flex-row justify-between">
              <select
                ref={languageDropdownRef2}
                name="language"
                id="language"
                className="mt-1 h-7 w-20 basis-3/4 rounded bg-text_box text-center hover:bg-blue-200 "
              >
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

              <button
                className=" basis-1/8 w-8 rounded text-center text-white hover:bg-gray-800"
                onClick={handleCopyClick}
                aria-label="Copy"
              >
                {' '}
                <img
                  src="https://img.icons8.com/material-outlined/96/FFFFFF/copy.png"
                  alt="copy"
                  border="0"
                />
              </button>
              <button
                className=" basis-1/8 w-8  items-center rounded text-white hover:bg-gray-800"
                onClick={handleDownloadClick}
                aria-label="Download"
              >
                <img
                  src="https://img.icons8.com/material-rounded/64/FFFFFF/download--v1.png"
                  alt="copy"
                  border="0"
                />
              </button>
            </div>

            <div
              id="copy me"
              ref={codeRef}
              onChange={codeChange}
              className=" custom-syntax-highlighter mt-5 w-full resize-none overflow-auto rounded border-gray-300 bg-text_box p-4"
              style={{
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                height: '510px', // Height for approximately 20 row
                padding: '8px',
                // Use a background color that matches your theme
                fontSize: '16px', // Adjust as needed
                lineHeight: '1.5', // Adjust as needed
                overflowY: 'auto', // Ensure vertical scrolling
              }}
              aria-readonly="true"
              data-testid="codeDivTestId"
            >
              <pre>
                <code
                  className={`language-${languageDropdownRef2.current?.value}`}
                  placeholder="test"
                  dangerouslySetInnerHTML={{
                    __html: hljs.highlightAuto(code).value,
                  }}
                  data-testid="codeDivTestIdTwo"
                />
              </pre>
            </div>
            <Toaster />
            <div className="flex flex-row space-x-5">
              <Rater
                onSubmit={onSubmit}
                error={error}
                loading={loading}
                formMethods={formMethods}
              />
              <StarDataCell />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CodeTranslatorPage
