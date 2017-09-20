// https://github.com/vuejs/vue-cli/blob/master/docs/build.md#configuration-files
var path = require('path')

module.exports = {
  entry: path.join(__dirname, '../src/main.js'),
  html: false,
  filename: {
    js: 'min.js',
    css: 'min.css'
  },
  webpack: {
    devtool: false,
    output: {
      library: 'Datatable',
      libraryTarget: 'umd',
      path: path.join(__dirname, '../dist')
    }
  }
}
