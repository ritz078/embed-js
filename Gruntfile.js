module.exports = function(grunt) {

    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');

    grunt.initConfig({

        // Import package manifest
        pkg: grunt.file.readJSON("package.json"),

        // Banner definitions
        meta: {
            banner: "/*\n" +
                " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
                " *  <%= pkg.description %>\n" +
                " *  <%= pkg.homepage %>\n" +
                " *\n" +
                " *  Made by <%= pkg.author.name %>\n" +
                " *  Under <%= pkg.license %> License\n" +
                " */\n"
        },

        // watch for changes to source
        // Better than calling grunt a million times
        // (call 'grunt watch')
        watch: {
            files: ['src/**/*'],
            tasks: ['webpack:build-dev']
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer-core')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'src/*.css',
                dest: 'dist/embed.min.css'
            }
        },

        clean: ["dist"],

        webpack: {
            options: webpackConfig,
            "build": {
                debug: true,
                plugins: webpackConfig.plugins.concat(
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            drop_console: true,
                            warnings:false
                        },
                        sourceMap: true
                    }),
                    new webpack.BannerPlugin("<%= meta.banner %>", {
                        raw: true
                    })
                )
            },
            "build-dev": {
                devtool: "sourcemap",
                debug: true
            }
        },

        'webpack-dev-server': {
            options: {
                webpack: webpackConfig,
                publicPath: '/' + webpackConfig.output.publicPath
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: "sourcemap",
                    debug: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-webpack");

    grunt.registerTask("serve", ["webpack-dev-server:start"])
    grunt.registerTask("default", ["clean", "webpack:build-dev","watch"]);
    grunt.registerTask("build", ["clean", "webpack:build", "postcss"]);
};
