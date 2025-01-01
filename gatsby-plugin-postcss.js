module.exports = {
  resolve: `gatsby-plugin-postcss`,
  options: {
    postCssPlugins: [
      require("autoprefixer"),
      require("postcss-preset-env"), // 支持现代 CSS 特性
    ],
  },
};
