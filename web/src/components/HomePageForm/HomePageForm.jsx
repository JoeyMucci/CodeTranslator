import React, { useState } from 'react'

import { Form, Label, Submit } from '@redwoodjs/forms'

const Button = ({ children, extraClasses, onClick }) => (
  <div
    className={`grow rounded-xl px-11 pb-3 pt-3 ${extraClasses}`}
    onClick={onClick}
  >
    {children}
  </div>
)

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

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <Form
      className="flex flex-col rounded-xl bg-gray-100 px-20 py-12 max-md:max-w-full max-md:px-5"
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
        onChange={(e) => setEmail(e.target.value)}
      />
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
        onChange={(e) => setPassword(e.target.value)}
      />
      <Submit className="mb-6 mt-16 w-full max-w-full items-center justify-center rounded-2xl border border-solid border-black bg-blue-500 px-16 py-2.5 text-white shadow-sm md:w-[381px]">
        Login
      </Submit>
    </Form>
  )
}

const RegisterForm = ({ onSubmit, error, loading, formMethods }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatchError] = useState(false)

  return (
    <Form
      className="flex flex-col rounded-xl bg-gray-100 px-20 py-12 max-md:max-w-full max-md:px-5"
      onSubmit={onSubmit}
      error={error}
      formMethods={formMethods}
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
        onChange={(e) => setEmail(e.target.value)}
      />
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
        onChange={(e) => setPassword(e.target.value)}
      />
      <Label
        htmlFor="confirmPasswordInput"
        className="mt-6 text-black max-md:mt-2"
      >
        Confirm Password:
      </Label>
      <input
        id="confirmPasswordInput"
        type="password"
        className={`mt-2 w-full max-w-full items-start justify-center rounded-xl bg-gray-200 py-3 pl-3 pr-16 text-gray-800 md:w-[381px] ${
          passwordMatchError ? 'border-red-500' : ''
        }`}
        placeholder="Confirm Password"
        aria-label="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {passwordMatchError && (
        <p className="mt-2 text-sm text-red-500">Passwords do not match.</p>
      )}
      <Submit className="submitbox" disabled={loading}>
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
          </section>
          <HowItWorksSection />
        </div>
      </header>
    </main>
  )
}

export default HomeForm
export { LoginForm, RegisterForm }
