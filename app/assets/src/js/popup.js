'use strict';

$(function() {

    $('.sample').click(function() {
        var samplePage = chrome.extension.getURL('pages/sample.html');
        window.open(samplePage, '_blank');
    });

});
