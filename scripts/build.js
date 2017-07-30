const globby = require('globby')
const rollup = require('rollup')
const buble = require('rollup-plugin-buble')
const json = require('rollup-plugin-json')
const nodent = require('rollup-plugin-nodent')
const {resolve} = require('app-root-path')
const commonjs = require('rollup-plugin-commonjs')
const fileSize = require('rollup-plugin-filesize')
const uglify = require('rollup-plugin-uglify')
const nodeResolve = require('rollup-plugin-node-resolve')
const fileName = require('file-name')
const camelCase = require('just-camel-case')
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

const external = Object.keys(pkg.dependencies)

if(process.env.BUILD !== 'umd') {
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

	globby(['src/**/*.js']).then(paths => {
		const destRoot = resolve('dist/umd')
		paths.forEach(path => {
			rollup.rollup({
				entry: path,
				plugins: [
					nodeResolve(),
					json(),
					commonjs(),
					nodent(nodentConfig),
					buble()
				],
				banner,
			}).then(bundle => {
				bundle.write({
					format: 'umd',
					moduleName: camelCase(fileName(path)),
					dest: destRoot + path.replace('src', '')
				})
			})
		})
	})

	globby(['src/**/*.js']).then(paths => {
		const destRoot = resolve('dist/umd-minified')
		paths.forEach(path => {
			rollup.rollup({
				entry: path,
				plugins: [
					nodeResolve(),
					json(),
					commonjs(),
					nodent(nodentConfig),
					buble(),
					uglify()
				],
				banner,
			}).then(bundle => {
				bundle.write({
					format: 'umd',
					moduleName: camelCase(fileName(path)),
					dest: destRoot + path.replace('src', '')
				})
			})
		})
	})
}

rollup.rollup({
	entry: './src/index.js',
	plugins: [
		nodeResolve(),
		json(),
		commonjs(),
		nodent(nodentConfig),
		buble(),
		fileSize()
	],
	banner,
}).then(bundle => {
	bundle.write({
		format: 'umd',
		moduleName: 'EmbedJS',
		sourceMap: true,
		dest: './dist/embed.core.js'
	})
})

rollup.rollup({
	entry: './src/index.js',
	plugins: [
		nodeResolve(),
		json(),
		commonjs(),
		nodent(nodentConfig),
		buble(),
		uglify(),
		fileSize()
	],
	banner,
}).then(bundle => {
	bundle.write({
		format: 'umd',
		moduleName: 'EmbedJS',
		sourceMap: true,
		dest: './dist/embed.core.min.js'
	})
})

