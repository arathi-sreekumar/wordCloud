
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
        compile: {
            options: {
               baseUrl: 'js/',
               name: 'main',
               mainConfigFile: 'js/config.js',
               out: 'js/compiled/compiled.min.js',
               optimize: 'uglify2',
               include: ['libs/require.min.js']
            }
        }
    },
    jshint: {
      files: ['js/application/**/*.js', 'Gruntfile.js', 'test/application/**/*.js', '!**/coverage/**/*.js',
      '!**/target/*.js', '!**/libs/**/*.js',
      '!js/**/compiled.min.js', '!**/node_modules/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },
    inline: {
        dist: {
            options:{
                uglify: true
            },
            src: [
            ]
        }
    },
    less: {
      main: {
        options: {
          cleancss: true
        },
        files: {
          'css/styles.css': [
            'less/project.less'
          ]
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'js/scripts.min.js': [
            'js/*.js'
          ]
        }
      }
    },

    connect: {
      server: {
        options: {
          keepalive: true
        }
      },
      launch: {
        options: {
          open: true,
          keepalive: true
        }
      }
    },

    watch: {
      styles: {
        files: [ 'less/**/*.less'],
        tasks: ['less']
      },
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      }
    },
    clean: {
      dist: [
        'css/*.css',
        'js/compiled/*.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'requirejs',
    'jshint',
    'less',
    'inline'
  ]);

  grunt.registerTask('start', 'connect:server');

  grunt.registerTask('launch', 'connect:launch');

  grunt.registerTask('test', 'karma');

};