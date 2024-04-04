import { runTranslationHelper, runTranslationHelperOld } from './gpt.js'

const longprog =
  'alphabet = "abcdefghijklmnopqrstuvwxyz" transition = [ [(alphabet, 1)], [(alphabet, 1), (".", 0), ("@", 2)], [(alphabet, 3)], [(alphabet, 3), (".", 4)], [("c", 5), (alphabet, 3)], [("o", 6), (alphabet, 3), (".", 4)], [("m", 7), (alphabet, 3), (".", 4)], [(alphabet, 3), (".", 4)], [], ] response = input("Enter a string? Enter "y" or "n": \n") while response == "y": w = input("Enter a string: \n") print(w) currentState = 0 print("q" + str(currentState), end = "") for letter in w: print("--" + letter + "-->", end = "") edgeFound = False for edge in transition[currentState]: if letter in edge[0]: edgeFound = True currentState = edge[1] break if not edgeFound: currentState = 8 print("q" + str(currentState), end = "") if currentState == 6 or currentState == 7: print("\nACCEPT") else: print("\nREJECT") response = input("\nWould you like to enter a string? Enter "y" or "n": \n")'

describe('Rework', () => {
  it('Runs faster', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate 1 second task
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
    const oldstart = Date.now()
    await runTranslationHelperOld({
      fromLanguage: 'Python',
      toLanguage: 'C++',
      code: longprog,
      openai: openai,
    })
    const oldend = Date.now()
    const oldtime = oldend - oldstart

    const newstart = Date.now()
    await runTranslationHelper({
      fromLanguage: 'Python',
      toLanguage: 'C++',
      code: longprog,
      openai: openai,
    })
    const newend = Date.now()
    const newtime = newend - newstart

    expect(oldtime).toBeGreaterThan(newtime)
  }, 100000)

  it('Makes less API calls', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
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
