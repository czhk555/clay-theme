import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const image = getImage(post.frontmatter.thumbnail)

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || ''}
        image={post.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData.images.fallback.src}
      />
      <article className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}>
        <header className="post-content-header">
          <h1 className="post-content-title">{post.frontmatter.title}</h1>
        </header>

        {post.frontmatter.description && (
          <p className="post-content-excerpt">{post.frontmatter.description}</p>
        )}

        {image && (
          <div className="post-content-image">
            <GatsbyImage
              image={image}
              className="kg-image"
              alt={post.frontmatter.title}
            />
          </div>
        )}

        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPost($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              width: 1360
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`
