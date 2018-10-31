'use strict';

/**
 * Bump package version, create tag, commit, push...
 */
module.exports = function () {

    return {
        options: {
            files             : [
                'package.json',
                'app/manifest.json'
            ],
            updateConfigs     : [],
            commit            : true,
            commitMessage     : 'Release v%VERSION%',
            commitFiles       : [
                'package.json',
                'app/manifest.json'
            ],
            createTag         : false,
            tagName           : 'v%VERSION%',
            tagMessage        : 'Version %VERSION%',
            push              : false,
            pushTo            : 'origin',
            gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
            globalReplace     : false,
            prereleaseName    : 'rc',
            metadata          : '',
            regExp            : false
        }
    };

};
