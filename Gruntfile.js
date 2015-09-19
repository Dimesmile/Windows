module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					$: true,
					console: true,
				}
			},
			'<%= pkg.name %>': {
				src: ['src/js/**/*.js']
			}
		},

		concat: {
			dist: {
				src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/jquery-ui/jquery-ui.min.js', 'src/js/script.js'],
				dest: 'www/build.js'
			}
		},

		uglify: {
			options: {
				stripBanners: true,
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
			},
			build: {
				src: 'www/build.js',
				dest: 'www/build.min.js'
			}
		},

		cssmin: {
			with_banner: {
				options: {
					banner: '/* My minified css */'
				},

				files: {
					'www/style.min.css' : ['bower_components/normalize-css/normalize.css', 'src/css/style.css']
				}
			}
		},

		htmlmin: {
			dist: {                        
      			options: {                                
        			removeComments: true,
        			collapseWhitespace: true
      			},
      			files: {                     
        			'www/index.min.html': 'src/html/index.html' 
      			}
			}
		},

		watch: {
			scripts: {
				files: ['src/js/*.js'],
				tasks: ['jshint', 'concat', 'uglify']
			},
			css: {
				files: ['src/css/*.css'],
				tasks: ['cssmin']
			},
			html: {
				files: ['src/html/*.html'],
				tasks: ['htmlmin']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'htmlmin', 'watch']);
};