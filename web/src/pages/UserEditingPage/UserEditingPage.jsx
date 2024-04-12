// web/src/pages/UserEditingPage/UserEditingPage.jsx
//import React from 'react'

import UserEditingForm from 'web/src/components/UserEditingForm/UserEditingForm.jsx'
import React, {useState, useEffect} from 'react';
import { useForm } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import styles from 'web/src/index.css';

// import { useAuth } from 'src/auth' // Assuming you have an auth hook similar to HomePage.jsx

export const UPDATE_USER = gql`
  mutation UpdateUserMutation($email: String!, $input: UpdateUserInput!) {
    updateUserByEmail(email: $email, input: $input) {
      email
    }
  }
`

let message = ''
if (localStorage.getItem('userName') == 'null')
  message = 'You do not have a preferred name yet'
else
  message = (
    <>
      Your current email is <strong>{localStorage.getItem('userEmail')}</strong>
    </>
  )
const UserEditingPage = () => {
  // const { currentUser } = useAuth() // Use the auth hook to get the current user
  const formMethods = useForm()

   /***THEMEING* */
   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

   useEffect(() => {
       document.documentElement.className = theme;
       localStorage.setItem('theme', theme);
   }, [theme]);


   const handleSetTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
};
 /**** */

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

  return (
    <>
    <div className={`${theme === 'light' ? 'light-theme' : theme === 'dark' ? 'dark-theme' : 'snes-theme'}`} >
      <MetaTags title="Edit Profile" description="Edit your profile" />
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div
        className={`flex w-1/2 flex-col`}
        style={{ margin: 'auto' }}
      >
        <h1 style={{ paddingLeft: '0px' }}>
          Update your info
        </h1>
      </div>

      <h3 className="smalltext" style={{ textAlign: 'center' }}>
        {message}
      </h3>

      <Toaster />
      <UserEditingForm className={` ${theme === 'light' ? 'light-theme' : theme === 'dark' ? 'dark-theme' : 'snes-theme'}`}
        onSubmit={onSubmit}
        error={error}
        loading={loading}
        formMethods={formMethods}
      />

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div
        className={`flex w-1/2 `}
        style={{ margin: 'auto' }}
      >
        <h1 style={{ paddingLeft: '0px' }}>
        THEMES
        </h1>
      </div>
        <div className={`flex space-y-20 flex-col bg-text_box rounded`}
          style={{ margin: 'auto' , height: '510px' ,width: '640px' }}>
          <div className={`flex  flex-row space-x-20`}
               style={{ margin: 'auto' }}>
            <button
                onClick={() => handleSetTheme('light')}
                className="px-4 py-2  rounded-md  light-theme"
                style = {{backgroundColor: '#0369a1', color: 'white', width: '106px'}}
            >
                Rosetta
            </button>
            <button
                onClick={() => handleSetTheme('dark')}
                className="px-4 py-2 bg-gray-800 text-white rounded-md shadow"
                style = {{backgroundColor: '#b7976a', color: 'white', width: '106px'}}
            >
                Spade
            </button>
            <button
                onClick={() => handleSetTheme('snes')}
                className="px-4 py-2  rounded-md shadow"
                style = {{ backgroundColor: '#553d94', color: '#bfbec2', width: '106px'}}
            >
              Snes
            </button>

          </div>



        </div>

        </div>
    </>
  )
}

export default UserEditingPage
