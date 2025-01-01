import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Author = ({ author, avatar }) => {
    const image = getImage(avatar)

    return (
        <div className="author-card">
            {image && (
                <div className="author-profile-image">
                    <GatsbyImage
                        image={image}
                        alt={author}
                        className="author-profile-image"
                    />
                </div>
            )}
            <div className="author-info">
                <h2>{author}</h2>
            </div>
        </div>
    )
}

export default Author
