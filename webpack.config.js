var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
    entry: './src/embed.es6',
    output: {
        path: path.join(__dirname, 'dist'),
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
            loader: 'babel-loader'
        }]
    },
    plugins: [
        // Avoid publishing files when compilation failed
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
                    })
    ],
    stats: {
        // Nice colored output
        colors: true
    }
};
