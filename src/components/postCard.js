import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const PostCard = ({ count, node, postClass }) => {
  const processedSlug = node.fields.slug.split('/').slice(2, -1).join('/');
  const linkTo = processedSlug === '' ? '/' : `/${processedSlug}`;
  const image = getImage(node.frontmatter.thumbnail);

  return (
    <article
      className={`post-card ${count % 3 === 0 ? "post-card-large" : ""} ${postClass} ${node.frontmatter.thumbnail ? "with-image" : "no-image"}`}
      style={node.frontmatter.thumbnail ? { backgroundImage: `url(${image?.src})` } : {}}
    >
      <Link to={linkTo} className="post-card-link">
        <div className="post-card-content">
          <h2 className="post-card-title">{node.frontmatter.title}</h2>
        </div>
        {node.frontmatter.thumbnail && <GatsbyImage image={image} alt={node.frontmatter.title} />}
      </Link>
    </article>
  );
};

export default PostCard;
