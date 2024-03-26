import {
  translations,
  translation,
  createtranslation,
  // updatetranslation,
  // deletetranslation,
} from './translations'

describe('translations', () => {
  scenario('returns all translations', async (scenario) => {
    const result = await translations()

    expect(result.length).toEqual(Object.keys(scenario.translation).length)
  })

  scenario('returns a single translation', async (scenario) => {
    const result = await translation({ id: scenario.translation.one.id })

    expect(result).toEqual(scenario.translation.one)
  })

  scenario('creates a translation', async () => {
    const result = await createtranslation({
      input: { score: 2 },
    })

    expect(result.score).toEqual(2)
  })
})
