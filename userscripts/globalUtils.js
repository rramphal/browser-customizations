// ==UserScript==
// @name         Global Utils
// @version      1.0
// @description  Adds functions to all pages.
// @author       Ravi S. Rāmphal
// @match        http*://*/*
// @grant        none
// ==/UserScript==

(function setupGlobalUtils () {
  console.info('injecting global utilities');

  if (window.globalUtils === undefined) window.globalUtils = {};

  // modified from https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server/33542499#33542499
  window.globalUtils._download = (name, data, inputFormat = 'text') => {
    const FORMATS = {
      'csv'  : { extension: 'csv',  mime: 'text/csv' },
      'html' : { extension: 'html', mime: 'text/html' },
      'json' : { extension: 'json', mime: 'application/json' },
      'text' : { extension: 'txt',  mime: 'text/plain' },
      'tsv'  : { extension: 'tsv',  mime: 'text/tab-separated-values' },
    };

    let format = inputFormat;
    if (!FORMATS.hasOwnProperty.call(FORMATS, inputFormat)) { format = 'text'; }
    const { extension, mime } = FORMATS[format];

    const filename = `${name}.${extension}`;
    const blob = new Blob([data], { type: mime });

    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const element = window.document.createElement('a');
      element.href = window.URL.createObjectURL(blob);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }

  window.globalUtils.downloadCSV = (name, data) => {
    window.globalUtils._download(name, data, 'csv');
  }

  window.globalUtils.downloadHTML = (name, data) => {
    window.globalUtils._download(name, data, 'html');
  }

  window.globalUtils.downloadJSON = (name, data) => {
    window.globalUtils._download(name, data, 'json');
  }

  window.globalUtils.downloadText = (name, data) => {
    window.globalUtils._download(name, data, 'text');
  }

  window.globalUtils.downloadTSV = (name, data) => {
    window.globalUtils._download(name, data, 'tsv');
  }
  
  window.globalUtils.shortDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    
    let month = '' + (date.getMonth() + 1);
    let day   = '' + date.getDate();
    
    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    return [year, month, day].join('.');
  }
}());
