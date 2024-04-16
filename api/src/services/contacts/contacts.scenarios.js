export const standard = defineScenario({
  contact: {
    one: {
      data: {
        subject: 'Mick',
        backupEmail: 'yakuza@toonlink.edu2',
        message: "If it weren't for those meddling kids",
        user: {
          create: {
            id: 690,
            name: 'Phil',
            email: 'yakuza@toonlink.edu',
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
        subject: 'Mack',
        backupEmail: 'dodo@bird.bob',
        message: 'Love this tbh ong fr',
        user: {
          create: {
            id: 700,
            name: 'Phil',
            email: 'dodo@bird.bob',
            password: 'r328u90ievfhjbioewuy4fh',
            resetToken: null,
            resetTokenExpiresAt: null,
            roles: 'fo',
          },
        },
      },
    },
  },
})
