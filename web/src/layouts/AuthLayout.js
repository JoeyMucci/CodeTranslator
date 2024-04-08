// web/src/layouts/AuthLayout/AuthLayout.js

import { useEffect } from 'react'

import { navigate } from '@redwoodjs/router'

const AuthLayout = () => {
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      //navigate('/')
    }
  }, [])
}

export default AuthLayout
