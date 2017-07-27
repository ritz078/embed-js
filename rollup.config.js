const fileSize = require('rollup-plugin-filesize')
const buble = require('rollup-plugin-buble')
const json = require('rollup-plugin-json')
const nodent = require('rollup-plugin-nodent')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')
const pkg = require('./package.json')

const banner = `/*
 * ${pkg.name} - v${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Made by ${pkg.author.name}
 * Under ${pkg.license} License
 */
 `
const external = Object.keys(pkg.dependencies)

const entry = 'src/index.js'

const nodentConfig = {
	promises: true,
	noRuntime: true,
	es6target: true
}

const cjsConfig = {
	entry,
	dest: 'dist/embed.cjs.js',
	external,
	format: 'cjs',
	banner,
	plugins: [json(), nodent(), buble(), fileSize()]
}

const esConfig = {
	entry,
	dest: 'dist/embed.es.js',
	format: 'es',
	external: ['isomorphic-unfetch'],
	banner,
	plugins: [json(), resolve(), commonjs(), fileSize()]
}

const umdConfig = {
	entry,
	dest: 'dist/embed.umd.js',
	moduleName: 'EmbedJS',
	format: 'umd',
	banner,
	plugins: [
		resolve(),
		json(),
		commonjs(),
		nodent(nodentConfig),
		buble(),
		fileSize()
	]
}

const umdMinConfig = {
	entry,
	dest: 'dist/embed.umd.min.js',
	moduleName: 'EmbedJS',
	format: 'umd',
	banner,
	sourceMap: true,
	plugins: [
		resolve(),
		json(),
		commonjs(),
		nodent(nodentConfig),
		buble(),
		uglify(),
		fileSize()
	]
}

export default [
	cjsConfig,
	esConfig,
	umdConfig,
	umdMinConfig
]
