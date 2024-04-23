import React, { useState } from 'react'

import { Form, Label, Submit } from '@redwoodjs/forms'
import { navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

const VERIFY_CODE = gql`
  mutation verifyCode($email: String!, $Code: String!) {
    verifyCode(email: $email, Code: $Code) {
      success
      message
    }
  }
`

const SEND_CODE = gql`
  mutation initiate2FA($email: String!) {
    initiate2FA(email: $email) {
      success
      message
    }
  }
`

const ResendCodeButton = () => {
  const [initiate2FA] = useMutation(SEND_CODE)
  const handleResendCode = async () => {
    try {
      const email = localStorage.getItem('userEmail')
      const response = await initiate2FA({ variables: { email } })
      if (response.data.initiate2FA.success) {
        toast.success('Code Sent to Email')
      } else {
        toast.error('Sorry, Something went wrong!')
      }
    } catch (error) {
      toast.error('Failed to send Email')
    }
  }

  return (
    <button
      className="rounded-xl bg-gray-600 px-6 py-3 text-white md:w-[381px]"
      onClick={handleResendCode}
    >
      Resend Code
    </button>
  )
}

const TwoFactorAuthPage = () => {
  const [Code, setCode] = useState('')
  const [verifyCode] = useMutation(VERIFY_CODE)
  const [message, setMessage] = useState('')
  const onSubmit = async () => {
    if (!Code) {
      setMessage('Please enter the Code')
      return
    }
    try {
      const email = localStorage.getItem('userEmail')
      const response = await verifyCode({ variables: { email, Code } })
      if (response.data.verifyCode.success) {
        const token = localStorage.getItem('TempAuthToken')
        localStorage.setItem('authToken', token)
        navigate('/code-translator')
      } else {
        toast.error('Sorry, Something went wrong!')
      }
    } catch (error) {
      console.log(error)
      toast.error('Incorrect Code')
      return false
    }
  }
  return (
    <Form
      className="flex flex-col rounded-xl bg-gray-100 px-20 py-12 max-md:max-w-full max-md:px-5"
      onSubmit={onSubmit}
    >
      <Toaster />
      <Label htmlFor="codeInput" className="mt-2 text-black">
        Code:
      </Label>
      <input
        id="codeInput"
        type="code"
        className="mt-2 w-full max-w-full items-start justify-center rounded-xl bg-gray-200 py-3 pl-3 pr-16 text-gray-800 md:w-[381px]"
        placeholder="123456"
        aria-label="Enter your email"
        value={Code}
        onChange={(e) => {
          setCode(e.target.value)
          setMessage(false)
        }}
      />
      {message}
      <Submit className="mb-6 mt-16 w-full max-w-full items-center justify-center rounded-2xl border border-solid border-black bg-blue-500 px-16 py-2.5 text-white shadow-sm md:w-[381px]">
        Submit
      </Submit>
      <ResendCodeButton />
    </Form>
  )
}

export default TwoFactorAuthPage
