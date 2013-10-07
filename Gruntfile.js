module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    less: {
      compile: {
        files: {
          'public/styles.css': 'assets/stylesheets/styles.less'
        }
      }
    },

    regarde: {
      less: {
        files: ['assets/stylesheets/**/*.{less,css}'],
        tasks: ['less:compile']
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public'
        }
      }
    }

  });


  grunt.registerTask('default', ['less', 'connect', 'regarde']);
};
