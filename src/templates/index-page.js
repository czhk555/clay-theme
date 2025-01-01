import React, { Suspense, lazy } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

// 使用 React.lazy 来懒加载 PostCard 组件
const PostCard = lazy(() => import("../components/postCard"));

const IndexPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const social = data.site.siteMetadata.social;
  const posts = data.allMarkdownRemark.edges;
  let postCounter = 0;

  return (
    <Layout title={siteTitle} social={social}>
      <Seo
        keywords={["Gatsby Theme", "Free Gatsby Template", "Clay Gatsby Theme"]}
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description || ""}
        image={data.markdownRemark.frontmatter.thumbnail.childImageSharp.fluid.src}
      />
      <div className="post-feed">
        {/* 使用 Suspense 组件包裹懒加载的 PostCard 组件 */}
        <Suspense fallback={<div>Loading posts...</div>}>
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
        </Suspense>
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
      sort: { fields: [frontmatter___number], order: ASC }
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
