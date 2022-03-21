javascript:(
  function () {
    let style = document.createElement('style');
    style.innerText = `
      html, body {
        background-color: black;
      }
    `;
    document.querySelector('head').appendChild(style);
    document.getElementById('_topBtn').remove();
  }
)();
