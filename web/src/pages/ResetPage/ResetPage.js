// ResetPasswordPage.js

import { useState, useEffect } from 'react'

import { Form, Label, Submit } from '@redwoodjs/forms'
import { navigate, useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($userId: String!, $password: String!) {
    resetPassword(email: $email, password: $password) {
      email
      password
    }
  }
`

const ResetPasswordPage = () => {
  const location = useLocation()
  const [newPassword, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      navigate('/') // Redirect to login page after password reset
    },
    onError: (error) => {
      setError(error.message)
    },
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    // Parse reset token from URL

    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    if (token) {
      return
    } else {
      // Handle case where token is missing
      setError('Invalid reset link')
      //navigate('/')
    }
  }, [location.search])

  const handleResetPassword = () => {
    const params = new URLSearchParams(location.search)
    const email = params.get('email')
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    resetPassword({ variables: { email: email, password: newPassword } })
  }

  return (
    <Form
      className="flex flex-col rounded-xl bg-gray-100 px-20 py-12 max-md:max-w-full max-md:px-5"
      onSubmit={handleResetPassword}
    >
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
      <Submit className="mb-6 mt-16 w-full max-w-full items-center justify-center rounded-2xl border border-solid border-black bg-blue-500 px-16 py-2.5 text-white shadow-sm md:w-[381px]">
        Reset Password
      </Submit>
      {error && <p>{error}</p>}
    </Form>
  )
}

export default ResetPasswordPage
