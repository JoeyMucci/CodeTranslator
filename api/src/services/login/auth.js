import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import 'dotenv/config'
import { db } from 'src/lib/db'

export const loginUser = async ({ email, password }) => {
  const user = await db.user.findOne({ where: { email } })

  if (!user) {
    throw new Error('User not found')
  }

  const passwordMatches = await comparePasswords(password, user.password)

  if (passwordMatches) {
    // Generate and return a session token
    const sessionToken = generateSessionToken(user)
    return sessionToken
  } else {
    throw new Error('Invalid password')
  }
}

export const comparePasswords = async (plaintextPassword, hashedPassword) => {
  return await bcrypt.compare(plaintextPassword, hashedPassword)
}

export const generateSessionToken = (user) => {
  // Generate a session token using JWT (JSON Web Tokens)
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET, // Use a secret key stored in environment variables
    {
      expiresIn: '1h', // Token expires in 1 hour
    }
  )

  return token
}

export const logoffUser = async (token) => {
  try {
    // Add the token to the blacklist in the database
    await db.blacklistedToken.create({ token })

    return { success: true, message: 'User logged off successfully' }
  } catch (error) {
    console.error('Error logging off:', error)
    throw new Error('Error logging off')
  }
}
