import { runTranslation, runTranslationOld, runTranslationHelper, runTranslationHelperOld } from './gpt.js'

describe('Rework', () => {
  it('New version runs faster', async () => {
    const oldstart = Date.now()
    await runTranslationOld({
      fromLanguage: 'Python',
      toLanguage: 'C++',
      code: 'print("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\n',
    })
    const oldend = Date.now()
    const oldtime = oldend - oldstart

    const newstart = Date.now()
    await runTranslation({
      fromLanguage: 'Python',
      toLanguage: 'C++',
      code: 'print("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\n',
    })
    const newend = Date.now()
    const newtime = newend - newstart

    expect(oldtime).toBeGreaterThan(newtime)
  }, 100000)

  it('Makes less API calls', async () => {
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(() => {
                return {
                  choices: [
                    {
                      message: {
                        content: 'Python', // to prevent error on first call
                      },
                    },
                  ],
                }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    await runTranslationHelperOld({
      fromLanguage: 'Python',
      toLanguage: 'C++',
      code: 'print("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\n',
      openai: openai,
    })
    expect(openai.chat.completions.create).toHaveBeenCalledTimes(3) // Old way has three api calls

    await runTranslationHelper({
      fromLanguage: 'Python',
      toLanguage: 'C++',
      code: 'print("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\nprint("hello world")\n',
      openai: openai,
    })
    expect(openai.chat.completions.create).toHaveBeenCalledTimes(5) // New way has two api calls
  })
})
