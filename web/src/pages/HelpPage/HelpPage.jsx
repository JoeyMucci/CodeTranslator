import React, { useState } from 'react'

import c from 'web/public/C_Logo.png'
import jv from 'web/public/Java-Logo 1.png'
import ph from 'web/public/PHP-logo.svg.png'
import py from 'web/public/Python_logo_51.svg.png'
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
        'Currently the languages we support are: C, C++, Java, JavaScript, PHP, Python, Rust, Go, R, and SQL. We plan on adding more languages as time goes on',
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
    {
      question: 'How about a video tutorial?',
      answer: (
        <iframe
          width="420"
          height="315"
          title="vid"
          src="https://www.youtube.com/embed/8NLhRSeONqM"
        ></iframe>
      ),
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

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  return (
    <>
      <div
        className={`  ${
          theme === 'light'
            ? 'light-theme'
            : theme === 'dark'
            ? 'dark-theme'
            : theme === 'snes'
            ? 'snes-theme'
            : theme === 'our'
            ? 'our-theme'
            : theme === 'terminal'
            ? 'terminal-theme'
            : theme === 'dmg'
            ? 'dmg-theme'
            : theme === 'nautilus'
            ? 'nautilus-theme'
            : theme === 'copper'
            ? 'copper-theme'
            : 'beach-theme'
        }`}
      >
        <Metadata title="Help" description="Help page" />
        {/* */}
        <div className="min-h-screen  ">
          <Header />
          <h1>FAQ</h1>
          <hr></hr>

          {/*FAQ CONTAINERS*/}
          <div className="faqs ">
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
              className="bg-button basis-1/4 rounded text-center"
            >
              <a href="https://www.python.org/downloads/" aria-label="Python">
                <p>Install Python</p>
                <br></br>

                <img
                  className="justify-center"
                  src={py}
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
              className="bg-button basis-1/4 rounded text-center"
            >
              <a
                href="https://www.java.com/en/download/help/download_options.html"
                aria-label="Java"
              >
                <p>Install java</p>
                <br />
                <img
                  className="justify-center"
                  src={jv}
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
              className="bg-button basis-1/4 rounded text-center"
            >
              <a
                href="https://code.visualstudio.com/docs/cpp/config-mingw"
                aria-label="C compiler"
              >
                <p>GCC C++ compiler in VS Code</p>
                <br></br>
                <img
                  className="justify-center"
                  src={c}
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
              className="bg-button basis-1/4 rounded text-center"
            >
              <a href="https://www.w3schools.com/php/" aria-label="php">
                <p>PHP tutorial</p>
                <br></br>
                <img
                  className="justify-center"
                  src={ph}
                  alt="PHP"
                  style={{ width: '230px', margin: 'auto' }}
                />
              </a>
            </div>
          </div>
          <br></br>
          <br></br>
        </div>
      </div>
    </>
  )
}

export default HelpPage
