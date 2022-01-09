// ==UserScript==
// @name         List Purchased Kindle Titles As SQL
// @version      1.0
// @description  List purchased Kindle titles as SQL insert commands.
// @author       Ravi S. Rāmphal
// @match        https://www.amazon.com/hz/mycd/digital-console/contentlist/booksAll/dateDsc/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  let titles = [...document.querySelectorAll('.digital_entity_title')];
  titles.reverse();

  let output = 'INSERT INTO kindle_books (kindle_asin, title, is_deleted) VALUES\n';

  output += titles.map((title) => {
    const asin          = title.id.replace('content-title-', '');
    const escaped_title = title.innerText.replaceAll("'", "''");

    return `('${asin}', '${escaped_title}', '0')`;
  }).join(',\n');

  output += ';';

  console.log(output);
})();
