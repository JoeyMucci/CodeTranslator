import { runTranslation } from './gpt.js'

describe('consistent translation of simple code', () => {
  it('Go code properly translated and recognized', async () => {
    const newcode = await runTranslation({ fromLanguage: 'Python', toLanguage: 'Go', code: 'print("hello world")' }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: 'Go', toLanguage: 'Python', code: newcode }) // Reverse translation
    expect(oldcode).toContain('print("hello world")') // Check that the retranslated code contains starting code
  }, 100000)
  it('R code properly translated and recognized', async () => {
    const newcode = await runTranslation({ fromLanguage: 'Python', toLanguage: 'R', code: 'print("hello world")' }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: 'R', toLanguage: 'Python', code: newcode }) // Reverse translation
    expect(oldcode).toContain('print("hello world")') // Check that the retranslated code contains starting code
  }, 100000)
  it('Rust code properly translated and recognized', async () => {
    const newcode = await runTranslation({ fromLanguage: 'Python', toLanguage: 'Rust', code: 'print("hello world")' }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: 'Rust', toLanguage: 'Python', code: newcode }) // Reverse translation
    expect(oldcode).toContain('print("hello world")') // Check that the retranslated code contains starting code
  }, 100000)
})
