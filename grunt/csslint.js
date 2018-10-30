/**
 * Validate css files
 */
module.exports = function(grunt) {

    return {
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
    }

};
