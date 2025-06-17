module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/netlogo'
    : '/',
  filenameHashing: false,
  configureWebpack: {
    output: {
      filename: "[name].bundle.js",
      chunkFilename: "[name].bundle.js"
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
          options.limit = -1;
          return options;
    });
  },
};
