var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');
var pkg = require('./package.json');
var filesize = require('rollup-plugin-filesize');

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
	dest: 'dist/embed.es2015.js',
	format: 'es',
	banner: banner,
	sourceMap: true,
	plugins: [
		nodeResolve({
			jsnext: true,
			main: true
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		filesize()
	]
};

module.exports = config;
