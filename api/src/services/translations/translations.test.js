import {
  translations,
  myTranslations,
  createTranslation,
  // updatetranslation,
  // deletetranslation,
} from './translations'

describe('translations', () => {
  scenario('returns all translations', async (scenario) => {
    const result = await translations()

    expect(result.length).toEqual(Object.keys(scenario.translation).length)
  })

  scenario("returns one user's translations", async (scenario) => {
    const result = await myTranslations({ emmy: 'a@a.a' })

    expect(result[0].id).toEqual(scenario.translation.one.id)
    expect(result[0].originalCode).toEqual(scenario.translation.one.originalCode)
    expect(result[0].originalLanguage).toEqual(scenario.translation.one.originalLanguage)
    expect(result[0].translatedCode).toEqual(scenario.translation.one.translatedCode)
    expect(result[0].translatedLanguage).toEqual(scenario.translation.one.translatedLanguage)
  })

  scenario('creates a translation', async () => {
    const result = await createTranslation({
      input: {
        originalCode: 'print("hello world")',
        translatedCode: "System.out.println('Hello world')",
        originalLanguage: 'Python',
        translatedLanguage: 'Java',
        user: {
          create: {
            id: 690,
            name: 'Phiel',
            email: 'a@z.a',
            password: 'r328u9juievfhjbiwuy4fh',
            resetToken: null,
            resetTokenExpiresAt: null,
            roles: 'fo',
          },
        },
      },
    })
    expect(result.originalCode).toEqual('print("hello world")')
  })
})
