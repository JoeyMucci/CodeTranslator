import { useState } from 'react'
import React, { useEffect, useRef } from 'react'

import hljs from 'highlight.js'
import { toast } from 'react-toastify'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import 'highlight.js/styles/default.css'

const CodeTranslatorPage = () => {
  const [inputText1, setInputText1] = useState('')
  const languageDropdownRef = useRef(null)

  //for code highlighting

  useEffect(() => {
    // Initialize highlight.js
    hljs.highlightAll()
  }, [])

  const handleTextareaChange = () => {
    // Apply syntax highlighting when the content of the textarea changes
    hljs.highlightBlock(translatedCodeRef.current)
  }
  //
  const handleInputChange1 = (e) => {
    setInputText1(e.target.value)
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
    translatedCodeRef.current.value = rawCodeRef.current.value
  }
  //

  //handles download button
  const handleDownloadClick = () => {
    const contentToDownload = translatedCodeRef.current.value
    const selectedLanguageValue = languageDropdownRef.current.value

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
  const [translatedCode] = useState('')

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

  return (
    <>
      <div className="min-h-screen bg-primary">
        <Metadata title="CodeTranslator" description="CodeTranslator page" />
        <div className="w-full flex justify-center ">
          <img
            src="images/Rosetta_Code.png"
            alt="rosetta code"
            className="mt-20"
          />
        </div>

        <div className="flex flex-row pt-10 justify-center space-x-20">
          {/* Input Box */}

          <div className="flex flex-col basis-1/4 ">
            <label htmlFor="language" className="text-white">
              Choose a coding language:
            </label>
            <div className="flex flex-row justify-between">
              <select
                name="language"
                id="language"
                className="mt-1 rounded w-20 h-7 text-center basis-3/4 bg-text_box hover:bg-blue-200 "
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
                className=" text-white hover:bg-gray-800 w-8 rounded basis-1/8 "
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
              className=" w-full resize-none p-4 bg-text_box border-gray-300 placeholder-gray-600 rounded mt-5"
            />

            <button
              className="bg-sky-700 text-white hover:bg-sky-800  mt-5 w-1/2 rounded justify-center "
              onClick={handleTranslateSubmission}
            >
              {'Translate'}
            </button>
          </div>

          {/* Output Box */}
          <div className="flex flex-col basis-1/4 ">
            <label htmlFor="language" className="text-white">
              Choose a coding language to translate to:
            </label>
            <div className="flex flex-row justify-between">
              <select
                ref={languageDropdownRef}
                name="language"
                id="language"
                className="mt-1 rounded w-20 h-7 text-center basis-3/4 bg-text_box hover:bg-blue-200 "
              >
                <option value="C">C</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="PHP">PHP</option>
                <option value="Python">Python</option>
                <option value="SQL">SQL</option>
              </select>

              <button
                className=" text-white hover:bg-gray-800 w-8 text-center rounded basis-1/8"
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
                className=" text-white hover:bg-gray-800  w-8 rounded items-center basis-1/8"
                onClick={handleDownloadClick}
              >
                <img
                  src="https://img.icons8.com/material-rounded/64/FFFFFF/download--v1.png"
                  alt="copy"
                  border="0"
                />
              </button>
            </div>
            <textarea
              readOnly
              type="text"
              value={translatedCode}
              ref={translatedCodeRef}
              onChange={handleTextareaChange}
              rows={20}
              placeholder="Translated code will appear here"
              className="w-full l resize-none p-4 border-gray-300 rounded mt-5 bg-text_box"
            />
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
