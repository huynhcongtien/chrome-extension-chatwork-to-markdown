'use strict';

module.exports = function (grunt) {

    // configurable paths for the app
    var appConfig = {
        dist            : 'app/assets/dist',
        build           : 'app/assets/build',
        src             : 'app/assets/src',
        compressFileName: 'archive.zip'
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
            build   : '<%= theme.build %>',
            dist    : '<%= theme.dist %>',
            compress: '<%= theme.compressFileName %>'
        },

        // copy files and folders
        copy: {
            pro: {
                files: [
                    {
                        expand : true,
                        flatten: true,
                        cwd    : 'node_modules',
                        dest   : '<%= theme.build %>/css/',
                        src    : [
                            'bootstrap/dist/css/bootstrap.css'
                        ]
                    },
                    {
                        expand : true,
                        flatten: true,
                        cwd    : 'node_modules',
                        dest   : '<%= theme.build %>/js/',
                        src    : [
                            'jquery/dist/jquery.js'
                        ]
                    },
                    {
                        expand : true,
                        flatten: true,
                        cwd    : 'app',
                        dest   : '<%= theme.dist %>/img/',
                        src    : [
                            'assets/src/img/*'
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
                    style    : 'expanded'
                },
                files  : {
                    '<%= theme.build %>/css/main.css'  : '<%= theme.src %>/sass/main.scss',
                    '<%= theme.build %>/css/popup.css' : '<%= theme.src %>/sass/popup.scss',
                    '<%= theme.build %>/css/sample.css': '<%= theme.src %>/sass/sample.scss'
                }
            }
        },

        // validate css files
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            dist   : {
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
            main   : {
                dest: '<%= theme.dist %>/css/main.min.css',
                src : [
                    '<%= theme.build %>/css/main.css'
                ]
            },
            popup  : {
                dest: '<%= theme.dist %>/css/popup.min.css',
                src : [
                    '<%= theme.build %>/css/popup.css'
                ]
            },
            sample : {
                dest: '<%= theme.dist %>/css/sample.min.css',
                src : [
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
            assets : {
                src: [
                    '<%= theme.src %>/js/contentscript.js',
                    '<%= theme.src %>/js/popup.js',
                    '<%= theme.src %>/js/sample.js'
                ]
            }
        },

        // minify js files
        uglify: {
            options   : {
                compress: {
                    warnings: false
                },
                report  : 'min',
                mangle  : true
            },
            // pro    : {
            //     files: {
            //         '<%= theme.dist %>/js/main.min.js'      : [
            //             '<%= theme.src %>/js/jquery-1.8.0.min.js',
            //             '<%= theme.src %>/js/markdown-it.min.js',
            //             '<%= theme.src %>/js/contentscript.js'
            //         ],
            //         '<%= theme.dist %>/js/popup.min.js'     : [
            //             '<%= theme.build %>/js/jquery.js',
            //             '<%= theme.src %>/js/popup.js'
            //         ],
            //         '<%= theme.dist %>/js/sample.min.js'    : [
            //             '<%= theme.build %>/js/jquery.js',
            //             '<%= theme.src %>/js/markdown-it.min.js',
            //             '<%= theme.src %>/js/sample.js'
            //         ],
            //         '<%= theme.dist %>/js/background.min.js': [
            //             '<%= theme.src %>/js/background.js'
            //         ]
            //     }
            // },
            // dev    : {
            //     files: {
            //         '<%= theme.dist %>/js/main.min.js'      : [
            //             '<%= theme.src %>/js/jquery-1.8.0.min.js',
            //             '<%= theme.src %>/js/markdown-it.min.js'
            //         ],
            //         '<%= theme.dist %>/js/popup.min.js'     : [
            //             '<%= theme.build %>/js/jquery.js'
            //         ],
            //         '<%= theme.dist %>/js/sample.min.js'    : [
            //             '<%= theme.build %>/js/jquery.js',
            //             '<%= theme.src %>/js/markdown-it.min.js'
            //         ],
            //         '<%= theme.dist %>/js/background.min.js': [
            //             '<%= theme.src %>/js/background.js'
            //         ]
            //     }
            // },
            main      : {
                files: {
                    '<%= theme.dist %>/js/main.min.js': [
                        '<%= theme.src %>/js/jquery-1.8.0.min.js',
                        '<%= theme.src %>/js/markdown-it.min.js',
                        '<%= theme.src %>/js/contentscript.js'
                    ]
                }
            },
            popup     : {
                files: {
                    '<%= theme.dist %>/js/popup.min.js': [
                        '<%= theme.build %>/js/jquery.js',
                        '<%= theme.src %>/js/popup.js'
                    ]
                }
            },
            sample    : {
                files: {
                    '<%= theme.dist %>/js/sample.min.js': [
                        '<%= theme.build %>/js/jquery.js',
                        '<%= theme.src %>/js/markdown-it.min.js',
                        '<%= theme.src %>/js/sample.js'
                    ]
                }
            },
            background: {
                files: {
                    '<%= theme.dist %>/js/background.min.js': [
                        '<%= theme.src %>/js/background.js'
                    ]
                }
            }
        },

        // Watch for changes in live edit
        watch: {
            options      : {
                livereload: 35729
            },
            css          : {
                files: [
                    '<%= theme.build %>/css/style.css'
                ]
            },
            sass         : {
                files  : [
                    '<%= theme.src %>/sass/*.scss'
                ],
                options: {
                    livereload: false
                },
                tasks  : [
                    'sass',
                    'cssmin',
                    'notify:watch_sass'
                ]
            },
            js_main      : {
                files: [
                    '<%= theme.src %>/js/contentscript.js'
                ],
                tasks: [
                    'uglify:main',
                    'notify:watch_js'
                ]
            },
            js_popup     : {
                files: [
                    '<%= theme.src %>/js/popup.js'
                ],
                tasks: [
                    'uglify:popup',
                    'notify:watch_js'
                ]
            },
            js_sample    : {
                files: [
                    '<%= theme.src %>/js/sample.js'
                ],
                tasks: [
                    'uglify:sample',
                    'notify:watch_js'
                ]
            },
            js_background: {
                files: [
                    '<%= theme.src %>/js/background.js'
                ],
                tasks: [
                    'uglify:background',
                    'notify:watch_js'
                ]
            },
            grunt        : {
                files  : ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },

        notify: {
            watch_sass    : {
                options: {
                    message: 'SASS finished running' //required
                }
            },
            watch_js      : {
                options: {
                    message: 'JS has changed' //required
                }
            },
            watch_html    : {
                options: {
                    message: 'Reload view completed'
                }
            },
            watch_dev     : {
                options: {
                    message: 'Dev is ready'
                }
            },
            watch_compress: {
                options: {
                    message: 'Compress is completed'
                }
            }
        },

        compress: {
            main: {
                options: {
                    archive: '<%= theme.compressFileName %>'
                },
                files  : [{
                    expand: true,
                    cwd   : 'app/',
                    src   : [
                        '_locales/**',
                        'assets/dist/**',
                        'pages/**',
                        'manifest.json'
                    ],
                    dest  : '/'
                }]
            }
        }

    });

    // load the Grunt plugins
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

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
        'update_manifest:0',
        'build',
        'compress',
        'notify:watch_compress'
    ]);

    grunt.registerTask('dev', [
        'update_manifest:1',
        'build',
        'notify:watch_dev',
        'watch'
    ]);

    grunt.registerTask('default', [
        'pro'
    ]);

    grunt.registerTask('update_manifest', function (is_not_product) {
        var manifestFile   = 'app/manifest.json',
            manifestObject = grunt.file.readJSON(manifestFile);//get file as json object

        manifestObject.background.scripts = [
            'assets/dist/js/background.min.js'
        ];

        if (typeof is_not_product === 'undefined') {
            is_not_product = 1;
        }

        is_not_product = parseInt(is_not_product);

        if (is_not_product) {
            manifestObject.background.scripts.push('assets/src/js/chromereload.js');
        }

        grunt.file.write(manifestFile, JSON.stringify(manifestObject, null, 4));//serialize it back to file
    });

};
