const buble = require('rollup-plugin-buble')
const json = require('rollup-plugin-json')
const nodent = require('rollup-plugin-nodent')
const commonjs = require('rollup-plugin-commonjs')
const fileSize = require('rollup-plugin-filesize')
const uglify = require('rollup-plugin-uglify')
const nodeResolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-re')
const pkg = require('./package.json')
const Visualizer = require('rollup-plugin-visualizer')

const banner = `/*
 * ${pkg.name} - v${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Made by ${pkg.author.name}
 * Under ${pkg.license} License
 */
 `

const nodentConfig = {
	promises: true,
	noRuntime: true,
	es6target: true
}

const replaces = {
	"// import * as presets from './presets'": "import * as presets from './presets'",
	"// import * as plugins from './plugins'": "import * as plugins from './plugins'",
	"// EmbedJS.plugins = plugins":"EmbedJS.plugins = plugins",
	"// EmbedJS.presets = presets":"EmbedJS.presets = presets",
}

const defines = {
	IS_CJS: false
}

module.exports = [{
	entry: './src/embed.js',
	plugins: [
		replace({
			replaces,
			defines
		}),
		nodeResolve(),
		json(),
		commonjs(),
		nodent(nodentConfig),
		buble(),
		Visualizer(),
		fileSize()
	],
	banner,
	format: 'umd',
	sourceMap: true,
	moduleName: 'EmbedJS',
	dest: './dist/embed.umd.js'
}, {
	entry: './src/embed.js',
	plugins: [
		replace({
			replaces,
			defines
		}),
		nodeResolve(),
		json(),
		commonjs(),
		nodent(nodentConfig),
		buble(),
		uglify(),
		fileSize()
	],
	banner,
	format: 'umd',
	sourceMap: true,
	moduleName: 'EmbedJS',
	dest: './dist/embed.umd.min.js'
}]
