import bcrypt from 'bcrypt'

import { db } from 'src/lib/db'

import { createUser, updateUser, changePassword, deleteUser } from './users' // Assuming the resolver file is named 'resolvers.js'

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockReturnValue('hashedPassword'),
}))

jest.mock('src/lib/db', () => ({
  db: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

describe('Resolver Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    it('creates a new user with hashed password', async () => {
      const input = { email: 'test@example.com', password: 'password' }
      await createUser({ input })

      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10)
      expect(db.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          password: 'hashedPassword',
        },
      })
    })
  })

  describe('updateUser', () => {
    it('updates user information', async () => {
      const input = { name: 'jeffrey' }
      await updateUser({ email: 'bob@bob.bob', input })

      expect(db.user.update).toHaveBeenCalledWith({
        data: { name: 'jeffrey' },
        where: { email: 'bob@bob.bob' },
      })
    })
  })

  describe('changePassword', () => {
    it('changes user password with hashed password', async () => {
      const input = { id: 1, newPassword: 'newPassword' }
      await changePassword({ id: 1, input })

      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10)
      expect(db.user.update).toHaveBeenCalledWith({
        data: { password: 'hashedPassword' },
        where: { id: 1 },
      })
    })
  })

  describe('deleteUser', () => {
    it('deletes a user', async () => {
      await deleteUser({ id: 1 })

      expect(db.user.delete).toHaveBeenCalledWith({ where: { id: 1 } })
    })
  })
})
