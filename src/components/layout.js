import React from "react"

const Layout = ({ location, title, children }) => {
  return (
    <div className="global-wrapper">
      <main>{children}</main>
      <footer>
        <div className="footer-content">
          © {new Date().getFullYear()} {title}
        </div>
      </footer>
    </div>
  )
}

export default Layout
