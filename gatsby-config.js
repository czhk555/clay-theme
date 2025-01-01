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
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: [
          "Montserrat:400,700",
          "Merriweather:400,400i,700",
          "Nunito:400,700",
          "Alegreya:400,700",
        ],
        display: "swap",
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
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1360,
              withWebp: true, // Enable WebP format
              quality: 75,
              showCaptions: false,
              wrapperStyle: `margin: 7vw 0;`,
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
          require("postcss-preset-env"),
        ],
      },
    },
  ],
};
