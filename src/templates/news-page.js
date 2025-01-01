import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/postCard"

const WorkPage = ({ data }) => {
  const post = data.markdownRemark
  const image = getImage(post.frontmatter.thumbnail)

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || ''}
        image={post.frontmatter.thumbnail.childImageSharp.gatsbyImageData.images.fallback.src}
      />

      <article className="post-content">
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
              alt={post.frontmatter.title}
              loading="lazy"
            />
          </div>
        )}
      </article>
    </Layout>
  )
}

export default WorkPage

export const WorkPageQuery = graphql`
  query NewsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
`;