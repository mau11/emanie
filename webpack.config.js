//var path = require('path');

module.exports = {
  entry: ["./public/routes.js"],
  output: {
    filename: "./public/bundle.js"
  },
  watch: false,
  module: {
    preLoaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'jsxhint-loader'

      }
   ],
   loaders: [
     {
       test: [/|.js$/, /\.es6$/,/\.json$/],
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015']
       }
     },
     {
        test: /\.json$/,
        loader: 'json-loader'
      }
   ]
 },
 resolve: {
   extensions: ['', '.js', '.es6']
 },
 node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
