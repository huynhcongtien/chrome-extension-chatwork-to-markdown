'use strict';

/**
 * Automatic Notifications when Grunt tasks running
 */
module.exports = function () {

    return {
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
    };

};
