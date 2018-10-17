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

function convertToMarkdown(source) {
    return mdHtml.render(source);
}

$(function() {

    var link    = document.createElement('link');
    link.href   = chrome.extension.getURL('assets/css/main.min.css');
    link.type   = 'text/css';
    link.rel    = 'stylesheet';
    (document.head || document.documentElement).appendChild(link);

    mdInit();

    // create an observer instance
    var observer = new MutationObserver(function (mutations) {
        console.log(mutations);
        mutations.forEach(function (mutation) {
            console.log(mutation);
            if (mutation.type === 'childList') {
                $.each(mutation.addedNodes, function(index, node) {
                    if (node.nodeName === 'DIV') {
                        var msgArea     = $(node).find('.timelineMessage__content'),
                            msgContent  = msgArea.find('pre');

                        if (typeof msgContent[0] !== 'undefined') {
                            //var messageText = msgContent.text();
                            var messageHtml = msgContent.html();

                            console.log(messageHtml);

                            var msgExtract  = messageHtml.split('\n'),
                                makeMdLink  = '',
                                msgNewArr   = [];

                            msgExtract.forEach(function(str) {
                                makeMdLink = str;

                                var link        = makeMdLink.match(/\[(.+?)\]/g),
                                    multiLink   = makeMdLink.match(/\[(.+?)\]\((.+?)<\/a>/g),
                                    createDiv   = '';

                                if (multiLink && link) {
                                    $.each(multiLink, function(index, subStr) {
                                        createDiv   = $(subStr);
                                        makeMdLink  = makeMdLink.replace(subStr, link[index] + '(' + createDiv.attr('href'));
                                    });
                                }

                                var imgLink = makeMdLink.match(/\[(.+?)\]:\s<a(.+?)<\/a>/);

                                if (imgLink) {
                                    makeMdLink = makeMdLink.replace($(makeMdLink)[0].outerHTML, $(makeMdLink).html());
                                }

                                var extractTo = str.match(/<div data-cwtag="\[To:/);

                                if (extractTo) {
                                    makeMdLink = '<div class="line">' + makeMdLink + '</div>';
                                }

                                var extractRe = str.match(/<div data-cwtag="\[rp/);

                                if (extractRe) {
                                    makeMdLink = '<div class="line">' + makeMdLink;
                                }

                                var extractReEnd = str.match(/<\/svg><\/div><img class="/);

                                if (extractReEnd) {
                                    makeMdLink = makeMdLink + '</div>';
                                }

                                msgNewArr.push(makeMdLink);
                            });

                            var msgNew = msgNewArr.join('\n');

                            var message = msgNew.replace(/&gt;/g, '>');
                                message = message.replace(/&lt;/g, '<');

                            var msgConverted    = convertToMarkdown(message),
                                msgContentClass = msgContent.attr('class'),
                                newBox          = '<div class="' + msgContentClass + '">' + msgConverted + '</div>';

                            msgContent.remove();
                            msgArea.append(newBox);
                        }
                    }
                });
            }
        });

        //target[0].scrollTop = target[0].scrollHeight;
    });

    // configuration of the observer
    var config = {
        childList: true,
        attributes: false,
        characterData: true,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: true
    };

    // pass in the target node, as well as the observer options
    function observerInit() {
        // select the target node
        var target = $('#root .timeLine');

        console.log($('#root .timeLine'));
        if (!target.length) {
            return;
        }
        observer.observe(target[0], config);
    }

    setTimeout(observerInit, 1000);

});
