import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const runTranslation = async ({ fromLanguage, toLanguage, code }) => {
  if (code.length == 0) {
    const problemo = new Error('No code')
    problemo.code = 'mt'
    throw problemo
  }
  if (code.length > 65535) {
    const problemo = new Error('Input code is too long')
    problemo.code = 'too long'
    throw problemo
  }
  let optimization = ''
  let translation = ''
  let ostart = ''
  if (fromLanguage == toLanguage) {
    // console.log('Optimize the following ' + fromLanguage + ' code: ' + code)
    optimization = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Without using any comments, optimize the following ' + fromLanguage + ' code: ' + code,
        },
      ],
    })
    ostart = optimization.choices[0].message.content.substring(0, 9)
  }
  // console.log('Translate the following ' + fromLanguage + ' code to ' + toLanguage + ' code: ' + code)
  translation = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'Translate the following ' + fromLanguage + ' code to ' + toLanguage + ' code: ' + code,
      },
    ],
  })
  console.log(translation.choices[0].message.content)
  const tstart = translation.choices[0].message.content.substring(0, 9)
  if (
    // Common words in GPT error messages
    tstart.includes('orry') ||
    tstart == 'Apologies' ||
    tstart.substring(0, 2) == 'It' ||
    tstart.substring(0, 4) == 'This' ||
    tstart == 'Unfortuna' ||
    ostart.includes('orry') ||
    ostart == 'Apologies' ||
    ostart.substring(0, 2) == 'It' ||
    ostart.substring(0, 4) == 'This' ||
    ostart == 'Unfortuna'
  ) {
    const problemo = new Error('Invalid input')
    problemo.code = 'nonsense'
    throw problemo
  }
  let languageDetection = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'What language is the following code: ' + code,
      },
    ],
  })

  let languageResponse = languageDetection.choices[0].message.content
  // console.log(languageResponse)
  if (!languageResponse.includes(fromLanguage)) {
    const problemo = new Error('Wrong language')
    problemo.code = 'wrong lang'
    throw problemo
  }

  return fromLanguage == toLanguage ? optimization.choices[0].message.content : translation.choices[0].message.content
}
