var commonjs = require('rollup-plugin-commonjs');
var npm      = require('rollup-plugin-npm');
var pkg      = require('./package.json');

var banner = "/*\n" +
            " * " +  pkg.name + " - v"+ pkg.version +"\n" +
            " * " +  pkg.description +"\n" +
            " * " + pkg.homepage +"\n" +
            " *\n" +
            " *   Made by "+ pkg.author.name +"\n" +
            " *   Under "+ pkg.license +" License\n" +
            " */\n";


var config = {
    entry         : 'src/js/main.js',
    dest          : 'src/embed.es2015.js',
    format        : 'es',
    banner        : banner,
    sourceMap     : true,
    plugins: [
        npm({
            jsnext : true,
            main   : true
        }),
        commonjs({
            include: 'node_modules/**'
        })
    ]
};

module.exports = config;
