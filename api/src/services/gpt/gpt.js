import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const runTranslation = async ({ fromLanguage, toLanguage, code }) => {
  if (code.length > 65535) {
    const problemo = new Error('Input code is too long')
    problemo.code = 'too long'
    throw problemo
  }
  let optimization = ''
  let translation = ''
  if (fromLanguage == toLanguage) {
    console.log('Optimize the following ' + fromLanguage + ' code: ' + code)
    optimization = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Optimize the following ' + fromLanguage + ' code: ' + code,
        },
      ],
    })
  }
  console.log('Translate the following ' + fromLanguage + ' code to ' + toLanguage + ' code: ' + code)
  translation = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'Translate the following ' + fromLanguage + ' code to ' + toLanguage + ' code: ' + code,
      },
    ],
  })
  const tstart = translation.choices[0].message.content.substring(0, 9)
  const ostart = translation.choices[0].message.content.substring(0, 9)
  if (
    tstart.includes('orry') ||
    tstart == 'Apologies' ||
    tstart.substring(0, 2) == 'It' ||
    tstart.substring(0, 4) == 'This' ||
    ostart.includes('orry') ||
    ostart == 'Apologies' ||
    ostart.substring(0, 2) == 'It' ||
    ostart.substring(0, 4) == 'This'
  ) {
    const problemo = new Error('Invalid input')
    problemo.code = 'nonsense'
    throw problemo
  }
  return fromLanguage == toLanguage ? optimization.choices[0].message.content : translation.choices[0].message.content
}
