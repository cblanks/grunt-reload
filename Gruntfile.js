var config = {
	port: 3000,
	host: 'localhost',
	dir: 'app'
};

module.exports = function(grunt){
	grunt.initConfig({

		ts: {
      default : {
        src: [ config.dir+'/**/*.ts' ]
      }
    },

		jshint: {
			all: [ 'Gruntfile.js', config.dir+'/**/*.js' ]
		},

		sass: {
	    dist: {
	      files: [{
	        expand: true,
	        cwd: '.',
	        src: [ config.dir+'/**/*.scss' ],
	        dest: '.',
	        ext: '.css'
	      }]
	    }
	  },

		watch:{
			options: {
				livereload: true
			},
			ts: {
				files: [ config.dir+'/**/*.ts' ],
				tasks: [ 'ts' ]
			},
			js: {
				files: [ 'Gruntfile.js', config.dir+'/**/*.js' ],
				tasks: [ 'jshint' ]
			},
			styles: {
				files: [ config.dir+'/**/*.scss' ],
				tasks: [ 'sass' ]
			},
			configFiles: {
		    files: [ 'Gruntfile.js' ],
		    options: {
		      reload: true
		    }
		  }
		},

		express:{
			all:{
				options:{
					port: config.port,
					hostname: config.host,
					bases: [ '.' ],
					livereload: true,
					open: 'http://'+config.host+':'+config.port+'/'+config.dir
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-ts');

	grunt.registerTask('server', [ 'express', 'watch' ]);
};
