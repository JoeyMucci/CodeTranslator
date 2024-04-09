mockCurrentUser({ name: 'bob' })

export const standard = defineScenario({
  user: {
    one: {
      id: 69,
      name: 'Phil',
      email: 'a@a.a',
      password: 'r328u90ievfhjbioewuy4fh',
      resetToken: null,
      resetTokenExpiresAt: null,
      roles: 'fo',
    },
    two: {
      data: {
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
})
