var worker = new Worker('doWork2.js');

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
  }, 5000) // every 5 seconds

  // register
  navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  }).then(register => {
    console.log('[Register ServiceWorker] We are live 🚀 !')
  }).catch(e => {
    console.warn('service worker failed', e)
  })
}