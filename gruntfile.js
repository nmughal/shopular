'use strict';

module.exports = function(gruntConfig) {

  gruntConfig.initConfig({

    clean: ['build/'],

    copy: {
      copythehtml: {
        files: [{
          cwd: 'src/',
          src: ['*.html'],
          dest: 'build/',
          expand: true
        }]
      },

      copyjs: {
        files: [{
          cwd: 'src/js',
          src: ['*.js'],
          dest: 'build/js',
          expand: true
        }]
      }
    },

    sass: {
      all: {
        files: {
          'build/style.css': 'src/sass/main.scss'
        }
      }
    },

    jshint: {
      appjs: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: ['src/**/*/.js']
        }
      }
    },

    karma: {
      all: {
        options: {
          frameworks: ['mocha', 'chai'],
          browsers: ['Chrome'],
          singleRun: true,
          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/js/inventory.module.js',
            'src/js/**/*.js',
            'test/**/*.spec.js'
          ],
          preprocessors: {
            'src/js/**/*.js': ['coverage']
          },
          reporters: ['dots', 'coverage'],
          coverageReporter: {
            type: 'text-summary'
          }
        }
      }
    },

    concat: {
      alljs: {
        options: {
          sourceMap: true
        },
        src: ['src/js/inventory.module.js', 'src/js/**/*.js'],
        dest: 'build/js/app.js'
      }
    },

    babel: {
      all: {
        options: {
          presets: ['es2015'],
          sourceMap: true
        },
        files: {
          'build/js/app.js': 'build/js/app.js'
        }
      }
    }


  });

  require('load-grunt-tasks')(gruntConfig);

  gruntConfig.registerTask('build', ['jshint', 'karma', 'clean', 'concat', 'babel', 'copy', 'sass'] );

};
