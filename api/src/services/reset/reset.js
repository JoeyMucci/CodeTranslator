import bcrypt from 'bcrypt'

import { db } from 'src/lib/db'

import { updateUser } from '../users/users'

export const verifyResetToken = async (email, token) => {
  const user = await db.user.findUnique({ where: { email } })
  if (!user.resetTokenExpiresAt || user.resetTokenExpiresAt < new Date()) {
    throw new Error('Reset token has expired')
  }
  if (!user || user.resetToken !== token) {
    throw new Error('Invalid or expired token')
  } else {
    return token
  }
}

export const resetPassword = async ({ email, password, resetToken }) => {
  verifyResetToken(email, resetToken)
  const newPassword = await bcrypt.hash(password, 10)
  try {
    const user = await updateUser({
      email,
      input: {
        password: newPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    })
    return user
  } catch (error) {
    console.error('Error updating password:', error)
    throw new Error('Failed to update password')
  }
}
