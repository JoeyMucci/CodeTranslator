import React, { useRef, useEffect, useState } from 'react'

import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import arrow from 'web/public/Arrow.png'

const Record = ({
  // eslint-disable-next-line no-unused-vars
  id,
  originalCode,
  translatedCode,
  originalLanguage,
  translatedLanguage,
  createdAt,
}) => {
  const originalCodeRef = useRef(null)
  const translatedCodeRef = useRef(null)

  useEffect(() => {
    hljs.highlightBlock(originalCodeRef.current)
    hljs.highlightBlock(translatedCodeRef.current)
  }, [originalCode, translatedCode])

  const [isOriginalCodeExpanded, setOriginalCodeExpanded] = useState(false)
  const [isTranslatedCodeExpanded, setTranslatedCodeExpanded] = useState(false)

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'long', // "January"
      day: '2-digit', // "01"
      year: 'numeric', // "2024"
      hour: 'numeric', // "11"
      minute: '2-digit', // "24"
      second: '2-digit', // "15"
      hour12: true, // Use AM/PM
    })
  }

  // Function to toggle the expansion state of original code
  const toggleOriginalCode = () => {
    if (originalCodeRef.current.scrollHeight > 150) {
      setOriginalCodeExpanded(!isOriginalCodeExpanded)
    }
  }

  // Function to toggle the expansion state of translated code
  const toggleTranslatedCode = () => {
    console.log('test')
    if (translatedCodeRef.current.scrollHeight > 150) {
      setTranslatedCodeExpanded(!isTranslatedCodeExpanded)
    }
  }

  //handles download button
  const handleDownloadClick = (inputOutputFlag) => {
    let contentToDownload = originalCode
    let selectedLanguageValue = originalLanguage
    let fileName = 'InputFile'

    if (inputOutputFlag === 'output') {
      contentToDownload = translatedCode
      selectedLanguageValue = translatedLanguage
      fileName = 'OutputFile'
    }

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

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${fileName}.${fileExtension}`

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
  }

  const handleCopyClick = (inputOutputFlag) => {
    let codeToCopy = ''
    let codeElement = null

    if (inputOutputFlag === 'input') {
      codeToCopy = originalCode
      codeElement = originalCodeRef.current
    } else {
      codeToCopy = translatedCode
      codeElement = translatedCodeRef.current
    }

    //idk if we really need this but ill keep it in for now
    if (!codeToCopy) {
      alert('There is no code to copy.')
      return
    }

    const range = document.createRange()
    range.selectNode(codeElement)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)

    // Execute copy command
    document.execCommand('copy')

    // Deselect the code element
    window.getSelection().removeAllRanges()
  }

  return (
    <>
      <div className="flex flex-row justify-center space-x-20  ">
        <div className=" basis-1/4">
               <div className = "flex flex-row m-1">
              <h2 className="centertext">{originalLanguage}</h2>

              <div className = "TOTHERIGHT flex flex-row m-1" style={{ marginLeft: 'auto' }}>
                <button
                  className=" DOWNLOADBUTTON basis-1/8 w-8  items-center rounded bg-button"
                  onClick={() => handleDownloadClick("input")}
                  aria-label="Download"
                  style={{ width: '40px' }}
                >
                  <img
                    src="https://img.icons8.com/material-rounded/64/FFFFFF/download--v1.png"
                    alt="copy"
                    border="0"
                  />
                </button>
                <div style={{ width: '20px' }}></div>
                <button
                  className="COPYBUTTON basis-1/8 w-8 rounded text-center bg-button"
                  onClick={() => handleCopyClick("input")}
                  aria-label="Copy"
                  style={{ width: '40px' }}
                >
                  {' '}
                  <img
                    src="https://img.icons8.com/material-outlined/96/FFFFFF/copy.png"
                    alt="copy"
                    border="0"
                  />
                </button>
              </div>
            </div>
        <div className="originalCode rounded bg-dropdown p-5 " style={{ overflow: isTranslatedCodeExpanded ? 'auto' : 'hidden', width: '600px',  height: isOriginalCodeExpanded ? 'auto' : '150px', cursor: 'pointer'}} onClick={toggleOriginalCode}>
          <pre ref={originalCodeRef} style={{ whiteSpace: 'pre-wrap', background: 'transparent', wordWrap: 'break-word' }}>
            <code>
              {originalCode}
            </code>
          </pre>
        </div>
        <p >Created on {formatDateTime(createdAt)}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            alt="arrow"
            className="basis-1/2;"
            src={arrow}
            style={{ width: '75px', height: '50px', align: 'middle' }}
          ></img>
        </div>
      <div className=" basis-1/4">
            <div className = "flex flex-row m-1">
              <h2 className="centertext">{translatedLanguage}</h2>
              <div className = "TOTHERIGHT flex flex-row m-1" style={{ marginLeft: 'auto' }}>
                <button
                  className=" DOWNLOADBUTTON basis-1/8 w-8  items-center rounded bg-button"
                  onClick={() => handleDownloadClick("output")}
                  aria-label="Download"
                  style={{ width: '40px' }}
                >
                  <img
                    src="https://img.icons8.com/material-rounded/64/FFFFFF/download--v1.png"
                    alt="copy"
                    border="0"
                  />
                </button>
                <div style={{ width: '20px' }}></div>
                <button
                  className="COPYBUTTON basis-1/8 w-8 rounded text-center bg-button"
                  onClick={() => handleCopyClick("output")}
                  aria-label="Copy"
                  style={{ width: '40px' }}
                >
                  {' '}
                  <img
                    src="https://img.icons8.com/material-outlined/96/FFFFFF/copy.png"
                    alt="copy"
                    border="0"
                  />
                </button>
              </div>
            </div>
        <div className="translatedCode rounded bg-dropdown p-5 " style={{ overflow: isTranslatedCodeExpanded ? 'auto' : 'hidden',  width: '600px',  height: isOriginalCodeExpanded ? 'auto' : '150px', cursor: 'pointer'}} onClick={toggleTranslatedCode}>
          <pre ref={translatedCodeRef} style={{ whiteSpace: 'pre-wrap', background: 'transparent', wordWrap: 'break-word' }}>
            <code>
              {translatedCode}
            </code>
          </pre>
        </div>
      </div>
      </div>
    </>
  )
}

export default Record
