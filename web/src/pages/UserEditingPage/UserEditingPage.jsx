// web/src/pages/UserEditingPage/UserEditingPage.jsx
import React from 'react'

import UserEditingForm from 'web/src/components/UserEditingForm/UserEditingForm.jsx'

import { useForm } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

// import { useAuth } from 'src/auth' // Assuming you have an auth hook similar to HomePage.jsx

const UPDATE_USER = gql`
  mutation UpdateUserMutation($email: String!, $input: UpdateUserInput!) {
    updateUserByEmail(email: $email, input: $input) {
      email
    }
  }
`

let message = ''
if (!localStorage.getItem('userName'))
  message = 'You do not have a preferred name yet'
else message = 'Your current email is ' + localStorage.getItem('userEmail')

const UserEditingPage = () => {
  // const { currentUser } = useAuth() // Use the auth hook to get the current user
  const formMethods = useForm()

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: async () => {
      formMethods.reset()
      await new Promise((resolve) => setTimeout(resolve, 2000))
      location.reload()
    },
  })

  const onSubmit = async (data) => {
    try {
      await updateUser({
        variables: { email: localStorage.getItem('userEmail'), input: data },
      })
      localStorage.setItem('userEmail', data.email)
      localStorage.setItem('userName', data.name)
      toast.success('Your profile is updated! Hang tight!')
    } catch (error) {
      toast.error('Update user info failed.')
      console.log(error)
    }
  }

  return (
    <>
      <MetaTags title="Edit Profile" description="Edit your profile" />

      <h1 className="text">Update your info</h1>
      <h3 className="smalltext">{message}</h3>

      <Toaster />
      <UserEditingForm
        onSubmit={onSubmit}
        error={error}
        loading={loading}
        formMethods={formMethods}
      />
    </>
  )
}

export default UserEditingPage
