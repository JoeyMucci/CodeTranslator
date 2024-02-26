import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const CodeTranslatorPage = () => {
  const [inputText1, setInputText1] = useState('')

  const handleInputChange1 = (e) => {
    setInputText1(e.target.value)
  }

  return (
    <>
      <div className="items-center min-h-screen bg-blue-900">
        <Metadata title="CodeTranslator" description="CodeTranslator page" />
        <h1 className="text-3xl underline mb-10 absolute top-0 left-0 w-full text-center">
          CodeTranslatorPage
        </h1>
        <div
          className="fixed top-0 left-0 h-screen w-60
                    flex flex-col items-center
                    bg-indigo-200 text-black shadow"
        >
          <i>Username</i>
          <i>b</i>
          <i>c</i>
          <i>d</i>
        </div>

        <div className="flex flex-row items-center mb-20 justify-center space-x-20">
          {/* Input Box */}
          <div className="flex basis-1/4 mt-20">
            <textarea
              type="text"
              value={inputText1}
              onChange={handleInputChange1}
              placeholder="Enter code to translate"
              className="w-full h-full border-gray-300 rounded "
              style={{
                width: '480px',
                height: '480px',
                paddingLeft: '10px',
                paddingTop: '10px',
              }}
            />
          </div>

          {/* Output Box */}
          <div
            className="basis-1/4 mt-20 w-full border border-gray-300 rounded bg-slate-100"
            style={{
              width: '480px',
              height: '480px',
              paddingLeft: '10px',
              paddingTop: '10px',
            }}
          >
            {/* Display the output here */}
            <code className="ml-2 mt-2">Output goes here</code>
          </div>
        </div>
        <p className="absolute bottom-0 left-0  text-center">
          My default route is named <code>codeTranslator</code>, link to me with
          `<Link to={routes.codeTranslator()}>CodeTranslator</Link>`
        </p>

        <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
          {'Translate'}
        </button>
      </div>
    </>
  )
}

export default CodeTranslatorPage
