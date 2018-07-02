// ==UserScript==
// @name         LinkedIn Remove Modal
// @version      1.0
// @description  Remove login modal for LinkedIn.
// @author       Ravi S. Rāmphal
// @match        https://www.linkedin.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var body = document.body;
    var node = document.getElementById('advocate-modal');
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }

    body.style.overflow = "visible";
})();
