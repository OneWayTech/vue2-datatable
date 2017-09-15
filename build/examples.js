// https://github.com/vuejs/vue-cli/blob/master/docs/build.md#configuration-files
var path = require('path'),
  webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  dist = path.join(__dirname, '../examples/dist');

module.exports = {
  entry: path.join(__dirname, '../examples/src/app.js'),
  html: {
    template: path.join(__dirname, '../examples/src/index.html')
  },
  webpack: {
    devtool: false,
    output: {
      path: dist,
      publicPath: ''
    },
    plugins: (function () {
      var plugins = [
        // https://webpack.js.org/plugins/ignore-plugin/
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      ];
      if (process.env.NODE_ENV === 'production') {
        plugins.push(
          new CleanWebpackPlugin([dist], {
            root: path.join(__dirname, '../examples')
          })
        );
      }
      return plugins;
    })()
  }
};
