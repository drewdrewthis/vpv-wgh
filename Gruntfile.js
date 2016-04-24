module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'src/index.html': 'src/dev-index.html'
                }
            }
        },
        htmlbuild: {
            options: {
                sections: {
                    views: '',
                    templates: '',
                    layout: {
                        header: 'src/dev-pages/templates/header.html',
                        footer: 'src/dev-pages/templates/footer.html',
                        homepage: 'src/dev-pages/templates/homepage.html',
                        properties: 'src/dev-pages/templates/properties.html'

                    }
                }
            },
            dev: {
                files: {
                    'src/index.html': ['src/dev-pages/index.html'],
                    'src/properties.html': ['src/dev-pages/properties.html'],
                }
            },
            wp: {
                files: {
                    'src/wp-templates/landing-page.php': ['src/dev-pages/templates/homepage.html']
                }
            }
        },
        sync: {
            styles: {
                files: [{
                        cwd: '/Users/Bongani/Google\ Drive/WORK/Web+Design/Verbal+Visual/WGH/wghhotelgroup.com/src/css/',
                        src: ['**/*.scss', '!_variables.scss','!main.scss'],
                        dest: '/Users/Bongani/Google\ Drive/WORK/Web+Design/Verbal+Visual/WGH/wgh-wp-engine/wp-content/themes/vpv-sage/assets/styles/common/'
                    } // includes files in path and its subdirs 
                ],
                verbose: true, // Default: false 
                pretend: false, // Don't do any disk operations - just write log. Default: false 
                failOnError: true, // Fail the task when copying is not possible. Default: false 
                ignoreInDest: ["_variables.scss", ".DS_Store", "main.scss"], // Never remove js files from destination. Default: none 
                updateAndDelete: true, // Remove all files from dest that are not found in src. Default: false 
                compareUsing: "md5" // compares via md5 hash of file contents, instead of file modification time. Default: "mtime" 
            },
            templates: {
                files: [{
                        cwd: '/Users/Bongani/Google\ Drive/WORK/Web+Design/Verbal+Visual/WGH/wghhotelgroup.com/src/wp-templates/',
                        src: ['**/*.php'],
                        dest: '/Users/Bongani/Google\ Drive/WORK/Web+Design/Verbal+Visual/WGH/wgh-wp-engine/wp-content/themes/vpv-sage/templates/'
                    } // includes files in path and its subdirs 
                ],
                verbose: true, // Default: false 
                pretend: false, // Don't do any disk operations - just write log. Default: false 
                failOnError: true, // Fail the task when copying is not possible. Default: false 
                ignoreInDest: [".DS_Store"],
                updateAndDelete: false, // Remove all files from dest that are not found in src. Default: false 
                compareUsing: "md5" // compares via md5 hash of file contents, instead of file modification time. Default: "mtime" 
            }
        },
        jshint: {
            options: {
                //asi: true,
                reporter: require('jshint-stylish'),
                ignores: ['src/js/assets/**/*.js']
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
                    'src/css/styles.css': 'src/css/main.scss'
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
                files: ['src/dev-pages/**/*.html'],
                tasks: ['htmlbuild']
            },
            stylesheets: {
                files: ['src/**/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['jshint']
            }
        }
    });

    grunt.registerTask('default', ['htmlbuild', 'jshint', 'sass']);
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
};
