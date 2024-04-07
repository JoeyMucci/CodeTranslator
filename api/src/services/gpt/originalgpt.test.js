import { isCorrectLanguage, doTranslation, doOptimization, runTranslationHelper, canGPTDoBasicMath } from './gpt.js'

// API MOCKS
describe('Language detection', () => {
  jest.restoreAllMocks()
  jest.resetModules()
  jest.mock('openai', () => {
    return jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: jest.fn().mockImplementation(async () => {
              return { choices: [{ message: { content: 'The code is written in Python' } }] }
            }),
          },
        },
      }
    })
  })
  const OpenAI = require('openai')
  it('returns false when language detection is different from given language', async () => {
    const openai = OpenAI()
    const openaiResponse = await isCorrectLanguage({
      language: 'SQL',
      code: 'print("hello world")',
      openai: openai,
    })
    expect(openaiResponse).toBe(false)
  })

  it('returns true when language detection is same from given language', async () => {
    const openai = OpenAI()
    const openaiResponse = await isCorrectLanguage({
      language: 'Python',
      code: 'print("hello world")',
      openai: openai,
    })
    expect(openaiResponse).toBe(true)
  })
}, 10000)

describe('Translation', () => {
  it('returns null when input is not recognized', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return {
                  choices: [{ message: { content: "I'm sorry, but I could not understand the code you supplied" } }],
                }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const openaiResponse = await doTranslation({
      fromLanguage: 'PHP',
      toLanguage: 'Java',
      code: 'Big elephants can always use small elephants',
      openai: openai,
    })
    expect(openaiResponse).toBe(null)
  })

  it('does not return null when translation is successful', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return { choices: [{ message: { content: 'System.out.println("Hello world")' } }] }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const openaiResponse = await doTranslation({
      fromLanguage: 'Python',
      toLanguage: 'Java',
      code: 'print("hello world")',
      openai: openai,
    })
    expect(openaiResponse).not.toBe(null)
  })
}, 10000)

describe('Optimization', () => {
  it('returns null when input is not recognized', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return {
                  choices: [
                    {
                      message: {
                        content: 'Unfortunately, the code you provided is not C++ code so it cannot be optimized',
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
    const openaiResponse = await doOptimization({
      language: 'C++',
      code: 'Four Dragons Hawk Dive Now Scorch Arrow of Fortune',
      openai: openai,
    })
    expect(openaiResponse).toBe(null)
  })

  it('does not return null when optimization is successful', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                return { choices: [{ message: { content: 'x=0\nx+=2\nprint(x)' } }] }
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    const openaiResponse = await doOptimization({
      language: 'Python',
      code: 'x=0\nx+=1\nx+=1\nprint(x)',
      openai: openai,
    })
    expect(openaiResponse).not.toBe(null)
  })
}, 10000)

describe('Queueing', () => {
  it('queues small task after long task', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                await new Promise((resolve) => setTimeout(resolve, 5000)) // Simulate 5 second task
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
    let OpenAI = require('openai')
    let openai = OpenAI()
    runTranslationHelper({
      fromLanguage: 'Python',
      toLanguage: 'C++',
      code: 'print("hello World")',
      openai: openai,
    })
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
    OpenAI = require('openai')
    openai = OpenAI()
    const start = Date.now()
    await runTranslationHelper({
      fromLanguage: 'Python',
      toLanguage: 'C++',
      code: 'print("hello WORLD")',
      openai: openai,
    })
    const end = Date.now()
    expect(end - start).toBeGreaterThan(1500) // task queue
  }, 100000)
  it('does not run allow same task to run twice', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                await new Promise((resolve) => setTimeout(resolve, 5000)) // Simulate 5 second task
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
    let OpenAI = require('openai')
    let openai = OpenAI()
    runTranslationHelper({
      fromLanguage: 'Python',
      toLanguage: 'C',
      code: 'print("hello World")',
      openai: openai,
    })
    return expect(async () => {
      await runTranslationHelper({
        fromLanguage: 'Python',
        toLanguage: 'C',
        code: 'print("hello World")',
        openai: openai,
      })
    }).rejects.toThrow("We're working on it!")
  })
})

describe('OpenAI error', () => {
  it('catches rate limit error', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                const problemo = new Error('429')
                problemo.code = 'rate_limit_exceeded'
                throw problemo
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    return expect(async () => {
      await runTranslationHelper({
        fromLanguage: 'Python',
        toLanguage: 'C',
        code: 'print("YESMAN")',
        openai: openai,
      })
    }).rejects.toThrow('Rate Limit Hit')
  }, 100000)
  it('catches bad key error', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                const problemo = new Error('401')
                problemo.code = 'invalid_api_key'
                throw problemo
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    return expect(async () => {
      await runTranslationHelper({
        fromLanguage: 'Python',
        toLanguage: 'C',
        code: 'print("YESMAN1")',
        openai: openai,
      })
    }).rejects.toThrow('Bad key')
  }, 100000)
  it('catches server error', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                const problemo = new Error('500')
                problemo.code = 'server_error'
                throw problemo
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    return expect(async () => {
      await runTranslationHelper({
        fromLanguage: 'Python',
        toLanguage: 'C',
        code: 'print("YESMAN11")',
        openai: openai,
      })
    }).rejects.toThrow('OpenAI crash')
  }, 100000)
  it('catches not found error', async () => {
    jest.restoreAllMocks()
    jest.resetModules()
    jest.mock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementation(async () => {
                const problemo = new Error('404')
                problemo.code = 'not_found_error'
                throw problemo
              }),
            },
          },
        }
      })
    })
    const OpenAI = require('openai')
    const openai = OpenAI()
    return expect(async () => {
      await runTranslationHelper({
        fromLanguage: 'Python',
        toLanguage: 'C',
        code: 'print("YESMAN111")',
        openai: openai,
      })
    }).rejects.toThrow('Does not exist')
  }, 100000)
})

// API KEY
describe('API KEY', () => {
  it('works with the right key', async () => {
    let res = await canGPTDoBasicMath({ apiKey: process.env.OPENAI_API_KEY }) // asks the square root of 169
    expect(res).toContain('13')
  })
  it('does not work with the wrong key', async () => {
    return expect(async () => {
      await canGPTDoBasicMath({ apiKey: process.env.NOT_OPENAI_API_KEY })
    }).rejects.toThrow('Incorrect API key provided')
  })
})
