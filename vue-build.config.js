var path = require('path'),
  webpack = require('webpack'),
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
    plugins: (function () {
      var plugins = [
        // https://webpack.js.org/plugins/ignore-plugin/
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      ];
      if (process.env.NODE_ENV === 'production') {
        plugins.push(new CleanWebpackPlugin([examplesDist]));
      }
      return plugins;
    })()
  }
};
