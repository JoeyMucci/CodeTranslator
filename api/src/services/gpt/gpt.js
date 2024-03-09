require('dotenv').config()
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

async function runTranslation({ fromLanguage, toLanguage, code }) {
  if (fromLanguage == toLanguage) {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Optimize the following ' + fromLanguage + ' code: ' + code,
        },
      ],
    })
    return chatCompletion.choices[0].message.content
  } else {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Translate the following ' + fromLanguage + ' code to ' + toLanguage + ' code: ' + code,
        },
      ],
    })
    return chatCompletion.choices[0].message.content
  }
}
const input = { fromLanguage: 'Python', toLanguage: 'C', code: 'print("hello world")' }
const inputtwo = { fromLanguage: 'Python', toLanguage: 'Python', code: 'x=0\nx+=1\nx+=1\nprint(x)' }
const result = runTranslation(input).resolve()
const resulttwo = runTranslation(inputtwo).resolve()
console.log(result)
console.log(resulttwo)
