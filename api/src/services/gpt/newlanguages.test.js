import { runTranslation } from './gpt.js'

describe('consistent translation of simple code', () => {
  it('Go code properly translated and recognized', async () => {
    const newcode = await runTranslation({
      fromLanguage: 'Java',
      toLanguage: 'Go',
      code: 'System.out.println("hello world")',
    }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: 'Go', toLanguage: 'Java', code: newcode }) // Reverse translation
    expect(oldcode).toContain('world') // Check that the retranslated code contains starting code
  }, 100000)
  // need to use a more specific program for R
  it('R code properly translated and recognized', async () => {
    const newcode = await runTranslation({
      fromLanguage: 'Python',
      toLanguage: 'R',
      code: 'name = input("Enter name: ")\nage = input("Enter age: ")\nage = int(age)\nprint("Hi,", name, "next year you will be", age+1, "years old.")',
    }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: 'R', toLanguage: 'Python', code: newcode }) // Reverse translation
    expect(oldcode).toContain('input') // Check that the retranslated code contains starting code
  }, 100000)
  it('Rust code properly translated and recognized', async () => {
    const newcode = await runTranslation({
      fromLanguage: 'Java',
      toLanguage: 'Rust',
      code: 'System.out.println("hello world")',
    }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: 'Rust', toLanguage: 'Java', code: newcode }) // Reverse translation
    expect(oldcode).toContain('world') // Check that the retranslated code contains starting code
  }, 100000)
})
