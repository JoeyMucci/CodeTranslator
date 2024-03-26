mockCurrentUser({ name: 'bob' })

export const standard = defineScenario({
  translation: {
    one: {
      data: {
        originalCode: "print('Hello world')",
        translatedCode: "System.out.println('Hello world')",
        originalLanguage: 'Python',
        translatedLanguage: 'Java',
      },
    },
    two: {
      data: {
        originalCode: "print('Hello wArld')",
        translatedCode: "System.out.println('Hello wArld')",
        originalLanguage: 'Python',
        translatedLanguage: 'Java',
      },
    },
  },
})
