import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { db } from 'src/lib/db'

export const verifyResetToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await db.user.findUnique({ where: { email: decoded.email } })
    if (!user || user.resetToken !== token) {
      throw new Error('Invalid or expired token')
    }
    return user.email
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export const changePassword = async ({ email, input }) => {
  const hashedPassword = await bcrypt.hash(input.newPassword, 10)
  return db.user.update({
    data: { password: hashedPassword },
    where: { email },
  })
}
