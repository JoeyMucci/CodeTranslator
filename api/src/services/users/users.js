import bcrypt from 'bcrypt'

import { db } from 'src/lib/db'
export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
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

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
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
