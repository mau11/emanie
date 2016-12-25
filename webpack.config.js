module.exports = {
  entry: ["./app.js"],
  output: {
    filename: "./public/bundle.js"
  },
  watch: false,
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'

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
 },
}
