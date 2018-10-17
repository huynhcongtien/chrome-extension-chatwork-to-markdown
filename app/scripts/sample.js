'use strict';

var mdHtml = null;

var defaults = {
    html: true,                 // Enable HTML tags in source
    xhtmlOut: false,            // Use '/' to close single tags (<br />)
    breaks: false,              // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',    // CSS language prefix for fenced blocks
    linkify: true,              // autoconvert URL-like texts to links
    typographer: true,          // Enable smartypants and other sweet transforms
    _view: 'html'               // html / src / debug
};

defaults.highlight = function (str, lang) {
    var esc = mdHtml.utils.escapeHtml;

    if (lang && hljs.getLanguage(lang)) {
        try {
            return '<pre class="hljs"><code class="' + lang + '">' +
                hljs.highlight(lang, str, true).value +
                '</code></pre>';
        } catch (__) {
        }
    }

    return '<pre class="hljs"><code>' + esc(str) + '</code></pre>';
};

function mdInit() {
    mdHtml = window.markdownit(defaults)
        .use(window.markdownitEmoji)
        .use(window.markdownitSub)
        .use(window.markdownitSup)
        .use(window.markdownitIns)
        .use(window.markdownitMark)
        .use(window.markdownitFootnote)
        .use(window.markdownitDeflist)
        .use(window.markdownitAbbr)
        .use(window.markdownitCentertext)
        ;

    // Beautify output of parser for html content
    mdHtml.renderer.rules.table_open = function () {
        return '<table class="table table-striped">\n';
    };

    // Replace emoji codes with images
    mdHtml.renderer.rules.emoji = function(token, idx) {
        return window.twemoji.parse(token[idx].content);
    };

    // setting for container plugin
    var containerClass = ['success', 'warning', 'info', 'danger'];

    containerClass.forEach(function(className) {
        mdHtml.use(window.markdownitContainer, className);

        var tagOpen = 'container_' + className + '_open';
        var tagHtml = '<div class="alert alert-' + className + '">';

        mdHtml.renderer.rules[tagOpen] = function() {
            return tagHtml;
        };
    });
}

function updateResult() {
    var source = $('.source textarea').val();
    $('.result').html(mdHtml.render(source));
}

$(function() {

    mdInit();
    updateResult();

    $('.source textarea').on('keyup paste cut mouseup', function() {
        updateResult();
    });

    var elScroll    = $('.source textarea, .result'),
        scrollTimer = 0;

    var syncScroll = function() {
        clearTimeout(scrollTimer);
        var el_others   = elScroll.not(this).off('scroll'),
            percentage  = this.scrollTop / (this.scrollHeight - this.offsetHeight);

        el_others.each(function() {
            var el_other = $(this);

            if (el_other.is(':visible')) {
                var other = el_other.get(0);

                other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);

                scrollTimer = setTimeout( function(){ elScroll.on('scroll', syncScroll); }, 150);
            }
        });
    };

    elScroll.on('scroll', syncScroll);

});
