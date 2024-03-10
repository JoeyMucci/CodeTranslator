require('dotenv').config()
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

export const runTranslation = async ({ fromLanguage, toLanguage, code }) => {
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
// const nonsense = 'Im baby everyday carry cold-pressed solarpunk viral'
// const nonsensecode = runTranslation({ fromLanguage: 'Java', toLanguage: 'SQL', code: nonsense })
// let b = ''
// nonsensecode.then(function (result) {
//   b = result
// })
// console.log(b)
