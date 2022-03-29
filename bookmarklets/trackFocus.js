javascript:(function () { /* jshint ignore:line */
  /*
     Tracks which element currently has active focus in the console.
     Toggles on and off.
  */

  /* logs whenever focus changes (whenever a focus event is fired) on a page */

  'use strict';

  /* globals console */

  if (!window.FOCUS_TRACKING_ENABLED) {
    window.FOCUS_TRACKING_HANDLER = function () {
      console.info(['FOCUS', document.activeElement]);
    };

    document.addEventListener('focus', window.FOCUS_TRACKING_HANDLER, true);

    window.FOCUS_TRACKING_ENABLED = true;

    console.info('Focus Tracking enabled.');
  } else {
    document.removeEventListener('focus', window.FOCUS_TRACKING_HANDLER, true);

    delete window.FOCUS_TRACKING_ENABLED;
    delete window.FOCUS_TRACKING_HANDLER;

    console.info('Focus Tracking disabled.');
  }
})();
