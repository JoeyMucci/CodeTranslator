require('dotenv').config()
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is also the default, can be omitted
})

async function runCompletion() {
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'Tell me a joke',
      },
    ],
  })
  console.log(chatCompletion.choices[0].message)
}
runCompletion()
