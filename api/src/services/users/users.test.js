import { db } from 'src/lib/db'

import { createUser } from './users'

describe('User Registration', () => {
  beforeAll(async () => {
    // Clear user data before each test
    await db.user.deleteMany()
  })

  test('should register a new user with valid inputs', async () => {
    const newUser = await createUser({
      email: 'test@example.com',
      password: 'IloveGoodPass2921!',
    })
    expect(newUser).toBeDefined()
    expect(newUser.email).toBe('test@example.com')
    // You can add more assertions to check other properties or conditions
  })

  test('should not register a user with an invalid email', async () => {
    // Test with an invalid email format
    await expect(
      createUser({
        email: 'invalid-email',
        password: 'IloveGoodPass2921!',
      })
    ).rejects.toThrow()
  })

  test('should not register a user with a weak password', async () => {
    // Test with a weak password (e.g., too short)
    await expect(
      createUser({
        email: 'test@example.com',
        password: 'weak',
      })
    ).rejects.toThrow()
  })

  test('should not register a user with an existing email', async () => {
    // Create a user with a specific email
    await createUser({
      email: 'existing@example.com',
      password: 'IloveGoodPass2921!',
    })

    // Attempt to create another user with the same email
    await expect(
      createUser({
        email: 'existing@example.com',
        password: 'IloveGoodPass2921!',
      })
    ).rejects.toThrow()
  })

  // Add more test cases as needed
})
