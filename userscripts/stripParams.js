// ==UserScript==
// @name         Strip Params
// @version      1.0
// @description  Strips a predefined set of params from a page's location and all of its links.
// @author       Ravi S. Rāmphal
// @match        http*://*/*
// @grant        none
// ==/UserScript==

(function() {
    // adapted from https://davidwalsh.name/remove-utm-parameters-urls

    'use strict';

    // ====== GUARD CLAUSES ======
    if (!history.replaceState)   { return; } // missing functionality
    if (!window.location.search) { return; } // nothing to work on

    // ====== CONSTANTS ======
    const TARGETS = {
        '.*' : [
            // Google Analytics
            'utm_campaign',
            'utm_content',
            'utm_medium',
            'utm_source',
            'utm_term',
        ],

        'amazon\\.com' : [
            // Amazon
            'pf_rd_i',
            'pf_rd_m',
            'pf_rd_p',
            'pf_rd_r',
            'pf_rd_s',
            'pf_rd_t',
            'tag',
        ],
    };

    const DOMAINS = Object.keys(TARGETS);

    const PRE  = '([&?])';
    const POST = '=(?:[_a-zA-Z0-9=]+)';

    // ====== LOGIC ======
    function stripParams (url) {
        let replacement = url;

        DOMAINS.forEach((domain) => {
            if ((new RegExp(domain)).test(url)) {
                TARGETS[domain].forEach((target) => {
                    if (url.indexOf(target) !== -1) { // if the target can be found
                        const pattern = new RegExp(PRE + target + POST);
                        replacement = replacement.replace(pattern, "$1");
                    }
                });
            }
        });

        replacement = replacement
                    .replace(/&{2,}/, '&') // strip repeated ampersands
                    .replace(/[?&]$/, '')  // strip trailing query string characters
        ;

        return replacement;
    }

    function processLocation () {
        const oldURL = window.location.toString();
        const newURL = stripParams(oldURL);

        if (newURL !== oldURL) { // only replace state when there is actually a change to be made
            history.replaceState({}, '', newURL);
        }
    }

    function processLinks () {
        const links = Array.from(document.links);

        links.forEach((link) => {
            const oldURL = link.href;
            const newURL = stripParams(oldURL);

            if (newURL !== oldURL) {
                link.href = newURL;
            }
        });
    }

    processLocation();
    processLinks();
})();
