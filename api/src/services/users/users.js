import bcrypt from 'bcrypt'

import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ email }) => {
  return db.user.findUnique({
    where: { email },
  })
}

export const createUser = async ({ input }) => {
  const hashedPassword = await bcrypt.hash(input.password, 10)
  const user = await db.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
    },
  })

  return user
}

export const updateUserMute = async ({ email, input }) => {
  try {
    return {
      user: await updateUserByEmail({
        email: email,
        input: input,
      }),
      error: 'none',
    }
  } catch (error) {
    return {
      user: null,
      error: error.code,
    }
  }
}

export const updateUser = ({ email, input }) => {
  return db.user.update({
    data: input,
    where: { email },
  })
}

export const updateUserByEmail = ({ email, input }) => {
  return db.user.update({
    data: input,
    where: { email },
  })
}

export const changePassword = async ({ id, input }) => {
  const hashedPassword = await bcrypt.hash(input.newPassword, 10)
  return db.user.update({
    data: { password: hashedPassword },
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const deleteUserByEmail = ({ email }) => {
  return db.user.delete({
    where: { email },
  })
}
