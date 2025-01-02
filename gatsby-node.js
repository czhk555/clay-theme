const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// 创建自定义 schema
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
      fields: Fields!
    }
    type Frontmatter {
      title: String!
      date: Date @dateformat
      templateKey: String
      pagetype: String
      number: Int
    }
    type Fields {
      slug: String!
    }
  `
  createTypes(typeDefs)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        allMarkdownRemark(
          limit: 1000, 
          sort: {fields: ["frontmatter___date"], order: DESC}
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
                title
                date(formatString: "DD:MM:YYYY hh:mm")
              }
            }
          }
        }
      }
    `
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
