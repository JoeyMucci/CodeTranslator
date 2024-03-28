import React from 'react'

function FAQ({ faq, index, toggleFAQ }) {
  return (
<<<<<<< HEAD
    <div className={"hover:bg-blue-200 faq " + (faq.open ? 'open' : '')}
         key={index}
         onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question  ">
        {faq.question}
      </div>

      <div className="faq-answer">
        {faq.answer}
      </div>

=======
    <div
      className={'faq hover:bg-blue-200 ' + (faq.open ? 'open' : '')}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">{faq.question}</div>
>>>>>>> 520577d1d4bdf3411910d0bd0d4176326a197331

      <div className="faq-answer">{faq.answer}</div>
    </div>
  )
}

export default FAQ
