var webpack = require('webpack');
var path = require('path');
var dest = "./htdocs/";

module.exports = {
	entry: {
		index: './src/js/main.js',
	},
	output: {
		//path: __dirname + '/js',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{ test: /\.json$/, loader: "json" }
		]
	},
	resolve: {
		root: [
			path.join(__dirname)
		],
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