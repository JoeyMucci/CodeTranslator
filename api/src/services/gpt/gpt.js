import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const isCorrectLanguage = async ({ language, code, openai }) => {
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
  return languageResponse.includes(language)
}

export const doTranslation = async ({ fromLanguage, toLanguage, code, openai }) => {
  let translation = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'Translate the following ' + fromLanguage + ' code to ' + toLanguage + ' code: ' + code,
      },
    ],
  })
  const twhole = translation.choices[0].message.content
  const tstart = twhole.substring(0, 9)
  if (
    tstart.includes('orry') ||
    tstart == 'Apologies' ||
    tstart.substring(0, 2) == 'It' ||
    tstart.substring(0, 4) == 'This' ||
    tstart == 'Unfortuna' ||
    tstart == 'cannot'
  )
    return null
  return twhole
}

export const doOptimization = async ({ language, code, openai }) => {
  let optimization = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'Without using any comments, optimize the following ' + language + ' code: ' + code,
      },
    ],
  })
  const owhole = optimization.choices[0].message.content
  const ostart = owhole.substring(0, 9)
  if (
    ostart.includes('orry') ||
    ostart == 'Apologies' ||
    ostart.substring(0, 2) == 'It' ||
    ostart.substring(0, 4) == 'This' ||
    ostart == 'Unfortuna' ||
    ostart == 'cannot'
  )
    return null
  return owhole
}

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
  let trans = await doTranslation({ fromLanguage: fromLanguage, toLanguage: toLanguage, code: code, openai: openai })
  let opt = await doOptimization({ language: fromLanguage, code: code, openai: openai })
  if (trans == null || opt == null) {
    const problemo = new Error('Invalid input')
    problemo.code = 'nonsense'
    throw problemo
  }
  if (!(await isCorrectLanguage({ language: fromLanguage, code: code, openai: openai }))) {
    const problemo = new Error('Wrong language')
    problemo.code = 'wrong lang'
    throw problemo
  }
  return fromLanguage == toLanguage ? opt : trans
}
