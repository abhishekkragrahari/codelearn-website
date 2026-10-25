// Runs JavaScript in a Web Worker so an endless loop can never freeze the page.
// Usage: CSRunner.run(code, { onLine(kind, text) }) -> Promise<{ timedOut }>
(function () {
  var TIMEOUT_MS = 5000;

  // This function is stringified and becomes the worker's whole program.
  // It reports "done" once the code has finished AND no timers are pending,
  // so setTimeout examples print everything before the run ends.
  function workerMain(inspect) {
    var timers = new Set();
    var mainDone = false;
    var nativeSetTimeout = self.setTimeout, nativeClearTimeout = self.clearTimeout;
    var nativeSetInterval = self.setInterval, nativeClearInterval = self.clearInterval;

    function send(kind, args) {
      postMessage({ kind: kind, text: Array.prototype.map.call(args, function (a) { return inspect(a); }).join(' ') });
    }
    function report(err) {
      postMessage({ kind: 'error', text: err && err.name ? err.name + ': ' + err.message : 'Uncaught ' + inspect(err, true) });
    }
    function checkDone() {
      if (mainDone && timers.size === 0) postMessage({ kind: 'done' });
    }
    function guarded(fn, args) {
      try { if (typeof fn === 'function') fn.apply(null, args); } catch (err) { report(err); }
    }

    console.log = console.info = console.debug = function () { send('log', arguments); };
    console.warn = function () { send('warn', arguments); };
    console.error = function () { send('error', arguments); };

    self.setTimeout = function (fn, ms) {
      var args = Array.prototype.slice.call(arguments, 2);
      var id = nativeSetTimeout(function () {
        timers.delete(id);
        guarded(fn, args);
        checkDone();
      }, ms);
      timers.add(id);
      return id;
    };
    self.clearTimeout = function (id) {
      nativeClearTimeout(id);
      timers.delete(id);
      checkDone();
    };
    self.setInterval = function (fn, ms) {
      var args = Array.prototype.slice.call(arguments, 2);
      var id = nativeSetInterval(function () { guarded(fn, args); }, ms);
      timers.add(id);
      return id;
    };
    self.clearInterval = function (id) {
      nativeClearInterval(id);
      timers.delete(id);
      checkDone();
    };
    self.addEventListener('unhandledrejection', function (e) {
      postMessage({ kind: 'error', text: 'Uncaught (in promise) ' + inspect(e.reason, true) });
    });

    self.onmessage = function (e) {
      var AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      var fn;
      try {
        fn = new AsyncFunction(e.data); // async, so top-level await works
      } catch (err) {
        report(err);
        postMessage({ kind: 'done' });
        return;
      }
      fn().catch(report).then(function () {
        mainDone = true;
        checkDone();
      });
    };
  }

  var url = null;
  function run(code, opts) {
    opts = opts || {};
    var onLine = opts.onLine || function () {};
    if (!url) {
      var src = '(' + workerMain.toString() + ')(' + window.CSInspect.toString() + ');';
      url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
    }
    return new Promise(function (resolve) {
      var worker = new Worker(url);
      var finished = false;
      function finish(timedOut) {
        if (finished) return;
        finished = true;
        clearTimeout(hardStop);
        worker.terminate();
        resolve({ timedOut: timedOut });
      }
      var hardStop = setTimeout(function () {
        onLine('error', 'Stopped: the code ran for more than ' + TIMEOUT_MS / 1000 +
          ' seconds (an endless loop, or a setInterval that is never cleared?)');
        finish(true);
      }, TIMEOUT_MS);
      worker.onmessage = function (e) {
        if (e.data.kind === 'done') finish(false);
        else onLine(e.data.kind, e.data.text);
      };
      worker.onerror = function (e) {
        e.preventDefault();
        onLine('error', e.message || 'Error');
        finish(false);
      };
      worker.postMessage(code);
    });
  }

  window.CSRunner = { run: run };
})();
