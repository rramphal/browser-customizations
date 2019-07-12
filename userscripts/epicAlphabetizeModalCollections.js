// ==UserScript==
// @name         Epic! > Alphabetize Modal Collections
// @version      1.0
// @description  Alphabetize listing of collections in modal on Epic!.
// @author       Ravi S. Rāmphal
// @match        https://www.getepic.com/app/*
// @grant        none
// ==/UserScript=='

let intervalID;

function format (input) {
  const pattern = /^\d{3} /;
  return (pattern.test(input) ? '0' : '') + input;
}

function epicAlphabetizeCollections () {
  const container = document.querySelector('epic-modal .collections-list');

  if (container) {
    const items = Array.from(container.querySelectorAll('.collection-row'));

    if (items && items.length) {
      items.sort((a, b) => {
        const formattedA = format(a.innerText);
        const formattedB = format(b.innerText);
        return formattedB.localeCompare(formattedA);
      });

      items.forEach((item) => {
        container.prepend(item);
      });

      clearInterval(intervalID);
    }
  }
}

function epicSetObserver () {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (mutation.target.classList.contains('modal-open')) {
          intervalID = setInterval(epicAlphabetizeCollections, 100);
        } /* else {
        console.log('modal closed');
      } */
      }
    });
  });

  observer.observe(document.body, { attributes: true });
}

epicSetObserver();
