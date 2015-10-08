var path    = require('path');
var webpack = require('webpack');
var pkg     = require('./package.json');

var banner = "/*\n" +
	" *  " + pkg.name + " - v" + pkg.version + "\n" +
	" *  " + pkg.description + "\n" +
	" *  " + pkg.homepage + "\n" +
	" *\n" +
	" *  Made by " + pkg.author.name + "\n" +
	" *  Under " + pkg.license + " License\n" +
	" */\n";

module.exports = {
	entry  : './src/embed.es6',
	output : {
		path    : path.join(__dirname, 'dist'),
		filename: 'embed.js'
	},
	module : {
		preLoaders: [
			{
				test   : /\.es6$/,
				exclude: /node_modules/,
				loader : 'jshint-loader'
			}
		],
		loaders   : [
			{
				test   : /\.es6$/,
				exclude: /node_modules/,
				loader : 'babel-loader'
			}
		]
	},
	plugins: [
		// Avoid publishing files when compilation failed
		new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		}),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				drop_console: true
			}
		}),
		new webpack.BannerPlugin(banner, {
			raw: true
		})
	],
	stats  : {
		// Nice colored output
		colors: true
	},
	devtool: 'source-map'
};
