require('dotenv').config()
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

export const runTranslation = async ({ fromLanguage, toLanguage, code }) => {
  await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'From now on, reply "ERROR" if you cannot do the task' + code,
      },
    ],
  })
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
    if (chatCompletion.choices[0].message.content == 'ERROR') throw new Error('ChatGPT got confused')
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
    if (chatCompletion.choices[0].message.content == 'ERROR') throw new Error('ChatGPT got confused')
    return chatCompletion.choices[0].message.content
  }
}
