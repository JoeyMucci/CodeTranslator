import bcrypt from 'bcrypt'

import { db } from 'src/lib/db'

import { updateUser } from '../users/users'

export const changePasswordNew = async ({ email, oldPassword, newPassword }) => {
  const user = await db.user.findUnique({ where: { email } })
  const passwordMatches = await bcrypt.compare(oldPassword, user.password)
  if (!passwordMatches) throw new Error('Invalid password')

  newPassword = await bcrypt.hash(newPassword, 10)

  try {
    const userTwo = await updateUser({
      email,
      input: {
        password: newPassword,
      },
    })

    return userTwo
  } catch (error) {
    console.error('Error updating password:', error)
    throw error
  }
}
