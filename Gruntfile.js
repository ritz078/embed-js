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
            tasks: ['dev']
        },

        copy: {
            main: {
                src: 'src/embed.css',
                dest: 'dist/embed.css'
            }
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
            "build-dev": {
                debug: true
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-postcss");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-webpack");

    grunt.registerTask("dev",["clean","webpack:build-dev","copy"]);
    grunt.registerTask("build", ["clean", "webpack:build-dev","postcss", "copy"]);
    grunt.registerTask("default", ["dev", "watch"]);
};
