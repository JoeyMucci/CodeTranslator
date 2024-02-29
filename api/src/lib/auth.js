import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET =
  '7f86a5fc42f352f1e51d22a1ff4c4fb9c626f205c4bfc7be8bfb4f90f0eeb4a5'

export const isAuthenticated = () => {
  return true
}

export const hasRole = ({ roles }) => {
  return roles !== undefined
}

export const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
  } catch (error) {
    throw new Error('Error comparing passwords')
  }
}

export const createToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
  } catch (error) {
    throw new Error('Error creating token')
  }
}

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
  } catch (error) {
    throw new Error('Error hashing password')
  }
}

module.exports = { hashPassword }
// This is used by the redwood directive
// in ./api/src/directives/requireAuth

// Roles are passed in by the requireAuth directive if you have auth setup
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const requireAuth = ({ roles }) => {
  return isAuthenticated()
}
