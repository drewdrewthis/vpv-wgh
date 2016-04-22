module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        processhtml: {
            options: {
                strip: true
            },
            dist: {
                files: {
                    'dist/index.html': ['src/index.html']
                }
            },
            landing_template: {
                files: {
                    'templates/landing-page.php': ['src/index.html']
                }
            }
        },
        jshint: {
            options: {
                //asi: true,
                reporter: require('jshint-stylish'),
                ignores: ['src/js/assets/*.js']
            },
            build: ['Gruntfile.js', 'src/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                ignores: ['src/js/assets/*.js']
            },
            build: {
                files: {
                    'dist/js/scripts.min.js': ['src/**/*.js', '!**/assets/*']
                }
            }
        },
        less: {
            build: {
                files: {
                    'src/css/styles.css': 'src/css/styles.less'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    sourceMap: false
                },
                files: {
                    'src/css/styles.css': 'src/css/styles.scss'
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/styles.min.css': 'src/css/styles.css'
                }
            }
        },
        imagemin: { // Task 
            options: { // Target options 
                optimizationLevel: 3
            },
            dynamic: { // Another target 
                files: [{
                    expand: true, // Enable dynamic expansion 
                    cwd: 'src/images', // Src matches are relative to this path 
                    src: ['**/*.{png,jpg,gif,ico}'], // Actual patterns to match 
                    dest: 'dist/images/' // Destination path prefix 
                }]
            }
        },
        watch: {
            index: {
                files: ['src/index.html'],
                tasks: ['processhtml']
            },
            img: {
                files: ['src/images/**/*.{png,jpg,gif,ico}'],
                tasks: ['newer:imagemin']
            },
            stylesheets: {
                files: ['src/**/*.css', 'src/**/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['jshint', 'uglify']
            },
            karma: {
                files: ['src/**/*.js', 'tests/**/*.js']
            }
        }
    });

    grunt.registerTask('default', ['newer:imagemin', 'processhtml', 'jshint', 'uglify', 'cssmin', 'sass']);
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-sass');
};
