const ReleaseNotesPage = () => {
  let theme = localStorage.getItem('theme')
  return (
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
      style={{ minHeight: '100vh' }}
    >
      <div className={`flex w-1/2 flex-col`} style={{ margin: 'auto' }}>
        <h1>Release Notes</h1>

        <h2>
          <strong>Overview:</strong>
        </h2>
        <ul>
          <li>
            Implemented a web application using RedwoodJS, JavaScriptReact,
            Tailwind CSS, NodeJS, and GraphQL.
          </li>
          <li>
            Developed a feature that translates code from one language to
            another using GPT-3.
          </li>
        </ul>

        <h2>
          <strong>Features:</strong>
        </h2>
        <ul>
          <li>Login: Users can securely log in to their accounts.</li>
          <li>
            Translation History: Users can view a history of their translated
            code.
          </li>
          <li>
            Feedback: Users can provide feedback on the translation results.
          </li>
          <li>
            User Profile Editing: Choose a custom name to be displayed, pick one
            of nine color themes, or delete your account :(
          </li>
          <li>
            Translation: The main attraction. Translate code between any of our
            ten supported programming languages.
          </li>
          <li>
            Help: Added a help page for users to get assistance with using the
            application. Check out video tutorials there!
          </li>
          <li>
            Forgot Password Functionality: Implemented a feature for users to
            reset their password if forgotten.
          </li>
          <li>
            Two-Factor Authentication: Added an extra layer of security with
            emailed OTP (one-time password).
          </li>
          <li>
            Release Notes: A short report summarizing all the features and
            improvements of our first release. YOU ARE HERE.
          </li>
        </ul>

        <h2>
          <strong>Bug Fixes and Improvements:</strong>
        </h2>
        <ul>
          <li>
            Revamped user profile editing. It is now possible to change name
            without retyping email and vice versa.
          </li>
          <li>Renamed fields on feedback page to be more clear.</li>
          <li>
            Added aggregated ratings which can be viewed on the translate page
            (stars) and the feedback page (long response)
          </li>
          {/* <li>
            Integrated Tailwind CSS for a modern and responsive user interface.
          </li>
          <li>
            Utilized GraphQL for efficient data fetching and manipulation.
          </li>
          <li>
            Enhanced the user experience with RedwoodJS&apos;s powerful routing
            and component management.
          </li>
          <li>
            Improved code readability and maintainability through modular
            component design.
          </li> */}
          <li>Ensured application security and performance best practices.</li>
          <li>
            Optimized the speed of the application for faster loading times.
          </li>
          <li>
            Conducted thorough testing and debugging to deliver a stable and
            reliable application.
          </li>
          <li>
            Collaborated to make a user-friendly and visually appealing user
            interface.
          </li>
        </ul>
      </div>
    </div>
  )
}
export default ReleaseNotesPage
