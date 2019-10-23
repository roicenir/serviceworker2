var worker = new Worker('doWork2.js');
// AQUI COMEÇA O WEBTORRENT

var WebTorrent = require('webtorrent')

var client = new WebTorrent()

// Sintel, a free, Creative Commons movie
var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

client.add(torrentId, function (torrent) {
  // Torrents can contain many files. Let's use the .mp4 file
  var file = torrent.files.find(function (file) {
    return file.name.endsWith('.mp4')
  })

  // Display the file by adding it to the DOM.
  // Supports video, audio, image files, and more!
  file.appendTo('body')
})

// AQUI TERMINA O WEBTORRENT

worker.addEventListener('message', function (e) {
  console.log('Worker said: ', e.data);
}, false);

worker.postMessage('Hello World'); // Send data to our worker.


document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

// https://www.html5rocks.com/pt/tutorials/workers/basics/ >> WEBWORKER

// REGISTRO DO SW

//if ("serviceWorker" in navigator) {
//  window.addEventListener("load", function() {
//    navigator.serviceWorker.register("sw.js").then(
//      function(registration) {
//        // Registration was successful
//        console.log(
//          "ServiceWorker registration successful with scope: ",
//          registration.scope
//       );
//      },
//      function(err) {
//        // registration failed :(
//       console.log("ServiceWorker registration failed: ", err);
//      }
//    );
//  });
//}

if ('serviceWorker' in navigator) {
  // observe messages
  navigator.serviceWorker.addEventListener('message', event => {
    if ('cmd' in event.data) {
      let command = event.data.cmd
      switch (command) {
        case 'response':
          console.log('[ServiceWorker Response]: ', event.data.data)
          break
      }
    }
  })
  // simple lógic
  setInterval(() => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        cmd: 'executa-funcao'
      })
    }
  }, 1000) // every 5 seconds

  // register
  navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  }).then(register => {
    console.log('[Register ServiceWorker] We are live 🚀 !')
  }).catch(e => {
    console.warn('service worker failed', e)
  })
}