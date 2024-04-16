import React from 'react'

function FAQ({ faq, index, toggleFAQ }) {
  return (
    <div
      className={'faq bg-text_box ' + (faq.open ? 'open' : '')}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question bg-text_box">{faq.question}</div>

      <div className="faq-answer bg-text_box">{faq.answer}</div>
    </div>
  )
}

export default FAQ