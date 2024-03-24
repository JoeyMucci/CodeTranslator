import { db } from 'src/lib/db'

const { loginUser } = require('../services/login/login') // Import your authentication function

export const resolvers = {
  async loginUser({ email, password }) {
    try {
      const sessionToken = await loginUser({ email, password })
      const user = await db.user.findOne({ where: { email } })
      return {
        token: sessionToken,
        user: user,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
}
