var path = require('path');
var webpack = require('webpack');
var build = require('./build.json');

module.exports = {
    entry: './src/js/embed.es6',
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'embed.js',
        publicPath: 'dist/'
    },
    module: {
        preLoaders: [{
            test: /\.es6$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.es6$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query :{
                cacheDirectory:'.tmp/'
            }
        }]
    },
    plugins: [
        // Avoid publishing files when compilation failed
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin(build),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
            'fetchJsonp': 'fetch-jsonp'
                    }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            },
            mangle:false,
            output:{
                beautify:true,
                comments:true
            }
        })
        ],
    stats: {
        // Nice colored output
        colors: true
    }
};
