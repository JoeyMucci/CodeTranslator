// web/src/layouts/AuthLayout/AuthLayout.js

import { navigate } from '@redwoodjs/router'

const AuthLayout = () => {
  const authToken = localStorage.getItem('authToken')
  if (location.pathname === '/reset-password') {
    return null
  }
  if (!authToken) {
    navigate('/')
  }
}

export default AuthLayout
