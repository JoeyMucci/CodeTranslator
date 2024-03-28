// api/src/services/auth.test.js

import bcrypt from 'bcrypt'

import { db } from 'src/lib/db'

import { loginUser, logoffUser } from './login'

jest.mock('src/lib/db', () => ({
  db: {
    user: {
      findUnique: jest.fn(),
    },
    blacklistedToken: {
      create: jest.fn(),
    },
  },
}))

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}))

describe('Authentication Service', () => {
  describe('loginUser', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should throw an error for nonexistent user', async () => {
      db.user.findUnique.mockResolvedValue(null)

      await expect(
        loginUser({
          email: 'nonexistent@example.com',
          password: 'Password123!',
        })
      ).rejects.toThrow('User not found')
    })

    it('should throw an error for incorrect password', async () => {
      const mockUser = {
        id: 1,
        email: 'user@example.com',
        password: '$2b$10$0w5ZlW07G3zL3/7xvB2VsebkfNPeTGVuZi7J30Xqtk3Fu09I.35Pm', // Hashed password
      }

      db.user.findUnique.mockResolvedValue(mockUser)
      bcrypt.compare.mockResolvedValue(false)

      await expect(
        loginUser({
          email: 'user@example.com',
          password: 'IncorrectPassword',
        })
      ).rejects.toThrow('Invalid password')
    })

    it('should login a user with correct credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'user@example.com',
        password: '$2b$10$0w5ZlW07G3zL3/7xvB2VsebkfNPeTGVuZi7J30Xqtk3Fu09I.35Pm', // Hashed password
      }

      db.user.findUnique.mockResolvedValue(mockUser)
      bcrypt.compare.mockResolvedValue(true)

      const sessionToken = await loginUser({
        email: 'user@example.com',
        password: 'Password123!',
      })
      expect(sessionToken).toBeDefined()
    })

    it('should login a user with correct credentials (case insensitive email)', async () => {
      const mockUser = {
        id: 1,
        email: 'user@example.com',
        password: '$2b$10$0w5ZlW07G3zL3/7xvB2VsebkfNPeTGVuZi7J30Xqtk3Fu09I.35Pm', // Hashed password
      }

      db.user.findUnique.mockResolvedValue(mockUser)
      bcrypt.compare.mockResolvedValue(true)

      const sessionToken = await loginUser({
        email: 'User@Example.com',
        password: 'Password123!',
      })
      expect(sessionToken).toBeDefined()
    })
  })

  describe('logoffUser', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should blacklist the token on logoff', async () => {
      const token = 'exampleToken'

      await logoffUser(token)

      expect(db.blacklistedToken.create).toHaveBeenCalledWith({ token })
    })
  })
})
