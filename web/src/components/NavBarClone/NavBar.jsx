const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <div className="dropdown">
          <button className="dropbtn">
            {' '}
            <span id="usernamePlaceholder">Username</span>
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <a href="code-translator">Translate</a>
            <a href="feedback">Feedback</a>
            <a href="help">Help</a>
            <a href="translation-history">History</a>
            <a href="/" id="logoutBtn">
              Log Out
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar
