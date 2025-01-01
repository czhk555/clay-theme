import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          social {
            twitter
            facebook
            github
          }
        }
      }
    }
  `)

  const { social = {} } = data.site.siteMetadata

  return (
    <div className="site-wrapper">
      <header className="site-head">
        <div className="site-head-container">
          <Link className="site-head-logo" to={`/`}>
            Clay
          </Link>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} <Link to={`/`}>Clay</Link>
      </footer>
    </div>
  );
};

export default Layout;
