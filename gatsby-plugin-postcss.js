module.exports = {
  resolve: `gatsby-plugin-postcss`,
  options: {
    postCssPlugins: [
      require("autoprefixer"),
      require("postcss-preset-env"),
    ],
  },
};
