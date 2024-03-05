import { hashPassword } from 'src/lib/auth'
import { db } from 'src/lib/db'

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = async ({ email, password }) => {
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format')
  }
  if (!passwordRegex.test(password)) {
    throw new Error(
      'Weak password. Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.'
    )
  }
  const hashedPassword = await hashPassword(password)

  const user = await db.user.create({
    data: {
      email,
      hashedPassword,
    },
  })

  return user
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}
