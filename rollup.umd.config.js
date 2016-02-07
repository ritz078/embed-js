var babel    = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var npm      = require('rollup-plugin-npm');
var pkg      = require('./package.json');
var filesize   = require('rollup-plugin-filesize');

var banner = "/*\n" +
	" * " + pkg.name + " - v" + pkg.version + "\n" +
	" * " + pkg.description + "\n" +
	" * " + pkg.homepage + "\n" +
	" *\n" +
	" *   Made by " + pkg.author.name + "\n" +
	" *   Under " + pkg.license + " License\n" +
	" */\n";

var config = {
	entry        : 'src/js/main.js',
	dest         : 'src/embed.js',
	format       : 'umd',
	banner       : banner,
	sourceMap    : true,
	moduleName   : 'EmbedJS',
	plugins      : [
		npm({
			jsnext: true,
			main  : true
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		babel({
			babelrc:false,
			presets:['es2015-rollup']
		}),
		filesize()
	]
};

module.exports = config;
