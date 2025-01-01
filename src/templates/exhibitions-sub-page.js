import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import LeftIcon from '../img/left-icon.svg'
import RightIcon from '../img/right-icon.svg'
import Layout from "../components/layout"
import Seo from "../components/seo"

const ExhibitionsSubPageTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const image = getImage(post.frontmatter.thumbnail)

  const nextSlug = pageContext.next ? pageContext.next.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' :
    `/${pageContext.next.fields.slug.split('/').slice(2, -1).join('/')}` : '/'
  const previousSlug = pageContext.previous ? pageContext.previous.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' :
    `/${pageContext.previous.fields.slug.split('/').slice(2, -1).join('/')}` : "/"
  const nextLinkStatus = pageContext.next ? pageContext.next.frontmatter.templateKey === 'exhibitions-sub-page' ? true : false : false
  const previousLinkStatus = pageContext.previous ? pageContext.previous.frontmatter.templateKey === 'exhibitions-sub-page' ? true : false : false

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || ''}
        image={post.frontmatter.thumbnail.childImageSharp.gatsbyImageData.images.fallback.src}
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

        <div className="post-link">
          <div>
            <a style={{ display: nextLinkStatus ? "flex" : 'none', alignItems: "center", color: "#131313", fontSize: "2rem" }} href={nextSlug}>
              <img src={LeftIcon} alt="" width={30} height={30} />
              <span>{pageContext.next ? pageContext.next.frontmatter.title : ""}</span>
            </a>
          </div>
          <div>
            <a style={{ display: previousLinkStatus ? "flex" : 'none', alignItems: "center", color: "#131313", fontSize: "2rem" }} href={previousSlug}>
              <span>{pageContext.previous ? pageContext.previous.frontmatter.title : ""}</span>
              <img src={RightIcon} alt="" width={30} height={30} />
            </a>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default ExhibitionsSubPageTemplate

export const pageQuery = graphql`
  query ExhibitionsSubPage($id: String!) {
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
