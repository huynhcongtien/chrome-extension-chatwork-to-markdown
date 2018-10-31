'use strict';

/**
 * Interactive prompt for your Grunt config using console checkboxes, text input with filtering, password fields.
 */
module.exports = function (grunt) {

    const semver         = require('semver');
    const currentVersion = grunt.file.readJSON('package.json').version;

    return {
        bump: {
            options: {
                questions: [
                    {
                        config : 'bump.prompt.increment',
                        type   : 'list',
                        message: 'Bump version from ' + '<%= pkg.version %>' + ' to:',
                        choices: [
                            {
                                value: 'build',
                                name : 'Build:  ' + (currentVersion + '-?') + ' Unstable, betas, and release candidates.'
                            },
                            {
                                value: 'patch',
                                name : 'Patch:  ' + semver.inc(currentVersion, 'patch') + ' Backwards-compatible bug fixes.'
                            },
                            {
                                value: 'minor',
                                name : 'Minor:  ' + semver.inc(currentVersion, 'minor') + ' Add functionality in a backwards-compatible manner.'
                            },
                            {
                                value: 'major',
                                name : 'Major:  ' + semver.inc(currentVersion, 'major') + ' Incompatible API changes.'
                            },
                            {
                                value: 'custom',
                                name : 'Custom: ?.?.? Specify version...'
                            }
                        ]
                    },
                    {
                        config  : 'bump.prompt.version',
                        type    : 'input',
                        message : 'What specific version would you like',
                        when    : function (answers) {
                            return answers['bump.prompt.increment'] === 'custom';
                        },
                        validate: function (value) {
                            var valid = semver.valid(value);
                            return !!valid || 'Must be a valid semver, such as 1.2.3-rc1. See http://semver.org/ for more details.';
                        }
                    },
                    {
                        config : 'bump.prompt.useDefaults',
                        type   : 'confirm',
                        message: 'Use default values ([config/mastack | .mastack/src]/grunt/actions/bump.js) ?',
                        default: false
                    },
                    {
                        config : 'bump.prompt.files',
                        type   : 'checkbox',
                        message: 'What should get the new version:',
                        choices: [
                            {
                                value  : 'package',
                                name   : 'package.json' + (!grunt.file.isFile('package.json') ? ' not found, will create one' : ''),
                                checked: grunt.file.isFile('package.json')
                            },
                            {
                                value  : 'bower',
                                name   : 'bower.json' + (!grunt.file.isFile('bower.json') ? ' not found, will create one' : ''),
                                checked: grunt.file.isFile('bower.json')
                            }
                        ],
                        when   : function (answers) {
                            return answers['bump.prompt.useDefaults'] === false;
                        }
                    }
                ],
                then     : function (results) {
                    //console.log(grunt.config('bump'));

                    if (results['bump.prompt.increment'] === 'custom') {
                        // Run task with custom number
                        grunt.task.run([
                            // 'bump-only --setversion=' + results['bump.prompt.version'], // not run -> error
                            'shell:target:' + results['bump.prompt.version'],
                            //'changelog',
                            'bump-commit'
                        ]);
                    } else {
                        grunt.task.run([
                            'bump-only:' + results['bump.prompt.increment'],
                            //'changelog',
                            'bump-commit'
                        ]);
                    }
                }
            }
        }
    };

};
