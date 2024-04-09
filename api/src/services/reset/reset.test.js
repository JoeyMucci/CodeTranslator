import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import { db } from 'src/lib/db'

import { resetPassword } from './reset'

jest.mock('src/lib/db', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}))

describe('resetPassword', () => {
  const prisma = new PrismaClient()
  const email = 'test1@example.com'
  const password = 'oldPassword'
  const resetToken = 'validToken'
  const resetTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60)

  beforeEach(async () => {
    jest.clearAllMocks()

    // Create a temporary user in the test database
    await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
        resetToken,
        resetTokenExpiresAt,
      },
    })

    db.user.findUnique.mockResolvedValueOnce({
      email,
      password: await bcrypt.hash(password, 10),
      resetToken,
      resetTokenExpiresAt,
    })
  })

  afterEach(async () => {
    // Clear the database after each test
    await prisma.user.deleteMany()
  })

  it('resets password successfully', async () => {
    // Run the function under test
    const newPassword = 'newPassword'
    await expect(resetPassword({ email, password: newPassword, resetToken })).resolves.not.toThrow()

    // Verify that the user has been updated
    expect(db.user.update).toHaveBeenCalledWith({
      where: { email },
      data: {
        password: expect.any(String),
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    })
  })

  it('throws error for invalid reset token', async () => {
    // Run the function under test with an invalid reset token
    const invalidResetToken = 'invalidToken'
    await expect(resetPassword({ email, password: 'newPassword', resetToken: invalidResetToken })).rejects.toThrow(
      'Invalid or expired token'
    )
  })

  it('throws error for expired reset token', async () => {
    // Run the function under test with an expired reset token
    const expiredResetToken = 'expiredToken'
    await expect(resetPassword({ email, password: 'newPassword', resetToken: expiredResetToken })).rejects.toThrow(
      'Invalid or expired token'
    )
  })
})
