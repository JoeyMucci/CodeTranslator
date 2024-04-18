import React, { useState } from 'react'

import { Form, Label, TextField, Submit } from '@redwoodjs/forms'
import { navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

const Button = ({ children, extraClasses, onClick }) => (
  <div
    className={`grow rounded-xl px-11 pb-3 pt-3 ${extraClasses}`}
    onClick={onClick}
  >
    {children}
  </div>
)

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      email
      password
    }
  }
`

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUserMute(email: $email, password: $password) {
      token
      user {
        name
        email
        password
      }
      error
    }
  }
`

const ForgotPasswordButton = () => {
  const handleForgotPasswordClick = () => {
    navigate('/forgot-password') // Redirect to the password reset page
  }

  return (
    <button
      className="rounded-xl bg-gray-600 px-6 py-3 text-white"
      onClick={handleForgotPasswordClick}
    >
      Forgot Password
    </button>
  )
}

const HowItWorksSection = () => {
  return (
    <section className="ml-5 flex w-full  max-md:ml-0 max-md:w-full">
      <div className="flex w-full grow flex-col items-center bg-gray-100 px-12 py-12 text-2xl text-black max-md:mt-10 max-md:max-w-full max-md:px-5">
        <h2 className="whitespace-nowrap">How It Works:</h2>
        <p className="mt-8 text-lg">
          Input your code into the text box <br /> <br />
          Select your text’s language and the desired language <br /> <br />
          Hit the translate button and a translated version of your code will be
          typed out in the text box next to it!
        </p>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/24b57b1360ccfc6176783ff107656d6f1d97d1f57222b6edd4e7beeacc94f1ef?apiKey=87f9f1533ce74b8abe2dfb3aa0215cd2&"
          alt="Translation process illustration"
          className="mt-8 aspect-[1.39] w-full max-w-full md:w-[346px]"
        />
        <p className="mt-12 self-stretch text-center max-md:mt-10 max-md:max-w-full">
          Log in or Sign up to give it a try!
        </p>
      </div>
    </section>
  )
}

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser] = useMutation(LOGIN_USER)
  const [wrongPasswordError, setWrongPasswordError] = useState(false)
  const [wrongEmailError, setWrongEmailError] = useState(false)

  //const logIn = useAuth()

  const handleSubmit = async () => {
    try {
      const response = await loginUser({ variables: { email, password } })
      if (response.data.loginUserMute.user == null) {
        if (response.data.loginUserMute.error == 'Invalid password')
          setWrongPasswordError('Invalid password')
        else if (response.data.loginUserMute.error == 'User not found')
          setWrongEmailError('User not found')
      } else {
        localStorage.setItem('userName', response.data.loginUserMute.user.name)
        localStorage.setItem(
          'userEmail',
          response.data.loginUserMute.user.email
        )
        localStorage.setItem('authToken', response.data.loginUserMute.token)
        navigate('/code-translator')
        location.reload()
      }
    } catch (error) {
      // if (error.message.includes('500'))
      //   toast.error('Cannot authenticate with our API, please wait')
      // else toast.error('Login Failed')
      // setWrongPasswordError(error.message)
      // if (
      //   error.graphQLErrors &&
      //   error.graphQLErrors[0] &&
      //   error.graphQLErrors[0].extensions.originalError.message.includes(
      //     'Invalid password'
      //   )
      // )
      //   setWrongPasswordError(error.message)
      // else if (
      //   error.graphQLErrors &&
      //   error.graphQLErrors[0] &&
      //   error.graphQLErrors[0].extensions.originalError.message.includes(
      //     'User not found'
      //   )
      // )
      //   setWrongEmailError(error.message)
      // else
      if (error.message.includes('500'))
        toast.error('Cannot authenticate with our API, please wait')
      else toast.error('Login Failed')
    }
  }

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  return (
    <Form
      className={` flex flex-col rounded-xl bg-gray-100 px-20 py-12 max-md:max-w-full max-md:px-5 `}
      onSubmit={handleSubmit}
    >
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
        onChange={(e) => {
          setEmail(e.target.value)
          setWrongEmailError(false)
        }}
      />
      {wrongEmailError && (
        <p className="mt-2 text-sm text-red-500">Email is incorrect</p>
      )}
      <Label htmlFor="passwordInput" className="mt-6 text-black max-md:mt-2">
        Password:
      </Label>
      <input
        id="passwordInput"
        type="password"
        className="mt-2 w-full max-w-full items-start justify-center rounded-xl bg-gray-200 py-3 pl-3 pr-16 text-gray-800 md:w-[381px]"
        placeholder="SuperSecretPassword11!"
        aria-label="Enter your password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setWrongPasswordError(false)
        }}
      />

      {wrongPasswordError && (
        <p className="mt-2 text-sm text-red-500">Password is incorrect</p>
      )}
      <Submit
        data-testid="login"
        className="mb-6 mt-16 w-full max-w-full items-center justify-center rounded-2xl border border-solid border-black bg-blue-500 px-16 py-2.5 text-white shadow-sm md:w-[381px]"
      >
        Login
      </Submit>
    </Form>
  )
}

const RegisterForm = () => {
  const [createUser] = useMutation(CREATE_USER)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState(false)
  const [weakPasswordError, setWeakPasswordError] = useState(false)
  const [emailExistsError, setEmailExistsError] = useState(false)

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setPasswordMatchError(true)
      return
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/
    if (!passwordRegex.test(password)) {
      setWeakPasswordError(true)
      return
    }

    try {
      const response = await createUser({
        variables: { input: { email, password } },
      })
      toast.success('Register Successful')
      console.log('User registered:', response.data.createUser)
    } catch (error) {
      if (
        error.message.includes('ApolloError') ||
        error.message.includes('S')
      ) {
        setEmailExistsError(true)
      } else {
        console.error('Failed to register user:', error)
      }
    }
  }

  return (
    <Form
      className="flex flex-col rounded-xl bg-gray-100 px-20 py-12 max-md:max-w-full max-md:px-5"
      onSubmit={handleSubmit}
    >
      <Label name="email" htmlFor="emailInput" className="mt-2 text-black">
        Email:
      </Label>
      <TextField
        id="emailInput"
        type="email"
        name="email"
        className="mt-2 w-full max-w-full items-start justify-center rounded-xl bg-gray-200 py-3 pl-3 pr-16 text-gray-800 md:w-[381px]"
        placeholder="Example.email@njit.edu"
        aria-label="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setEmailExistsError(false)
        }}
      />
      {emailExistsError && (
        <p className="mt-2 text-sm text-red-500">
          Email is already registered.
        </p>
      )}
      <Label
        name="password"
        htmlFor="passwordInput"
        className="mt-6 text-black max-md:mt-2"
      >
        Password:
      </Label>
      <TextField
        id="passwordInput"
        type="password"
        name="password"
        className="mt-2 w-full max-w-full items-start justify-center rounded-xl bg-gray-200 py-3 pl-3 pr-16 text-gray-800 md:w-[381px]"
        placeholder="SuperSecretPassword11!"
        aria-label="Enter your password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setPasswordMatchError(false)
          setWeakPasswordError(false)
        }}
      />
      {weakPasswordError && (
        <p className="mt-2 text-sm text-red-500">
          Password must be 8 characters long and have at least 1 number
        </p>
      )}
      <Label
        name="confirmpassword"
        htmlFor="confirmPasswordInput"
        className="mt-6 text-black max-md:mt-2"
      >
        Confirm Password:
      </Label>
      <TextField
        id="confirmPasswordInput"
        type="password"
        name="confirmpassword"
        className={`mt-2 w-full max-w-full items-start justify-center rounded-xl bg-gray-200 py-3 pl-3 pr-16 text-gray-800 md:w-[381px] ${
          passwordMatchError ? 'border-red-500' : ''
        }`}
        placeholder="Confirm Password"
        aria-label="Confirm your password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value)
          setPasswordMatchError(false)
        }}
      />
      {passwordMatchError && (
        <p className="mt-2 text-sm text-red-500">Passwords do not match.</p>
      )}
      <Submit className="mb-6 mt-16 w-full max-w-full items-center justify-center rounded-2xl border border-solid border-black bg-blue-500 px-16 py-2.5 text-white shadow-sm md:w-[381px]">
        Submit
      </Submit>
    </Form>
  )
}
const HomeForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(true)

  const handleSignupButtonClick = () => {
    setShowLoginForm(false)
  }

  const handleLoginButtonClick = () => {
    setShowLoginForm(true)
  }
  return (
    <main
      className="flex flex-col justify-center bg-primary"
      style={{ minHeight: '100vh' }}
    >
      <header className="bg-gray-primary w-full pl-20 max-md:max-w-full max-md:pl-5">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <section className="flex w-full flex-col max-md:ml-0 max-md:w-full">
            <div className="mt-14 flex flex-col whitespace-nowrap text-lg text-white max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-3 self-center border-[3px] border-solid border-white px-5 py-2.5 text-2xl text-white">
                <Toaster />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb7eb7143d98e414c936ef8ce29fdb58e163b2013b87092dbfb46e6261e1b373?apiKey=87f9f1533ce74b8abe2dfb3aa0215cd2&"
                  alt="Company logo"
                  className="aspect-[0.72] w-9"
                />
                <div className="my-auto flex flex-1 flex-col">
                  <span>Rosetta</span>
                  <span className="mt-1.5">Code</span>
                </div>
              </div>
              <div className="z-10 mt-14 flex gap-0 self-start max-md:mt-10">
                <Button
                  extraClasses={`bg-gray-600 ${
                    showLoginForm ? 'opacity-50' : ''
                  }`}
                  onClick={handleLoginButtonClick}
                >
                  Login
                </Button>
                <Button
                  extraClasses={`bg-gray-600 ${
                    showLoginForm ? '' : 'opacity-50'
                  }`}
                  onClick={handleSignupButtonClick}
                >
                  Sign Up
                </Button>
              </div>
              {showLoginForm ? <LoginForm /> : <RegisterForm />}
            </div>
            <ForgotPasswordButton />
          </section>
          <HowItWorksSection />
        </div>
      </header>
    </main>
  )
}

export default HomeForm
