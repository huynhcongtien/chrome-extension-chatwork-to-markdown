'use strict';

/**
 * Minify css files
 */
module.exports = function () {

    return {
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
    };

};
