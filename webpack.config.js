var webpack = require('webpack');
var path = require('path');

const env = process.env.NODE_ENV;
console.log(env);

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
  ]
};

if(env === "release"){
  config.watch = false;
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}else{
  config.watch = true;
  config.devtool = 'sourcemap';
}

module.exports = config;