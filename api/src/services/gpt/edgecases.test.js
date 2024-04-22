import { isCorrectLanguageOld, isCorrectLanguage, cleanup } from './gpt.js'

describe('comment edgecase', () => {
  it('deals with python code being translated to a comment properly', () => {
    const result = cleanup({
      fromLanguage: 'C',
      code: '```C \n/* comment comment comment */\n// comment \nprint("Hello world")\n```',
    })
    console.log(result)
    expect(result).not.toContain('```')
    expect(result).not.toContain('C')
  })

  it('deal with more difficult pyhton code being translated to a comment', () => {
    const result = cleanup({
      fromLanguage: 'C',
      code: 'Here is the translated code:\n\n```C \n/* comment comment comment */\n// comment \nprint("Hello world")\n```\n\nThat was the translated code',
    })
    console.log(result)
    expect(result).not.toContain('translated')
    expect(result).not.toContain('```')
    expect(result).not.toContain('C')
  })

  it('deal with most difficult pyhton code being translated to a comment', () => {
    const result = cleanup({
      fromLanguage: 'C',
      code: 'Here  ```` is the translated code:\n\n```C \n/* comment comment comment */\n// comment \nprint("Hello world")\n```\n\nThat was the translated ``` code',
    })
    console.log(result)
    expect(result).not.toContain('translated')
    expect(result).not.toContain('```')
    expect(result).not.toContain('C')
  })
})

describe('Language detection', () => {
  it('Properly handles C code', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return { choices: [{ message: { content: 'Code is written in Python' } }] }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const oldresponse = await isCorrectLanguageOld({
      language: 'C',
      code: 'print("hello world")',
      openai: openai,
    })
    const newresponse = await isCorrectLanguage({
      language: 'C',
      code: 'print("hello world")',
      openai: openai,
    })
    expect(oldresponse).toBe(true) // The old translate incorrectly identifies this as C code
    expect(newresponse).toBe(false) // The new translate correctly identifies this as not C code
  })
  it('Properly handles R code', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return { choices: [{ message: { content: 'Really looks like Python code' } }] }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const oldresponse = await isCorrectLanguageOld({
      language: 'R',
      code: 'print("hello world")',
      openai: openai,
    })
    const newresponse = await isCorrectLanguage({
      language: 'R',
      code: 'print("hello world")',
      openai: openai,
    })
    expect(oldresponse).toBe(true) // The old translate incorrectly identifies this as R code
    expect(newresponse).toBe(false) // The new translate correctly identifies this as not R code
  })
  it('Makes exception for SQL variants', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return { choices: [{ message: { content: 'The code appears to be written in Transact-SQL' } }] }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const newresponse = await isCorrectLanguage({
      language: 'SQL',
      code: 'Create table yada yada yada',
      openai: openai,
    })
    expect(newresponse).toBe(true) // The new translate correctly identifies this as SQL code
  })
  it('Properly catches name before period', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return { choices: [{ message: { content: 'The code appears to be written in Python.' } }] }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const newresponse = await isCorrectLanguage({
      language: 'Python',
      code: 'print("hello world")',
      openai: openai,
    })
    expect(newresponse).toBe(true)
  })
  it('Properly catches name before comma', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return { choices: [{ message: { content: 'Python, I think' } }] }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const newresponse = await isCorrectLanguage({
      language: 'Python',
      code: 'print("hello world")',
      openai: openai,
    })
    expect(newresponse).toBe(true)
  })
  it('Properly catches name before semicolon', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return { choices: [{ message: { content: 'Python; I think' } }] }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const newresponse = await isCorrectLanguage({
      language: 'Python',
      code: 'print("hello world")',
      openai: openai,
    })
    expect(newresponse).toBe(true)
  })
  it('Properly catches name before exclamation point', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return { choices: [{ message: { content: 'Should be Python!' } }] }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const newresponse = await isCorrectLanguage({
      language: 'Python',
      code: 'print("hello world")',
      openai: openai,
    })
    expect(newresponse).toBe(true)
  })
  it('Properly catches name before question mark', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return {
                  choices: [{ message: { content: 'Python? I honestly have no idea maybe ask Professor Bill' } }],
                }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const newresponse = await isCorrectLanguage({
      language: 'Python',
      code: 'print("hello world")',
      openai: openai,
    })
    expect(newresponse).toBe(true)
  })
})
