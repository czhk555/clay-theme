import React, { useState } from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const Layout = ({ title, social, children, postClass }) => {
  const location = useLocation();
  const [toggleNav, setToggleNav] = useState(false);

  const isCurrentPage = (path) => location.pathname.includes(path);

  return (
    <div className={`site-wrapper ${toggleNav ? "site-head-open" : ""}`}>
      <header className="site-head">
        <div className="site-head-container">
          <a
            className="nav-burger"
            href="#"
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div className="hamburger">
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          <nav className="site-head-left">
            <ul className="nav">
              {["/", "/bio", "/work", "/news", "/contact", "/elements"].map((path) => (
                <li
                  key={path}
                  className={`nav-home ${isCurrentPage(path) ? "nav-current" : ""}`}
                >
                  <Link to={path}>{path.charAt(1).toUpperCase() + path.slice(2)}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-head-center">
            <Link className="site-head-logo" to="/">
              {title}
            </Link>
          </div>
          <div className="site-head-right">
            <div className="social-links">
              {["facebook", "twitter", "github"].map((platform) => (
                <Link
                  key={platform}
                  to={`https://${platform}.com/${social[platform]}`}
                  title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} <Link to="/">{title}</Link> — Built by
        <a href="https://travislord.xyz/" target="_blank" rel="noopener noreferrer">
          Travis Lord
        </a>
      </footer>
    </div>
  );
};

export default Layout;
