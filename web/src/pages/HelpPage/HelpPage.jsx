
import { Link, routes} from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import React, {useState} from 'react'
import FAQ from 'web/src/components/FAQ.jsx'

const HelpPage = () => {
  const [faqs, setfaqs] = useState([
    {
      question: 'Testing the questions 1?',
      answer: 'Answer to q1',
      open: true
    },
    {
      question: 'Testing the questions 2?',
      answer: 'Answer to q2',
      open: false
    },
    {
      question: 'Testing the questions 3?',
      answer: 'Answer to q3',
      open: false
    },
    {
      question: 'Testing the questions 4?',
      answer: 'Answer to q4',
      open: false
    }
  ]);

  const toggleFAQ = index => {
    setfaqs(faqs.map((faq,i) => {
      if (i===index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }

      return faq;
    }))
  }

  return (
    <>
      <Metadata title="Help" description="Help page" />
      {/* */}
      <div  className="min-h-screen bg-primary ">
      <div className="items-center">

      </div>
        {/*FAQ CONTAINERS*/}
        <div className="faqs">
          {faqs.map((faq, i) => (
            <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
          ))}
        </div>

      </div>
    </>
  )
}

export default HelpPage
