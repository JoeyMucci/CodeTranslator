import { hashPassword } from 'src/lib/auth'
import { db } from 'src/lib/db'

import { handler } from './register'

describe('User Registration', () => {
  const event = {
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'password123',
    }),
  }

  beforeAll(async () => {
    const hashedPassword = await hashPassword('existingpassword')
    await db.user.create({
      data: {
        email: 'existing@example.com',
        password: hashedPassword,
      },
    })
  })

  it('Registers a new user', async () => {
    const response = await handler(event)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(200)
    expect(body.email).toBe('test@example.com')
  })

  it('Returns an error if required fields are missing', async () => {
    const incompleteEvent = {
      body: JSON.stringify({
        // Missing fields: username, email, password
      }),
    }
    const response = await handler(incompleteEvent)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(400)
    expect(body.error).toBe('All fields are required')
  })

  it('Returns an error if user already exists', async () => {
    const existingUserEvent = {
      body: JSON.stringify({
        email: 'existing@example.com',
        password: 'newpassword123',
      }),
    }
    const response = await handler(existingUserEvent)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toBe(409)
    expect(body.error).toBe('User already exists')
  })
})
