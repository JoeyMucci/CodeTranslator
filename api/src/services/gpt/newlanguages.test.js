import { runTranslation } from './gpt.js'

describe('consistent translation of simple code', () => {
  it('Go code properly translated and recognized', async () => {
    const newcode = await runTranslation({
      fromLanguage: 'Java',
      toLanguage: 'Go',
      code: 'System.out.println("hello world")',
    }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: 'Go', toLanguage: 'Java', code: newcode }) // Reverse translation
    expect(oldcode).toContain('System.out.println("hello world")') // Check that the retranslated code contains starting code
  }, 100000)
  it('R code properly translated and recognized', async () => {
    const newcode = await runTranslation({
      fromLanguage: 'Java',
      toLanguage: 'R',
      code: 'System.out.println("hello world")',
    }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: 'R', toLanguage: 'Java', code: newcode }) // Reverse translation
    expect(oldcode).toContain('System.out.println("hello world")') // Check that the retranslated code contains starting code
  }, 100000)
  it('Rust code properly translated and recognized', async () => {
    const newcode = await runTranslation({
      fromLanguage: 'Java',
      toLanguage: 'Rust',
      code: 'System.out.println("hello world")',
    }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: 'Rust', toLanguage: 'Java', code: newcode }) // Reverse translation
    expect(oldcode).toContain('System.out.println("hello world")') // Check that the retranslated code contains starting code
  }, 100000)
})
