const fileSize = require("rollup-plugin-filesize")
const buble = require("rollup-plugin-buble")
const json = require("rollup-plugin-json")
const nodent = require("rollup-plugin-nodent")
const banner = require("./banner")

const config = {
	entry: "src/index.js",
	dest: "dist/embed.cjs.js",
	external: [
		"just-extend",
		"html-linkify",
		"regex-emoji",
		"node-emoji",
		"isomorphic-unfetch"
	],
	format: "cjs",
	banner,
	plugins: [json(), nodent(), buble(), fileSize()]
}

module.exports = config
