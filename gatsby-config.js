module.exports = {
  siteMetadata: {
    title: "Your Site Title",
    description: "Your site description.",
    author: "Your Name",
    image: "/images/your-image.jpg", // Your default image
    siteUrl: "https://your-site-url.com",
    social: {
      twitter: "your-twitter-handle",
      facebook: "your-facebook-handle",
      github: "your-github-handle",
    },
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1360,
              withWebp: true,
              quality: 75,
              showCaptions: false,
              wrapperStyle: `margin: 7vw 0;`,
              linkImagesToOriginal: false,
              backgroundColor: 'transparent',
              loading: 'lazy',
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("autoprefixer"),
          require("postcss-preset-env"), // Enable modern CSS features
        ],
      },
    },
  ],
};
