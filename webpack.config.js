const path = require('path');

module.exports = {
  entry: './ES6/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
};