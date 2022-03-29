javascript:(function () {
  /* Loads the latest version of jQuery into the page. */

  var jQN = document.createElement('script');
    jQN.src  = '//code.jquery.com/jquery-latest.min.js';
    jQN.type = 'text/javascript';
  document.querySelector('head').appendChild(jQN);
})();
