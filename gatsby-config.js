// const urljoin = require("url-join")
// import urlJoin from 'url-join';
const siteConfig = require("./siteConfig")
// import siteConfig from "./siteConfig"

module.exports = {
  siteMetadata: {
    title: siteConfig.name,
    author: siteConfig.author,
    description: siteConfig.description,
    image: siteConfig.image,
    siteUrl: "https://clay-gatsby.netlify.app/",
    social: {
      twitter: siteConfig.twitter || '',
      facebook: siteConfig.facebook || '',
      github: siteConfig.github || '',
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
          placeholder: `blurred`,
          quality: 75,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
        failOnError: true,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`, `webp`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1360,
              withWebp: true,
              withAvif: true,
              quality: 75,
              loading: 'lazy',
              linkImagesToOriginal: false,
              showCaptions: true,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("postcss-easy-import")(),
          require("postcss-custom-properties")({ preserve: false }),
          require("postcss-color-function")(),
          require("autoprefixer")({ overrideBrowserslist: ["last 1 version"] }),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        develop: false,
        tailwind: false,
        purgeOnly: ['src/utils/css/']
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteConfig.name,
        short_name: siteConfig.shortName,
        start_url: siteConfig.prefix,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: siteConfig.manifest_icon,
        cache_busting_mode: 'query',
        include_favicon: true,
        legacy: true,
        theme_color_in_head: true,
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/'],
        appendScript: require.resolve(`./src/custom-sw-code.js`),
        debug: true,
        workboxConfig: {
          globPatterns: ['**/*.{js,jpg,png,html,css}'],
          runtimeCaching: [
            {
              urlPattern: /.+\.(js|css|static)/,
              handler: 'CacheFirst'
            },
            {
              urlPattern: /.+\.(png|jpg|jpeg|webp|avif|svg|gif|tiff)/,
              handler: 'CacheFirst'
            },
            {
              urlPattern: /\/page-data\/.+\json/,
              handler: 'NetworkFirst'
            }
          ],
          skipWaiting: true,
          clientsClaim: true
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
  ],
}

