var path = require('path');
var webpack = require('webpack');

module.exports = {
        entry: './src/embed.es6',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'embed.js',
            publicPath:path.join(__dirname,'demo')
        },
        module: {
            preLoaders: [{
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'
            }],
            loaders: [{
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
    },
    plugins: [
        // Avoid publishing files when compilation failed
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    }
}
