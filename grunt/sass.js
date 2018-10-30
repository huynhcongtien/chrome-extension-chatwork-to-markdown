/**
 * Compile sass to css
 */
module.exports = function(grunt) {

    return {
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
    }

};
