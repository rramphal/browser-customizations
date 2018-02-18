// ==UserScript==
// @name         Don't Make Me Watch
// @namespace    https://github.com/NavinF/
// @version      1
// @description  Keeps pages from detecting when the user has switched tabs/windows.
// @author       Navin Francis
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    for (var event_name of ['visibilitychange', 'webkitvisibilitychange', 'blur']) {
        window.addEventListener(event_name, function (event) {
            event.stopImmediatePropagation();
            console.log('Blocked ' + event_name + ' event');
        }, true);
    }
})();
