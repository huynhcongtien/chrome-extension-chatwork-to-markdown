'use strict';

/**
 * Run shell commands by grunt
 */
module.exports = function () {

    return {
        options: {
            stderr: false
        },
        target : {
            command: version => 'grunt bump::bump-only --setversion=' + version
        }
    };

};
