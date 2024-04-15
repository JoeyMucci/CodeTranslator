// web/src/pages/UserEditingPage/UserEditingPage.jsx
//import React from 'react'

import PasswordChangeForm from 'web/src/components/PasswordChangeForm/PasswordChangeForm.jsx'
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

export const CHANGE_PASSWORD = gql`
  mutation ChangePasswordMutatation(
    $email: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    changePasswordNew(
      email: $email
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
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
  const formMethodsInfo = useForm()
  const fromMethodsPassword = useForm()

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: async () => {
      formMethodsInfo.reset()
      await new Promise((resolve) => setTimeout(resolve, 2000))
      location.reload()
    },
  })

  // eslint-disable-next-line no-unused-vars
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

  const [changePassword, { loadingpassword, errorpassword }] = useMutation(
    CHANGE_PASSWORD,
    {
      onCompleted: async () => {
        fromMethodsPassword.reset()
      },
    }
  )

  const onSubmitInfo = async (data) => {
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

  const onSubmitPassword = async (data) => {
    try {
      const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/
      if (data.newpassword != data.confirmpassword)
        toast.error('Passwords do not match')
      else if (!passwordRegex.test(data.newpassword))
        toast.error('Password is too weak')
      else {
        await changePassword({
          variables: {
            email: localStorage.getItem('userEmail'),
            oldPassword: data.oldpassword,
            newPassword: data.newpassword,
          },
        })
        toast.success('Password changed!')
      }
    } catch (error) {
      if (
        error.graphQLErrors &&
        error.graphQLErrors[0] &&
        error.graphQLErrors[0].extensions.originalError.message.includes(
          'Invalid password'
        )
      )
        toast.error('Incorrect Password')
      else toast.error('Change password failed')
    }
  }

  const onClickDelete = async () => {
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
        onSubmit={onSubmitInfo}
        error={error}
        loading={loading}
        formMethods={formMethodsInfo}
      />
      <br></br>
      <PasswordChangeForm
        onSubmit={onSubmitPassword}
        error={errorpassword}
        loading={loadingpassword}
        formMethods={fromMethodsPassword}
      />
      <br></br>
      <br></br>
      <br></br>
      <button
        onClick={onClickDelete}
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
