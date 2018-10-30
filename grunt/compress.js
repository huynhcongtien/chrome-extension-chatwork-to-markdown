/**
 * Compress files and folders
 */
module.exports = function(grunt) {

    return {
        main: {
            options: {
                archive: '<%= theme.compressFileName %>'
            },
            files  : [{
                expand: true,
                cwd   : 'app/',
                src   : [
                    '_locales/**',
                    'assets/dist/**',
                    'pages/**',
                    'manifest.json'
                ],
                dest  : '/'
            }]
        }
    }

};
