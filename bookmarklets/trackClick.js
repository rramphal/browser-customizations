javascript:(function () { /* jshint ignore:line */
    /* logs whenever a click event is fired on a page */

    'use strict';

    /* globals console */

    if (!window.CLICK_TRACKING_ENABLED) {
        window.CLICK_TRACKING_HANDLER = function (event) {
            console.info(['CLICK', event.target]);
        };

        document.addEventListener('click', window.CLICK_TRACKING_HANDLER, true);

        window.CLICK_TRACKING_ENABLED = true;

        console.info('Click Tracking enabled.');
    } else {
        document.removeEventListener('click', window.CLICK_TRACKING_HANDLER, true);

        delete window.CLICK_TRACKING_ENABLED;
        delete window.CLICK_TRACKING_HANDLER;

        console.info('Click Tracking disabled.');
    }
})();
