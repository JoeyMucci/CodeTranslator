import React from "react";

const Button = ({ children, extraClasses }) => (
 <div className={`grow px-11 pt-3 pb-3 rounded-xl ${extraClasses}`}>
    {children}
 </div>
);

function LoginSignupForm() {
 return (
    <form className="flex flex-col px-20 py-12 bg-gray-100 rounded-xl max-md:px-5 max-md:max-w-full">
      <label htmlFor="emailInput" className="mt-2">Email:</label>
      <input
        id="emailInput"
        type="email"
        className="justify-center py-3 mt-4 rounded-xl bg-gray-200 text-gray-800"
        placeholder="Example.email@njit.edu"
        aria-label="Enter your email"
      />
      <label htmlFor="passwordInput" className="mt-6 max-md:mt-2">Password:</label>
      <input
        id="passwordInput"
        type="password"
        className="justify-center items-start py-3 pr-16 pl-3 mt-2 max-w-full rounded-xl bg-gray-200 text-gray-800 w-full md:w-[381px]"
        placeholder="SuperSecretPassword11!"
        aria-label="Enter your password"
      />
      <button
        type="submit"
        className="justify-center items-center px-16 py-2.5 mt-16 mb-6 max-w-full text-white rounded-2xl border border-black border-solid shadow-sm bg-blue-500 w-full md:w-[381px]"
      >
        Continue
      </button>
    </form>
 );
}

function HowItWorksSection() {
 return (
    <section className="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow items-center px-12 py-12 w-full text-2xl text-black bg-gray-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h2 className="whitespace-nowrap">How It Works:</h2>
        <p className="mt-8 text-lg">
          Input your code into the text box <br /> <br />
          Select your text’s language and the desired language <br /> <br />
          Hit the translate button and a translated version of your code will be typed out in the text box next to it!
        </p>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/24b57b1360ccfc6176783ff107656d6f1d97d1f57222b6edd4e7beeacc94f1ef?apiKey=87f9f1533ce74b8abe2dfb3aa0215cd2&"
          alt="Translation process illustration"
          className="mt-8 max-w-full aspect-[1.39] w-full md:w-[346px]"
        />
        <p className="self-stretch mt-12 text-center max-md:mt-10 max-md:max-w-full">
          Log in or Sign up to give it a try!
        </p>
      </div>
    </section>
 );
}

function LoginPage() {
 return (
    <main className="flex flex-col justify-center bg-blue-500" style={{ minHeight: '100vh' }}>
      <header className="pl-20 w-full bg-gray-800 max-md:pl-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <section className="flex flex-col w-full max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-14 text-lg text-white whitespace-nowrap max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-3 self-center px-5 py-2.5 text-2xl text-white border-white border-solid border-[3px]">
                <img
                 loading="lazy"
                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb7eb7143d98e414c936ef8ce29fdb58e163b2013b87092dbfb46e6261e1b373?apiKey=87f9f1533ce74b8abe2dfb3aa0215cd2&"
                 alt="Company logo"
                 className="w-9 aspect-[0.72]"
                />
                <div className="flex flex-col flex-1 my-auto">
                 <span>Rosetta</span>
                 <span className="mt-1.5">Code</span>
                </div>
              </div>
              <div className="flex z-10 gap-0 self-start mt-14 max-md:mt-10">
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
 );
}

export default LoginPage;
