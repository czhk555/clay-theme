import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PostCard = ({ count, node, postClass }) => {
  const image = getImage(node.frontmatter.thumbnail)

  return (
    <article
      className={`post-card ${postClass} ${count % 3 === 0 && `post-card-large`
        }`}
    >
      <Link to={node.fields.slug} className="post-card-link">
        <div className="post-card-content">
          <GatsbyImage
            image={image}
            alt={node.frontmatter.title}
            className="post-card-image"
            loading="lazy"
          />
          <div className="post-card-details">
            <header className="post-card-header">
              <h2 className="post-card-title">{node.frontmatter.title}</h2>
            </header>
            <section className="post-card-excerpt">
              <p>{node.frontmatter.description}</p>
            </section>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default PostCard
