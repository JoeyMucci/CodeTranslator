import jwt from 'jsonwebtoken'

const JWT_SECRET =
  '7f86a5fc42f352f1e51d22a1ff4c4fb9c626f205c4bfc7be8bfb4f90f0eeb4a5'

export const createToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
  } catch (error) {
    throw new Error('Error creating token')
  }
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Error verifying token')
  }
}
