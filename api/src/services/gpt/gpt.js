require('dotenv').config()
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is also the default, can be omitted
})

export const runTranslation = async ({ fromLanguage, toLanguage, code }) => {
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'Translate the following ' + { fromLanguage } + ' code to ' + { toLanguage } + ' code: ' + { code },
      },
    ],
  })
  return chatCompletion.choices[0].message.content
}
