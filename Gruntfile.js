/* global __dirname */

module.exports = function(grunt) {

    'use strict';

    var path = require('path');

    // configurable paths for the app
    var appConfig = {
        project: path.basename(__dirname),
        app: 'app',
        dist: 'public',
        build: 'build',
        debug: {
            port: 5000
        }
    };

    var deployDate  = "<%= _.slugify(deployDate) %>",
        deployDir   = {
            dev: 'deploys/' + deployDate + '/development',
            pro: 'deploys/' + deployDate + '/production'
        },
        deployConfig = {
            dev: {
                env: deployDir.dev + '/.env'
            },
            pro: {
                env: deployDir.pro + '/.env'
            }
        };

    // project configuration
    grunt.initConfig({

        // project settings
        theme: appConfig,

        // deploy setting
        deploy: deployConfig,

        // metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * <%%= pkg.description %> v<%%= pkg.version %> (<%%= pkg.homepage %>)\n' +
            ' * Copyright <%%= grunt.template.today("yyyy") %> <%%= pkg.author %>\n' +
            ' * Licensed under the <%%= pkg.license %> license\n' +
            ' */\n',

        /**
         * Task configuration
         */
        // clean dist folder
        clean: {
            build: '<%%= theme.build %>',
            dist: '<%%= theme.dist %>'
        },

        // copy files and folders
        copy: {
            pro: {
                files: [
                    {   // copy .env
                        expand: true,
                        flatten: true,
                        dest: '',
                        src: '<%%= deploy.pro.env %>'
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'node_modules',
                        dest: '<%%= theme.build %>/css/',
                        src: [
                            'bootstrap/dist/css/bootstrap.css',
                            'font-awesome/css/font-awesome.css'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'node_modules',
                        dest: '<%%= theme.build %>/js/',
                        src: [
                            'bootstrap/dist/js/bootstrap.js',
                            'jquery/dist/jquery.js'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        dest: '<%%= theme.dist %>/fonts',
                        src: [
                            'node_modules/bootstrap/fonts/*',
                            'node_modules/font-awesome/fonts/*',
                            '<%%= theme.app %>/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        dest: '<%%= theme.dist %>/img',
                        src: [
                            '<%%= theme.app %>/img/*'
                        ]
                    }
                ]
            },
            dev: {
                files: [
                    {   // copy .env
                        expand: true,
                        flatten: true,
                        dest: '',
                        src: [
                            '<%%= deploy.dev.env %>'
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
                    'app/styles/main.css': 'app/styles/main.scss'
                }
            }
        },

        // validate css files
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist: {
                src: '<%%= theme.build %>/css/style.css'
            }
        },

        // minify css files
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            pro: {
                dest: '<%%= theme.dist %>/css/core.min.css',
                src: [
                    '<%%= theme.build %>/css/bootstrap.css',
                    '<%%= theme.build %>/css/font-awesome.css',
                    '<%%= theme.build %>/css/style.css'
                ]
            },
            dev: {
                dest: '<%%= theme.dist %>/css/core.min.css',
                src: [
                    '<%%= theme.build %>/css/bootstrap.css',
                    '<%%= theme.build %>/css/font-awesome.css'
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
                    '<%%= theme.app %>/js/script.js'
                ]
            }
        },

        // minify js files
        uglify: {
            options: {
                banner: '<%%= banner %>',
                compress: {
                    warnings: false
                },
                report: 'min',
                mangle: true
            },
            pro: {
                files: {
                    '<%%= theme.dist %>/js/core.min.js': [
                        '<%%= theme.build %>/js/jquery.js',
                        '<%%= theme.build %>/js/bootstrap.js',
                        '<%%= theme.app %>/js/script.js'
                    ]
                }
            },
            dev: {
                files: {
                    '<%%= theme.dist %>/js/core.min.js': [
                        '<%%= theme.build %>/js/jquery.js',
                        '<%%= theme.build %>/js/bootstrap.js'
                    ]
                }
            }
        },

        // Watch for changes in live edit
        watch: {
            options: {
                livereload: 14541
            },
            css: {
                files: [
                    '<%= theme.build %>/css/style.css'
                ]
            },
            sass: {
                files: [
                    'app/styles/main.scss'
                ],
                options: {
                    livereload: false
                },
                tasks: [
                    'sass'
                ]
            },
            js: {
                files: [
                    '<%= theme.app %>/js/script.js'
                ]
            },
            html: {
                files: [
                    'index.php'
                ]
            },
            grunt: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },

        open: {
            dev: {
                path: 'http://localhost/<%%= theme.project %>',
                app: 'Chrome'
            }
        }

    });

    // load the Grunt plugins
    require('load-grunt-tasks')(grunt);

    // show grunt task time
    require('time-grunt')(grunt);

    grunt.registerTask('lint', [
        'csslint',
        'jshint'
    ]);

    // register the grunt tasks
    grunt.registerTask('pro', [
        'clean',
        'copy:pro',
        'sass',
        'cssmin:pro',
        'uglify:pro'
    ]);

    grunt.registerTask('dev', [
        'clean',
        'copy:pro',
        'copy:dev',
        'cssmin:dev',
        'sass',
        'uglify:dev'
    ]);

    grunt.registerTask('live', [
        'dev',
        'open:dev',
        'watch'
    ]);

    grunt.registerTask('default', [
        'pro',
        'open:dev'
    ]);

};
