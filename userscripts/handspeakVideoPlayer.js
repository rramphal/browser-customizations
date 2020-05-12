// ==UserScript==
// @name         Handspeak Video Player
// @version      1.0
// @description  Loosen up the video player on Handspeak.
// @author       Ravi S. Rāmphal
// @match        http*://*.handspeak.com/
// @grant        none
// ==/UserScript==

(function() {
  const videos = document.querySelectorAll('video');
  Array.from(videos).forEach((video) => {
    video.onmousedown = () => {}; // no-op
    video.controls = true; // show controls
    video.loop = true; // loop video
  });
})();
