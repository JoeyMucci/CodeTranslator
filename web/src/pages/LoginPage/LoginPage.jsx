import React from 'react'
import LoginPage from './LoginPage'

const Button = ({ children, extraClasses }) => (
  <div className={`grow rounded-xl px-11 pb-3 pt-3 ${extraClasses}`}>
    {children}
  </div>
)

function LoginSignupForm() {
  return (
    <form className="flex flex-col rounded-xl bg-gray-100 px-20 py-12 max-md:max-w-full max-md:px-5">
      <label htmlFor="emailInput" className="mt-2 text-black">
        Email:
      </label>
      <input
        id="emailInput"
        type="email"
        className="mt-4 justify-center rounded-xl bg-gray-200 py-3 text-gray-800"
        placeholder="Example.email@njit.edu"
        aria-label="Enter your email"
      />
      <label htmlFor="passwordInput" className="mt-6 text-black max-md:mt-2">
        Password:
      </label>
      <input
        id="passwordInput"
        type="password"
        className="mt-2 w-full max-w-full items-start justify-center rounded-xl bg-gray-200 py-3 pl-3 pr-16 text-gray-800 md:w-[381px]"
        placeholder="SuperSecretPassword11!"
        aria-label="Enter your password"
      />
      <button
        type="submit"
        className="mb-6 mt-16 w-full max-w-full items-center justify-center rounded-2xl border border-solid border-black bg-blue-500 px-16 py-2.5 text-white shadow-sm md:w-[381px]"
      >
        Continue
      </button>
    </form>
  )
}

function HowItWorksSection() {
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

function LoginPage() {
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
                  loading="lazy"
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
                <Button extraClasses="bg-gray-400">Login</Button>
                <Button extraClasses="bg-gray-600">Sign Up</Button>
              </div>
              <LoginSignupForm />
            </div>
          </section>
          <HowItWorksSection />
        </div>
      </header>
    </main>
  )
}

export default LoginPage
