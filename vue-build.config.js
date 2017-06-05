var path = require('path'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  examplesDist = path.join(__dirname, 'examples/dist');

module.exports = {
  html: {
    template: path.join(__dirname, 'examples/src/index.html')
  },
  webpack: {
    devtool: false,
    output: {
      path: examplesDist,
      publicPath: ''
    },
    plugins: process.env.NODE_ENV === 'production' ? [
      new CleanWebpackPlugin([examplesDist])
    ] : []
  }
};
