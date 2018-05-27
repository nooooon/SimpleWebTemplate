const webpack = require('webpack');
const path = require('path');
const env = process.env.NODE_ENV;

var config = {
  cache: true,
  watch: true,
  entry: {
    'index': './src/js/index.js',
  },
  output: {
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
    })
  ],
  mode: (env === "production") ? "production" : "development"
};


module.exports = config;