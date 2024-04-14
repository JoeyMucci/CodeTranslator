// web/src/pages/UserEditingPage/UserEditingPage.jsx
//import React from 'react'

import UserEditingForm from 'web/src/components/UserEditingForm/UserEditingForm.jsx'

import { useForm } from '@redwoodjs/forms'
import { navigate } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

// import { useAuth } from 'src/auth' // Assuming you have an auth hook similar to HomePage.jsx

export const UPDATE_USER = gql`
  mutation UpdateUserMutation($email: String!, $input: UpdateUserInput!) {
    updateUserByEmail(email: $email, input: $input) {
      email
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUserMutation($email: String!) {
    deleteUserByEmail(email: $email) {
      email
    }
  }
`

let message = ''
if (localStorage.getItem('userName') == 'null')
  message = (
    <>
      You do not have a preferred name yet
      <br></br>
      Any name you select may be visible to other users
    </>
  )
else
  message = (
    <>
      Your current email is <strong>{localStorage.getItem('userEmail')}</strong>
      <br></br>
      Any name you select may be visible to other users
    </>
  )
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

  const [deleteUser, { loadingdelete, errordelete }] = useMutation(
    DELETE_USER,
    {
      onCompleted: async () => {
        toast.success('Your profile is deleted! Hang tight')
        await new Promise((resolve) => setTimeout(resolve, 2000))
        localStorage.clear()
        location.reload()
        navigate('/')
      },
    }
  )

  const onSubmit = async (data) => {
    try {
      const realData = {
        name: data.name == '' ? localStorage.getItem('userName') : data.name,
        email:
          data.email == '' ? localStorage.getItem('userEmail') : data.email,
      }
      await updateUser({
        variables: {
          email: localStorage.getItem('userEmail'),
          input: realData,
        },
      })
      localStorage.setItem('userEmail', realData.email)
      localStorage.setItem('userName', realData.name)
      toast.success('Your profile is updated! Hang tight!')
    } catch (error) {
      if (
        error.graphQLErrors &&
        error.graphQLErrors[0] &&
        error.graphQLErrors[0].extensions.originalError.message.includes(
          'Unique constraint'
        )
      )
        toast.error('Email is already registered')
      else toast.error('Update user info failed')
    }
  }

  const onClick = async () => {
    var isConfirm = confirm(
      'Are you sure you want to delete your account? All feedback submissions and translation history will be lost.'
    )
    if (isConfirm)
      try {
        await deleteUser({
          variables: { email: localStorage.getItem('userEmail') },
        })
      } catch (error) {
        toast.error('Failed to delete account, try again later')
      }
  }

  return (
    <>
      <MetaTags title="Edit Profile" description="Edit your profile" />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div
        className="mt-5 flex w-1/2 flex-col justify-center"
        style={{ margin: 'auto' }}
      >
        <h1 className="text" style={{ margin: 'auto' }}>
          Update your info
        </h1>
      </div>

      <h3 className="smalltext" style={{ textAlign: 'center' }}>
        {message}
      </h3>

      <Toaster />
      <UserEditingForm
        onSubmit={onSubmit}
        error={error}
        loading={loading}
        formMethods={formMethods}
      />
      <br></br>
      <br></br>
      <br></br>
      <button
        onClick={onClick}
        className="mt-5 w-1/4 justify-center  rounded bg-sky-700 text-white hover:bg-sky-800"
        style={{ margin: 'auto', display: 'block' }}
        aria-label="Delete"
      >
        DELETE ACCOUNT
      </button>
    </>
  )
}

export default UserEditingPage
