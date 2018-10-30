/**
 * Copy files and folders
 */
module.exports = function(grunt) {

    return {
        pro: {
            files: [
                {
                    expand : true,
                    flatten: true,
                    cwd    : 'node_modules',
                    dest   : '<%= theme.build %>/css/',
                    src    : [
                        'bootstrap/dist/css/bootstrap.css'
                    ]
                },
                {
                    expand : true,
                    flatten: true,
                    cwd    : 'node_modules',
                    dest   : '<%= theme.build %>/js/',
                    src    : [
                        'jquery/dist/jquery.js'
                    ]
                },
                {
                    expand : true,
                    flatten: true,
                    cwd    : 'app',
                    dest   : '<%= theme.dist %>/img/',
                    src    : [
                        'assets/src/img/*'
                    ]
                }
            ]
        }
    }

};
