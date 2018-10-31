'use strict';

/**
 * Run shell commands by grunt
 */
module.exports = function () {

    return {
        options    : {
            stderr: false
        },
        bumpVersion: {
            command: option => 'grunt bump-only --setversion=' + option
        }
    };

};
