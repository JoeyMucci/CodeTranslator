import React, { useState } from 'react'

import FAQ from 'web/src/components/FAQ.jsx'
import Header from 'web/src/components/Header.jsx'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HelpPage = () => {
  const [faqs, setfaqs] = useState([
    {
      question: 'What is Rosetta Code?',
      answer:
        'Rosetta Code is a code translation application that translates code written in one language to another with the click of a button!',
      open: false,
    },
    {
      question: 'How does Rosetta Code translate my submissions?',
      answer: 'Rosetta Code uses GPT-3 to translate all of our submissions :)',
      open: false,
    },
    {
      question: 'How will I know when GPT-3 is available?',
      answer:
        "On the translation page there will be an availabilty indicator to let you know if GPT-3 is available for translation. A green indicator means you're good to go, and a red indicator mean's there's an issue.",
      open: false,
    },
    {
      question: 'What languages are supported?',
      answer:
        'Currently the languages we support are: C, C++, Java, PHP, Python, and SQL. We plan on adding more languages as time goes on',
      open: false,
    },
    {
      question: 'How much does it cost to use Rosetta Code?',
      answer:
        'Rosetta Code is absolutely free! *terms and conditions may apply',
      open: false,
    },
    {
      question: 'How long can my code be for submission?',
      answer: 'you can input 65535 characters into the submission box',
      open: false,
    },
    {
      question: 'How long do submissions take?',
      answer:
        'it depends on the size of the file you are trying to convert. If its a small file it should only take a few seconds. As for larger files it may vary',
      open: false,
    },
  ])

  const toggleFAQ = (index) => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open
        } else {
          faq.open = false
        }

        return faq
      })
    )
  }

  return (
    <>
      <Metadata title="Help" description="Help page" />
      {/* */}
      <div className="min-h-screen bg-primary ">
        <Header />
        <h1>FAQ</h1>
        <hr></hr>

        {/*FAQ CONTAINERS*/}
        <div className="faqs">
          {faqs.map((faq, i) => (
            <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
          ))}
        </div>

        <br></br>
        <br></br>
        <br></br>

        <h1>Helpful sites</h1>
        <hr></hr>

        <div className="flex basis-1/4 flex-row space-x-10 p-5">
          <div
            style={{
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              height: '205px', // Height for approximately 20 row
              // Use a background color that matches your theme
              fontSize: '16px', // Adjust as needed
              lineHeight: '1.5',
            }}
            className="basis-1/4 rounded bg-text_box text-center hover:bg-blue-200"
          >
            <a href="https://www.python.org/downloads/" aria-label="Python">
              <p>Install Python</p>
              <br></br>

              <img
                className="justify-center"
                src="images/Python_logo_51.svg.png"
                alt="Python"
                style={{ width: '150px', margin: 'auto' }}
              />
            </a>
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              height: '205px', // Height for approximately 20 row
              // Use a background color that matches your theme
              fontSize: '16px', // Adjust as needed
              lineHeight: '1.5',
            }}
            className="basis-1/4 rounded bg-text_box text-center hover:bg-blue-200"
          >
            <a
              href="https://www.java.com/en/download/help/download_options.html"
              aria-label="Java"
            >
              <p>install java</p>
              <br />
              <img
                className="justify-center"
                src="images/Java-Logo 1.png"
                alt="Java"
                style={{ width: '150px', margin: 'auto' }}
              />
            </a>
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              height: '205px', // Height for approximately 20 row

              // Use a background color that matches your theme
              fontSize: '16px', // Adjust as needed
              lineHeight: '1.5', // Adjust as needed
            }}
            className="basis-1/4 rounded bg-text_box text-center hover:bg-blue-200"
          >
            <a
              href="https://code.visualstudio.com/docs/cpp/config-mingw"
              aria-label="C compiler"
            >
              <p>GCC C++ compiler in VS Code</p>
              <br></br>
              <img
                className="justify-center"
                src="images/C_Logo.png"
                alt="C"
                style={{ width: '120px', margin: 'auto' }}
              />
            </a>
          </div>

          <div
            style={{
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              height: '205px', // Height for approximately 20 row
              fontSize: '16px', // Adjust as needed
            }}
            className="basis-1/4 rounded bg-text_box text-center hover:bg-blue-200"
          >
            <a href="https://www.w3schools.com/php/" aria-label="php">
              <p>PHP tutorial</p>
              <br></br>
              <img
                className="justify-center"
                src="images/PHP-logo.svg.png"
                alt="PHP"
                style={{ width: '230px', margin: 'auto' }}
              />
            </a>
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
    </>
  )
}

export default HelpPage
