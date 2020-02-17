// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dragdrop.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (a) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = a();else if ("function" == typeof define && define.amd) define([], a);else {
    var b;
    b = "undefined" == typeof window ? "undefined" == typeof global ? "undefined" == typeof self ? this : self : global : window, b.DragDrop = a();
  }
})(function () {
  return function () {
    function b(d, e, g) {
      function a(j, i) {
        if (!e[j]) {
          if (!d[j]) {
            var f = "function" == typeof require && require;
            if (!i && f) return f(j, !0);
            if (h) return h(j, !0);
            var c = new Error("Cannot find module '" + j + "'");
            throw c.code = "MODULE_NOT_FOUND", c;
          }

          var k = e[j] = {
            exports: {}
          };
          d[j][0].call(k.exports, function (b) {
            var c = d[j][1][b];
            return a(c || b);
          }, k, k.exports, b, d, e, g);
        }

        return e[j].exports;
      }

      for (var h = "function" == typeof require && require, c = 0; c < g.length; c++) {
        a(g[c]);
      }

      return a;
    }

    return b;
  }()({
    1: [function (a, b) {
      function c() {
        throw new Error("setTimeout has not been defined");
      }

      function d() {
        throw new Error("clearTimeout has not been defined");
      }

      function e(a) {
        if (l === setTimeout) return setTimeout(a, 0);
        if ((l === c || !l) && setTimeout) return l = setTimeout, setTimeout(a, 0);

        try {
          return l(a, 0);
        } catch (b) {
          try {
            return l.call(null, a, 0);
          } catch (b) {
            return l.call(this, a, 0);
          }
        }
      }

      function f(a) {
        if (m === clearTimeout) return clearTimeout(a);
        if ((m === d || !m) && clearTimeout) return m = clearTimeout, clearTimeout(a);

        try {
          return m(a);
        } catch (b) {
          try {
            return m.call(null, a);
          } catch (b) {
            return m.call(this, a);
          }
        }
      }

      function g() {
        q && o && (q = !1, o.length ? p = o.concat(p) : r = -1, p.length && h());
      }

      function h() {
        if (!q) {
          var a = e(g);
          q = !0;

          for (var b = p.length; b;) {
            for (o = p, p = []; ++r < b;) {
              o && o[r].run();
            }

            r = -1, b = p.length;
          }

          o = null, q = !1, f(a);
        }
      }

      function j(a, b) {
        this.fun = a, this.array = b;
      }

      function k() {}

      var l,
          m,
          n = b.exports = {};

      (function () {
        try {
          l = "function" == typeof setTimeout ? setTimeout : c;
        } catch (a) {
          l = c;
        }

        try {
          m = "function" == typeof clearTimeout ? clearTimeout : d;
        } catch (a) {
          m = d;
        }
      })();

      var o,
          p = [],
          q = !1,
          r = -1;
      n.nextTick = function (a) {
        var b = Array(arguments.length - 1);
        if (1 < arguments.length) for (var c = 1; c < arguments.length; c++) {
          b[c - 1] = arguments[c];
        }
        p.push(new j(a, b)), 1 !== p.length || q || e(h);
      }, j.prototype.run = function () {
        this.fun.apply(null, this.array);
      }, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = k, n.addListener = k, n.once = k, n.off = k, n.removeListener = k, n.removeAllListeners = k, n.emit = k, n.prependListener = k, n.prependOnceListener = k, n.listeners = function () {
        return [];
      }, n.binding = function () {
        throw new Error("process.binding is not supported");
      }, n.cwd = function () {
        return "/";
      }, n.chdir = function () {
        throw new Error("process.chdir is not supported");
      }, n.umask = function () {
        return 0;
      };
    }, {}],
    2: [function (a, b) {
      (function (a) {
        b.exports = function (b, c) {
          function d(b) {
            function d() {
              c && c(b, f), c = null;
            }

            i ? a.nextTick(d) : d();
          }

          function e(a, b, c) {
            f[a] = c, (0 == --g || b) && d(b);
          }

          var f,
              g,
              h,
              i = !0;
          Array.isArray(b) ? (f = [], g = b.length) : (h = Object.keys(b), f = {}, g = h.length), g ? h ? h.forEach(function (a) {
            b[a](function (b, c) {
              e(a, b, c);
            });
          }) : b.forEach(function (a, b) {
            a(function (a, c) {
              e(b, a, c);
            });
          }) : d(null), i = !1;
        };
      }).call(this, a("_process"));
    }, {
      _process: 1
    }],
    "/": [function (a, b) {
      function c(a, b) {
        function e(a) {
          a.readEntries(function (a) {
            0 < a.length ? (g = g.concat(Array.from(a)), e()) : f();
          });
        }

        function f() {
          d(g.map(function (a) {
            return function (b) {
              c(a, b);
            };
          }), function (c, d) {
            c ? b(c) : (d.push({
              fullPath: a.fullPath,
              name: a.name,
              isFile: !1,
              isDirectory: !0
            }), b(null, d));
          });
        }

        var g = [];
        if (a.isFile) a.file(function (c) {
          c.fullPath = a.fullPath, c.isFile = !0, c.isDirectory = !1, b(null, c);
        }, function (a) {
          b(a);
        });else if (a.isDirectory) {
          var _b = a.createReader();

          e(_b);
        }
      }

      b.exports = function (a, b) {
        function e(a) {
          return b.onDragEnter && b.onDragEnter(a), a.stopPropagation(), a.preventDefault(), !1;
        }

        function f(c) {
          if (c.stopPropagation(), c.preventDefault(), b.onDragOver && b.onDragOver(c), c.dataTransfer.items) {
            var _a = Array.from(c.dataTransfer.items),
                _d = _a.filter(function (a) {
              return "file" === a.kind;
            }),
                _e = _a.filter(function (a) {
              return "string" === a.kind;
            });

            if (0 === _d.length && !b.onDropText) return;
            if (0 === _e.length && !b.onDrop) return;
            if (0 === _d.length && 0 === _e.length) return;
          }

          return a.classList.add("drag"), clearTimeout(j), c.dataTransfer.dropEffect = "copy", !1;
        }

        function g(a) {
          return a.stopPropagation(), a.preventDefault(), b.onDragLeave && b.onDragLeave(a), clearTimeout(j), j = setTimeout(i, 50), !1;
        }

        function h(a) {
          a.stopPropagation(), a.preventDefault(), b.onDragLeave && b.onDragLeave(a), clearTimeout(j), i();
          var e = {
            x: a.clientX,
            y: a.clientY
          },
              f = a.dataTransfer.getData("text");

          if (f && b.onDropText && b.onDropText(f, e), b.onDrop && a.dataTransfer.items) {
            var _f = a.dataTransfer.files,
                _g = Array.from(a.dataTransfer.items).filter(function (a) {
              return "file" === a.kind;
            });

            if (0 === _g.length) return;
            d(_g.map(function (a) {
              return function (b) {
                c(a.webkitGetAsEntry(), b);
              };
            }), function (a, c) {
              if (a) throw a;
              var d = c.flat(),
                  g = d.filter(function (a) {
                return a.isFile;
              }),
                  h = d.filter(function (a) {
                return a.isDirectory;
              });
              b.onDrop(g, e, _f, h);
            });
          }

          return !1;
        }

        function i() {
          a.classList.remove("drag");
        }

        if ("string" == typeof a) {
          var _b2 = a;
          if (a = window.document.querySelector(a), !a) throw new Error("\"".concat(_b2, "\" does not match any HTML elements"));
        }

        if (!a) throw new Error("\"".concat(a, "\" is not a valid HTML element"));
        "function" == typeof b && (b = {
          onDrop: b
        });
        var j;
        return a.addEventListener("dragenter", e, !1), a.addEventListener("dragover", f, !1), a.addEventListener("dragleave", g, !1), a.addEventListener("drop", h, !1), function () {
          i(), a.removeEventListener("dragenter", e, !1), a.removeEventListener("dragover", f, !1), a.removeEventListener("dragleave", g, !1), a.removeEventListener("drop", h, !1);
        };
      };

      var d = a("run-parallel");
    }, {
      "run-parallel": 2
    }]
  }, {}, [])("/");
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44151" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dragdrop.min.js"], null)
//# sourceMappingURL=/dragdrop.min.26482e4f.js.map