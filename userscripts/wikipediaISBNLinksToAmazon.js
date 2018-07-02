// ==UserScript==
// @name         Wikipedia ISBN Links to Amazon
// @version      1.0
// @description  Replace all ISBN links in Wikipedia pages to links to Amazon.
// @author       Ravi S. Rāmphal
// @match        http*://en.wikipedia.org/wiki/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll('a[href*="Special:BookSources"]').forEach(function (link) {
        link.setAttribute('href', 'https://amzn.com/' + link.href.substr(link.href.lastIndexOf('/') + 1).replace(/[ -]/g, ''));
    });
})();
