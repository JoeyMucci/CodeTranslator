import jwt from 'jsonwebtoken'

import { db } from 'src/lib/db'

import { updateUser } from '../users/users'

export const generateResetToken = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
  console.log('After being generated', token)
  const input = { resetToken: token }
  updateUser({ email, input })
    .then((updatedUser) => {
      // Handle successful update
      console.log('User updated successfully:', updatedUser)
      return token
    })
    .catch((error) => {
      // Handle erro
      console.error('Error updating user:', error)
    })
}

export const requestPasswordReset = async ({ email }) => {
  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('User not found')
  } else {
    console.log('IN REQUEST RESET FUNCTION')
    const resetToken = generateResetToken(email)
    console.log('After being called RESET TOKEN', user.resetToken) // Generate reset token
    const resetLink = `http://localhost:8910/reset-password?token=${user.resetToken}?email=${user.email}` // Generate reset link
    await sendPasswordResetEmail(email, resetLink) // Send password reset email

    return resetToken
  }
}

export const sendPasswordResetEmail = async (to, resetLink) => {
  var SibApiV3Sdk = require('sib-api-v3-sdk')
  var defaultClient = SibApiV3Sdk.ApiClient.instance
  const apiKey = defaultClient.authentications['api-key']
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY
  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

  console.log('BEFORE SETTING UP EMAIL')
  sendSmtpEmail.subject = 'Rosetta Code Password Reset'
  sendSmtpEmail.sender = { name: 'Rosetta Code', email: 'ne4@njit.edu' }
  sendSmtpEmail.type = 'classic'
  sendSmtpEmail.htmlContent = `${resetLink}` // Assuming text is HTML content
  sendSmtpEmail.to = [{ email: `${to}` }]

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log('API called successfully. Returned data: ' + data)
    },
    function (error) {
      console.error(error)
    }
  )
}
