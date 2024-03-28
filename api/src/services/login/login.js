import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { db } from 'src/lib/db'

export const loginUser = async ({ email, password }) => {
  const user = await db.user.findUnique({ where: { email } })

  if (!user) {
    throw new Error('User not found')
  }

  const passwordMatches = await comparePasswords(password, user.password)

  if (passwordMatches) {
    const sessionToken = generateSessionToken(user)
    console.log('session:', sessionToken)
    return {
      token: sessionToken,
      user: user,
    }
  } else {
    throw new Error('Invalid password')
  }
}

export const comparePasswords = async (plaintextPassword, hashedPassword) => {
  return await bcrypt.compare(plaintextPassword, hashedPassword)
}

export const generateSessionToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )

  return token
}

export const logoffUser = async (token) => {
  try {
    await db.blacklistedToken.create({ token })

    return { success: true, message: 'User logged off successfully' }
  } catch (error) {
    console.error('Error logging off:', error)
    throw new Error('Error logging off')
  }
}
