import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/postCard";

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const social = data.site.siteMetadata.social;
  const posts = data.allMarkdownRemark.edges;
  let postCounter = 0;

  return (
    <Layout location={location} title={siteTitle} social={social}>
      <SEO title="All posts" />
      <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++;
          return (
            <PostCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass="post"
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const IndexPageQuery = graphql`
  query IndexPage {
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
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
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
    allMarkdownRemark(
      filter: { frontmatter: { pagetype: { eq: "main" } } }
      limit: 30
      sort: { frontmatter: { number: ASC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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
