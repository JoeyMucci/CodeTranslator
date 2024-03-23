// api/src/functions/register.js
import { hashPassword } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const handler = async (event) => {
  const { email, password } = JSON.parse(event.body)

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password)

    // Create the user in the database
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User registered successfully', user }),
    }
  } catch (error) {
    // Return an error response if registration fails
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to register user', error }),
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}
