// web/src/pages/UserEditingPage/UserEditingPage.jsx
//import React from 'react'

import React, { useState, useEffect } from 'react'

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

  /***THEMEING* */
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.className = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleSetTheme = (theme) => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }
  /**** */

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
      console.log(error)
      console.log(error.graphQLErrors[0])
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
      console.log(error)
      console.log(error.graphQLErrors[0])
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
      <div
        className={`  ${
          theme === 'light'
            ? 'light-theme'
            : theme === 'dark'
            ? 'dark-theme'
            : theme === 'snes'
            ? 'snes-theme'
            : theme === 'our'
            ? 'our-theme'
            : theme === 'terminal'
            ? 'terminal-theme'
            : theme === 'dmg'
            ? 'dmg-theme'
            : theme === 'nautilus'
            ? 'nautilus-theme'
            : theme === 'copper'
            ? 'copper-theme'
            : 'beach-theme'
        }`}
      >
        <MetaTags title="Edit Profile" description="Edit your profile" />
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className={`flex w-1/2 flex-col`} style={{ margin: 'auto' }}>
          <h1 style={{ paddingLeft: '0px' }}>Update your info</h1>
        </div>

        <h3 className="smalltext" style={{ textAlign: 'center' }}>
          {message}
        </h3>

        <Toaster />
        <UserEditingForm
          className={`  ${
            theme === 'light'
              ? 'light-theme'
              : theme === 'dark'
              ? 'dark-theme'
              : theme === 'snes'
              ? 'snes-theme'
              : theme === 'our'
              ? 'our-theme'
              : theme === 'terminal'
              ? 'terminal-theme'
              : theme === 'dmg'
              ? 'dmg-theme'
              : theme === 'nautilus'
              ? 'nautilus-theme'
              : theme === 'copper'
              ? 'copper-theme'
              : 'beach-theme'
          }`}
          onSubmit={onSubmitInfo}
          error={error}
          loading={loading}
          formMethods={formMethodsInfo}
          data-testid="UserEditingForm"
          role="UserForm"
        />
        <br></br>
        <PasswordChangeForm
          className={`  ${
            theme === 'light'
              ? 'light-theme'
              : theme === 'dark'
              ? 'dark-theme'
              : theme === 'snes'
              ? 'snes-theme'
              : theme === 'our'
              ? 'our-theme'
              : theme === 'terminal'
              ? 'terminal-theme'
              : theme === 'dmg'
              ? 'dmg-theme'
              : theme === 'nautilus'
              ? 'nautilus-theme'
              : theme === 'copper'
              ? 'copper-theme'
              : 'beach-theme'
          }`}
          onSubmit={onSubmitPassword}
          error={errorpassword}
          loading={loadingpassword}
          formMethods={fromMethodsPassword}
        />

        <br></br>
        <div className={`flex w-1/2 `} style={{ margin: 'auto' }}>
          <h1 style={{ paddingLeft: '0px' }}>THEMES</h1>
        </div>
        <div
          className={`flex flex-col space-y-20 rounded bg-text_box`}
          style={{
            margin: 'auto',
            height: '210px',
            width: '500px',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          <div
            className={`flex  flex-row space-x-10`}
            style={{ margin: 'auto' }}
          >
            <div className="button-container">
              <button
                onClick={() => handleSetTheme('light')}
                className={`theme-button light-theme rounded-md px-4 py-2  ${
                  theme === 'light' ? 'button-outline' : ''
                }`}
                style={{
                  backgroundColor: '#0369a1',
                  color: 'white',
                  width: '106px',
                }}
              >
                Rosetta
              </button>
            </div>
            <button
              onClick={() => handleSetTheme('dark')}
              className={`theme-button dark-theme rounded-md px-4 py-2  ${
                theme === 'dark' ? 'button-outline' : ''
              }`}
              style={{
                backgroundColor: '#121212',
                color: 'white',
                width: '106px',
              }}
            >
              Spade
            </button>
            <button
              onClick={() => handleSetTheme('snes')}
              className={`theme-button snes-theme rounded-md px-4 py-2 ${
                theme === 'snes' ? 'button-outline' : ''
              }`}
              style={{
                backgroundColor: '#553d94',
                color: '#bfbec2',
                width: '106px',
              }}
            >
              Snes
            </button>
          </div>

          <div
            className={`flex  flex-row space-x-10`}
            style={{ margin: 'auto' }}
          >
            <div className="button-container">
              <button
                onClick={() => handleSetTheme('our')}
                className={`theme-button our-theme rounded-md px-4 py-2 ${
                  theme === 'our' ? 'button-outline' : ''
                }`}
                style={{
                  backgroundColor: '#ce1226',
                  color: 'yellow',
                  width: '106px',
                }}
              >
                Ours
              </button>
            </div>
            <div className="button-container">
              <button
                onClick={() => handleSetTheme('copper')}
                className={`theme-button copper-theme rounded-md px-4 py-2 ${
                  theme === 'copper' ? 'button-outline' : ''
                }`}
                style={{
                  backgroundColor: '#442f29',
                  color: '#b46a55',
                  width: '106px',
                }}
              >
                Copper
              </button>
            </div>
            <div className="button-container">
              <button
                onClick={() => handleSetTheme('dmg')}
                className={`theme-button dmg-theme rounded-md px-4  py-2 shadow ${
                  theme === 'dmg' ? 'button-outline' : ''
                }`}
                style={{
                  backgroundColor: '#dadbdc',
                  color: '#ae185e',
                  width: '106px',
                }}
              >
                Dmg
              </button>
            </div>
          </div>

          <div
            className={`flex  flex-row space-x-10`}
            style={{ margin: 'auto' }}
          >
            <div className="button-container">
              <button
                onClick={() => handleSetTheme('nautilus')}
                className={`theme-button nautilus-theme rounded-md px-4 py-2 ${
                  theme === 'nautilus' ? 'button-outline' : ''
                }`}
                style={{
                  backgroundColor: '#132237',
                  color: '#ebb723',
                  width: '106px',
                }}
              >
                Nautilus
              </button>
            </div>
            <div className="button-container">
              <button
                onClick={() => handleSetTheme('terminal')}
                className={`theme-button terminal-theme rounded-md px-4 py-2 ${
                  theme === 'terminal' ? 'button-outline' : ''
                }`}
                style={{
                  backgroundColor: '#191a1b',
                  color: '#79a617',
                  width: '106px',
                }}
              >
                Terminal
              </button>
            </div>
            <div className="button-container">
              <button
                onClick={() => handleSetTheme('beach')}
                className={`theme-button beach-theme rounded-md px-4  py-2 shadow ${
                  theme === 'beach' ? 'button-outline' : ''
                }`}
                style={{
                  backgroundColor: '#ffeead',
                  color: '#96ceb4',
                  width: '106px',
                }}
              >
                Beach
              </button>
            </div>
          </div>
        </div>

        <br></br>
        <button
          onClick={onClickDelete}
          className="bg-button mt-5 w-1/4  justify-center rounded"
          style={{ margin: 'auto', display: 'block' }}
          aria-label="Delete"
        >
          DELETE ACCOUNT
        </button>
        <br></br>
        <br></br>
      </div>
    </>
  )
}

export default UserEditingPage
