import { useState } from 'react'

import { Form, Label, Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

const FORGOT_USER = gql`
  mutation requestPasswordReset($email: String!) {
    requestPasswordReset(email: $email) {
      email
    }
  }
`

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [requestPasswordReset] = useMutation(FORGOT_USER)

  const onSubmit = async () => {
    if (!email) {
      setMessage('Please enter your email')
      return
    }
    try {
      await requestPasswordReset({ variables: { email } })
      toast.success('Email Sent')
    } catch (error) {
      toast.error('Failed to send Email')
    }
  }

  return (
    <Form
      className="flex flex-col rounded-xl bg-gray-100 px-20 py-12 max-md:max-w-full max-md:px-5"
      onSubmit={onSubmit}
    >
      <Toaster />
      <Label htmlFor="emailInput" className="mt-2 text-black">
        Email:
      </Label>
      <input
        id="emailInput"
        type="email"
        className="mt-2 w-full max-w-full items-start justify-center rounded-xl bg-gray-200 py-3 pl-3 pr-16 text-gray-800 md:w-[381px]"
        placeholder="Example.email@njit.edu"
        aria-label="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Submit className="mb-6 mt-16 w-full max-w-full items-center justify-center rounded-2xl border border-solid border-black bg-blue-500 px-16 py-2.5 text-white shadow-sm md:w-[381px]">
        Reset Password
      </Submit>
      <p>{message}</p>
    </Form>
  )
}

export default ForgotPasswordPage
