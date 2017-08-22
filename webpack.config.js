var webpack = require('webpack');
var path = require('path');

module.exports = {
  cache: true,
  watch: true,
  entry: {
    'index': './src/js/index.js',
  },
  output: {
    path: __dirname + '/js',
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /(node_modules|web_modules)/, use: {loader: 'babel-loader', options: {compact: true}}}
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src/js"), "node_modules"],
    extensions: ['*', '.js', '.coffee', '.babel.js']
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    }),
    //new webpack.optimize.UglifyJsPlugin(),
  ],
  devtool: 'sourcemap'
};