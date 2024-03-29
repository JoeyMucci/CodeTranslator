import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

let queue = []

export const canGPTDoBasicMath = async ({ apiKey }) => {
  const oppenai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  })
  let result = await oppenai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: 'What is the square root of 169?',
      },
    ],
  })

  return result.choices[0].message.content
}

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

export const cleanup = ({ fromLanguage, code }) => {
  // https://blog.ostermiller.org/finding-comments-in-source-code-using-regular-expressions/

  return code.replace(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*?\*+\/)|(\/\/.*)/g, '')
}

export const exists = ({ fromLanguage, toLanguage, code }) => {
  for (let i = 0; i < queue.length; i++)
    if (queue[i].fromLanguage == fromLanguage && queue[i].toLanguage == toLanguage && queue[0].code == code) return true

  return false
}

export const runTranslation = async ({ fromLanguage, toLanguage, code }) => {
  return await runTranslationHelper({ fromLanguage: fromLanguage, toLanguage: toLanguage, code: code, openai: openai })
}

export const runTranslationHelper = async ({ fromLanguage, toLanguage, code, openai }) => {
  if (exists({ fromLanguage: fromLanguage, toLanguage: toLanguage, code: code })) {
    const problemo = new Error("We're working on it!")
    problemo.code = 'spam'
    throw problemo
  }
  queue.unshift({ fromLanguage, toLanguage, code })
  while (
    queue[queue.length - 1].fromLanguage != fromLanguage ||
    queue[queue.length - 1].toLanguage != toLanguage ||
    queue[queue.length - 1].code != code
  ) {
    // while it is not ur turn
    await new Promise((resolve) => setTimeout(resolve, 100)) // .1 seconds wait before recheck
  }

  if (code.length == 0) {
    const problemo = new Error('No code')
    problemo.code = 'mt'
    queue.pop()
    throw problemo
  }
  if (code.length > 65535) {
    const problemo = new Error('Input code is too long')
    problemo.code = 'too long'
    queue.pop()
    throw problemo
  }
  code = cleanup({ fromLanguage: fromLanguage, code: code })
  let trans = ''
  let opt = ''
  try {
    let toLang = toLanguage
    if (fromLanguage == toLanguage) toLang = fromLanguage == 'Python' ? 'Java' : 'Python'
    trans = await doTranslation({ fromLanguage: fromLanguage, toLanguage: toLang, code: code, openai: openai })
  } catch (e) {
    const problemo = new Error('Open AI error')
    problemo.code = e.code
    queue.pop()
    throw problemo
  }
  try {
    opt = await doOptimization({ language: fromLanguage, code: code, openai: openai })
  } catch (e) {
    const problemo = new Error('Open AI error')
    problemo.code = e.code
    queue.pop()
    throw problemo
  }

  if (trans == null || opt == null) {
    const problemo = new Error('Invalid input')
    problemo.code = 'nonsense'
    queue.pop()
    throw problemo
  }
  let langres = ''
  try {
    langres = await isCorrectLanguage({ language: fromLanguage, code: code, openai: openai })
  } catch (e) {
    const problemo = new Error('Open AI error')
    problemo.code = e.code
    queue.pop()
    throw problemo
  }
  if (!langres) {
    const problemo = new Error('Wrong language')
    problemo.code = 'wrong lang'
    queue.pop()
    throw problemo
  }
  queue.pop()
  return fromLanguage == toLanguage ? opt : trans
}
