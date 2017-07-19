const fileSize = require("rollup-plugin-filesize")
const resolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const json = require("rollup-plugin-json")
const banner = require("./banner")

const config = {
	entry: "src/index.js",
	dest: "dist/embed.es.js",
	format: "es",
	external: ["node-fetch"],
	banner,
	plugins: [json(), resolve(), commonjs(), fileSize()]
}

module.exports = config
