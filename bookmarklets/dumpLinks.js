javascript:(
  function () {
    /* Logs all links in the console. */

    const links = Array.from(document.links).map(function (link) {
      return link.href;
    }).join('\n');
    console.log(links);
  }
)();
