javascript:(
  fetch(ytInitialPlayerResponse.captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl)
    .then((response) => {
      if (response.status === 200) {
        response.text().then((text) => {
          const blob = new Blob([text], { type: 'text/plain' });

          const author = document.querySelector('.ytd-channel-name').innerText.trim();
          const title = document.querySelector('h1.title.ytd-video-primary-info-renderer').innerText.trim();
          const id = window.location.toString().split('=')[1];
          const filename = `[${author}] ${title} (yt_${id}).ttml`;

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
        });
      } else {
        Promise.reject(new Error('Transcript not available'));
      }
    })
    .catch((error) => alert(error.message))
)
