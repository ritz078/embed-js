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
            options: {
                livereload: true
            },
            css: {
                files: ['src/css/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['src/js/**.es6'],
                tasks: ['webpack:build-dev']
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
                src             : './assets/images/ejs_emojis/*.png',
                dest            : './assets/images/emojis.png',
                retinaSrcFilter : './assets/images/ejs_emojis/*@2x.png',
                destCss         : 'src/css/_emojis.scss',
                retinaDest      : './assets/images/emojis@2x.png',
                cssFormat       : 'css',
                cssTemplate     : 'sprite.handlebars'
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
                banner: "<%= meta.banner %>"
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

    grunt.registerTask("serve", ["webpack-dev-server:start"])
    grunt.registerTask("default", ["clean", "webpack:build-dev", "sass", "connect", "watch"]);
    grunt.registerTask("build", ["clean", "emoji", "webpack:build-dev", "uglify", "postcss"]);
    grunt.registerTask("emoji", ["retinafy", "sprite", "sass"]);
};
