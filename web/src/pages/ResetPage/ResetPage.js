// ResetPasswordPage.js

import { useState, useEffect } from 'react'

import { Form, Label, Submit } from '@redwoodjs/forms'
import { navigate, useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($email: String!, $password: String!, $resetToken: String!) {
    resetPassword(email: $email, password: $password, resetToken: $resetToken) {
      email
      password
      resetToken
    }
  }
`

const ResetPasswordPage = () => {
  const location = useLocation()
  const [newPassword, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      navigate('/') // Redirect to login page after password reset
    },
  })
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('token') && params.has('email')) {
      return
    } else {
      // Handle case where token or email is missing
      toast.error('Invalid reset link')
      navigate('/')
    }
  }, [location.search])

  const handleResetPassword = () => {
    const params = new URLSearchParams(window.location.search)
    const email = params.get('email')
    const resetToken = params.get('token')
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    } else if (!email) {
      toast.error('Failed to get email')
      return
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/
    if (!passwordRegex.test(newPassword)) {
      setMessage('Passwords is too weak')
      return
    }
    try {
      const user = resetPassword({ variables: { email: email, password: newPassword, resetToken: resetToken } })
      toast.success('Password Change Successful', user.email)
    } catch (error) {
      console.log(error.message)
      toast.error('Failed change password')
    }
  }

  return (
    <Form
      className="flex flex-col rounded-xl bg-gray-100 px-20 py-12 max-md:max-w-full max-md:px-5"
      onSubmit={handleResetPassword}
    >
      <Toaster />
      <Label htmlFor="emailInput" className="mt-2 text-black">
        New Password:
      </Label>
      <input
        id="passwordInput"
        className="mt-2 w-full max-w-full items-start justify-center rounded-xl bg-gray-200 py-3 pl-3 pr-16 text-gray-800 md:w-[381px]"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Label htmlFor="emailInput" className="mt-2 text-black">
        Confirm New Password:
      </Label>
      <input
        id="confirmpasswordInput"
        className="mt-2 w-full max-w-full items-start justify-center rounded-xl bg-gray-200 py-3 pl-3 pr-16 text-gray-800 md:w-[381px]"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <p>{message}</p>
      <Submit className="mb-6 mt-16 w-full max-w-full items-center justify-center rounded-2xl border border-solid border-black bg-blue-500 px-16 py-2.5 text-white shadow-sm md:w-[381px]">
        Reset Password
      </Submit>
    </Form>
  )
}

export default ResetPasswordPage
