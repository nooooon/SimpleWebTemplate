var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		index: './src/js/index.js',
	},
	output: {
		//path: __dirname + '/js',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{ test: /\.json$/, loader: "json" },
			{ test: /\.js$/, exclude: /node_modules|web_modules/, loader: 'babel' }
		]
	},
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.coffee', '.babel.js']
	},
	plugins: [
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery"
		}),
		new webpack.optimize.UglifyJsPlugin(),
	],
	devtool: 'sourcemap'
};