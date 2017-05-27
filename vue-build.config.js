var path = require('path');

module.exports = {
  html: {
    template: './example/index.html'
  },
  webpack: {
    output: {
      path: path.join(__dirname, 'example-online-demo'),
      publicPath: ''
    }
  }
};
