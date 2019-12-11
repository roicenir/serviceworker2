self.addEventListener('message', function(e) {
    self.postMessage(e.data);
  }, false);

 // https://www.html5rocks.com/pt/tutorials/workers/basics/