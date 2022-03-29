// ==UserScript==
// @name     Orange Anus
// @version    1.0
// @description  Replace all Donald Trump references with Orange Anus. Inspired by http://donaldjdrumpf.com/.
// @author     Ravi S. Rāmphal
// @match    http*://*/*
// @grant    none
// ==/UserScript==

(function() {
  'use strict';

  function handleText(textNode)
  {
    var v = textNode.nodeValue;

    v = v.replace(/\bDonald Trump\b/g, 'Orange Anus');
    v = v.replace(/\bDONALD TRUMP\b/g, 'ORANGE ANUS');
    v = v.replace(/\bDonald J Trump\b/g, 'Orange Anus');
    v = v.replace(/\bDonald J\. Trump\b/g, 'Orange Anus');
    v = v.replace(/\bDonald John Trump\b/g, 'Orange Anus');
    v = v.replace(/\bdonaldjtrump\b/g, 'orangeanus');
    v = v.replace(/\bdonaldtrump\b/g, 'orangeanus');
    v = v.replace(/\brealdonaldtrump\b/g, 'realorangeanus');
    v = v.replace(/\brealDonaldTrump\b/g, 'realOrangeAnus');

    v = v.replace(/\bTrump's\b/g, 'Orange Anus\'');
    v = v.replace(/\bTrump\b/g, 'Orange Anus');
    v = v.replace(/\bTRUMP\b/g, 'ORANGE ANUS');
    v = v.replace(/\bMake America Great Again\b/g, 'Make Anus Orange Again');
    v = v.replace(/\bMake America Great Again!\b/g, 'Make Anus Orange Again!');

    textNode.nodeValue = v;
  }

  function walk(node)
  {
    // Source: http://is.gd/mwZp7E

    var child, next;

    switch ( node.nodeType )
    {
      case 1:  // Element
      case 9:  // Document
      case 11: // Document fragment
        child = node.firstChild;
        while ( child )
        {
          next = child.nextSibling;
          walk(child);
          child = next;
        }
        break;

      case 3: // Text node
        handleText(node);
        break;
    }
  }

  walk(document.body);

  setTimeout(function () {
    walk(document.body);
  }, 100);

  setTimeout(function () {
    walk(document.body);
  }, 500);

  setTimeout(function () {
    walk(document.body);
  }, 1000);

  setTimeout(function () {
    walk(document.body);
  }, 2000);

  document.addEventListener('DOMContentLoaded', function() {
    walk(document.body);
  }, false);

  window.addEventListener('hashchange', function () {
    walk(document.body);
  }, false);

  window.addEventListener('popstate', function () {
    walk(document.body);
  }, false);
})();
