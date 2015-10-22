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
                    require('cssnano')({
                        convertValues: false
                    }) // minify the result
                ]
            },
            dist: {
                src: 'src/embed.css',
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
                            warnings: false
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
        },

        'sprite': {
            all: {
                src: './assets/images/ejs_emojis/*.png',
                dest: './assets/images/emojis.png',
                retinaSrcFilter: './assets/images/ejs_emojis/*@2x.png',
                destCss: 'src/_emojis.scss',
                retinaDest: './assets/images/emojis@2x.png',
                cssFormat:'css'
            }
        },

        'retinafy': {
            options: {
                sizes: {
                    '50%': {
                        suffix: ''
                    },
                    '100%': {
                        suffix: '@2x'
                    }
                }
            },
            files: {
                expand: true,
                cwd: 'assets/images/emojis',
                src: ['*.png'],
                dest: 'assets/images/ejs_emojis/'
            }
        },

        'sass': {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/embed.css': 'src/embed.scss',
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-webpack");
    grunt.loadNpmTasks("grunt-spritesmith");
    grunt.loadNpmTasks('grunt-retinafy');
    grunt.loadNpmTasks("grunt-contrib-sass");

    grunt.registerTask("serve", ["webpack-dev-server:start"])
    grunt.registerTask("default", ["clean", "webpack:build-dev", "watch"]);
    grunt.registerTask("build", ["clean", "webpack:build", "sass","postcss"]);
};
