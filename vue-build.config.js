var path = require('path'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  exampleDist = path.join(__dirname, 'example-dist');

module.exports = {
  html: {
    template: './example/index.html'
  },
  webpack: {
    output: {
      path: exampleDist,
      publicPath: ''
    },
    plugins: [
      new CleanWebpackPlugin([exampleDist])
    ]
  }
};
