import React, { Suspense } from 'react'
// import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useLocation } from '@reach/router'

// eslint-disable-next-line
const PostCard = React.lazy(() => import('../components/postCard'))

const IndexPage = ({ data }) => {
  const location = useLocation()
  const canonical = `${data.site.siteMetadata.siteUrl}${location.pathname}`
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  const posts = data.allMarkdownRemark.edges
  let postCounter = 0
  const image = getImage(data.markdownRemark.frontmatter.thumbnail)

  return (
    <Layout title={siteTitle} social={social}>
      <Seo
        keywords={[`Gatsby Theme`, `Free Gatsby Template`, `Clay Gatsby Theme`]}
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description || ''}
        image={data.markdownRemark.frontmatter.thumbnail.childImageSharp.fluid.src}
        pathname={location.pathname}
        canonical={canonical}
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: data.markdownRemark.frontmatter.title,
          description: data.markdownRemark.frontmatter.description
        }}
      />
      <GatsbyImage
        image={image}
        alt={data.markdownRemark.frontmatter.title}
        loading="lazy"
      />
      <div className="post-feed">
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </div>
    </Layout>
  )
}
export default IndexPage
export const IndexPageQuery = graphql`
  query IndexPage {
    site {
        siteMetadata {
          title
          social{
            twitter
            facebook
          }    
        }
      }
      markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
        frontmatter {
          title
          description
          thumbnail {
            childImageSharp {
              gatsbyImageData(
                width: 1360
                formats: [AUTO, WEBP, AVIF]
                placeholder: BLURRED
                loading: LAZY
              )
            }
          }
        }
        
      }
      allMarkdownRemark(
        filter: {frontmatter: {pagetype: {eq: "main"}}}
        limit: 30
        sort: {frontmatter: {number: ASC}}
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD,YYYY")
              title
              description
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 1360) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
  }
`;