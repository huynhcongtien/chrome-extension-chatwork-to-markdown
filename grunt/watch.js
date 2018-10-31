'use strict';

/**
 * Watch for changes in live edit
 */
module.exports = function () {

    return {
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
    };

};
