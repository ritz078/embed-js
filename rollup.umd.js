const banner = require("./banner");
const buble = require("rollup-plugin-buble");
const resolve = require("rollup-plugin-node-resolve");
const fileSize = require("rollup-plugin-filesize");
const commonjs = require("rollup-plugin-commonjs");
const json = require("rollup-plugin-json");

const config = {
  entry: "src/index.js",
  dest: "dist/embed.umd.js",
  moduleName: "EmbedJS",
  format: "umd",
  banner,
	sourceMap: true,
  plugins: [resolve({
		extensions: [ '.js', '.json' ]
	}), json(), commonjs(), buble(), fileSize()]
};

module.exports = config;
