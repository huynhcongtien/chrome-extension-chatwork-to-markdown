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
                        config : 'bump.prompt.incrementBuild',
                        type   : 'list',
                        message: 'Bump version build:',
                        choices: [
                            {
                                value: 'prepatch',
                                name : 'Prepatch:  ' + semver.inc(currentVersion, 'prepatch')
                            },
                            {
                                value: 'preminor',
                                name : 'Preminor:  ' + semver.inc(currentVersion, 'preminor')
                            },
                            {
                                value: 'premajor',
                                name : 'Premajor:  ' + semver.inc(currentVersion, 'premajor')
                            },
                            {
                                value: 'git',
                                name : 'Git:  ' + (currentVersion + '-') + 'xxxxx (xxxxx is git commit ID)'
                            },
                            {
                                value: 'prerelease',
                                name : 'Prerelease:  ' + semver.inc(currentVersion, 'prerelease')
                            }
                        ],
                        when   : function (answers) {
                            return answers['bump.prompt.increment'] === 'build';
                        }
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
                                value  : 'package.json',
                                name   : 'package.json' + (!grunt.file.isFile('package.json') ? ' not found, will create one' : ''),
                                checked: grunt.file.isFile('package.json')
                            },
                            {
                                value  : 'app/manifest.json',
                                name   : 'manifest.json' + (!grunt.file.isFile('app/manifest.json') ? ' not found, will create one' : ''),
                                checked: grunt.file.isFile('package.json')
                            }
                        ],
                        default: ['package.json', 'app/manifest.json'],
                        when   : function (answers) {
                            return answers['bump.prompt.useDefaults'] === false;
                        }
                    },
                    {
                        config : 'bump.prompt.isCommit',
                        type   : 'confirm',
                        message: 'Do you want to commit?',
                        default: false,
                        when   : function (answers) {
                            return answers['bump.prompt.useDefaults'] === false;
                        }
                    }
                ],
                then     : function (results) {
                    // resetting options of bump task
                    if (results['bump.prompt.useDefaults'] === false) {
                        grunt.config.data.bump.options.files       = results['bump.prompt.files'];
                        grunt.config.data.bump.options.commitFiles = results['bump.prompt.files'];
                        grunt.config.data.bump.options.commit      = results['bump.prompt.isCommit'];
                    }

                    switch (results['bump.prompt.increment']) {
                        case 'custom':
                            grunt.task.run(
                                // 'bump-only --setversion=' + results['bump.prompt.version'],
                                // not run -> error: shell task is instance of bump-only
                                'shell:bumpVersion:' + results['bump.prompt.version']
                            );
                            break;

                        case 'build':
                            grunt.task.run('bump:' + results['bump.prompt.incrementBuild'] + ':bump-only');
                            break;

                        default:
                            grunt.task.run('bump-only:' + results['bump.prompt.increment']);
                            break;
                    }

                    grunt.task.run([
                        //'changelog',
                        'bump-commit'
                    ]);
                }
            }
        }
    };

};
