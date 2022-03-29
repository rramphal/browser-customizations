javascript:(function () {
  /* Shows the link `href` alongside the link text for every link on a page. */
  Array.from(document.querySelectorAll('a')).forEach((link) => link.innerHTML += ' (' + link.href + ')');
})();
