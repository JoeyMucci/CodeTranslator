import { comparePasswords } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { createToken } from 'src/lib/token'

export const handler = async (event) => {
  const { email, password } = JSON.parse(event.body)

  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid credentials' }),
    }
  }

  const passwordMatch = await comparePasswords(password, user.password)
  if (!passwordMatch) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid credentials' }),
    }
  }

  const token = createToken({ userId: user.id })

  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  }
}
