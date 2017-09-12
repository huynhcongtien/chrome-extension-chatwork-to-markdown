/* global __dirname */

module.exports = function(grunt) {

    'use strict';

    // configurable paths for the app
    var appConfig = {
        dist: 'app/assets',
        build: 'app/build',
        script: 'app/scripts',
        scss: 'app/scss',
        compressName: 'archive.zip'
    };

    // project configuration
    grunt.initConfig({

        // project settings
        theme: appConfig,

        /**
         * Task configuration
         */
        // clean dist folder
        clean: {
            build: '<%= theme.build %>',
            dist: '<%= theme.dist %>',
            compress: '<%= theme.compressName %>'
        },

        // copy files and folders
        copy: {
            pro: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'node_modules',
                        dest: '<%= theme.build %>/css/',
                        src: [
                            'bootstrap/dist/css/bootstrap.css'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'node_modules',
                        dest: '<%= theme.build %>/js/',
                        src: [
                            'jquery/jquery.js'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'app',
                        dest: '<%= theme.dist %>/img/',
                        src: [
                            'images/*'
                        ]
                    }
                ]
            }
        },

        // compile sass to css
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'expanded'
                },
                files: {
                    '<%= theme.build %>/css/main.css': '<%= theme.scss %>/main.scss',
                    '<%= theme.build %>/css/popup.css': '<%= theme.scss %>/popup.scss',
                    '<%= theme.build %>/css/sample.css': '<%= theme.scss %>/sample.scss'
                }
            }
        },

        // validate css files
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist: {
                src: [
                    '<%= theme.build %>/css/main.css',
                    '<%= theme.build %>/css/popup.css',
                    '<%= theme.build %>/css/sample.css'
                ]
            }
        },

        // minify css files
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            main: {
                dest: '<%= theme.dist %>/css/main.min.css',
                src: [
                    '<%= theme.build %>/css/main.css'
                ]
            },
            popup: {
                dest: '<%= theme.dist %>/css/popup.min.css',
                src: [
                    '<%= theme.build %>/css/popup.css'
                ]
            },
            sample: {
                dest: '<%= theme.dist %>/css/sample.min.css',
                src: [
                    '<%= theme.build %>/css/bootstrap.css',
                    '<%= theme.build %>/css/sample.css'
                ]
            }
        },

        // validate js files
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            assets: {
                src: [
                    '<%= theme.script %>/contentscript.js',
                    '<%= theme.script %>/popup.js',
                    '<%= theme.script %>/sample.js'
                ]
            }
        },

        // minify js files
        uglify: {
            options: {
                compress: {
                    warnings: false
                },
                report: 'min',
                mangle: true
            },
            main: {
                files: {
                    '<%= theme.dist %>/js/main.min.js': [
                        '<%= theme.script %>/jquery-1.8.0.min.js',
                        '<%= theme.script %>/markdown-it.min.js',
                        '<%= theme.script %>/contentscript.js'
                    ]
                }
            },
            popup: {
                files: {
                    '<%= theme.dist %>/js/popup.min.js': [
                        '<%= theme.build %>/js/jquery.js',
                        '<%= theme.script %>/popup.js'
                    ]
                }
            },
            sample: {
                files: {
                    '<%= theme.dist %>/js/sample.min.js': [
                        '<%= theme.build %>/js/jquery.js',
                        '<%= theme.script %>/markdown-it.min.js',
                        '<%= theme.script %>/sample.js'
                    ]
                }
            }
        },

        // Watch for changes in live edit
        watch: {
            options: {
                livereload: 35729
            },
            css: {
                files: [
                    '<%= theme.build %>/css/style.css'
                ]
            },
            sass: {
                files: [
                    '<%= theme.scss %>/*.scss'
                ],
                options: {
                    livereload: false
                },
                tasks: [
                    'sass',
                    'cssmin'
                ]
            },
            js: {
                files: [
                    '<%= theme.script %>/*.js'
                ],
                tasks: [
                    'uglify'
                ]
            },
            grunt: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },

        compress: {
            main: {
                options: {
                    archive: '<%= theme.compressName %>'
                },
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: [
                        '_locales/**',
                        'assets/**',
                        'pages/**',
                        'manifest.json'
                    ],
                    dest: '/'
                }]
            }
        }

    });

    // load the Grunt plugins
    require('load-grunt-tasks')(grunt);

    // show grunt task time
    require('time-grunt')(grunt);

    grunt.registerTask('lint', [
        'compress',
        'jshint'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'sass',
        'cssmin',
        'uglify'
    ]);

    grunt.registerTask('pro', [
        'build',
        'compress'
    ]);

    grunt.registerTask('dev', [
        'build',
        'watch'
    ]);

    grunt.registerTask('default', [
        'pro'
    ]);

    grunt.registerTask('update_manifest', function () {
        var manifestFile = 'app/manifest.json';
        var manifestObject = grunt.file.readJSON(manifestFile);//get file as json object
        console.log(project);

        grunt.file.write(manifestFile, JSON.stringify(manifestObject, null, 2));//serialize it back to file
    });

};
