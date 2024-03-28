mockCurrentUser({ name: 'bob' })

export const standard = defineScenario({
  translation: {
    one: {
      data: {
        originalCode: "print('Hello world')",
        translatedCode: "System.out.println('Hello world')",
        originalLanguage: 'Python',
        translatedLanguage: 'Java',
        user: {
          create: {
            id: 69,
            name: 'Phil',
            email: 'a@a.a',
            password: 'r328u90ievfhjbioewuy4fh',
            resetToken: null,
            resetTokenExpiresAt: null,
            roles: 'fo',
          },
        },
      },
    },
    two: {
      data: {
        originalCode: "print('Hello wArld')",
        translatedCode: "System.out.println('Hello wArld')",
        originalLanguage: 'Python',
        translatedLanguage: 'Java',
        user: {
          create: {
            id: 70,
            name: 'Phit',
            email: 'aeeeee@kk.a',
            password: 'r328rty54thrdjbioewuy4fh',
            resetToken: null,
            resetTokenExpiresAt: null,
            roles: 'of',
          },
        },
      },
    },
  },
})
