module.exports = function (grunt) {

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
			css    : {
				files: ['src/css/**/*.scss'],
				tasks: ['sass', 'postcss']
			},
			js     : {
				files: ['src/js/**/*.js', 'build.json'],
				tasks: ['eslint', 'shell:rollup', 'uglify']
			}
		},

		postcss: {
			options: {
				map       : false,
				processors: [
					require('cssnano')({
						convertValues: false
					})
				]
			},
			dist   : {
				src : '.tmp/embed.css',
				dest: 'dist/embed.min.css'
			}
		},

		clean: ["dist"],

		'sprite': {
			all: {
				src                 : './assets/images/ejs_emojis/*.png',
				dest                : './assets/images/emojis.png',
				retinaSrcFilter     : './assets/images/ejs_emojis/*@2x.png',
				destCss             : 'src/css/_emojis.scss',
				retinaDest          : './assets/images/emojis@2x.png',
				cssFormat           : 'css',
				cssTemplate         : 'sprite.handlebars',
				cssHandlebarsHelpers: {
					escape: function (name) {
						var x = ['+', '-', '/', '*'];
						if (x.indexOf(name[0]) !== -1) return '\\' + name;
						return name;
					}
				}
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
			files  : {
				expand: true,
				cwd   : 'assets/images/emojis',
				src   : ['*.png'],
				dest  : 'assets/images/ejs_emojis/'
			}
		},

		'sass': {
			dist: {
				options: {
					style: 'expanded'
				},
				files  : {
					'src/embed.css': 'src/css/embed.scss'
				}
			}
		},

		'uglify': {
			options: {
				banner  : "<%= meta.banner %>",
				mangle  : true,
				compress: {
					sequences   : true,
					dead_code   : true,
					conditionals: true,
					booleans    : true,
					unused      : true,
					if_return   : true,
					join_vars   : true,
					drop_console: true
				}
			},
			build  : {
				files: {
					'dist/embed.min.js': 'src/embed.js'
				}
			}
		},
		connect : {
			server: {
				options: {
					port      : 8000,
					livereload: true,
					open      : true,
					keepAlive : true,
					base      : {
						path   : './',
						options: {
							index : 'demo/index.html',
							maxAge: 300000
						}
					}
				}
			}
		},

		eslint: {
			target: ['src/js/**/*.js']
		},

		'string-replace': {
			dist: {
				files  : {
					'.tmp/embed.css': 'src/embed.css'
				},
				options: {
					replacements: [{
						pattern    : /..\/assets\/images\/loader.svg/g,
						replacement: 'assets/images'
					}, {
						pattern    : /..\/.\/assets\/images\/emojis/g,
						replacement: 'assets/images/emojis'
					}, {
						pattern    : /..\/assets\/fonts/g,
						replacement: 'assets/fonts'
					}]
				}
			}
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					src   : 'assets/fonts/*',
					dest  : 'dist/'
				}, {
					expand: true,
					src   : 'assets/images/*',
					dest  : 'dist/',
					filter: 'isFile'
				}]
			}
		},

		bump: {
			options: {
				files        : ['package.json', 'bower.json'],
				commitFiles  : ['-a'],
				pushTo       : 'origin',
				updateConfigs: ['pkg']
			}
		},

		conventionalChangelog: {
			options: {
				changelogOpts: {
					// conventional-changelog options go here
					preset: 'angular',
					releaseCount: 0
				}
			},
			release: {
				src: 'CHANGELOG.md'
			}
		},

		shell: {
			publish: {
				command: 'npm publish'
			},
			rollup : {
				command: 'rollup -c rollup.umd.config.js && rollup -c rollup.es2015.config.js'
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask("default", ["eslint", "shell:rollup", "sass", "connect", "watch"]);
	grunt.registerTask("build", ["clean", "build-emoji", "eslint", "shell:rollup", "sass", "uglify", "string-replace", "postcss", "copy"]);
	grunt.registerTask("build-emoji", ["retinafy", "sprite", "sass"]);
	grunt.registerTask("dist", ["clean", "eslint", "shell:rollup", "sass", "uglify", "string-replace", "postcss", "copy"]);

	grunt.registerTask("release", function (option) {
		grunt.task.run(["bump-only:" + option, "dist", "conventionalChangelog", "bump-commit", "shell:publish"]);
	});
};
