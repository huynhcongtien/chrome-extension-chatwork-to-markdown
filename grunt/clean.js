/**
 * Clean dist folder
 */
module.exports = function(grunt) {

    return {
        build   : '<%= theme.build %>',
        dist    : '<%= theme.dist %>',
        compress: '<%= theme.compressFileName %>'
    }

};
