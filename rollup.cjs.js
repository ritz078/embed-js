const fileSize = require("rollup-plugin-filesize")
const buble = require("rollup-plugin-buble")
const json = require("rollup-plugin-json")
const banner = require("./banner")

const config = {
	entry: "src/index.js",
	dest: "dist/embed.cjs.js",
	external: ["just-extend", "html-linkify", "regex-emoji", "node-emoji"],
	format: "cjs",
	banner,
	plugins: [json(), buble(), fileSize()]
}

module.exports = config
