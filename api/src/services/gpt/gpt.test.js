import { runTranslation } from './gpt.js'

describe('Actual translation', () => {
  it('consistent translation of simple code', async () => {
    const fromlang = 'Python'
    const tolang = 'C'
    const orgcode = 'print("hello world")'
    const newcode = await runTranslation({ fromLanguage: fromlang, toLanaguage: tolang, code: orgcode }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: tolang, toLanguage: fromlang, code: newcode }) // Reverse translation
    expect(oldcode).toContain(orgcode) // Check that the retranslated code contains starting code
  }, 100000)

  it('throws error when given nonsense', async () => {
    const nonsense = 'The quick brown fox jumps over the lazy dog'
    expect(async () => {
      await runTranslation({ fromLanguage: 'Java', toLanguage: 'SQL', code: nonsense })
    }).rejects.toThrow('ChatGPT got confused')
  }, 100000)
})

describe('Optimization', () => {
  it('condenses redundant code', async () => {
    const lang = 'Python'
    const longcode = 'x=0\nx+=1\nx+=1\nprint(x)' // Inefficient code
    const oldlength = longcode.length
    const shortcode = await runTranslation({ fromLanguage: lang, toLanguage: lang, code: longcode }) // Call optimization
    expect(shortcode.length).toBeLessThan(oldlength) // Make sure optimized code is shorter than unoptimized code
  }, 100000)

  it('throws error when given nonsense', async () => {
    const nonsense = 'El veloz zorro marrón salta sobre el perro perezoso'
    expect(async () => {
      await runTranslation({ fromLanguage: 'Java', toLanguage: 'Java', code: nonsense })
    }).rejects.toThrow('ChatGPT got confused')
  }, 100000)
})
