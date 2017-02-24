var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');
var pkg = require('./package.json');
var filesize = require('rollup-plugin-filesize');
var buble = require('rollup-plugin-buble')

var banner = "/*\n" +
	" * " + pkg.name + " - v" + pkg.version + "\n" +
	" * " + pkg.description + "\n" +
	" * " + pkg.homepage + "\n" +
	" *\n" +
	" *   Made by " + pkg.author.name + "\n" +
	" *   Under " + pkg.license + " License\n" +
	" */\n";

var config = {
	entry: 'src/js/main.js',
	dest: 'dist/embed.js',
	format: 'umd',
	banner: banner,
	sourceMap: true,
	moduleName: 'EmbedJS',
	plugins: [
		nodeResolve({
			jsnext: true,
			main: true
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		buble(),
		filesize()
	]
};

module.exports = config;
