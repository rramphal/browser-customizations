// ==UserScript==
// @name         Epic! > Alphabetize Collections
// @version      1.0
// @description  Alphabetize listing of collections on Epic!.
// @author       Ravi S. Rāmphal
// @match        https://www.getepic.com/app/*
// @grant        none
// ==/UserScript==

let intervalID;

function format (input) {
  const pattern = /^\d{3} /;
  return (pattern.test(input) ? '0' : '') + input;
}

function epicAlphabetizeCollections () {
  if (window.location.href.includes('my-library/collections')) {
    const container = document.querySelector('.my-library-collections-container');

    if (container) {
      const items = Array.from(container.querySelectorAll('.collection-item'));

      if (items && items.length) {
        items.sort((a, b) => {
          const formattedA = format(a.querySelector('h3').innerText);
          const formattedB = format(b.querySelector('h3').innerText);
          return formattedB.localeCompare(formattedA);
        });

        items.forEach((item) => {
          container.prepend(item);
        });

        clearInterval(intervalID);
      }
    }
  }
}

intervalID = setInterval(epicAlphabetizeCollections, 100);
