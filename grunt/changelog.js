'use strict';

/**
 * Changelog
 */
module.exports = function () {

    return {
        sample: {
            options: {
                logArguments: [
                    '--pretty=* %h - %ad: %s',
                    '--no-merges',
                    '--date=short'
                ],
                template    : '{{> features}}',
                featureRegex: /^(.*)$/gim,
                partials    : {
                    features: '{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n',
                    feature : '- {{this}} {{this.date}}\n'
                }
            }
        }
    }

};
