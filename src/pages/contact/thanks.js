import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Thanks = () => (
  <Layout>
    <SEO title="Thanks for your message" />
    <div className="thanks-page">
      <h1>Thank you!</h1>
      <p>Your message has been sent successfully.</p>
      <Link to="/">Return to homepage</Link>
    </div>
  </Layout>
)

export default Thanks
