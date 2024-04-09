import jwt from 'jsonwebtoken'

import { db } from 'src/lib/db'

import { updateUser } from '../users/users'

export const generateResetToken = async (email) => {
  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
  const currentTime = new Date()
  const resetTokenExpiresAt = new Date(currentTime.getTime() + 1 * 60 * 60 * 1000)
  try {
    const user = await updateUser({
      email,
      input: {
        resetToken,
        resetTokenExpiresAt,
      },
    })
    return user
  } catch (error) {
    console.error('Error requesting password reset:', error)
    throw new Error('Failed to request reset')
  }
}

export const sendPasswordResetEmail = async (to, resetLink) => {
  var SibApiV3Sdk = require('sib-api-v3-sdk')
  var defaultClient = SibApiV3Sdk.ApiClient.instance
  const apiKey = defaultClient.authentications['api-key']
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY
  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

  sendSmtpEmail.subject = 'Rosetta Code Password Reset'
  sendSmtpEmail.sender = { name: 'Rosetta Code', email: 'ne4@njit.edu' }
  sendSmtpEmail.type = 'classic'
  sendSmtpEmail.htmlContent = `${resetLink}` // Assuming text is HTML content
  sendSmtpEmail.to = [{ email: `${to}` }]
  try {
    const data = apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log('API called successfully. Returned data: ' + data)
    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    console.error('Error sending reset email:', error)
    throw new Error('Failed to send email')
  }
}

export const requestPasswordReset = async (data) => {
  const email = data.email
  if (!email) {
    const prob = new Error('Email is Required')
    throw prob
  }
  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    const prob = new Error('User not found')
    throw prob
  } else {
    const newuser = await generateResetToken(email)
    const resetLink = `http://localhost:8910/reset-password?token=${newuser.resetToken}&email=${newuser.email}` // Generate reset link
    await sendPasswordResetEmail(email, resetLink)

    return newuser
  }
}
