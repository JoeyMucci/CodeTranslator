import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const runTranslation = async ({ fromLanguage, toLanguage, code }) => {
  let chatCompletion = ''
  if (fromLanguage == toLanguage) {
    console.log('Optimize the following ' + fromLanguage + ' code: ' + code)
    chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Optimize the following ' + fromLanguage + ' code: ' + code,
        },
      ],
    })
  } else {
    console.log('Translate the following ' + fromLanguage + ' code to ' + toLanguage + ' code: ' + code)
    chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Translate the following ' + fromLanguage + ' code to ' + toLanguage + ' code: ' + code,
        },
      ],
    })
  }
  const start = chatCompletion.choices[0].message.content.substring(0, 9)
  if (start.includes('orry') || start == 'Apologies') {
    const problemo = new Error('ChatGPT got confused')
    problemo.code = 'nonsense'
    throw problemo
  }
  return chatCompletion.choices[0].message.content
}
