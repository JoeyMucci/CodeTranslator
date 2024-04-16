import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import { changePasswordNew } from './change.js'

describe('change password functionality', () => {
  it('does not throw error for correct old password', async () => {
    const prisma = new PrismaClient()
    const email = 'test1@example.com'
    const password = 'oldPassword123'
    const oldPassword = 'oldPassword123'
    const newPassword = 'mynewpassword123'

    await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
      },
    })

    await changePasswordNew({ email, oldPassword, newPassword })
  })

  it('throws error for incorrect old password', async () => {
    const prisma = new PrismaClient()
    const email = 'test1@example.com'
    const password = 'oldPassword123'
    const oldPassword = 'incorrectOldPass'
    const newPassword = 'mynewpassword123'

    await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
      },
    })

    return expect(async () => {
      await changePasswordNew({ email, oldPassword, newPassword })
    }).rejects.toThrow('Invalid password')
  })
})
