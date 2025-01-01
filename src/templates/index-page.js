import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/postCard"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  let postCounter = 0

  return (
    <Layout>
      <Seo title="Home" />
      <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "work-sub-page" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            description
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  width: 1360
                  formats: [AUTO, WEBP, AVIF]
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  transformOptions: {
                    fit: COVER
                    cropFocus: ATTENTION
                  }
                  quality: 75
                )
              }
            }
          }
        }
      }
    }
  }
`