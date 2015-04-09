module.exports = function(grunt) {

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

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ["src/jquery.embed.js"],
				dest: "dist/jquery.embed.js"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.embed.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.embed.js"],
				dest: "dist/jquery.embed.min.js"
			},
			options: {
				banner: "<%= meta.banner %>",
                compress:{
                    drop_console:true
                }
			}
		},

	// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
		    files: ['src/*'],
		    tasks: ['default']
		},

        // minify css files
        cssmin:{
            options:{
              report:'gzip'
            },
           target:{
               files:[{
                   expand:true,
                   cwd:'src',
                   src:['*.css'],
                   dest:'dist',
                   ext:'.embed.min.css'
               }]
           }
        },

		copy:{
			main:{
				src:'src/jquery.embed.css',
				dest:'dist/jquery.embed.css'
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("build", ["concat", "uglify","cssmin","copy"]);
	grunt.registerTask("default", ["jshint", "build"]);

};
