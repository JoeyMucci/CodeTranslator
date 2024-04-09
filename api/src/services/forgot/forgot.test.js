// Load environment variables from .env file
require('dotenv').config()
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
// Import necessary functions and modules from your codebase

import { generateResetToken, sendPasswordResetEmail, requestPasswordReset } from './forgot.js'

// Import your database client or ORM module

// Configure the database client to use the test database URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
})

// Mock dependencies...
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mockedResetToken'),
}))

jest.mock('src/lib/db', () => ({
  user: {
    findUnique: jest.fn((params) => {
      // Mock user database lookup
      if (params.where.email === 'existing@example.com') {
        return { email: 'existing@example.com' }
      } else {
        return null
      }
    }),
  },
}))

jest.mock('../users/users', () => ({
  updateUser: jest.fn(() => ({
    email: 'test@example.com',
    resetToken: 'mockedResetToken',
    resetTokenExpiresAt: new Date(),
  })),
}))

jest.mock('sib-api-v3-sdk', () => ({
  ApiClient: {
    instance: {
      authentications: {
        'api-key': { apiKey: '' },
      },
    },
  },
  TransactionalEmailsApi: jest.fn(() => ({
    sendTransacEmail: jest.fn(() => Promise.resolve('Email sent successfully')),
  })),
  SendSmtpEmail: jest.fn(),
}))

describe('generateResetToken', () => {
  it('should generate a reset token', async () => {
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'password123',
      },
    })

    const user = await generateResetToken('test@example.com')
    expect(user.email).toBe('test@example.com')
    expect(user.resetToken).toBe('mockedResetToken')
    expect(user.resetTokenExpiresAt).toBeInstanceOf(Date)
  })
  it('throws an error if token generation fails', async () => {
    // Mock the scenario where token generation fails
    jest.spyOn(jwt, 'sign').mockImplementation(() => {
      throw new Error('Token generation failed')
    })

    // Ensure that the function throws an error when token generation fails
    await expect(generateResetToken('test@example.com')).rejects.toThrow('Token generation failed')
  })
})

describe('sendPasswordResetEmail', () => {
  it('should send a password reset email', async () => {
    const result = await sendPasswordResetEmail('test@example.com', 'resetLink')
    expect(result.success).toBe(true)
    expect(result.message).toBe('Email sent successfully')
  })
  it('throws an error if email is not provided', async () => {
    await expect(requestPasswordReset({ email: '' })).rejects.toThrow('Email is Required')
  })
})
// Close the database connection after all tests have finished
afterAll(async () => {
  await prisma.$disconnect()
})
