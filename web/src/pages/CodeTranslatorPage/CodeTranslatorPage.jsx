import { useState } from 'react'
import React, { useEffect, useRef } from 'react'

import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
import { toast } from 'react-toastify'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import 'web/src/index.css'

const CodeTranslatorPage = () => {
  const [inputText1, setInputText1] = useState('')
  //const languageDropdownRef1 = useRef(null)
  const languageDropdownRef2 = useRef(null)
  const [code, setCode] = useState('')

  //for code highlighting

  useEffect(() => {
    // Initialize highlight.js
    hljs.highlightAll()
    if (languageDropdownRef2.current) {
      console.log(languageDropdownRef2.current.value)
      // Perform operations
    }
  }, [])

  //
  const handleInputChange1 = (e) => {
    setInputText1(e.target.value)
  }

  const codeChange = (e) => {
    setCode(e.target.value)
  }

  const fileInputRef = useRef(null)

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
        console.log('File content:', fileContent)
      } catch (error) {
        console.error('Error reading file:', error.message)
      }
    }
  }

  //ONLY COPIES THE LEFT TEXT BOX FOR NOW
  const handleTranslateSubmission = () => {
    codeRef.current.value = rawCodeRef.current.value
    setCode(rawCodeRef.current.value)
  }
  //

  //handles download button
  const handleDownloadClick = () => {
    const contentToDownload = codeRef.current.value
    const selectedLanguageValue = languageDropdownRef2.current.value

    // Determine the file extension based on the selected language
    if (contentToDownload === '') {
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
  //

  const readFileContent = (file) => {
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
  const translatedCodeRef = useRef(null)
  const rawCodeRef = useRef(null)
  const codeRef = useRef(null)
  //const [translatedCode] = useState('')

  const handleCopyClick = () => {
    // Select the text in the textarea

    translatedCodeRef.current.select()

    // Copy the selected text to the clipboard
    document.execCommand('copy')

    // Deselect the text
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
            src="images/Rosetta_Code.png"
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
              </select>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <button
                className=" basis-1/8 w-8 rounded text-white hover:bg-gray-800 "
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
            />

            <button
              className="mt-5 w-1/2 justify-center  rounded bg-sky-700 text-white hover:bg-sky-800 "
              onClick={handleTranslateSubmission}
            >
              {'Translate'}
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
              </select>

              <button
                className=" basis-1/8 w-8 rounded text-center text-white hover:bg-gray-800"
                onClick={handleCopyClick}
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
              >
                <img
                  src="https://img.icons8.com/material-rounded/64/FFFFFF/download--v1.png"
                  alt="copy"
                  border="0"
                />
              </button>
            </div>

            <div
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
            >
              <pre>
                <code
                  className={`language-${languageDropdownRef2.current?.value}`}
                  dangerouslySetInnerHTML={{
                    __html: hljs.highlightAuto(code).value,
                  }}
                />
              </pre>
            </div>
          </div>
        </div>
        <p className="absolute bottom-0 items-center  text-center">
          My default route is named <code>codeTranslator</code>, link to me with
          `<Link to={routes.codeTranslator()}>CodeTranslator</Link>`
        </p>
      </div>
    </>
  )
}

export default CodeTranslatorPage
