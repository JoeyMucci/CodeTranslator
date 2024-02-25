const { hashPassword } = require('src/lib/auth')
const { db } = require('src/lib/db')

export const handler = async (event) => {
  const { email, password } = JSON.parse(event.body)

  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'All fields are required' }),
    }
  }

  const existingUser = await db.user.findUnique({ where: { email } })
  if (existingUser) {
    return {
      statusCode: 409,
      body: JSON.stringify({ error: 'User already exists' }),
    }
  }

  const hashedPassword = await hashPassword(password)

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(newUser),
  }
}
