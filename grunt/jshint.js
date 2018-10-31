'use strict';

/**
 * Validate js files
 */
module.exports = function () {

    return {
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
    };

};
