import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { db } from 'src/lib/db'

function generateSixDigitCode() {
  const min = 100000
  const max = 999999
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const loginUserMute = async ({ email, password }) => {
  try {
    const result = await loginUser({
      email: email,
      password: password,
    })
    return {
      token: result.token,
      user: result.user,
      error: 'none',
    }
  } catch (error) {
    return {
      token: null,
      user: null,
      error: error.message,
    }
  }
}

export const loginUser = async ({ email, password }) => {
  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('User not found')
  }
  const passwordMatches = await comparePasswords(password, user.password)
  if (passwordMatches) {
    if (await initiate2FA({ email })) {
      const sessionToken = generateSessionToken(user)
      return {
        token: sessionToken,
        user: user,
      }
    } else {
      throw new Error('Failed to send 2Factor Authentication Email')
    }
  } else {
    throw new Error('Invalid password')
  }
}

export const sendCodeEmail = async (to, Code) => {
  var SibApiV3Sdk = require('sib-api-v3-sdk')
  var defaultClient = SibApiV3Sdk.ApiClient.instance
  const apiKey = defaultClient.authentications['api-key']
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY
  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

  sendSmtpEmail.subject = 'Rosetta Code 2 factor Authentification'
  sendSmtpEmail.sender = { name: 'Rosetta Code', email: 'RosettaCodeOfficial@gmail.com' }
  sendSmtpEmail.type = 'classic'
  sendSmtpEmail.htmlContent = `Your 6 digit 2-factor authentification code is ${Code}` // Assuming text is HTML content
  sendSmtpEmail.to = [{ email: `${to}` }]
  try {
    const data = apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log('API called successfully. Returned data: ' + data)
    return true
  } catch (error) {
    console.error('Error sending code email:', error)
    throw new Error('Failed to send email')
  }
}

export const initiate2FA = async ({ email }) => {
  const Code = generateSixDigitCode()
  const response = sendCodeEmail(email, Code)
  if (response) {
    try {
      const user2 = await db.TwoFactorCode.findUnique({ where: { userEmail: email } })
      if (user2) {
        await db.TwoFactorCode.update({
          data: {
            Code,
            userEmail: email,
          },
          where: { userEmail: email },
        })
      } else {
        await db.TwoFactorCode.create({
          data: {
            Code,
            userEmail: email,
          },
        })
      }
      return { success: true, message: 'Email sent successfully' }
    } catch (error) {
      throw new Error('Error in Code Generation')
    }
  }
}

export const comparePasswords = async (plaintextPassword, hashedPassword) => {
  return await bcrypt.compare(plaintextPassword, hashedPassword)
}

export const verifyCode = async ({ email, Code }) => {
  const dbCode = await db.TwoFactorCode.findUnique({ where: { userEmail: email } })
  if (dbCode.Code == Code) {
    return { success: true, message: 'Email sent successfully' }
  } else {
    throw new Error('Error in Code Checking')
  }
}

export const generateSessionToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )

  return token
}

export const logoffUser = async (token) => {
  try {
    await db.blacklistedToken.create({ token })

    return { success: true, message: 'User logged off successfully' }
  } catch (error) {
    console.error('Error logging off:', error)
    throw new Error('Error logging off')
  }
}
