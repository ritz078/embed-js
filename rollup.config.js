var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var npm = require('rollup-plugin-npm');

var config = {
    entry: 'test/index.test.js',
    dest: 'test/bundle.test.js',
    format: 'cjs',
    plugins: [
        babel(),
        npm({
            jsnext: true,
            main: true
        }),
        commonjs({
            include: 'node_modules/**'
        }),
    ]
}

module.exports = config
