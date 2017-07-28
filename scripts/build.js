const globby = require('globby')
const rollup = require('rollup')
const buble = require('rollup-plugin-buble')
const json = require('rollup-plugin-json')
const nodent = require('rollup-plugin-nodent')
const {resolve} = require('app-root-path')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')
const fileSize = require('rollup-plugin-filesize')
const nodeResolve = require('rollup-plugin-node-resolve')
const pkg = require('../package.json')

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

const sourceMap = true

const external = Object.keys(pkg.dependencies)

globby(['src/**/*.js']).then(paths => {
	const destRoot = resolve('dist/cjs')
	paths.forEach(path => {
		rollup.rollup({
			entry: path,
			plugins: [json(), nodent(), buble()],
			external,
			banner,
		}).then(bundle => {
			bundle.write({
				format: 'cjs',
				dest: destRoot + path.replace('src', '')
			})
		})
	})
})

rollup.rollup({
	entry: 'src/index.js',
	banner,
	plugins: [
		nodeResolve(),
		json(),
		commonjs(),
		nodent(nodentConfig),
		buble(),
		uglify(),
		fileSize()
	]
}).then(bundle => {
	bundle.write({
		format: 'umd',
		moduleName: 'EmbedJS',
		dest: 'dist/embed.min.js',
		sourceMap
	})
})

rollup.rollup({
	entry: 'src/index.js',
	banner,
	plugins: [
		nodeResolve(),
		json(),
		commonjs(),
		nodent(nodentConfig),
		buble(),
		fileSize()
	]
}).then(bundle => {
	bundle.write({
		format: 'umd',
		moduleName: 'EmbedJS',
		dest: 'dist/embed.js',
		sourceMap
	})
})

