'use strict';

module.exports = function(grunt) {
	require('jit-grunt')(grunt);

	// Project Configuration
	grunt.initConfig({
		ngAnnotate: {
			production: {
				files: {
					'dist/form.js': [
						'config/**/*.js', 'controllers/**/*.js',
						'directives/**/*.js', 'services/**/*.js',
						'dist/template.js'
					]
				}
			}
		},
        html2js: {
		  options: {
		  	base: '',
			module: 'angular-tellform.templates',
		    singleModule: true,
			rename: function (moduleName) {
				return 'modules/forms/base/' + moduleName;
			}
		  },
		  form: {
			src: ['views/**/*.html'],
		    dest: 'dist/template.js'
		  }
	    },
	    cssmin: {
		  combine: {
			  files: {
				  'dist/form.css': 'css/**/*.css'
			  }
		  }
	    },
		browserify: {
			dist: {
				files: {
					'dist/bundle.js': ['index.js', 'dist/template.js']
				}
			}
		}
	});

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// Default task(s).
	grunt.registerTask('default', ['html2js:form', 'ngAnnotate', 'cssmin', 'browserify:dist']);
};
