const webpack = require('webpack');
const path = require('path');
const env = process.env.NODE_ENV;
const VueLoaderPlugin = require('vue-loader/lib/plugin');

var config = {
  cache: true,
  watch: true,
  entry: {
    'index': './src/js/index.js', // gulpfileから書き換えられる
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /(node_modules|web_modules)/, use: {loader: 'babel-loader', options: {compact: true}}},
      { test: /\.ts$/, exclude: /(node_modules|web_modules)/, use: {loader: 'ts-loader', options: {appendTsSuffixTo: [/\.vue$/]}}},
      { test: /\.vue$/, exclude: /(node_modules|web_modules)/, use: {loader: 'vue-loader'}},
      { test: /\.scss$/, use: ['vue-style-loader','css-loader']}
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src/js"), "node_modules"],
    extensions: ['*', '.js', '.ts', '.vue', '.babel.js'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    }),
    new VueLoaderPlugin()
  ],
  mode: (env === "production") ? "production" : "development"
};


module.exports = config;