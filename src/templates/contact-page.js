import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social

  return (
    <Layout location={location} title={siteTitle} social={social}>
      <SEO title="Contact" />
      <article className="contact-page">
        <div className="contact-form">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            action="/contact/thanks/"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="5" required />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social{
          twitter
          facebook
        }
      }
    }
    markdownRemark(frontmatter: {templateKey: {eq: "contact-page"}}) {
      frontmatter {
        title
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
                    }
        }
      }
      
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <ContactPage location={props.location} data={data} {...props} />
    )}
  />
)
