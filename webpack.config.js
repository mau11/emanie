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
       test: [/|.js$/, /\.es6$/],
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015']
       }
     }
   ]
 },
 resolve: {
   extensions: ['', '.js', '.es6']
 }/*,
 devServer: {
  historyApiFallback: true
 }*/
}
