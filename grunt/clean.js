'use strict';

/**
 * Clean dist folder
 */
module.exports = function () {

    return {
        build   : '<%= theme.build %>',
        dist    : '<%= theme.dist %>',
        compress: '<%= theme.compressFileName %>'
    };

};
