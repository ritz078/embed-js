module.exports = function(grunt) {

    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
    var babel = require('rollup-plugin-babel');
    var npm = require('rollup-plugin-npm');
    var commonjs = require('rollup-plugin-commonjs');
    var replace = require('rollup-plugin-replace');
    var build = require('./build.json');

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
            options: {
                livereload: true
            },
            css: {
                files: ['src/css/**/*.scss'],
                tasks: ['sass', 'postcss']
            },
            js: {
                files: ['src/js/**/*.es6', 'build.json'],
                tasks: ['webpack:build-dev', 'uglify']
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('cssnano')({
                        convertValues: false
                    })
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
            "build-dev": {
                devtool: "sourcemap",
                debug: true
            }
        },

        'sprite': {
            all: {
                src: './assets/images/ejs_emojis/*.png',
                dest: './assets/images/emojis.png',
                retinaSrcFilter: './assets/images/ejs_emojis/*@2x.png',
                destCss: 'src/css/_emojis.scss',
                retinaDest: './assets/images/emojis@2x.png',
                cssFormat: 'css',
                cssTemplate: 'sprite.handlebars'
            }
        },

        'retinafy': {
            options: {
                sizes: {
                    'w22': {
                        suffix: ''
                    },
                    'w44': {
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
                    'src/embed.css': 'src/css/embed.scss',
                }
            }
        },

        'uglify': {
            options: {
                banner: "<%= meta.banner %>",
                mangle: true,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                }
            },
            build: {
                files: {
                    'dist/embed.min.js': 'src/embed.js'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    livereload: true,
                    open: true,
                    keepAlive: true,
                    base: {
                        path: './',
                        options: {
                            index: 'demo/index.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        },

        rollup: {
            options: {
                format: 'cjs',
                banner: "<%= meta.banner %>",
                plugins: [
                    babel(),
                    replace(build),
                    npm({
                        jsnext: true,
                        main: true
                    }),
                    commonjs({
                        include: 'node_modules/**'
                    })
                ]
            },
            files: {
                src: 'src/js/embed.es6',
                dest: 'src/embed.js'
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
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-rollup")

    grunt.registerTask("default", ["webpack:build-dev", "sass", "connect", "watch"]);
    grunt.registerTask("build", ["clean", "build-emoji", "webpack:build-dev", "uglify", "postcss"]);
    grunt.registerTask("build-emoji", ["retinafy", "sprite", "sass"]);
};
