(function() {
    function d(s, e, n) {
        function t(o, i) {
            if (!e[o]) {
                if (!s[o]) {
                    var l = "function" == typeof require && require;
                    if (!i && l)
                        return l(o, !0);
                    if (r)
                        return r(o, !0);
                    var c = new Error("Cannot find module '" + o + "'");
                    throw c.code = "MODULE_NOT_FOUND",
                    c
                }
                var a = e[o] = {
                    exports: {}
                };
                s[o][0].call(a.exports, function(e) {
                    var r = s[o][1][e];
                    return t(r || e)
                }, a, a.exports, d, s, e, n)
            }
            return e[o].exports
        }
        for (var r = "function" == typeof require && require, a = 0; a < n.length; a++)
            t(n[a]);
        return t
    }
    return d
}
)()({
    1: [function(e, t, n) {
        var r = n.logElem = document.querySelector(".log")
          , a = document.querySelector(".speed")
          , o = document.querySelector("#logHeading");
        n.log = function(e) {
            if (o.style.display = "block",
            "string" == typeof e) {
                var t = document.createElement("p");
                return t.innerHTML = e,
                r.appendChild(t),
                t
            }
            return r.appendChild(e),
            n.lineBreak(),
            e
        }
        ,
        n.lineBreak = function() {
            r.appendChild(document.createElement("br"))
        }
        ,
        n.updateSpeed = function(e) {
            a.innerHTML = e
        }
        ,
        n.warning = function(e) {
            console.error(e.stack || e.message || e),
            n.log(e.message || e)
        }
        ,
        n.error = function(e) {
            console.error(e.stack || e.message || e);
            var t = n.log(e.message || e);
            t.style.color = "red",
            t.style.fontWeight = "bold"
        }
    }
    , {}],
    2: [function(e) {
        (function(t) {
            function n() {
                function e() {
                    var e = decodeURIComponent(window.location.hash.substring(1)).trim();
                    "" !== e && d(e)
                }
                k.WEBRTC_SUPPORT || v.error("This browser is unsupported. Please use a browser with WebRTC support."),
                E(function() {});
                var t = document.querySelector("input[name=upload]");
                t && w(t, function(e, t) {
                    return e ? v.error(e) : void (t = t.map(function(e) {
                        return e.file
                    }),
                    a(t))
                }),
                p("body", a);
                var n = document.querySelector("form");
                n && n.addEventListener("submit", function(t) {
                    t.preventDefault(),
                    d(document.querySelector("form input[name=torrentId]").value.trim())
                }),
                e(),
                window.addEventListener("hashchange", e),
                "registerProtocolHandler"in navigator && navigator.registerProtocolHandler("magnet", window.location.origin + "#%s", "Instant.io")
            }
            function r(e) {
                h.concat({
                    url: "/__rtcConfig__",
                    timeout: 5e3
                }, function(t, n, r) {
                    if (t || 200 !== n.statusCode)
                        e(new Error("Could not get WebRTC config from server. Using default (without TURN)."));
                    else {
                        var a;
                        try {
                            a = JSON.parse(r)
                        } catch (t) {
                            return e(new Error("Got invalid WebRTC config from server: " + r))
                        }
                        delete a.comment,
                        f("got rtc config: %o", a),
                        e(null, a)
                    }
                })
            }
            function a(e) {
                f("got files:"),
                e.forEach(function(e) {
                    f(" - %s (%s bytes)", e.name, e.size)
                }),
                e.filter(o).forEach(s),
                l(e.filter(i))
            }
            function o(e) {
                var t = g.extname(e.name).toLowerCase();
                return ".torrent" === t
            }
            function i(e) {
                return !o(e)
            }
            function d(e) {
                var t = S.some(function(t) {
                    return 0 <= e.indexOf(t)
                });
                t ? v.log("File not found " + e) : (v.log("Downloading torrent from " + e),
                E(function(t, n) {
                    return t ? v.error(t) : void n.add(e, c)
                }))
            }
            function s(e) {
                v.log("Downloading torrent from <strong>" + e.name + "</strong>"),
                E(function(t, n) {
                    return t ? v.error(t) : void n.add(e, c)
                })
            }
            function l(e) {
                0 === e.length || (v.log("Seeding " + e.length + " files"),
                E(function(t, n) {
                    return t ? v.error(t) : void n.seed(e, c)
                }))
            }
            function c(e) {
                function t() {
                    var t = (100 * e.progress).toFixed(1), n;
                    e.done ? n = "Done." : (n = e.timeRemaining === 1 / 0 ? "Infinity years" : m(e.timeRemaining, 0, {
                        includeSeconds: !0
                    }),
                    n = n[0].toUpperCase() + n.substring(1) + " remaining."),
                    v.updateSpeed("<b>Peers:</b> " + e.numPeers + " <b>Progress:</b> " + t + "% <b>Download speed:</b> " + _(window.client.downloadSpeed) + "/s <b>Upload speed:</b> " + _(window.client.uploadSpeed) + "/s <b>ETA:</b> " + n)
                }
                e.on("warning", v.warning),
                e.on("error", v.error);
                var n = document.querySelector("input[name=upload]");
                n.value = n.defaultValue;
                var r = g.basename(e.name, g.extname(e.name)) + ".torrent";
                console.log(e.magnetURI);
                v.log("\"" + r + "\" contains " + e.files.length + " files:"),
                e.files.forEach(function(e) {
                    v.log("&nbsp;&nbsp;- " + e.name + " (" + _(e.length) + ")")
                }),
                v.log("<a href=\"" + e.magnetURI + "\" target=\"_blank\">[Magnet URI]</a>"),
                e.on("download", b(t, 250)),
                e.on("upload", b(t, 250)),
                setInterval(t, 5e3),
                t(),
                
                e.files.forEach(function(e) {
                    e.appendTo(v.logElem, {
                        maxBlobLength: 2000000000
                    }, function(e) {
                        if (e)
                            return v.error(e)
                    }),
                    e.getBlobURL(function(t, n) {
                        if (t)
                            return v.error(t);
                        var r = document.createElement("a");
                        r.target = "_blank",
                        r.download = e.name,
                        r.href = n,
                        r.textContent = "Download " + e.name,
                        v.log(r)
                    })
                });
                var a = document.createElement("a");
                a.href = "#",
                a.target = "_blank",
                a.textContent = "Download all files as zip",
                a.addEventListener("click", function(t) {
                    var n = 0
                      , r = g.basename(e.name, g.extname(e.name)) + ".zip"
                      , a = new x;
                    t.preventDefault(),
                    e.files.forEach(function(t) {
                        t.getBlob(function(o, i) {
                            return n += 1,
                            o ? v.error(o) : void (a.file(t.path, i),
                            n === e.files.length && (1 < e.files.length && (a = a.folder(e.name)),
                            a.generateAsync({
                                type: "blob"
                            }).then(function(e) {
                                var t = URL.createObjectURL(e)
                                  , n = document.createElement("a");
                                n.download = r,
                                n.href = t,
                                n.click(),
                                setTimeout(function() {
                                    URL.revokeObjectURL(t)
                                }, 30000)
                            }, v.error)))
                        })
                    })
                }),
                v.log(a)
            }
            var u = e("create-torrent")
              , f = e("debug")("instant.io")
              , p = e("drag-drop")
              , h = e("simple-get")
              , m = e("date-fns/formatDistance")
              , g = e("path")
              , _ = e("prettier-bytes")
              , b = e("throttleit")
              , y = e("thunky")
              , w = e("upload-element")
              , k = e("webtorrent")
              , x = e("jszip")
              , v = e("./util");
            t.WEBTORRENT_ANNOUNCE = u.announceList.map(function(e) {
                return e[0]
            }).filter(function(e) {
                return 0 === e.indexOf("wss://") || 0 === e.indexOf("ws://")
            });
            var S = ["6feb54706f41f459f819c0ae5b560a21ebfead8f"]
              , E = y(function(e) {
                r(function(t, n) {
                    t && v.error(t);
                    var r = new k({
                        tracker: {
                            rtcConfig: n
                        }
                    });
                    window.client = r,
                    r.on("warning", v.warning),
                    r.on("error", v.error),
                    e(null, r)
                })
            });
            n()
        }
        ).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {
        "./util": 1,
        "create-torrent": 27,
        "date-fns/formatDistance": 36,
        debug: 49,
        "drag-drop": 51,
        jszip: 75,
        path: 133,
        "prettier-bytes": 135,
        "simple-get": 169,
        throttleit: 201,
        thunky: 202,
        "upload-element": 211,
        webtorrent: 218
    }],
    3: [function(e, t) {
        const n = /^\[?([^\]]+)\]?:(\d+)$/;
        let r = {}
          , a = 0;
        t.exports = function(e) {
            if (1e5 === a && t.exports.reset(),
            !r[e]) {
                const t = n.exec(e);
                if (!t)
                    throw new Error(`invalid addr: ${e}`);
                r[e] = [t[1], +t[2]],
                a += 1
            }
            return r[e]
        }
        ,
        t.exports.reset = function() {
            r = {},
            a = 0
        }
    }
    , {}],
    4: [function(e, t, n) {
        'use strict';
        function r(e) {
            var t = e.length;
            if (0 < t % 4)
                throw new Error("Invalid string. Length must be a multiple of 4");
            var n = e.indexOf("=");
            -1 === n && (n = t);
            var r = n === t ? 0 : 4 - n % 4;
            return [n, r]
        }
        function a(e, t, n) {
            return 3 * (t + n) / 4 - n
        }
        function o(e) {
            var t = r(e), n = t[0], o = t[1], d = new f(a(e, n, o)), s = 0, l = 0 < o ? n - 4 : n, c, p;
            for (p = 0; p < l; p += 4)
                c = u[e.charCodeAt(p)] << 18 | u[e.charCodeAt(p + 1)] << 12 | u[e.charCodeAt(p + 2)] << 6 | u[e.charCodeAt(p + 3)],
                d[s++] = 255 & c >> 16,
                d[s++] = 255 & c >> 8,
                d[s++] = 255 & c;
            return 2 === o && (c = u[e.charCodeAt(p)] << 2 | u[e.charCodeAt(p + 1)] >> 4,
            d[s++] = 255 & c),
            1 === o && (c = u[e.charCodeAt(p)] << 10 | u[e.charCodeAt(p + 1)] << 4 | u[e.charCodeAt(p + 2)] >> 2,
            d[s++] = 255 & c >> 8,
            d[s++] = 255 & c),
            d
        }
        function d(e) {
            return c[63 & e >> 18] + c[63 & e >> 12] + c[63 & e >> 6] + c[63 & e]
        }
        function s(e, t, n) {
            for (var r = [], a = t, o; a < n; a += 3)
                o = (16711680 & e[a] << 16) + (65280 & e[a + 1] << 8) + (255 & e[a + 2]),
                r.push(d(o));
            return r.join("")
        }
        function l(e) {
            for (var t = e.length, n = t % 3, r = [], a = 16383, o = 0, d = t - n, l; o < d; o += a)
                r.push(s(e, o, o + a > d ? d : o + a));
            return 1 === n ? (l = e[t - 1],
            r.push(c[l >> 2] + c[63 & l << 4] + "==")) : 2 === n && (l = (e[t - 2] << 8) + e[t - 1],
            r.push(c[l >> 10] + c[63 & l >> 4] + c[63 & l << 2] + "=")),
            r.join("")
        }
        n.byteLength = function(e) {
            var t = r(e)
              , n = t[0]
              , a = t[1];
            return 3 * (n + a) / 4 - a
        }
        ,
        n.toByteArray = o,
        n.fromByteArray = l;
        for (var c = [], u = [], f = "undefined" == typeof Uint8Array ? Array : Uint8Array, p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, m = p.length; h < m; ++h)
            c[h] = p[h],
            u[p.charCodeAt(h)] = h;
        u[45] = 62,
        u[95] = 63
    }
    , {}],
    5: [function(e, t) {
        function n(e, t, n) {
            for (var r = 0, a = 1, o = t, d; o < n; o++) {
                if (d = e[o],
                58 > d && 48 <= d) {
                    r = 10 * r + (d - 48);
                    continue
                }
                if (o !== t || 43 !== d) {
                    if (o === t && 45 === d) {
                        a = -1;
                        continue
                    }
                    if (46 === d)
                        break;
                    throw new Error("not a number: buffer[" + o + "] = " + d)
                }
            }
            return r * a
        }
        function r(e, t, n, o) {
            return null == e || 0 === e.length ? null : ("number" != typeof t && null == o && (o = t,
            t = void 0),
            "number" != typeof n && null == o && (o = n,
            n = void 0),
            r.position = 0,
            r.encoding = o || null,
            r.data = a.isBuffer(e) ? e.slice(t, n) : a.from(e),
            r.bytes = r.data.length,
            r.next())
        }
        var a = e("safe-buffer").Buffer;
        const o = 101;
        r.bytes = 0,
        r.position = 0,
        r.data = null,
        r.encoding = null,
        r.next = function() {
            switch (r.data[r.position]) {
            case 100:
                return r.dictionary();
            case 108:
                return r.list();
            case 105:
                return r.integer();
            default:
                return r.buffer();
            }
        }
        ,
        r.find = function(e) {
            for (var t = r.position, n = r.data.length, a = r.data; t < n; ) {
                if (a[t] === e)
                    return t;
                t++
            }
            throw new Error("Invalid data: Missing delimiter \"" + String.fromCharCode(e) + "\" [0x" + e.toString(16) + "]")
        }
        ,
        r.dictionary = function() {
            r.position++;
            for (var e = {}; r.data[r.position] !== o; )
                e[r.buffer()] = r.next();
            return r.position++,
            e
        }
        ,
        r.list = function() {
            r.position++;
            for (var e = []; r.data[r.position] !== o; )
                e.push(r.next());
            return r.position++,
            e
        }
        ,
        r.integer = function() {
            var e = r.find(o)
              , t = n(r.data, r.position + 1, e);
            return r.position += e + 1 - r.position,
            t
        }
        ,
        r.buffer = function() {
            var e = r.find(58)
              , t = n(r.data, r.position, e)
              , a = ++e + t;
            return r.position = a,
            r.encoding ? r.data.toString(r.encoding, e, a) : r.data.slice(e, a)
        }
        ,
        t.exports = r
    }
    , {
        "safe-buffer": 166
    }],
    6: [function(e, t) {
        function n(e, t, a) {
            var o = []
              , i = null;
            return n._encode(o, e),
            i = r.concat(o),
            n.bytes = i.length,
            r.isBuffer(t) ? (i.copy(t, a),
            t) : i
        }
        var r = e("safe-buffer").Buffer;
        n.bytes = -1,
        n._floatConversionDetected = !1,
        n.getType = function(e) {
            return r.isBuffer(e) ? "buffer" : Array.isArray(e) ? "array" : ArrayBuffer.isView(e) ? "arraybufferview" : e instanceof Number ? "number" : e instanceof Boolean ? "boolean" : e instanceof ArrayBuffer ? "arraybuffer" : typeof e
        }
        ,
        n._encode = function(e, t) {
            if (null != t)
                switch (n.getType(t)) {
                case "buffer":
                    n.buffer(e, t);
                    break;
                case "object":
                    n.dict(e, t);
                    break;
                case "array":
                    n.list(e, t);
                    break;
                case "string":
                    n.string(e, t);
                    break;
                case "number":
                    n.number(e, t);
                    break;
                case "boolean":
                    n.number(e, t);
                    break;
                case "arraybufferview":
                    n.buffer(e, r.from(t.buffer, t.byteOffset, t.byteLength));
                    break;
                case "arraybuffer":
                    n.buffer(e, r.from(t));
                }
        }
        ;
        var a = r.from("e")
          , o = r.from("d")
          , d = r.from("l");
        n.buffer = function(e, t) {
            e.push(r.from(t.length + ":"), t)
        }
        ,
        n.string = function(e, t) {
            e.push(r.from(r.byteLength(t) + ":" + t))
        }
        ,
        n.number = function(e, t) {
            var a = (t / 2147483648 << 0) * 2147483648 + (t % 2147483648 << 0);
            e.push(r.from("i" + a + "e")),
            a === t || n._floatConversionDetected || (n._floatConversionDetected = !0,
            console.warn("WARNING: Possible data corruption detected with value \"" + t + "\":", "Bencoding only defines support for integers, value was converted to \"" + a + "\""),
            console.trace())
        }
        ,
        n.dict = function(e, t) {
            e.push(o);
            for (var r = 0, i = Object.keys(t).sort(), d = i.length, s; r < d; r++)
                s = i[r],
                null == t[s] || (n.string(e, s),
                n._encode(e, t[s]));
            e.push(a)
        }
        ,
        n.list = function(e, t) {
            var r = 0
              , o = t.length;
            for (e.push(d); r < o; r++)
                null != t[r] && n._encode(e, t[r]);
            e.push(a)
        }
        ,
        t.exports = n
    }
    , {
        "safe-buffer": 166
    }],
    7: [function(e, t) {
        var n = t.exports;
        n.encode = e("./encode"),
        n.decode = e("./decode"),
        n.byteLength = n.encodingLength = function(e) {
            return n.encode(e).length
        }
    }
    , {
        "./decode": 5,
        "./encode": 6
    }],
    8: [function(e, t) {
        t.exports = function(e, t, n, r, a) {
            var o, i;
            if (void 0 === r)
                r = 0;
            else if (r |= 0,
            0 > r || r >= e.length)
                throw new RangeError("invalid lower bound");
            if (void 0 === a)
                a = e.length - 1;
            else if (a |= 0,
            a < r || a >= e.length)
                throw new RangeError("invalid upper bound");
            for (; r <= a; )
                if (o = r + (a - r >>> 1),
                i = +n(e[o], t, o, e),
                0 > i)
                    r = o + 1;
                else if (0 < i)
                    a = o - 1;
                else
                    return o;
            return ~r
        }
    }
    , {}],
    9: [function(e, t) {
        function n(e) {
            let t = e >> 3;
            return 0 != e % 8 && t++,
            t
        }
        "undefined" != typeof t && (t.exports = class {
            constructor(e=0, t) {
                const r = null != t && t.grow;
                this.grow = r && isFinite(r) && n(r) || r || 0,
                this.buffer = "number" == typeof e ? new Uint8Array(n(e)) : e
            }
            get(e) {
                const t = e >> 3;
                return t < this.buffer.length && !!(this.buffer[t] & 128 >> e % 8)
            }
            set(e, t=!0) {
                const n = e >> 3;
                if (t) {
                    if (this.buffer.length < n + 1) {
                        const e = Math.max(n + 1, Math.min(2 * this.buffer.length, this.grow));
                        if (e <= this.grow) {
                            const t = new Uint8Array(e);
                            t.set(this.buffer),
                            this.buffer = t
                        }
                    }
                    this.buffer[n] |= 128 >> e % 8
                } else
                    n < this.buffer.length && (this.buffer[n] &= ~(128 >> e % 8))
            }
        }
        )
    }
    , {}],
    10: [function(e, t) {
        (function(n) {
            const r = e("unordered-array-remove")
              , a = e("bencode")
              , o = e("bitfield")
              , i = e("debug")("bittorrent-protocol")
              , d = e("randombytes")
              , s = e("speedometer")
              , l = e("readable-stream")
              , c = n.from("\x13BitTorrent protocol")
              , u = n.from([0, 0, 0, 0])
              , f = n.from([0, 0, 0, 1, 0])
              , p = n.from([0, 0, 0, 1, 1])
              , h = n.from([0, 0, 0, 1, 2])
              , m = n.from([0, 0, 0, 1, 3])
              , g = [0, 0, 0, 0, 0, 0, 0, 0]
              , _ = [0, 0, 0, 3, 9, 0, 0];
            class b {
                constructor(e, t, n, r) {
                    this.piece = e,
                    this.offset = t,
                    this.length = n,
                    this.callback = r
                }
            }
            class y extends l.Duplex {
                constructor() {
                    super(),
                    this._debugId = d(4).toString("hex"),
                    this._debug("new wire"),
                    this.peerId = null,
                    this.peerIdBuffer = null,
                    this.type = null,
                    this.amChoking = !0,
                    this.amInterested = !1,
                    this.peerChoking = !0,
                    this.peerInterested = !1,
                    this.peerPieces = new o(0,{
                        grow: 4e5
                    }),
                    this.peerExtensions = {},
                    this.requests = [],
                    this.peerRequests = [],
                    this.extendedMapping = {},
                    this.peerExtendedMapping = {},
                    this.extendedHandshake = {},
                    this.peerExtendedHandshake = {},
                    this._ext = {},
                    this._nextExt = 1,
                    this.uploaded = 0,
                    this.downloaded = 0,
                    this.uploadSpeed = s(),
                    this.downloadSpeed = s(),
                    this._keepAliveInterval = null,
                    this._timeout = null,
                    this._timeoutMs = 0,
                    this.destroyed = !1,
                    this._finished = !1,
                    this._parserSize = 0,
                    this._parser = null,
                    this._buffer = [],
                    this._bufferSize = 0,
                    this.once("finish", ()=>this._onFinish()),
                    this._parseHandshake()
                }
                setKeepAlive(e) {
                    this._debug("setKeepAlive %s", e),
                    clearInterval(this._keepAliveInterval);
                    !1 === e || (this._keepAliveInterval = setInterval(()=>{
                        this.keepAlive()
                    }
                    , 55e3))
                }
                setTimeout(e, t) {
                    this._debug("setTimeout ms=%d unref=%s", e, t),
                    this._clearTimeout(),
                    this._timeoutMs = e,
                    this._timeoutUnref = !!t,
                    this._updateTimeout()
                }
                destroy() {
                    this.destroyed || (this.destroyed = !0,
                    this._debug("destroy"),
                    this.emit("close"),
                    this.end())
                }
                end(...e) {
                    this._debug("end"),
                    this._onUninterested(),
                    this._onChoke(),
                    super.end(...e)
                }
                use(e) {
                    function t() {}
                    const n = e.prototype.name;
                    if (!n)
                        throw new Error("Extension class requires a \"name\" property on the prototype");
                    this._debug("use extension.name=%s", n);
                    const r = this._nextExt
                      , a = new e(this);
                    "function" != typeof a.onHandshake && (a.onHandshake = t),
                    "function" != typeof a.onExtendedHandshake && (a.onExtendedHandshake = t),
                    "function" != typeof a.onMessage && (a.onMessage = t),
                    this.extendedMapping[r] = n,
                    this._ext[n] = a,
                    this[n] = a,
                    this._nextExt += 1
                }
                keepAlive() {
                    this._debug("keep-alive"),
                    this._push(u)
                }
                handshake(e, t, r) {
                    let a, o;
                    if ("string" == typeof e ? (e = e.toLowerCase(),
                    a = n.from(e, "hex")) : (a = e,
                    e = a.toString("hex")),
                    "string" == typeof t ? o = n.from(t, "hex") : (o = t,
                    t = o.toString("hex")),
                    20 !== a.length || 20 !== o.length)
                        throw new Error("infoHash and peerId MUST have length 20");
                    this._debug("handshake i=%s p=%s exts=%o", e, t, r);
                    const i = n.from(g);
                    i[5] |= 16,
                    r && r.dht && (i[7] |= 1),
                    this._push(n.concat([c, i, a, o])),
                    this._handshakeSent = !0,
                    this.peerExtensions.extended && !this._extendedHandshakeSent && this._sendExtendedHandshake()
                }
                _sendExtendedHandshake() {
                    const e = Object.assign({}, this.extendedHandshake);
                    for (const t in e.m = {},
                    this.extendedMapping) {
                        const n = this.extendedMapping[t];
                        e.m[n] = +t
                    }
                    this.extended(0, a.encode(e)),
                    this._extendedHandshakeSent = !0
                }
                choke() {
                    if (!this.amChoking) {
                        for (this.amChoking = !0,
                        this._debug("choke"); this.peerRequests.length; )
                            this.peerRequests.pop();
                        this._push(f)
                    }
                }
                unchoke() {
                    this.amChoking && (this.amChoking = !1,
                    this._debug("unchoke"),
                    this._push(p))
                }
                interested() {
                    this.amInterested || (this.amInterested = !0,
                    this._debug("interested"),
                    this._push(h))
                }
                uninterested() {
                    this.amInterested && (this.amInterested = !1,
                    this._debug("uninterested"),
                    this._push(m))
                }
                have(e) {
                    this._debug("have %d", e),
                    this._message(4, [e], null)
                }
                bitfield(e) {
                    this._debug("bitfield"),
                    n.isBuffer(e) || (e = e.buffer),
                    this._message(5, [], e)
                }
                request(e, t, n, r) {
                    return r || (r = ()=>{}
                    ),
                    this._finished ? r(new Error("wire is closed")) : this.peerChoking ? r(new Error("peer is choking")) : void (this._debug("request index=%d offset=%d length=%d", e, t, n),
                    this.requests.push(new b(e,t,n,r)),
                    this._updateTimeout(),
                    this._message(6, [e, t, n], null))
                }
                piece(e, t, n) {
                    this._debug("piece index=%d offset=%d", e, t),
                    this.uploaded += n.length,
                    this.uploadSpeed(n.length),
                    this.emit("upload", n.length),
                    this._message(7, [e, t], n)
                }
                cancel(e, t, n) {
                    this._debug("cancel index=%d offset=%d length=%d", e, t, n),
                    this._callback(this._pull(this.requests, e, t, n), new Error("request was cancelled"), null),
                    this._message(8, [e, t, n], null)
                }
                port(e) {
                    this._debug("port %d", e);
                    const t = n.from(_);
                    t.writeUInt16BE(e, 5),
                    this._push(t)
                }
                extended(e, t) {
                    if (this._debug("extended ext=%s", e),
                    "string" == typeof e && this.peerExtendedMapping[e] && (e = this.peerExtendedMapping[e]),
                    "number" == typeof e) {
                        const r = n.from([e])
                          , o = n.isBuffer(t) ? t : a.encode(t);
                        this._message(20, [], n.concat([r, o]))
                    } else
                        throw new Error(`Unrecognized extension: ${e}`)
                }
                _read() {}
                _message(e, t, r) {
                    const a = r ? r.length : 0
                      , o = n.allocUnsafe(5 + 4 * t.length);
                    o.writeUInt32BE(o.length + a - 4, 0),
                    o[4] = e;
                    for (let n = 0; n < t.length; n++)
                        o.writeUInt32BE(t[n], 5 + 4 * n);
                    this._push(o),
                    r && this._push(r)
                }
                _push(e) {
                    return this._finished ? void 0 : this.push(e)
                }
                _onKeepAlive() {
                    this._debug("got keep-alive"),
                    this.emit("keep-alive")
                }
                _onHandshake(e, t, n) {
                    const r = e.toString("hex")
                      , a = t.toString("hex");
                    this._debug("got handshake i=%s p=%s exts=%o", r, a, n),
                    this.peerId = a,
                    this.peerIdBuffer = t,
                    this.peerExtensions = n,
                    this.emit("handshake", r, a, n);
                    for (var o in this._ext)
                        this._ext[o].onHandshake(r, a, n);
                    n.extended && this._handshakeSent && !this._extendedHandshakeSent && this._sendExtendedHandshake()
                }
                _onChoke() {
                    for (this.peerChoking = !0,
                    this._debug("got choke"),
                    this.emit("choke"); this.requests.length; )
                        this._callback(this.requests.pop(), new Error("peer is choking"), null)
                }
                _onUnchoke() {
                    this.peerChoking = !1,
                    this._debug("got unchoke"),
                    this.emit("unchoke")
                }
                _onInterested() {
                    this.peerInterested = !0,
                    this._debug("got interested"),
                    this.emit("interested")
                }
                _onUninterested() {
                    this.peerInterested = !1,
                    this._debug("got uninterested"),
                    this.emit("uninterested")
                }
                _onHave(e) {
                    this.peerPieces.get(e) || (this._debug("got have %d", e),
                    this.peerPieces.set(e, !0),
                    this.emit("have", e))
                }
                _onBitField(e) {
                    this.peerPieces = new o(e),
                    this._debug("got bitfield"),
                    this.emit("bitfield", this.peerPieces)
                }
                _onRequest(e, t, n) {
                    if (!this.amChoking) {
                        this._debug("got request index=%d offset=%d length=%d", e, t, n);
                        const a = (a,o)=>r === this._pull(this.peerRequests, e, t, n) ? a ? this._debug("error satisfying request index=%d offset=%d length=%d (%s)", e, t, n, a.message) : void this.piece(e, t, o) : void 0;
                        var r = new b(e,t,n,a);
                        this.peerRequests.push(r),
                        this.emit("request", e, t, n, a)
                    }
                }
                _onPiece(e, t, n) {
                    this._debug("got piece index=%d offset=%d", e, t),
                    this._callback(this._pull(this.requests, e, t, n.length), null, n),
                    this.downloaded += n.length,
                    this.downloadSpeed(n.length),
                    this.emit("download", n.length),
                    this.emit("piece", e, t, n)
                }
                _onCancel(e, t, n) {
                    this._debug("got cancel index=%d offset=%d length=%d", e, t, n),
                    this._pull(this.peerRequests, e, t, n),
                    this.emit("cancel", e, t, n)
                }
                _onPort(e) {
                    this._debug("got port %d", e),
                    this.emit("port", e)
                }
                _onExtended(e, t) {
                    if (0 === e) {
                        let e;
                        try {
                            e = a.decode(t)
                        } catch (e) {
                            this._debug("ignoring invalid extended handshake: %s", e.message || e)
                        }
                        if (!e)
                            return;
                        this.peerExtendedHandshake = e;
                        if ("object" == typeof e.m)
                            for (var n in e.m)
                                this.peerExtendedMapping[n] = +e.m[n].toString();
                        for (n in this._ext)
                            this.peerExtendedMapping[n] && this._ext[n].onExtendedHandshake(this.peerExtendedHandshake);
                        this._debug("got extended handshake"),
                        this.emit("extended", "handshake", this.peerExtendedHandshake)
                    } else
                        this.extendedMapping[e] && (e = this.extendedMapping[e],
                        this._ext[e] && this._ext[e].onMessage(t)),
                        this._debug("got extended message ext=%s", e),
                        this.emit("extended", e, t)
                }
                _onTimeout() {
                    this._debug("request timed out"),
                    this._callback(this.requests.shift(), new Error("request has timed out"), null),
                    this.emit("timeout")
                }
                _write(e, t, r) {
                    for (this._bufferSize += e.length,
                    this._buffer.push(e); this._bufferSize >= this._parserSize; ) {
                        const e = 1 === this._buffer.length ? this._buffer[0] : n.concat(this._buffer);
                        this._bufferSize -= this._parserSize,
                        this._buffer = this._bufferSize ? [e.slice(this._parserSize)] : [],
                        this._parser(e.slice(0, this._parserSize))
                    }
                    r(null)
                }
                _callback(e, t, n) {
                    e && (this._clearTimeout(),
                    !this.peerChoking && !this._finished && this._updateTimeout(),
                    e.callback(t, n))
                }
                _clearTimeout() {
                    this._timeout && (clearTimeout(this._timeout),
                    this._timeout = null)
                }
                _updateTimeout() {
                    this._timeoutMs && this.requests.length && !this._timeout && (this._timeout = setTimeout(()=>this._onTimeout(), this._timeoutMs),
                    this._timeoutUnref && this._timeout.unref && this._timeout.unref())
                }
                _parse(e, t) {
                    this._parserSize = e,
                    this._parser = t
                }
                _onMessageLength(e) {
                    const t = e.readUInt32BE(0);
                    0 < t ? this._parse(t, this._onMessage) : (this._onKeepAlive(),
                    this._parse(4, this._onMessageLength))
                }
                _onMessage(e) {
                    switch (this._parse(4, this._onMessageLength),
                    e[0]) {
                    case 0:
                        return this._onChoke();
                    case 1:
                        return this._onUnchoke();
                    case 2:
                        return this._onInterested();
                    case 3:
                        return this._onUninterested();
                    case 4:
                        return this._onHave(e.readUInt32BE(1));
                    case 5:
                        return this._onBitField(e.slice(1));
                    case 6:
                        return this._onRequest(e.readUInt32BE(1), e.readUInt32BE(5), e.readUInt32BE(9));
                    case 7:
                        return this._onPiece(e.readUInt32BE(1), e.readUInt32BE(5), e.slice(9));
                    case 8:
                        return this._onCancel(e.readUInt32BE(1), e.readUInt32BE(5), e.readUInt32BE(9));
                    case 9:
                        return this._onPort(e.readUInt16BE(1));
                    case 20:
                        return this._onExtended(e.readUInt8(1), e.slice(2));
                    default:
                        return this._debug("got unknown message"),
                        this.emit("unknownmessage", e);
                    }
                }
                _parseHandshake() {
                    this._parse(1, e=>{
                        const t = e.readUInt8(0);
                        this._parse(t + 48, e=>{
                            const n = e.slice(0, t);
                            return "BitTorrent protocol" === n.toString() ? void (e = e.slice(t),
                            this._onHandshake(e.slice(8, 28), e.slice(28, 48), {
                                dht: !!(1 & e[7]),
                                extended: !!(16 & e[5])
                            }),
                            this._parse(4, this._onMessageLength)) : (this._debug("Error: wire not speaking BitTorrent protocol (%s)", n.toString()),
                            void this.end())
                        }
                        )
                    }
                    )
                }
                _onFinish() {
                    for (this._finished = !0,
                    this.push(null); this.read(); )
                        ;
                    for (clearInterval(this._keepAliveInterval),
                    this._parse(Number.MAX_VALUE, ()=>{}
                    ); this.peerRequests.length; )
                        this.peerRequests.pop();
                    for (; this.requests.length; )
                        this._callback(this.requests.pop(), new Error("wire was closed"), null)
                }
                _debug(...e) {
                    e[0] = `[${this._debugId}] ${e[0]}`,
                    i(...e)
                }
                _pull(e, t, n, a) {
                    for (let o = 0; o < e.length; o++) {
                        const i = e[o];
                        if (i.piece === t && i.offset === n && i.length === a)
                            return r(e, o),
                            i
                    }
                    return null
                }
            }
            t.exports = y
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        bencode: 7,
        bitfield: 9,
        buffer: 23,
        debug: 49,
        randombytes: 144,
        "readable-stream": 160,
        speedometer: 174,
        "unordered-array-remove": 210
    }],
    11: [function(e, t) {
        (function(n, r) {
            const a = e("debug")("bittorrent-tracker:client")
              , o = e("events")
              , i = e("once")
              , d = e("run-parallel")
              , s = e("simple-peer")
              , l = e("uniq")
              , c = e("./lib/common")
              , u = e("./lib/client/http-tracker")
              , f = e("./lib/client/udp-tracker")
              , p = e("./lib/client/websocket-tracker");
            class h extends o {
                constructor(e={}) {
                    if (super(),
                    !e.peerId)
                        throw new Error("Option `peerId` is required");
                    if (!e.infoHash)
                        throw new Error("Option `infoHash` is required");
                    if (!e.announce)
                        throw new Error("Option `announce` is required");
                    if (!n.browser && !e.port)
                        throw new Error("Option `port` is required");
                    this.peerId = "string" == typeof e.peerId ? e.peerId : e.peerId.toString("hex"),
                    this._peerIdBuffer = r.from(this.peerId, "hex"),
                    this._peerIdBinary = this._peerIdBuffer.toString("binary"),
                    this.infoHash = "string" == typeof e.infoHash ? e.infoHash.toLowerCase() : e.infoHash.toString("hex"),
                    this._infoHashBuffer = r.from(this.infoHash, "hex"),
                    this._infoHashBinary = this._infoHashBuffer.toString("binary"),
                    a("new client %s", this.infoHash),
                    this.destroyed = !1,
                    this._port = e.port,
                    this._getAnnounceOpts = e.getAnnounceOpts,
                    this._rtcConfig = e.rtcConfig,
                    this._userAgent = e.userAgent,
                    this._wrtc = "function" == typeof e.wrtc ? e.wrtc() : e.wrtc;
                    let t = "string" == typeof e.announce ? [e.announce] : null == e.announce ? [] : e.announce;
                    t = t.map(e=>(e = e.toString(),
                    "/" === e[e.length - 1] && (e = e.substring(0, e.length - 1)),
                    e)),
                    t = l(t);
                    const o = !1 !== this._wrtc && (!!this._wrtc || s.WEBRTC_SUPPORT)
                      , i = e=>{
                        n.nextTick(()=>{
                            this.emit("warning", e)
                        }
                        )
                    }
                    ;
                    this._trackers = t.map(e=>{
                        let t;
                        try {
                            t = new URL(e)
                        } catch (t) {
                            return i(new Error(`Invalid tracker URL: ${e}`)),
                            null
                        }
                        const n = t.port;
                        if (0 > n || 65535 < n)
                            return i(new Error(`Invalid tracker port: ${e}`)),
                            null;
                        const r = t.protocol;
                        return ("http:" === r || "https:" === r) && "function" == typeof u ? new u(this,e) : "udp:" === r && "function" == typeof f ? new f(this,e) : ("ws:" === r || "wss:" === r) && o ? "ws:" === r && "undefined" != typeof window && "https:" === window.location.protocol ? (i(new Error(`Unsupported tracker protocol: ${e}`)),
                        null) : new p(this,e) : (i(new Error(`Unsupported tracker protocol: ${e}`)),
                        null)
                    }
                    ).filter(Boolean)
                }
                start(e) {
                    e = this._defaultAnnounceOpts(e),
                    e.event = "started",
                    a("send `start` %o", e),
                    this._announce(e),
                    this._trackers.forEach(e=>{
                        e.setInterval()
                    }
                    )
                }
                stop(e) {
                    e = this._defaultAnnounceOpts(e),
                    e.event = "stopped",
                    a("send `stop` %o", e),
                    this._announce(e)
                }
                complete(e) {
                    e || (e = {}),
                    e = this._defaultAnnounceOpts(e),
                    e.event = "completed",
                    a("send `complete` %o", e),
                    this._announce(e)
                }
                update(e) {
                    e = this._defaultAnnounceOpts(e),
                    e.event && delete e.event,
                    a("send `update` %o", e),
                    this._announce(e)
                }
                _announce(e) {
                    this._trackers.forEach(t=>{
                        t.announce(e)
                    }
                    )
                }
                scrape(e) {
                    a("send `scrape`"),
                    e || (e = {}),
                    this._trackers.forEach(t=>{
                        t.scrape(e)
                    }
                    )
                }
                setInterval(e) {
                    a("setInterval %d", e),
                    this._trackers.forEach(t=>{
                        t.setInterval(e)
                    }
                    )
                }
                destroy(e) {
                    if (!this.destroyed) {
                        this.destroyed = !0,
                        a("destroy");
                        const t = this._trackers.map(e=>t=>{
                            e.destroy(t)
                        }
                        );
                        d(t, e),
                        this._trackers = [],
                        this._getAnnounceOpts = null
                    }
                }
                _defaultAnnounceOpts(e={}) {
                    return null == e.numwant && (e.numwant = c.DEFAULT_ANNOUNCE_PEERS),
                    null == e.uploaded && (e.uploaded = 0),
                    null == e.downloaded && (e.downloaded = 0),
                    this._getAnnounceOpts && (e = Object.assign({}, e, this._getAnnounceOpts())),
                    e
                }
            }
            h.scrape = (e,t)=>{
                if (t = i(t),
                !e.infoHash)
                    throw new Error("Option `infoHash` is required");
                if (!e.announce)
                    throw new Error("Option `announce` is required");
                const n = Object.assign({}, e, {
                    infoHash: Array.isArray(e.infoHash) ? e.infoHash[0] : e.infoHash,
                    peerId: r.from("01234567890123456789"),
                    port: 6881
                })
                  , a = new h(n);
                a.once("error", t),
                a.once("warning", t);
                let o = Array.isArray(e.infoHash) ? e.infoHash.length : 1;
                const d = {};
                return a.on("scrape", e=>{
                    if (o -= 1,
                    d[e.infoHash] = e,
                    0 === o) {
                        a.destroy();
                        const e = Object.keys(d);
                        1 === e.length ? t(null, d[e[0]]) : t(null, d)
                    }
                }
                ),
                e.infoHash = Array.isArray(e.infoHash) ? e.infoHash.map(e=>r.from(e, "hex")) : r.from(e.infoHash, "hex"),
                a.scrape({
                    infoHash: e.infoHash
                }),
                a
            }
            ,
            t.exports = h
        }
        ).call(this, e("_process"), e("buffer").Buffer)
    }
    , {
        "./lib/client/http-tracker": 17,
        "./lib/client/udp-tracker": 17,
        "./lib/client/websocket-tracker": 13,
        "./lib/common": 14,
        _process: 137,
        buffer: 23,
        debug: 49,
        events: 53,
        once: 114,
        "run-parallel": 164,
        "simple-peer": 170,
        uniq: 209
    }],
    12: [function(e, t) {
        const n = e("events");
        t.exports = class extends n {
            constructor(e, t) {
                super(),
                this.client = e,
                this.announceUrl = t,
                this.interval = null,
                this.destroyed = !1
            }
            setInterval(e) {
                null == e && (e = this.DEFAULT_ANNOUNCE_INTERVAL),
                clearInterval(this.interval),
                e && (this.interval = setInterval(()=>{
                    this.announce(this.client._defaultAnnounceOpts())
                }
                , e),
                this.interval.unref && this.interval.unref())
            }
        }
    }
    , {
        events: 53
    }],
    13: [function(e, t) {
        var r = Math.min;
        function n() {}
        const a = e("debug")("bittorrent-tracker:websocket-tracker")
          , o = e("simple-peer")
          , i = e("randombytes")
          , d = e("simple-websocket")
          , s = e("../common")
          , l = e("./tracker")
          , c = {};
        class u extends l {
            constructor(e, t, n) {
                super(e, t),
                a("new websocket tracker %s", t),
                this.peers = {},
                this.socket = null,
                this.reconnecting = !1,
                this.retries = 0,
                this.reconnectTimer = null,
                this.expectingResponse = !1,
                this._openSocket()
            }
            announce(e) {
                if (this.destroyed || this.reconnecting)
                    return;
                if (!this.socket.connected)
                    return void this.socket.once("connect", ()=>{
                        this.announce(e)
                    }
                    );
                const t = Object.assign({}, e, {
                    action: "announce",
                    info_hash: this.client._infoHashBinary,
                    peer_id: this.client._peerIdBinary
                });
                if (this._trackerId && (t.trackerid = this._trackerId),
                "stopped" === e.event || "completed" === e.event)
                    this._send(t);
                else {
                    const n = r(e.numwant, 10);
                    this._generateOffers(n, e=>{
                        t.numwant = n,
                        t.offers = e,
                        this._send(t)
                    }
                    )
                }
            }
            scrape(e) {
                if (this.destroyed || this.reconnecting)
                    return;
                if (!this.socket.connected)
                    return void this.socket.once("connect", ()=>{
                        this.scrape(e)
                    }
                    );
                const t = Array.isArray(e.infoHash) && 0 < e.infoHash.length ? e.infoHash.map(e=>e.toString("binary")) : e.infoHash && e.infoHash.toString("binary") || this.client._infoHashBinary;
                this._send({
                    action: "scrape",
                    info_hash: t
                })
            }
            destroy(e=n) {
                function t() {
                    a && (clearTimeout(a),
                    a = null),
                    r.removeListener("data", t),
                    r.destroy(),
                    r = null
                }
                if (this.destroyed)
                    return e(null);
                for (const t in this.destroyed = !0,
                clearInterval(this.interval),
                clearTimeout(this.reconnectTimer),
                this.peers) {
                    const e = this.peers[t];
                    clearTimeout(e.trackerTimeout),
                    e.destroy()
                }
                if (this.peers = null,
                this.socket && (this.socket.removeListener("connect", this._onSocketConnectBound),
                this.socket.removeListener("data", this._onSocketDataBound),
                this.socket.removeListener("close", this._onSocketCloseBound),
                this.socket.removeListener("error", this._onSocketErrorBound),
                this.socket = null),
                this._onSocketConnectBound = null,
                this._onSocketErrorBound = null,
                this._onSocketDataBound = null,
                this._onSocketCloseBound = null,
                c[this.announceUrl] && (c[this.announceUrl].consumers -= 1),
                0 < c[this.announceUrl].consumers)
                    return e();
                let r = c[this.announceUrl];
                if (delete c[this.announceUrl],
                r.on("error", n),
                r.once("close", e),
                !this.expectingResponse)
                    return t();
                var a = setTimeout(t, s.DESTROY_TIMEOUT);
                r.once("data", t)
            }
            _openSocket() {
                this.destroyed = !1,
                this.peers || (this.peers = {}),
                this._onSocketConnectBound = ()=>{
                    this._onSocketConnect()
                }
                ,
                this._onSocketErrorBound = e=>{
                    this._onSocketError(e)
                }
                ,
                this._onSocketDataBound = e=>{
                    this._onSocketData(e)
                }
                ,
                this._onSocketCloseBound = ()=>{
                    this._onSocketClose()
                }
                ,
                this.socket = c[this.announceUrl],
                this.socket ? (c[this.announceUrl].consumers += 1,
                this.socket.connected && this._onSocketConnectBound()) : (this.socket = c[this.announceUrl] = new d(this.announceUrl),
                this.socket.consumers = 1,
                this.socket.once("connect", this._onSocketConnectBound)),
                this.socket.on("data", this._onSocketDataBound),
                this.socket.once("close", this._onSocketCloseBound),
                this.socket.once("error", this._onSocketErrorBound)
            }
            _onSocketConnect() {
                this.destroyed || this.reconnecting && (this.reconnecting = !1,
                this.retries = 0,
                this.announce(this.client._defaultAnnounceOpts()))
            }
            _onSocketData(e) {
                if (!this.destroyed) {
                    this.expectingResponse = !1;
                    try {
                        e = JSON.parse(e)
                    } catch (e) {
                        return void this.client.emit("warning", new Error("Invalid tracker response"))
                    }
                    "announce" === e.action ? this._onAnnounceResponse(e) : "scrape" === e.action ? this._onScrapeResponse(e) : this._onSocketError(new Error(`invalid action in WS response: ${e.action}`))
                }
            }
            _onAnnounceResponse(e) {
                if (e.info_hash !== this.client._infoHashBinary)
                    return void a("ignoring websocket data from %s for %s (looking for %s: reused socket)", this.announceUrl, s.binaryToHex(e.info_hash), this.client.infoHash);
                if (e.peer_id && e.peer_id === this.client._peerIdBinary)
                    return;
                a("received %s from %s for %s", JSON.stringify(e), this.announceUrl, this.client.infoHash);
                const t = e["failure reason"];
                if (t)
                    return this.client.emit("warning", new Error(t));
                const n = e["warning message"];
                n && this.client.emit("warning", new Error(n));
                const r = e.interval || e["min interval"];
                r && this.setInterval(1e3 * r);
                const o = e["tracker id"];
                if (o && (this._trackerId = o),
                null != e.complete) {
                    const t = Object.assign({}, e, {
                        announce: this.announceUrl,
                        infoHash: s.binaryToHex(e.info_hash)
                    });
                    this.client.emit("update", t)
                }
                let i;
                if (e.offer && e.peer_id && (a("creating peer (from remote offer)"),
                i = this._createPeer(),
                i.id = s.binaryToHex(e.peer_id),
                i.once("signal", t=>{
                    const n = {
                        action: "announce",
                        info_hash: this.client._infoHashBinary,
                        peer_id: this.client._peerIdBinary,
                        to_peer_id: e.peer_id,
                        answer: t,
                        offer_id: e.offer_id
                    };
                    this._trackerId && (n.trackerid = this._trackerId),
                    this._send(n)
                }
                ),
                i.signal(e.offer),
                this.client.emit("peer", i)),
                e.answer && e.peer_id) {
                    const t = s.binaryToHex(e.offer_id);
                    i = this.peers[t],
                    i ? (i.id = s.binaryToHex(e.peer_id),
                    i.signal(e.answer),
                    this.client.emit("peer", i),
                    clearTimeout(i.trackerTimeout),
                    i.trackerTimeout = null,
                    delete this.peers[t]) : a(`got unexpected answer: ${JSON.stringify(e.answer)}`)
                }
            }
            _onScrapeResponse(e) {
                e = e.files || {};
                const t = Object.keys(e);
                return 0 === t.length ? void this.client.emit("warning", new Error("invalid scrape response")) : void t.forEach(t=>{
                    const n = Object.assign(e[t], {
                        announce: this.announceUrl,
                        infoHash: s.binaryToHex(t)
                    });
                    this.client.emit("scrape", n)
                }
                )
            }
            _onSocketClose() {
                this.destroyed || (this.destroy(),
                this._startReconnectTimer())
            }
            _onSocketError(e) {
                this.destroyed || (this.destroy(),
                this.client.emit("warning", e),
                this._startReconnectTimer())
            }
            _startReconnectTimer() {
                const e = Math.floor(Math.random() * 120000) + r(Math.pow(2, this.retries) * 10000, 1800000);
                this.reconnecting = !0,
                clearTimeout(this.reconnectTimer),
                this.reconnectTimer = setTimeout(()=>{
                    this.retries++,
                    this._openSocket()
                }
                , e),
                this.reconnectTimer.unref && this.reconnectTimer.unref(),
                a("reconnecting socket in %s ms", e)
            }
            _send(e) {
                if (!this.destroyed) {
                    this.expectingResponse = !0;
                    const t = JSON.stringify(e);
                    a("send %s", t),
                    this.socket.send(t)
                }
            }
            _generateOffers(e, t) {
                function n() {
                    const e = i(20).toString("hex");
                    a("creating peer (from _generateOffers)");
                    const t = o.peers[e] = o._createPeer({
                        initiator: !0
                    });
                    t.once("signal", t=>{
                        d.push({
                            offer: t,
                            offer_id: s.hexToBinary(e)
                        }),
                        r()
                    }
                    ),
                    t.trackerTimeout = setTimeout(()=>{
                        a("tracker timeout: destroying peer"),
                        t.trackerTimeout = null,
                        delete o.peers[e],
                        t.destroy()
                    }
                    , 50000),
                    t.trackerTimeout.unref && t.trackerTimeout.unref()
                }
                function r() {
                    d.length === e && (a("generated %s offers", e),
                    t(d))
                }
                const o = this
                  , d = [];
                a("generating %s offers", e);
                for (let r = 0; r < e; ++r)
                    n();
                r()
            }
            _createPeer(e) {
                function t(e) {
                    r.client.emit("warning", new Error(`Connection error: ${e.message}`)),
                    a.destroy()
                }
                function n() {
                    a.removeListener("error", t),
                    a.removeListener("connect", n)
                }
                const r = this;
                e = Object.assign({
                    trickle: !1,
                    config: r.client._rtcConfig,
                    wrtc: r.client._wrtc
                }, e);
                const a = new o(e);
                return a.once("error", t),
                a.once("connect", n),
                a
            }
        }
        u.prototype.DEFAULT_ANNOUNCE_INTERVAL = 30000,
        u._socketPool = c,
        t.exports = u
    }
    , {
        "../common": 14,
        "./tracker": 12,
        debug: 49,
        randombytes: 144,
        "simple-peer": 170,
        "simple-websocket": 173
    }],
    14: [function(e, t, n) {
        (function(t) {
            n.DEFAULT_ANNOUNCE_PEERS = 50,
            n.MAX_ANNOUNCE_PEERS = 82,
            n.binaryToHex = function(e) {
                return "string" != typeof e && (e += ""),
                t.from(e, "binary").toString("hex")
            }
            ,
            n.hexToBinary = function(e) {
                return "string" != typeof e && (e += ""),
                t.from(e, "hex").toString("binary")
            }
            ;
            var r = e("./common-node");
            Object.assign(n, r)
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        "./common-node": 17,
        buffer: 23
    }],
    15: [function(e, t) {
        (function(n) {
            t.exports = function(e, t) {
                function r(o) {
                    a.removeEventListener("loadend", r, !1),
                    o.error ? t(o.error) : t(null, n.from(a.result))
                }
                if ("undefined" == typeof Blob || !(e instanceof Blob))
                    throw new Error("first argument must be a Blob");
                if ("function" != typeof t)
                    throw new Error("second argument must be a function");
                var a = new FileReader;
                a.addEventListener("loadend", r, !1),
                a.readAsArrayBuffer(e)
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23
    }],
    16: [function(e, t) {
        (function(n) {
            const {Transform: r} = e("readable-stream");
            t.exports = class extends r {
                constructor(e, t={}) {
                    super(t),
                    "object" == typeof e && (t = e,
                    e = t.size),
                    this.size = e || 512;
                    const {nopad: n, zeroPadding: r=!0} = t;
                    this._zeroPadding = !n && !!r,
                    this._buffered = [],
                    this._bufferedBytes = 0
                }
                _transform(e, t, r) {
                    for (this._bufferedBytes += e.length,
                    this._buffered.push(e); this._bufferedBytes >= this.size; ) {
                        const e = n.concat(this._buffered);
                        this._bufferedBytes -= this.size,
                        this.push(e.slice(0, this.size)),
                        this._buffered = [e.slice(this.size, e.length)]
                    }
                    r()
                }
                _flush() {
                    if (this._bufferedBytes && this._zeroPadding) {
                        const e = n.alloc(this.size - this._bufferedBytes);
                        this._buffered.push(e),
                        this.push(n.concat(this._buffered)),
                        this._buffered = null
                    } else
                        this._bufferedBytes && (this.push(n.concat(this._buffered)),
                        this._buffered = null);
                    this.push(null)
                }
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23,
        "readable-stream": 160
    }],
    17: [function() {}
    , {}],
    18: [function(e, t, n) {
        arguments[4][17][0].apply(n, arguments)
    }
    , {
        dup: 17
    }],
    19: [function(e, t, n) {
        var r = Math.floor
          , a = String.fromCharCode;
        (function(e) {
            /*! https://mths.be/punycode v1.4.1 by @mathias */
            (function(o) {
                function d(e) {
                    throw new RangeError(v[e])
                }
                function s(e, t) {
                    for (var n = e.length, r = []; n--; )
                        r[n] = t(e[n]);
                    return r
                }
                function l(e, t) {
                    var n = e.split("@")
                      , r = "";
                    1 < n.length && (r = n[0] + "@",
                    e = n[1]),
                    e = e.replace(x, ".");
                    var a = e.split(".")
                      , o = s(a, t).join(".");
                    return r + o
                }
                function c(e) {
                    for (var t = [], n = 0, r = e.length, a, o; n < r; )
                        a = e.charCodeAt(n++),
                        55296 <= a && 56319 >= a && n < r ? (o = e.charCodeAt(n++),
                        56320 == (64512 & o) ? t.push(((1023 & a) << 10) + (1023 & o) + 65536) : (t.push(a),
                        n--)) : t.push(a);
                    return t
                }
                function u(e) {
                    return s(e, function(e) {
                        var t = "";
                        return 65535 < e && (e -= 65536,
                        t += E(55296 | 1023 & e >>> 10),
                        e = 56320 | 1023 & e),
                        t += E(e),
                        t
                    }).join("")
                }
                function f(e) {
                    return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : 36
                }
                function p(e, t) {
                    return e + 22 + 75 * (26 > e) - ((0 != t) << 5)
                }
                function h(e, t, n) {
                    var r = 0;
                    for (e = n ? S(e / 700) : e >> 1,
                    e += S(e / t); 455 < e; r += 36)
                        e = S(e / 35);
                    return S(r + 36 * e / (e + 38))
                }
                function m(e) {
                    var r = [], a = e.length, o = 0, s = 128, l = 72, c, p, m, g, _, b, y, x, v, E;
                    for (p = e.lastIndexOf("-"),
                    0 > p && (p = 0),
                    m = 0; m < p; ++m)
                        128 <= e.charCodeAt(m) && d("not-basic"),
                        r.push(e.charCodeAt(m));
                    for (g = 0 < p ? p + 1 : 0; g < a; ) {
                        for (_ = o,
                        b = 1,
                        y = 36; ; y += 36) {
                            if (g >= a && d("invalid-input"),
                            x = f(e.charCodeAt(g++)),
                            (36 <= x || x > S((2147483647 - o) / b)) && d("overflow"),
                            o += x * b,
                            v = y <= l ? 1 : y >= l + 26 ? 26 : y - l,
                            x < v)
                                break;
                            E = 36 - v,
                            b > S(2147483647 / E) && d("overflow"),
                            b *= E
                        }
                        c = r.length + 1,
                        l = h(o - _, c, 0 == _),
                        S(o / c) > 2147483647 - s && d("overflow"),
                        s += S(o / c),
                        o %= c,
                        r.splice(o++, 0, s)
                    }
                    return u(r)
                }
                function g(e) {
                    var r = [], a, o, i, s, l, u, f, g, _, b, y, w, x, v, C;
                    for (e = c(e),
                    w = e.length,
                    a = 128,
                    o = 0,
                    l = 72,
                    u = 0; u < w; ++u)
                        y = e[u],
                        128 > y && r.push(E(y));
                    for (i = s = r.length,
                    s && r.push("-"); i < w; ) {
                        for (f = 2147483647,
                        u = 0; u < w; ++u)
                            y = e[u],
                            y >= a && y < f && (f = y);
                        for (x = i + 1,
                        f - a > S((2147483647 - o) / x) && d("overflow"),
                        o += (f - a) * x,
                        a = f,
                        u = 0; u < w; ++u)
                            if (y = e[u],
                            y < a && 2147483647 < ++o && d("overflow"),
                            y == a) {
                                for (g = o,
                                _ = 36; ; _ += 36) {
                                    if (b = _ <= l ? 1 : _ >= l + 26 ? 26 : _ - l,
                                    g < b)
                                        break;
                                    C = g - b,
                                    v = 36 - b,
                                    r.push(E(p(b + C % v, 0))),
                                    g = S(C / v)
                                }
                                r.push(E(p(g, 0))),
                                l = h(o, x, i == s),
                                o = 0,
                                ++i
                            }
                        ++o,
                        ++a
                    }
                    return r.join("")
                }
                var _ = "object" == typeof n && n && !n.nodeType && n
                  , b = "object" == typeof t && t && !t.nodeType && t
                  , y = "object" == typeof e && e;
                (y.global === y || y.window === y || y.self === y) && (o = y);
                var w = /^xn--/, k = /[^\x20-\x7E]/, x = /[\x2E\u3002\uFF0E\uFF61]/g, v = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, S = r, E = a, C, I;
                if (C = {
                    version: "1.4.1",
                    ucs2: {
                        decode: c,
                        encode: u
                    },
                    decode: m,
                    encode: g,
                    toASCII: function(e) {
                        return l(e, function(e) {
                            return k.test(e) ? "xn--" + g(e) : e
                        })
                    },
                    toUnicode: function(e) {
                        return l(e, function(e) {
                            return w.test(e) ? m(e.slice(4).toLowerCase()) : e
                        })
                    }
                },
                "function" == typeof define && "object" == typeof define.amd && define.amd)
                    define("punycode", function() {
                        return C
                    });
                else if (!(_ && b))
                    o.punycode = C;
                else if (t.exports == _)
                    b.exports = C;
                else
                    for (I in C)
                        C.hasOwnProperty(I) && (_[I] = C[I])
            }
            )(this)
        }
        ).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {}],
    20: [function(e, t) {
        (function(e) {
            t.exports = function(t) {
                if ("number" != typeof t)
                    throw new TypeError("\"size\" argument must be a number");
                if (0 > t)
                    throw new RangeError("\"size\" argument must not be negative");
                return e.allocUnsafe ? e.allocUnsafe(t) : new e(t)
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23
    }],
    21: [function(e, t) {
        (function(n) {
            var r = e("buffer-fill")
              , a = e("buffer-alloc-unsafe");
            t.exports = function(e, t, o) {
                if ("number" != typeof e)
                    throw new TypeError("\"size\" argument must be a number");
                if (0 > e)
                    throw new RangeError("\"size\" argument must not be negative");
                if (n.alloc)
                    return n.alloc(e, t, o);
                var i = a(e);
                return 0 === e ? i : void 0 === t ? r(i, 0) : ("string" != typeof o && (o = void 0),
                r(i, t, o))
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23,
        "buffer-alloc-unsafe": 20,
        "buffer-fill": 22
    }],
    22: [function(e, t) {
        (function(e) {
            function n(e) {
                return 1 === e.length && 256 > e.charCodeAt(0)
            }
            function r(e, t, n, r) {
                if (0 > n || r > e.length)
                    throw new RangeError("Out of range index");
                return n >>>= 0,
                r = void 0 === r ? e.length : r >>> 0,
                r > n && e.fill(t, n, r),
                e
            }
            function a(e, t, n, r) {
                if (0 > n || r > e.length)
                    throw new RangeError("Out of range index");
                if (r <= n)
                    return e;
                n >>>= 0,
                r = void 0 === r ? e.length : r >>> 0;
                for (var a = n, o = t.length; a <= r - o; )
                    t.copy(e, a),
                    a += o;
                return a !== r && t.copy(e, a, 0, r - a),
                e
            }
            var o = function() {
                try {
                    if (!e.isEncoding("latin1"))
                        return !1;
                    var t = e.alloc ? e.alloc(4) : new e(4);
                    return t.fill("ab", "ucs2"),
                    "61006200" === t.toString("hex")
                } catch (e) {
                    return !1
                }
            }();
            t.exports = function(t, i, d, s, l) {
                if (o)
                    return t.fill(i, d, s, l);
                if ("number" == typeof i)
                    return r(t, i, d, s);
                if ("string" == typeof i) {
                    if ("string" == typeof d ? (l = d,
                    d = 0,
                    s = t.length) : "string" == typeof s && (l = s,
                    s = t.length),
                    void 0 !== l && "string" != typeof l)
                        throw new TypeError("encoding must be a string");
                    if ("latin1" === l && (l = "binary"),
                    "string" == typeof l && !e.isEncoding(l))
                        throw new TypeError("Unknown encoding: " + l);
                    if ("" === i)
                        return r(t, 0, d, s);
                    if (n(i))
                        return r(t, i.charCodeAt(0), d, s);
                    i = new e(i,l)
                }
                return e.isBuffer(i) ? a(t, i, d, s) : r(t, 0, d, s)
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23
    }],
    23: [function(e, t, n) {
        var r = Math.pow
          , o = Math.min
          , d = String.fromCharCode;
        (function(t) {
            /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
            'use strict';
            function a(e) {
                if (2147483647 < e)
                    throw new RangeError("The value \"" + e + "\" is invalid for option \"size\"");
                var n = new Uint8Array(e);
                return Object.setPrototypeOf(n, t.prototype),
                n
            }
            function t(e, n, r) {
                if ("number" == typeof e) {
                    if ("string" == typeof n)
                        throw new TypeError("The \"string\" argument must be of type string. Received type number");
                    return c(e)
                }
                return i(e, n, r)
            }
            function i(e, n, r) {
                if ("string" == typeof e)
                    return u(e, n);
                if (ArrayBuffer.isView(e))
                    return f(e);
                if (null == e)
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                if (Z(e, ArrayBuffer) || e && Z(e.buffer, ArrayBuffer))
                    return p(e, n, r);
                if ("number" == typeof e)
                    throw new TypeError("The \"value\" argument must not be of type number. Received type number");
                var a = e.valueOf && e.valueOf();
                if (null != a && a !== e)
                    return t.from(a, n, r);
                var o = h(e);
                if (o)
                    return o;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive])
                    return t.from(e[Symbol.toPrimitive]("string"), n, r);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
            }
            function s(e) {
                if ("number" != typeof e)
                    throw new TypeError("\"size\" argument must be of type number");
                else if (0 > e)
                    throw new RangeError("The value \"" + e + "\" is invalid for option \"size\"")
            }
            function l(e, t, n) {
                return s(e),
                0 >= e ? a(e) : void 0 === t ? a(e) : "string" == typeof n ? a(e).fill(t, n) : a(e).fill(t)
            }
            function c(e) {
                return s(e),
                a(0 > e ? 0 : 0 | m(e))
            }
            function u(e, n) {
                if (("string" != typeof n || "" === n) && (n = "utf8"),
                !t.isEncoding(n))
                    throw new TypeError("Unknown encoding: " + n);
                var r = 0 | _(e, n)
                  , o = a(r)
                  , i = o.write(e, n);
                return i !== r && (o = o.slice(0, i)),
                o
            }
            function f(e) {
                for (var t = 0 > e.length ? 0 : 0 | m(e.length), n = a(t), r = 0; r < t; r += 1)
                    n[r] = 255 & e[r];
                return n
            }
            function p(e, n, r) {
                if (0 > n || e.byteLength < n)
                    throw new RangeError("\"offset\" is outside of buffer bounds");
                if (e.byteLength < n + (r || 0))
                    throw new RangeError("\"length\" is outside of buffer bounds");
                var a;
                return a = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e,n) : new Uint8Array(e,n,r),
                Object.setPrototypeOf(a, t.prototype),
                a
            }
            function h(e) {
                if (t.isBuffer(e)) {
                    var n = 0 | m(e.length)
                      , r = a(n);
                    return 0 === r.length ? r : (e.copy(r, 0, 0, n),
                    r)
                }
                return void 0 === e.length ? "Buffer" === e.type && Array.isArray(e.data) ? f(e.data) : void 0 : "number" != typeof e.length || V(e.length) ? a(0) : f(e)
            }
            function m(e) {
                if (e >= 2147483647)
                    //throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + 2147483647.toString(16) + " bytes");
                    console.log('TESTE: ' + 0x7FFFFFFF);
                    //throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + 0x7FFFFFFF + " bytes");
                return 0 | e
            }
            function g(e) {
                return +e != e && (e = 0),
                t.alloc(+e)
            }
            function _(e, n) {
                if (t.isBuffer(e))
                    return e.length;
                if (ArrayBuffer.isView(e) || Z(e, ArrayBuffer))
                    return e.byteLength;
                if ("string" != typeof e)
                    throw new TypeError("The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type " + typeof e);
                var r = e.length
                  , a = 2 < arguments.length && !0 === arguments[2];
                if (!a && 0 === r)
                    return 0;
                for (var o = !1; ; )
                    switch (n) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                        return F(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return q(e).length;
                    default:
                        if (o)
                            return a ? -1 : F(e).length;
                        n = ("" + n).toLowerCase(),
                        o = !0;
                    }
            }
            function b(e, t, n) {
                var r = !1;
                if ((void 0 === t || 0 > t) && (t = 0),
                t > this.length)
                    return "";
                if ((void 0 === n || n > this.length) && (n = this.length),
                0 >= n)
                    return "";
                if (n >>>= 0,
                t >>>= 0,
                n <= t)
                    return "";
                for (e || (e = "utf8"); ; )
                    switch (e) {
                    case "hex":
                        return P(this, t, n);
                    case "utf8":
                    case "utf-8":
                        return R(this, t, n);
                    case "ascii":
                        return L(this, t, n);
                    case "latin1":
                    case "binary":
                        return A(this, t, n);
                    case "base64":
                        return T(this, t, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return O(this, t, n);
                    default:
                        if (r)
                            throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(),
                        r = !0;
                    }
            }
            function y(e, t, n) {
                var r = e[t];
                e[t] = e[n],
                e[n] = r
            }
            function w(e, n, r, a, o) {
                if (0 === e.length)
                    return -1;
                if ("string" == typeof r ? (a = r,
                r = 0) : 2147483647 < r ? r = 2147483647 : -2147483648 > r && (r = -2147483648),
                r = +r,
                V(r) && (r = o ? 0 : e.length - 1),
                0 > r && (r = e.length + r),
                r >= e.length) {
                    if (o)
                        return -1;
                    r = e.length - 1
                } else if (0 > r)
                    if (o)
                        r = 0;
                    else
                        return -1;
                if ("string" == typeof n && (n = t.from(n, a)),
                t.isBuffer(n))
                    return 0 === n.length ? -1 : k(e, n, r, a, o);
                if ("number" == typeof n)
                    return n &= 255,
                    "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, n, r) : Uint8Array.prototype.lastIndexOf.call(e, n, r) : k(e, [n], r, a, o);
                throw new TypeError("val must be string, number or Buffer")
            }
            function k(e, t, n, r, a) {
                function o(e, t) {
                    return 1 === d ? e[t] : e.readUInt16BE(t * d)
                }
                var d = 1
                  , s = e.length
                  , l = t.length;
                if (void 0 !== r && (r = (r + "").toLowerCase(),
                "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                    if (2 > e.length || 2 > t.length)
                        return -1;
                    d = 2,
                    s /= 2,
                    l /= 2,
                    n /= 2
                }
                var c;
                if (a) {
                    var u = -1;
                    for (c = n; c < s; c++)
                        if (o(e, c) !== o(t, -1 === u ? 0 : c - u))
                            -1 !== u && (c -= c - u),
                            u = -1;
                        else if (-1 === u && (u = c),
                        c - u + 1 === l)
                            return u * d
                } else
                    for (n + l > s && (n = s - l),
                    c = n; 0 <= c; c--) {
                        for (var f = !0, p = 0; p < l; p++)
                            if (o(e, c + p) !== o(t, p)) {
                                f = !1;
                                break
                            }
                        if (f)
                            return c
                    }
                return -1
            }
            function x(e, t, n, r) {
                n = +n || 0;
                var a = e.length - n;
                r ? (r = +r,
                r > a && (r = a)) : r = a;
                var o = t.length;
                r > o / 2 && (r = o / 2);
                for (var d = 0, s; d < r; ++d) {
                    if (s = parseInt(t.substr(2 * d, 2), 16),
                    V(s))
                        return d;
                    e[n + d] = s
                }
                return d
            }
            function v(e, t, n, r) {
                return G(F(t, e.length - n), e, n, r)
            }
            function S(e, t, n, r) {
                return G(W(t), e, n, r)
            }
            function E(e, t, n, r) {
                return S(e, t, n, r)
            }
            function C(e, t, n, r) {
                return G(q(t), e, n, r)
            }
            function I(e, t, n, r) {
                return G(H(t, e.length - n), e, n, r)
            }
            function T(e, t, n) {
                return 0 === t && n === e.length ? K.fromByteArray(e) : K.fromByteArray(e.slice(t, n))
            }
            function R(e, t, n) {
                n = o(e.length, n);
                for (var r = [], a = t; a < n; ) {
                    var d = e[a]
                      , s = null
                      , l = 239 < d ? 4 : 223 < d ? 3 : 191 < d ? 2 : 1;
                    if (a + l <= n) {
                        var c, u, f, p;
                        1 === l ? 128 > d && (s = d) : 2 === l ? (c = e[a + 1],
                        128 == (192 & c) && (p = (31 & d) << 6 | 63 & c,
                        127 < p && (s = p))) : 3 === l ? (c = e[a + 1],
                        u = e[a + 2],
                        128 == (192 & c) && 128 == (192 & u) && (p = (15 & d) << 12 | (63 & c) << 6 | 63 & u,
                        2047 < p && (55296 > p || 57343 < p) && (s = p))) : 4 === l ? (c = e[a + 1],
                        u = e[a + 2],
                        f = e[a + 3],
                        128 == (192 & c) && 128 == (192 & u) && 128 == (192 & f) && (p = (15 & d) << 18 | (63 & c) << 12 | (63 & u) << 6 | 63 & f,
                        65535 < p && 1114112 > p && (s = p))) : void 0
                    }
                    null === s ? (s = 65533,
                    l = 1) : 65535 < s && (s -= 65536,
                    r.push(55296 | 1023 & s >>> 10),
                    s = 56320 | 1023 & s),
                    r.push(s),
                    a += l
                }
                return B(r)
            }
            function B(e) {
                var t = e.length;
                if (t <= 4096)
                    return d.apply(String, e);
                for (var n = "", r = 0; r < t; )
                    n += d.apply(String, e.slice(r, r += 4096));
                return n
            }
            function L(e, t, n) {
                var r = "";
                n = o(e.length, n);
                for (var a = t; a < n; ++a)
                    r += d(127 & e[a]);
                return r
            }
            function A(e, t, n) {
                var r = "";
                n = o(e.length, n);
                for (var a = t; a < n; ++a)
                    r += d(e[a]);
                return r
            }
            function P(e, t, n) {
                var r = e.length;
                (!t || 0 > t) && (t = 0),
                (!n || 0 > n || n > r) && (n = r);
                for (var a = "", o = t; o < n; ++o)
                    a += $[e[o]];
                return a
            }
            function O(e, t, n) {
                for (var r = e.slice(t, n), a = "", o = 0; o < r.length; o += 2)
                    a += d(r[o] + 256 * r[o + 1]);
                return a
            }
            function U(e, t, n) {
                if (0 != e % 1 || 0 > e)
                    throw new RangeError("offset is not uint");
                if (e + t > n)
                    throw new RangeError("Trying to access beyond buffer length")
            }
            function D(e, n, r, a, o, i) {
                if (!t.isBuffer(e))
                    throw new TypeError("\"buffer\" argument must be a Buffer instance");
                if (n > o || n < i)
                    throw new RangeError("\"value\" argument is out of bounds");
                if (r + a > e.length)
                    throw new RangeError("Index out of range")
            }
            function M(e, t, n, r) {
                if (n + r > e.length)
                    throw new RangeError("Index out of range");
                if (0 > n)
                    throw new RangeError("Index out of range")
            }
            function j(e, t, n, r, a) {
                return t = +t,
                n >>>= 0,
                a || M(e, t, n, 4, 34028234663852886e22, -34028234663852886e22),
                X.write(e, t, n, r, 23, 4),
                n + 4
            }
            function N(e, t, n, r, a) {
                return t = +t,
                n >>>= 0,
                a || M(e, t, n, 8, 17976931348623157e292, -17976931348623157e292),
                X.write(e, t, n, r, 52, 8),
                n + 8
            }
            function z(e) {
                if (e = e.split("=")[0],
                e = e.trim().replace(J, ""),
                2 > e.length)
                    return "";
                for (; 0 != e.length % 4; )
                    e += "=";
                return e
            }
            function F(e, t) {
                t = t || 1 / 0;
                for (var n = e.length, r = null, a = [], o = 0, d; o < n; ++o) {
                    if (d = e.charCodeAt(o),
                    55295 < d && 57344 > d) {
                        if (!r) {
                            if (56319 < d) {
                                -1 < (t -= 3) && a.push(239, 191, 189);
                                continue
                            } else if (o + 1 === n) {
                                -1 < (t -= 3) && a.push(239, 191, 189);
                                continue
                            }
                            r = d;
                            continue
                        }
                        if (56320 > d) {
                            -1 < (t -= 3) && a.push(239, 191, 189),
                            r = d;
                            continue
                        }
                        d = (r - 55296 << 10 | d - 56320) + 65536
                    } else
                        r && -1 < (t -= 3) && a.push(239, 191, 189);
                    if (r = null,
                    128 > d) {
                        if (0 > (t -= 1))
                            break;
                        a.push(d)
                    } else if (2048 > d) {
                        if (0 > (t -= 2))
                            break;
                        a.push(192 | d >> 6, 128 | 63 & d)
                    } else if (65536 > d) {
                        if (0 > (t -= 3))
                            break;
                        a.push(224 | d >> 12, 128 | 63 & d >> 6, 128 | 63 & d)
                    } else if (1114112 > d) {
                        if (0 > (t -= 4))
                            break;
                        a.push(240 | d >> 18, 128 | 63 & d >> 12, 128 | 63 & d >> 6, 128 | 63 & d)
                    } else
                        throw new Error("Invalid code point")
                }
                return a
            }
            function W(e) {
                for (var t = [], n = 0; n < e.length; ++n)
                    t.push(255 & e.charCodeAt(n));
                return t
            }
            function H(e, t) {
                for (var n = [], r = 0, a, o, d; r < e.length && !(0 > (t -= 2)); ++r)
                    a = e.charCodeAt(r),
                    o = a >> 8,
                    d = a % 256,
                    n.push(d),
                    n.push(o);
                return n
            }
            function q(e) {
                return K.toByteArray(z(e))
            }
            function G(e, t, n, r) {
                for (var a = 0; a < r && !(a + n >= t.length || a >= e.length); ++a)
                    t[a + n] = e[a];
                return a
            }
            function Z(e, t) {
                return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
            }
            function V(e) {
                return e !== e
            }
            var K = e("base64-js")
              , X = e("ieee754")
              , Y = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
            n.Buffer = t,
            n.SlowBuffer = g,
            n.INSPECT_MAX_BYTES = 50;
            n.kMaxLength = 2147483647,
            t.TYPED_ARRAY_SUPPORT = function() {
                try {
                    var e = new Uint8Array(1)
                      , t = {
                        foo: function() {
                            return 42
                        }
                    };
                    return Object.setPrototypeOf(t, Uint8Array.prototype),
                    Object.setPrototypeOf(e, t),
                    42 === e.foo()
                } catch (t) {
                    return !1
                }
            }(),
            t.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
            Object.defineProperty(t.prototype, "parent", {
                enumerable: !0,
                get: function() {
                    return t.isBuffer(this) ? this.buffer : void 0
                }
            }),
            Object.defineProperty(t.prototype, "offset", {
                enumerable: !0,
                get: function() {
                    return t.isBuffer(this) ? this.byteOffset : void 0
                }
            }),
            "undefined" != typeof Symbol && null != Symbol.species && t[Symbol.species] === t && Object.defineProperty(t, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
            }),
            t.poolSize = 8192,
            t.from = function(e, t, n) {
                return i(e, t, n)
            }
            ,
            Object.setPrototypeOf(t.prototype, Uint8Array.prototype),
            Object.setPrototypeOf(t, Uint8Array),
            t.alloc = function(e, t, n) {
                return l(e, t, n)
            }
            ,
            t.allocUnsafe = function(e) {
                return c(e)
            }
            ,
            t.allocUnsafeSlow = function(e) {
                return c(e)
            }
            ,
            t.isBuffer = function(e) {
                return null != e && !0 === e._isBuffer && e !== t.prototype
            }
            ,
            t.compare = function(e, n) {
                if (Z(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)),
                Z(n, Uint8Array) && (n = t.from(n, n.offset, n.byteLength)),
                !t.isBuffer(e) || !t.isBuffer(n))
                    throw new TypeError("The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array");
                if (e === n)
                    return 0;
                for (var r = e.length, d = n.length, s = 0, l = o(r, d); s < l; ++s)
                    if (e[s] !== n[s]) {
                        r = e[s],
                        d = n[s];
                        break
                    }
                return r < d ? -1 : d < r ? 1 : 0
            }
            ,
            t.isEncoding = function(e) {
                switch ((e + "").toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1;
                }
            }
            ,
            t.concat = function(e, n) {
                if (!Array.isArray(e))
                    throw new TypeError("\"list\" argument must be an Array of Buffers");
                if (0 === e.length)
                    return t.alloc(0);
                var r;
                if (n === void 0)
                    for (n = 0,
                    r = 0; r < e.length; ++r)
                        n += e[r].length;
                var a = t.allocUnsafe(n)
                  , o = 0;
                for (r = 0; r < e.length; ++r) {
                    var d = e[r];
                    if (Z(d, Uint8Array) && (d = t.from(d)),
                    !t.isBuffer(d))
                        throw new TypeError("\"list\" argument must be an Array of Buffers");
                    d.copy(a, o),
                    o += d.length
                }
                return a
            }
            ,
            t.byteLength = _,
            t.prototype._isBuffer = !0,
            t.prototype.swap16 = function() {
                var e = this.length;
                if (0 != e % 2)
                    throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2)
                    y(this, t, t + 1);
                return this
            }
            ,
            t.prototype.swap32 = function() {
                var e = this.length;
                if (0 != e % 4)
                    throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4)
                    y(this, t, t + 3),
                    y(this, t + 1, t + 2);
                return this
            }
            ,
            t.prototype.swap64 = function() {
                var e = this.length;
                if (0 != e % 8)
                    throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8)
                    y(this, t, t + 7),
                    y(this, t + 1, t + 6),
                    y(this, t + 2, t + 5),
                    y(this, t + 3, t + 4);
                return this
            }
            ,
            t.prototype.toString = function() {
                var e = this.length;
                return 0 === e ? "" : 0 === arguments.length ? R(this, 0, e) : b.apply(this, arguments)
            }
            ,
            t.prototype.toLocaleString = t.prototype.toString,
            t.prototype.equals = function(e) {
                if (!t.isBuffer(e))
                    throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === t.compare(this, e)
            }
            ,
            t.prototype.inspect = function() {
                var e = ""
                  , t = n.INSPECT_MAX_BYTES;
                return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(),
                this.length > t && (e += " ... "),
                "<Buffer " + e + ">"
            }
            ,
            Y && (t.prototype[Y] = t.prototype.inspect),
            t.prototype.compare = function(e, n, r, a, d) {
                if (Z(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)),
                !t.isBuffer(e))
                    throw new TypeError("The \"target\" argument must be one of type Buffer or Uint8Array. Received type " + typeof e);
                if (void 0 === n && (n = 0),
                void 0 === r && (r = e ? e.length : 0),
                void 0 === a && (a = 0),
                void 0 === d && (d = this.length),
                0 > n || r > e.length || 0 > a || d > this.length)
                    throw new RangeError("out of range index");
                if (a >= d && n >= r)
                    return 0;
                if (a >= d)
                    return -1;
                if (n >= r)
                    return 1;
                if (n >>>= 0,
                r >>>= 0,
                a >>>= 0,
                d >>>= 0,
                this === e)
                    return 0;
                for (var s = d - a, l = r - n, c = o(s, l), u = this.slice(a, d), f = e.slice(n, r), p = 0; p < c; ++p)
                    if (u[p] !== f[p]) {
                        s = u[p],
                        l = f[p];
                        break
                    }
                return s < l ? -1 : l < s ? 1 : 0
            }
            ,
            t.prototype.includes = function(e, t, n) {
                return -1 !== this.indexOf(e, t, n)
            }
            ,
            t.prototype.indexOf = function(e, t, n) {
                return w(this, e, t, n, !0)
            }
            ,
            t.prototype.lastIndexOf = function(e, t, n) {
                return w(this, e, t, n, !1)
            }
            ,
            t.prototype.write = function(e, t, n, r) {
                if (void 0 === t)
                    r = "utf8",
                    n = this.length,
                    t = 0;
                else if (void 0 === n && "string" == typeof t)
                    r = t,
                    n = this.length,
                    t = 0;
                else if (isFinite(t))
                    t >>>= 0,
                    isFinite(n) ? (n >>>= 0,
                    void 0 === r && (r = "utf8")) : (r = n,
                    n = void 0);
                else
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                var a = this.length - t;
                if ((void 0 === n || n > a) && (n = a),
                0 < e.length && (0 > n || 0 > t) || t > this.length)
                    throw new RangeError("Attempt to write outside buffer bounds");
                r || (r = "utf8");
                for (var o = !1; ; )
                    switch (r) {
                    case "hex":
                        return x(this, e, t, n);
                    case "utf8":
                    case "utf-8":
                        return v(this, e, t, n);
                    case "ascii":
                        return S(this, e, t, n);
                    case "latin1":
                    case "binary":
                        return E(this, e, t, n);
                    case "base64":
                        return C(this, e, t, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return I(this, e, t, n);
                    default:
                        if (o)
                            throw new TypeError("Unknown encoding: " + r);
                        r = ("" + r).toLowerCase(),
                        o = !0;
                    }
            }
            ,
            t.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }
            ;
            t.prototype.slice = function(e, n) {
                var r = this.length;
                e = ~~e,
                n = void 0 === n ? r : ~~n,
                0 > e ? (e += r,
                0 > e && (e = 0)) : e > r && (e = r),
                0 > n ? (n += r,
                0 > n && (n = 0)) : n > r && (n = r),
                n < e && (n = e);
                var a = this.subarray(e, n);
                return Object.setPrototypeOf(a, t.prototype),
                a
            }
            ,
            t.prototype.readUIntLE = function(e, t, n) {
                e >>>= 0,
                t >>>= 0,
                n || U(e, t, this.length);
                for (var r = this[e], a = 1, o = 0; ++o < t && (a *= 256); )
                    r += this[e + o] * a;
                return r
            }
            ,
            t.prototype.readUIntBE = function(e, t, n) {
                e >>>= 0,
                t >>>= 0,
                n || U(e, t, this.length);
                for (var r = this[e + --t], a = 1; 0 < t && (a *= 256); )
                    r += this[e + --t] * a;
                return r
            }
            ,
            t.prototype.readUInt8 = function(e, t) {
                return e >>>= 0,
                t || U(e, 1, this.length),
                this[e]
            }
            ,
            t.prototype.readUInt16LE = function(e, t) {
                return e >>>= 0,
                t || U(e, 2, this.length),
                this[e] | this[e + 1] << 8
            }
            ,
            t.prototype.readUInt16BE = function(e, t) {
                return e >>>= 0,
                t || U(e, 2, this.length),
                this[e] << 8 | this[e + 1]
            }
            ,
            t.prototype.readUInt32LE = function(e, t) {
                return e >>>= 0,
                t || U(e, 4, this.length),
                (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }
            ,
            t.prototype.readUInt32BE = function(e, t) {
                return e >>>= 0,
                t || U(e, 4, this.length),
                16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }
            ,
            t.prototype.readIntLE = function(e, t, n) {
                e >>>= 0,
                t >>>= 0,
                n || U(e, t, this.length);
                for (var a = this[e], o = 1, d = 0; ++d < t && (o *= 256); )
                    a += this[e + d] * o;
                return o *= 128,
                a >= o && (a -= r(2, 8 * t)),
                a
            }
            ,
            t.prototype.readIntBE = function(e, t, n) {
                e >>>= 0,
                t >>>= 0,
                n || U(e, t, this.length);
                for (var a = t, o = 1, d = this[e + --a]; 0 < a && (o *= 256); )
                    d += this[e + --a] * o;
                return o *= 128,
                d >= o && (d -= r(2, 8 * t)),
                d
            }
            ,
            t.prototype.readInt8 = function(e, t) {
                return e >>>= 0,
                t || U(e, 1, this.length),
                128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }
            ,
            t.prototype.readInt16LE = function(e, t) {
                e >>>= 0,
                t || U(e, 2, this.length);
                var n = this[e] | this[e + 1] << 8;
                return 32768 & n ? 4294901760 | n : n
            }
            ,
            t.prototype.readInt16BE = function(e, t) {
                e >>>= 0,
                t || U(e, 2, this.length);
                var n = this[e + 1] | this[e] << 8;
                return 32768 & n ? 4294901760 | n : n
            }
            ,
            t.prototype.readInt32LE = function(e, t) {
                return e >>>= 0,
                t || U(e, 4, this.length),
                this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }
            ,
            t.prototype.readInt32BE = function(e, t) {
                return e >>>= 0,
                t || U(e, 4, this.length),
                this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }
            ,
            t.prototype.readFloatLE = function(e, t) {
                return e >>>= 0,
                t || U(e, 4, this.length),
                X.read(this, e, !0, 23, 4)
            }
            ,
            t.prototype.readFloatBE = function(e, t) {
                return e >>>= 0,
                t || U(e, 4, this.length),
                X.read(this, e, !1, 23, 4)
            }
            ,
            t.prototype.readDoubleLE = function(e, t) {
                return e >>>= 0,
                t || U(e, 8, this.length),
                X.read(this, e, !0, 52, 8)
            }
            ,
            t.prototype.readDoubleBE = function(e, t) {
                return e >>>= 0,
                t || U(e, 8, this.length),
                X.read(this, e, !1, 52, 8)
            }
            ,
            t.prototype.writeUIntLE = function(e, t, n, a) {
                if (e = +e,
                t >>>= 0,
                n >>>= 0,
                !a) {
                    var o = r(2, 8 * n) - 1;
                    D(this, e, t, n, o, 0)
                }
                var d = 1
                  , s = 0;
                for (this[t] = 255 & e; ++s < n && (d *= 256); )
                    this[t + s] = 255 & e / d;
                return t + n
            }
            ,
            t.prototype.writeUIntBE = function(e, t, n, a) {
                if (e = +e,
                t >>>= 0,
                n >>>= 0,
                !a) {
                    var o = r(2, 8 * n) - 1;
                    D(this, e, t, n, o, 0)
                }
                var d = n - 1
                  , s = 1;
                for (this[t + d] = 255 & e; 0 <= --d && (s *= 256); )
                    this[t + d] = 255 & e / s;
                return t + n
            }
            ,
            t.prototype.writeUInt8 = function(e, t, n) {
                return e = +e,
                t >>>= 0,
                n || D(this, e, t, 1, 255, 0),
                this[t] = 255 & e,
                t + 1
            }
            ,
            t.prototype.writeUInt16LE = function(e, t, n) {
                return e = +e,
                t >>>= 0,
                n || D(this, e, t, 2, 65535, 0),
                this[t] = 255 & e,
                this[t + 1] = e >>> 8,
                t + 2
            }
            ,
            t.prototype.writeUInt16BE = function(e, t, n) {
                return e = +e,
                t >>>= 0,
                n || D(this, e, t, 2, 65535, 0),
                this[t] = e >>> 8,
                this[t + 1] = 255 & e,
                t + 2
            }
            ,
            t.prototype.writeUInt32LE = function(e, t, n) {
                return e = +e,
                t >>>= 0,
                n || D(this, e, t, 4, 4294967295, 0),
                this[t + 3] = e >>> 24,
                this[t + 2] = e >>> 16,
                this[t + 1] = e >>> 8,
                this[t] = 255 & e,
                t + 4
            }
            ,
            t.prototype.writeUInt32BE = function(e, t, n) {
                return e = +e,
                t >>>= 0,
                n || D(this, e, t, 4, 4294967295, 0),
                this[t] = e >>> 24,
                this[t + 1] = e >>> 16,
                this[t + 2] = e >>> 8,
                this[t + 3] = 255 & e,
                t + 4
            }
            ,
            t.prototype.writeIntLE = function(e, t, n, a) {
                if (e = +e,
                t >>>= 0,
                !a) {
                    var o = r(2, 8 * n - 1);
                    D(this, e, t, n, o - 1, -o)
                }
                var d = 0
                  , s = 1
                  , l = 0;
                for (this[t] = 255 & e; ++d < n && (s *= 256); )
                    0 > e && 0 === l && 0 !== this[t + d - 1] && (l = 1),
                    this[t + d] = 255 & (e / s >> 0) - l;
                return t + n
            }
            ,
            t.prototype.writeIntBE = function(e, t, n, a) {
                if (e = +e,
                t >>>= 0,
                !a) {
                    var o = r(2, 8 * n - 1);
                    D(this, e, t, n, o - 1, -o)
                }
                var d = n - 1
                  , s = 1
                  , l = 0;
                for (this[t + d] = 255 & e; 0 <= --d && (s *= 256); )
                    0 > e && 0 === l && 0 !== this[t + d + 1] && (l = 1),
                    this[t + d] = 255 & (e / s >> 0) - l;
                return t + n
            }
            ,
            t.prototype.writeInt8 = function(e, t, n) {
                return e = +e,
                t >>>= 0,
                n || D(this, e, t, 1, 127, -128),
                0 > e && (e = 255 + e + 1),
                this[t] = 255 & e,
                t + 1
            }
            ,
            t.prototype.writeInt16LE = function(e, t, n) {
                return e = +e,
                t >>>= 0,
                n || D(this, e, t, 2, 32767, -32768),
                this[t] = 255 & e,
                this[t + 1] = e >>> 8,
                t + 2
            }
            ,
            t.prototype.writeInt16BE = function(e, t, n) {
                return e = +e,
                t >>>= 0,
                n || D(this, e, t, 2, 32767, -32768),
                this[t] = e >>> 8,
                this[t + 1] = 255 & e,
                t + 2
            }
            ,
            t.prototype.writeInt32LE = function(e, t, n) {
                return e = +e,
                t >>>= 0,
                n || D(this, e, t, 4, 2147483647, -2147483648),
                this[t] = 255 & e,
                this[t + 1] = e >>> 8,
                this[t + 2] = e >>> 16,
                this[t + 3] = e >>> 24,
                t + 4
            }
            ,
            t.prototype.writeInt32BE = function(e, t, n) {
                return e = +e,
                t >>>= 0,
                n || D(this, e, t, 4, 2147483647, -2147483648),
                0 > e && (e = 4294967295 + e + 1),
                this[t] = e >>> 24,
                this[t + 1] = e >>> 16,
                this[t + 2] = e >>> 8,
                this[t + 3] = 255 & e,
                t + 4
            }
            ,
            t.prototype.writeFloatLE = function(e, t, n) {
                return j(this, e, t, !0, n)
            }
            ,
            t.prototype.writeFloatBE = function(e, t, n) {
                return j(this, e, t, !1, n)
            }
            ,
            t.prototype.writeDoubleLE = function(e, t, n) {
                return N(this, e, t, !0, n)
            }
            ,
            t.prototype.writeDoubleBE = function(e, t, n) {
                return N(this, e, t, !1, n)
            }
            ,
            t.prototype.copy = function(e, n, r, a) {
                if (!t.isBuffer(e))
                    throw new TypeError("argument should be a Buffer");
                if (r || (r = 0),
                a || 0 === a || (a = this.length),
                n >= e.length && (n = e.length),
                n || (n = 0),
                0 < a && a < r && (a = r),
                a === r)
                    return 0;
                if (0 === e.length || 0 === this.length)
                    return 0;
                if (0 > n)
                    throw new RangeError("targetStart out of bounds");
                if (0 > r || r >= this.length)
                    throw new RangeError("Index out of range");
                if (0 > a)
                    throw new RangeError("sourceEnd out of bounds");
                a > this.length && (a = this.length),
                e.length - n < a - r && (a = e.length - n + r);
                var o = a - r;
                if (this === e && "function" == typeof Uint8Array.prototype.copyWithin)
                    this.copyWithin(n, r, a);
                else if (this === e && r < n && n < a)
                    for (var d = o - 1; 0 <= d; --d)
                        e[d + n] = this[d + r];
                else
                    Uint8Array.prototype.set.call(e, this.subarray(r, a), n);
                return o
            }
            ,
            t.prototype.fill = function(e, n, r, a) {
                if ("string" == typeof e) {
                    if ("string" == typeof n ? (a = n,
                    n = 0,
                    r = this.length) : "string" == typeof r && (a = r,
                    r = this.length),
                    void 0 !== a && "string" != typeof a)
                        throw new TypeError("encoding must be a string");
                    if ("string" == typeof a && !t.isEncoding(a))
                        throw new TypeError("Unknown encoding: " + a);
                    if (1 === e.length) {
                        var o = e.charCodeAt(0);
                        ("utf8" === a && 128 > o || "latin1" === a) && (e = o)
                    }
                } else
                    "number" == typeof e ? e &= 255 : "boolean" == typeof e && (e = +e);
                if (0 > n || this.length < n || this.length < r)
                    throw new RangeError("Out of range index");
                if (r <= n)
                    return this;
                n >>>= 0,
                r = r === void 0 ? this.length : r >>> 0,
                e || (e = 0);
                var d;
                if ("number" == typeof e)
                    for (d = n; d < r; ++d)
                        this[d] = e;
                else {
                    var s = t.isBuffer(e) ? e : t.from(e, a)
                      , l = s.length;
                    if (0 === l)
                        throw new TypeError("The value \"" + e + "\" is invalid for argument \"value\"");
                    for (d = 0; d < r - n; ++d)
                        this[d + n] = s[d % l]
                }
                return this
            }
            ;
            var J = /[^+/0-9A-Za-z-_]/g
              , $ = function() {
                for (var e = "0123456789abcdef", t = Array(256), n = 0, r; 16 > n; ++n) {
                    r = 16 * n;
                    for (var a = 0; 16 > a; ++a)
                        t[r + a] = e[n] + e[a]
                }
                return t
            }()
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        "base64-js": 4,
        buffer: 23,
        ieee754: 57
    }],
    24: [function(e, t) {
        t.exports = {
            100: "Continue",
            101: "Switching Protocols",
            102: "Processing",
            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-Authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            207: "Multi-Status",
            208: "Already Reported",
            226: "IM Used",
            300: "Multiple Choices",
            301: "Moved Permanently",
            302: "Found",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            307: "Temporary Redirect",
            308: "Permanent Redirect",
            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Timeout",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Payload Too Large",
            414: "URI Too Long",
            415: "Unsupported Media Type",
            416: "Range Not Satisfiable",
            417: "Expectation Failed",
            418: "I'm a teapot",
            421: "Misdirected Request",
            422: "Unprocessable Entity",
            423: "Locked",
            424: "Failed Dependency",
            425: "Unordered Collection",
            426: "Upgrade Required",
            428: "Precondition Required",
            429: "Too Many Requests",
            431: "Request Header Fields Too Large",
            451: "Unavailable For Legal Reasons",
            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Timeout",
            505: "HTTP Version Not Supported",
            506: "Variant Also Negotiates",
            507: "Insufficient Storage",
            508: "Loop Detected",
            509: "Bandwidth Limit Exceeded",
            510: "Not Extended",
            511: "Network Authentication Required"
        }
    }
    , {}],
    25: [function(e, t) {
        const n = e("block-stream2")
          , r = e("readable-stream");
        class a extends r.Writable {
            constructor(e, t, r={}) {
                if (super(r),
                !e || !e.put || !e.get)
                    throw new Error("First argument must be an abstract-chunk-store compliant store");
                if (t = +t,
                !t)
                    throw new Error("Second argument must be a chunk length");
                this._blockstream = new n(t,{
                    zeroPadding: !1
                }),
                this._outstandingPuts = 0;
                let a = 0;
                const o = t=>{
                    this.destroyed || (this._outstandingPuts += 1,
                    e.put(a, t, ()=>{
                        this._outstandingPuts -= 1,
                        0 === this._outstandingPuts && "function" == typeof this._finalCb && (this._finalCb(null),
                        this._finalCb = null)
                    }
                    ),
                    a += 1)
                }
                ;
                this._blockstream.on("data", o).on("error", e=>{
                    this.destroy(e)
                }
                )
            }
            _write(e, t, n) {
                this._blockstream.write(e, t, n)
            }
            _final(e) {
                this._blockstream.end(),
                this._blockstream.once("end", ()=>{
                    0 === this._outstandingPuts ? e(null) : this._finalCb = e
                }
                )
            }
            destroy(e) {
                this.destroyed || (this.destroyed = !0,
                e && this.emit("error", e),
                this.emit("close"))
            }
        }
        t.exports = a
    }
    , {
        "block-stream2": 16,
        "readable-stream": 160
    }],
    26: [function(e, t, n) {
        (function(e) {
            function t(e) {
                return Object.prototype.toString.call(e)
            }
            n.isArray = function(e) {
                return Array.isArray ? Array.isArray(e) : "[object Array]" === t(e)
            }
            ,
            n.isBoolean = function(e) {
                return "boolean" == typeof e
            }
            ,
            n.isNull = function(e) {
                return null === e
            }
            ,
            n.isNullOrUndefined = function(e) {
                return null == e
            }
            ,
            n.isNumber = function(e) {
                return "number" == typeof e
            }
            ,
            n.isString = function(e) {
                return "string" == typeof e
            }
            ,
            n.isSymbol = function(e) {
                return "symbol" == typeof e
            }
            ,
            n.isUndefined = function(e) {
                return void 0 === e
            }
            ,
            n.isRegExp = function(e) {
                return "[object RegExp]" === t(e)
            }
            ,
            n.isObject = function(e) {
                return "object" == typeof e && null !== e
            }
            ,
            n.isDate = function(e) {
                return "[object Date]" === t(e)
            }
            ,
            n.isError = function(n) {
                return "[object Error]" === t(n) || n instanceof Error
            }
            ,
            n.isFunction = function(e) {
                return "function" == typeof e
            }
            ,
            n.isPrimitive = function(e) {
                return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
            }
            ,
            n.isBuffer = e.isBuffer
        }
        ).call(this, {
            isBuffer: e("../../is-buffer/index.js")
        })
    }
    , {
        "../../is-buffer/index.js": 62
    }],
    27: [function(e, t) {
        var n = Math.ceil;
        (function(r, a, o) {
            function i(e) {
                return e.reduce((e,t)=>Array.isArray(t) ? e.concat(i(t)) : e.concat(t), [])
            }
            function d(e, t, n) {
                function a() {
                    A(e.map(e=>t=>{
                        const n = {};
                        if (m(e))
                            n.getStream = b(e),
                            n.length = e.size;
                        else if (o.isBuffer(e))
                            n.getStream = y(e),
                            n.length = e.length;
                        else if (_(e))
                            n.getStream = k(e, n),
                            n.length = 0;
                        else {
                            if ("string" == typeof e) {
                                if ("function" != typeof I.stat)
                                    throw new Error("filesystem paths do not work in the browser");
                                const n = 1 < l || c;
                                return void s(e, n, t)
                            }
                            throw new Error("invalid input type")
                        }
                        n.path = e.path,
                        t(null, n)
                    }
                    ), (e,t)=>e ? n(e) : void (t = i(t),
                    n(null, t, c)))
                }
                if (g(e) && (e = Array.from(e)),
                Array.isArray(e) || (e = [e]),
                0 === e.length)
                    throw new Error("invalid input type");
                e.forEach(e=>{
                    if (null == e)
                        throw new Error(`invalid input type: ${e}`)
                }
                ),
                e = e.map(e=>m(e) && "string" == typeof e.path && "function" == typeof I.stat ? e.path : e),
                1 !== e.length || "string" == typeof e[0] || e[0].name || (e[0].name = t.name);
                let d = null;
                e.forEach((t,n)=>{
                    if ("string" == typeof t)
                        return;
                    let r = t.fullPath || t.name;
                    r || (r = `Unknown File ${n + 1}`,
                    t.unknownName = !0),
                    t.path = r.split("/"),
                    t.path[0] || t.path.shift(),
                    2 > t.path.length ? d = null : 0 === n && 1 < e.length ? d = t.path[0] : t.path[0] !== d && (d = null)
                }
                ),
                e = e.filter(e=>{
                    if ("string" == typeof e)
                        return !0;
                    const t = e.path[e.path.length - 1];
                    return u(t) && R.not(t)
                }
                ),
                d && e.forEach(e=>{
                    const t = (o.isBuffer(e) || _(e)) && !e.path;
                    "string" == typeof e || t || e.path.shift()
                }
                ),
                !t.name && d && (t.name = d),
                t.name || e.some(e=>"string" == typeof e ? (t.name = E.basename(e),
                !0) : e.unknownName ? void 0 : (t.name = e.path[e.path.length - 1],
                !0)),
                t.name || (t.name = `Unnamed Torrent ${Date.now()}`);
                const l = e.reduce((e,t)=>e + +("string" == typeof t), 0);
                let c = 1 === e.length;
                if (1 === e.length && "string" == typeof e[0]) {
                    if ("function" != typeof I.stat)
                        throw new Error("filesystem paths do not work in the browser");
                    T(e[0], (e,t)=>e ? n(e) : void (c = t,
                    a()))
                } else
                    r.nextTick(()=>{
                        a()
                    }
                    )
            }
            function s(e, t, n) {
                c(e, l, (r,a)=>r ? n(r) : void (a = Array.isArray(a) ? i(a) : [a],
                e = E.normalize(e),
                t && (e = e.slice(0, e.lastIndexOf(E.sep) + 1)),
                e[e.length - 1] !== E.sep && (e += E.sep),
                a.forEach(t=>{
                    t.getStream = w(t.path),
                    t.path = t.path.replace(e, "").split(E.sep)
                }
                ),
                n(null, a)))
            }
            function l(e, t) {
                t = L(t),
                I.stat(e, (n,r)=>{
                    if (n)
                        return t(n);
                    const a = {
                        length: r.size,
                        path: e
                    };
                    t(null, a)
                }
                )
            }
            function c(e, t, n) {
                I.stat(e, (r,a)=>r ? n(r) : void (a.isDirectory() ? I.readdir(e, (r,a)=>r ? n(r) : void A(a.filter(u).filter(R.not).map(n=>r=>{
                    c(E.join(e, n), t, r)
                }
                ), n)) : a.isFile() && t(e, n)))
            }
            function u(e) {
                return "." !== e[0]
            }
            function f(e, t, n) {
                function r(e) {
                    c += e.length;
                    const t = p;
                    P(e, e=>{
                        l[t] = e,
                        f -= 1,
                        s()
                    }
                    ),
                    f += 1,
                    p += 1
                }
                function a() {
                    h = !0,
                    s()
                }
                function i(e) {
                    d(),
                    n(e)
                }
                function d() {
                    m.removeListener("error", i),
                    g.removeListener("data", r),
                    g.removeListener("end", a),
                    g.removeListener("error", i)
                }
                function s() {
                    h && 0 === f && (d(),
                    n(null, o.from(l.join(""), "hex"), c))
                }
                n = L(n);
                const l = [];
                let c = 0;
                const u = e.map(e=>e.getStream);
                let f = 0
                  , p = 0
                  , h = !1;
                const m = new B(u)
                  , g = new v(t,{
                    zeroPadding: !1
                });
                m.on("error", i),
                m.pipe(g).on("data", r).on("end", a).on("error", i)
            }
            function p(e, r, o) {
                let i = r.announceList;
                i || ("string" == typeof r.announce ? i = [[r.announce]] : Array.isArray(r.announce) && (i = r.announce.map(e=>[e]))),
                i || (i = []),
                a.WEBTORRENT_ANNOUNCE && ("string" == typeof a.WEBTORRENT_ANNOUNCE ? i.push([[a.WEBTORRENT_ANNOUNCE]]) : Array.isArray(a.WEBTORRENT_ANNOUNCE) && (i = i.concat(a.WEBTORRENT_ANNOUNCE.map(e=>[e])))),
                r.announce === void 0 && r.announceList === void 0 && (i = i.concat(t.exports.announceList)),
                "string" == typeof r.urlList && (r.urlList = [r.urlList]);
                const d = {
                    info: {
                        name: r.name
                    },
                    "creation date": n((+r.creationDate || Date.now()) / 1e3),
                    encoding: "UTF-8"
                };
                0 !== i.length && (d.announce = i[0][0],
                d["announce-list"] = i),
                r.comment !== void 0 && (d.comment = r.comment),
                r.createdBy !== void 0 && (d["created by"] = r.createdBy),
                r.private !== void 0 && (d.info.private = +r.private),
                r.info !== void 0 && Object.assign(d.info, r.info),
                r.sslCert !== void 0 && (d.info["ssl-cert"] = r.sslCert),
                r.urlList !== void 0 && (d["url-list"] = r.urlList);
                const s = r.pieceLength || S(e.reduce(h, 0));
                d.info["piece length"] = s,
                f(e, s, (t,n,a)=>t ? o(t) : void (d.info.pieces = n,
                e.forEach(e=>{
                    delete e.getStream
                }
                ),
                r.singleFileTorrent ? d.info.length = a : d.info.files = e,
                o(null, x.encode(d))))
            }
            function h(e, t) {
                return e + t.length
            }
            function m(e) {
                return "undefined" != typeof Blob && e instanceof Blob
            }
            function g(e) {
                return "undefined" != typeof FileList && e instanceof FileList
            }
            function _(e) {
                return "object" == typeof e && null != e && "function" == typeof e.pipe
            }
            function b(e) {
                return ()=>new C(e)
            }
            function y(e) {
                return ()=>{
                    const t = new O.PassThrough;
                    return t.end(e),
                    t
                }
            }
            function w(e) {
                return ()=>I.createReadStream(e)
            }
            function k(e, t) {
                return ()=>{
                    const n = new O.Transform;
                    return n._transform = function(e, n, r) {
                        t.length += e.length,
                        this.push(e),
                        r()
                    }
                    ,
                    e.pipe(n),
                    n
                }
            }
            const x = e("bencode")
              , v = e("block-stream2")
              , S = e("piece-length")
              , E = e("path")
              , C = e("filestream/read")
              , I = e("fs")
              , T = e("is-file")
              , R = e("junk")
              , B = e("multistream")
              , L = e("once")
              , A = e("run-parallel")
              , P = e("simple-sha1")
              , O = e("readable-stream");
            t.exports = function(e, t, n) {
                "function" == typeof t && ([t,n] = [n, t]),
                t = t ? Object.assign({}, t) : {},
                d(e, t, (e,r,a)=>e ? n(e) : void (t.singleFileTorrent = a,
                p(r, t, n)))
            }
            ,
            t.exports.parseInput = function(e, t, n) {
                "function" == typeof t && ([t,n] = [n, t]),
                t = t ? Object.assign({}, t) : {},
                d(e, t, n)
            }
            ,
            t.exports.announceList = [["udp://tracker.leechers-paradise.org:6969"], ["udp://tracker.coppersurfer.tk:6969"], ["udp://tracker.opentrackr.org:1337"], ["udp://explodie.org:6969"], ["udp://tracker.empire-js.us:1337"], ["wss://tracker.btorrent.xyz"], ["wss://tracker.openwebtorrent.com"], ["wss://tracker.fastcast.nz"]]
        }
        ).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("buffer").Buffer)
    }
    , {
        _process: 137,
        bencode: 7,
        "block-stream2": 16,
        buffer: 23,
        "filestream/read": 54,
        fs: 18,
        "is-file": 63,
        junk: 101,
        multistream: 112,
        once: 114,
        path: 133,
        "piece-length": 134,
        "readable-stream": 160,
        "run-parallel": 164,
        "simple-sha1": 171
    }],
    28: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e, t) {
            if (null == e)
                throw new TypeError("assign requires that input parameter not be null or undefined");
            for (var n in t = t || {},
            t)
                t.hasOwnProperty(n) && (e[n] = t[n]);
            return e
        }
        ,
        t.exports = n.default
    }
    , {}],
    29: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e) {
            return (0,
            r.default)({}, e)
        }
        ;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(e("../assign/index.js"));
        t.exports = n.default
    }
    , {
        "../assign/index.js": 28
    }],
    30: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e) {
            var t = new Date(e.getTime())
              , n = t.getTimezoneOffset();
            t.setSeconds(0, 0);
            var r = t.getTime() % 60000;
            return n * 60000 + r
        }
        ;
        t.exports = n.default
    }
    , {}],
    31: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e, t) {
            if (2 > arguments.length)
                throw new TypeError("2 arguments required, but only " + arguments.length + " present");
            var n = (0,
            r.default)(e)
              , a = (0,
            r.default)(t)
              , o = n.getTime() - a.getTime();
            return 0 > o ? -1 : 0 < o ? 1 : o
        }
        ;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(e("../toDate/index.js"));
        t.exports = n.default
    }
    , {
        "../toDate/index.js": 47
    }],
    32: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e, t) {
            if (2 > arguments.length)
                throw new TypeError("2 arguments required, but only " + arguments.length + " present");
            var n = (0,
            r.default)(e)
              , a = (0,
            r.default)(t)
              , o = n.getFullYear() - a.getFullYear()
              , i = n.getMonth() - a.getMonth();
            return 12 * o + i
        }
        ;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(e("../toDate/index.js"));
        t.exports = n.default
    }
    , {
        "../toDate/index.js": 47
    }],
    33: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e, t) {
            if (2 > arguments.length)
                throw new TypeError("2 arguments required, but only " + arguments.length + " present");
            var n = (0,
            r.default)(e)
              , a = (0,
            r.default)(t);
            return n.getTime() - a.getTime()
        }
        ;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(e("../toDate/index.js"));
        t.exports = n.default
    }
    , {
        "../toDate/index.js": 47
    }],
    34: [function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e, t) {
            if (2 > arguments.length)
                throw new TypeError("2 arguments required, but only " + arguments.length + " present");
            var n = (0,
            a.default)(e)
              , r = (0,
            a.default)(t)
              , d = (0,
            i.default)(n, r)
              , s = Math.abs((0,
            o.default)(n, r));
            n.setMonth(n.getMonth() - d * s);
            var l = (0,
            i.default)(n, r) === -d
              , c = d * (s - l);
            return 0 === c ? 0 : c
        }
        ;
        var a = r(e("../toDate/index.js"))
          , o = r(e("../differenceInCalendarMonths/index.js"))
          , i = r(e("../compareAsc/index.js"));
        t.exports = n.default
    }
    , {
        "../compareAsc/index.js": 31,
        "../differenceInCalendarMonths/index.js": 32,
        "../toDate/index.js": 47
    }],
    35: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e, t) {
            if (2 > arguments.length)
                throw new TypeError("2 arguments required, but only " + arguments.length + " present");
            var n = (0,
            r.default)(e, t) / 1e3;
            return 0 < n ? Math.floor(n) : Math.ceil(n)
        }
        ;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(e("../differenceInMilliseconds/index.js"));
        t.exports = n.default
    }
    , {
        "../differenceInMilliseconds/index.js": 33
    }],
    36: [function(e, t, n) {
        "use strict";
        var a = Math.round
          , o = Math.floor;
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e, t, n) {
            if (2 > arguments.length)
                throw new TypeError("2 arguments required, but only " + arguments.length + " present");
            var r = n || {}
              , p = r.locale || l.default;
            if (!p.formatDistance)
                throw new RangeError("locale must contain formatDistance property");
            var h = (0,
            i.default)(e, t);
            if (isNaN(h))
                throw new RangeError("Invalid time value");
            var m = (0,
            u.default)(r);
            m.addSuffix = !!r.addSuffix,
            m.comparison = h;
            var g, _;
            0 < h ? (g = (0,
            c.default)(t),
            _ = (0,
            c.default)(e)) : (g = (0,
            c.default)(e),
            _ = (0,
            c.default)(t));
            var b = (0,
            s.default)(_, g), y = ((0,
            f.default)(_) - (0,
            f.default)(g)) / 1e3, w = a((b - y) / 60), k;
            if (2 > w)
                return r.includeSeconds ? 5 > b ? p.formatDistance("lessThanXSeconds", 5, m) : 10 > b ? p.formatDistance("lessThanXSeconds", 10, m) : 20 > b ? p.formatDistance("lessThanXSeconds", 20, m) : 40 > b ? p.formatDistance("halfAMinute", null, m) : 60 > b ? p.formatDistance("lessThanXMinutes", 1, m) : p.formatDistance("xMinutes", 1, m) : 0 === w ? p.formatDistance("lessThanXMinutes", 1, m) : p.formatDistance("xMinutes", w, m);
            if (45 > w)
                return p.formatDistance("xMinutes", w, m);
            if (90 > w)
                return p.formatDistance("aboutXHours", 1, m);
            if (1440 > w) {
                var x = a(w / 60);
                return p.formatDistance("aboutXHours", x, m)
            }
            if (2520 > w)
                return p.formatDistance("xDays", 1, m);
            if (43200 > w) {
                var v = a(w / 1440);
                return p.formatDistance("xDays", v, m)
            }
            if (86400 > w)
                return k = a(w / 43200),
                p.formatDistance("aboutXMonths", k, m);
            if (k = (0,
            d.default)(_, g),
            12 > k) {
                var S = a(w / 43200);
                return p.formatDistance("xMonths", S, m)
            }
            var E = k % 12
              , C = o(k / 12);
            return 3 > E ? p.formatDistance("aboutXYears", C, m) : 9 > E ? p.formatDistance("overXYears", C, m) : p.formatDistance("almostXYears", C + 1, m)
        }
        ;
        var i = r(e("../compareAsc/index.js"))
          , d = r(e("../differenceInMonths/index.js"))
          , s = r(e("../differenceInSeconds/index.js"))
          , l = r(e("../locale/en-US/index.js"))
          , c = r(e("../toDate/index.js"))
          , u = r(e("../_lib/cloneObject/index.js"))
          , f = r(e("../_lib/getTimezoneOffsetInMilliseconds/index.js"));
        t.exports = n.default
    }
    , {
        "../_lib/cloneObject/index.js": 29,
        "../_lib/getTimezoneOffsetInMilliseconds/index.js": 30,
        "../compareAsc/index.js": 31,
        "../differenceInMonths/index.js": 34,
        "../differenceInSeconds/index.js": 35,
        "../locale/en-US/index.js": 46,
        "../toDate/index.js": 47
    }],
    37: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e) {
            return function(t) {
                var n = t || {}
                  , r = n.width ? n.width + "" : e.defaultWidth
                  , a = e.formats[r] || e.formats[e.defaultWidth];
                return a
            }
        }
        ,
        t.exports = n.default
    }
    , {}],
    38: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e) {
            return function(t, n) {
                var r = n || {}, a = r.context ? r.context + "" : "standalone", o;
                if ("formatting" === a && e.formattingValues) {
                    var i = e.defaultFormattingWidth || e.defaultWidth
                      , d = r.width ? r.width + "" : i;
                    o = e.formattingValues[d] || e.formattingValues[i]
                } else {
                    var s = e.defaultWidth
                      , l = r.width ? r.width + "" : e.defaultWidth;
                    o = e.values[l] || e.values[s]
                }
                var c = e.argumentCallback ? e.argumentCallback(t) : t;
                return o[c]
            }
        }
        ,
        t.exports = n.default
    }
    , {}],
    39: [function(e, t, n) {
        "use strict";
        function r(e, t) {
            for (var n in e)
                if (e.hasOwnProperty(n) && t(e[n]))
                    return n
        }
        function a(e, t) {
            for (var n = 0; n < e.length; n++)
                if (t(e[n]))
                    return n
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e) {
            return function(t, n) {
                var o = t + ""
                  , i = n || {}
                  , d = i.width
                  , s = d && e.matchPatterns[d] || e.matchPatterns[e.defaultMatchWidth]
                  , l = o.match(s);
                if (!l)
                    return null;
                var c = l[0], u = d && e.parsePatterns[d] || e.parsePatterns[e.defaultParseWidth], f;
                return f = "[object Array]" === Object.prototype.toString.call(u) ? a(u, function(e) {
                    return e.test(o)
                }) : r(u, function(e) {
                    return e.test(o)
                }),
                f = e.valueCallback ? e.valueCallback(f) : f,
                f = i.valueCallback ? i.valueCallback(f) : f,
                {
                    value: f,
                    rest: o.slice(c.length)
                }
            }
        }
        ,
        t.exports = n.default
    }
    , {}],
    40: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e) {
            return function(t, n) {
                var r = t + ""
                  , a = n || {}
                  , o = r.match(e.matchPattern);
                if (!o)
                    return null;
                var i = o[0]
                  , d = r.match(e.parsePattern);
                if (!d)
                    return null;
                var s = e.valueCallback ? e.valueCallback(d[0]) : d[0];
                return s = a.valueCallback ? a.valueCallback(s) : s,
                {
                    value: s,
                    rest: r.slice(i.length)
                }
            }
        }
        ,
        t.exports = n.default
    }
    , {}],
    41: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e, t, n) {
            n = n || {};
            var a;
            return a = "string" == typeof r[e] ? r[e] : 1 === t ? r[e].one : r[e].other.replace("{{count}}", t),
            n.addSuffix ? 0 < n.comparison ? "in " + a : a + " ago" : a
        }
        ;
        var r = {
            lessThanXSeconds: {
                one: "less than a second",
                other: "less than {{count}} seconds"
            },
            xSeconds: {
                one: "1 second",
                other: "{{count}} seconds"
            },
            halfAMinute: "half a minute",
            lessThanXMinutes: {
                one: "less than a minute",
                other: "less than {{count}} minutes"
            },
            xMinutes: {
                one: "1 minute",
                other: "{{count}} minutes"
            },
            aboutXHours: {
                one: "about 1 hour",
                other: "about {{count}} hours"
            },
            xHours: {
                one: "1 hour",
                other: "{{count}} hours"
            },
            xDays: {
                one: "1 day",
                other: "{{count}} days"
            },
            aboutXMonths: {
                one: "about 1 month",
                other: "about {{count}} months"
            },
            xMonths: {
                one: "1 month",
                other: "{{count}} months"
            },
            aboutXYears: {
                one: "about 1 year",
                other: "about {{count}} years"
            },
            xYears: {
                one: "1 year",
                other: "{{count}} years"
            },
            overXYears: {
                one: "over 1 year",
                other: "over {{count}} years"
            },
            almostXYears: {
                one: "almost 1 year",
                other: "almost {{count}} years"
            }
        };
        t.exports = n.default
    }
    , {}],
    42: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = void 0;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(e("../../../_lib/buildFormatLongFn/index.js"))
          , a = {
            date: (0,
            r.default)({
                formats: {
                    full: "EEEE, MMMM do, y",
                    long: "MMMM do, y",
                    medium: "MMM d, y",
                    short: "MM/dd/yyyy"
                },
                defaultWidth: "full"
            }),
            time: (0,
            r.default)({
                formats: {
                    full: "h:mm:ss a zzzz",
                    long: "h:mm:ss a z",
                    medium: "h:mm:ss a",
                    short: "h:mm a"
                },
                defaultWidth: "full"
            }),
            dateTime: (0,
            r.default)({
                formats: {
                    full: "{{date}} 'at' {{time}}",
                    long: "{{date}} 'at' {{time}}",
                    medium: "{{date}}, {{time}}",
                    short: "{{date}}, {{time}}"
                },
                defaultWidth: "full"
            })
        };
        n.default = a,
        t.exports = n.default
    }
    , {
        "../../../_lib/buildFormatLongFn/index.js": 37
    }],
    43: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e) {
            return r[e]
        }
        ;
        var r = {
            lastWeek: "'last' eeee 'at' p",
            yesterday: "'yesterday at' p",
            today: "'today at' p",
            tomorrow: "'tomorrow at' p",
            nextWeek: "eeee 'at' p",
            other: "P"
        };
        t.exports = n.default
    }
    , {}],
    44: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = void 0;
        var r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(e("../../../_lib/buildLocalizeFn/index.js"))
          , a = {
            ordinalNumber: function(e) {
                var t = +e
                  , n = t % 100;
                if (20 < n || 10 > n)
                    switch (n % 10) {
                    case 1:
                        return t + "st";
                    case 2:
                        return t + "nd";
                    case 3:
                        return t + "rd";
                    }
                return t + "th"
            },
            era: (0,
            r.default)({
                values: {
                    narrow: ["B", "A"],
                    abbreviated: ["BC", "AD"],
                    wide: ["Before Christ", "Anno Domini"]
                },
                defaultWidth: "wide"
            }),
            quarter: (0,
            r.default)({
                values: {
                    narrow: ["1", "2", "3", "4"],
                    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
                    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
                },
                defaultWidth: "wide",
                argumentCallback: function(e) {
                    return +e - 1
                }
            }),
            month: (0,
            r.default)({
                values: {
                    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                },
                defaultWidth: "wide"
            }),
            day: (0,
            r.default)({
                values: {
                    narrow: ["S", "M", "T", "W", "T", "F", "S"],
                    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                defaultWidth: "wide"
            }),
            dayPeriod: (0,
            r.default)({
                values: {
                    narrow: {
                        am: "a",
                        pm: "p",
                        midnight: "mi",
                        noon: "n",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    },
                    abbreviated: {
                        am: "AM",
                        pm: "PM",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    },
                    wide: {
                        am: "a.m.",
                        pm: "p.m.",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    }
                },
                defaultWidth: "wide",
                formattingValues: {
                    narrow: {
                        am: "a",
                        pm: "p",
                        midnight: "mi",
                        noon: "n",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    },
                    abbreviated: {
                        am: "AM",
                        pm: "PM",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    },
                    wide: {
                        am: "a.m.",
                        pm: "p.m.",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    }
                },
                defaultFormattingWidth: "wide"
            })
        };
        n.default = a,
        t.exports = n.default
    }
    , {
        "../../../_lib/buildLocalizeFn/index.js": 38
    }],
    45: [function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = void 0;
        var a = r(e("../../../_lib/buildMatchPatternFn/index.js"))
          , o = r(e("../../../_lib/buildMatchFn/index.js"))
          , i = /^(\d+)(th|st|nd|rd)?/i
          , d = /\d+/i
          , s = {
            narrow: /^(b|a)/i,
            abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
            wide: /^(before christ|before common era|anno domini|common era)/i
        }
          , l = {
            any: [/^b/i, /^(a|c)/i]
        }
          , c = {
            narrow: /^[1234]/i,
            abbreviated: /^q[1234]/i,
            wide: /^[1234](th|st|nd|rd)? quarter/i
        }
          , u = {
            any: [/1/i, /2/i, /3/i, /4/i]
        }
          , f = {
            narrow: /^[jfmasond]/i,
            abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
            wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
        }
          , p = {
            narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
            any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
        }
          , h = {
            narrow: /^[smtwf]/i,
            short: /^(su|mo|tu|we|th|fr|sa)/i,
            abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
            wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
        }
          , m = {
            narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
            any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
        }
          , g = {
            narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
            any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
        }
          , _ = {
            any: {
                am: /^a/i,
                pm: /^p/i,
                midnight: /^mi/i,
                noon: /^no/i,
                morning: /morning/i,
                afternoon: /afternoon/i,
                evening: /evening/i,
                night: /night/i
            }
        }
          , b = {
            ordinalNumber: (0,
            a.default)({
                matchPattern: i,
                parsePattern: d,
                valueCallback: function(e) {
                    return parseInt(e, 10)
                }
            }),
            era: (0,
            o.default)({
                matchPatterns: s,
                defaultMatchWidth: "wide",
                parsePatterns: l,
                defaultParseWidth: "any"
            }),
            quarter: (0,
            o.default)({
                matchPatterns: c,
                defaultMatchWidth: "wide",
                parsePatterns: u,
                defaultParseWidth: "any",
                valueCallback: function(e) {
                    return e + 1
                }
            }),
            month: (0,
            o.default)({
                matchPatterns: f,
                defaultMatchWidth: "wide",
                parsePatterns: p,
                defaultParseWidth: "any"
            }),
            day: (0,
            o.default)({
                matchPatterns: h,
                defaultMatchWidth: "wide",
                parsePatterns: m,
                defaultParseWidth: "any"
            }),
            dayPeriod: (0,
            o.default)({
                matchPatterns: g,
                defaultMatchWidth: "any",
                parsePatterns: _,
                defaultParseWidth: "any"
            })
        };
        n.default = b,
        t.exports = n.default
    }
    , {
        "../../../_lib/buildMatchFn/index.js": 39,
        "../../../_lib/buildMatchPatternFn/index.js": 40
    }],
    46: [function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = void 0;
        var a = r(e("./_lib/formatDistance/index.js"))
          , o = r(e("./_lib/formatLong/index.js"))
          , i = r(e("./_lib/formatRelative/index.js"))
          , d = r(e("./_lib/localize/index.js"))
          , s = r(e("./_lib/match/index.js"))
          , l = {
            code: "en-US",
            formatDistance: a.default,
            formatLong: o.default,
            formatRelative: i.default,
            localize: d.default,
            match: s.default,
            options: {
                weekStartsOn: 0,
                firstWeekContainsDate: 1
            }
        };
        n.default = l,
        t.exports = n.default
    }
    , {
        "./_lib/formatDistance/index.js": 41,
        "./_lib/formatLong/index.js": 42,
        "./_lib/formatRelative/index.js": 43,
        "./_lib/localize/index.js": 44,
        "./_lib/match/index.js": 45
    }],
    47: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = function(e) {
            if (1 > arguments.length)
                throw new TypeError("1 argument required, but only " + arguments.length + " present");
            var t = Object.prototype.toString.call(e);
            return e instanceof Date || "object" == typeof e && "[object Date]" === t ? new Date(e.getTime()) : "number" == typeof e || "[object Number]" === t ? new Date(e) : (("string" == typeof e || "[object String]" === t) && "undefined" != typeof console && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),
            console.warn(new Error().stack)),
            new Date(NaN))
        }
        ,
        t.exports = n.default
    }
    , {}],
    48: [function(e, t) {
        var i = Math.round
          , s = Math.abs;
        function n(e) {
            if (e += "",
            !(100 < e.length)) {
                var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
                if (t) {
                    var r = parseFloat(t[1])
                      , n = (t[2] || "ms").toLowerCase();
                    return "years" === n || "year" === n || "yrs" === n || "yr" === n || "y" === n ? 31557600000 * r : "weeks" === n || "week" === n || "w" === n ? 604800000 * r : "days" === n || "day" === n || "d" === n ? 86400000 * r : "hours" === n || "hour" === n || "hrs" === n || "hr" === n || "h" === n ? 3600000 * r : "minutes" === n || "minute" === n || "mins" === n || "min" === n || "m" === n ? 60000 * r : "seconds" === n || "second" === n || "secs" === n || "sec" === n || "s" === n ? 1000 * r : "milliseconds" === n || "millisecond" === n || "msecs" === n || "msec" === n || "ms" === n ? r : void 0
                }
            }
        }
        function r(e) {
            var t = s(e);
            return 86400000 <= t ? i(e / 86400000) + "d" : 3600000 <= t ? i(e / 3600000) + "h" : 60000 <= t ? i(e / 60000) + "m" : 1000 <= t ? i(e / 1000) + "s" : e + "ms"
        }
        function a(e) {
            var t = s(e);
            return 86400000 <= t ? o(e, t, 86400000, "day") : 3600000 <= t ? o(e, t, 3600000, "hour") : 60000 <= t ? o(e, t, 60000, "minute") : 1000 <= t ? o(e, t, 1000, "second") : e + " ms"
        }
        function o(e, t, r, n) {
            return i(e / r) + " " + n + (t >= 1.5 * r ? "s" : "")
        }
        var l = 24 * (60 * 60000);
        t.exports = function(e, t) {
            t = t || {};
            var o = typeof e;
            if ("string" == o && 0 < e.length)
                return n(e);
            if ("number" === o && isFinite(e))
                return t.long ? a(e) : r(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        }
    }
    , {}],
    49: [function(e, t, n) {
        (function(a) {
            function o() {
                let e;
                try {
                    e = n.storage.getItem("debug")
                } catch (e) {}
                return !e && "undefined" != typeof a && "env"in a && (e = a.env.DEBUG),
                e
            }
            n.log = function(...e) {
                return "object" == typeof console && console.log && console.log(...e)
            }
            ,
            n.formatArgs = function(e) {
                if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff),
                !this.useColors)
                    return;
                const n = "color: " + this.color;
                e.splice(1, 0, n, "color: inherit");
                let r = 0
                  , a = 0;
                e[0].replace(/%[a-zA-Z%]/g, e=>{
                    "%%" === e || (r++,
                    "%c" === e && (a = r))
                }
                ),
                e.splice(a, 0, n)
            }
            ,
            n.save = function(e) {
                try {
                    e ? n.storage.setItem("debug", e) : n.storage.removeItem("debug")
                } catch (e) {}
            }
            ,
            n.load = o,
            n.useColors = function() {
                return !!("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) || !("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            }
            ,
            n.storage = function() {
                try {
                    return localStorage
                } catch (e) {}
            }(),
            n.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"],
            t.exports = e("./common")(n);
            const {formatters: i} = t.exports;
            i.j = function(e) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return "[UnexpectedJSONParseError]: " + e.message
                }
            }
        }
        ).call(this, e("_process"))
    }
    , {
        "./common": 50,
        _process: 137
    }],
    50: [function(e, t) {
        var n = Math.abs;
        t.exports = function(t) {
            function r(e) {
                let t = 0;
                for (let n = 0; n < e.length; n++)
                    t = (t << 5) - t + e.charCodeAt(n),
                    t |= 0;
                return a.colors[n(t) % a.colors.length]
            }
            function a(e) {
                function t(...e) {
                    if (!t.enabled)
                        return;
                    const r = t
                      , o = +new Date
                      , i = o - (n || o);
                    r.diff = i,
                    r.prev = n,
                    r.curr = o,
                    n = o,
                    e[0] = a.coerce(e[0]),
                    "string" != typeof e[0] && e.unshift("%O");
                    let d = 0;
                    e[0] = e[0].replace(/%([a-zA-Z%])/g, (t,n)=>{
                        if ("%%" === t)
                            return t;
                        d++;
                        const o = a.formatters[n];
                        if ("function" == typeof o) {
                            const n = e[d];
                            t = o.call(r, n),
                            e.splice(d, 1),
                            d--
                        }
                        return t
                    }
                    ),
                    a.formatArgs.call(r, e);
                    const s = r.log || a.log;
                    s.apply(r, e)
                }
                let n;
                return t.namespace = e,
                t.enabled = a.enabled(e),
                t.useColors = a.useColors(),
                t.color = r(e),
                t.destroy = o,
                t.extend = i,
                "function" == typeof a.init && a.init(t),
                a.instances.push(t),
                t
            }
            function o() {
                const e = a.instances.indexOf(this);
                return -1 !== e && (a.instances.splice(e, 1),
                !0)
            }
            function i(e, t) {
                const n = a(this.namespace + ("undefined" == typeof t ? ":" : t) + e);
                return n.log = this.log,
                n
            }
            function d(e) {
                return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
            }
            return a.debug = a,
            a.default = a,
            a.coerce = function(e) {
                return e instanceof Error ? e.stack || e.message : e
            }
            ,
            a.disable = function() {
                const e = [...a.names.map(d), ...a.skips.map(d).map(e=>"-" + e)].join(",");
                return a.enable(""),
                e
            }
            ,
            a.enable = function(e) {
                a.save(e),
                a.names = [],
                a.skips = [];
                let t;
                const n = ("string" == typeof e ? e : "").split(/[\s,]+/)
                  , r = n.length;
                for (t = 0; t < r; t++)
                    n[t] && (e = n[t].replace(/\*/g, ".*?"),
                    "-" === e[0] ? a.skips.push(new RegExp("^" + e.substr(1) + "$")) : a.names.push(new RegExp("^" + e + "$")));
                for (t = 0; t < a.instances.length; t++) {
                    const e = a.instances[t];
                    e.enabled = a.enabled(e.namespace)
                }
            }
            ,
            a.enabled = function(e) {
                if ("*" === e[e.length - 1])
                    return !0;
                let t, n;
                for (t = 0,
                n = a.skips.length; t < n; t++)
                    if (a.skips[t].test(e))
                        return !1;
                for (t = 0,
                n = a.names.length; t < n; t++)
                    if (a.names[t].test(e))
                        return !0;
                return !1
            }
            ,
            a.humanize = e("ms"),
            Object.keys(t).forEach(e=>{
                a[e] = t[e]
            }
            ),
            a.instances = [],
            a.names = [],
            a.skips = [],
            a.formatters = {},
            a.selectColor = r,
            a.enable(a.load()),
            a
        }
    }
    , {
        ms: 48
    }],
    51: [function(e, t) {
        function n(e, t) {
            function a(e) {
                e.readEntries(e=>{
                    0 < e.length ? (i = i.concat(Array.from(e)),
                    a()) : o()
                }
                )
            }
            function o() {
                r(i.map(e=>t=>{
                    n(e, t)
                }
                ), (n,r)=>{
                    n ? t(n) : (r.push({
                        fullPath: e.fullPath,
                        name: e.name,
                        isFile: !1,
                        isDirectory: !0
                    }),
                    t(null, r))
                }
                )
            }
            let i = [];
            if (e.isFile)
                e.file(n=>{
                    n.fullPath = e.fullPath,
                    n.isFile = !0,
                    n.isDirectory = !1,
                    t(null, n)
                }
                , e=>{
                    t(e)
                }
                );
            else if (e.isDirectory) {
                const t = e.createReader();
                a(t)
            }
        }
        t.exports = function(t, a) {
            function o(t) {
                return a.onDragEnter && a.onDragEnter(t),
                t.stopPropagation(),
                t.preventDefault(),
                !1
            }
            function i(n) {
                if (n.stopPropagation(),
                n.preventDefault(),
                a.onDragOver && a.onDragOver(n),
                n.dataTransfer.items) {
                    const e = Array.from(n.dataTransfer.items)
                      , t = e.filter(e=>"file" === e.kind)
                      , r = e.filter(e=>"string" === e.kind);
                    if (0 === t.length && !a.onDropText)
                        return;
                    if (0 === r.length && !a.onDrop)
                        return;
                    if (0 === t.length && 0 === r.length)
                        return
                }
                return t.classList.add("drag"),
                clearTimeout(c),
                n.dataTransfer.dropEffect = "copy",
                !1
            }
            function d(t) {
                return t.stopPropagation(),
                t.preventDefault(),
                a.onDragLeave && a.onDragLeave(t),
                clearTimeout(c),
                c = setTimeout(l, 50),
                !1
            }
            function s(t) {
                t.stopPropagation(),
                t.preventDefault(),
                a.onDragLeave && a.onDragLeave(t),
                clearTimeout(c),
                l();
                const e = {
                    x: t.clientX,
                    y: t.clientY
                }
                  , o = t.dataTransfer.getData("text");
                if (o && a.onDropText && a.onDropText(o, e),
                a.onDrop && t.dataTransfer.items) {
                    const o = t.dataTransfer.files
                      , i = Array.from(t.dataTransfer.items).filter(e=>"file" === e.kind);
                    if (0 === i.length)
                        return;
                    r(i.map(e=>t=>{
                        n(e.webkitGetAsEntry(), t)
                    }
                    ), (t,n)=>{
                        if (t)
                            throw t;
                        const r = n.flat()
                          , i = r.filter(e=>e.isFile)
                          , d = r.filter(e=>e.isDirectory);
                        a.onDrop(i, e, o, d)
                    }
                    )
                }
                return !1
            }
            function l() {
                t.classList.remove("drag")
            }
            if ("string" == typeof t) {
                const e = t;
                if (t = window.document.querySelector(t),
                !t)
                    throw new Error(`"${e}" does not match any HTML elements`)
            }
            if (!t)
                throw new Error(`"${t}" is not a valid HTML element`);
            "function" == typeof a && (a = {
                onDrop: a
            });
            let c;
            return t.addEventListener("dragenter", o, !1),
            t.addEventListener("dragover", i, !1),
            t.addEventListener("dragleave", d, !1),
            t.addEventListener("drop", s, !1),
            function() {
                l(),
                t.removeEventListener("dragenter", o, !1),
                t.removeEventListener("dragover", i, !1),
                t.removeEventListener("dragleave", d, !1),
                t.removeEventListener("drop", s, !1)
            }
        }
        ;
        const r = e("run-parallel")
    }
    , {
        "run-parallel": 164
    }],
    52: [function(e, t) {
        (function(n) {
            var r = e("once")
              , a = function() {}
              , o = function(e) {
                return e.setHeader && "function" == typeof e.abort
            }
              , i = function(e) {
                return e.stdio && Array.isArray(e.stdio) && 3 === e.stdio.length
            }
              , d = function(e, t, s) {
                if ("function" == typeof t)
                    return d(e, null, t);
                t || (t = {}),
                s = r(s || a);
                var l = e._writableState
                  , c = e._readableState
                  , u = t.readable || !1 !== t.readable && e.readable
                  , f = t.writable || !1 !== t.writable && e.writable
                  , p = !1
                  , h = function() {
                    e.writable || m()
                }
                  , m = function() {
                    f = !1,
                    u || s.call(e)
                }
                  , g = function() {
                    u = !1,
                    f || s.call(e)
                }
                  , _ = function(t) {
                    s.call(e, t ? new Error("exited with error code: " + t) : null)
                }
                  , b = function(t) {
                    s.call(e, t)
                }
                  , y = function() {
                    n.nextTick(w)
                }
                  , w = function() {
                    return p ? void 0 : u && !(c && c.ended && !c.destroyed) ? s.call(e, new Error("premature close")) : f && !(l && l.ended && !l.destroyed) ? s.call(e, new Error("premature close")) : void 0
                }
                  , k = function() {
                    e.req.on("finish", m)
                };
                return o(e) ? (e.on("complete", m),
                e.on("abort", y),
                e.req ? k() : e.on("request", k)) : f && !l && (e.on("end", h),
                e.on("close", h)),
                i(e) && e.on("exit", _),
                e.on("end", g),
                e.on("finish", m),
                !1 !== t.error && e.on("error", b),
                e.on("close", y),
                function() {
                    p = !0,
                    e.removeListener("complete", m),
                    e.removeListener("abort", y),
                    e.removeListener("request", k),
                    e.req && e.req.removeListener("finish", m),
                    e.removeListener("end", h),
                    e.removeListener("close", h),
                    e.removeListener("finish", m),
                    e.removeListener("exit", _),
                    e.removeListener("end", g),
                    e.removeListener("error", b),
                    e.removeListener("close", y)
                }
            };
            t.exports = d
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137,
        once: 114
    }],
    53: [function(e, t) {
        function n() {
            this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = y(null),
            this._eventsCount = 0),
            this._maxListeners = this._maxListeners || void 0
        }
        function r(e) {
            return void 0 === e._maxListeners ? n.defaultMaxListeners : e._maxListeners
        }
        function a(e, t, n) {
            if (t)
                e.call(n);
            else
                for (var r = e.length, a = _(e, r), o = 0; o < r; ++o)
                    a[o].call(n)
        }
        function d(e, t, n, r) {
            if (t)
                e.call(n, r);
            else
                for (var a = e.length, o = _(e, a), d = 0; d < a; ++d)
                    o[d].call(n, r)
        }
        function s(e, t, n, r, a) {
            if (t)
                e.call(n, r, a);
            else
                for (var o = e.length, d = _(e, o), s = 0; s < o; ++s)
                    d[s].call(n, r, a)
        }
        function l(e, t, n, r, a, o) {
            if (t)
                e.call(n, r, a, o);
            else
                for (var d = e.length, s = _(e, d), l = 0; l < d; ++l)
                    s[l].call(n, r, a, o)
        }
        function c(e, t, n, r) {
            if (t)
                e.apply(n, r);
            else
                for (var a = e.length, o = _(e, a), d = 0; d < a; ++d)
                    o[d].apply(n, r)
        }
        function u(e, t, n, a) {
            var o, i, d;
            if ("function" != typeof n)
                throw new TypeError("\"listener\" argument must be a function");
            if (i = e._events,
            i ? (i.newListener && (e.emit("newListener", t, n.listener ? n.listener : n),
            i = e._events),
            d = i[t]) : (i = e._events = y(null),
            e._eventsCount = 0),
            !d)
                d = i[t] = n,
                ++e._eventsCount;
            else if ("function" == typeof d ? d = i[t] = a ? [n, d] : [d, n] : a ? d.unshift(n) : d.push(n),
            !d.warned && (o = r(e),
            o && 0 < o && d.length > o)) {
                d.warned = !0;
                var s = new Error("Possible EventEmitter memory leak detected. " + d.length + " \"" + (t + "\" listeners added. Use emitter.setMaxListeners() to increase limit."));
                s.name = "MaxListenersExceededWarning",
                s.emitter = e,
                s.type = t,
                s.count = d.length,
                "object" == typeof console && console.warn && console.warn("%s: %s", s.name, s.message)
            }
            return e
        }
        function f() {
            if (!this.fired)
                switch (this.target.removeListener(this.type, this.wrapFn),
                this.fired = !0,
                arguments.length) {
                case 0:
                    return this.listener.call(this.target);
                case 1:
                    return this.listener.call(this.target, arguments[0]);
                case 2:
                    return this.listener.call(this.target, arguments[0], arguments[1]);
                case 3:
                    return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
                default:
                    for (var e = Array(arguments.length), t = 0; t < e.length; ++t)
                        e[t] = arguments[t];
                    this.listener.apply(this.target, e);
                }
        }
        function p(e, t, n) {
            var r = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n
            }
              , a = k.call(f, r);
            return a.listener = n,
            r.wrapFn = a,
            a
        }
        function h(e, t, n) {
            var r = e._events;
            if (!r)
                return [];
            var a = r[t];
            return a ? "function" == typeof a ? n ? [a.listener || a] : [a] : n ? b(a) : _(a, a.length) : []
        }
        function m(e) {
            var t = this._events;
            if (t) {
                var n = t[e];
                if ("function" == typeof n)
                    return 1;
                if (n)
                    return n.length
            }
            return 0
        }
        function g(e, t) {
            for (var r = t, a = r + 1, o = e.length; a < o; r += 1,
            a += 1)
                e[r] = e[a];
            e.pop()
        }
        function _(e, t) {
            for (var n = Array(t), r = 0; r < t; ++r)
                n[r] = e[r];
            return n
        }
        function b(e) {
            for (var t = Array(e.length), n = 0; n < t.length; ++n)
                t[n] = e[n].listener || e[n];
            return t
        }
        var y = Object.create || function(e) {
            var t = function() {};
            return t.prototype = e,
            new t
        }
          , w = Object.keys || function(e) {
            var t = [];
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
            return n
        }
          , k = Function.prototype.bind || function(e) {
            var t = this;
            return function() {
                return t.apply(e, arguments)
            }
        }
        ;
        t.exports = n,
        n.EventEmitter = n,
        n.prototype._events = void 0,
        n.prototype._maxListeners = void 0;
        var x = 10, v;
        try {
            var S = {};
            Object.defineProperty && Object.defineProperty(S, "x", {
                value: 0
            }),
            v = 0 === S.x
        } catch (e) {
            v = !1
        }
        v ? Object.defineProperty(n, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
                return x
            },
            set: function(e) {
                if ("number" != typeof e || 0 > e || e !== e)
                    throw new TypeError("\"defaultMaxListeners\" must be a positive number");
                x = e
            }
        }) : n.defaultMaxListeners = x,
        n.prototype.setMaxListeners = function(e) {
            if ("number" != typeof e || 0 > e || isNaN(e))
                throw new TypeError("\"n\" argument must be a positive number");
            return this._maxListeners = e,
            this
        }
        ,
        n.prototype.getMaxListeners = function() {
            return r(this)
        }
        ,
        n.prototype.emit = function(e) {
            var t = "error" === e, n, r, o, u, f, p;
            if (p = this._events,
            p)
                t = t && null == p.error;
            else if (!t)
                return !1;
            if (t) {
                if (1 < arguments.length && (n = arguments[1]),
                n instanceof Error)
                    throw n;
                else {
                    var h = new Error("Unhandled \"error\" event. (" + n + ")");
                    throw h.context = n,
                    h
                }
                return !1
            }
            if (r = p[e],
            !r)
                return !1;
            var m = "function" == typeof r;
            switch (o = arguments.length,
            o) {
            case 1:
                a(r, m, this);
                break;
            case 2:
                d(r, m, this, arguments[1]);
                break;
            case 3:
                s(r, m, this, arguments[1], arguments[2]);
                break;
            case 4:
                l(r, m, this, arguments[1], arguments[2], arguments[3]);
                break;
            default:
                for (u = Array(o - 1),
                f = 1; f < o; f++)
                    u[f - 1] = arguments[f];
                c(r, m, this, u);
            }
            return !0
        }
        ,
        n.prototype.addListener = function(e, t) {
            return u(this, e, t, !1)
        }
        ,
        n.prototype.on = n.prototype.addListener,
        n.prototype.prependListener = function(e, t) {
            return u(this, e, t, !0)
        }
        ,
        n.prototype.once = function(e, t) {
            if ("function" != typeof t)
                throw new TypeError("\"listener\" argument must be a function");
            return this.on(e, p(this, e, t)),
            this
        }
        ,
        n.prototype.prependOnceListener = function(e, t) {
            if ("function" != typeof t)
                throw new TypeError("\"listener\" argument must be a function");
            return this.prependListener(e, p(this, e, t)),
            this
        }
        ,
        n.prototype.removeListener = function(e, t) {
            var n, r, a, o, d;
            if ("function" != typeof t)
                throw new TypeError("\"listener\" argument must be a function");
            if (r = this._events,
            !r)
                return this;
            if (n = r[e],
            !n)
                return this;
            if (n === t || n.listener === t)
                0 == --this._eventsCount ? this._events = y(null) : (delete r[e],
                r.removeListener && this.emit("removeListener", e, n.listener || t));
            else if ("function" != typeof n) {
                for (a = -1,
                o = n.length - 1; 0 <= o; o--)
                    if (n[o] === t || n[o].listener === t) {
                        d = n[o].listener,
                        a = o;
                        break
                    }
                if (0 > a)
                    return this;
                0 === a ? n.shift() : g(n, a),
                1 === n.length && (r[e] = n[0]),
                r.removeListener && this.emit("removeListener", e, d || t)
            }
            return this
        }
        ,
        n.prototype.removeAllListeners = function(e) {
            var t, n, r;
            if (n = this._events,
            !n)
                return this;
            if (!n.removeListener)
                return 0 === arguments.length ? (this._events = y(null),
                this._eventsCount = 0) : n[e] && (0 == --this._eventsCount ? this._events = y(null) : delete n[e]),
                this;
            if (0 === arguments.length) {
                var a = w(n), o;
                for (r = 0; r < a.length; ++r)
                    o = a[r],
                    "removeListener" === o || this.removeAllListeners(o);
                return this.removeAllListeners("removeListener"),
                this._events = y(null),
                this._eventsCount = 0,
                this
            }
            if (t = n[e],
            "function" == typeof t)
                this.removeListener(e, t);
            else if (t)
                for (r = t.length - 1; 0 <= r; r--)
                    this.removeListener(e, t[r]);
            return this
        }
        ,
        n.prototype.listeners = function(e) {
            return h(this, e, !0)
        }
        ,
        n.prototype.rawListeners = function(e) {
            return h(this, e, !1)
        }
        ,
        n.listenerCount = function(e, t) {
            return "function" == typeof e.listenerCount ? e.listenerCount(t) : m.call(e, t)
        }
        ,
        n.prototype.listenerCount = m,
        n.prototype.eventNames = function() {
            return 0 < this._eventsCount ? Reflect.ownKeys(this._events) : []
        }
    }
    , {}],
    54: [function(e, t) {
        const {Readable: n} = e("readable-stream")
          , r = e("typedarray-to-buffer");
        t.exports = class extends n {
            constructor(e, t={}) {
                super(t),
                this._offset = 0,
                this._ready = !1,
                this._file = e,
                this._size = e.size,
                this._chunkSize = t.chunkSize || Math.max(this._size / 1e3, 204800);
                const n = new FileReader;
                n.onload = ()=>{
                    this.push(r(n.result))
                }
                ,
                n.onerror = ()=>{
                    this.emit("error", n.error)
                }
                ,
                this.reader = n,
                this._generateHeaderBlocks(e, t, (e,t)=>e ? this.emit("error", e) : void (Array.isArray(t) && t.forEach(e=>this.push(e)),
                this._ready = !0,
                this.emit("_ready")))
            }
            _generateHeaderBlocks(e, t, n) {
                n(null, [])
            }
            _read() {
                if (!this._ready)
                    return void this.once("_ready", this._read.bind(this));
                const e = this._offset;
                let t = this._offset + this._chunkSize;
                return t > this._size && (t = this._size),
                e === this._size ? (this.destroy(),
                void this.push(null)) : void (this.reader.readAsArrayBuffer(this._file.slice(e, t)),
                this._offset = t)
            }
            destroy() {
                if (this._file = null,
                this.reader) {
                    this.reader.onload = null,
                    this.reader.onerror = null;
                    try {
                        this.reader.abort()
                    } catch (t) {}
                }
                this.reader = null
            }
        }
    }
    , {
        "readable-stream": 160,
        "typedarray-to-buffer": 207
    }],
    55: [function(e, t) {
        t.exports = function() {
            if ("undefined" == typeof window)
                return null;
            var e = {
                RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
                RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
                RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
            };
            return e.RTCPeerConnection ? e : null
        }
    }
    , {}],
    56: [function(e, t) {
        function n(e) {
            if ("string" == typeof e && (e = a.parse(e)),
            e.protocol || (e.protocol = "https:"),
            "https:" !== e.protocol)
                throw new Error("Protocol \"" + e.protocol + "\" not supported. Expected \"https:\"");
            return e
        }
        var r = e("http")
          , a = e("url")
          , o = t.exports;
        for (var i in r)
            r.hasOwnProperty(i) && (o[i] = r[i]);
        o.request = function(e, t) {
            return e = n(e),
            r.request.call(this, e, t)
        }
        ,
        o.get = function(e, t) {
            return e = n(e),
            r.get.call(this, e, t)
        }
    }
    , {
        http: 190,
        url: 212
    }],
    57: [function(e, t, n) {
        var r = Math.log
          , a = Math.abs
          , o = Math.pow
          , s = Math.floor;
        n.read = function(t, n, r, a, l) {
            var c = 8 * l - a - 1, u = (1 << c) - 1, f = u >> 1, p = -7, h = r ? l - 1 : 0, g = r ? -1 : 1, d = t[n + h], _, b;
            for (h += g,
            _ = d & (1 << -p) - 1,
            d >>= -p,
            p += c; 0 < p; _ = 256 * _ + t[n + h],
            h += g,
            p -= 8)
                ;
            for (b = _ & (1 << -p) - 1,
            _ >>= -p,
            p += a; 0 < p; b = 256 * b + t[n + h],
            h += g,
            p -= 8)
                ;
            if (0 === _)
                _ = 1 - f;
            else {
                if (_ === u)
                    return b ? NaN : (d ? -1 : 1) * (1 / 0);
                b += o(2, a),
                _ -= f
            }
            return (d ? -1 : 1) * b * o(2, _ - a)
        }
        ,
        n.write = function(t, n, l, u, f, p) {
            var h = Math.LN2, g = 8 * p - f - 1, _ = (1 << g) - 1, b = _ >> 1, y = 23 === f ? o(2, -24) - o(2, -77) : 0, w = u ? 0 : p - 1, k = u ? 1 : -1, d = 0 > n || 0 === n && 0 > 1 / n ? 1 : 0, x, v, S;
            for (n = a(n),
            isNaN(n) || n === 1 / 0 ? (v = isNaN(n) ? 1 : 0,
            x = _) : (x = s(r(n) / h),
            1 > n * (S = o(2, -x)) && (x--,
            S *= 2),
            n += 1 <= x + b ? y / S : y * o(2, 1 - b),
            2 <= n * S && (x++,
            S /= 2),
            x + b >= _ ? (v = 0,
            x = _) : 1 <= x + b ? (v = (n * S - 1) * o(2, f),
            x += b) : (v = n * o(2, b - 1) * o(2, f),
            x = 0)); 8 <= f; t[l + w] = 255 & v,
            w += k,
            v /= 256,
            f -= 8)
                ;
            for (x = x << f | v,
            g += f; 0 < g; t[l + w] = 255 & x,
            w += k,
            x /= 256,
            g -= 8)
                ;
            t[l + w - k] |= 128 * d
        }
    }
    , {}],
    58: [function(e, t) {
        const n = e("queue-microtask");
        t.exports = class {
            constructor(e) {
                if (this.store = e,
                this.chunkLength = e.chunkLength,
                !this.store || !this.store.get || !this.store.put)
                    throw new Error("First argument must be abstract-chunk-store compliant");
                this.mem = []
            }
            put(e, t, n) {
                this.mem[e] = t,
                this.store.put(e, t, t=>{
                    this.mem[e] = null,
                    n && n(t)
                }
                )
            }
            get(e, t, r) {
                if ("function" == typeof t)
                    return this.get(e, null, t);
                let a = this.mem[e];
                if (!a)
                    return this.store.get(e, t, r);
                if (t) {
                    const e = t.offset || 0
                      , n = t.length ? e + t.length : a.length;
                    a = a.slice(e, n)
                }
                n(()=>{
                    r && r(null, a)
                }
                )
            }
            close(e) {
                this.store.close(e)
            }
            destroy(e) {
                this.store.destroy(e)
            }
        }
    }
    , {
        "queue-microtask": 142
    }],
    59: [function(e, t) {
        (function(e) {
            'use strict';
            function n() {
                u = !0;
                for (var e = c.length, t, n; e; ) {
                    for (n = c,
                    c = [],
                    t = -1; ++t < e; )
                        n[t]();
                    e = c.length
                }
                u = !1
            }
            function r(e) {
                1 !== c.push(e) || u || o()
            }
            var a = e.MutationObserver || e.WebKitMutationObserver, o;
            if (a) {
                var i = 0
                  , d = new a(n)
                  , s = e.document.createTextNode("");
                d.observe(s, {
                    characterData: !0
                }),
                o = function() {
                    s.data = i = ++i % 2
                }
            } else if (!e.setImmediate && "undefined" != typeof e.MessageChannel) {
                var l = new e.MessageChannel;
                l.port1.onmessage = n,
                o = function() {
                    l.port2.postMessage(0)
                }
            } else
                o = "document"in e && "onreadystatechange"in e.document.createElement("script") ? function() {
                    var t = e.document.createElement("script");
                    t.onreadystatechange = function() {
                        n(),
                        t.onreadystatechange = null,
                        t.parentNode.removeChild(t),
                        t = null
                    }
                    ,
                    e.document.documentElement.appendChild(t)
                }
                : function() {
                    setTimeout(n, 0)
                }
                ;
            var c = [], u;
            t.exports = r
        }
        ).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {}],
    60: [function(e, t) {
        t.exports = "function" == typeof Object.create ? function(e, t) {
            t && (e.super_ = t,
            e.prototype = Object.create(t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }))
        }
        : function(e, t) {
            if (t) {
                e.super_ = t;
                var n = function() {};
                n.prototype = t.prototype,
                e.prototype = new n,
                e.prototype.constructor = e
            }
        }
    }
    , {}],
    61: [function(e, t) {
        t.exports = function(e) {
            for (var t = 0, n = e.length; t < n; ++t)
                if (e.charCodeAt(t) > 127)
                    return !1;
            return !0
        }
    }
    , {}],
    62: [function(e, t) {
        function n(e) {
            return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
        }
        function r(e) {
            return "function" == typeof e.readFloatLE && "function" == typeof e.slice && n(e.slice(0, 0))
        }
        /*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
        t.exports = function(e) {
            return null != e && (n(e) || r(e) || !!e._isBuffer)
        }
    }
    , {}],
    63: [function(e, t) {
        'use strict';
        function n(e) {
            return r.existsSync(e) && r.statSync(e).isFile()
        }
        var r = e("fs");
        t.exports = function(e, t) {
            return t ? void r.stat(e, function(e, n) {
                return e ? t(e) : t(null, n.isFile())
            }) : n(e)
        }
        ,
        t.exports.sync = n
    }
    , {
        fs: 18
    }],
    64: [function(e, t) {
        function n(e) {
            return r(e) || a(e)
        }
        function r(e) {
            return e instanceof Int8Array || e instanceof Int16Array || e instanceof Int32Array || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Uint16Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array
        }
        function a(e) {
            return i[o.call(e)]
        }
        t.exports = n,
        n.strict = r,
        n.loose = a;
        var o = Object.prototype.toString
          , i = {
            "[object Int8Array]": !0,
            "[object Int16Array]": !0,
            "[object Int32Array]": !0,
            "[object Uint8Array]": !0,
            "[object Uint8ClampedArray]": !0,
            "[object Uint16Array]": !0,
            "[object Uint32Array]": !0,
            "[object Float32Array]": !0,
            "[object Float64Array]": !0
        }
    }
    , {}],
    65: [function(e, t) {
        var n = {}.toString;
        t.exports = Array.isArray || function(e) {
            return "[object Array]" == n.call(e)
        }
    }
    , {}],
    66: [function(e, t, n) {
        'use strict';
        var r = e("./utils")
          , a = e("./support")
          , o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        n.encode = function(e) {
            for (var t = [], n = 0, a = e.length, d = a, s = "string" !== r.getTypeOf(e), l, c, u, f, p, h, m; n < e.length; )
                d = a - n,
                s ? (l = e[n++],
                c = n < a ? e[n++] : 0,
                u = n < a ? e[n++] : 0) : (l = e.charCodeAt(n++),
                c = n < a ? e.charCodeAt(n++) : 0,
                u = n < a ? e.charCodeAt(n++) : 0),
                f = l >> 2,
                p = (3 & l) << 4 | c >> 4,
                h = 1 < d ? (15 & c) << 2 | u >> 6 : 64,
                m = 2 < d ? 63 & u : 64,
                t.push(o.charAt(f) + o.charAt(p) + o.charAt(h) + o.charAt(m));
            return t.join("")
        }
        ,
        n.decode = function(e) {
            var t = 0, n = 0, r = "data:", d, s, l, c, u, f, p;
            if (e.substr(0, r.length) === r)
                throw new Error("Invalid base64 input, it looks like a data url.");
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            var h = 3 * e.length / 4;
            if (e.charAt(e.length - 1) === o.charAt(64) && h--,
            e.charAt(e.length - 2) === o.charAt(64) && h--,
            0 != h % 1)
                throw new Error("Invalid base64 input, bad content length.");
            var m;
            for (m = a.uint8array ? new Uint8Array(0 | h) : Array(0 | h); t < e.length; )
                c = o.indexOf(e.charAt(t++)),
                u = o.indexOf(e.charAt(t++)),
                f = o.indexOf(e.charAt(t++)),
                p = o.indexOf(e.charAt(t++)),
                d = c << 2 | u >> 4,
                s = (15 & u) << 4 | f >> 2,
                l = (3 & f) << 6 | p,
                m[n++] = d,
                64 !== f && (m[n++] = s),
                64 !== p && (m[n++] = l);
            return m
        }
    }
    , {
        "./support": 95,
        "./utils": 97
    }],
    67: [function(e, t) {
        'use strict';
        function n(e, t, n, r, a) {
            this.compressedSize = e,
            this.uncompressedSize = t,
            this.crc32 = n,
            this.compression = r,
            this.compressedContent = a
        }
        var r = e("./external")
          , a = e("./stream/DataWorker")
          , o = e("./stream/DataLengthProbe")
          , i = e("./stream/Crc32Probe")
          , o = e("./stream/DataLengthProbe");
        n.prototype = {
            getContentWorker: function() {
                var e = new a(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length"))
                  , t = this;
                return e.on("end", function() {
                    if (this.streamInfo.data_length !== t.uncompressedSize)
                        throw new Error("Bug : uncompressed data size mismatch")
                }),
                e
            },
            getCompressedWorker: function() {
                return new a(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression)
            }
        },
        n.createWorkerFrom = function(e, t, n) {
            return e.pipe(new i).pipe(new o("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new o("compressedSize")).withStreamInfo("compression", t)
        }
        ,
        t.exports = n
    }
    , {
        "./external": 71,
        "./stream/Crc32Probe": 90,
        "./stream/DataLengthProbe": 91,
        "./stream/DataWorker": 92
    }],
    68: [function(e, t, n) {
        'use strict';
        var r = e("./stream/GenericWorker");
        n.STORE = {
            magic: "\0\0",
            compressWorker: function() {
                return new r("STORE compression")
            },
            uncompressWorker: function() {
                return new r("STORE decompression")
            }
        },
        n.DEFLATE = e("./flate")
    }
    , {
        "./flate": 72,
        "./stream/GenericWorker": 93
    }],
    69: [function(e, t) {
        'use strict';
        function n(e, t, n, r) {
            e ^= -1;
            for (var a = r; a < r + n; a++)
                e = e >>> 8 ^ o[255 & (e ^ t[a])];
            return -1 ^ e
        }
        function r(e, t, n, r) {
            e ^= -1;
            for (var a = r; a < r + n; a++)
                e = e >>> 8 ^ o[255 & (e ^ t.charCodeAt(a))];
            return -1 ^ e
        }
        var a = e("./utils")
          , o = function() {
            for (var e = [], t = 0, r; 256 > t; t++) {
                r = t;
                for (var a = 0; 8 > a; a++)
                    r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
                e[t] = r
            }
            return e
        }();
        t.exports = function(e, t) {
            if ("undefined" == typeof e || !e.length)
                return 0;
            var o = "string" !== a.getTypeOf(e);
            return o ? n(0 | t, e, e.length, 0) : r(0 | t, e, e.length, 0)
        }
    }
    , {
        "./utils": 97
    }],
    70: [function(e, t, n) {
        'use strict';
        n.base64 = !1,
        n.binary = !1,
        n.dir = !1,
        n.createFolders = !0,
        n.date = null,
        n.compression = null,
        n.compressionOptions = null,
        n.comment = null,
        n.unixPermissions = null,
        n.dosPermissions = null
    }
    , {}],
    71: [function(e, t) {
        'use strict';
        var n = null;
        n = "undefined" == typeof Promise ? e("lie") : Promise,
        t.exports = {
            Promise: n
        }
    }
    , {
        lie: 102
    }],
    72: [function(e, t, n) {
        'use strict';
        function r(e, t) {
            d.call(this, "FlateWorker/" + e),
            this._pako = null,
            this._pakoAction = e,
            this._pakoOptions = t,
            this.meta = {}
        }
        var a = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array
          , o = e("pako")
          , i = e("./utils")
          , d = e("./stream/GenericWorker")
          , s = a ? "uint8array" : "array";
        n.magic = "\b\0",
        i.inherits(r, d),
        r.prototype.processChunk = function(e) {
            this.meta = e.meta,
            null === this._pako && this._createPako(),
            this._pako.push(i.transformTo(s, e.data), !1)
        }
        ,
        r.prototype.flush = function() {
            d.prototype.flush.call(this),
            null === this._pako && this._createPako(),
            this._pako.push([], !0)
        }
        ,
        r.prototype.cleanUp = function() {
            d.prototype.cleanUp.call(this),
            this._pako = null
        }
        ,
        r.prototype._createPako = function() {
            this._pako = new o[this._pakoAction]({
                raw: !0,
                level: this._pakoOptions.level || -1
            });
            var e = this;
            this._pako.onData = function(t) {
                e.push({
                    data: t,
                    meta: e.meta
                })
            }
        }
        ,
        n.compressWorker = function(e) {
            return new r("Deflate",e)
        }
        ,
        n.uncompressWorker = function() {
            return new r("Inflate",{})
        }
    }
    , {
        "./stream/GenericWorker": 93,
        "./utils": 97,
        pako: 115
    }],
    73: [function(e, t) {
        'use strict';
        var r = String.fromCharCode;
        function n(e, t, n, r) {
            o.call(this, "ZipFileWorker"),
            this.bytesWritten = 0,
            this.zipComment = t,
            this.zipPlatform = n,
            this.encodeFileName = r,
            this.streamFiles = e,
            this.accumulate = !1,
            this.contentBuffer = [],
            this.dirRecords = [],
            this.currentSourceOffset = 0,
            this.entriesCount = 0,
            this.currentFile = null,
            this._sources = []
        }
        var a = e("../utils")
          , o = e("../stream/GenericWorker")
          , i = e("../utf8")
          , d = e("../crc32")
          , s = e("../signature")
          , l = function(e, t) {
            var n = "", a;
            for (a = 0; a < t; a++)
                n += r(255 & e),
                e >>>= 8;
            return n
        }
          , c = function(e, t) {
            var n = e;
            return e || (n = t ? 16893 : 33204),
            (65535 & n) << 16
        }
          , u = function(e) {
            return 63 & (e || 0)
        }
          , f = function(e, t, n, r, o, f) {
            var p = e.file, h = e.compression, m = f !== i.utf8encode, g = a.transformTo("string", f(p.name)), _ = a.transformTo("string", i.utf8encode(p.name)), b = p.comment, y = a.transformTo("string", f(b)), w = a.transformTo("string", i.utf8encode(b)), k = _.length !== p.name.length, x = w.length !== b.length, v = "", S = "", E = "", C = p.dir, I = p.date, T = {
                crc32: 0,
                compressedSize: 0,
                uncompressedSize: 0
            }, R, B;
            (!t || n) && (T.crc32 = e.crc32,
            T.compressedSize = e.compressedSize,
            T.uncompressedSize = e.uncompressedSize);
            var L = 0;
            t && (L |= 8),
            !m && (k || x) && (L |= 2048);
            var A = 0
              , P = 0;
            C && (A |= 16),
            "UNIX" === o ? (P = 798,
            A |= c(p.unixPermissions, C)) : (P = 20,
            A |= u(p.dosPermissions, C)),
            R = I.getUTCHours(),
            R <<= 6,
            R |= I.getUTCMinutes(),
            R <<= 5,
            R |= I.getUTCSeconds() / 2,
            B = I.getUTCFullYear() - 1980,
            B <<= 4,
            B |= I.getUTCMonth() + 1,
            B <<= 5,
            B |= I.getUTCDate(),
            k && (S = l(1, 1) + l(d(g), 4) + _,
            v += "up" + l(S.length, 2) + S),
            x && (E = l(1, 1) + l(d(y), 4) + w,
            v += "uc" + l(E.length, 2) + E);
            var O = "";
            O += "\n\0",
            O += l(L, 2),
            O += h.magic,
            O += l(R, 2),
            O += l(B, 2),
            O += l(T.crc32, 4),
            O += l(T.compressedSize, 4),
            O += l(T.uncompressedSize, 4),
            O += l(g.length, 2),
            O += l(v.length, 2);
            var U = s.LOCAL_FILE_HEADER + O + g + v
              , D = s.CENTRAL_FILE_HEADER + l(P, 2) + O + l(y.length, 2) + "\0\0\0\0" + l(A, 4) + l(r, 4) + g + v + y;
            return {
                fileRecord: U,
                dirRecord: D
            }
        }
          , p = function(e, t, n, r, o) {
            var i = ""
              , d = a.transformTo("string", o(r));
            return i = s.CENTRAL_DIRECTORY_END + "\0\0\0\0" + l(e, 2) + l(e, 2) + l(t, 4) + l(n, 4) + l(d.length, 2) + d,
            i
        }
          , h = function(e) {
            var t = "";
            return t = s.DATA_DESCRIPTOR + l(e.crc32, 4) + l(e.compressedSize, 4) + l(e.uncompressedSize, 4),
            t
        };
        a.inherits(n, o),
        n.prototype.push = function(e) {
            var t = e.meta.percent || 0
              , n = this.entriesCount
              , r = this._sources.length;
            this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length,
            o.prototype.push.call(this, {
                data: e.data,
                meta: {
                    currentFile: this.currentFile,
                    percent: n ? (t + 100 * (n - r - 1)) / n : 100
                }
            }))
        }
        ,
        n.prototype.openedSource = function(e) {
            this.currentSourceOffset = this.bytesWritten,
            this.currentFile = e.file.name;
            var t = this.streamFiles && !e.file.dir;
            if (t) {
                var n = f(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                this.push({
                    data: n.fileRecord,
                    meta: {
                        percent: 0
                    }
                })
            } else
                this.accumulate = !0
        }
        ,
        n.prototype.closedSource = function(e) {
            this.accumulate = !1;
            var t = this.streamFiles && !e.file.dir
              , n = f(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(n.dirRecord),
            t)
                this.push({
                    data: h(e),
                    meta: {
                        percent: 100
                    }
                });
            else
                for (this.push({
                    data: n.fileRecord,
                    meta: {
                        percent: 0
                    }
                }); this.contentBuffer.length; )
                    this.push(this.contentBuffer.shift());
            this.currentFile = null
        }
        ,
        n.prototype.flush = function() {
            for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++)
                this.push({
                    data: this.dirRecords[t],
                    meta: {
                        percent: 100
                    }
                });
            var n = this.bytesWritten - e
              , r = p(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
            this.push({
                data: r,
                meta: {
                    percent: 100
                }
            })
        }
        ,
        n.prototype.prepareNextSource = function() {
            this.previous = this._sources.shift(),
            this.openedSource(this.previous.streamInfo),
            this.isPaused ? this.previous.pause() : this.previous.resume()
        }
        ,
        n.prototype.registerPrevious = function(e) {
            this._sources.push(e);
            var t = this;
            return e.on("data", function(e) {
                t.processChunk(e)
            }),
            e.on("end", function() {
                t.closedSource(t.previous.streamInfo),
                t._sources.length ? t.prepareNextSource() : t.end()
            }),
            e.on("error", function(n) {
                t.error(n)
            }),
            this
        }
        ,
        n.prototype.resume = function() {
            return !!o.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(),
            !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(),
            !0))
        }
        ,
        n.prototype.error = function(t) {
            var e = this._sources;
            if (!o.prototype.error.call(this, t))
                return !1;
            for (var n = 0; n < e.length; n++)
                try {
                    e[n].error(t)
                } catch (t) {}
            return !0
        }
        ,
        n.prototype.lock = function() {
            o.prototype.lock.call(this);
            for (var e = this._sources, t = 0; t < e.length; t++)
                e[t].lock()
        }
        ,
        t.exports = n
    }
    , {
        "../crc32": 69,
        "../signature": 88,
        "../stream/GenericWorker": 93,
        "../utf8": 96,
        "../utils": 97
    }],
    74: [function(e, t, n) {
        'use strict';
        var r = e("../compressions")
          , a = e("./ZipFileWorker")
          , o = function(e, t) {
            var n = e || t
              , a = r[n];
            if (!a)
                throw new Error(n + " is not a valid compression method !");
            return a
        };
        n.generateWorker = function(e, t, n) {
            var r = new a(t.streamFiles,n,t.platform,t.encodeFileName)
              , i = 0;
            try {
                e.forEach(function(e, n) {
                    i++;
                    var a = o(n.options.compression, t.compression)
                      , d = n.options.compressionOptions || t.compressionOptions || {}
                      , s = n.dir
                      , l = n.date;
                    n._compressWorker(a, d).withStreamInfo("file", {
                        name: e,
                        dir: s,
                        date: l,
                        comment: n.comment || "",
                        unixPermissions: n.unixPermissions,
                        dosPermissions: n.dosPermissions
                    }).pipe(r)
                }),
                r.entriesCount = i
            } catch (t) {
                r.error(t)
            }
            return r
        }
    }
    , {
        "../compressions": 68,
        "./ZipFileWorker": 73
    }],
    75: [function(e, t) {
        'use strict';
        function n() {
            if (!(this instanceof n))
                return new n;
            if (arguments.length)
                throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = {},
            this.comment = null,
            this.root = "",
            this.clone = function() {
                var e = new n;
                for (var t in this)
                    "function" != typeof this[t] && (e[t] = this[t]);
                return e
            }
        }
        n.prototype = e("./object"),
        n.prototype.loadAsync = e("./load"),
        n.support = e("./support"),
        n.defaults = e("./defaults"),
        n.version = "3.2.0",
        n.loadAsync = function(e, t) {
            return new n().loadAsync(e, t)
        }
        ,
        n.external = e("./external"),
        t.exports = n
    }
    , {
        "./defaults": 70,
        "./external": 71,
        "./load": 76,
        "./object": 80,
        "./support": 95
    }],
    76: [function(e, t) {
        'use strict';
        function n(e) {
            return new a.Promise(function(t, n) {
                var r = e.decompressed.getContentWorker().pipe(new d);
                r.on("error", function(t) {
                    n(t)
                }).on("end", function() {
                    r.streamInfo.crc32 === e.decompressed.crc32 ? t() : n(new Error("Corrupted zip : CRC32 mismatch"))
                }).resume()
            }
            )
        }
        var r = e("./utils")
          , a = e("./external")
          , o = e("./utf8")
          , r = e("./utils")
          , i = e("./zipEntries")
          , d = e("./stream/Crc32Probe")
          , s = e("./nodejsUtils");
        t.exports = function(e, t) {
            var d = this;
            return t = r.extend(t || {}, {
                base64: !1,
                checkCRC32: !1,
                optimizedBinaryString: !1,
                createFolders: !1,
                decodeFileName: o.utf8decode
            }),
            s.isNode && s.isStream(e) ? a.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(e) {
                var n = new i(t);
                return n.load(e),
                n
            }).then(function(e) {
                var r = [a.Promise.resolve(e)]
                  , o = e.files;
                if (t.checkCRC32)
                    for (var d = 0; d < o.length; d++)
                        r.push(n(o[d]));
                return a.Promise.all(r)
            }).then(function(e) {
                for (var n = e.shift(), r = n.files, a = 0, o; a < r.length; a++)
                    o = r[a],
                    d.file(o.fileNameStr, o.decompressed, {
                        binary: !0,
                        optimizedBinaryString: !0,
                        date: o.date,
                        dir: o.dir,
                        comment: o.fileCommentStr.length ? o.fileCommentStr : null,
                        unixPermissions: o.unixPermissions,
                        dosPermissions: o.dosPermissions,
                        createFolders: t.createFolders
                    });
                return n.zipComment.length && (d.comment = n.zipComment),
                d
            })
        }
    }
    , {
        "./external": 71,
        "./nodejsUtils": 79,
        "./stream/Crc32Probe": 90,
        "./utf8": 96,
        "./utils": 97,
        "./zipEntries": 98
    }],
    77: [function(e, t) {
        "use strict";
        function n(e, t) {
            a.call(this, "Nodejs stream input adapter for " + e),
            this._upstreamEnded = !1,
            this._bindStream(t)
        }
        var r = e("../utils")
          , a = e("../stream/GenericWorker");
        r.inherits(n, a),
        n.prototype._bindStream = function(e) {
            var t = this;
            this._stream = e,
            e.pause(),
            e.on("data", function(e) {
                t.push({
                    data: e,
                    meta: {
                        percent: 0
                    }
                })
            }).on("error", function(n) {
                t.isPaused ? this.generatedError = n : t.error(n)
            }).on("end", function() {
                t.isPaused ? t._upstreamEnded = !0 : t.end()
            })
        }
        ,
        n.prototype.pause = function() {
            return !!a.prototype.pause.call(this) && (this._stream.pause(),
            !0)
        }
        ,
        n.prototype.resume = function() {
            return !!a.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(),
            !0)
        }
        ,
        t.exports = n
    }
    , {
        "../stream/GenericWorker": 93,
        "../utils": 97
    }],
    78: [function(e, t) {
        'use strict';
        function n(e, t, n) {
            r.call(this, t),
            this._helper = e;
            var a = this;
            e.on("data", function(e, t) {
                a.push(e) || a._helper.pause(),
                n && n(t)
            }).on("error", function(t) {
                a.emit("error", t)
            }).on("end", function() {
                a.push(null)
            })
        }
        var r = e("readable-stream").Readable
          , a = e("../utils");
        a.inherits(n, r),
        n.prototype._read = function() {
            this._helper.resume()
        }
        ,
        t.exports = n
    }
    , {
        "../utils": 97,
        "readable-stream": 81
    }],
    79: [function(e, t) {
        (function(e) {
            'use strict';
            t.exports = {
                isNode: "undefined" != typeof e,
                newBufferFrom: function(t, n) {
                    if (e.from && e.from !== Uint8Array.from)
                        return e.from(t, n);
                    if ("number" == typeof t)
                        throw new Error("The \"data\" argument must not be a number");
                    return new e(t,n)
                },
                allocBuffer: function(t) {
                    if (e.alloc)
                        return e.alloc(t);
                    var n = new e(t);
                    return n.fill(0),
                    n
                },
                isBuffer: function(t) {
                    return e.isBuffer(t)
                },
                isStream: function(e) {
                    return e && "function" == typeof e.on && "function" == typeof e.pause && "function" == typeof e.resume
                }
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23
    }],
    80: [function(e, t) {
        'use strict';
        function n(e) {
            return "[object RegExp]" === Object.prototype.toString.call(e)
        }
        var r = e("./utf8")
          , a = e("./utils")
          , i = e("./stream/GenericWorker")
          , d = e("./stream/StreamHelper")
          , s = e("./defaults")
          , l = e("./compressedObject")
          , c = e("./zipObject")
          , u = e("./generate")
          , f = e("./nodejsUtils")
          , p = e("./nodejs/NodejsStreamInputAdapter")
          , h = function(e, t, n) {
            var r = a.getTypeOf(t), d = a.extend(n || {}, s), o;
            d.date = d.date || new Date,
            null !== d.compression && (d.compression = d.compression.toUpperCase()),
            "string" == typeof d.unixPermissions && (d.unixPermissions = parseInt(d.unixPermissions, 8)),
            d.unixPermissions && 16384 & d.unixPermissions && (d.dir = !0),
            d.dosPermissions && 16 & d.dosPermissions && (d.dir = !0),
            d.dir && (e = g(e)),
            d.createFolders && (o = m(e)) && _.call(this, o, !0);
            var u = "string" === r && !1 === d.binary && !1 === d.base64;
            n && "undefined" != typeof n.binary || (d.binary = !u);
            var h = t instanceof l && 0 === t.uncompressedSize;
            (h || d.dir || !t || 0 === t.length) && (d.base64 = !1,
            d.binary = !0,
            t = "",
            d.compression = "STORE",
            r = "string");
            var b = null;
            b = t instanceof l || t instanceof i ? t : f.isNode && f.isStream(t) ? new p(e,t) : a.prepareContent(e, t, d.binary, d.optimizedBinaryString, d.base64);
            var y = new c(e,b,d);
            this.files[e] = y
        }
          , m = function(e) {
            "/" === e.slice(-1) && (e = e.substring(0, e.length - 1));
            var t = e.lastIndexOf("/");
            return 0 < t ? e.substring(0, t) : ""
        }
          , g = function(e) {
            return "/" !== e.slice(-1) && (e += "/"),
            e
        }
          , _ = function(e, t) {
            return t = "undefined" == typeof t ? s.createFolders : t,
            e = g(e),
            this.files[e] || h.call(this, e, null, {
                dir: !0,
                createFolders: t
            }),
            this.files[e]
        };
        t.exports = {
            load: function() {
                throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
            },
            forEach: function(e) {
                var t, n, r;
                for (t in this.files)
                    this.files.hasOwnProperty(t) && (r = this.files[t],
                    n = t.slice(this.root.length, t.length),
                    n && t.slice(0, this.root.length) === this.root && e(n, r))
            },
            filter: function(e) {
                var t = [];
                return this.forEach(function(n, r) {
                    e(n, r) && t.push(r)
                }),
                t
            },
            file: function(e, t, r) {
                if (1 === arguments.length) {
                    if (n(e)) {
                        var a = e;
                        return this.filter(function(e, t) {
                            return !t.dir && a.test(e)
                        })
                    }
                    var o = this.files[this.root + e];
                    return o && !o.dir ? o : null
                }
                return e = this.root + e,
                h.call(this, e, t, r),
                this
            },
            folder: function(e) {
                if (!e)
                    return this;
                if (n(e))
                    return this.filter(function(t, n) {
                        return n.dir && e.test(t)
                    });
                var t = this.root + e
                  , r = _.call(this, t)
                  , a = this.clone();
                return a.root = r.name,
                a
            },
            remove: function(e) {
                e = this.root + e;
                var t = this.files[e];
                if (t || ("/" !== e.slice(-1) && (e += "/"),
                t = this.files[e]),
                t && !t.dir)
                    delete this.files[e];
                else
                    for (var n = this.filter(function(t, n) {
                        return n.name.slice(0, e.length) === e
                    }), r = 0; r < n.length; r++)
                        delete this.files[n[r].name];
                return this
            },
            generate: function() {
                throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
            },
            generateInternalStream: function(e) {
                var t = {}, n;
                try {
                    if (t = a.extend(e || {}, {
                        streamFiles: !1,
                        compression: "STORE",
                        compressionOptions: null,
                        type: "",
                        platform: "DOS",
                        comment: null,
                        mimeType: "application/zip",
                        encodeFileName: r.utf8encode
                    }),
                    t.type = t.type.toLowerCase(),
                    t.compression = t.compression.toUpperCase(),
                    "binarystring" === t.type && (t.type = "string"),
                    !t.type)
                        throw new Error("No output type specified.");
                    a.checkSupport(t.type),
                    ("darwin" === t.platform || "freebsd" === t.platform || "linux" === t.platform || "sunos" === t.platform) && (t.platform = "UNIX"),
                    "win32" === t.platform && (t.platform = "DOS");
                    var o = t.comment || this.comment || "";
                    n = u.generateWorker(this, t, o)
                } catch (t) {
                    n = new i("error"),
                    n.error(t)
                }
                return new d(n,t.type || "string",t.mimeType)
            },
            generateAsync: function(e, t) {
                return this.generateInternalStream(e).accumulate(t)
            },
            generateNodeStream: function(e, t) {
                return e = e || {},
                e.type || (e.type = "nodebuffer"),
                this.generateInternalStream(e).toNodejsStream(t)
            }
        }
    }
    , {
        "./compressedObject": 67,
        "./defaults": 70,
        "./generate": 74,
        "./nodejs/NodejsStreamInputAdapter": 77,
        "./nodejsUtils": 79,
        "./stream/GenericWorker": 93,
        "./stream/StreamHelper": 94,
        "./utf8": 96,
        "./utils": 97,
        "./zipObject": 100
    }],
    81: [function(e, t) {
        t.exports = e("stream")
    }
    , {
        stream: 175
    }],
    82: [function(e, t) {
        'use strict';
        function n(e) {
            r.call(this, e);
            for (var t = 0; t < this.data.length; t++)
                e[t] &= 255
        }
        var r = e("./DataReader")
          , a = e("../utils");
        a.inherits(n, r),
        n.prototype.byteAt = function(e) {
            return this.data[this.zero + e]
        }
        ,
        n.prototype.lastIndexOfSignature = function(e) {
            for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), a = e.charCodeAt(3), o = this.length - 4; 0 <= o; --o)
                if (this.data[o] === t && this.data[o + 1] === n && this.data[o + 2] === r && this.data[o + 3] === a)
                    return o - this.zero;
            return -1
        }
        ,
        n.prototype.readAndCheckSignature = function(e) {
            var t = e.charCodeAt(0)
              , n = e.charCodeAt(1)
              , r = e.charCodeAt(2)
              , a = e.charCodeAt(3)
              , o = this.readData(4);
            return t === o[0] && n === o[1] && r === o[2] && a === o[3]
        }
        ,
        n.prototype.readData = function(e) {
            if (this.checkOffset(e),
            0 === e)
                return [];
            var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
            return this.index += e,
            t
        }
        ,
        t.exports = n
    }
    , {
        "../utils": 97,
        "./DataReader": 83
    }],
    83: [function(e, t) {
        'use strict';
        function n(e) {
            this.data = e,
            this.length = e.length,
            this.index = 0,
            this.zero = 0
        }
        var r = e("../utils");
        n.prototype = {
            checkOffset: function(e) {
                this.checkIndex(this.index + e)
            },
            checkIndex: function(e) {
                if (this.length < this.zero + e || 0 > e)
                    throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?")
            },
            setIndex: function(e) {
                this.checkIndex(e),
                this.index = e
            },
            skip: function(e) {
                this.setIndex(this.index + e)
            },
            byteAt: function() {},
            readInt: function(e) {
                var t = 0, n;
                for (this.checkOffset(e),
                n = this.index + e - 1; n >= this.index; n--)
                    t = (t << 8) + this.byteAt(n);
                return this.index += e,
                t
            },
            readString: function(e) {
                return r.transformTo("string", this.readData(e))
            },
            readData: function() {},
            lastIndexOfSignature: function() {},
            readAndCheckSignature: function() {},
            readDate: function() {
                var e = this.readInt(4);
                return new Date(Date.UTC((127 & e >> 25) + 1980, (15 & e >> 21) - 1, 31 & e >> 16, 31 & e >> 11, 63 & e >> 5, (31 & e) << 1))
            }
        },
        t.exports = n
    }
    , {
        "../utils": 97
    }],
    84: [function(e, t) {
        'use strict';
        function n(e) {
            r.call(this, e)
        }
        var r = e("./Uint8ArrayReader")
          , a = e("../utils");
        a.inherits(n, r),
        n.prototype.readData = function(e) {
            this.checkOffset(e);
            var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
            return this.index += e,
            t
        }
        ,
        t.exports = n
    }
    , {
        "../utils": 97,
        "./Uint8ArrayReader": 86
    }],
    85: [function(e, t) {
        'use strict';
        function n(e) {
            r.call(this, e)
        }
        var r = e("./DataReader")
          , a = e("../utils");
        a.inherits(n, r),
        n.prototype.byteAt = function(e) {
            return this.data.charCodeAt(this.zero + e)
        }
        ,
        n.prototype.lastIndexOfSignature = function(e) {
            return this.data.lastIndexOf(e) - this.zero
        }
        ,
        n.prototype.readAndCheckSignature = function(e) {
            var t = this.readData(4);
            return e === t
        }
        ,
        n.prototype.readData = function(e) {
            this.checkOffset(e);
            var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
            return this.index += e,
            t
        }
        ,
        t.exports = n
    }
    , {
        "../utils": 97,
        "./DataReader": 83
    }],
    86: [function(e, t) {
        'use strict';
        function n(e) {
            r.call(this, e)
        }
        var r = e("./ArrayReader")
          , a = e("../utils");
        a.inherits(n, r),
        n.prototype.readData = function(e) {
            if (this.checkOffset(e),
            0 === e)
                return new Uint8Array(0);
            var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
            return this.index += e,
            t
        }
        ,
        t.exports = n
    }
    , {
        "../utils": 97,
        "./ArrayReader": 82
    }],
    87: [function(e, t) {
        'use strict';
        var n = e("../utils")
          , r = e("../support")
          , a = e("./ArrayReader")
          , o = e("./StringReader")
          , i = e("./NodeBufferReader")
          , d = e("./Uint8ArrayReader");
        t.exports = function(e) {
            var t = n.getTypeOf(e);
            return n.checkSupport(t),
            "string" !== t || r.uint8array ? "nodebuffer" === t ? new i(e) : r.uint8array ? new d(n.transformTo("uint8array", e)) : new a(n.transformTo("array", e)) : new o(e)
        }
    }
    , {
        "../support": 95,
        "../utils": 97,
        "./ArrayReader": 82,
        "./NodeBufferReader": 84,
        "./StringReader": 85,
        "./Uint8ArrayReader": 86
    }],
    88: [function(e, t, n) {
        'use strict';
        n.LOCAL_FILE_HEADER = "PK\x03\x04",
        n.CENTRAL_FILE_HEADER = "PK\x01\x02",
        n.CENTRAL_DIRECTORY_END = "PK\x05\x06",
        n.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07",
        n.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06",
        n.DATA_DESCRIPTOR = "PK\x07\b"
    }
    , {}],
    89: [function(e, t) {
        'use strict';
        function n(e) {
            r.call(this, "ConvertWorker to " + e),
            this.destType = e
        }
        var r = e("./GenericWorker")
          , a = e("../utils");
        a.inherits(n, r),
        n.prototype.processChunk = function(e) {
            this.push({
                data: a.transformTo(this.destType, e.data),
                meta: e.meta
            })
        }
        ,
        t.exports = n
    }
    , {
        "../utils": 97,
        "./GenericWorker": 93
    }],
    90: [function(e, t) {
        'use strict';
        function n() {
            r.call(this, "Crc32Probe"),
            this.withStreamInfo("crc32", 0)
        }
        var r = e("./GenericWorker")
          , a = e("../crc32")
          , o = e("../utils");
        o.inherits(n, r),
        n.prototype.processChunk = function(e) {
            this.streamInfo.crc32 = a(e.data, this.streamInfo.crc32 || 0),
            this.push(e)
        }
        ,
        t.exports = n
    }
    , {
        "../crc32": 69,
        "../utils": 97,
        "./GenericWorker": 93
    }],
    91: [function(e, t) {
        'use strict';
        function n(e) {
            a.call(this, "DataLengthProbe for " + e),
            this.propName = e,
            this.withStreamInfo(e, 0)
        }
        var r = e("../utils")
          , a = e("./GenericWorker");
        r.inherits(n, a),
        n.prototype.processChunk = function(e) {
            if (e) {
                var t = this.streamInfo[this.propName] || 0;
                this.streamInfo[this.propName] = t + e.data.length
            }
            a.prototype.processChunk.call(this, e)
        }
        ,
        t.exports = n
    }
    , {
        "../utils": 97,
        "./GenericWorker": 93
    }],
    92: [function(e, t) {
        'use strict';
        function n(e) {
            a.call(this, "DataWorker");
            var t = this;
            this.dataIsReady = !1,
            this.index = 0,
            this.max = 0,
            this.data = null,
            this.type = "",
            this._tickScheduled = !1,
            e.then(function(e) {
                t.dataIsReady = !0,
                t.data = e,
                t.max = e && e.length || 0,
                t.type = r.getTypeOf(e),
                t.isPaused || t._tickAndRepeat()
            }, function(n) {
                t.error(n)
            })
        }
        var r = e("../utils")
          , a = e("./GenericWorker");
        r.inherits(n, a),
        n.prototype.cleanUp = function() {
            a.prototype.cleanUp.call(this),
            this.data = null
        }
        ,
        n.prototype.resume = function() {
            return !!a.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0,
            r.delay(this._tickAndRepeat, [], this)),
            !0)
        }
        ,
        n.prototype._tickAndRepeat = function() {
            this._tickScheduled = !1;
            this.isPaused || this.isFinished || (this._tick(),
            !this.isFinished && (r.delay(this._tickAndRepeat, [], this),
            this._tickScheduled = !0))
        }
        ,
        n.prototype._tick = function() {
            if (this.isPaused || this.isFinished)
                return !1;
            var e = null
              , t = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max)
                return this.end();
            switch (this.type) {
            case "string":
                e = this.data.substring(this.index, t);
                break;
            case "uint8array":
                e = this.data.subarray(this.index, t);
                break;
            case "array":
            case "nodebuffer":
                e = this.data.slice(this.index, t);
            }
            return this.index = t,
            this.push({
                data: e,
                meta: {
                    percent: this.max ? 100 * (this.index / this.max) : 0
                }
            })
        }
        ,
        t.exports = n
    }
    , {
        "../utils": 97,
        "./GenericWorker": 93
    }],
    93: [function(e, t) {
        'use strict';
        function n(e) {
            this.name = e || "default",
            this.streamInfo = {},
            this.generatedError = null,
            this.extraStreamInfo = {},
            this.isPaused = !0,
            this.isFinished = !1,
            this.isLocked = !1,
            this._listeners = {
                data: [],
                end: [],
                error: []
            },
            this.previous = null
        }
        n.prototype = {
            push: function(e) {
                this.emit("data", e)
            },
            end: function() {
                if (this.isFinished)
                    return !1;
                this.flush();
                try {
                    this.emit("end"),
                    this.cleanUp(),
                    this.isFinished = !0
                } catch (t) {
                    this.emit("error", t)
                }
                return !0
            },
            error: function(t) {
                return !this.isFinished && (this.isPaused ? this.generatedError = t : (this.isFinished = !0,
                this.emit("error", t),
                this.previous && this.previous.error(t),
                this.cleanUp()),
                !0)
            },
            on: function(e, t) {
                return this._listeners[e].push(t),
                this
            },
            cleanUp: function() {
                this.streamInfo = this.generatedError = this.extraStreamInfo = null,
                this._listeners = []
            },
            emit: function(e, t) {
                if (this._listeners[e])
                    for (var n = 0; n < this._listeners[e].length; n++)
                        this._listeners[e][n].call(this, t)
            },
            pipe: function(e) {
                return e.registerPrevious(this)
            },
            registerPrevious: function(e) {
                if (this.isLocked)
                    throw new Error("The stream '" + this + "' has already been used.");
                this.streamInfo = e.streamInfo,
                this.mergeStreamInfo(),
                this.previous = e;
                var t = this;
                return e.on("data", function(e) {
                    t.processChunk(e)
                }),
                e.on("end", function() {
                    t.end()
                }),
                e.on("error", function(n) {
                    t.error(n)
                }),
                this
            },
            pause: function() {
                return !(this.isPaused || this.isFinished) && (this.isPaused = !0,
                this.previous && this.previous.pause(),
                !0)
            },
            resume: function() {
                if (!this.isPaused || this.isFinished)
                    return !1;
                this.isPaused = !1;
                var e = !1;
                return this.generatedError && (this.error(this.generatedError),
                e = !0),
                this.previous && this.previous.resume(),
                !e
            },
            flush: function() {},
            processChunk: function(e) {
                this.push(e)
            },
            withStreamInfo: function(e, t) {
                return this.extraStreamInfo[e] = t,
                this.mergeStreamInfo(),
                this
            },
            mergeStreamInfo: function() {
                for (var e in this.extraStreamInfo)
                    this.extraStreamInfo.hasOwnProperty(e) && (this.streamInfo[e] = this.extraStreamInfo[e])
            },
            lock: function() {
                if (this.isLocked)
                    throw new Error("The stream '" + this + "' has already been used.");
                this.isLocked = !0,
                this.previous && this.previous.lock()
            },
            toString: function() {
                var e = "Worker " + this.name;
                return this.previous ? this.previous + " -> " + e : e
            }
        },
        t.exports = n
    }
    , {}],
    94: [function(e, t) {
        (function(n) {
            'use strict';
            function r(e, t, n) {
                return "blob" === e ? d.newBlob(d.transformTo("arraybuffer", t), n) : "base64" === e ? c.encode(t) : d.transformTo(e, t)
            }
            function a(e, t) {
                var r = 0, a = null, o = 0, d;
                for (d = 0; d < t.length; d++)
                    o += t[d].length;
                switch (e) {
                case "string":
                    return t.join("");
                case "array":
                    return Array.prototype.concat.apply([], t);
                case "uint8array":
                    for (a = new Uint8Array(o),
                    d = 0; d < t.length; d++)
                        a.set(t[d], r),
                        r += t[d].length;
                    return a;
                case "nodebuffer":
                    return n.concat(t);
                default:
                    throw new Error("concat : unsupported type '" + e + "'");
                }
            }
            function o(e, t) {
                return new f.Promise(function(n, o) {
                    var i = []
                      , d = e._internalType
                      , s = e._outputType
                      , l = e._mimeType;
                    e.on("data", function(e, n) {
                        i.push(e),
                        t && t(n)
                    }).on("error", function(e) {
                        i = [],
                        o(e)
                    }).on("end", function() {
                        try {
                            var e = r(s, a(d, i), l);
                            n(e)
                        } catch (t) {
                            o(t)
                        }
                        i = []
                    }).resume()
                }
                )
            }
            function i(e, t, n) {
                var r = t;
                "blob" === t || "arraybuffer" === t ? r = "uint8array" : "base64" === t ? r = "string" : void 0;
                try {
                    this._internalType = r,
                    this._outputType = t,
                    this._mimeType = n,
                    d.checkSupport(r),
                    this._worker = e.pipe(new s(r)),
                    e.lock()
                } catch (t) {
                    this._worker = new l("error"),
                    this._worker.error(t)
                }
            }
            var d = e("../utils")
              , s = e("./ConvertWorker")
              , l = e("./GenericWorker")
              , c = e("../base64")
              , u = e("../support")
              , f = e("../external")
              , p = null;
            if (u.nodestream)
                try {
                    p = e("../nodejs/NodejsStreamOutputAdapter")
                } catch (t) {}
            i.prototype = {
                accumulate: function(e) {
                    return o(this, e)
                },
                on: function(e, t) {
                    var n = this;
                    return "data" === e ? this._worker.on(e, function(e) {
                        t.call(n, e.data, e.meta)
                    }) : this._worker.on(e, function() {
                        d.delay(t, arguments, n)
                    }),
                    this
                },
                resume: function() {
                    return d.delay(this._worker.resume, [], this._worker),
                    this
                },
                pause: function() {
                    return this._worker.pause(),
                    this
                },
                toNodejsStream: function(e) {
                    if (d.checkSupport("nodestream"),
                    "nodebuffer" !== this._outputType)
                        throw new Error(this._outputType + " is not supported by this method");
                    return new p(this,{
                        objectMode: "nodebuffer" !== this._outputType
                    },e)
                }
            },
            t.exports = i
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        "../base64": 66,
        "../external": 71,
        "../nodejs/NodejsStreamOutputAdapter": 78,
        "../support": 95,
        "../utils": 97,
        "./ConvertWorker": 89,
        "./GenericWorker": 93,
        buffer: 23
    }],
    95: [function(e, t, n) {
        (function(t) {
            'use strict';
            if (n.base64 = !0,
            n.array = !0,
            n.string = !0,
            n.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array,
            n.nodebuffer = "undefined" != typeof t,
            n.uint8array = "undefined" != typeof Uint8Array,
            "undefined" == typeof ArrayBuffer)
                n.blob = !1;
            else {
                var r = new ArrayBuffer(0);
                try {
                    n.blob = 0 === new Blob([r],{
                        type: "application/zip"
                    }).size
                } catch (t) {
                    try {
                        var a = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder
                          , o = new a;
                        o.append(r),
                        n.blob = 0 === o.getBlob("application/zip").size
                    } catch (t) {
                        n.blob = !1
                    }
                }
            }
            try {
                n.nodestream = !!e("readable-stream").Readable
            } catch (t) {
                n.nodestream = !1
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23,
        "readable-stream": 81
    }],
    96: [function(e, t, n) {
        'use strict';
        function r() {
            l.call(this, "utf-8 decode"),
            this.leftOver = null
        }
        function a() {
            l.call(this, "utf-8 encode")
        }
        for (var o = e("./utils"), d = e("./support"), s = e("./nodejsUtils"), l = e("./stream/GenericWorker"), u = Array(256), f = 0; 256 > f; f++)
            u[f] = 252 <= f ? 6 : 248 <= f ? 5 : 240 <= f ? 4 : 224 <= f ? 3 : 192 <= f ? 2 : 1;
        u[254] = u[254] = 1;
        var c = function(e) {
            var t = e.length, n = 0, r, a, o, s, l;
            for (s = 0; s < t; s++)
                a = e.charCodeAt(s),
                55296 == (64512 & a) && s + 1 < t && (o = e.charCodeAt(s + 1),
                56320 == (64512 & o) && (a = 65536 + (a - 55296 << 10) + (o - 56320),
                s++)),
                n += 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4;
            for (r = d.uint8array ? new Uint8Array(n) : Array(n),
            l = 0,
            s = 0; l < n; s++)
                a = e.charCodeAt(s),
                55296 == (64512 & a) && s + 1 < t && (o = e.charCodeAt(s + 1),
                56320 == (64512 & o) && (a = 65536 + (a - 55296 << 10) + (o - 56320),
                s++)),
                128 > a ? r[l++] = a : 2048 > a ? (r[l++] = 192 | a >>> 6,
                r[l++] = 128 | 63 & a) : 65536 > a ? (r[l++] = 224 | a >>> 12,
                r[l++] = 128 | 63 & a >>> 6,
                r[l++] = 128 | 63 & a) : (r[l++] = 240 | a >>> 18,
                r[l++] = 128 | 63 & a >>> 12,
                r[l++] = 128 | 63 & a >>> 6,
                r[l++] = 128 | 63 & a);
            return r
        }
          , p = function(e, t) {
            var n;
            for (t = t || e.length,
            t > e.length && (t = e.length),
            n = t - 1; 0 <= n && 128 == (192 & e[n]); )
                n--;
            return 0 > n ? t : 0 === n ? t : n + u[e[n]] > t ? n : t
        }
          , h = function(e) {
            var t = e.length, n = Array(2 * t), r, a, d, s;
            for (a = 0,
            r = 0; r < t; ) {
                if (d = e[r++],
                128 > d) {
                    n[a++] = d;
                    continue
                }
                if (s = u[d],
                4 < s) {
                    n[a++] = 65533,
                    r += s - 1;
                    continue
                }
                for (d &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && r < t; )
                    d = d << 6 | 63 & e[r++],
                    s--;
                if (1 < s) {
                    n[a++] = 65533;
                    continue
                }
                65536 > d ? n[a++] = d : (d -= 65536,
                n[a++] = 55296 | 1023 & d >> 10,
                n[a++] = 56320 | 1023 & d)
            }
            return n.length !== a && (n.subarray ? n = n.subarray(0, a) : n.length = a),
            o.applyFromCharCode(n)
        };
        n.utf8encode = function(e) {
            return d.nodebuffer ? s.newBufferFrom(e, "utf-8") : c(e)
        }
        ,
        n.utf8decode = function(e) {
            return d.nodebuffer ? o.transformTo("nodebuffer", e).toString("utf-8") : (e = o.transformTo(d.uint8array ? "uint8array" : "array", e),
            h(e))
        }
        ,
        o.inherits(r, l),
        r.prototype.processChunk = function(e) {
            var t = o.transformTo(d.uint8array ? "uint8array" : "array", e.data);
            if (this.leftOver && this.leftOver.length) {
                if (d.uint8array) {
                    var r = t;
                    t = new Uint8Array(r.length + this.leftOver.length),
                    t.set(this.leftOver, 0),
                    t.set(r, this.leftOver.length)
                } else
                    t = this.leftOver.concat(t);
                this.leftOver = null
            }
            var a = p(t)
              , i = t;
            a !== t.length && (d.uint8array ? (i = t.subarray(0, a),
            this.leftOver = t.subarray(a, t.length)) : (i = t.slice(0, a),
            this.leftOver = t.slice(a, t.length))),
            this.push({
                data: n.utf8decode(i),
                meta: e.meta
            })
        }
        ,
        r.prototype.flush = function() {
            this.leftOver && this.leftOver.length && (this.push({
                data: n.utf8decode(this.leftOver),
                meta: {}
            }),
            this.leftOver = null)
        }
        ,
        n.Utf8DecodeWorker = r,
        o.inherits(a, l),
        a.prototype.processChunk = function(e) {
            this.push({
                data: n.utf8encode(e.data),
                meta: e.meta
            })
        }
        ,
        n.Utf8EncodeWorker = a
    }
    , {
        "./nodejsUtils": 79,
        "./stream/GenericWorker": 93,
        "./support": 95,
        "./utils": 97
    }],
    97: [function(e, t, n) {
        'use strict';
        var s = Math.floor
          , l = Math.min
          , c = String.fromCharCode;
        function r(e) {
            var t = null;
            return t = u.uint8array ? new Uint8Array(e.length) : Array(e.length),
            o(e, t)
        }
        function a(e) {
            return e
        }
        function o(e, t) {
            for (var n = 0; n < e.length; ++n)
                t[n] = 255 & e.charCodeAt(n);
            return t
        }
        function i(e) {
            var t = 65536
              , r = n.getTypeOf(e)
              , a = !0;
            if ("uint8array" === r ? a = g.applyCanBeUsed.uint8array : "nodebuffer" === r && (a = g.applyCanBeUsed.nodebuffer),
            a)
                for (; 1 < t; )
                    try {
                        return g.stringifyByChunk(e, r, t)
                    } catch (n) {
                        t = s(t / 2)
                    }
            return g.stringifyByChar(e)
        }
        function d(e, t) {
            for (var n = 0; n < e.length; n++)
                t[n] = e[n];
            return t
        }
        var u = e("./support")
          , f = e("./base64")
          , p = e("./nodejsUtils")
          , h = e("set-immediate-shim")
          , m = e("./external");
        n.newBlob = function(e, t) {
            n.checkSupport("blob");
            try {
                return new Blob([e],{
                    type: t
                })
            } catch (n) {
                try {
                    var r = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder
                      , a = new r;
                    return a.append(e),
                    a.getBlob(t)
                } catch (t) {
                    throw new Error("Bug : can't construct the Blob.")
                }
            }
        }
        ;
        var g = {
            stringifyByChunk: function(e, t, n) {
                var r = []
                  , a = 0
                  , o = e.length;
                if (o <= n)
                    return c.apply(null, e);
                for (; a < o; )
                    "array" === t || "nodebuffer" === t ? r.push(c.apply(null, e.slice(a, l(a + n, o)))) : r.push(c.apply(null, e.subarray(a, l(a + n, o)))),
                    a += n;
                return r.join("")
            },
            stringifyByChar: function(e) {
                for (var t = "", n = 0; n < e.length; n++)
                    t += c(e[n]);
                return t
            },
            applyCanBeUsed: {
                uint8array: function() {
                    try {
                        return u.uint8array && 1 === c.apply(null, new Uint8Array(1)).length
                    } catch (t) {
                        return !1
                    }
                }(),
                nodebuffer: function() {
                    try {
                        return u.nodebuffer && 1 === c.apply(null, p.allocBuffer(1)).length
                    } catch (t) {
                        return !1
                    }
                }()
            }
        };
        n.applyFromCharCode = i;
        var _ = {};
        _.string = {
            string: a,
            array: function(e) {
                return o(e, Array(e.length))
            },
            arraybuffer: function(e) {
                return _.string.uint8array(e).buffer
            },
            uint8array: function(e) {
                return o(e, new Uint8Array(e.length))
            },
            nodebuffer: function(e) {
                return o(e, p.allocBuffer(e.length))
            }
        },
        _.array = {
            string: i,
            array: a,
            arraybuffer: function(e) {
                return new Uint8Array(e).buffer
            },
            uint8array: function(e) {
                return new Uint8Array(e)
            },
            nodebuffer: function(e) {
                return p.newBufferFrom(e)
            }
        },
        _.arraybuffer = {
            string: function(e) {
                return i(new Uint8Array(e))
            },
            array: function(e) {
                return d(new Uint8Array(e), Array(e.byteLength))
            },
            arraybuffer: a,
            uint8array: function(e) {
                return new Uint8Array(e)
            },
            nodebuffer: function(e) {
                return p.newBufferFrom(new Uint8Array(e))
            }
        },
        _.uint8array = {
            string: i,
            array: function(e) {
                return d(e, Array(e.length))
            },
            arraybuffer: function(e) {
                return e.buffer
            },
            uint8array: a,
            nodebuffer: function(e) {
                return p.newBufferFrom(e)
            }
        },
        _.nodebuffer = {
            string: i,
            array: function(e) {
                return d(e, Array(e.length))
            },
            arraybuffer: function(e) {
                return _.nodebuffer.uint8array(e).buffer
            },
            uint8array: function(e) {
                return d(e, new Uint8Array(e.length))
            },
            nodebuffer: a
        },
        n.transformTo = function(e, t) {
            if (t || (t = ""),
            !e)
                return t;
            n.checkSupport(e);
            var r = n.getTypeOf(t)
              , a = _[r][e](t);
            return a
        }
        ,
        n.getTypeOf = function(e) {
            return "string" == typeof e ? "string" : "[object Array]" === Object.prototype.toString.call(e) ? "array" : u.nodebuffer && p.isBuffer(e) ? "nodebuffer" : u.uint8array && e instanceof Uint8Array ? "uint8array" : u.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0
        }
        ,
        n.checkSupport = function(e) {
            var t = u[e.toLowerCase()];
            if (!t)
                throw new Error(e + " is not supported by this platform")
        }
        ,
        n.MAX_VALUE_16BITS = 65535,
        n.MAX_VALUE_32BITS = -1,
        n.pretty = function(e) {
            var t = "", n, r;
            for (r = 0; r < (e || "").length; r++)
                n = e.charCodeAt(r),
                t += "\\x" + (16 > n ? "0" : "") + n.toString(16).toUpperCase();
            return t
        }
        ,
        n.delay = function(e, t, n) {
            h(function() {
                e.apply(n || null, t || [])
            })
        }
        ,
        n.inherits = function(e, t) {
            var n = function() {};
            n.prototype = t.prototype,
            e.prototype = new n
        }
        ,
        n.extend = function() {
            var e = {}, t, n;
            for (t = 0; t < arguments.length; t++)
                for (n in arguments[t])
                    arguments[t].hasOwnProperty(n) && "undefined" == typeof e[n] && (e[n] = arguments[t][n]);
            return e
        }
        ,
        n.prepareContent = function(e, t, a, o, i) {
            var d = m.Promise.resolve(t).then(function(e) {
                var t = u.blob && (e instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(e)));
                return t && "undefined" != typeof FileReader ? new m.Promise(function(t, n) {
                    var r = new FileReader;
                    r.onload = function(n) {
                        t(n.target.result)
                    }
                    ,
                    r.onerror = function(t) {
                        n(t.target.error)
                    }
                    ,
                    r.readAsArrayBuffer(e)
                }
                ) : e
            });
            return d.then(function(t) {
                var d = n.getTypeOf(t);
                return d ? ("arraybuffer" === d ? t = n.transformTo("uint8array", t) : "string" === d && (i ? t = f.decode(t) : a && !0 !== o && (t = r(t))),
                t) : m.Promise.reject(new Error("Can't read the data of '" + e + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))
            })
        }
    }
    , {
        "./base64": 66,
        "./external": 71,
        "./nodejsUtils": 79,
        "./support": 95,
        "set-immediate-shim": 167
    }],
    98: [function(e, t) {
        'use strict';
        var r = Math.abs;
        function n(e) {
            this.files = [],
            this.loadOptions = e
        }
        var a = e("./reader/readerFor")
          , o = e("./utils")
          , d = e("./signature")
          , s = e("./zipEntry")
          , l = e("./utf8")
          , c = e("./support");
        n.prototype = {
            checkSignature: function(e) {
                if (!this.reader.readAndCheckSignature(e)) {
                    this.reader.index -= 4;
                    var t = this.reader.readString(4);
                    throw new Error("Corrupted zip or bug: unexpected signature (" + o.pretty(t) + ", expected " + o.pretty(e) + ")")
                }
            },
            isSignature: function(e, t) {
                var n = this.reader.index;
                this.reader.setIndex(e);
                var r = this.reader.readString(4);
                return this.reader.setIndex(n),
                r === t
            },
            readBlockEndOfCentral: function() {
                this.diskNumber = this.reader.readInt(2),
                this.diskWithCentralDirStart = this.reader.readInt(2),
                this.centralDirRecordsOnThisDisk = this.reader.readInt(2),
                this.centralDirRecords = this.reader.readInt(2),
                this.centralDirSize = this.reader.readInt(4),
                this.centralDirOffset = this.reader.readInt(4),
                this.zipCommentLength = this.reader.readInt(2);
                var e = this.reader.readData(this.zipCommentLength)
                  , t = c.uint8array ? "uint8array" : "array"
                  , n = o.transformTo(t, e);
                this.zipComment = this.loadOptions.decodeFileName(n)
            },
            readBlockZip64EndOfCentral: function() {
                this.zip64EndOfCentralSize = this.reader.readInt(8),
                this.reader.skip(4),
                this.diskNumber = this.reader.readInt(4),
                this.diskWithCentralDirStart = this.reader.readInt(4),
                this.centralDirRecordsOnThisDisk = this.reader.readInt(8),
                this.centralDirRecords = this.reader.readInt(8),
                this.centralDirSize = this.reader.readInt(8),
                this.centralDirOffset = this.reader.readInt(8),
                this.zip64ExtensibleData = {};
                for (var e = this.zip64EndOfCentralSize - 44, t, n, r; 0 < e; )
                    t = this.reader.readInt(2),
                    n = this.reader.readInt(4),
                    r = this.reader.readData(n),
                    this.zip64ExtensibleData[t] = {
                        id: t,
                        length: n,
                        value: r
                    }
            },
            readBlockZip64EndOfCentralLocator: function() {
                if (this.diskWithZip64CentralDirStart = this.reader.readInt(4),
                this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8),
                this.disksCount = this.reader.readInt(4),
                1 < this.disksCount)
                    throw new Error("Multi-volumes zip are not supported")
            },
            readLocalFiles: function() {
                var e, t;
                for (e = 0; e < this.files.length; e++)
                    t = this.files[e],
                    this.reader.setIndex(t.localHeaderOffset),
                    this.checkSignature(d.LOCAL_FILE_HEADER),
                    t.readLocalPart(this.reader),
                    t.handleUTF8(),
                    t.processAttributes()
            },
            readCentralDir: function() {
                var e;
                for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(d.CENTRAL_FILE_HEADER); )
                    e = new s({
                        zip64: this.zip64
                    },this.loadOptions),
                    e.readCentralPart(this.reader),
                    this.files.push(e);
                if (this.centralDirRecords !== this.files.length)
                    if (0 !== this.centralDirRecords && 0 === this.files.length)
                        throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
                    else
                        ;
            },
            readEndOfCentral: function() {
                var e = this.reader.lastIndexOfSignature(d.CENTRAL_DIRECTORY_END);
                if (0 > e) {
                    var t = !this.isSignature(0, d.LOCAL_FILE_HEADER);
                    if (t)
                        throw new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
                    else
                        throw new Error("Corrupted zip: can't find end of central directory")
                }
                this.reader.setIndex(e);
                var n = e;
                if (this.checkSignature(d.CENTRAL_DIRECTORY_END),
                this.readBlockEndOfCentral(),
                this.diskNumber === o.MAX_VALUE_16BITS || this.diskWithCentralDirStart === o.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === o.MAX_VALUE_16BITS || this.centralDirRecords === o.MAX_VALUE_16BITS || this.centralDirSize === o.MAX_VALUE_32BITS || this.centralDirOffset === o.MAX_VALUE_32BITS) {
                    if (this.zip64 = !0,
                    e = this.reader.lastIndexOfSignature(d.ZIP64_CENTRAL_DIRECTORY_LOCATOR),
                    0 > e)
                        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                    if (this.reader.setIndex(e),
                    this.checkSignature(d.ZIP64_CENTRAL_DIRECTORY_LOCATOR),
                    this.readBlockZip64EndOfCentralLocator(),
                    !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, d.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(d.ZIP64_CENTRAL_DIRECTORY_END),
                    0 > this.relativeOffsetEndOfZip64CentralDir))
                        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                    this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),
                    this.checkSignature(d.ZIP64_CENTRAL_DIRECTORY_END),
                    this.readBlockZip64EndOfCentral()
                }
                var a = this.centralDirOffset + this.centralDirSize;
                this.zip64 && (a += 20,
                a += 12 + this.zip64EndOfCentralSize);
                var i = n - a;
                if (0 < i)
                    this.isSignature(n, d.CENTRAL_FILE_HEADER) || (this.reader.zero = i);
                else if (0 > i)
                    throw new Error("Corrupted zip: missing " + r(i) + " bytes.")
            },
            prepareReader: function(e) {
                this.reader = a(e)
            },
            load: function(e) {
                this.prepareReader(e),
                this.readEndOfCentral(),
                this.readCentralDir(),
                this.readLocalFiles()
            }
        },
        t.exports = n
    }
    , {
        "./reader/readerFor": 87,
        "./signature": 88,
        "./support": 95,
        "./utf8": 96,
        "./utils": 97,
        "./zipEntry": 99
    }],
    99: [function(e, t) {
        'use strict';
        function n(e, t) {
            this.options = e,
            this.loadOptions = t
        }
        var r = e("./reader/readerFor")
          , a = e("./utils")
          , o = e("./compressedObject")
          , i = e("./crc32")
          , d = e("./utf8")
          , s = e("./compressions")
          , l = e("./support")
          , c = function(e) {
            for (var t in s)
                if (s.hasOwnProperty(t) && s[t].magic === e)
                    return s[t];
            return null
        };
        n.prototype = {
            isEncrypted: function() {
                return 1 == (1 & this.bitFlag)
            },
            useUTF8: function() {
                return 2048 == (2048 & this.bitFlag)
            },
            readLocalPart: function(e) {
                var t, n;
                if (e.skip(22),
                this.fileNameLength = e.readInt(2),
                n = e.readInt(2),
                this.fileName = e.readData(this.fileNameLength),
                e.skip(n),
                -1 === this.compressedSize || -1 === this.uncompressedSize)
                    throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                if (t = c(this.compressionMethod),
                null === t)
                    throw new Error("Corrupted zip : compression " + a.pretty(this.compressionMethod) + " unknown (inner file : " + a.transformTo("string", this.fileName) + ")");
                this.decompressed = new o(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))
            },
            readCentralPart: function(e) {
                this.versionMadeBy = e.readInt(2),
                e.skip(2),
                this.bitFlag = e.readInt(2),
                this.compressionMethod = e.readString(2),
                this.date = e.readDate(),
                this.crc32 = e.readInt(4),
                this.compressedSize = e.readInt(4),
                this.uncompressedSize = e.readInt(4);
                var t = e.readInt(2);
                if (this.extraFieldsLength = e.readInt(2),
                this.fileCommentLength = e.readInt(2),
                this.diskNumberStart = e.readInt(2),
                this.internalFileAttributes = e.readInt(2),
                this.externalFileAttributes = e.readInt(4),
                this.localHeaderOffset = e.readInt(4),
                this.isEncrypted())
                    throw new Error("Encrypted zip are not supported");
                e.skip(t),
                this.readExtraFields(e),
                this.parseZIP64ExtraField(e),
                this.fileComment = e.readData(this.fileCommentLength)
            },
            processAttributes: function() {
                this.unixPermissions = null,
                this.dosPermissions = null;
                var e = this.versionMadeBy >> 8;
                this.dir = !!(16 & this.externalFileAttributes),
                e === 0 && (this.dosPermissions = 63 & this.externalFileAttributes),
                e === 3 && (this.unixPermissions = 65535 & this.externalFileAttributes >> 16),
                this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0)
            },
            parseZIP64ExtraField: function() {
                if (this.extraFields[1]) {
                    var e = r(this.extraFields[1].value);
                    this.uncompressedSize === a.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)),
                    this.compressedSize === a.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)),
                    this.localHeaderOffset === a.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)),
                    this.diskNumberStart === a.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4))
                }
            },
            readExtraFields: function(e) {
                var t = e.index + this.extraFieldsLength, n, r, a;
                for (this.extraFields || (this.extraFields = {}); e.index < t; )
                    n = e.readInt(2),
                    r = e.readInt(2),
                    a = e.readData(r),
                    this.extraFields[n] = {
                        id: n,
                        length: r,
                        value: a
                    }
            },
            handleUTF8: function() {
                var e = l.uint8array ? "uint8array" : "array";
                if (this.useUTF8())
                    this.fileNameStr = d.utf8decode(this.fileName),
                    this.fileCommentStr = d.utf8decode(this.fileComment);
                else {
                    var t = this.findExtraFieldUnicodePath();
                    if (null !== t)
                        this.fileNameStr = t;
                    else {
                        var n = a.transformTo(e, this.fileName);
                        this.fileNameStr = this.loadOptions.decodeFileName(n)
                    }
                    var r = this.findExtraFieldUnicodeComment();
                    if (null !== r)
                        this.fileCommentStr = r;
                    else {
                        var o = a.transformTo(e, this.fileComment);
                        this.fileCommentStr = this.loadOptions.decodeFileName(o)
                    }
                }
            },
            findExtraFieldUnicodePath: function() {
                var e = this.extraFields[28789];
                if (e) {
                    var t = r(e.value);
                    return 1 === t.readInt(1) ? i(this.fileName) === t.readInt(4) ? d.utf8decode(t.readData(e.length - 5)) : null : null
                }
                return null
            },
            findExtraFieldUnicodeComment: function() {
                var e = this.extraFields[25461];
                if (e) {
                    var t = r(e.value);
                    return 1 === t.readInt(1) ? i(this.fileComment) === t.readInt(4) ? d.utf8decode(t.readData(e.length - 5)) : null : null
                }
                return null
            }
        },
        t.exports = n
    }
    , {
        "./compressedObject": 67,
        "./compressions": 68,
        "./crc32": 69,
        "./reader/readerFor": 87,
        "./support": 95,
        "./utf8": 96,
        "./utils": 97
    }],
    100: [function(e, t) {
        'use strict';
        var n = e("./stream/StreamHelper")
          , r = e("./stream/DataWorker")
          , a = e("./utf8")
          , o = e("./compressedObject")
          , d = e("./stream/GenericWorker")
          , s = function(e, t, n) {
            this.name = e,
            this.dir = n.dir,
            this.date = n.date,
            this.comment = n.comment,
            this.unixPermissions = n.unixPermissions,
            this.dosPermissions = n.dosPermissions,
            this._data = t,
            this._dataBinary = n.binary,
            this.options = {
                compression: n.compression,
                compressionOptions: n.compressionOptions
            }
        };
        s.prototype = {
            internalStream: function(e) {
                var t = null
                  , r = "string";
                try {
                    if (!e)
                        throw new Error("No output type specified.");
                    r = e.toLowerCase();
                    var o = "string" === r || "text" === r;
                    ("binarystring" === r || "text" === r) && (r = "string"),
                    t = this._decompressWorker();
                    var i = !this._dataBinary;
                    i && !o && (t = t.pipe(new a.Utf8EncodeWorker)),
                    !i && o && (t = t.pipe(new a.Utf8DecodeWorker))
                } catch (n) {
                    t = new d("error"),
                    t.error(n)
                }
                return new n(t,r,"")
            },
            async: function(e, t) {
                return this.internalStream(e).accumulate(t)
            },
            nodeStream: function(e, t) {
                return this.internalStream(e || "nodebuffer").toNodejsStream(t)
            },
            _compressWorker: function(e, t) {
                if (this._data instanceof o && this._data.compression.magic === e.magic)
                    return this._data.getCompressedWorker();
                var n = this._decompressWorker();
                return this._dataBinary || (n = n.pipe(new a.Utf8EncodeWorker)),
                o.createWorkerFrom(n, e, t)
            },
            _decompressWorker: function() {
                return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof d ? this._data : new r(this._data)
            }
        };
        for (var l = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], c = function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
        }, u = 0; u < l.length; u++)
            s.prototype[l[u]] = c;
        t.exports = s
    }
    , {
        "./compressedObject": 67,
        "./stream/DataWorker": 92,
        "./stream/GenericWorker": 93,
        "./stream/StreamHelper": 94,
        "./utf8": 96
    }],
    101: [function(e, t, n) {
        'use strict';
        n.re = ()=>{
            throw new Error("`junk.re` was renamed to `junk.regex`")
        }
        ,
        n.regex = new RegExp(["^npm-debug\\.log$", "^\\..*\\.swp$", "^\\.DS_Store$", "^\\.AppleDouble$", "^\\.LSOverride$", "^Icon\\r$", "^\\._.*", "^\\.Spotlight-V100(?:$|\\/)", "\\.Trashes", "^__MACOSX$", "~$", "^Thumbs\\.db$", "^ehthumbs\\.db$", "^Desktop\\.ini$", "@eaDir$"].join("|")),
        n.is = e=>n.regex.test(e),
        n.not = e=>!n.is(e),
        n.default = t.exports
    }
    , {}],
    102: [function(e, t) {
        'use strict';
        function n() {}
        function r(e) {
            if ("function" != typeof e)
                throw new TypeError("resolver must be a function");
            this.state = h,
            this.queue = [],
            this.outcome = void 0,
            e !== n && s(this, e)
        }
        function a(e, t, n) {
            this.promise = e,
            "function" == typeof t && (this.onFulfilled = t,
            this.callFulfilled = this.otherCallFulfilled),
            "function" == typeof n && (this.onRejected = n,
            this.callRejected = this.otherCallRejected)
        }
        function o(t, n, r) {
            c(function() {
                var e;
                try {
                    e = n(r)
                } catch (n) {
                    return u.reject(t, n)
                }
                e === t ? u.reject(t, new TypeError("Cannot resolve promise with itself")) : u.resolve(t, e)
            })
        }
        function d(e) {
            var t = e && e.then;
            if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t)
                return function() {
                    t.apply(e, arguments)
                }
        }
        function s(e, t) {
            function n(t) {
                a || (a = !0,
                u.reject(e, t))
            }
            function r(t) {
                a || (a = !0,
                u.resolve(e, t))
            }
            var a = !1
              , o = l(function() {
                t(r, n)
            });
            "error" === o.status && n(o.value)
        }
        function l(e, t) {
            var n = {};
            try {
                n.value = e(t),
                n.status = "success"
            } catch (t) {
                n.status = "error",
                n.value = t
            }
            return n
        }
        var c = e("immediate")
          , u = {}
          , f = ["REJECTED"]
          , p = ["FULFILLED"]
          , h = ["PENDING"];
        t.exports = r,
        r.prototype["finally"] = function(e) {
            if ("function" != typeof e)
                return this;
            var t = this.constructor;
            return this.then(function(n) {
                return t.resolve(e()).then(function() {
                    return n
                })
            }, function(n) {
                return t.resolve(e()).then(function() {
                    throw n
                })
            })
        }
        ,
        r.prototype["catch"] = function(e) {
            return this.then(null, e)
        }
        ,
        r.prototype.then = function(e, t) {
            if ("function" != typeof e && this.state === p || "function" != typeof t && this.state === f)
                return this;
            var r = new this.constructor(n);
            if (this.state !== h) {
                var i = this.state === p ? e : t;
                o(r, i, this.outcome)
            } else
                this.queue.push(new a(r,e,t));
            return r
        }
        ,
        a.prototype.callFulfilled = function(e) {
            u.resolve(this.promise, e)
        }
        ,
        a.prototype.otherCallFulfilled = function(e) {
            o(this.promise, this.onFulfilled, e)
        }
        ,
        a.prototype.callRejected = function(e) {
            u.reject(this.promise, e)
        }
        ,
        a.prototype.otherCallRejected = function(e) {
            o(this.promise, this.onRejected, e)
        }
        ,
        u.resolve = function(e, t) {
            var n = l(d, t);
            if ("error" === n.status)
                return u.reject(e, n.value);
            var r = n.value;
            if (r)
                s(e, r);
            else {
                e.state = p,
                e.outcome = t;
                for (var a = -1, o = e.queue.length; ++a < o; )
                    e.queue[a].callFulfilled(t)
            }
            return e
        }
        ,
        u.reject = function(e, t) {
            e.state = f,
            e.outcome = t;
            for (var n = -1, r = e.queue.length; ++n < r; )
                e.queue[n].callRejected(t);
            return e
        }
        ,
        r.resolve = function(e) {
            return e instanceof this ? e : u.resolve(new this(n), e)
        }
        ,
        r.reject = function(e) {
            var t = new this(n);
            return u.reject(t, e)
        }
        ,
        r.all = function(e) {
            function t(e, t) {
                function n(e) {
                    d[t] = e,
                    ++s !== a || o || (o = !0,
                    u.resolve(c, d))
                }
                r.resolve(e).then(n, function(e) {
                    o || (o = !0,
                    u.reject(c, e))
                })
            }
            var r = this;
            if ("[object Array]" !== Object.prototype.toString.call(e))
                return this.reject(new TypeError("must be an array"));
            var a = e.length
              , o = !1;
            if (!a)
                return this.resolve([]);
            for (var d = Array(a), s = 0, l = -1, c = new this(n); ++l < a; )
                t(e[l], l);
            return c
        }
        ,
        r.race = function(e) {
            function t(e) {
                r.resolve(e).then(function(e) {
                    o || (o = !0,
                    u.resolve(s, e))
                }, function(e) {
                    o || (o = !0,
                    u.reject(s, e))
                })
            }
            var r = this;
            if ("[object Array]" !== Object.prototype.toString.call(e))
                return this.reject(new TypeError("must be an array"));
            var a = e.length
              , o = !1;
            if (!a)
                return this.resolve([]);
            for (var d = -1, s = new this(n); ++d < a; )
                t(e[d]);
            return s
        }
    }
    , {
        immediate: 59
    }],
    103: [function(e, t) {
        (function(n) {
            function r(e) {
                const t = {}
                  , r = e.split("magnet:?")[1]
                  , i = r && 0 <= r.length ? r.split("&") : [];
                i.forEach(e=>{
                    const n = e.split("=");
                    if (2 !== n.length)
                        return;
                    const r = n[0];
                    let a = n[1];
                    if ("dn" === r && (a = decodeURIComponent(a).replace(/\+/g, " ")),
                    ("tr" === r || "xs" === r || "as" === r || "ws" === r) && (a = decodeURIComponent(a)),
                    "kt" === r && (a = decodeURIComponent(a).split("+")),
                    "ix" === r && (a = +a),
                    !t[r])
                        t[r] = a;
                    else if (Array.isArray(t[r]))
                        t[r].push(a);
                    else {
                        const e = t[r];
                        t[r] = [e, a]
                    }
                }
                );
                let d;
                if (t.xt) {
                    const e = Array.isArray(t.xt) ? t.xt : [t.xt];
                    e.forEach(e=>{
                        if (d = e.match(/^urn:btih:(.{40})/))
                            t.infoHash = d[1].toLowerCase();
                        else if (d = e.match(/^urn:btih:(.{32})/)) {
                            const e = a.decode(d[1]);
                            t.infoHash = n.from(e, "binary").toString("hex")
                        }
                    }
                    )
                }
                return t.infoHash && (t.infoHashBuffer = n.from(t.infoHash, "hex")),
                t.dn && (t.name = t.dn),
                t.kt && (t.keywords = t.kt),
                t.announce = "string" == typeof t.tr ? [t.tr] : Array.isArray(t.tr) ? t.tr : [],
                t.urlList = [],
                ("string" == typeof t.as || Array.isArray(t.as)) && (t.urlList = t.urlList.concat(t.as)),
                ("string" == typeof t.ws || Array.isArray(t.ws)) && (t.urlList = t.urlList.concat(t.ws)),
                o(t.announce),
                o(t.urlList),
                t
            }
            t.exports = r,
            t.exports.decode = r,
            t.exports.encode = function(e) {
                e = Object.assign({}, e),
                e.infoHashBuffer && (e.xt = `urn:btih:${e.infoHashBuffer.toString("hex")}`),
                e.infoHash && (e.xt = `urn:btih:${e.infoHash}`),
                e.name && (e.dn = e.name),
                e.keywords && (e.kt = e.keywords),
                e.announce && (e.tr = e.announce),
                e.urlList && (e.ws = e.urlList,
                delete e.as);
                let t = "magnet:?";
                return Object.keys(e).filter(e=>2 === e.length).forEach((n,r)=>{
                    const a = Array.isArray(e[n]) ? e[n] : [e[n]];
                    a.forEach((e,a)=>{
                        (0 < r || 0 < a) && ("kt" !== n || 0 === a) && (t += "&"),
                        "dn" === n && (e = encodeURIComponent(e).replace(/%20/g, "+")),
                        ("tr" === n || "xs" === n || "as" === n || "ws" === n) && (e = encodeURIComponent(e)),
                        "kt" === n && (e = encodeURIComponent(e)),
                        t += "kt" === n && 0 < a ? `+${e}` : `${n}=${e}`
                    }
                    )
                }
                ),
                t
            }
            ;
            const a = e("thirty-two")
              , o = e("uniq")
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23,
        "thirty-two": 199,
        uniq: 209
    }],
    104: [function(e, t) {
        function n(e, t) {
            var r = this;
            if (!(r instanceof n))
                return new n(e,t);
            if (!s)
                throw new Error("web browser lacks MediaSource support");
            t || (t = {}),
            r._debug = t.debug,
            r._bufferDuration = t.bufferDuration || 60,
            r._elem = e,
            r._mediaSource = new s,
            r._streams = [],
            r.detailedError = null,
            r._errorHandler = function() {
                r._elem.removeEventListener("error", r._errorHandler);
                var e = r._streams.slice();
                e.forEach(function(e) {
                    e.destroy(r._elem.error)
                })
            }
            ,
            r._elem.addEventListener("error", r._errorHandler),
            r._elem.src = window.URL.createObjectURL(r._mediaSource)
        }
        function r(e, t) {
            var n = this;
            if (i.Writable.call(n),
            n._wrapper = e,
            n._elem = e._elem,
            n._mediaSource = e._mediaSource,
            n._allStreams = e._streams,
            n._allStreams.push(n),
            n._bufferDuration = e._bufferDuration,
            n._sourceBuffer = null,
            n._debugBuffers = [],
            n._openHandler = function() {
                n._onSourceOpen()
            }
            ,
            n._flowHandler = function() {
                n._flow()
            }
            ,
            n._errorHandler = function(e) {
                n.destroyed || n.emit("error", e)
            }
            ,
            "string" == typeof t)
                n._type = t,
                "open" === n._mediaSource.readyState ? n._createSourceBuffer() : n._mediaSource.addEventListener("sourceopen", n._openHandler);
            else if (null === t._sourceBuffer)
                t.destroy(),
                n._type = t._type,
                n._mediaSource.addEventListener("sourceopen", n._openHandler);
            else if (t._sourceBuffer)
                t.destroy(),
                n._type = t._type,
                n._sourceBuffer = t._sourceBuffer,
                n._debugBuffers = t._debugBuffers,
                n._sourceBuffer.addEventListener("updateend", n._flowHandler),
                n._sourceBuffer.addEventListener("error", n._errorHandler);
            else
                throw new Error("The argument to MediaElementWrapper.createWriteStream must be a string or a previous stream returned from that function");
            n._elem.addEventListener("timeupdate", n._flowHandler),
            n.on("error", function(e) {
                n._wrapper.error(e)
            }),
            n.on("finish", function() {
                if (!n.destroyed && (n._finished = !0,
                n._allStreams.every(function(e) {
                    return e._finished
                }))) {
                    n._wrapper._dumpDebugData();
                    try {
                        n._mediaSource.endOfStream()
                    } catch (e) {}
                }
            })
        }
        function a(e, t) {
            var n = document.createElement("a");
            n.href = window.URL.createObjectURL(new window.Blob(e)),
            n.download = t,
            n.click()
        }
        t.exports = n;
        var o = e("inherits")
          , i = e("readable-stream")
          , d = e("to-arraybuffer")
          , s = "undefined" != typeof window && window.MediaSource;
        n.prototype.createWriteStream = function(e) {
            var t = this;
            return new r(t,e)
        }
        ,
        n.prototype.error = function(e) {
            var t = this;
            t.detailedError || (t.detailedError = e),
            t._dumpDebugData();
            try {
                t._mediaSource.endOfStream("decode")
            } catch (e) {}
            try {
                window.URL.revokeObjectURL(t._elem.src)
            } catch (e) {}
        }
        ,
        n.prototype._dumpDebugData = function() {
            var e = this;
            e._debug && (e._debug = !1,
            e._streams.forEach(function(e, t) {
                a(e._debugBuffers, "mediasource-stream-" + t)
            }))
        }
        ,
        o(r, i.Writable),
        r.prototype._onSourceOpen = function() {
            var e = this;
            e.destroyed || (e._mediaSource.removeEventListener("sourceopen", e._openHandler),
            e._createSourceBuffer())
        }
        ,
        r.prototype.destroy = function(e) {
            var t = this;
            t.destroyed || (t.destroyed = !0,
            t._allStreams.splice(t._allStreams.indexOf(t), 1),
            t._mediaSource.removeEventListener("sourceopen", t._openHandler),
            t._elem.removeEventListener("timeupdate", t._flowHandler),
            t._sourceBuffer && (t._sourceBuffer.removeEventListener("updateend", t._flowHandler),
            t._sourceBuffer.removeEventListener("error", t._errorHandler),
            "open" === t._mediaSource.readyState && t._sourceBuffer.abort()),
            e && t.emit("error", e),
            t.emit("close"))
        }
        ,
        r.prototype._createSourceBuffer = function() {
            var e = this;
            if (!e.destroyed)
                if (!s.isTypeSupported(e._type))
                    e.destroy(new Error("The provided type is not supported"));
                else if (e._sourceBuffer = e._mediaSource.addSourceBuffer(e._type),
                e._sourceBuffer.addEventListener("updateend", e._flowHandler),
                e._sourceBuffer.addEventListener("error", e._errorHandler),
                e._cb) {
                    var t = e._cb;
                    e._cb = null,
                    t()
                }
        }
        ,
        r.prototype._write = function(e, t, n) {
            var r = this;
            if (!r.destroyed) {
                if (!r._sourceBuffer)
                    return void (r._cb = function(a) {
                        return a ? n(a) : void r._write(e, t, n)
                    }
                    );
                if (r._sourceBuffer.updating)
                    return n(new Error("Cannot append buffer while source buffer updating"));
                var a = d(e);
                r._wrapper._debug && r._debugBuffers.push(a);
                try {
                    r._sourceBuffer.appendBuffer(a)
                } catch (e) {
                    return void r.destroy(e)
                }
                r._cb = n
            }
        }
        ,
        r.prototype._flow = function() {
            var e = this;
            if (!(e.destroyed || !e._sourceBuffer || e._sourceBuffer.updating) && !("open" === e._mediaSource.readyState && e._getBufferDuration() > e._bufferDuration) && e._cb) {
                var t = e._cb;
                e._cb = null,
                t()
            }
        }
        ;
        r.prototype._getBufferDuration = function() {
            for (var e = this, t = e._sourceBuffer.buffered, n = e._elem.currentTime, r = -1, a = 0; a < t.length; a++) {
                var o = t.start(a)
                  , d = t.end(a) + 0;
                if (o > n)
                    break;
                else
                    (0 <= r || n <= d) && (r = d)
            }
            var s = r - n;
            return 0 > s && (s = 0),
            s
        }
    }
    , {
        inherits: 60,
        "readable-stream": 160,
        "to-arraybuffer": 204
    }],
    105: [function(e, t) {
        var n = Math.ceil;
        (function(e) {
            function r(e, t) {
                if (!(this instanceof r))
                    return new r(e,t);
                if (t || (t = {}),
                this.chunkLength = +e,
                !this.chunkLength)
                    throw new Error("First argument must be a chunk length");
                this.chunks = [],
                this.closed = !1,
                this.length = +t.length || 1 / 0,
                this.length !== 1 / 0 && (this.lastChunkLength = this.length % this.chunkLength || this.chunkLength,
                this.lastChunkIndex = n(this.length / this.chunkLength) - 1)
            }
            function a(t, n, r) {
                e.nextTick(function() {
                    t && t(n, r)
                })
            }
            t.exports = r,
            r.prototype.put = function(e, t, n) {
                if (this.closed)
                    return a(n, new Error("Storage is closed"));
                var r = e === this.lastChunkIndex;
                return r && t.length !== this.lastChunkLength ? a(n, new Error("Last chunk length must be " + this.lastChunkLength)) : r || t.length === this.chunkLength ? void (this.chunks[e] = t,
                a(n, null)) : a(n, new Error("Chunk length must be " + this.chunkLength))
            }
            ,
            r.prototype.get = function(e, t, n) {
                if ("function" == typeof t)
                    return this.get(e, null, t);
                if (this.closed)
                    return a(n, new Error("Storage is closed"));
                var r = this.chunks[e];
                if (!r) {
                    var o = new Error("Chunk not found");
                    return o.notFound = !0,
                    a(n, o)
                }
                if (!t)
                    return a(n, null, r);
                var i = t.offset || 0
                  , d = t.length || r.length - i;
                a(n, null, r.slice(i, d + i))
            }
            ,
            r.prototype.close = r.prototype.destroy = function(e) {
                return this.closed ? a(e, new Error("Storage is closed")) : void (this.closed = !0,
                this.chunks = null,
                a(e, null))
            }
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137
    }],
    106: [function(e, t, n) {
        var r = Math.floor
          , a = Math.min;
        (function(t) {
            function o(e, t, n) {
                for (var r = t; r < n; r++)
                    e[r] = 0
            }
            function i(e, t, n) {
                t.writeUInt32BE(r((e.getTime() + 2082844800000) / 1e3), n)
            }
            function d(e, t, n) {
                t.writeUIntBE(r((e.getTime() + 2082844800000) / 1e3), n, 6)
            }
            function s(e, t, n) {
                t.writeUInt16BE(r(e) % 65536, n),
                t.writeUInt16BE(r(256 * (256 * e)) % 65536, n + 2)
            }
            function l(e, t, n) {
                t[n] = r(e) % 256,
                t[n + 1] = r(256 * e) % 256
            }
            function c(e, t, n) {
                e || (e = [0, 0, 0, 0, 0, 0, 0, 0, 0]);
                for (var r = 0; r < e.length; r++)
                    s(e[r], t, n + 4 * r)
            }
            function u(e, n, r) {
                var a = t.from(e, "utf8");
                a.copy(n, r),
                n[r + a.length] = 0
            }
            function f(e) {
                for (var t = Array(e.length / 4), n = 0; n < t.length; n++)
                    t[n] = m(e, 4 * n);
                return t
            }
            function p(e, t) {
                return new Date(1e3 * e.readUIntBE(t, 6) - 2082844800000)
            }
            function h(e, t) {
                return new Date(1e3 * e.readUInt32BE(t) - 2082844800000)
            }
            function m(e, t) {
                return e.readUInt16BE(t) + e.readUInt16BE(t + 2) / 65536
            }
            function g(e, t) {
                return e[t] + e[t + 1] / 256
            }
            function _(e, t, n) {
                var r;
                for (r = 0; r < n && !(0 === e[t + r]); r++)
                    ;
                return e.toString("utf8", t, t + r)
            }
            var b = e("./index")
              , y = e("./descriptor")
              , w = e("uint64be");
            n.fullBoxes = {};
            ["mvhd", "tkhd", "mdhd", "vmhd", "smhd", "stsd", "esds", "stsz", "stco", "co64", "stss", "stts", "ctts", "stsc", "dref", "elst", "hdlr", "mehd", "trex", "mfhd", "tfhd", "tfdt", "trun"].forEach(function(e) {
                n.fullBoxes[e] = !0
            }),
            n.ftyp = {},
            n.ftyp.encode = function(e, r, a) {
                r = r ? r.slice(a) : t.alloc(n.ftyp.encodingLength(e));
                var o = e.compatibleBrands || [];
                r.write(e.brand, 0, 4, "ascii"),
                r.writeUInt32BE(e.brandVersion, 4);
                for (var d = 0; d < o.length; d++)
                    r.write(o[d], 8 + 4 * d, 4, "ascii");
                return n.ftyp.encode.bytes = 8 + 4 * o.length,
                r
            }
            ,
            n.ftyp.decode = function(e, t) {
                e = e.slice(t);
                for (var n = e.toString("ascii", 0, 4), r = e.readUInt32BE(4), a = [], o = 8; o < e.length; o += 4)
                    a.push(e.toString("ascii", o, o + 4));
                return {
                    brand: n,
                    brandVersion: r,
                    compatibleBrands: a
                }
            }
            ,
            n.ftyp.encodingLength = function(e) {
                return 8 + 4 * (e.compatibleBrands || []).length
            }
            ,
            n.mvhd = {},
            n.mvhd.encode = function(e, r, a) {
                return r = r ? r.slice(a) : t.alloc(96),
                i(e.ctime || new Date, r, 0),
                i(e.mtime || new Date, r, 4),
                r.writeUInt32BE(e.timeScale || 0, 8),
                r.writeUInt32BE(e.duration || 0, 12),
                s(e.preferredRate || 0, r, 16),
                l(e.preferredVolume || 0, r, 20),
                o(r, 22, 32),
                c(e.matrix, r, 32),
                r.writeUInt32BE(e.previewTime || 0, 68),
                r.writeUInt32BE(e.previewDuration || 0, 72),
                r.writeUInt32BE(e.posterTime || 0, 76),
                r.writeUInt32BE(e.selectionTime || 0, 80),
                r.writeUInt32BE(e.selectionDuration || 0, 84),
                r.writeUInt32BE(e.currentTime || 0, 88),
                r.writeUInt32BE(e.nextTrackId || 0, 92),
                n.mvhd.encode.bytes = 96,
                r
            }
            ,
            n.mvhd.decode = function(e, t) {
                return e = e.slice(t),
                {
                    ctime: h(e, 0),
                    mtime: h(e, 4),
                    timeScale: e.readUInt32BE(8),
                    duration: e.readUInt32BE(12),
                    preferredRate: m(e, 16),
                    preferredVolume: g(e, 20),
                    matrix: f(e.slice(32, 68)),
                    previewTime: e.readUInt32BE(68),
                    previewDuration: e.readUInt32BE(72),
                    posterTime: e.readUInt32BE(76),
                    selectionTime: e.readUInt32BE(80),
                    selectionDuration: e.readUInt32BE(84),
                    currentTime: e.readUInt32BE(88),
                    nextTrackId: e.readUInt32BE(92)
                }
            }
            ,
            n.mvhd.encodingLength = function() {
                return 96
            }
            ,
            n.tkhd = {},
            n.tkhd.encode = function(e, r, a) {
                return r = r ? r.slice(a) : t.alloc(80),
                i(e.ctime || new Date, r, 0),
                i(e.mtime || new Date, r, 4),
                r.writeUInt32BE(e.trackId || 0, 8),
                o(r, 12, 16),
                r.writeUInt32BE(e.duration || 0, 16),
                o(r, 20, 28),
                r.writeUInt16BE(e.layer || 0, 28),
                r.writeUInt16BE(e.alternateGroup || 0, 30),
                r.writeUInt16BE(e.volume || 0, 32),
                c(e.matrix, r, 36),
                r.writeUInt32BE(e.trackWidth || 0, 72),
                r.writeUInt32BE(e.trackHeight || 0, 76),
                n.tkhd.encode.bytes = 80,
                r
            }
            ,
            n.tkhd.decode = function(e, t) {
                return e = e.slice(t),
                {
                    ctime: h(e, 0),
                    mtime: h(e, 4),
                    trackId: e.readUInt32BE(8),
                    duration: e.readUInt32BE(16),
                    layer: e.readUInt16BE(28),
                    alternateGroup: e.readUInt16BE(30),
                    volume: e.readUInt16BE(32),
                    matrix: f(e.slice(36, 72)),
                    trackWidth: e.readUInt32BE(72),
                    trackHeight: e.readUInt32BE(76)
                }
            }
            ,
            n.tkhd.encodingLength = function() {
                return 80
            }
            ,
            n.mdhd = {},
            n.mdhd.encode = function(e, r, a) {
                return 1 === e.version ? (r = r ? r.slice(a) : t.alloc(32),
                d(e.ctime || new Date, r, 0),
                d(e.mtime || new Date, r, 8),
                r.writeUInt32BE(e.timeScale || 0, 16),
                r.writeUIntBE(e.duration || 0, 20, 6),
                r.writeUInt16BE(e.language || 0, 28),
                r.writeUInt16BE(e.quality || 0, 30),
                n.mdhd.encode.bytes = 32,
                r) : (r = r ? r.slice(a) : t.alloc(20),
                i(e.ctime || new Date, r, 0),
                i(e.mtime || new Date, r, 4),
                r.writeUInt32BE(e.timeScale || 0, 8),
                r.writeUInt32BE(e.duration || 0, 12),
                r.writeUInt16BE(e.language || 0, 16),
                r.writeUInt16BE(e.quality || 0, 18),
                n.mdhd.encode.bytes = 20,
                r)
            }
            ,
            n.mdhd.decode = function(e, t, n) {
                e = e.slice(t);
                return 20 != n - t ? {
                    ctime: p(e, 0),
                    mtime: p(e, 8),
                    timeScale: e.readUInt32BE(16),
                    duration: e.readUIntBE(20, 6),
                    language: e.readUInt16BE(28),
                    quality: e.readUInt16BE(30)
                } : {
                    ctime: h(e, 0),
                    mtime: h(e, 4),
                    timeScale: e.readUInt32BE(8),
                    duration: e.readUInt32BE(12),
                    language: e.readUInt16BE(16),
                    quality: e.readUInt16BE(18)
                }
            }
            ,
            n.mdhd.encodingLength = function(e) {
                return 1 === e.version ? 32 : 20
            }
            ,
            n.vmhd = {},
            n.vmhd.encode = function(e, r, a) {
                r = r ? r.slice(a) : t.alloc(8),
                r.writeUInt16BE(e.graphicsMode || 0, 0);
                var o = e.opcolor || [0, 0, 0];
                return r.writeUInt16BE(o[0], 2),
                r.writeUInt16BE(o[1], 4),
                r.writeUInt16BE(o[2], 6),
                n.vmhd.encode.bytes = 8,
                r
            }
            ,
            n.vmhd.decode = function(e, t) {
                return e = e.slice(t),
                {
                    graphicsMode: e.readUInt16BE(0),
                    opcolor: [e.readUInt16BE(2), e.readUInt16BE(4), e.readUInt16BE(6)]
                }
            }
            ,
            n.vmhd.encodingLength = function() {
                return 8
            }
            ,
            n.smhd = {},
            n.smhd.encode = function(e, r, a) {
                return r = r ? r.slice(a) : t.alloc(4),
                r.writeUInt16BE(e.balance || 0, 0),
                o(r, 2, 4),
                n.smhd.encode.bytes = 4,
                r
            }
            ,
            n.smhd.decode = function(e, t) {
                return e = e.slice(t),
                {
                    balance: e.readUInt16BE(0)
                }
            }
            ,
            n.smhd.encodingLength = function() {
                return 4
            }
            ,
            n.stsd = {},
            n.stsd.encode = function(e, r, a) {
                r = r ? r.slice(a) : t.alloc(n.stsd.encodingLength(e));
                var o = e.entries || [];
                r.writeUInt32BE(o.length, 0);
                for (var d = 4, s = 0, l; s < o.length; s++)
                    l = o[s],
                    b.encode(l, r, d),
                    d += b.encode.bytes;
                return n.stsd.encode.bytes = d,
                r
            }
            ,
            n.stsd.decode = function(e, t, n) {
                e = e.slice(t);
                for (var r = e.readUInt32BE(0), a = Array(r), o = 4, d = 0, s; d < r; d++)
                    s = b.decode(e, o, n),
                    a[d] = s,
                    o += s.length;
                return {
                    entries: a
                }
            }
            ,
            n.stsd.encodingLength = function(e) {
                var t = 4;
                if (!e.entries)
                    return t;
                for (var n = 0; n < e.entries.length; n++)
                    t += b.encodingLength(e.entries[n]);
                return t
            }
            ,
            n.avc1 = n.VisualSampleEntry = {},
            n.VisualSampleEntry.encode = function(e, r, i) {
                r = r ? r.slice(i) : t.alloc(n.VisualSampleEntry.encodingLength(e)),
                o(r, 0, 6),
                r.writeUInt16BE(e.dataReferenceIndex || 0, 6),
                o(r, 8, 24),
                r.writeUInt16BE(e.width || 0, 24),
                r.writeUInt16BE(e.height || 0, 26),
                r.writeUInt32BE(e.hResolution || 4718592, 28),
                r.writeUInt32BE(e.vResolution || 4718592, 32),
                o(r, 36, 40),
                r.writeUInt16BE(e.frameCount || 1, 40);
                var d = e.compressorName || ""
                  , s = a(d.length, 31);
                r.writeUInt8(s, 42),
                r.write(d, 43, s, "utf8"),
                r.writeUInt16BE(e.depth || 24, 74),
                r.writeInt16BE(-1, 76);
                var l = 78
                  , c = e.children || [];
                c.forEach(function(e) {
                    b.encode(e, r, l),
                    l += b.encode.bytes
                }),
                n.VisualSampleEntry.encode.bytes = l
            }
            ,
            n.VisualSampleEntry.decode = function(e, t, n) {
                e = e.slice(t);
                for (var r = n - t, o = a(e.readUInt8(42), 31), i = {
                    dataReferenceIndex: e.readUInt16BE(6),
                    width: e.readUInt16BE(24),
                    height: e.readUInt16BE(26),
                    hResolution: e.readUInt32BE(28),
                    vResolution: e.readUInt32BE(32),
                    frameCount: e.readUInt16BE(40),
                    compressorName: e.toString("utf8", 43, 43 + o),
                    depth: e.readUInt16BE(74),
                    children: []
                }, d = 78; 8 <= r - d; ) {
                    var s = b.decode(e, d, r);
                    i.children.push(s),
                    i[s.type] = s,
                    d += s.length
                }
                return i
            }
            ,
            n.VisualSampleEntry.encodingLength = function(e) {
                var t = 78
                  , n = e.children || [];
                return n.forEach(function(e) {
                    t += b.encodingLength(e)
                }),
                t
            }
            ,
            n.avcC = {},
            n.avcC.encode = function(e, r, a) {
                r = r ? r.slice(a) : t.alloc(e.buffer.length),
                e.buffer.copy(r),
                n.avcC.encode.bytes = e.buffer.length
            }
            ,
            n.avcC.decode = function(e, n, r) {
                return e = e.slice(n, r),
                {
                    mimeCodec: e.toString("hex", 1, 4),
                    buffer: t.from(e)
                }
            }
            ,
            n.avcC.encodingLength = function(e) {
                return e.buffer.length
            }
            ,
            n.mp4a = n.AudioSampleEntry = {},
            n.AudioSampleEntry.encode = function(e, r, a) {
                r = r ? r.slice(a) : t.alloc(n.AudioSampleEntry.encodingLength(e)),
                o(r, 0, 6),
                r.writeUInt16BE(e.dataReferenceIndex || 0, 6),
                o(r, 8, 16),
                r.writeUInt16BE(e.channelCount || 2, 16),
                r.writeUInt16BE(e.sampleSize || 16, 18),
                o(r, 20, 24),
                r.writeUInt32BE(e.sampleRate || 0, 24);
                var i = 28
                  , d = e.children || [];
                d.forEach(function(e) {
                    b.encode(e, r, i),
                    i += b.encode.bytes
                }),
                n.AudioSampleEntry.encode.bytes = i
            }
            ,
            n.AudioSampleEntry.decode = function(e, t, n) {
                e = e.slice(t, n);
                for (var r = n - t, a = {
                    dataReferenceIndex: e.readUInt16BE(6),
                    channelCount: e.readUInt16BE(16),
                    sampleSize: e.readUInt16BE(18),
                    sampleRate: e.readUInt32BE(24),
                    children: []
                }, o = 28; 8 <= r - o; ) {
                    var i = b.decode(e, o, r);
                    a.children.push(i),
                    a[i.type] = i,
                    o += i.length
                }
                return a
            }
            ,
            n.AudioSampleEntry.encodingLength = function(e) {
                var t = 28
                  , n = e.children || [];
                return n.forEach(function(e) {
                    t += b.encodingLength(e)
                }),
                t
            }
            ,
            n.esds = {},
            n.esds.encode = function(e, r, a) {
                r = r ? r.slice(a) : t.alloc(e.buffer.length),
                e.buffer.copy(r, 0),
                n.esds.encode.bytes = e.buffer.length
            }
            ,
            n.esds.decode = function(e, n, r) {
                e = e.slice(n, r);
                var a = y.Descriptor.decode(e, 0, e.length)
                  , o = "ESDescriptor" === a.tagName ? a : {}
                  , i = o.DecoderConfigDescriptor || {}
                  , d = i.oti || 0
                  , s = i.DecoderSpecificInfo
                  , l = s ? (248 & s.buffer.readUInt8(0)) >> 3 : 0
                  , c = null;
                return d && (c = d.toString(16),
                l && (c += "." + l)),
                {
                    mimeCodec: c,
                    buffer: t.from(e.slice(0))
                }
            }
            ,
            n.esds.encodingLength = function(e) {
                return e.buffer.length
            }
            ,
            n.stsz = {},
            n.stsz.encode = function(e, r, a) {
                var o = e.entries || [];
                r = r ? r.slice(a) : t.alloc(n.stsz.encodingLength(e)),
                r.writeUInt32BE(0, 0),
                r.writeUInt32BE(o.length, 4);
                for (var d = 0; d < o.length; d++)
                    r.writeUInt32BE(o[d], 4 * d + 8);
                return n.stsz.encode.bytes = 8 + 4 * o.length,
                r
            }
            ,
            n.stsz.decode = function(e, t) {
                e = e.slice(t);
                for (var n = e.readUInt32BE(0), r = e.readUInt32BE(4), a = Array(r), o = 0; o < r; o++)
                    a[o] = 0 === n ? e.readUInt32BE(4 * o + 8) : n;
                return {
                    entries: a
                }
            }
            ,
            n.stsz.encodingLength = function(e) {
                return 8 + 4 * e.entries.length
            }
            ,
            n.stss = n.stco = {},
            n.stco.encode = function(e, r, a) {
                var o = e.entries || [];
                r = r ? r.slice(a) : t.alloc(n.stco.encodingLength(e)),
                r.writeUInt32BE(o.length, 0);
                for (var d = 0; d < o.length; d++)
                    r.writeUInt32BE(o[d], 4 * d + 4);
                return n.stco.encode.bytes = 4 + 4 * o.length,
                r
            }
            ,
            n.stco.decode = function(e, t) {
                e = e.slice(t);
                for (var n = e.readUInt32BE(0), r = Array(n), a = 0; a < n; a++)
                    r[a] = e.readUInt32BE(4 * a + 4);
                return {
                    entries: r
                }
            }
            ,
            n.stco.encodingLength = function(e) {
                return 4 + 4 * e.entries.length
            }
            ,
            n.co64 = {},
            n.co64.encode = function(e, r, a) {
                var o = e.entries || [];
                r = r ? r.slice(a) : t.alloc(n.co64.encodingLength(e)),
                r.writeUInt32BE(o.length, 0);
                for (var d = 0; d < o.length; d++)
                    w.encode(o[d], r, 8 * d + 4);
                return n.co64.encode.bytes = 4 + 8 * o.length,
                r
            }
            ,
            n.co64.decode = function(e, t) {
                e = e.slice(t);
                for (var n = e.readUInt32BE(0), r = Array(n), a = 0; a < n; a++)
                    r[a] = w.decode(e, 8 * a + 4);
                return {
                    entries: r
                }
            }
            ,
            n.co64.encodingLength = function(e) {
                return 4 + 8 * e.entries.length
            }
            ,
            n.stts = {},
            n.stts.encode = function(e, r, a) {
                var o = e.entries || [];
                r = r ? r.slice(a) : t.alloc(n.stts.encodingLength(e)),
                r.writeUInt32BE(o.length, 0);
                for (var d = 0, s; d < o.length; d++)
                    s = 8 * d + 4,
                    r.writeUInt32BE(o[d].count || 0, s),
                    r.writeUInt32BE(o[d].duration || 0, s + 4);
                return n.stts.encode.bytes = 4 + 8 * e.entries.length,
                r
            }
            ,
            n.stts.decode = function(e, t) {
                e = e.slice(t);
                for (var n = e.readUInt32BE(0), r = Array(n), a = 0, o; a < n; a++)
                    o = 8 * a + 4,
                    r[a] = {
                        count: e.readUInt32BE(o),
                        duration: e.readUInt32BE(o + 4)
                    };
                return {
                    entries: r
                }
            }
            ,
            n.stts.encodingLength = function(e) {
                return 4 + 8 * e.entries.length
            }
            ,
            n.ctts = {},
            n.ctts.encode = function(e, r, a) {
                var o = e.entries || [];
                r = r ? r.slice(a) : t.alloc(n.ctts.encodingLength(e)),
                r.writeUInt32BE(o.length, 0);
                for (var d = 0, s; d < o.length; d++)
                    s = 8 * d + 4,
                    r.writeUInt32BE(o[d].count || 0, s),
                    r.writeUInt32BE(o[d].compositionOffset || 0, s + 4);
                return n.ctts.encode.bytes = 4 + 8 * o.length,
                r
            }
            ,
            n.ctts.decode = function(e, t) {
                e = e.slice(t);
                for (var n = e.readUInt32BE(0), r = Array(n), a = 0, o; a < n; a++)
                    o = 8 * a + 4,
                    r[a] = {
                        count: e.readUInt32BE(o),
                        compositionOffset: e.readInt32BE(o + 4)
                    };
                return {
                    entries: r
                }
            }
            ,
            n.ctts.encodingLength = function(e) {
                return 4 + 8 * e.entries.length
            }
            ,
            n.stsc = {},
            n.stsc.encode = function(e, r, a) {
                var o = e.entries || [];
                r = r ? r.slice(a) : t.alloc(n.stsc.encodingLength(e)),
                r.writeUInt32BE(o.length, 0);
                for (var d = 0, s; d < o.length; d++)
                    s = 12 * d + 4,
                    r.writeUInt32BE(o[d].firstChunk || 0, s),
                    r.writeUInt32BE(o[d].samplesPerChunk || 0, s + 4),
                    r.writeUInt32BE(o[d].sampleDescriptionId || 0, s + 8);
                return n.stsc.encode.bytes = 4 + 12 * o.length,
                r
            }
            ,
            n.stsc.decode = function(e, t) {
                e = e.slice(t);
                for (var n = e.readUInt32BE(0), r = Array(n), a = 0, o; a < n; a++)
                    o = 12 * a + 4,
                    r[a] = {
                        firstChunk: e.readUInt32BE(o),
                        samplesPerChunk: e.readUInt32BE(o + 4),
                        sampleDescriptionId: e.readUInt32BE(o + 8)
                    };
                return {
                    entries: r
                }
            }
            ,
            n.stsc.encodingLength = function(e) {
                return 4 + 12 * e.entries.length
            }
            ,
            n.dref = {},
            n.dref.encode = function(e, r, a) {
                r = r ? r.slice(a) : t.alloc(n.dref.encodingLength(e));
                var o = e.entries || [];
                r.writeUInt32BE(o.length, 0);
                for (var d = 4, s = 0; s < o.length; s++) {
                    var l = o[s]
                      , c = (l.buf ? l.buf.length : 0) + 4 + 4;
                    r.writeUInt32BE(c, d),
                    d += 4,
                    r.write(l.type, d, 4, "ascii"),
                    d += 4,
                    l.buf && (l.buf.copy(r, d),
                    d += l.buf.length)
                }
                return n.dref.encode.bytes = d,
                r
            }
            ,
            n.dref.decode = function(e, t) {
                e = e.slice(t);
                for (var n = e.readUInt32BE(0), r = Array(n), a = 4, o = 0; o < n; o++) {
                    var d = e.readUInt32BE(a)
                      , s = e.toString("ascii", a + 4, a + 8)
                      , l = e.slice(a + 8, a + d);
                    a += d,
                    r[o] = {
                        type: s,
                        buf: l
                    }
                }
                return {
                    entries: r
                }
            }
            ,
            n.dref.encodingLength = function(e) {
                var t = 4;
                if (!e.entries)
                    return t;
                for (var n = 0, r; n < e.entries.length; n++)
                    r = e.entries[n].buf,
                    t += (r ? r.length : 0) + 4 + 4;
                return t
            }
            ,
            n.elst = {},
            n.elst.encode = function(e, r, a) {
                var o = e.entries || [];
                r = r ? r.slice(a) : t.alloc(n.elst.encodingLength(e)),
                r.writeUInt32BE(o.length, 0);
                for (var d = 0, l; d < o.length; d++)
                    l = 12 * d + 4,
                    r.writeUInt32BE(o[d].trackDuration || 0, l),
                    r.writeUInt32BE(o[d].mediaTime || 0, l + 4),
                    s(o[d].mediaRate || 0, r, l + 8);
                return n.elst.encode.bytes = 4 + 12 * o.length,
                r
            }
            ,
            n.elst.decode = function(e, t) {
                e = e.slice(t);
                for (var n = e.readUInt32BE(0), r = Array(n), a = 0, o; a < n; a++)
                    o = 12 * a + 4,
                    r[a] = {
                        trackDuration: e.readUInt32BE(o),
                        mediaTime: e.readInt32BE(o + 4),
                        mediaRate: m(e, o + 8)
                    };
                return {
                    entries: r
                }
            }
            ,
            n.elst.encodingLength = function(e) {
                return 4 + 12 * e.entries.length
            }
            ,
            n.hdlr = {},
            n.hdlr.encode = function(e, r, a) {
                r = r ? r.slice(a) : t.alloc(n.hdlr.encodingLength(e));
                var o = 21 + (e.name || "").length;
                return r.fill(0, 0, o),
                r.write(e.handlerType || "", 4, 4, "ascii"),
                u(e.name || "", r, 20),
                n.hdlr.encode.bytes = o,
                r
            }
            ,
            n.hdlr.decode = function(e, t, n) {
                return e = e.slice(t),
                {
                    handlerType: e.toString("ascii", 4, 8),
                    name: _(e, 20, n)
                }
            }
            ,
            n.hdlr.encodingLength = function(e) {
                return 21 + (e.name || "").length
            }
            ,
            n.mehd = {},
            n.mehd.encode = function(e, r, a) {
                return r = r ? r.slice(a) : t.alloc(4),
                r.writeUInt32BE(e.fragmentDuration || 0, 0),
                n.mehd.encode.bytes = 4,
                r
            }
            ,
            n.mehd.decode = function(e, t) {
                return e = e.slice(t),
                {
                    fragmentDuration: e.readUInt32BE(0)
                }
            }
            ,
            n.mehd.encodingLength = function() {
                return 4
            }
            ,
            n.trex = {},
            n.trex.encode = function(e, r, a) {
                return r = r ? r.slice(a) : t.alloc(20),
                r.writeUInt32BE(e.trackId || 0, 0),
                r.writeUInt32BE(e.defaultSampleDescriptionIndex || 0, 4),
                r.writeUInt32BE(e.defaultSampleDuration || 0, 8),
                r.writeUInt32BE(e.defaultSampleSize || 0, 12),
                r.writeUInt32BE(e.defaultSampleFlags || 0, 16),
                n.trex.encode.bytes = 20,
                r
            }
            ,
            n.trex.decode = function(e, t) {
                return e = e.slice(t),
                {
                    trackId: e.readUInt32BE(0),
                    defaultSampleDescriptionIndex: e.readUInt32BE(4),
                    defaultSampleDuration: e.readUInt32BE(8),
                    defaultSampleSize: e.readUInt32BE(12),
                    defaultSampleFlags: e.readUInt32BE(16)
                }
            }
            ,
            n.trex.encodingLength = function() {
                return 20
            }
            ,
            n.mfhd = {},
            n.mfhd.encode = function(e, r, a) {
                return r = r ? r.slice(a) : t.alloc(4),
                r.writeUInt32BE(e.sequenceNumber || 0, 0),
                n.mfhd.encode.bytes = 4,
                r
            }
            ,
            n.mfhd.decode = function(e) {
                return {
                    sequenceNumber: e.readUInt32BE(0)
                }
            }
            ,
            n.mfhd.encodingLength = function() {
                return 4
            }
            ,
            n.tfhd = {},
            n.tfhd.encode = function(e, r, a) {
                return r = r ? r.slice(a) : t.alloc(4),
                r.writeUInt32BE(e.trackId, 0),
                n.tfhd.encode.bytes = 4,
                r
            }
            ,
            n.tfhd.decode = function() {}
            ,
            n.tfhd.encodingLength = function() {
                return 4
            }
            ,
            n.tfdt = {},
            n.tfdt.encode = function(e, r, a) {
                return r = r ? r.slice(a) : t.alloc(4),
                r.writeUInt32BE(e.baseMediaDecodeTime || 0, 0),
                n.tfdt.encode.bytes = 4,
                r
            }
            ,
            n.tfdt.decode = function() {}
            ,
            n.tfdt.encodingLength = function() {
                return 4
            }
            ,
            n.trun = {},
            n.trun.encode = function(e, r, a) {
                r = r ? r.slice(a) : t.alloc(8 + 16 * e.entries.length),
                r.writeUInt32BE(e.entries.length, 0),
                r.writeInt32BE(e.dataOffset, 4);
                for (var o = 8, d = 0, s; d < e.entries.length; d++)
                    s = e.entries[d],
                    r.writeUInt32BE(s.sampleDuration, o),
                    o += 4,
                    r.writeUInt32BE(s.sampleSize, o),
                    o += 4,
                    r.writeUInt32BE(s.sampleFlags, o),
                    o += 4,
                    0 === (e.version || 0) ? r.writeUInt32BE(s.sampleCompositionTimeOffset, o) : r.writeInt32BE(s.sampleCompositionTimeOffset, o),
                    o += 4;
                n.trun.encode.bytes = o
            }
            ,
            n.trun.decode = function() {}
            ,
            n.trun.encodingLength = function(e) {
                return 8 + 16 * e.entries.length
            }
            ,
            n.mdat = {},
            n.mdat.encode = function(e, t, r) {
                e.buffer ? (e.buffer.copy(t, r),
                n.mdat.encode.bytes = e.buffer.length) : n.mdat.encode.bytes = n.mdat.encodingLength(e)
            }
            ,
            n.mdat.decode = function(e, n, r) {
                return {
                    buffer: t.from(e.slice(n, r))
                }
            }
            ,
            n.mdat.encodingLength = function(e) {
                return e.buffer ? e.buffer.length : e.contentLength
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        "./descriptor": 107,
        "./index": 108,
        buffer: 23,
        uint64be: 208
    }],
    107: [function(e, t, n) {
        (function(e) {
            var t = {
                3: "ESDescriptor",
                4: "DecoderConfigDescriptor",
                5: "DecoderSpecificInfo",
                6: "SLConfigDescriptor"
            };
            n.Descriptor = {},
            n.Descriptor.decode = function(r, a, o) {
                var i = r.readUInt8(a), d = a + 1, s = 0, l;
                do
                    l = r.readUInt8(d++),
                    s = s << 7 | 127 & l;
                while (128 & l);var c = t[i], u;
                return u = n[c] ? n[c].decode(r, d, o) : {
                    buffer: e.from(r.slice(d, d + s))
                },
                u.tag = i,
                u.tagName = c,
                u.length = d - a + s,
                u.contentsLen = s,
                u
            }
            ,
            n.DescriptorArray = {},
            n.DescriptorArray.decode = function(e, r, a) {
                for (var o = r, i = {}; o + 2 <= a; ) {
                    var d = n.Descriptor.decode(e, o, a);
                    o += d.length;
                    var s = t[d.tag] || "Descriptor" + d.tag;
                    i[s] = d
                }
                return i
            }
            ,
            n.ESDescriptor = {},
            n.ESDescriptor.decode = function(e, t, r) {
                var a = e.readUInt8(t + 2)
                  , o = t + 3;
                if (128 & a && (o += 2),
                64 & a) {
                    var i = e.readUInt8(o);
                    o += i + 1
                }
                return 32 & a && (o += 2),
                n.DescriptorArray.decode(e, o, r)
            }
            ,
            n.DecoderConfigDescriptor = {},
            n.DecoderConfigDescriptor.decode = function(e, t, r) {
                var a = e.readUInt8(t)
                  , o = n.DescriptorArray.decode(e, t + 13, r);
                return o.oti = a,
                o
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23
    }],
    108: [function(e, t, n) {
        (function(t) {
            var r = e("uint64be")
              , a = e("./boxes")
              , o = 4294967295
              , i = n
              , d = n.containers = {
                moov: ["mvhd", "meta", "traks", "mvex"],
                trak: ["tkhd", "tref", "trgr", "edts", "meta", "mdia", "udta"],
                edts: ["elst"],
                mdia: ["mdhd", "hdlr", "elng", "minf"],
                minf: ["vmhd", "smhd", "hmhd", "sthd", "nmhd", "dinf", "stbl"],
                dinf: ["dref"],
                stbl: ["stsd", "stts", "ctts", "cslg", "stsc", "stsz", "stz2", "stco", "co64", "stss", "stsh", "padb", "stdp", "sdtp", "sbgps", "sgpds", "subss", "saizs", "saios"],
                mvex: ["mehd", "trexs", "leva"],
                moof: ["mfhd", "meta", "trafs"],
                traf: ["tfhd", "tfdt", "trun", "sbgps", "sgpds", "subss", "saizs", "saios", "meta"]
            };
            i.encode = function(e, n, r) {
                return i.encodingLength(e),
                r = r || 0,
                n = n || t.alloc(e.length),
                i._encode(e, n, r)
            }
            ,
            i._encode = function(e, t, n) {
                var s = e.type
                  , l = e.length;
                l > o && (l = 1),
                t.writeUInt32BE(l, n),
                t.write(e.type, n + 4, 4, "ascii");
                var c = n + 8;
                if (1 === l && (r.encode(e.length, t, c),
                c += 8),
                a.fullBoxes[s] && (t.writeUInt32BE(e.flags || 0, c),
                t.writeUInt8(e.version || 0, c),
                c += 4),
                d[s]) {
                    var u = d[s];
                    u.forEach(function(n) {
                        if (5 === n.length) {
                            var r = e[n] || [];
                            n = n.substr(0, 4),
                            r.forEach(function(e) {
                                i._encode(e, t, c),
                                c += i.encode.bytes
                            })
                        } else
                            e[n] && (i._encode(e[n], t, c),
                            c += i.encode.bytes)
                    }),
                    e.otherBoxes && e.otherBoxes.forEach(function(e) {
                        i._encode(e, t, c),
                        c += i.encode.bytes
                    })
                } else if (a[s]) {
                    var f = a[s].encode;
                    f(e, t, c),
                    c += f.bytes
                } else if (e.buffer) {
                    var p = e.buffer;
                    p.copy(t, c),
                    c += e.buffer.length
                } else
                    throw new Error("Either `type` must be set to a known type (not'" + s + "') or `buffer` must be set");
                return i.encode.bytes = c - n,
                t
            }
            ,
            i.readHeaders = function(e, t, n) {
                if (t = t || 0,
                n = n || e.length,
                8 > n - t)
                    return 8;
                var o = e.readUInt32BE(t)
                  , i = e.toString("ascii", t + 4, t + 8)
                  , d = t + 8;
                if (1 === o) {
                    if (16 > n - t)
                        return 16;
                    o = r.decode(e, d),
                    d += 8
                }
                var s, l;
                return a.fullBoxes[i] && (s = e.readUInt8(d),
                l = 16777215 & e.readUInt32BE(d),
                d += 4),
                {
                    length: o,
                    headersLen: d - t,
                    contentLen: o - (d - t),
                    type: i,
                    version: s,
                    flags: l
                }
            }
            ,
            i.decode = function(e, t, n) {
                t = t || 0,
                n = n || e.length;
                var r = i.readHeaders(e, t, n);
                if (!r || r.length > n - t)
                    throw new Error("Data too short");
                return i.decodeWithoutHeaders(r, e, t + r.headersLen, t + r.length)
            }
            ,
            i.decodeWithoutHeaders = function(e, n, r, o) {
                r = r || 0,
                o = o || n.length;
                var s = e.type
                  , l = {};
                if (d[s]) {
                    l.otherBoxes = [];
                    for (var c = d[s], u = r, f; 8 <= o - u; )
                        if (f = i.decode(n, u, o),
                        u += f.length,
                        0 <= c.indexOf(f.type))
                            l[f.type] = f;
                        else if (0 <= c.indexOf(f.type + "s")) {
                            var p = f.type + "s"
                              , h = l[p] = l[p] || [];
                            h.push(f)
                        } else
                            l.otherBoxes.push(f)
                } else if (a[s]) {
                    var m = a[s].decode;
                    l = m(n, r, o)
                } else
                    l.buffer = t.from(n.slice(r, o));
                return l.length = e.length,
                l.contentLen = e.contentLen,
                l.type = e.type,
                l.version = e.version,
                l.flags = e.flags,
                l
            }
            ,
            i.encodingLength = function(e) {
                var t = e.type
                  , n = 8;
                if (a.fullBoxes[t] && (n += 4),
                d[t]) {
                    var r = d[t];
                    r.forEach(function(t) {
                        if (5 === t.length) {
                            var r = e[t] || [];
                            t = t.substr(0, 4),
                            r.forEach(function(e) {
                                e.type = t,
                                n += i.encodingLength(e)
                            })
                        } else if (e[t]) {
                            var a = e[t];
                            a.type = t,
                            n += i.encodingLength(a)
                        }
                    }),
                    e.otherBoxes && e.otherBoxes.forEach(function(e) {
                        n += i.encodingLength(e)
                    })
                } else if (a[t])
                    n += a[t].encodingLength(e);
                else if (e.buffer)
                    n += e.buffer.length;
                else
                    throw new Error("Either `type` must be set to a known type (not'" + t + "') or `buffer` must be set");
                return n > o && (n += 8),
                e.length = n,
                n
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        "./boxes": 106,
        buffer: 23,
        uint64be: 208
    }],
    109: [function(e, t) {
        (function(n) {
            var r = e("readable-stream")
              , a = e("next-event")
              , o = e("mp4-box-encoding")
              , i = n.alloc(0);
            class d extends r.Writable {
                constructor(e) {
                    super(e),
                    this.destroyed = !1,
                    this._pending = 0,
                    this._missing = 0,
                    this._ignoreEmpty = !1,
                    this._buf = null,
                    this._str = null,
                    this._cb = null,
                    this._ondrain = null,
                    this._writeBuffer = null,
                    this._writeCb = null,
                    this._ondrain = null,
                    this._kick()
                }
                destroy(e) {
                    this.destroyed || (this.destroyed = !0,
                    e && this.emit("error", e),
                    this.emit("close"))
                }
                _write(e, t, n) {
                    if (!this.destroyed) {
                        for (var r = !this._str || !this._str._writableState.needDrain; e.length && !this.destroyed; ) {
                            if (!this._missing && !this._ignoreEmpty)
                                return this._writeBuffer = e,
                                void (this._writeCb = n);
                            var a = e.length < this._missing ? e.length : this._missing;
                            if (this._buf ? e.copy(this._buf, this._buf.length - this._missing) : this._str && (r = this._str.write(a === e.length ? e : e.slice(0, a))),
                            this._missing -= a,
                            !this._missing) {
                                var o = this._buf
                                  , d = this._cb
                                  , s = this._str;
                                this._buf = this._cb = this._str = this._ondrain = null,
                                r = !0,
                                this._ignoreEmpty = !1,
                                s && s.end(),
                                d && d(o)
                            }
                            e = a === e.length ? i : e.slice(a)
                        }
                        return this._pending && !this._missing ? (this._writeBuffer = e,
                        void (this._writeCb = n)) : void (r ? n() : this._ondrain(n))
                    }
                }
                _buffer(e, t) {
                    this._missing = e,
                    this._buf = n.alloc(e),
                    this._cb = t
                }
                _stream(e, t) {
                    return this._missing = e,
                    this._str = new s(this),
                    this._ondrain = a(this._str, "drain"),
                    this._pending++,
                    this._str.on("end", ()=>{
                        this._pending--,
                        this._kick()
                    }
                    ),
                    this._cb = t,
                    this._str
                }
                _readBox() {
                    const e = (t,r)=>{
                        this._buffer(t, t=>{
                            r = r ? n.concat([r, t]) : t;
                            var a = o.readHeaders(r);
                            "number" == typeof a ? e(a - r.length, r) : (this._pending++,
                            this._headers = a,
                            this.emit("box", a))
                        }
                        )
                    }
                    ;
                    e(8)
                }
                stream() {
                    if (!this._headers)
                        throw new Error("this function can only be called once after 'box' is emitted");
                    var e = this._headers;
                    return this._headers = null,
                    this._stream(e.contentLen, null)
                }
                decode(e) {
                    if (!this._headers)
                        throw new Error("this function can only be called once after 'box' is emitted");
                    var t = this._headers;
                    this._headers = null,
                    this._buffer(t.contentLen, n=>{
                        var r = o.decodeWithoutHeaders(t, n);
                        e(r),
                        this._pending--,
                        this._kick()
                    }
                    )
                }
                ignore() {
                    if (!this._headers)
                        throw new Error("this function can only be called once after 'box' is emitted");
                    var e = this._headers;
                    this._headers = null,
                    this._missing = e.contentLen,
                    0 === this._missing && (this._ignoreEmpty = !0),
                    this._cb = ()=>{
                        this._pending--,
                        this._kick()
                    }
                }
                _kick() {
                    if (!this._pending && (this._buf || this._str || this._readBox(),
                    this._writeBuffer)) {
                        var e = this._writeCb
                          , t = this._writeBuffer;
                        this._writeBuffer = null,
                        this._writeCb = null,
                        this._write(t, null, e)
                    }
                }
            }
            class s extends r.PassThrough {
                constructor(e) {
                    super(),
                    this._parent = e,
                    this.destroyed = !1
                }
                destroy(e) {
                    this.destroyed || (this.destroyed = !0,
                    this._parent.destroy(e),
                    e && this.emit("error", e),
                    this.emit("close"))
                }
            }
            t.exports = d
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23,
        "mp4-box-encoding": 108,
        "next-event": 113,
        "readable-stream": 160
    }],
    110: [function(e, t) {
        (function(n, r) {
            function a() {}
            var o = e("readable-stream")
              , i = e("mp4-box-encoding");
            class d extends o.Readable {
                constructor(e) {
                    super(e),
                    this.destroyed = !1,
                    this._finalized = !1,
                    this._reading = !1,
                    this._stream = null,
                    this._drain = null,
                    this._want = !1,
                    this._onreadable = ()=>{
                        this._want && (this._want = !1,
                        this._read())
                    }
                    ,
                    this._onend = ()=>{
                        this._stream = null
                    }
                }
                mdat(e, t) {
                    this.mediaData(e, t)
                }
                mediaData(e, t) {
                    var n = new s(this);
                    return this.box({
                        type: "mdat",
                        contentLength: e,
                        encodeBufferLen: 8,
                        stream: n
                    }, t),
                    n
                }
                box(e, t) {
                    if (t || (t = a),
                    this.destroyed)
                        return t(new Error("Encoder is destroyed"));
                    var o;
                    if (e.encodeBufferLen && (o = r.alloc(e.encodeBufferLen)),
                    e.stream)
                        e.buffer = null,
                        o = i.encode(e, o),
                        this.push(o),
                        this._stream = e.stream,
                        this._stream.on("readable", this._onreadable),
                        this._stream.on("end", this._onend),
                        this._stream.on("end", t),
                        this._forward();
                    else {
                        o = i.encode(e, o);
                        var d = this.push(o);
                        if (d)
                            return n.nextTick(t);
                        this._drain = t
                    }
                }
                destroy(e) {
                    if (!this.destroyed) {
                        if (this.destroyed = !0,
                        this._stream && this._stream.destroy && this._stream.destroy(),
                        this._stream = null,
                        this._drain) {
                            var t = this._drain;
                            this._drain = null,
                            t(e)
                        }
                        e && this.emit("error", e),
                        this.emit("close")
                    }
                }
                finalize() {
                    this._finalized = !0,
                    this._stream || this._drain || this.push(null)
                }
                _forward() {
                    if (this._stream)
                        for (; !this.destroyed; ) {
                            var e = this._stream.read();
                            if (!e)
                                return void (this._want = !!this._stream);
                            if (!this.push(e))
                                return
                        }
                }
                _read() {
                    if (!(this._reading || this.destroyed)) {
                        if (this._reading = !0,
                        this._stream && this._forward(),
                        this._drain) {
                            var e = this._drain;
                            this._drain = null,
                            e()
                        }
                        this._reading = !1,
                        this._finalized && this.push(null)
                    }
                }
            }
            class s extends o.PassThrough {
                constructor(e) {
                    super(),
                    this._parent = e,
                    this.destroyed = !1
                }
                destroy(e) {
                    this.destroyed || (this.destroyed = !0,
                    this._parent.destroy(e),
                    e && this.emit("error", e),
                    this.emit("close"))
                }
            }
            t.exports = d
        }
        ).call(this, e("_process"), e("buffer").Buffer)
    }
    , {
        _process: 137,
        buffer: 23,
        "mp4-box-encoding": 108,
        "readable-stream": 160
    }],
    111: [function(e, t, n) {
        const r = e("./decode")
          , a = e("./encode");
        n.decode = e=>new r(e),
        n.encode = e=>new a(e)
    }
    , {
        "./decode": 109,
        "./encode": 110
    }],
    112: [function(e, t) {
        function n(e) {
            return a(e, {
                objectMode: !0,
                highWaterMark: 16
            })
        }
        function r(e) {
            return a(e)
        }
        function a(e, t) {
            if (!e || "function" == typeof e || e._readableState)
                return e;
            var n = new o.Readable(t).wrap(e);
            return e.destroy && (n.destroy = e.destroy.bind(e)),
            n
        }
        var o = e("readable-stream");
        class i extends o.Readable {
            constructor(e, t) {
                super(t),
                this.destroyed = !1,
                this._drained = !1,
                this._forwarding = !1,
                this._current = null,
                this._toStreams2 = t && t.objectMode ? n : r,
                "function" == typeof e ? this._queue = e : (this._queue = e.map(this._toStreams2),
                this._queue.forEach(e=>{
                    "function" != typeof e && this._attachErrorListener(e)
                }
                )),
                this._next()
            }
            _read() {
                this._drained = !0,
                this._forward()
            }
            _forward() {
                if (!this._forwarding && this._drained && this._current) {
                    this._forwarding = !0;
                    for (var e; null !== (e = this._current.read()) && this._drained; )
                        this._drained = this.push(e);
                    this._forwarding = !1
                }
            }
            destroy(e) {
                this.destroyed || (this.destroyed = !0,
                this._current && this._current.destroy && this._current.destroy(),
                "function" != typeof this._queue && this._queue.forEach(e=>{
                    e.destroy && e.destroy()
                }
                ),
                e && this.emit("error", e),
                this.emit("close"))
            }
            _next() {
                if (this._current = null,
                "function" == typeof this._queue)
                    this._queue((e,t)=>e ? this.destroy(e) : void (t = this._toStreams2(t),
                    this._attachErrorListener(t),
                    this._gotNextStream(t)));
                else {
                    var e = this._queue.shift();
                    "function" == typeof e && (e = this._toStreams2(e()),
                    this._attachErrorListener(e)),
                    this._gotNextStream(e)
                }
            }
            _gotNextStream(e) {
                if (!e)
                    return this.push(null),
                    void this.destroy();
                this._current = e,
                this._forward();
                const t = ()=>{
                    this._forward()
                }
                  , n = ()=>{
                    e._readableState.ended || this.destroy()
                }
                  , r = ()=>{
                    this._current = null,
                    e.removeListener("readable", t),
                    e.removeListener("end", r),
                    e.removeListener("close", n),
                    this._next()
                }
                ;
                e.on("readable", t),
                e.once("end", r),
                e.once("close", n)
            }
            _attachErrorListener(e) {
                if (!e)
                    return;
                const t = n=>{
                    e.removeListener("error", t),
                    this.destroy(n)
                }
                ;
                e.once("error", t)
            }
        }
        i.obj = e=>new i(e,{
            objectMode: !0,
            highWaterMark: 16
        }),
        t.exports = i
    }
    , {
        "readable-stream": 160
    }],
    113: [function(e, t) {
        t.exports = function(e, t) {
            var n = null;
            return e.on(t, function(e) {
                if (n) {
                    var t = n;
                    n = null,
                    t(e)
                }
            }),
            function(e) {
                n = e
            }
        }
    }
    , {}],
    114: [function(e, t) {
        function n(e) {
            var t = function() {
                return t.called ? t.value : (t.called = !0,
                t.value = e.apply(this, arguments))
            };
            return t.called = !1,
            t
        }
        function r(e) {
            var t = function() {
                if (t.called)
                    throw new Error(t.onceError);
                return t.called = !0,
                t.value = e.apply(this, arguments)
            }
              , n = e.name || "Function wrapped with `once`";
            return t.onceError = n + " shouldn't be called more than once",
            t.called = !1,
            t
        }
        var a = e("wrappy");
        t.exports = a(n),
        t.exports.strict = a(r),
        n.proto = n(function() {
            Object.defineProperty(Function.prototype, "once", {
                value: function() {
                    return n(this)
                },
                configurable: !0
            }),
            Object.defineProperty(Function.prototype, "onceStrict", {
                value: function() {
                    return r(this)
                },
                configurable: !0
            })
        })
    }
    , {
        wrappy: 226
    }],
    115: [function(e, t) {
        'use strict';
        var n = e("./lib/utils/common").assign
          , r = e("./lib/deflate")
          , a = e("./lib/inflate")
          , o = e("./lib/zlib/constants")
          , i = {};
        n(i, r, a, o),
        t.exports = i
    }
    , {
        "./lib/deflate": 116,
        "./lib/inflate": 117,
        "./lib/utils/common": 118,
        "./lib/zlib/constants": 121
    }],
    116: [function(e, t, n) {
        'use strict';
        function r(e) {
            if (!(this instanceof r))
                return new r(e);
            this.options = i.assign({
                level: -1,
                method: 8,
                chunkSize: 16384,
                windowBits: 15,
                memLevel: 8,
                strategy: 0,
                to: ""
            }, e || {});
            var t = this.options;
            t.raw && 0 < t.windowBits ? t.windowBits = -t.windowBits : t.gzip && 0 < t.windowBits && 16 > t.windowBits && (t.windowBits += 16),
            this.err = 0,
            this.msg = "",
            this.ended = !1,
            this.chunks = [],
            this.strm = new l,
            this.strm.avail_out = 0;
            var n = o.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
            if (0 !== n)
                throw new Error(s[n]);
            if (t.header && o.deflateSetHeader(this.strm, t.header),
            t.dictionary) {
                var a;
                if (a = "string" == typeof t.dictionary ? d.string2buf(t.dictionary) : "[object ArrayBuffer]" === c.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary,
                n = o.deflateSetDictionary(this.strm, a),
                0 !== n)
                    throw new Error(s[n]);
                this._dict_set = !0
            }
        }
        function a(e, t) {
            var n = new r(t);
            if (n.push(e, !0),
            n.err)
                throw n.msg || s[n.err];
            return n.result
        }
        var o = e("./zlib/deflate")
          , i = e("./utils/common")
          , d = e("./utils/strings")
          , s = e("./zlib/messages")
          , l = e("./zlib/zstream")
          , c = Object.prototype.toString
          , u = 4
          , f = 0
          , p = 1
          , h = 2;
        r.prototype.push = function(e, t) {
            var n = this.strm, r = this.options.chunkSize, a, s;
            if (this.ended)
                return !1;
            s = t === ~~t ? t : !0 === t ? u : 0,
            n.input = "string" == typeof e ? d.string2buf(e) : "[object ArrayBuffer]" === c.call(e) ? new Uint8Array(e) : e,
            n.next_in = 0,
            n.avail_in = n.input.length;
            do {
                if (0 === n.avail_out && (n.output = new i.Buf8(r),
                n.next_out = 0,
                n.avail_out = r),
                a = o.deflate(n, s),
                a !== p && a !== f)
                    return this.onEnd(a),
                    this.ended = !0,
                    !1;
                (0 === n.avail_out || 0 === n.avail_in && (s === u || s === h)) && ("string" === this.options.to ? this.onData(d.buf2binstring(i.shrinkBuf(n.output, n.next_out))) : this.onData(i.shrinkBuf(n.output, n.next_out)))
            } while ((0 < n.avail_in || 0 === n.avail_out) && a !== p);return s === u ? (a = o.deflateEnd(this.strm),
            this.onEnd(a),
            this.ended = !0,
            a === f) : s !== h || (this.onEnd(f),
            n.avail_out = 0,
            !0)
        }
        ,
        r.prototype.onData = function(e) {
            this.chunks.push(e)
        }
        ,
        r.prototype.onEnd = function(e) {
            e === f && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)),
            this.chunks = [],
            this.err = e,
            this.msg = this.strm.msg
        }
        ,
        n.Deflate = r,
        n.deflate = a,
        n.deflateRaw = function(e, t) {
            return t = t || {},
            t.raw = !0,
            a(e, t)
        }
        ,
        n.gzip = function(e, t) {
            return t = t || {},
            t.gzip = !0,
            a(e, t)
        }
    }
    , {
        "./utils/common": 118,
        "./utils/strings": 119,
        "./zlib/deflate": 123,
        "./zlib/messages": 128,
        "./zlib/zstream": 130
    }],
    117: [function(e, t, n) {
        'use strict';
        function r(e) {
            if (!(this instanceof r))
                return new r(e);
            this.options = i.assign({
                chunkSize: 16384,
                windowBits: 0,
                to: ""
            }, e || {});
            var t = this.options;
            t.raw && 0 <= t.windowBits && 16 > t.windowBits && (t.windowBits = -t.windowBits,
            0 === t.windowBits && (t.windowBits = -15)),
            0 <= t.windowBits && 16 > t.windowBits && !(e && e.windowBits) && (t.windowBits += 32),
            15 < t.windowBits && 48 > t.windowBits && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
            this.err = 0,
            this.msg = "",
            this.ended = !1,
            this.chunks = [],
            this.strm = new c,
            this.strm.avail_out = 0;
            var n = o.inflateInit2(this.strm, t.windowBits);
            if (n !== s.Z_OK)
                throw new Error(l[n]);
            if (this.header = new u,
            o.inflateGetHeader(this.strm, this.header),
            t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = d.string2buf(t.dictionary) : "[object ArrayBuffer]" === f.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)),
            t.raw && (n = o.inflateSetDictionary(this.strm, t.dictionary),
            n !== s.Z_OK)))
                throw new Error(l[n])
        }
        function a(e, t) {
            var n = new r(t);
            if (n.push(e, !0),
            n.err)
                throw n.msg || l[n.err];
            return n.result
        }
        var o = e("./zlib/inflate")
          , i = e("./utils/common")
          , d = e("./utils/strings")
          , s = e("./zlib/constants")
          , l = e("./zlib/messages")
          , c = e("./zlib/zstream")
          , u = e("./zlib/gzheader")
          , f = Object.prototype.toString;
        r.prototype.push = function(e, t) {
            var n = this.strm, r = this.options.chunkSize, a = this.options.dictionary, l = !1, c, u, p, h, m;
            if (this.ended)
                return !1;
            u = t === ~~t ? t : !0 === t ? s.Z_FINISH : s.Z_NO_FLUSH,
            n.input = "string" == typeof e ? d.binstring2buf(e) : "[object ArrayBuffer]" === f.call(e) ? new Uint8Array(e) : e,
            n.next_in = 0,
            n.avail_in = n.input.length;
            do {
                if (0 === n.avail_out && (n.output = new i.Buf8(r),
                n.next_out = 0,
                n.avail_out = r),
                c = o.inflate(n, s.Z_NO_FLUSH),
                c === s.Z_NEED_DICT && a && (c = o.inflateSetDictionary(this.strm, a)),
                c === s.Z_BUF_ERROR && !0 === l && (c = s.Z_OK,
                l = !1),
                c !== s.Z_STREAM_END && c !== s.Z_OK)
                    return this.onEnd(c),
                    this.ended = !0,
                    !1;
                n.next_out && (0 === n.avail_out || c === s.Z_STREAM_END || 0 === n.avail_in && (u === s.Z_FINISH || u === s.Z_SYNC_FLUSH)) && ("string" === this.options.to ? (p = d.utf8border(n.output, n.next_out),
                h = n.next_out - p,
                m = d.buf2string(n.output, p),
                n.next_out = h,
                n.avail_out = r - h,
                h && i.arraySet(n.output, n.output, p, h, 0),
                this.onData(m)) : this.onData(i.shrinkBuf(n.output, n.next_out))),
                0 === n.avail_in && 0 === n.avail_out && (l = !0)
            } while ((0 < n.avail_in || 0 === n.avail_out) && c !== s.Z_STREAM_END);return c === s.Z_STREAM_END && (u = s.Z_FINISH),
            u === s.Z_FINISH ? (c = o.inflateEnd(this.strm),
            this.onEnd(c),
            this.ended = !0,
            c === s.Z_OK) : u !== s.Z_SYNC_FLUSH || (this.onEnd(s.Z_OK),
            n.avail_out = 0,
            !0)
        }
        ,
        r.prototype.onData = function(e) {
            this.chunks.push(e)
        }
        ,
        r.prototype.onEnd = function(e) {
            e === s.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)),
            this.chunks = [],
            this.err = e,
            this.msg = this.strm.msg
        }
        ,
        n.Inflate = r,
        n.inflate = a,
        n.inflateRaw = function(e, t) {
            return t = t || {},
            t.raw = !0,
            a(e, t)
        }
        ,
        n.ungzip = a
    }
    , {
        "./utils/common": 118,
        "./utils/strings": 119,
        "./zlib/constants": 121,
        "./zlib/gzheader": 124,
        "./zlib/inflate": 126,
        "./zlib/messages": 128,
        "./zlib/zstream": 130
    }],
    118: [function(e, t, n) {
        'use strict';
        function r(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        var a = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        n.assign = function(e) {
            for (var t = Array.prototype.slice.call(arguments, 1); t.length; ) {
                var n = t.shift();
                if (n) {
                    if ("object" != typeof n)
                        throw new TypeError(n + "must be non-object");
                    for (var a in n)
                        r(n, a) && (e[a] = n[a])
                }
            }
            return e
        }
        ,
        n.shrinkBuf = function(e, t) {
            return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t,
            e)
        }
        ;
        var o = {
            arraySet: function(e, t, n, r, a) {
                if (t.subarray && e.subarray)
                    return void e.set(t.subarray(n, n + r), a);
                for (var o = 0; o < r; o++)
                    e[a + o] = t[n + o]
            },
            flattenChunks: function(e) {
                var t, n, r, a, o, d;
                for (r = 0,
                t = 0,
                n = e.length; t < n; t++)
                    r += e[t].length;
                for (d = new Uint8Array(r),
                a = 0,
                (t = 0,
                n = e.length); t < n; t++)
                    o = e[t],
                    d.set(o, a),
                    a += o.length;
                return d
            }
        }
          , i = {
            arraySet: function(e, t, n, r, a) {
                for (var o = 0; o < r; o++)
                    e[a + o] = t[n + o]
            },
            flattenChunks: function(e) {
                return [].concat.apply([], e)
            }
        };
        n.setTyped = function(e) {
            e ? (n.Buf8 = Uint8Array,
            n.Buf16 = Uint16Array,
            n.Buf32 = Int32Array,
            n.assign(n, o)) : (n.Buf8 = Array,
            n.Buf16 = Array,
            n.Buf32 = Array,
            n.assign(n, i))
        }
        ,
        n.setTyped(a)
    }
    , {}],
    119: [function(e, t, n) {
        'use strict';
        var a = String.fromCharCode;
        function r(e, t) {
            if (65534 > t && (e.subarray && s || !e.subarray && d))
                return a.apply(null, o.shrinkBuf(e, t));
            for (var n = "", r = 0; r < t; r++)
                n += a(e[r]);
            return n
        }
        var o = e("./common")
          , d = !0
          , s = !0;
        try {
            a.apply(null, [0])
        } catch (e) {
            d = !1
        }
        try {
            a.apply(null, new Uint8Array(1))
        } catch (e) {
            s = !1
        }
        for (var l = new o.Buf8(256), c = 0; 256 > c; c++)
            l[c] = 252 <= c ? 6 : 248 <= c ? 5 : 240 <= c ? 4 : 224 <= c ? 3 : 192 <= c ? 2 : 1;
        l[254] = l[254] = 1,
        n.string2buf = function(e) {
            var t = e.length, n = 0, r, a, d, s, l;
            for (s = 0; s < t; s++)
                a = e.charCodeAt(s),
                55296 == (64512 & a) && s + 1 < t && (d = e.charCodeAt(s + 1),
                56320 == (64512 & d) && (a = 65536 + (a - 55296 << 10) + (d - 56320),
                s++)),
                n += 128 > a ? 1 : 2048 > a ? 2 : 65536 > a ? 3 : 4;
            for (r = new o.Buf8(n),
            l = 0,
            s = 0; l < n; s++)
                a = e.charCodeAt(s),
                55296 == (64512 & a) && s + 1 < t && (d = e.charCodeAt(s + 1),
                56320 == (64512 & d) && (a = 65536 + (a - 55296 << 10) + (d - 56320),
                s++)),
                128 > a ? r[l++] = a : 2048 > a ? (r[l++] = 192 | a >>> 6,
                r[l++] = 128 | 63 & a) : 65536 > a ? (r[l++] = 224 | a >>> 12,
                r[l++] = 128 | 63 & a >>> 6,
                r[l++] = 128 | 63 & a) : (r[l++] = 240 | a >>> 18,
                r[l++] = 128 | 63 & a >>> 12,
                r[l++] = 128 | 63 & a >>> 6,
                r[l++] = 128 | 63 & a);
            return r
        }
        ,
        n.buf2binstring = function(e) {
            return r(e, e.length)
        }
        ,
        n.binstring2buf = function(e) {
            for (var t = new o.Buf8(e.length), n = 0, r = t.length; n < r; n++)
                t[n] = e.charCodeAt(n);
            return t
        }
        ,
        n.buf2string = function(e, t) {
            var n = t || e.length, a = Array(2 * n), o, d, s, u;
            for (d = 0,
            o = 0; o < n; ) {
                if (s = e[o++],
                128 > s) {
                    a[d++] = s;
                    continue
                }
                if (u = l[s],
                4 < u) {
                    a[d++] = 65533,
                    o += u - 1;
                    continue
                }
                for (s &= 2 === u ? 31 : 3 === u ? 15 : 7; 1 < u && o < n; )
                    s = s << 6 | 63 & e[o++],
                    u--;
                if (1 < u) {
                    a[d++] = 65533;
                    continue
                }
                65536 > s ? a[d++] = s : (s -= 65536,
                a[d++] = 55296 | 1023 & s >> 10,
                a[d++] = 56320 | 1023 & s)
            }
            return r(a, d)
        }
        ,
        n.utf8border = function(e, t) {
            var n;
            for (t = t || e.length,
            t > e.length && (t = e.length),
            n = t - 1; 0 <= n && 128 == (192 & e[n]); )
                n--;
            return 0 > n ? t : 0 === n ? t : n + l[e[n]] > t ? n : t
        }
    }
    , {
        "./common": 118
    }],
    120: [function(e, t) {
        'use strict';
        t.exports = function(e, t, r, a) {
            for (var o = 0 | 65535 & e, i = 0 | 65535 & e >>> 16, d = 0; 0 !== r; ) {
                d = 2e3 < r ? 2e3 : r,
                r -= d;
                do
                    o = 0 | o + t[a++],
                    i = 0 | i + o;
                while (--d);o %= 65521,
                i %= 65521
            }
            return 0 | (o | i << 16)
        }
    }
    , {}],
    121: [function(e, t) {
        'use strict';
        t.exports = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8
        }
    }
    , {}],
    122: [function(e, t) {
        'use strict';
        var n = function() {
            for (var e = [], t = 0, r; 256 > t; t++) {
                r = t;
                for (var a = 0; 8 > a; a++)
                    r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
                e[t] = r
            }
            return e
        }();
        t.exports = function(e, t, r, a) {
            e ^= -1;
            for (var o = a; o < a + r; o++)
                e = e >>> 8 ^ n[255 & (e ^ t[o])];
            return -1 ^ e
        }
    }
    , {}],
    123: [function(e, t, n) {
        'use strict';
        function r(e, t) {
            return e.msg = R[t],
            t
        }
        function a(e) {
            return (e << 1) - (4 < e ? 9 : 0)
        }
        function o(e) {
            for (var t = e.length; 0 <= --t; )
                e[t] = 0
        }
        function i(e) {
            var t = e.state
              , n = t.pending;
            n > e.avail_out && (n = e.avail_out);
            0 === n || (E.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out),
            e.next_out += n,
            t.pending_out += n,
            e.total_out += n,
            e.avail_out -= n,
            t.pending -= n,
            0 === t.pending && (t.pending_out = 0))
        }
        function d(e, t) {
            C._tr_flush_block(e, 0 <= e.block_start ? e.block_start : -1, e.strstart - e.block_start, t),
            e.block_start = e.strstart,
            i(e.strm)
        }
        function l(e, t) {
            e.pending_buf[e.pending++] = t
        }
        function c(e, t) {
            e.pending_buf[e.pending++] = 255 & t >>> 8,
            e.pending_buf[e.pending++] = 255 & t
        }
        function u(e, t, n, r) {
            var a = e.avail_in;
            return (a > r && (a = r),
            0 === a) ? 0 : (e.avail_in -= a,
            E.arraySet(t, e.input, e.next_in, a, n),
            1 === e.state.wrap ? e.adler = I(e.adler, t, a, n) : 2 === e.state.wrap && (e.adler = T(e.adler, t, a, n)),
            e.next_in += a,
            e.total_in += a,
            a)
        }
        function f(e, t) {
            var n = e.max_chain_length, r = e.strstart, a = e.prev_length, o = e.nice_match, i = e.strstart > e.w_size - 262 ? e.strstart - (e.w_size - 262) : 0, d = e.window, s = e.w_mask, l = e.prev, c = e.strstart + 258, u = d[r + a - 1], f = d[r + a], p, h;
            e.prev_length >= e.good_match && (n >>= 2),
            o > e.lookahead && (o = e.lookahead);
            do {
                if (p = t,
                d[p + a] !== f || d[p + a - 1] !== u || d[p] !== d[r] || d[++p] !== d[r + 1])
                    continue;
                r += 2,
                p++;
                do
                    ;
                while (d[++r] === d[++p] && d[++r] === d[++p] && d[++r] === d[++p] && d[++r] === d[++p] && d[++r] === d[++p] && d[++r] === d[++p] && d[++r] === d[++p] && d[++r] === d[++p] && r < c);if (h = 258 - (c - r),
                r = c - 258,
                h > a) {
                    if (e.match_start = t,
                    a = h,
                    h >= o)
                        break;
                    u = d[r + a - 1],
                    f = d[r + a]
                }
            } while ((t = l[t & s]) > i && 0 != --n);return a <= e.lookahead ? a : e.lookahead
        }
        function p(e) {
            var t = e.w_size, r, a, o, i, d;
            do {
                if (i = e.window_size - e.lookahead - e.strstart,
                e.strstart >= t + (t - 262)) {
                    E.arraySet(e.window, e.window, t, t, 0),
                    e.match_start -= t,
                    e.strstart -= t,
                    e.block_start -= t,
                    a = e.hash_size,
                    r = a;
                    do
                        o = e.head[--r],
                        e.head[r] = o >= t ? o - t : 0;
                    while (--a);a = t,
                    r = a;
                    do
                        o = e.prev[--r],
                        e.prev[r] = o >= t ? o - t : 0;
                    while (--a);i += t
                }
                if (0 === e.strm.avail_in)
                    break;
                if (a = u(e.strm, e.window, e.strstart + e.lookahead, i),
                e.lookahead += a,
                3 <= e.lookahead + e.insert)
                    for (d = e.strstart - e.insert,
                    e.ins_h = e.window[d],
                    e.ins_h = (e.ins_h << e.hash_shift ^ e.window[d + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[d + 3 - 1]) & e.hash_mask,
                    e.prev[d & e.w_mask] = e.head[e.ins_h],
                    e.head[e.ins_h] = d,
                    d++,
                    e.insert--,
                    !(3 > e.lookahead + e.insert)); )
                        ;
            } while (262 > e.lookahead && 0 !== e.strm.avail_in)
        }
        function h(e, t) {
            for (var n, r; ; ) {
                if (262 > e.lookahead) {
                    if (p(e),
                    262 > e.lookahead && 0 === t)
                        return 1;
                    if (0 === e.lookahead)
                        break
                }
                if (n = 0,
                3 <= e.lookahead && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask,
                n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
                e.head[e.ins_h] = e.strstart),
                0 !== n && e.strstart - n <= e.w_size - 262 && (e.match_length = f(e, n)),
                !(3 <= e.match_length))
                    r = C._tr_tally(e, 0, e.window[e.strstart]),
                    e.lookahead--,
                    e.strstart++;
                else if (r = C._tr_tally(e, e.strstart - e.match_start, e.match_length - 3),
                e.lookahead -= e.match_length,
                e.match_length <= e.max_lazy_match && 3 <= e.lookahead) {
                    e.match_length--;
                    do
                        e.strstart++,
                        e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask,
                        n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
                        e.head[e.ins_h] = e.strstart;
                    while (0 != --e.match_length);e.strstart++
                } else
                    e.strstart += e.match_length,
                    e.match_length = 0,
                    e.ins_h = e.window[e.strstart],
                    e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
                if (r && (d(e, !1),
                0 === e.strm.avail_out))
                    return 1
            }
            return e.insert = 2 > e.strstart ? e.strstart : 2,
            4 === t ? (d(e, !0),
            0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (d(e, !1),
            0 === e.strm.avail_out) ? 1 : 2
        }
        function m(e, t) {
            for (var n, r, a; ; ) {
                if (262 > e.lookahead) {
                    if (p(e),
                    262 > e.lookahead && 0 === t)
                        return 1;
                    if (0 === e.lookahead)
                        break
                }
                if (n = 0,
                3 <= e.lookahead && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask,
                n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
                e.head[e.ins_h] = e.strstart),
                e.prev_length = e.match_length,
                e.prev_match = e.match_start,
                e.match_length = 2,
                0 !== n && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - 262 && (e.match_length = f(e, n),
                5 >= e.match_length && (1 === e.strategy || 3 === e.match_length && 4096 < e.strstart - e.match_start) && (e.match_length = 2)),
                3 <= e.prev_length && e.match_length <= e.prev_length) {
                    a = e.strstart + e.lookahead - 3,
                    r = C._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - 3),
                    e.lookahead -= e.prev_length - 1,
                    e.prev_length -= 2;
                    do
                        ++e.strstart <= a && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 3 - 1]) & e.hash_mask,
                        n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h],
                        e.head[e.ins_h] = e.strstart);
                    while (0 != --e.prev_length);if (e.match_available = 0,
                    e.match_length = 2,
                    e.strstart++,
                    r && (d(e, !1),
                    0 === e.strm.avail_out))
                        return 1
                } else if (!e.match_available)
                    e.match_available = 1,
                    e.strstart++,
                    e.lookahead--;
                else if (r = C._tr_tally(e, 0, e.window[e.strstart - 1]),
                r && d(e, !1),
                e.strstart++,
                e.lookahead--,
                0 === e.strm.avail_out)
                    return 1
            }
            return e.match_available && (r = C._tr_tally(e, 0, e.window[e.strstart - 1]),
            e.match_available = 0),
            e.insert = 2 > e.strstart ? e.strstart : 2,
            4 === t ? (d(e, !0),
            0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (d(e, !1),
            0 === e.strm.avail_out) ? 1 : 2
        }
        function g(e, t) {
            for (var n = e.window, r, a, o, i; ; ) {
                if (258 >= e.lookahead) {
                    if (p(e),
                    258 >= e.lookahead && 0 === t)
                        return 1;
                    if (0 === e.lookahead)
                        break
                }
                if (e.match_length = 0,
                3 <= e.lookahead && 0 < e.strstart && (o = e.strstart - 1,
                a = n[o],
                a === n[++o] && a === n[++o] && a === n[++o])) {
                    i = e.strstart + 258;
                    do
                        ;
                    while (a === n[++o] && a === n[++o] && a === n[++o] && a === n[++o] && a === n[++o] && a === n[++o] && a === n[++o] && a === n[++o] && o < i);e.match_length = 258 - (i - o),
                    e.match_length > e.lookahead && (e.match_length = e.lookahead)
                }
                if (3 <= e.match_length ? (r = C._tr_tally(e, 1, e.match_length - 3),
                e.lookahead -= e.match_length,
                e.strstart += e.match_length,
                e.match_length = 0) : (r = C._tr_tally(e, 0, e.window[e.strstart]),
                e.lookahead--,
                e.strstart++),
                r && (d(e, !1),
                0 === e.strm.avail_out))
                    return 1
            }
            return e.insert = 0,
            4 === t ? (d(e, !0),
            0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (d(e, !1),
            0 === e.strm.avail_out) ? 1 : 2
        }
        function _(e, t) {
            for (var n; ; ) {
                if (0 === e.lookahead && (p(e),
                0 === e.lookahead)) {
                    if (0 === t)
                        return 1;
                    break
                }
                if (e.match_length = 0,
                n = C._tr_tally(e, 0, e.window[e.strstart]),
                e.lookahead--,
                e.strstart++,
                n && (d(e, !1),
                0 === e.strm.avail_out))
                    return 1
            }
            return e.insert = 0,
            4 === t ? (d(e, !0),
            0 === e.strm.avail_out ? 3 : 4) : e.last_lit && (d(e, !1),
            0 === e.strm.avail_out) ? 1 : 2
        }
        function b(e, t, n, r, a) {
            this.good_length = e,
            this.max_lazy = t,
            this.nice_length = n,
            this.max_chain = r,
            this.func = a
        }
        function y(e) {
            e.window_size = 2 * e.w_size,
            o(e.head),
            e.max_lazy_match = B[e.level].max_lazy,
            e.good_match = B[e.level].good_length,
            e.nice_match = B[e.level].nice_length,
            e.max_chain_length = B[e.level].max_chain,
            e.strstart = 0,
            e.block_start = 0,
            e.lookahead = 0,
            e.insert = 0,
            e.match_length = e.prev_length = 2,
            e.match_available = 0,
            e.ins_h = 0
        }
        function w() {
            this.strm = null,
            this.status = 0,
            this.pending_buf = null,
            this.pending_buf_size = 0,
            this.pending_out = 0,
            this.pending = 0,
            this.wrap = 0,
            this.gzhead = null,
            this.gzindex = 0,
            this.method = 8,
            this.last_flush = -1,
            this.w_size = 0,
            this.w_bits = 0,
            this.w_mask = 0,
            this.window = null,
            this.window_size = 0,
            this.prev = null,
            this.head = null,
            this.ins_h = 0,
            this.hash_size = 0,
            this.hash_bits = 0,
            this.hash_mask = 0,
            this.hash_shift = 0,
            this.block_start = 0,
            this.match_length = 0,
            this.prev_match = 0,
            this.match_available = 0,
            this.strstart = 0,
            this.match_start = 0,
            this.lookahead = 0,
            this.prev_length = 0,
            this.max_chain_length = 0,
            this.max_lazy_match = 0,
            this.level = 0,
            this.strategy = 0,
            this.good_match = 0,
            this.nice_match = 0,
            this.dyn_ltree = new E.Buf16(1146),
            this.dyn_dtree = new E.Buf16(122),
            this.bl_tree = new E.Buf16(78),
            o(this.dyn_ltree),
            o(this.dyn_dtree),
            o(this.bl_tree),
            this.l_desc = null,
            this.d_desc = null,
            this.bl_desc = null,
            this.bl_count = new E.Buf16(16),
            this.heap = new E.Buf16(573),
            o(this.heap),
            this.heap_len = 0,
            this.heap_max = 0,
            this.depth = new E.Buf16(573),
            o(this.depth),
            this.l_buf = 0,
            this.lit_bufsize = 0,
            this.last_lit = 0,
            this.d_buf = 0,
            this.opt_len = 0,
            this.static_len = 0,
            this.matches = 0,
            this.insert = 0,
            this.bi_buf = 0,
            this.bi_valid = 0
        }
        function k(e) {
            var t;
            return e && e.state ? (e.total_in = e.total_out = 0,
            e.data_type = 2,
            t = e.state,
            t.pending = 0,
            t.pending_out = 0,
            0 > t.wrap && (t.wrap = -t.wrap),
            t.status = t.wrap ? 42 : 113,
            e.adler = 2 === t.wrap ? 0 : 1,
            t.last_flush = 0,
            C._tr_init(t),
            0) : r(e, -2)
        }
        function x(e) {
            var t = k(e);
            return 0 === t && y(e.state),
            t
        }
        function v(e, t, n, a, o, i) {
            if (!e)
                return -2;
            var d = 1;
            if (-1 === t && (t = 6),
            0 > a ? (d = 0,
            a = -a) : 15 < a && (d = 2,
            a -= 16),
            1 > o || 9 < o || 8 !== n || 8 > a || 15 < a || 0 > t || 9 < t || 0 > i || 4 < i)
                return r(e, -2);
            8 === a && (a = 9);
            var l = new w;
            return e.state = l,
            l.strm = e,
            l.wrap = d,
            l.gzhead = null,
            l.w_bits = a,
            l.w_size = 1 << l.w_bits,
            l.w_mask = l.w_size - 1,
            l.hash_bits = o + 7,
            l.hash_size = 1 << l.hash_bits,
            l.hash_mask = l.hash_size - 1,
            l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3),
            l.window = new E.Buf8(2 * l.w_size),
            l.head = new E.Buf16(l.hash_size),
            l.prev = new E.Buf16(l.w_size),
            l.lit_bufsize = 1 << o + 6,
            l.pending_buf_size = 4 * l.lit_bufsize,
            l.pending_buf = new E.Buf8(l.pending_buf_size),
            l.d_buf = 1 * l.lit_bufsize,
            l.l_buf = 3 * l.lit_bufsize,
            l.level = t,
            l.strategy = i,
            l.method = n,
            x(e)
        }
        function S(e, t) {
            var n, d, u, f;
            if (!e || !e.state || 5 < t || 0 > t)
                return e ? r(e, -2) : -2;
            if (d = e.state,
            !e.output || !e.input && 0 !== e.avail_in || 666 === d.status && 4 !== t)
                return r(e, 0 === e.avail_out ? -5 : -2);
            if (d.strm = e,
            n = d.last_flush,
            d.last_flush = t,
            42 === d.status)
                if (2 === d.wrap)
                    e.adler = 0,
                    l(d, 31),
                    l(d, 139),
                    l(d, 8),
                    d.gzhead ? (l(d, (d.gzhead.text ? 1 : 0) + (d.gzhead.hcrc ? 2 : 0) + (d.gzhead.extra ? 4 : 0) + (d.gzhead.name ? 8 : 0) + (d.gzhead.comment ? 16 : 0)),
                    l(d, 255 & d.gzhead.time),
                    l(d, 255 & d.gzhead.time >> 8),
                    l(d, 255 & d.gzhead.time >> 16),
                    l(d, 255 & d.gzhead.time >> 24),
                    l(d, 9 === d.level ? 2 : 2 <= d.strategy || 2 > d.level ? 4 : 0),
                    l(d, 255 & d.gzhead.os),
                    d.gzhead.extra && d.gzhead.extra.length && (l(d, 255 & d.gzhead.extra.length),
                    l(d, 255 & d.gzhead.extra.length >> 8)),
                    d.gzhead.hcrc && (e.adler = T(e.adler, d.pending_buf, d.pending, 0)),
                    d.gzindex = 0,
                    d.status = 69) : (l(d, 0),
                    l(d, 0),
                    l(d, 0),
                    l(d, 0),
                    l(d, 0),
                    l(d, 9 === d.level ? 2 : 2 <= d.strategy || 2 > d.level ? 4 : 0),
                    l(d, 3),
                    d.status = 113);
                else {
                    var p = 8 + (d.w_bits - 8 << 4) << 8
                      , h = -1;
                    h = 2 <= d.strategy || 2 > d.level ? 0 : 6 > d.level ? 1 : 6 === d.level ? 2 : 3,
                    p |= h << 6,
                    0 !== d.strstart && (p |= 32),
                    p += 31 - p % 31,
                    d.status = 113,
                    c(d, p),
                    0 !== d.strstart && (c(d, e.adler >>> 16),
                    c(d, 65535 & e.adler)),
                    e.adler = 1
                }
            if (69 === d.status)
                if (d.gzhead.extra) {
                    for (u = d.pending; d.gzindex < (65535 & d.gzhead.extra.length) && !(d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)),
                    i(e),
                    u = d.pending,
                    d.pending === d.pending_buf_size)); )
                        l(d, 255 & d.gzhead.extra[d.gzindex]),
                        d.gzindex++;
                    d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)),
                    d.gzindex === d.gzhead.extra.length && (d.gzindex = 0,
                    d.status = 73)
                } else
                    d.status = 73;
            if (73 === d.status)
                if (d.gzhead.name) {
                    u = d.pending;
                    do {
                        if (d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)),
                        i(e),
                        u = d.pending,
                        d.pending === d.pending_buf_size)) {
                            f = 1;
                            break
                        }
                        f = d.gzindex < d.gzhead.name.length ? 255 & d.gzhead.name.charCodeAt(d.gzindex++) : 0,
                        l(d, f)
                    } while (0 !== f);d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)),
                    0 === f && (d.gzindex = 0,
                    d.status = 91)
                } else
                    d.status = 91;
            if (91 === d.status)
                if (d.gzhead.comment) {
                    u = d.pending;
                    do {
                        if (d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)),
                        i(e),
                        u = d.pending,
                        d.pending === d.pending_buf_size)) {
                            f = 1;
                            break
                        }
                        f = d.gzindex < d.gzhead.comment.length ? 255 & d.gzhead.comment.charCodeAt(d.gzindex++) : 0,
                        l(d, f)
                    } while (0 !== f);d.gzhead.hcrc && d.pending > u && (e.adler = T(e.adler, d.pending_buf, d.pending - u, u)),
                    0 === f && (d.status = 103)
                } else
                    d.status = 103;
            if (103 === d.status && (d.gzhead.hcrc ? (d.pending + 2 > d.pending_buf_size && i(e),
            d.pending + 2 <= d.pending_buf_size && (l(d, 255 & e.adler),
            l(d, 255 & e.adler >> 8),
            e.adler = 0,
            d.status = 113)) : d.status = 113),
            0 !== d.pending) {
                if (i(e),
                0 === e.avail_out)
                    return d.last_flush = -1,
                    0;
            } else if (0 === e.avail_in && a(t) <= a(n) && 4 !== t)
                return r(e, -5);
            if (666 === d.status && 0 !== e.avail_in)
                return r(e, -5);
            if (0 !== e.avail_in || 0 !== d.lookahead || 0 !== t && 666 !== d.status) {
                var m = 2 === d.strategy ? _(d, t) : 3 === d.strategy ? g(d, t) : B[d.level].func(d, t);
                if ((3 === m || 4 === m) && (d.status = 666),
                1 === m || 3 === m)
                    return 0 === e.avail_out && (d.last_flush = -1),
                    0;
                if (2 === m && (1 === t ? C._tr_align(d) : 5 !== t && (C._tr_stored_block(d, 0, 0, !1),
                3 === t && (o(d.head),
                0 === d.lookahead && (d.strstart = 0,
                d.block_start = 0,
                d.insert = 0))),
                i(e),
                0 === e.avail_out))
                    return d.last_flush = -1,
                    0
            }
            return 4 === t ? 0 >= d.wrap ? 1 : (2 === d.wrap ? (l(d, 255 & e.adler),
            l(d, 255 & e.adler >> 8),
            l(d, 255 & e.adler >> 16),
            l(d, 255 & e.adler >> 24),
            l(d, 255 & e.total_in),
            l(d, 255 & e.total_in >> 8),
            l(d, 255 & e.total_in >> 16),
            l(d, 255 & e.total_in >> 24)) : (c(d, e.adler >>> 16),
            c(d, 65535 & e.adler)),
            i(e),
            0 < d.wrap && (d.wrap = -d.wrap),
            0 === d.pending ? 1 : 0) : 0
        }
        var E = e("../utils/common"), C = e("./trees"), I = e("./adler32"), T = e("./crc32"), R = e("./messages"), B;
        B = [new b(0,0,0,0,function(e, t) {
            var n = 65535;
            for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5); ; ) {
                if (1 >= e.lookahead) {
                    if (p(e),
                    0 === e.lookahead && 0 === t)
                        return 1;
                    if (0 === e.lookahead)
                        break
                }
                e.strstart += e.lookahead,
                e.lookahead = 0;
                var r = e.block_start + n;
                if ((0 === e.strstart || e.strstart >= r) && (e.lookahead = e.strstart - r,
                e.strstart = r,
                d(e, !1),
                0 === e.strm.avail_out))
                    return 1;
                if (e.strstart - e.block_start >= e.w_size - 262 && (d(e, !1),
                0 === e.strm.avail_out))
                    return 1
            }
            return e.insert = 0,
            4 === t ? (d(e, !0),
            0 === e.strm.avail_out ? 3 : 4) : e.strstart > e.block_start && (d(e, !1),
            0 === e.strm.avail_out) ? 1 : 1
        }
        ), new b(4,4,8,4,h), new b(4,5,16,8,h), new b(4,6,32,32,h), new b(4,4,16,16,m), new b(8,16,32,32,m), new b(8,16,128,128,m), new b(8,32,128,256,m), new b(32,128,258,1024,m), new b(32,258,258,4096,m)],
        n.deflateInit = function(e, t) {
            return v(e, t, 8, 15, 8, 0)
        }
        ,
        n.deflateInit2 = v,
        n.deflateReset = x,
        n.deflateResetKeep = k,
        n.deflateSetHeader = function(e, t) {
            return e && e.state ? 2 === e.state.wrap ? (e.state.gzhead = t,
            0) : -2 : -2
        }
        ,
        n.deflate = S,
        n.deflateEnd = function(e) {
            var t;
            return e && e.state ? (t = e.state.status,
            42 !== t && 69 !== t && 73 !== t && 91 !== t && 103 !== t && 113 !== t && 666 !== t) ? r(e, -2) : (e.state = null,
            113 === t ? r(e, -3) : 0) : -2
        }
        ,
        n.deflateSetDictionary = function(e, t) {
            var r = t.length, a, i, d, l, c, u, f, h;
            if (!e || !e.state)
                return -2;
            if (a = e.state,
            l = a.wrap,
            2 === l || 1 === l && 42 !== a.status || a.lookahead)
                return -2;
            for (1 === l && (e.adler = I(e.adler, t, r, 0)),
            a.wrap = 0,
            r >= a.w_size && (0 === l && (o(a.head),
            a.strstart = 0,
            a.block_start = 0,
            a.insert = 0),
            h = new E.Buf8(a.w_size),
            E.arraySet(h, t, r - a.w_size, a.w_size, 0),
            t = h,
            r = a.w_size),
            c = e.avail_in,
            u = e.next_in,
            f = e.input,
            e.avail_in = r,
            e.next_in = 0,
            e.input = t,
            p(a); 3 <= a.lookahead; ) {
                i = a.strstart,
                d = a.lookahead - 2;
                do
                    a.ins_h = (a.ins_h << a.hash_shift ^ a.window[i + 3 - 1]) & a.hash_mask,
                    a.prev[i & a.w_mask] = a.head[a.ins_h],
                    a.head[a.ins_h] = i,
                    i++;
                while (--d);a.strstart = i,
                a.lookahead = 2,
                p(a)
            }
            return a.strstart += a.lookahead,
            a.block_start = a.strstart,
            a.insert = a.lookahead,
            a.lookahead = 0,
            a.match_length = a.prev_length = 2,
            a.match_available = 0,
            e.next_in = u,
            e.input = f,
            e.avail_in = c,
            a.wrap = l,
            0
        }
        ,
        n.deflateInfo = "pako deflate (from Nodeca project)"
    }
    , {
        "../utils/common": 118,
        "./adler32": 120,
        "./crc32": 122,
        "./messages": 128,
        "./trees": 129
    }],
    124: [function(e, t) {
        'use strict';
        t.exports = function() {
            this.text = 0,
            this.time = 0,
            this.xflags = 0,
            this.os = 0,
            this.extra = null,
            this.extra_len = 0,
            this.name = "",
            this.comment = "",
            this.hcrc = 0,
            this.done = !1
        }
    }
    , {}],
    125: [function(e, t) {
        'use strict';
        t.exports = function(e, t) {
            var n, r, a, o, i, d, s, l, c, u, f, p, h, m, g, _, b, y, w, k, x, v, S, E, C;
            n = e.state,
            r = e.next_in,
            E = e.input,
            a = r + (e.avail_in - 5),
            o = e.next_out,
            C = e.output,
            i = o - (t - e.avail_out),
            d = o + (e.avail_out - 257),
            s = n.dmax,
            l = n.wsize,
            c = n.whave,
            u = n.wnext,
            f = n.window,
            p = n.hold,
            h = n.bits,
            m = n.lencode,
            g = n.distcode,
            _ = (1 << n.lenbits) - 1,
            b = (1 << n.distbits) - 1;
            top: do {
                15 > h && (p += E[r++] << h,
                h += 8,
                p += E[r++] << h,
                h += 8),
                y = m[p & _];
                dolen: for (; ; ) {
                    if (w = y >>> 24,
                    p >>>= w,
                    h -= w,
                    w = 255 & y >>> 16,
                    0 === w)
                        C[o++] = 65535 & y;
                    else if (16 & w) {
                        k = 65535 & y,
                        w &= 15,
                        w && (h < w && (p += E[r++] << h,
                        h += 8),
                        k += p & (1 << w) - 1,
                        p >>>= w,
                        h -= w),
                        15 > h && (p += E[r++] << h,
                        h += 8,
                        p += E[r++] << h,
                        h += 8),
                        y = g[p & b];
                        dodist: for (; ; ) {
                            if (w = y >>> 24,
                            p >>>= w,
                            h -= w,
                            w = 255 & y >>> 16,
                            16 & w) {
                                if (x = 65535 & y,
                                w &= 15,
                                h < w && (p += E[r++] << h,
                                h += 8,
                                h < w && (p += E[r++] << h,
                                h += 8)),
                                x += p & (1 << w) - 1,
                                x > s) {
                                    e.msg = "invalid distance too far back",
                                    n.mode = 30;
                                    break top
                                }
                                if (p >>>= w,
                                h -= w,
                                w = o - i,
                                x > w) {
                                    if (w = x - w,
                                    w > c && n.sane) {
                                        e.msg = "invalid distance too far back",
                                        n.mode = 30;
                                        break top
                                    }
                                    if (v = 0,
                                    S = f,
                                    0 === u) {
                                        if (v += l - w,
                                        w < k) {
                                            k -= w;
                                            do
                                                C[o++] = f[v++];
                                            while (--w);v = o - x,
                                            S = C
                                        }
                                    } else if (u < w) {
                                        if (v += l + u - w,
                                        w -= u,
                                        w < k) {
                                            k -= w;
                                            do
                                                C[o++] = f[v++];
                                            while (--w);if (v = 0,
                                            u < k) {
                                                w = u,
                                                k -= w;
                                                do
                                                    C[o++] = f[v++];
                                                while (--w);v = o - x,
                                                S = C
                                            }
                                        }
                                    } else if (v += u - w,
                                    w < k) {
                                        k -= w;
                                        do
                                            C[o++] = f[v++];
                                        while (--w);v = o - x,
                                        S = C
                                    }
                                    for (; 2 < k; )
                                        C[o++] = S[v++],
                                        C[o++] = S[v++],
                                        C[o++] = S[v++],
                                        k -= 3;
                                    k && (C[o++] = S[v++],
                                    1 < k && (C[o++] = S[v++]))
                                } else {
                                    v = o - x;
                                    do
                                        C[o++] = C[v++],
                                        C[o++] = C[v++],
                                        C[o++] = C[v++],
                                        k -= 3;
                                    while (2 < k);k && (C[o++] = C[v++],
                                    1 < k && (C[o++] = C[v++]))
                                }
                            } else if (0 == (64 & w)) {
                                y = g[(65535 & y) + (p & (1 << w) - 1)];
                                continue dodist
                            } else {
                                e.msg = "invalid distance code",
                                n.mode = 30;
                                break top
                            }
                            break
                        }
                    } else if (0 == (64 & w)) {
                        y = m[(65535 & y) + (p & (1 << w) - 1)];
                        continue dolen
                    } else if (32 & w) {
                        n.mode = 12;
                        break top
                    } else {
                        e.msg = "invalid literal/length code",
                        n.mode = 30;
                        break top
                    }
                    break
                }
            } while (r < a && o < d);return k = h >> 3,
            r -= k,
            h -= k << 3,
            p &= (1 << h) - 1,
            e.next_in = r,
            e.next_out = o,
            e.avail_in = r < a ? 5 + (a - r) : 5 - (r - a),
            e.avail_out = o < d ? 257 + (d - o) : 257 - (o - d),
            n.hold = p,
            void (n.bits = h)
        }
    }
    , {}],
    126: [function(e, t, n) {
        'use strict';
        var u = String.fromCharCode;
        function r(e) {
            return (255 & e >>> 24) + (65280 & e >>> 8) + ((65280 & e) << 8) + ((255 & e) << 24)
        }
        function a() {
            this.mode = 0,
            this.last = !1,
            this.wrap = 0,
            this.havedict = !1,
            this.flags = 0,
            this.dmax = 0,
            this.check = 0,
            this.total = 0,
            this.head = null,
            this.wbits = 0,
            this.wsize = 0,
            this.whave = 0,
            this.wnext = 0,
            this.window = null,
            this.hold = 0,
            this.bits = 0,
            this.length = 0,
            this.offset = 0,
            this.extra = 0,
            this.lencode = null,
            this.distcode = null,
            this.lenbits = 0,
            this.distbits = 0,
            this.ncode = 0,
            this.nlen = 0,
            this.ndist = 0,
            this.have = 0,
            this.next = null,
            this.lens = new f.Buf16(320),
            this.work = new f.Buf16(288),
            this.lendyn = null,
            this.distdyn = null,
            this.sane = 0,
            this.back = 0,
            this.was = 0
        }
        function o(e) {
            var t;
            return e && e.state ? (t = e.state,
            e.total_in = e.total_out = t.total = 0,
            e.msg = "",
            t.wrap && (e.adler = 1 & t.wrap),
            t.mode = 1,
            t.last = 0,
            t.havedict = 0,
            t.dmax = 32768,
            t.head = null,
            t.hold = 0,
            t.bits = 0,
            t.lencode = t.lendyn = new f.Buf32(852),
            t.distcode = t.distdyn = new f.Buf32(592),
            t.sane = 1,
            t.back = -1,
            0) : -2
        }
        function i(e) {
            var t;
            return e && e.state ? (t = e.state,
            t.wsize = 0,
            t.whave = 0,
            t.wnext = 0,
            o(e)) : -2
        }
        function d(e, t) {
            var n, r;
            return e && e.state ? (r = e.state,
            0 > t ? (n = 0,
            t = -t) : (n = (t >> 4) + 1,
            48 > t && (t &= 15)),
            t && (8 > t || 15 < t)) ? -2 : (null !== r.window && r.wbits !== t && (r.window = null),
            r.wrap = n,
            r.wbits = t,
            i(e)) : -2
        }
        function s(e, t) {
            var n, r;
            return e ? (r = new a,
            e.state = r,
            r.window = null,
            n = d(e, t),
            0 !== n && (e.state = null),
            n) : -2
        }
        function l(e) {
            if (_) {
                var t;
                for (b = new f.Buf32(512),
                y = new f.Buf32(32),
                t = 0; 144 > t; )
                    e.lens[t++] = 8;
                for (; 256 > t; )
                    e.lens[t++] = 9;
                for (; 280 > t; )
                    e.lens[t++] = 7;
                for (; 288 > t; )
                    e.lens[t++] = 8;
                for (g(1, e.lens, 0, 288, b, 0, e.work, {
                    bits: 9
                }),
                t = 0; 32 > t; )
                    e.lens[t++] = 5;
                g(2, e.lens, 0, 32, y, 0, e.work, {
                    bits: 5
                }),
                _ = !1
            }
            e.lencode = b,
            e.lenbits = 9,
            e.distcode = y,
            e.distbits = 5
        }
        function c(e, t, n, r) {
            var a = e.state, o;
            return null === a.window && (a.wsize = 1 << a.wbits,
            a.wnext = 0,
            a.whave = 0,
            a.window = new f.Buf8(a.wsize)),
            r >= a.wsize ? (f.arraySet(a.window, t, n - a.wsize, a.wsize, 0),
            a.wnext = 0,
            a.whave = a.wsize) : (o = a.wsize - a.wnext,
            o > r && (o = r),
            f.arraySet(a.window, t, n - r, o, a.wnext),
            r -= o,
            r ? (f.arraySet(a.window, t, n - r, r, 0),
            a.wnext = r,
            a.whave = a.wsize) : (a.wnext += o,
            a.wnext === a.wsize && (a.wnext = 0),
            a.whave < a.wsize && (a.whave += o))),
            0
        }
        var f = e("../utils/common"), p = e("./adler32"), h = e("./crc32"), m = e("./inffast"), g = e("./inftrees"), _ = !0, b, y;
        n.inflateReset = i,
        n.inflateReset2 = d,
        n.inflateResetKeep = o,
        n.inflateInit = function(e) {
            return s(e, 15)
        }
        ,
        n.inflateInit2 = s,
        n.inflate = function(e, t) {
            var a = 0, o = new f.Buf8(4), i = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], d, s, _, b, y, w, k, x, v, S, E, C, I, T, R, B, L, A, P, O, U, D, M, j;
            if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in)
                return -2;
            d = e.state,
            12 === d.mode && (d.mode = 13),
            y = e.next_out,
            _ = e.output,
            k = e.avail_out,
            b = e.next_in,
            s = e.input,
            w = e.avail_in,
            x = d.hold,
            v = d.bits,
            S = w,
            E = k,
            D = 0;
            inf_leave: for (; ; )
                switch (d.mode) {
                case 1:
                    if (0 === d.wrap) {
                        d.mode = 13;
                        break
                    }
                    for (; 16 > v; ) {
                        if (0 === w)
                            break inf_leave;
                        w--,
                        x += s[b++] << v,
                        v += 8
                    }
                    if (2 & d.wrap && 35615 === x) {
                        d.check = 0,
                        o[0] = 255 & x,
                        o[1] = 255 & x >>> 8,
                        d.check = h(d.check, o, 2, 0),
                        x = 0,
                        v = 0,
                        d.mode = 2;
                        break
                    }
                    if (d.flags = 0,
                    d.head && (d.head.done = !1),
                    !(1 & d.wrap) || (((255 & x) << 8) + (x >> 8)) % 31) {
                        e.msg = "incorrect header check",
                        d.mode = 30;
                        break
                    }
                    if (8 !== (15 & x)) {
                        e.msg = "unknown compression method",
                        d.mode = 30;
                        break
                    }
                    if (x >>>= 4,
                    v -= 4,
                    U = (15 & x) + 8,
                    0 === d.wbits)
                        d.wbits = U;
                    else if (U > d.wbits) {
                        e.msg = "invalid window size",
                        d.mode = 30;
                        break
                    }
                    d.dmax = 1 << U,
                    e.adler = d.check = 1,
                    d.mode = 512 & x ? 10 : 12,
                    x = 0,
                    v = 0;
                    break;
                case 2:
                    for (; 16 > v; ) {
                        if (0 === w)
                            break inf_leave;
                        w--,
                        x += s[b++] << v,
                        v += 8
                    }
                    if (d.flags = x,
                    8 !== (255 & d.flags)) {
                        e.msg = "unknown compression method",
                        d.mode = 30;
                        break
                    }
                    if (57344 & d.flags) {
                        e.msg = "unknown header flags set",
                        d.mode = 30;
                        break
                    }
                    d.head && (d.head.text = 1 & x >> 8),
                    512 & d.flags && (o[0] = 255 & x,
                    o[1] = 255 & x >>> 8,
                    d.check = h(d.check, o, 2, 0)),
                    x = 0,
                    v = 0,
                    d.mode = 3;
                case 3:
                    for (; 32 > v; ) {
                        if (0 === w)
                            break inf_leave;
                        w--,
                        x += s[b++] << v,
                        v += 8
                    }
                    d.head && (d.head.time = x),
                    512 & d.flags && (o[0] = 255 & x,
                    o[1] = 255 & x >>> 8,
                    o[2] = 255 & x >>> 16,
                    o[3] = 255 & x >>> 24,
                    d.check = h(d.check, o, 4, 0)),
                    x = 0,
                    v = 0,
                    d.mode = 4;
                case 4:
                    for (; 16 > v; ) {
                        if (0 === w)
                            break inf_leave;
                        w--,
                        x += s[b++] << v,
                        v += 8
                    }
                    d.head && (d.head.xflags = 255 & x,
                    d.head.os = x >> 8),
                    512 & d.flags && (o[0] = 255 & x,
                    o[1] = 255 & x >>> 8,
                    d.check = h(d.check, o, 2, 0)),
                    x = 0,
                    v = 0,
                    d.mode = 5;
                case 5:
                    if (1024 & d.flags) {
                        for (; 16 > v; ) {
                            if (0 === w)
                                break inf_leave;
                            w--,
                            x += s[b++] << v,
                            v += 8
                        }
                        d.length = x,
                        d.head && (d.head.extra_len = x),
                        512 & d.flags && (o[0] = 255 & x,
                        o[1] = 255 & x >>> 8,
                        d.check = h(d.check, o, 2, 0)),
                        x = 0,
                        v = 0
                    } else
                        d.head && (d.head.extra = null);
                    d.mode = 6;
                case 6:
                    if (1024 & d.flags && (C = d.length,
                    C > w && (C = w),
                    C && (d.head && (U = d.head.extra_len - d.length,
                    !d.head.extra && (d.head.extra = Array(d.head.extra_len)),
                    f.arraySet(d.head.extra, s, b, C, U)),
                    512 & d.flags && (d.check = h(d.check, s, C, b)),
                    w -= C,
                    b += C,
                    d.length -= C),
                    d.length))
                        break inf_leave;
                    d.length = 0,
                    d.mode = 7;
                case 7:
                    if (2048 & d.flags) {
                        if (0 === w)
                            break inf_leave;
                        C = 0;
                        do
                            U = s[b + C++],
                            d.head && U && 65536 > d.length && (d.head.name += u(U));
                        while (U && C < w);if (512 & d.flags && (d.check = h(d.check, s, C, b)),
                        w -= C,
                        b += C,
                        U)
                            break inf_leave
                    } else
                        d.head && (d.head.name = null);
                    d.length = 0,
                    d.mode = 8;
                case 8:
                    if (4096 & d.flags) {
                        if (0 === w)
                            break inf_leave;
                        C = 0;
                        do
                            U = s[b + C++],
                            d.head && U && 65536 > d.length && (d.head.comment += u(U));
                        while (U && C < w);if (512 & d.flags && (d.check = h(d.check, s, C, b)),
                        w -= C,
                        b += C,
                        U)
                            break inf_leave
                    } else
                        d.head && (d.head.comment = null);
                    d.mode = 9;
                case 9:
                    if (512 & d.flags) {
                        for (; 16 > v; ) {
                            if (0 === w)
                                break inf_leave;
                            w--,
                            x += s[b++] << v,
                            v += 8
                        }
                        if (x !== (65535 & d.check)) {
                            e.msg = "header crc mismatch",
                            d.mode = 30;
                            break
                        }
                        x = 0,
                        v = 0
                    }
                    d.head && (d.head.hcrc = 1 & d.flags >> 9,
                    d.head.done = !0),
                    e.adler = d.check = 0,
                    d.mode = 12;
                    break;
                case 10:
                    for (; 32 > v; ) {
                        if (0 === w)
                            break inf_leave;
                        w--,
                        x += s[b++] << v,
                        v += 8
                    }
                    e.adler = d.check = r(x),
                    x = 0,
                    v = 0,
                    d.mode = 11;
                case 11:
                    if (0 === d.havedict)
                        return e.next_out = y,
                        e.avail_out = k,
                        e.next_in = b,
                        e.avail_in = w,
                        d.hold = x,
                        d.bits = v,
                        2;
                    e.adler = d.check = 1,
                    d.mode = 12;
                case 12:
                    if (5 === t || 6 === t)
                        break inf_leave;
                case 13:
                    if (d.last) {
                        x >>>= 7 & v,
                        v -= 7 & v,
                        d.mode = 27;
                        break
                    }
                    for (; 3 > v; ) {
                        if (0 === w)
                            break inf_leave;
                        w--,
                        x += s[b++] << v,
                        v += 8
                    }
                    switch (d.last = 1 & x,
                    x >>>= 1,
                    v -= 1,
                    3 & x) {
                    case 0:
                        d.mode = 14;
                        break;
                    case 1:
                        if (l(d),
                        d.mode = 20,
                        6 === t) {
                            x >>>= 2,
                            v -= 2;
                            break inf_leave
                        }
                        break;
                    case 2:
                        d.mode = 17;
                        break;
                    case 3:
                        e.msg = "invalid block type",
                        d.mode = 30;
                    }
                    x >>>= 2,
                    v -= 2;
                    break;
                case 14:
                    for (x >>>= 7 & v,
                    v -= 7 & v; 32 > v; ) {
                        if (0 === w)
                            break inf_leave;
                        w--,
                        x += s[b++] << v,
                        v += 8
                    }
                    if ((65535 & x) != (65535 ^ x >>> 16)) {
                        e.msg = "invalid stored block lengths",
                        d.mode = 30;
                        break
                    }
                    if (d.length = 65535 & x,
                    x = 0,
                    v = 0,
                    d.mode = 15,
                    6 === t)
                        break inf_leave;
                case 15:
                    d.mode = 16;
                case 16:
                    if (C = d.length,
                    C) {
                        if (C > w && (C = w),
                        C > k && (C = k),
                        0 === C)
                            break inf_leave;
                        f.arraySet(_, s, b, C, y),
                        w -= C,
                        b += C,
                        k -= C,
                        y += C,
                        d.length -= C;
                        break
                    }
                    d.mode = 12;
                    break;
                case 17:
                    for (; 14 > v; ) {
                        if (0 === w)
                            break inf_leave;
                        w--,
                        x += s[b++] << v,
                        v += 8
                    }
                    if (d.nlen = (31 & x) + 257,
                    x >>>= 5,
                    v -= 5,
                    d.ndist = (31 & x) + 1,
                    x >>>= 5,
                    v -= 5,
                    d.ncode = (15 & x) + 4,
                    x >>>= 4,
                    v -= 4,
                    286 < d.nlen || 30 < d.ndist) {
                        e.msg = "too many length or distance symbols",
                        d.mode = 30;
                        break
                    }
                    d.have = 0,
                    d.mode = 18;
                case 18:
                    for (; d.have < d.ncode; ) {
                        for (; 3 > v; ) {
                            if (0 === w)
                                break inf_leave;
                            w--,
                            x += s[b++] << v,
                            v += 8
                        }
                        d.lens[i[d.have++]] = 7 & x,
                        x >>>= 3,
                        v -= 3
                    }
                    for (; 19 > d.have; )
                        d.lens[i[d.have++]] = 0;
                    if (d.lencode = d.lendyn,
                    d.lenbits = 7,
                    M = {
                        bits: d.lenbits
                    },
                    D = g(0, d.lens, 0, 19, d.lencode, 0, d.work, M),
                    d.lenbits = M.bits,
                    D) {
                        e.msg = "invalid code lengths set",
                        d.mode = 30;
                        break
                    }
                    d.have = 0,
                    d.mode = 19;
                case 19:
                    for (; d.have < d.nlen + d.ndist; ) {
                        for (; ; ) {
                            if (a = d.lencode[x & (1 << d.lenbits) - 1],
                            R = a >>> 24,
                            B = 255 & a >>> 16,
                            L = 65535 & a,
                            R <= v)
                                break;
                            if (0 === w)
                                break inf_leave;
                            w--,
                            x += s[b++] << v,
                            v += 8
                        }
                        if (16 > L)
                            x >>>= R,
                            v -= R,
                            d.lens[d.have++] = L;
                        else {
                            if (16 === L) {
                                for (j = R + 2; v < j; ) {
                                    if (0 === w)
                                        break inf_leave;
                                    w--,
                                    x += s[b++] << v,
                                    v += 8
                                }
                                if (x >>>= R,
                                v -= R,
                                0 === d.have) {
                                    e.msg = "invalid bit length repeat",
                                    d.mode = 30;
                                    break
                                }
                                U = d.lens[d.have - 1],
                                C = 3 + (3 & x),
                                x >>>= 2,
                                v -= 2
                            } else if (17 === L) {
                                for (j = R + 3; v < j; ) {
                                    if (0 === w)
                                        break inf_leave;
                                    w--,
                                    x += s[b++] << v,
                                    v += 8
                                }
                                x >>>= R,
                                v -= R,
                                U = 0,
                                C = 3 + (7 & x),
                                x >>>= 3,
                                v -= 3
                            } else {
                                for (j = R + 7; v < j; ) {
                                    if (0 === w)
                                        break inf_leave;
                                    w--,
                                    x += s[b++] << v,
                                    v += 8
                                }
                                x >>>= R,
                                v -= R,
                                U = 0,
                                C = 11 + (127 & x),
                                x >>>= 7,
                                v -= 7
                            }
                            if (d.have + C > d.nlen + d.ndist) {
                                e.msg = "invalid bit length repeat",
                                d.mode = 30;
                                break
                            }
                            for (; C--; )
                                d.lens[d.have++] = U
                        }
                    }
                    if (30 === d.mode)
                        break;
                    if (0 === d.lens[256]) {
                        e.msg = "invalid code -- missing end-of-block",
                        d.mode = 30;
                        break
                    }
                    if (d.lenbits = 9,
                    M = {
                        bits: d.lenbits
                    },
                    D = g(1, d.lens, 0, d.nlen, d.lencode, 0, d.work, M),
                    d.lenbits = M.bits,
                    D) {
                        e.msg = "invalid literal/lengths set",
                        d.mode = 30;
                        break
                    }
                    if (d.distbits = 6,
                    d.distcode = d.distdyn,
                    M = {
                        bits: d.distbits
                    },
                    D = g(2, d.lens, d.nlen, d.ndist, d.distcode, 0, d.work, M),
                    d.distbits = M.bits,
                    D) {
                        e.msg = "invalid distances set",
                        d.mode = 30;
                        break
                    }
                    if (d.mode = 20,
                    6 === t)
                        break inf_leave;
                case 20:
                    d.mode = 21;
                case 21:
                    if (6 <= w && 258 <= k) {
                        e.next_out = y,
                        e.avail_out = k,
                        e.next_in = b,
                        e.avail_in = w,
                        d.hold = x,
                        d.bits = v,
                        m(e, E),
                        y = e.next_out,
                        _ = e.output,
                        k = e.avail_out,
                        b = e.next_in,
                        s = e.input,
                        w = e.avail_in,
                        x = d.hold,
                        v = d.bits,
                        12 === d.mode && (d.back = -1);
                        break
                    }
                    for (d.back = 0; ; ) {
                        if (a = d.lencode[x & (1 << d.lenbits) - 1],
                        R = a >>> 24,
                        B = 255 & a >>> 16,
                        L = 65535 & a,
                        R <= v)
                            break;
                        if (0 === w)
                            break inf_leave;
                        w--,
                        x += s[b++] << v,
                        v += 8
                    }
                    if (B && 0 == (240 & B)) {
                        for (A = R,
                        P = B,
                        O = L; ; ) {
                            if (a = d.lencode[O + ((x & (1 << A + P) - 1) >> A)],
                            R = a >>> 24,
                            B = 255 & a >>> 16,
                            L = 65535 & a,
                            A + R <= v)
                                break;
                            if (0 === w)
                                break inf_leave;
                            w--,
                            x += s[b++] << v,
                            v += 8
                        }
                        x >>>= A,
                        v -= A,
                        d.back += A
                    }
                    if (x >>>= R,
                    v -= R,
                    d.back += R,
                    d.length = L,
                    0 === B) {
                        d.mode = 26;
                        break
                    }
                    if (32 & B) {
                        d.back = -1,
                        d.mode = 12;
                        break
                    }
                    if (64 & B) {
                        e.msg = "invalid literal/length code",
                        d.mode = 30;
                        break
                    }
                    d.extra = 15 & B,
                    d.mode = 22;
                case 22:
                    if (d.extra) {
                        for (j = d.extra; v < j; ) {
                            if (0 === w)
                                break inf_leave;
                            w--,
                            x += s[b++] << v,
                            v += 8
                        }
                        d.length += x & (1 << d.extra) - 1,
                        x >>>= d.extra,
                        v -= d.extra,
                        d.back += d.extra
                    }
                    d.was = d.length,
                    d.mode = 23;
                case 23:
                    for (; ; ) {
                        if (a = d.distcode[x & (1 << d.distbits) - 1],
                        R = a >>> 24,
                        B = 255 & a >>> 16,
                        L = 65535 & a,
                        R <= v)
                            break;
                        if (0 === w)
                            break inf_leave;
                        w--,
                        x += s[b++] << v,
                        v += 8
                    }
                    if (0 == (240 & B)) {
                        for (A = R,
                        P = B,
                        O = L; ; ) {
                            if (a = d.distcode[O + ((x & (1 << A + P) - 1) >> A)],
                            R = a >>> 24,
                            B = 255 & a >>> 16,
                            L = 65535 & a,
                            A + R <= v)
                                break;
                            if (0 === w)
                                break inf_leave;
                            w--,
                            x += s[b++] << v,
                            v += 8
                        }
                        x >>>= A,
                        v -= A,
                        d.back += A
                    }
                    if (x >>>= R,
                    v -= R,
                    d.back += R,
                    64 & B) {
                        e.msg = "invalid distance code",
                        d.mode = 30;
                        break
                    }
                    d.offset = L,
                    d.extra = 15 & B,
                    d.mode = 24;
                case 24:
                    if (d.extra) {
                        for (j = d.extra; v < j; ) {
                            if (0 === w)
                                break inf_leave;
                            w--,
                            x += s[b++] << v,
                            v += 8
                        }
                        d.offset += x & (1 << d.extra) - 1,
                        x >>>= d.extra,
                        v -= d.extra,
                        d.back += d.extra
                    }
                    if (d.offset > d.dmax) {
                        e.msg = "invalid distance too far back",
                        d.mode = 30;
                        break
                    }
                    d.mode = 25;
                case 25:
                    if (0 === k)
                        break inf_leave;
                    if (C = E - k,
                    d.offset > C) {
                        if (C = d.offset - C,
                        C > d.whave && d.sane) {
                            e.msg = "invalid distance too far back",
                            d.mode = 30;
                            break
                        }
                        C > d.wnext ? (C -= d.wnext,
                        I = d.wsize - C) : I = d.wnext - C,
                        C > d.length && (C = d.length),
                        T = d.window
                    } else
                        T = _,
                        I = y - d.offset,
                        C = d.length;
                    C > k && (C = k),
                    k -= C,
                    d.length -= C;
                    do
                        _[y++] = T[I++];
                    while (--C);0 === d.length && (d.mode = 21);
                    break;
                case 26:
                    if (0 === k)
                        break inf_leave;
                    _[y++] = d.length,
                    k--,
                    d.mode = 21;
                    break;
                case 27:
                    if (d.wrap) {
                        for (; 32 > v; ) {
                            if (0 === w)
                                break inf_leave;
                            w--,
                            x |= s[b++] << v,
                            v += 8
                        }
                        if (E -= k,
                        e.total_out += E,
                        d.total += E,
                        E && (e.adler = d.check = d.flags ? h(d.check, _, E, y - E) : p(d.check, _, E, y - E)),
                        E = k,
                        (d.flags ? x : r(x)) !== d.check) {
                            e.msg = "incorrect data check",
                            d.mode = 30;
                            break
                        }
                        x = 0,
                        v = 0
                    }
                    d.mode = 28;
                case 28:
                    if (d.wrap && d.flags) {
                        for (; 32 > v; ) {
                            if (0 === w)
                                break inf_leave;
                            w--,
                            x += s[b++] << v,
                            v += 8
                        }
                        if (x !== (4294967295 & d.total)) {
                            e.msg = "incorrect length check",
                            d.mode = 30;
                            break
                        }
                        x = 0,
                        v = 0
                    }
                    d.mode = 29;
                case 29:
                    D = 1;
                    break inf_leave;
                case 30:
                    D = -3;
                    break inf_leave;
                case 31:
                    return -4;
                case 32:
                default:
                    return -2;
                }
            return (e.next_out = y,
            e.avail_out = k,
            e.next_in = b,
            e.avail_in = w,
            d.hold = x,
            d.bits = v,
            (d.wsize || E !== e.avail_out && 30 > d.mode && (27 > d.mode || 4 !== t)) && c(e, e.output, e.next_out, E - e.avail_out)) ? (d.mode = 31,
            -4) : (S -= e.avail_in,
            E -= e.avail_out,
            e.total_in += S,
            e.total_out += E,
            d.total += E,
            d.wrap && E && (e.adler = d.check = d.flags ? h(d.check, _, E, e.next_out - E) : p(d.check, _, E, e.next_out - E)),
            e.data_type = d.bits + (d.last ? 64 : 0) + (12 === d.mode ? 128 : 0) + (20 === d.mode || 15 === d.mode ? 256 : 0),
            (0 === S && 0 === E || 4 === t) && 0 === D && (D = -5),
            D)
        }
        ,
        n.inflateEnd = function(e) {
            if (!e || !e.state)
                return -2;
            var t = e.state;
            return t.window && (t.window = null),
            e.state = null,
            0
        }
        ,
        n.inflateGetHeader = function(e, t) {
            var n;
            return e && e.state ? (n = e.state,
            0 == (2 & n.wrap)) ? -2 : (n.head = t,
            t.done = !1,
            0) : -2
        }
        ,
        n.inflateSetDictionary = function(e, t) {
            var n = t.length, r, a, o;
            return e && e.state ? (r = e.state,
            0 !== r.wrap && 11 !== r.mode) ? -2 : 11 === r.mode && (a = 1,
            a = p(a, t, n, 0),
            a !== r.check) ? -3 : (o = c(e, t, n, n),
            o) ? (r.mode = 31,
            -4) : (r.havedict = 1,
            0) : -2
        }
        ,
        n.inflateInfo = "pako inflate (from Nodeca project)"
    }
    , {
        "../utils/common": 118,
        "./adler32": 120,
        "./crc32": 122,
        "./inffast": 125,
        "./inftrees": 127
    }],
    127: [function(e, t) {
        'use strict';
        var n = e("../utils/common")
          , r = 15
          , a = 852
          , o = 592
          , i = 0
          , d = 1
          , s = 2
          , l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]
          , c = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]
          , u = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]
          , f = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        t.exports = function(e, t, p, h, m, g, _, b) {
            var y = b.bits, w = 0, k = 0, x = 0, v = 0, S = 0, E = 0, C = 0, I = 0, T = 0, R = 0, B = null, L = 0, A = new n.Buf16(r + 1), P = new n.Buf16(r + 1), O = null, U = 0, D, M, j, N, z, F, W, H, q;
            for (w = 0; w <= r; w++)
                A[w] = 0;
            for (k = 0; k < h; k++)
                A[t[p + k]]++;
            for (S = y,
            v = r; 1 <= v && 0 === A[v]; v--)
                ;
            if (S > v && (S = v),
            0 === v)
                return m[g++] = 20971520,
                m[g++] = 20971520,
                b.bits = 1,
                0;
            for (x = 1; x < v && 0 === A[x]; x++)
                ;
            for (S < x && (S = x),
            I = 1,
            w = 1; w <= r; w++)
                if (I <<= 1,
                I -= A[w],
                0 > I)
                    return -1;
            if (0 < I && (e === i || 1 !== v))
                return -1;
            for (P[1] = 0,
            w = 1; w < r; w++)
                P[w + 1] = P[w] + A[w];
            for (k = 0; k < h; k++)
                0 !== t[p + k] && (_[P[t[p + k]]++] = k);
            if (e === i ? (B = O = _,
            F = 19) : e === d ? (B = l,
            L -= 257,
            O = c,
            U -= 257,
            F = 256) : (B = u,
            O = f,
            F = -1),
            R = 0,
            k = 0,
            w = x,
            z = g,
            E = S,
            C = 0,
            j = -1,
            T = 1 << S,
            N = T - 1,
            e === d && T > a || e === s && T > o)
                return 1;
            for (; ; ) {
                W = w - C,
                _[k] < F ? (H = 0,
                q = _[k]) : _[k] > F ? (H = O[U + _[k]],
                q = B[L + _[k]]) : (H = 96,
                q = 0),
                D = 1 << w - C,
                M = 1 << E,
                x = M;
                do
                    M -= D,
                    m[z + (R >> C) + M] = 0 | (W << 24 | H << 16 | q);
                while (0 !== M);for (D = 1 << w - 1; R & D; )
                    D >>= 1;
                if (0 === D ? R = 0 : (R &= D - 1,
                R += D),
                k++,
                0 == --A[w]) {
                    if (w === v)
                        break;
                    w = t[p + _[k]]
                }
                if (w > S && (R & N) !== j) {
                    for (0 === C && (C = S),
                    z += x,
                    E = w - C,
                    I = 1 << E; E + C < v && (I -= A[E + C],
                    !(0 >= I)); )
                        E++,
                        I <<= 1;
                    if (T += 1 << E,
                    e === d && T > a || e === s && T > o)
                        return 1;
                    j = R & N,
                    m[j] = 0 | (S << 24 | E << 16 | z - g)
                }
            }
            return 0 !== R && (m[z + R] = 0 | (4194304 | w - C << 24)),
            b.bits = S,
            0
        }
    }
    , {
        "../utils/common": 118
    }],
    128: [function(e, t) {
        'use strict';
        t.exports = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version"
        }
    }
    , {}],
    129: [function(e, t, n) {
        'use strict';
        function r(e) {
            for (var t = e.length; 0 <= --t; )
                e[t] = 0
        }
        function a(e, t, n, r, a) {
            this.static_tree = e,
            this.extra_bits = t,
            this.extra_base = n,
            this.elems = r,
            this.max_length = a,
            this.has_stree = e && e.length
        }
        function o(e, t) {
            this.dyn_tree = e,
            this.max_code = 0,
            this.stat_desc = t
        }
        function i(e) {
            return 256 > e ? z[e] : z[256 + (e >>> 7)]
        }
        function d(e, t) {
            e.pending_buf[e.pending++] = 255 & t,
            e.pending_buf[e.pending++] = 255 & t >>> 8
        }
        function l(e, t, n) {
            e.bi_valid > 16 - n ? (e.bi_buf |= 65535 & t << e.bi_valid,
            d(e, e.bi_buf),
            e.bi_buf = t >> 16 - e.bi_valid,
            e.bi_valid += n - 16) : (e.bi_buf |= 65535 & t << e.bi_valid,
            e.bi_valid += n)
        }
        function c(e, t, n) {
            l(e, n[2 * t], n[2 * t + 1])
        }
        function u(e, t) {
            var n = 0;
            do
                n |= 1 & e,
                e >>>= 1,
                n <<= 1;
            while (0 < --t);return n >>> 1
        }
        function f(e) {
            16 === e.bi_valid ? (d(e, e.bi_buf),
            e.bi_buf = 0,
            e.bi_valid = 0) : 8 <= e.bi_valid && (e.pending_buf[e.pending++] = 255 & e.bi_buf,
            e.bi_buf >>= 8,
            e.bi_valid -= 8)
        }
        function p(e, t) {
            var r = t.dyn_tree, a = t.max_code, o = t.stat_desc.static_tree, i = t.stat_desc.has_stree, d = t.stat_desc.extra_bits, s = t.stat_desc.extra_base, l = t.stat_desc.max_length, c = 0, u, p, g, _, b, y;
            for (_ = 0; _ <= 15; _++)
                e.bl_count[_] = 0;
            for (r[2 * e.heap[e.heap_max] + 1] = 0,
            u = e.heap_max + 1; 573 > u; u++)
                (p = e.heap[u],
                _ = r[2 * r[2 * p + 1] + 1] + 1,
                _ > l && (_ = l,
                c++),
                r[2 * p + 1] = _,
                !(p > a)) && (e.bl_count[_]++,
                b = 0,
                p >= s && (b = d[p - s]),
                y = r[2 * p],
                e.opt_len += y * (_ + b),
                i && (e.static_len += y * (o[2 * p + 1] + b)));
            if (0 !== c) {
                do {
                    for (_ = l - 1; 0 === e.bl_count[_]; )
                        _--;
                    e.bl_count[_]--,
                    e.bl_count[_ + 1] += 2,
                    e.bl_count[l]--,
                    c -= 2
                } while (0 < c);for (_ = l; 0 !== _; _--)
                    for (p = e.bl_count[_]; 0 !== p; )
                        (g = e.heap[--u],
                        !(g > a)) && (r[2 * g + 1] !== _ && (e.opt_len += (_ - r[2 * g + 1]) * r[2 * g],
                        r[2 * g + 1] = _),
                        p--)
            }
        }
        function h(e, t, r) {
            var a = Array(16), o = 0, i, d;
            for (i = 1; i <= 15; i++)
                a[i] = o = o + r[i - 1] << 1;
            for (d = 0; d <= t; d++) {
                var s = e[2 * d + 1];
                0 !== s && (e[2 * d] = u(a[s]++, s))
            }
        }
        function m() {
            var e = Array(16), t, r, o, i, d;
            for (o = 0,
            i = 0; i < 28; i++)
                for (W[i] = o,
                t = 0; t < 1 << O[i]; t++)
                    F[o++] = i;
            for (F[o - 1] = i,
            d = 0,
            i = 0; 16 > i; i++)
                for (H[i] = d,
                t = 0; t < 1 << U[i]; t++)
                    z[d++] = i;
            for (d >>= 7; i < 30; i++)
                for (H[i] = d << 7,
                t = 0; t < 1 << U[i] - 7; t++)
                    z[256 + d++] = i;
            for (r = 0; r <= 15; r++)
                e[r] = 0;
            for (t = 0; 143 >= t; )
                j[2 * t + 1] = 8,
                t++,
                e[8]++;
            for (; 255 >= t; )
                j[2 * t + 1] = 9,
                t++,
                e[9]++;
            for (; 279 >= t; )
                j[2 * t + 1] = 7,
                t++,
                e[7]++;
            for (; 287 >= t; )
                j[2 * t + 1] = 8,
                t++,
                e[8]++;
            for (h(j, 287, e),
            t = 0; t < 30; t++)
                N[2 * t + 1] = 5,
                N[2 * t] = u(t, 5);
            G = new a(j,O,257,286,15),
            Z = new a(N,U,0,30,15),
            V = new a([],D,0,19,7)
        }
        function g(e) {
            var t;
            for (t = 0; t < 286; t++)
                e.dyn_ltree[2 * t] = 0;
            for (t = 0; t < 30; t++)
                e.dyn_dtree[2 * t] = 0;
            for (t = 0; t < 19; t++)
                e.bl_tree[2 * t] = 0;
            e.dyn_ltree[512] = 1,
            e.opt_len = e.static_len = 0,
            e.last_lit = e.matches = 0
        }
        function _(e) {
            8 < e.bi_valid ? d(e, e.bi_buf) : 0 < e.bi_valid && (e.pending_buf[e.pending++] = e.bi_buf),
            e.bi_buf = 0,
            e.bi_valid = 0
        }
        function b(e, t, n, r) {
            _(e),
            r && (d(e, n),
            d(e, ~n)),
            B.arraySet(e.pending_buf, e.window, t, n, e.pending),
            e.pending += n
        }
        function y(e, t, n, r) {
            var a = 2 * t
              , o = 2 * n;
            return e[a] < e[o] || e[a] === e[o] && r[t] <= r[n]
        }
        function w(e, t, n) {
            for (var r = e.heap[n], a = n << 1; a <= e.heap_len && (a < e.heap_len && y(t, e.heap[a + 1], e.heap[a], e.depth) && a++,
            !y(t, r, e.heap[a], e.depth)); )
                e.heap[n] = e.heap[a],
                n = a,
                a <<= 1;
            e.heap[n] = r
        }
        function k(e, t, n) {
            var r = 0, a, o, d, s;
            if (0 !== e.last_lit)
                do
                    a = e.pending_buf[e.d_buf + 2 * r] << 8 | e.pending_buf[e.d_buf + 2 * r + 1],
                    o = e.pending_buf[e.l_buf + r],
                    r++,
                    0 === a ? c(e, o, t) : (d = F[o],
                    c(e, d + 256 + 1, t),
                    s = O[d],
                    0 !== s && (o -= W[d],
                    l(e, o, s)),
                    a--,
                    d = i(a),
                    c(e, d, n),
                    s = U[d],
                    0 !== s && (a -= H[d],
                    l(e, a, s)));
                while (r < e.last_lit);c(e, 256, t)
        }
        function x(e, t) {
            var r = t.dyn_tree, a = t.stat_desc.static_tree, o = t.stat_desc.has_stree, i = t.stat_desc.elems, d = -1, s, l, c;
            for (e.heap_len = 0,
            e.heap_max = 573,
            s = 0; s < i; s++)
                0 === r[2 * s] ? r[2 * s + 1] = 0 : (e.heap[++e.heap_len] = d = s,
                e.depth[s] = 0);
            for (; 2 > e.heap_len; )
                c = e.heap[++e.heap_len] = 2 > d ? ++d : 0,
                r[2 * c] = 1,
                e.depth[c] = 0,
                e.opt_len--,
                o && (e.static_len -= a[2 * c + 1]);
            for (t.max_code = d,
            s = e.heap_len >> 1; 1 <= s; s--)
                w(e, r, s);
            c = i;
            do
                s = e.heap[1],
                e.heap[1] = e.heap[e.heap_len--],
                w(e, r, 1),
                l = e.heap[1],
                e.heap[--e.heap_max] = s,
                e.heap[--e.heap_max] = l,
                r[2 * c] = r[2 * s] + r[2 * l],
                e.depth[c] = (e.depth[s] >= e.depth[l] ? e.depth[s] : e.depth[l]) + 1,
                r[2 * s + 1] = r[2 * l + 1] = c,
                e.heap[1] = c++,
                w(e, r, 1);
            while (2 <= e.heap_len);e.heap[--e.heap_max] = e.heap[1],
            p(e, t),
            h(r, d, e.bl_count)
        }
        function v(e, t, r) {
            var a = -1, o = t[1], i = 0, d = 7, s = 4, l, c;
            for (0 === o && (d = 138,
            s = 3),
            t[2 * (r + 1) + 1] = 65535,
            l = 0; l <= r; l++) {
                if (c = o,
                o = t[2 * (l + 1) + 1],
                ++i < d && c === o)
                    continue;
                else
                    i < s ? e.bl_tree[2 * c] += i : 0 === c ? 10 >= i ? e.bl_tree[34]++ : e.bl_tree[36]++ : (c !== a && e.bl_tree[2 * c]++,
                    e.bl_tree[32]++);
                i = 0,
                a = c,
                0 === o ? (d = 138,
                s = 3) : c === o ? (d = 6,
                s = 3) : (d = 7,
                s = 4)
            }
        }
        function S(e, t, r) {
            var a = -1, o = t[1], i = 0, d = 7, s = 4, u, f;
            for (0 === o && (d = 138,
            s = 3),
            u = 0; u <= r; u++) {
                if (f = o,
                o = t[2 * (u + 1) + 1],
                ++i < d && f === o)
                    continue;
                else if (i < s)
                    do
                        c(e, f, e.bl_tree);
                    while (0 != --i);
                else
                    0 === f ? 10 >= i ? (c(e, 17, e.bl_tree),
                    l(e, i - 3, 3)) : (c(e, 18, e.bl_tree),
                    l(e, i - 11, 7)) : (f !== a && (c(e, f, e.bl_tree),
                    i--),
                    c(e, 16, e.bl_tree),
                    l(e, i - 3, 2));
                i = 0,
                a = f,
                0 === o ? (d = 138,
                s = 3) : f === o ? (d = 6,
                s = 3) : (d = 7,
                s = 4)
            }
        }
        function E(e) {
            var t;
            for (v(e, e.dyn_ltree, e.l_desc.max_code),
            v(e, e.dyn_dtree, e.d_desc.max_code),
            x(e, e.bl_desc),
            t = 18; 3 <= t && 0 === e.bl_tree[2 * M[t] + 1]; t--)
                ;
            return e.opt_len += 3 * (t + 1) + 5 + 5 + 4,
            t
        }
        function C(e, t, n, r) {
            var a;
            for (l(e, t - 257, 5),
            l(e, n - 1, 5),
            l(e, r - 4, 4),
            a = 0; a < r; a++)
                l(e, e.bl_tree[2 * M[a] + 1], 3);
            S(e, e.dyn_ltree, t - 1),
            S(e, e.dyn_dtree, n - 1)
        }
        function I(e) {
            var t = 4093624447, r;
            for (r = 0; 31 >= r; r++,
            t >>>= 1)
                if (1 & t && 0 !== e.dyn_ltree[2 * r])
                    return 0;
            if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26])
                return 1;
            for (r = 32; r < 256; r++)
                if (0 !== e.dyn_ltree[2 * r])
                    return 1;
            return 0
        }
        function T(e) {
            q || (m(),
            q = !0),
            e.l_desc = new o(e.dyn_ltree,G),
            e.d_desc = new o(e.dyn_dtree,Z),
            e.bl_desc = new o(e.bl_tree,V),
            e.bi_buf = 0,
            e.bi_valid = 0,
            g(e)
        }
        function R(e, t, n, r) {
            l(e, 0 + (r ? 1 : 0), 3),
            b(e, t, n, !0)
        }
        var B = e("../utils/common")
          , L = 29
          , A = 256 + 1 + L
          , P = 30
          , O = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
          , U = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
          , D = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
          , M = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
          , j = Array(2 * (A + 2));
        r(j);
        var N = Array(2 * P);
        r(N);
        var z = Array(512);
        r(z);
        var F = Array(258 - 3 + 1);
        r(F);
        var W = Array(L);
        r(W);
        var H = Array(P);
        r(H);
        var q = !1, G, Z, V;
        n._tr_init = T,
        n._tr_stored_block = R,
        n._tr_flush_block = function(e, t, n, r) {
            var a = 0, o, i;
            0 < e.level ? (e.strm.data_type === 2 && (e.strm.data_type = I(e)),
            x(e, e.l_desc),
            x(e, e.d_desc),
            a = E(e),
            o = e.opt_len + 3 + 7 >>> 3,
            i = e.static_len + 3 + 7 >>> 3,
            i <= o && (o = i)) : o = i = n + 5,
            n + 4 <= o && -1 !== t ? R(e, t, n, r) : e.strategy === 4 || i === o ? (l(e, 2 + (r ? 1 : 0), 3),
            k(e, j, N)) : (l(e, 4 + (r ? 1 : 0), 3),
            C(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1),
            k(e, e.dyn_ltree, e.dyn_dtree)),
            g(e),
            r && _(e)
        }
        ,
        n._tr_tally = function(e, t, n) {
            return e.pending_buf[e.d_buf + 2 * e.last_lit] = 255 & t >>> 8,
            e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t,
            e.pending_buf[e.l_buf + e.last_lit] = 255 & n,
            e.last_lit++,
            0 === t ? e.dyn_ltree[2 * n]++ : (e.matches++,
            t--,
            e.dyn_ltree[2 * (F[n] + 256 + 1)]++,
            e.dyn_dtree[2 * i(t)]++),
            e.last_lit === e.lit_bufsize - 1
        }
        ,
        n._tr_align = function(e) {
            l(e, 2, 3),
            c(e, 256, j),
            f(e)
        }
    }
    , {
        "../utils/common": 118
    }],
    130: [function(e, t) {
        'use strict';
        t.exports = function() {
            this.input = null,
            this.next_in = 0,
            this.avail_in = 0,
            this.total_in = 0,
            this.output = null,
            this.next_out = 0,
            this.avail_out = 0,
            this.total_out = 0,
            this.msg = "",
            this.state = null,
            this.data_type = 2,
            this.adler = 0
        }
    }
    , {}],
    131: [function(e, t) {
        function n(e) {
            if (/^-?\d+$/.test(e))
                return parseInt(e, 10);
            var t;
            if (t = e.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)) {
                var n = t[1]
                  , r = t[2]
                  , a = t[3];
                if (n && a) {
                    n = parseInt(n),
                    a = parseInt(a);
                    var o = []
                      , d = n < a ? 1 : -1;
                    ("-" == r || ".." == r || "\u2025" == r) && (a += d);
                    for (var s = n; s != a; s += d)
                        o.push(s);
                    return o
                }
            }
            return []
        }
        t.exports.parse = function(e) {
            var t = e.split(",")
              , r = t.map(function(e) {
                return n(e)
            });
            return 0 === r.length ? [] : 1 === r.length ? Array.isArray(r[0]) ? r[0] : r : r.reduce(function(e, t) {
                return Array.isArray(e) || (e = [e]),
                Array.isArray(t) || (t = [t]),
                e.concat(t)
            })
        }
    }
    , {}],
    132: [function(e, t) {
        (function(n, r) {
            function a(e) {
                if ("string" == typeof e && /^(stream-)?magnet:/.test(e))
                    return h(e);
                if ("string" == typeof e && (/^[a-f0-9]{40}$/i.test(e) || /^[a-z2-7]{32}$/i.test(e)))
                    return h(`magnet:?xt=urn:btih:${e}`);
                if (r.isBuffer(e) && 20 === e.length)
                    return h(`magnet:?xt=urn:btih:${e.toString("hex")}`);
                if (r.isBuffer(e))
                    return o(e);
                if (e && e.infoHash)
                    return e.infoHash = e.infoHash.toLowerCase(),
                    e.announce || (e.announce = []),
                    "string" == typeof e.announce && (e.announce = [e.announce]),
                    e.urlList || (e.urlList = []),
                    e;
                throw new Error("Invalid torrent identifier")
            }
            function o(e) {
                r.isBuffer(e) && (e = c.decode(e)),
                l(e.info, "info"),
                l(e.info["name.utf-8"] || e.info.name, "info.name"),
                l(e.info["piece length"], "info['piece length']"),
                l(e.info.pieces, "info.pieces"),
                e.info.files ? e.info.files.forEach(e=>{
                    l("number" == typeof e.length, "info.files[0].length"),
                    l(e["path.utf-8"] || e.path, "info.files[0].path")
                }
                ) : l("number" == typeof e.info.length, "info.length");
                const t = {
                    info: e.info,
                    infoBuffer: c.encode(e.info),
                    name: (e.info["name.utf-8"] || e.info.name).toString(),
                    announce: []
                };
                t.infoHash = g.sync(t.infoBuffer),
                t.infoHashBuffer = r.from(t.infoHash, "hex"),
                void 0 !== e.info.private && (t.private = !!e.info.private),
                e["creation date"] && (t.created = new Date(1e3 * e["creation date"])),
                e["created by"] && (t.createdBy = e["created by"].toString()),
                r.isBuffer(e.comment) && (t.comment = e.comment.toString()),
                Array.isArray(e["announce-list"]) && 0 < e["announce-list"].length ? e["announce-list"].forEach(e=>{
                    e.forEach(e=>{
                        t.announce.push(e.toString())
                    }
                    )
                }
                ) : e.announce && t.announce.push(e.announce.toString()),
                r.isBuffer(e["url-list"]) && (e["url-list"] = 0 < e["url-list"].length ? [e["url-list"]] : []),
                t.urlList = (e["url-list"] || []).map(e=>e.toString()),
                _(t.announce),
                _(t.urlList);
                const n = e.info.files || [e.info];
                t.files = n.map((e,r)=>{
                    const a = [].concat(t.name, e["path.utf-8"] || e.path || []).map(e=>e.toString());
                    return {
                        path: m.join.apply(null, [m.sep].concat(a)).slice(1),
                        name: a[a.length - 1],
                        length: e.length,
                        offset: n.slice(0, r).reduce(d, 0)
                    }
                }
                ),
                t.length = n.reduce(d, 0);
                const a = t.files[t.files.length - 1];
                return t.pieceLength = e.info["piece length"],
                t.lastPieceLength = (a.offset + a.length) % t.pieceLength || t.pieceLength,
                t.pieces = s(e.info.pieces),
                t
            }
            function i(e) {
                return "undefined" != typeof Blob && e instanceof Blob
            }
            function d(e, t) {
                return e + t.length
            }
            function s(e) {
                const t = [];
                for (let n = 0; n < e.length; n += 20)
                    t.push(e.slice(n, n + 20).toString("hex"));
                return t
            }
            function l(e, t) {
                if (!e)
                    throw new Error(`Torrent is missing required field: ${t}`)
            }
            const c = e("bencode")
              , u = e("blob-to-buffer")
              , f = e("fs")
              , p = e("simple-get")
              , h = e("magnet-uri")
              , m = e("path")
              , g = e("simple-sha1")
              , _ = e("uniq");
            t.exports = a,
            t.exports.remote = function(e, t) {
                function r(e) {
                    try {
                        o = a(e)
                    } catch (e) {
                        return t(e)
                    }
                    o && o.infoHash ? t(null, o) : t(new Error("Invalid torrent identifier"))
                }
                let o;
                if ("function" != typeof t)
                    throw new Error("second argument must be a Function");
                try {
                    o = a(e)
                } catch (e) {}
                o && o.infoHash ? n.nextTick(()=>{
                    t(null, o)
                }
                ) : i(e) ? u(e, (e,n)=>e ? t(new Error(`Error converting Blob: ${e.message}`)) : void r(n)) : "function" == typeof p && /^https?:/.test(e) ? p.concat({
                    url: e,
                    timeout: 30000,
                    headers: {
                        "user-agent": "WebTorrent (https://webtorrent.io)"
                    }
                }, (e,n,a)=>e ? t(new Error(`Error downloading torrent: ${e.message}`)) : void r(a)) : "function" == typeof f.readFile && "string" == typeof e ? f.readFile(e, (e,n)=>e ? t(new Error("Invalid torrent identifier")) : void r(n)) : n.nextTick(()=>{
                    t(new Error("Invalid torrent identifier"))
                }
                )
            }
            ,
            t.exports.toMagnetURI = h.encode,
            t.exports.toTorrentFile = function(e) {
                const t = {
                    info: e.info
                };
                return t["announce-list"] = (e.announce || []).map(e=>(t.announce || (t.announce = e),
                e = r.from(e, "utf8"),
                [e])),
                t["url-list"] = e.urlList || [],
                void 0 !== e.private && (t.private = +e.private),
                e.created && (t["creation date"] = 0 | e.created.getTime() / 1e3),
                e.createdBy && (t["created by"] = e.createdBy),
                e.comment && (t.comment = e.comment),
                c.encode(t)
            }
            ;
            (()=>{
                r.alloc(0)
            }
            )()
        }
        ).call(this, e("_process"), e("buffer").Buffer)
    }
    , {
        _process: 137,
        bencode: 7,
        "blob-to-buffer": 15,
        buffer: 23,
        fs: 18,
        "magnet-uri": 103,
        path: 133,
        "simple-get": 169,
        "simple-sha1": 171,
        uniq: 209
    }],
    133: [function(e, t, n) {
        var r = Math.min;
        (function(e) {
            function t(e, t) {
                for (var n = 0, r = e.length - 1, a; 0 <= r; r--)
                    a = e[r],
                    "." === a ? e.splice(r, 1) : ".." === a ? (e.splice(r, 1),
                    n++) : n && (e.splice(r, 1),
                    n--);
                if (t)
                    for (; n--; n)
                        e.unshift("..");
                return e
            }
            function a(e) {
                "string" != typeof e && (e += "");
                var t = 0, n = -1, r = !0, a;
                for (a = e.length - 1; 0 <= a; --a)
                    if (!(47 === e.charCodeAt(a)))
                        -1 === n && (r = !1,
                        n = a + 1);
                    else if (!r) {
                        t = a + 1;
                        break
                    }
                return -1 === n ? "" : e.slice(t, n)
            }
            function o(e, t) {
                if (e.filter)
                    return e.filter(t);
                for (var n = [], r = 0; r < e.length; r++)
                    t(e[r], r, e) && n.push(e[r]);
                return n
            }
            n.resolve = function() {
                for (var n = "", r = !1, a = arguments.length - 1, d; -1 <= a && !r; a--) {
                    if (d = 0 <= a ? arguments[a] : e.cwd(),
                    "string" != typeof d)
                        throw new TypeError("Arguments to path.resolve must be strings");
                    else if (!d)
                        continue;
                    n = d + "/" + n,
                    r = "/" === d.charAt(0)
                }
                return n = t(o(n.split("/"), function(e) {
                    return !!e
                }), !r).join("/"),
                (r ? "/" : "") + n || "."
            }
            ,
            n.normalize = function(e) {
                var r = n.isAbsolute(e)
                  , a = "/" === i(e, -1);
                return e = t(o(e.split("/"), function(e) {
                    return !!e
                }), !r).join("/"),
                e || r || (e = "."),
                e && a && (e += "/"),
                (r ? "/" : "") + e
            }
            ,
            n.isAbsolute = function(e) {
                return "/" === e.charAt(0)
            }
            ,
            n.join = function() {
                var e = Array.prototype.slice.call(arguments, 0);
                return n.normalize(o(e, function(e) {
                    if ("string" != typeof e)
                        throw new TypeError("Arguments to path.join must be strings");
                    return e
                }).join("/"))
            }
            ,
            n.relative = function(e, t) {
                function a(e) {
                    for (var t = 0; t < e.length && "" === e[t]; t++)
                        ;
                    for (var n = e.length - 1; 0 <= n && "" === e[n]; n--)
                        ;
                    return t > n ? [] : e.slice(t, n - t + 1)
                }
                e = n.resolve(e).substr(1),
                t = n.resolve(t).substr(1);
                for (var o = a(e.split("/")), d = a(t.split("/")), s = r(o.length, d.length), l = s, c = 0; c < s; c++)
                    if (o[c] !== d[c]) {
                        l = c;
                        break
                    }
                for (var u = [], c = l; c < o.length; c++)
                    u.push("..");
                return u = u.concat(d.slice(l)),
                u.join("/")
            }
            ,
            n.sep = "/",
            n.delimiter = ":",
            n.dirname = function(e) {
                if ("string" != typeof e && (e += ""),
                0 === e.length)
                    return ".";
                for (var t = e.charCodeAt(0), n = 47 === t, r = -1, a = !0, o = e.length - 1; 1 <= o; --o)
                    if (t = e.charCodeAt(o),
                    47 !== t)
                        a = !1;
                    else if (!a) {
                        r = o;
                        break
                    }
                return -1 === r ? n ? "/" : "." : n && 1 === r ? "/" : e.slice(0, r)
            }
            ,
            n.basename = function(e, t) {
                var n = a(e);
                return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)),
                n
            }
            ,
            n.extname = function(e) {
                "string" != typeof e && (e += "");
                for (var t = -1, n = 0, r = -1, a = !0, o = 0, d = e.length - 1, s; 0 <= d; --d) {
                    if (s = e.charCodeAt(d),
                    47 === s) {
                        if (!a) {
                            n = d + 1;
                            break
                        }
                        continue
                    }
                    -1 === r && (a = !1,
                    r = d + 1),
                    46 === s ? -1 === t ? t = d : 1 !== o && (o = 1) : -1 !== t && (o = -1)
                }
                return -1 === t || -1 === r || 0 === o || 1 === o && t === r - 1 && t === n + 1 ? "" : e.slice(t, r)
            }
            ;
            var i = function(e, t, n) {
                return e.substr(t, n)
            }
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137
    }],
    134: [function(e, t) {
        t.exports = function(e) {
            return Math.max(16384, 0 | 1 << Math.log2(1024 > e ? 1 : e / 1024) + .5)
        }
    }
    , {}],
    135: [function(e, t) {
        var n = Math.log
          , r = Math.pow
          , a = Math.floor
          , o = Math.min;
        t.exports = function(e) {
            if ("number" != typeof e || isNaN(e))
                throw new TypeError("Expected a number, got " + typeof e);
            var t = 0 > e
              , i = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            if (t && (e = -e),
            1 > e)
                return (t ? "-" : "") + e + " B";
            var d = o(a(n(e) / n(1e3)), i.length - 1);
            e = +(e / r(1e3, d));
            var s = i[d];
            return 10 <= e || 0 == e % 1 ? (t ? "-" : "") + e.toFixed(0) + " " + s : (t ? "-" : "") + e.toFixed(1) + " " + s
        }
    }
    , {}],
    136: [function(e, t) {
        (function(e) {
            'use strict';
            t.exports = "undefined" != typeof e && e.version && 0 !== e.version.indexOf("v0.") && (0 !== e.version.indexOf("v1.") || 0 === e.version.indexOf("v1.8.")) ? e : {
                nextTick: function(t, n, r, a) {
                    if ("function" != typeof t)
                        throw new TypeError("\"callback\" argument must be a function");
                    var o = arguments.length, d, s;
                    switch (o) {
                    case 0:
                    case 1:
                        return e.nextTick(t);
                    case 2:
                        return e.nextTick(function() {
                            t.call(null, n)
                        });
                    case 3:
                        return e.nextTick(function() {
                            t.call(null, n, r)
                        });
                    case 4:
                        return e.nextTick(function() {
                            t.call(null, n, r, a)
                        });
                    default:
                        for (d = Array(o - 1),
                        s = 0; s < d.length; )
                            d[s++] = arguments[s];
                        return e.nextTick(function() {
                            t.apply(null, d)
                        });
                    }
                }
            }
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137
    }],
    137: [function(e, t) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }
        function r() {
            throw new Error("clearTimeout has not been defined")
        }
        function a(t) {
            if (u === setTimeout)
                return setTimeout(t, 0);
            if ((u === n || !u) && setTimeout)
                return u = setTimeout,
                setTimeout(t, 0);
            try {
                return u(t, 0)
            } catch (n) {
                try {
                    return u.call(null, t, 0)
                } catch (n) {
                    return u.call(this, t, 0)
                }
            }
        }
        function o(t) {
            if (f === clearTimeout)
                return clearTimeout(t);
            if ((f === r || !f) && clearTimeout)
                return f = clearTimeout,
                clearTimeout(t);
            try {
                return f(t)
            } catch (n) {
                try {
                    return f.call(null, t)
                } catch (n) {
                    return f.call(this, t)
                }
            }
        }
        function i() {
            h && g && (h = !1,
            g.length ? p = g.concat(p) : m = -1,
            p.length && d())
        }
        function d() {
            if (!h) {
                var e = a(i);
                h = !0;
                for (var t = p.length; t; ) {
                    for (g = p,
                    p = []; ++m < t; )
                        g && g[m].run();
                    m = -1,
                    t = p.length
                }
                g = null,
                h = !1,
                o(e)
            }
        }
        function s(e, t) {
            this.fun = e,
            this.array = t
        }
        function l() {}
        var c = t.exports = {}, u, f;
        (function() {
            try {
                u = "function" == typeof setTimeout ? setTimeout : n
            } catch (t) {
                u = n
            }
            try {
                f = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (t) {
                f = r
            }
        }
        )();
        var p = [], h = !1, m = -1, g;
        c.nextTick = function(e) {
            var t = Array(arguments.length - 1);
            if (1 < arguments.length)
                for (var n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
            p.push(new s(e,t)),
            1 !== p.length || h || a(d)
        }
        ,
        s.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ,
        c.title = "browser",
        c.browser = !0,
        c.env = {},
        c.argv = [],
        c.version = "",
        c.versions = {},
        c.on = l,
        c.addListener = l,
        c.once = l,
        c.off = l,
        c.removeListener = l,
        c.removeAllListeners = l,
        c.emit = l,
        c.prependListener = l,
        c.prependOnceListener = l,
        c.listeners = function() {
            return []
        }
        ,
        c.binding = function() {
            throw new Error("process.binding is not supported")
        }
        ,
        c.cwd = function() {
            return "/"
        }
        ,
        c.chdir = function() {
            throw new Error("process.chdir is not supported")
        }
        ,
        c.umask = function() {
            return 0
        }
    }
    , {}],
    138: [function(e, t) {
        (function(n) {
            var r = e("once")
              , a = e("end-of-stream")
              , o = e("fs")
              , i = function() {}
              , d = /^v?\.0/.test(n.version)
              , s = function(e) {
                return "function" == typeof e
            }
              , l = function(e) {
                return !!d && !!o && (e instanceof (o.ReadStream || i) || e instanceof (o.WriteStream || i)) && s(e.close)
            }
              , c = function(e) {
                return e.setHeader && s(e.abort)
            }
              , u = function(e, t, n, o) {
                o = r(o);
                var d = !1;
                e.on("close", function() {
                    d = !0
                }),
                a(e, {
                    readable: t,
                    writable: n
                }, function(e) {
                    return e ? o(e) : void (d = !0,
                    o())
                });
                var u = !1;
                return function(t) {
                    if (!d)
                        return u ? void 0 : (u = !0,
                        l(e) ? e.close(i) : c(e) ? e.abort() : s(e.destroy) ? e.destroy() : void o(t || new Error("stream was destroyed")))
                }
            }
              , f = function(e) {
                e()
            }
              , p = function(e, t) {
                return e.pipe(t)
            };
            t.exports = function() {
                var e = Array.prototype.slice.call(arguments)
                  , t = s(e[e.length - 1] || i) && e.pop() || i;
                if (Array.isArray(e[0]) && (e = e[0]),
                2 > e.length)
                    throw new Error("pump requires two streams per minimum");
                var n = e.map(function(a, o) {
                    var i = o < e.length - 1;
                    return u(a, i, 0 < o, function(e) {
                        r || (r = e),
                        e && n.forEach(f),
                        i || (n.forEach(f),
                        t(r))
                    })
                }), r;
                return e.reduce(p)
            }
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137,
        "end-of-stream": 52,
        fs: 17,
        once: 114
    }],
    139: [function(e, t) {
        'use strict';
        function n(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        t.exports = function(e, t, a, o) {
            t = t || "&",
            a = a || "=";
            var d = {};
            if ("string" != typeof e || 0 === e.length)
                return d;
            var s = /\+/g;
            e = e.split(t);
            var l = 1e3;
            o && "number" == typeof o.maxKeys && (l = o.maxKeys);
            var c = e.length;
            0 < l && c > l && (c = l);
            for (var u = 0; u < c; ++u) {
                var f = e[u].replace(s, "%20"), p = f.indexOf(a), h, m, g, _;
                0 <= p ? (h = f.substr(0, p),
                m = f.substr(p + 1)) : (h = f,
                m = ""),
                g = decodeURIComponent(h),
                _ = decodeURIComponent(m),
                n(d, g) ? r(d[g]) ? d[g].push(_) : d[g] = [d[g], _] : d[g] = _
            }
            return d
        }
        ;
        var r = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
    }
    , {}],
    140: [function(e, t) {
        'use strict';
        function n(e, t) {
            if (e.map)
                return e.map(t);
            for (var n = [], r = 0; r < e.length; r++)
                n.push(t(e[r], r));
            return n
        }
        var r = function(e) {
            switch (typeof e) {
            case "string":
                return e;
            case "boolean":
                return e ? "true" : "false";
            case "number":
                return isFinite(e) ? e : "";
            default:
                return "";
            }
        };
        t.exports = function(e, t, i, d) {
            return t = t || "&",
            i = i || "=",
            null === e && (e = void 0),
            "object" == typeof e ? n(o(e), function(o) {
                var d = encodeURIComponent(r(o)) + i;
                return a(e[o]) ? n(e[o], function(e) {
                    return d + encodeURIComponent(r(e))
                }).join(t) : d + encodeURIComponent(r(e[o]))
            }).join(t) : d ? encodeURIComponent(r(d)) + i + encodeURIComponent(r(e)) : ""
        }
        ;
        var a = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
          , o = Object.keys || function(e) {
            var t = [];
            for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
            return t
        }
    }
    , {}],
    141: [function(e, t, n) {
        'use strict';
        n.decode = n.parse = e("./decode"),
        n.encode = n.stringify = e("./encode")
    }
    , {
        "./decode": 139,
        "./encode": 140
    }],
    142: [function(e, t) {
        let n;
        t.exports = "function" == typeof queueMicrotask ? queueMicrotask : e=>(n || (n = Promise.resolve())).then(e).catch(e=>setTimeout(()=>{
            throw e
        }
        , 0))
    }
    , {}],
    143: [function(e, t) {
        t.exports = function(e) {
            var t = 0;
            return function() {
                if (t === e.length)
                    return null;
                var n = e.length - t
                  , r = 0 | Math.random() * n
                  , a = e[t + r]
                  , o = e[t];
                return e[t] = a,
                e[t + r] = o,
                t++,
                a
            }
        }
    }
    , {}],
    144: [function(e, t) {
        (function(n, r) {
            'use strict';
            var a = e("safe-buffer").Buffer
              , o = r.crypto || r.msCrypto;
            t.exports = o && o.getRandomValues ? function(e, t) {
                if (e > 4294967295)
                    throw new RangeError("requested too many random bytes");
                var r = a.allocUnsafe(e);
                if (0 < e)
                    if (65536 < e)
                        for (var i = 0; i < e; i += 65536)
                            o.getRandomValues(r.slice(i, i + 65536));
                    else
                        o.getRandomValues(r);
                return "function" == typeof t ? n.nextTick(function() {
                    t(null, r)
                }) : r
            }
            : function() {
                throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
            }
        }
        ).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {
        _process: 137,
        "safe-buffer": 166
    }],
    145: [function(e, t) {
        const {Writable: n, PassThrough: r} = e("readable-stream");
        t.exports = class extends n {
            constructor(e, t={}) {
                super(t),
                this.destroyed = !1,
                this._queue = [],
                this._position = e || 0,
                this._cb = null,
                this._buffer = null,
                this._out = null
            }
            _write(e, t, n) {
                let r = !0;
                for (; ; ) {
                    if (this.destroyed)
                        return;
                    if (0 === this._queue.length)
                        return this._buffer = e,
                        void (this._cb = n);
                    this._buffer = null;
                    var a = this._queue[0];
                    const t = Math.max(a.start - this._position, 0)
                      , o = a.end - this._position;
                    if (t >= e.length)
                        return this._position += e.length,
                        n(null);
                    let i;
                    if (o > e.length) {
                        this._position += e.length,
                        i = 0 === t ? e : e.slice(t),
                        r = a.stream.write(i) && r;
                        break
                    }
                    this._position += o,
                    i = 0 === t && o === e.length ? e : e.slice(t, o),
                    r = a.stream.write(i) && r,
                    a.last && a.stream.end(),
                    e = e.slice(o),
                    this._queue.shift()
                }
                r ? n(null) : a.stream.once("drain", n.bind(null, null))
            }
            slice(e) {
                if (this.destroyed)
                    return null;
                Array.isArray(e) || (e = [e]);
                const t = new r;
                return e.forEach((n,r)=>{
                    this._queue.push({
                        start: n.start,
                        end: n.end,
                        stream: t,
                        last: r === e.length - 1
                    })
                }
                ),
                this._buffer && this._write(this._buffer, null, this._cb),
                t
            }
            destroy(e) {
                this.destroyed || (this.destroyed = !0,
                e && this.emit("error", e))
            }
        }
    }
    , {
        "readable-stream": 160
    }],
    146: [function(e, t) {
        'use strict';
        function n(e, t) {
            e.prototype = Object.create(t.prototype),
            e.prototype.constructor = e,
            e.__proto__ = t
        }
        function r(e, t, r) {
            function a(e, n, r) {
                return "string" == typeof t ? t : t(e, n, r)
            }
            r || (r = Error);
            var o = function(e) {
                function t(t, n, r) {
                    return e.call(this, a(t, n, r)) || this
                }
                return n(t, e),
                t
            }(r);
            o.prototype.name = r.name,
            o.prototype.code = e,
            s[e] = o
        }
        function a(e, t) {
            if (Array.isArray(e)) {
                var n = e.length;
                return e = e.map(function(e) {
                    return e + ""
                }),
                2 < n ? "one of ".concat(t, " ").concat(e.slice(0, n - 1).join(", "), ", or ") + e[n - 1] : 2 === n ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0])
            }
            return "of ".concat(t, " ").concat(e + "")
        }
        function o(e, t, n) {
            return e.substr(!n || 0 > n ? 0 : +n, t.length) === t
        }
        function i(e, t, n) {
            return (void 0 === n || n > e.length) && (n = e.length),
            e.substring(n - t.length, n) === t
        }
        function d(e, t, n) {
            return "number" != typeof n && (n = 0),
            !(n + t.length > e.length) && -1 !== e.indexOf(t, n)
        }
        var s = {};
        r("ERR_INVALID_OPT_VALUE", function(e, t) {
            return "The value \"" + t + "\" is invalid for option \"" + e + "\""
        }, TypeError),
        r("ERR_INVALID_ARG_TYPE", function(e, t, n) {
            var r;
            "string" == typeof t && o(t, "not ") ? (r = "must not be",
            t = t.replace(/^not /, "")) : r = "must be";
            var s;
            if (i(e, " argument"))
                s = "The ".concat(e, " ").concat(r, " ").concat(a(t, "type"));
            else {
                var l = d(e, ".") ? "property" : "argument";
                s = "The \"".concat(e, "\" ").concat(l, " ").concat(r, " ").concat(a(t, "type"))
            }
            return s += ". Received type ".concat(typeof n),
            s
        }, TypeError),
        r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"),
        r("ERR_METHOD_NOT_IMPLEMENTED", function(e) {
            return "The " + e + " method is not implemented"
        }),
        r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"),
        r("ERR_STREAM_DESTROYED", function(e) {
            return "Cannot call " + e + " after a stream was destroyed"
        }),
        r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"),
        r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"),
        r("ERR_STREAM_WRITE_AFTER_END", "write after end"),
        r("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError),
        r("ERR_UNKNOWN_ENCODING", function(e) {
            return "Unknown encoding: " + e
        }, TypeError),
        r("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"),
        t.exports.codes = s
    }
    , {}],
    147: [function(e, t) {
        (function(e) {
            'use strict';
            var n = new Set;
            t.exports.emitExperimentalWarning = e.emitWarning ? function(t) {
                if (!n.has(t)) {
                    n.add(t),
                    e.emitWarning(t + " is an experimental feature. This feature could change at any time", "ExperimentalWarning")
                }
            }
            : function() {}
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137
    }],
    148: [function(e, t) {
        (function(n) {
            'use strict';
            function r(e) {
                return this instanceof r ? void (d.call(this, e),
                s.call(this, e),
                this.allowHalfOpen = !0,
                e && (!1 === e.readable && (this.readable = !1),
                !1 === e.writable && (this.writable = !1),
                !1 === e.allowHalfOpen && (this.allowHalfOpen = !1,
                this.once("end", a)))) : new r(e)
            }
            function a() {
                this._writableState.ended || n.nextTick(o, this)
            }
            function o(e) {
                e.end()
            }
            var i = Object.keys || function(e) {
                var t = [];
                for (var n in e)
                    t.push(n);
                return t
            }
            ;
            t.exports = r;
            var d = e("./_stream_readable")
              , s = e("./_stream_writable");
            e("inherits")(r, d);
            for (var l = i(s.prototype), c = 0, u; c < l.length; c++)
                u = l[c],
                r.prototype[u] || (r.prototype[u] = s.prototype[u]);
            Object.defineProperty(r.prototype, "writableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._writableState.highWaterMark
                }
            }),
            Object.defineProperty(r.prototype, "writableBuffer", {
                enumerable: !1,
                get: function() {
                    return this._writableState && this._writableState.getBuffer()
                }
            }),
            Object.defineProperty(r.prototype, "writableLength", {
                enumerable: !1,
                get: function() {
                    return this._writableState.length
                }
            }),
            Object.defineProperty(r.prototype, "destroyed", {
                enumerable: !1,
                get: function() {
                    return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
                },
                set: function(e) {
                    void 0 === this._readableState || void 0 === this._writableState || (this._readableState.destroyed = e,
                    this._writableState.destroyed = e)
                }
            })
        }
        ).call(this, e("_process"))
    }
    , {
        "./_stream_readable": 150,
        "./_stream_writable": 152,
        _process: 137,
        inherits: 60
    }],
    149: [function(e, t) {
        'use strict';
        function n(e) {
            return this instanceof n ? void r.call(this, e) : new n(e)
        }
        t.exports = n;
        var r = e("./_stream_transform");
        e("inherits")(n, r),
        n.prototype._transform = function(e, t, n) {
            n(null, e)
        }
    }
    , {
        "./_stream_transform": 151,
        inherits: 60
    }],
    150: [function(e, t) {
        (function(n, r) {
            'use strict';
            function a(e) {
                return P.from(e)
            }
            function o(e) {
                return P.isBuffer(e) || e instanceof O
            }
            function i(e, t, n) {
                return "function" == typeof e.prependListener ? e.prependListener(t, n) : void (e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]] : e.on(t, n))
            }
            function d(t, n, r) {
                R = R || e("./_stream_duplex"),
                t = t || {},
                "boolean" != typeof r && (r = n instanceof R),
                this.objectMode = !!t.objectMode,
                r && (this.objectMode = this.objectMode || !!t.readableObjectMode),
                this.highWaterMark = z(this, t, "readableHighWaterMark", r),
                this.buffer = new M,
                this.length = 0,
                this.pipes = null,
                this.pipesCount = 0,
                this.flowing = null,
                this.ended = !1,
                this.endEmitted = !1,
                this.reading = !1,
                this.sync = !0,
                this.needReadable = !1,
                this.emittedReadable = !1,
                this.readableListening = !1,
                this.resumeScheduled = !1,
                this.paused = !0,
                this.emitClose = !1 !== t.emitClose,
                this.destroyed = !1,
                this.defaultEncoding = t.defaultEncoding || "utf8",
                this.awaitDrain = 0,
                this.readingMore = !1,
                this.decoder = null,
                this.encoding = null,
                t.encoding && (!K && (K = e("string_decoder/").StringDecoder),
                this.decoder = new K(t.encoding),
                this.encoding = t.encoding)
            }
            function s(t) {
                if (R = R || e("./_stream_duplex"),
                !(this instanceof s))
                    return new s(t);
                var n = this instanceof R;
                this._readableState = new d(t,this,n),
                this.readable = !0,
                t && ("function" == typeof t.read && (this._read = t.read),
                "function" == typeof t.destroy && (this._destroy = t.destroy)),
                A.call(this)
            }
            function l(e, t, n, r, o) {
                D("readableAddChunk", t);
                var i = e._readableState;
                if (null === t)
                    i.reading = !1,
                    h(e, i);
                else {
                    var d;
                    if (o || (d = u(i, t)),
                    d)
                        e.emit("error", d);
                    else if (!(i.objectMode || t && 0 < t.length))
                        r || (i.reading = !1,
                        _(e, i));
                    else if ("string" == typeof t || i.objectMode || Object.getPrototypeOf(t) === P.prototype || (t = a(t)),
                    r)
                        i.endEmitted ? e.emit("error", new G) : c(e, i, t, !0);
                    else if (i.ended)
                        e.emit("error", new H);
                    else {
                        if (i.destroyed)
                            return !1;
                        i.reading = !1,
                        i.decoder && !n ? (t = i.decoder.write(t),
                        i.objectMode || 0 !== t.length ? c(e, i, t, !1) : _(e, i)) : c(e, i, t, !1)
                    }
                }
                return !i.ended && (i.length < i.highWaterMark || 0 === i.length)
            }
            function c(e, t, n, r) {
                t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0,
                e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length,
                r ? t.buffer.unshift(n) : t.buffer.push(n),
                t.needReadable && m(e)),
                _(e, t)
            }
            function u(e, t) {
                var n;
                return o(t) || "string" == typeof t || void 0 === t || e.objectMode || (n = new W("chunk",["string", "Buffer", "Uint8Array"],t)),
                n
            }
            function f(e) {
                return 8388608 <= e ? e = 8388608 : (e--,
                e |= e >>> 1,
                e |= e >>> 2,
                e |= e >>> 4,
                e |= e >>> 8,
                e |= e >>> 16,
                e++),
                e
            }
            function p(e, t) {
                return 0 >= e || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e === e ? (e > t.highWaterMark && (t.highWaterMark = f(e)),
                e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0,
                0)) : t.flowing && t.length ? t.buffer.head.data.length : t.length
            }
            function h(e, t) {
                if (!t.ended) {
                    if (t.decoder) {
                        var n = t.decoder.end();
                        n && n.length && (t.buffer.push(n),
                        t.length += t.objectMode ? 1 : n.length)
                    }
                    t.ended = !0,
                    t.sync ? m(e) : (t.needReadable = !1,
                    !t.emittedReadable && (t.emittedReadable = !0,
                    g(e)))
                }
            }
            function m(e) {
                var t = e._readableState;
                t.needReadable = !1,
                t.emittedReadable || (D("emitReadable", t.flowing),
                t.emittedReadable = !0,
                n.nextTick(g, e))
            }
            function g(e) {
                var t = e._readableState;
                D("emitReadable_", t.destroyed, t.length, t.ended),
                !t.destroyed && (t.length || t.ended) && e.emit("readable"),
                t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark,
                S(e)
            }
            function _(e, t) {
                t.readingMore || (t.readingMore = !0,
                n.nextTick(b, e, t))
            }
            function b(e, t) {
                for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length); ) {
                    var n = t.length;
                    if (D("maybeReadMore read 0"),
                    e.read(0),
                    n === t.length)
                        break
                }
                t.readingMore = !1
            }
            function y(e) {
                return function() {
                    var t = e._readableState;
                    D("pipeOnDrain", t.awaitDrain),
                    t.awaitDrain && t.awaitDrain--,
                    0 === t.awaitDrain && L(e, "data") && (t.flowing = !0,
                    S(e))
                }
            }
            function w(e) {
                var t = e._readableState;
                t.readableListening = 0 < e.listenerCount("readable"),
                t.resumeScheduled && !t.paused ? t.flowing = !0 : 0 < e.listenerCount("data") && e.resume()
            }
            function k(e) {
                D("readable nexttick read 0"),
                e.read(0)
            }
            function x(e, t) {
                t.resumeScheduled || (t.resumeScheduled = !0,
                n.nextTick(v, e, t))
            }
            function v(e, t) {
                D("resume", t.reading),
                t.reading || e.read(0),
                t.resumeScheduled = !1,
                e.emit("resume"),
                S(e),
                t.flowing && !t.reading && e.read(0)
            }
            function S(e) {
                var t = e._readableState;
                for (D("flow", t.flowing); t.flowing && null !== e.read(); )
                    ;
            }
            function E(e, t) {
                if (0 === t.length)
                    return null;
                var n;
                return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length),
                t.buffer.clear()) : n = t.buffer.consume(e, t.decoder),
                n
            }
            function C(e) {
                var t = e._readableState;
                D("endReadable", t.endEmitted),
                t.endEmitted || (t.ended = !0,
                n.nextTick(I, t, e))
            }
            function I(e, t) {
                D("endReadableNT", e.endEmitted, e.length),
                e.endEmitted || 0 !== e.length || (e.endEmitted = !0,
                t.readable = !1,
                t.emit("end"))
            }
            function T(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t)
                        return n;
                return -1
            }
            t.exports = s;
            var R;
            s.ReadableState = d;
            var B = e("events").EventEmitter, L = function(e, t) {
                return e.listeners(t).length
            }, A = e("./internal/streams/stream"), P = e("buffer").Buffer, O = r.Uint8Array || function() {}
            , U = e("util"), D;
            D = U && U.debuglog ? U.debuglog("stream") : function() {}
            ;
            var M = e("./internal/streams/buffer_list"), j = e("./internal/streams/destroy"), N = e("./internal/streams/state"), z = N.getHighWaterMark, F = e("../errors").codes, W = F.ERR_INVALID_ARG_TYPE, H = F.ERR_STREAM_PUSH_AFTER_EOF, q = F.ERR_METHOD_NOT_IMPLEMENTED, G = F.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, Z = e("../experimentalWarning"), V = Z.emitExperimentalWarning, K, X;
            e("inherits")(s, A);
            var Y = ["error", "close", "destroy", "pause", "resume"];
            Object.defineProperty(s.prototype, "destroyed", {
                enumerable: !1,
                get: function() {
                    return void 0 !== this._readableState && this._readableState.destroyed
                },
                set: function(e) {
                    this._readableState && (this._readableState.destroyed = e)
                }
            }),
            s.prototype.destroy = j.destroy,
            s.prototype._undestroy = j.undestroy,
            s.prototype._destroy = function(e, t) {
                t(e)
            }
            ,
            s.prototype.push = function(e, t) {
                var n = this._readableState, r;
                return n.objectMode ? r = !0 : "string" == typeof e && (t = t || n.defaultEncoding,
                t !== n.encoding && (e = P.from(e, t),
                t = ""),
                r = !0),
                l(this, e, t, !1, r)
            }
            ,
            s.prototype.unshift = function(e) {
                return l(this, e, null, !0, !1)
            }
            ,
            s.prototype.isPaused = function() {
                return !1 === this._readableState.flowing
            }
            ,
            s.prototype.setEncoding = function(t) {
                return K || (K = e("string_decoder/").StringDecoder),
                this._readableState.decoder = new K(t),
                this._readableState.encoding = this._readableState.decoder.encoding,
                this
            }
            ;
            s.prototype.read = function(e) {
                D("read", e),
                e = parseInt(e, 10);
                var t = this._readableState
                  , r = e;
                if (0 !== e && (t.emittedReadable = !1),
                0 === e && t.needReadable && ((0 === t.highWaterMark ? 0 < t.length : t.length >= t.highWaterMark) || t.ended))
                    return D("read: emitReadable", t.length, t.ended),
                    0 === t.length && t.ended ? C(this) : m(this),
                    null;
                if (e = p(e, t),
                0 === e && t.ended)
                    return 0 === t.length && C(this),
                    null;
                var a = t.needReadable;
                D("need readable", a),
                (0 === t.length || t.length - e < t.highWaterMark) && (a = !0,
                D("length less than watermark", a)),
                t.ended || t.reading ? (a = !1,
                D("reading or ended", a)) : a && (D("do read"),
                t.reading = !0,
                t.sync = !0,
                0 === t.length && (t.needReadable = !0),
                this._read(t.highWaterMark),
                t.sync = !1,
                !t.reading && (e = p(r, t)));
                var o;
                return o = 0 < e ? E(e, t) : null,
                null === o ? (t.needReadable = !0,
                e = 0) : (t.length -= e,
                t.awaitDrain = 0),
                0 === t.length && (!t.ended && (t.needReadable = !0),
                r !== e && t.ended && C(this)),
                null !== o && this.emit("data", o),
                o
            }
            ,
            s.prototype._read = function() {
                this.emit("error", new q("_read()"))
            }
            ,
            s.prototype.pipe = function(e, t) {
                function r(e, t) {
                    D("onunpipe"),
                    e === f && t && !1 === t.hasUnpiped && (t.hasUnpiped = !0,
                    o())
                }
                function a() {
                    D("onend"),
                    e.end()
                }
                function o() {
                    D("cleanup"),
                    e.removeListener("close", l),
                    e.removeListener("finish", c),
                    e.removeListener("drain", g),
                    e.removeListener("error", s),
                    e.removeListener("unpipe", r),
                    f.removeListener("end", a),
                    f.removeListener("end", u),
                    f.removeListener("data", d),
                    _ = !0,
                    p.awaitDrain && (!e._writableState || e._writableState.needDrain) && g()
                }
                function d(t) {
                    D("ondata");
                    var n = e.write(t);
                    D("dest.write", n),
                    !1 === n && ((1 === p.pipesCount && p.pipes === e || 1 < p.pipesCount && -1 !== T(p.pipes, e)) && !_ && (D("false write response, pause", p.awaitDrain),
                    p.awaitDrain++),
                    f.pause())
                }
                function s(t) {
                    D("onerror", t),
                    u(),
                    e.removeListener("error", s),
                    0 === L(e, "error") && e.emit("error", t)
                }
                function l() {
                    e.removeListener("finish", c),
                    u()
                }
                function c() {
                    D("onfinish"),
                    e.removeListener("close", l),
                    u()
                }
                function u() {
                    D("unpipe"),
                    f.unpipe(e)
                }
                var f = this
                  , p = this._readableState;
                switch (p.pipesCount) {
                case 0:
                    p.pipes = e;
                    break;
                case 1:
                    p.pipes = [p.pipes, e];
                    break;
                default:
                    p.pipes.push(e);
                }
                p.pipesCount += 1,
                D("pipe count=%d opts=%j", p.pipesCount, t);
                var h = (!t || !1 !== t.end) && e !== n.stdout && e !== n.stderr
                  , m = h ? a : u;
                p.endEmitted ? n.nextTick(m) : f.once("end", m),
                e.on("unpipe", r);
                var g = y(f);
                e.on("drain", g);
                var _ = !1;
                return f.on("data", d),
                i(e, "error", s),
                e.once("close", l),
                e.once("finish", c),
                e.emit("pipe", f),
                p.flowing || (D("pipe resume"),
                f.resume()),
                e
            }
            ,
            s.prototype.unpipe = function(e) {
                var t = this._readableState
                  , n = {
                    hasUnpiped: !1
                };
                if (0 === t.pipesCount)
                    return this;
                if (1 === t.pipesCount)
                    return e && e !== t.pipes ? this : (e || (e = t.pipes),
                    t.pipes = null,
                    t.pipesCount = 0,
                    t.flowing = !1,
                    e && e.emit("unpipe", this, n),
                    this);
                if (!e) {
                    var r = t.pipes
                      , a = t.pipesCount;
                    t.pipes = null,
                    t.pipesCount = 0,
                    t.flowing = !1;
                    for (var o = 0; o < a; o++)
                        r[o].emit("unpipe", this, {
                            hasUnpiped: !1
                        });
                    return this
                }
                var d = T(t.pipes, e);
                return -1 === d ? this : (t.pipes.splice(d, 1),
                t.pipesCount -= 1,
                1 === t.pipesCount && (t.pipes = t.pipes[0]),
                e.emit("unpipe", this, n),
                this)
            }
            ,
            s.prototype.on = function(e, t) {
                var r = A.prototype.on.call(this, e, t)
                  , a = this._readableState;
                return "data" === e ? (a.readableListening = 0 < this.listenerCount("readable"),
                !1 !== a.flowing && this.resume()) : "readable" == e && !a.endEmitted && !a.readableListening && (a.readableListening = a.needReadable = !0,
                a.flowing = !1,
                a.emittedReadable = !1,
                D("on readable", a.length, a.reading),
                a.length ? m(this) : !a.reading && n.nextTick(k, this)),
                r
            }
            ,
            s.prototype.addListener = s.prototype.on,
            s.prototype.removeListener = function(e, t) {
                var r = A.prototype.removeListener.call(this, e, t);
                return "readable" === e && n.nextTick(w, this),
                r
            }
            ,
            s.prototype.removeAllListeners = function(e) {
                var t = A.prototype.removeAllListeners.apply(this, arguments);
                return ("readable" === e || void 0 === e) && n.nextTick(w, this),
                t
            }
            ,
            s.prototype.resume = function() {
                var e = this._readableState;
                return e.flowing || (D("resume"),
                e.flowing = !e.readableListening,
                x(this, e)),
                e.paused = !1,
                this
            }
            ,
            s.prototype.pause = function() {
                return D("call pause flowing=%j", this._readableState.flowing),
                !1 !== this._readableState.flowing && (D("pause"),
                this._readableState.flowing = !1,
                this.emit("pause")),
                this._readableState.paused = !0,
                this
            }
            ,
            s.prototype.wrap = function(e) {
                var t = this
                  , r = this._readableState
                  , a = !1;
                for (var o in e.on("end", function() {
                    if (D("wrapped end"),
                    r.decoder && !r.ended) {
                        var e = r.decoder.end();
                        e && e.length && t.push(e)
                    }
                    t.push(null)
                }),
                e.on("data", function(n) {
                    if ((D("wrapped data"),
                    r.decoder && (n = r.decoder.write(n)),
                    !(r.objectMode && (null === n || void 0 === n))) && (r.objectMode || n && n.length)) {
                        var o = t.push(n);
                        o || (a = !0,
                        e.pause())
                    }
                }),
                e)
                    void 0 === this[o] && "function" == typeof e[o] && (this[o] = function(t) {
                        return function() {
                            return e[t].apply(e, arguments)
                        }
                    }(o));
                for (var i = 0; i < Y.length; i++)
                    e.on(Y[i], this.emit.bind(this, Y[i]));
                return this._read = function(t) {
                    D("wrapped _read", t),
                    a && (a = !1,
                    e.resume())
                }
                ,
                this
            }
            ,
            "function" == typeof Symbol && (s.prototype[Symbol.asyncIterator] = function() {
                return V("Readable[Symbol.asyncIterator]"),
                void 0 === X && (X = e("./internal/streams/async_iterator")),
                X(this)
            }
            ),
            Object.defineProperty(s.prototype, "readableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._readableState.highWaterMark
                }
            }),
            Object.defineProperty(s.prototype, "readableBuffer", {
                enumerable: !1,
                get: function() {
                    return this._readableState && this._readableState.buffer
                }
            }),
            Object.defineProperty(s.prototype, "readableFlowing", {
                enumerable: !1,
                get: function() {
                    return this._readableState.flowing
                },
                set: function(e) {
                    this._readableState && (this._readableState.flowing = e)
                }
            }),
            s._fromList = E,
            Object.defineProperty(s.prototype, "readableLength", {
                enumerable: !1,
                get: function() {
                    return this._readableState.length
                }
            })
        }
        ).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {
        "../errors": 146,
        "../experimentalWarning": 147,
        "./_stream_duplex": 148,
        "./internal/streams/async_iterator": 153,
        "./internal/streams/buffer_list": 154,
        "./internal/streams/destroy": 155,
        "./internal/streams/state": 158,
        "./internal/streams/stream": 159,
        _process: 137,
        buffer: 23,
        events: 53,
        inherits: 60,
        "string_decoder/": 197,
        util: 17
    }],
    151: [function(e, t) {
        'use strict';
        function n(e, t) {
            var n = this._transformState;
            n.transforming = !1;
            var r = n.writecb;
            if (null === r)
                return this.emit("error", new s);
            n.writechunk = null,
            n.writecb = null,
            null != t && this.push(t),
            r(e);
            var a = this._readableState;
            a.reading = !1,
            (a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
        }
        function r(e) {
            return this instanceof r ? void (u.call(this, e),
            this._transformState = {
                afterTransform: n.bind(this),
                needTransform: !1,
                transforming: !1,
                writecb: null,
                writechunk: null,
                writeencoding: null
            },
            this._readableState.needReadable = !0,
            this._readableState.sync = !1,
            e && ("function" == typeof e.transform && (this._transform = e.transform),
            "function" == typeof e.flush && (this._flush = e.flush)),
            this.on("prefinish", a)) : new r(e)
        }
        function a() {
            var e = this;
            "function" != typeof this._flush || this._readableState.destroyed ? o(this, null, null) : this._flush(function(t, n) {
                o(e, t, n)
            })
        }
        function o(e, t, n) {
            if (t)
                return e.emit("error", t);
            if (null != n && e.push(n),
            e._writableState.length)
                throw new c;
            if (e._transformState.transforming)
                throw new l;
            return e.push(null)
        }
        t.exports = r;
        var i = e("../errors").codes
          , d = i.ERR_METHOD_NOT_IMPLEMENTED
          , s = i.ERR_MULTIPLE_CALLBACK
          , l = i.ERR_TRANSFORM_ALREADY_TRANSFORMING
          , c = i.ERR_TRANSFORM_WITH_LENGTH_0
          , u = e("./_stream_duplex");
        e("inherits")(r, u),
        r.prototype.push = function(e, t) {
            return this._transformState.needTransform = !1,
            u.prototype.push.call(this, e, t)
        }
        ,
        r.prototype._transform = function(e, t, n) {
            n(new d("_transform()"))
        }
        ,
        r.prototype._write = function(e, t, n) {
            var r = this._transformState;
            if (r.writecb = n,
            r.writechunk = e,
            r.writeencoding = t,
            !r.transforming) {
                var a = this._readableState;
                (r.needTransform || a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
            }
        }
        ,
        r.prototype._read = function() {
            var e = this._transformState;
            null === e.writechunk || e.transforming ? e.needTransform = !0 : (e.transforming = !0,
            this._transform(e.writechunk, e.writeencoding, e.afterTransform))
        }
        ,
        r.prototype._destroy = function(e, t) {
            u.prototype._destroy.call(this, e, function(e) {
                t(e)
            })
        }
    }
    , {
        "../errors": 146,
        "./_stream_duplex": 148,
        inherits: 60
    }],
    152: [function(e, t) {
        (function(n, r) {
            'use strict';
            function a(e) {
                var t = this;
                this.next = null,
                this.entry = null,
                this.finish = function() {
                    C(t, e)
                }
            }
            function o(e) {
                return B.from(e)
            }
            function i(e) {
                return B.isBuffer(e) || e instanceof L
            }
            function d() {}
            function s(t, n, r) {
                I = I || e("./_stream_duplex"),
                t = t || {},
                "boolean" != typeof r && (r = n instanceof I),
                this.objectMode = !!t.objectMode,
                r && (this.objectMode = this.objectMode || !!t.writableObjectMode),
                this.highWaterMark = O(this, t, "writableHighWaterMark", r),
                this.finalCalled = !1,
                this.needDrain = !1,
                this.ending = !1,
                this.ended = !1,
                this.finished = !1,
                this.destroyed = !1;
                var o = !1 === t.decodeStrings;
                this.decodeStrings = !o,
                this.defaultEncoding = t.defaultEncoding || "utf8",
                this.length = 0,
                this.writing = !1,
                this.corked = 0,
                this.sync = !0,
                this.bufferProcessing = !1,
                this.onwrite = function(e) {
                    _(n, e)
                }
                ,
                this.writecb = null,
                this.writelen = 0,
                this.bufferedRequest = null,
                this.lastBufferedRequest = null,
                this.pendingcb = 0,
                this.prefinished = !1,
                this.errorEmitted = !1,
                this.emitClose = !1 !== t.emitClose,
                this.bufferedRequestCount = 0,
                this.corkedRequestsFree = new a(this)
            }
            function l(t) {
                I = I || e("./_stream_duplex");
                var n = this instanceof I;
                return n || q.call(l, this) ? void (this._writableState = new s(t,this,n),
                this.writable = !0,
                t && ("function" == typeof t.write && (this._write = t.write),
                "function" == typeof t.writev && (this._writev = t.writev),
                "function" == typeof t.destroy && (this._destroy = t.destroy),
                "function" == typeof t.final && (this._final = t.final)),
                R.call(this)) : new l(t)
            }
            function c(e, t) {
                var r = new W;
                e.emit("error", r),
                n.nextTick(t, r)
            }
            function u(e, t, r, a) {
                var o;
                return null === r ? o = new F : "string" != typeof r && !t.objectMode && (o = new D("chunk",["string", "Buffer"],r)),
                !o || (e.emit("error", o),
                n.nextTick(a, o),
                !1)
            }
            function f(e, t, n) {
                return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = B.from(t, n)),
                t
            }
            function p(e, t, n, r, a, o) {
                if (!n) {
                    var i = f(t, r, a);
                    r !== i && (n = !0,
                    a = "buffer",
                    r = i)
                }
                var d = t.objectMode ? 1 : r.length;
                t.length += d;
                var s = t.length < t.highWaterMark;
                if (s || (t.needDrain = !0),
                t.writing || t.corked) {
                    var l = t.lastBufferedRequest;
                    t.lastBufferedRequest = {
                        chunk: r,
                        encoding: a,
                        isBuf: n,
                        callback: o,
                        next: null
                    },
                    l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest,
                    t.bufferedRequestCount += 1
                } else
                    h(e, t, !1, d, r, a, o);
                return s
            }
            function h(e, t, n, r, a, o, i) {
                t.writelen = r,
                t.writecb = i,
                t.writing = !0,
                t.sync = !0,
                t.destroyed ? t.onwrite(new z("write")) : n ? e._writev(a, t.onwrite) : e._write(a, o, t.onwrite),
                t.sync = !1
            }
            function m(e, t, r, a, o) {
                --t.pendingcb,
                r ? (n.nextTick(o, a),
                n.nextTick(S, e, t),
                e._writableState.errorEmitted = !0,
                e.emit("error", a)) : (o(a),
                e._writableState.errorEmitted = !0,
                e.emit("error", a),
                S(e, t))
            }
            function g(e) {
                e.writing = !1,
                e.writecb = null,
                e.length -= e.writelen,
                e.writelen = 0
            }
            function _(e, t) {
                var r = e._writableState
                  , a = r.sync
                  , o = r.writecb;
                if ("function" != typeof o)
                    throw new j;
                if (g(r),
                t)
                    m(e, r, a, t, o);
                else {
                    var i = k(r) || e.destroyed;
                    i || r.corked || r.bufferProcessing || !r.bufferedRequest || w(e, r),
                    a ? n.nextTick(b, e, r, i, o) : b(e, r, i, o)
                }
            }
            function b(e, t, n, r) {
                n || y(e, t),
                t.pendingcb--,
                r(),
                S(e, t)
            }
            function y(e, t) {
                0 === t.length && t.needDrain && (t.needDrain = !1,
                e.emit("drain"))
            }
            function w(e, t) {
                t.bufferProcessing = !0;
                var n = t.bufferedRequest;
                if (e._writev && n && n.next) {
                    var r = t.bufferedRequestCount
                      , o = Array(r)
                      , i = t.corkedRequestsFree;
                    i.entry = n;
                    for (var d = 0, s = !0; n; )
                        o[d] = n,
                        n.isBuf || (s = !1),
                        n = n.next,
                        d += 1;
                    o.allBuffers = s,
                    h(e, t, !0, t.length, o, "", i.finish),
                    t.pendingcb++,
                    t.lastBufferedRequest = null,
                    i.next ? (t.corkedRequestsFree = i.next,
                    i.next = null) : t.corkedRequestsFree = new a(t),
                    t.bufferedRequestCount = 0
                } else {
                    for (; n; ) {
                        var l = n.chunk
                          , c = n.encoding
                          , u = n.callback
                          , f = t.objectMode ? 1 : l.length;
                        if (h(e, t, !1, f, l, c, u),
                        n = n.next,
                        t.bufferedRequestCount--,
                        t.writing)
                            break
                    }
                    null === n && (t.lastBufferedRequest = null)
                }
                t.bufferedRequest = n,
                t.bufferProcessing = !1
            }
            function k(e) {
                return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
            }
            function x(e, t) {
                e._final(function(n) {
                    t.pendingcb--,
                    n && e.emit("error", n),
                    t.prefinished = !0,
                    e.emit("prefinish"),
                    S(e, t)
                })
            }
            function v(e, t) {
                t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0,
                e.emit("prefinish")) : (t.pendingcb++,
                t.finalCalled = !0,
                n.nextTick(x, e, t)))
            }
            function S(e, t) {
                var n = k(t);
                return n && (v(e, t),
                0 === t.pendingcb && (t.finished = !0,
                e.emit("finish"))),
                n
            }
            function E(e, t, r) {
                t.ending = !0,
                S(e, t),
                r && (t.finished ? n.nextTick(r) : e.once("finish", r)),
                t.ended = !0,
                e.writable = !1
            }
            function C(e, t, n) {
                var r = e.entry;
                for (e.entry = null; r; ) {
                    var a = r.callback;
                    t.pendingcb--,
                    a(n),
                    r = r.next
                }
                t.corkedRequestsFree.next = e
            }
            t.exports = l;
            var I;
            l.WritableState = s;
            var T = {
                deprecate: e("util-deprecate")
            }
              , R = e("./internal/streams/stream")
              , B = e("buffer").Buffer
              , L = r.Uint8Array || function() {}
              , A = e("./internal/streams/destroy")
              , P = e("./internal/streams/state")
              , O = P.getHighWaterMark
              , U = e("../errors").codes
              , D = U.ERR_INVALID_ARG_TYPE
              , M = U.ERR_METHOD_NOT_IMPLEMENTED
              , j = U.ERR_MULTIPLE_CALLBACK
              , N = U.ERR_STREAM_CANNOT_PIPE
              , z = U.ERR_STREAM_DESTROYED
              , F = U.ERR_STREAM_NULL_VALUES
              , W = U.ERR_STREAM_WRITE_AFTER_END
              , H = U.ERR_UNKNOWN_ENCODING;
            e("inherits")(l, R),
            s.prototype.getBuffer = function() {
                for (var e = this.bufferedRequest, t = []; e; )
                    t.push(e),
                    e = e.next;
                return t
            }
            ,
            function() {
                try {
                    Object.defineProperty(s.prototype, "buffer", {
                        get: T.deprecate(function() {
                            return this.getBuffer()
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                    })
                } catch (e) {}
            }();
            var q;
            "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (q = Function.prototype[Symbol.hasInstance],
            Object.defineProperty(l, Symbol.hasInstance, {
                value: function(e) {
                    return !!q.call(this, e) || !(this !== l) && e && e._writableState instanceof s
                }
            })) : q = function(e) {
                return e instanceof this
            }
            ,
            l.prototype.pipe = function() {
                this.emit("error", new N)
            }
            ,
            l.prototype.write = function(e, t, n) {
                var r = this._writableState
                  , a = !1
                  , s = !r.objectMode && i(e);
                return s && !B.isBuffer(e) && (e = o(e)),
                "function" == typeof t && (n = t,
                t = null),
                s ? t = "buffer" : !t && (t = r.defaultEncoding),
                "function" != typeof n && (n = d),
                r.ending ? c(this, n) : (s || u(this, r, e, n)) && (r.pendingcb++,
                a = p(this, r, s, e, t, n)),
                a
            }
            ,
            l.prototype.cork = function() {
                this._writableState.corked++
            }
            ,
            l.prototype.uncork = function() {
                var e = this._writableState;
                e.corked && (e.corked--,
                !e.writing && !e.corked && !e.bufferProcessing && e.bufferedRequest && w(this, e))
            }
            ,
            l.prototype.setDefaultEncoding = function(e) {
                if ("string" == typeof e && (e = e.toLowerCase()),
                !(-1 < ["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase())))
                    throw new H(e);
                return this._writableState.defaultEncoding = e,
                this
            }
            ,
            Object.defineProperty(l.prototype, "writableBuffer", {
                enumerable: !1,
                get: function() {
                    return this._writableState && this._writableState.getBuffer()
                }
            }),
            Object.defineProperty(l.prototype, "writableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._writableState.highWaterMark
                }
            }),
            l.prototype._write = function(e, t, n) {
                n(new M("_write()"))
            }
            ,
            l.prototype._writev = null,
            l.prototype.end = function(e, t, n) {
                var r = this._writableState;
                return "function" == typeof e ? (n = e,
                e = null,
                t = null) : "function" == typeof t && (n = t,
                t = null),
                null !== e && void 0 !== e && this.write(e, t),
                r.corked && (r.corked = 1,
                this.uncork()),
                r.ending || E(this, r, n),
                this
            }
            ,
            Object.defineProperty(l.prototype, "writableLength", {
                enumerable: !1,
                get: function() {
                    return this._writableState.length
                }
            }),
            Object.defineProperty(l.prototype, "destroyed", {
                enumerable: !1,
                get: function() {
                    return void 0 !== this._writableState && this._writableState.destroyed
                },
                set: function(e) {
                    this._writableState && (this._writableState.destroyed = e)
                }
            }),
            l.prototype.destroy = A.destroy,
            l.prototype._undestroy = A.undestroy,
            l.prototype._destroy = function(e, t) {
                t(e)
            }
        }
        ).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {
        "../errors": 146,
        "./_stream_duplex": 148,
        "./internal/streams/destroy": 155,
        "./internal/streams/state": 158,
        "./internal/streams/stream": 159,
        _process: 137,
        buffer: 23,
        inherits: 60,
        "util-deprecate": 215
    }],
    153: [function(e, t) {
        (function(n) {
            'use strict';
            function r(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                e
            }
            function a(e, t) {
                return {
                    value: e,
                    done: t
                }
            }
            function o(e) {
                var t = e[l];
                if (null !== t) {
                    var n = e[m].read();
                    null !== n && (e[p] = null,
                    e[l] = null,
                    e[c] = null,
                    t(a(n, !1)))
                }
            }
            function i(e) {
                n.nextTick(o, e)
            }
            function d(e, t) {
                return function(n, r) {
                    e.then(function() {
                        return t[f] ? void n(a(void 0, !0)) : void t[h](n, r)
                    }, r)
                }
            }
            var s = e("./end-of-stream"), l = Symbol("lastResolve"), c = Symbol("lastReject"), u = Symbol("error"), f = Symbol("ended"), p = Symbol("lastPromise"), h = Symbol("handlePromise"), m = Symbol("stream"), g = Object.getPrototypeOf(function() {}), _ = Object.setPrototypeOf((b = {
                get stream() {
                    return this[m]
                },
                next: function() {
                    var e = this
                      , t = this[u];
                    if (null !== t)
                        return Promise.reject(t);
                    if (this[f])
                        return Promise.resolve(a(void 0, !0));
                    if (this[m].destroyed)
                        return new Promise(function(t, r) {
                            n.nextTick(function() {
                                e[u] ? r(e[u]) : t(a(void 0, !0))
                            })
                        }
                        );
                    var r = this[p], o;
                    if (r)
                        o = new Promise(d(r, this));
                    else {
                        var i = this[m].read();
                        if (null !== i)
                            return Promise.resolve(a(i, !1));
                        o = new Promise(this[h])
                    }
                    return this[p] = o,
                    o
                }
            },
            r(b, Symbol.asyncIterator, function() {
                return this
            }),
            r(b, "return", function() {
                var e = this;
                return new Promise(function(t, n) {
                    e[m].destroy(null, function(e) {
                        return e ? void n(e) : void t(a(void 0, !0))
                    })
                }
                )
            }),
            b), g), b;
            t.exports = function(e) {
                var t = Object.create(_, (n = {},
                r(n, m, {
                    value: e,
                    writable: !0
                }),
                r(n, l, {
                    value: null,
                    writable: !0
                }),
                r(n, c, {
                    value: null,
                    writable: !0
                }),
                r(n, u, {
                    value: null,
                    writable: !0
                }),
                r(n, f, {
                    value: e._readableState.endEmitted,
                    writable: !0
                }),
                r(n, h, {
                    value: function(e, n) {
                        var r = t[m].read();
                        r ? (t[p] = null,
                        t[l] = null,
                        t[c] = null,
                        e(a(r, !1))) : (t[l] = e,
                        t[c] = n)
                    },
                    writable: !0
                }),
                n)), n;
                return t[p] = null,
                s(e, function(e) {
                    if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                        var n = t[c];
                        return null !== n && (t[p] = null,
                        t[l] = null,
                        t[c] = null,
                        n(e)),
                        void (t[u] = e)
                    }
                    var r = t[l];
                    null !== r && (t[p] = null,
                    t[l] = null,
                    t[c] = null,
                    r(a(void 0, !0))),
                    t[f] = !0
                }),
                e.on("readable", i.bind(null, t)),
                t
            }
        }
        ).call(this, e("_process"))
    }
    , {
        "./end-of-stream": 156,
        _process: 137
    }],
    154: [function(e, t) {
        'use strict';
        function n(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null == arguments[t] ? {} : arguments[t]
                  , a = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols && (a = a.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable
                }))),
                a.forEach(function(t) {
                    r(e, t, n[t])
                })
            }
            return e
        }
        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        function a(e, t, n) {
            d.prototype.copy.call(e, t, n)
        }
        var o = e("buffer")
          , d = o.Buffer
          , s = e("util")
          , l = s.inspect
          , c = l && l.custom || "inspect";
        t.exports = function() {
            function e() {
                this.head = null,
                this.tail = null,
                this.length = 0
            }
            var t = e.prototype;
            return t.push = function(e) {
                var t = {
                    data: e,
                    next: null
                };
                0 < this.length ? this.tail.next = t : this.head = t,
                this.tail = t,
                ++this.length
            }
            ,
            t.unshift = function(e) {
                var t = {
                    data: e,
                    next: this.head
                };
                0 === this.length && (this.tail = t),
                this.head = t,
                ++this.length
            }
            ,
            t.shift = function() {
                if (0 !== this.length) {
                    var e = this.head.data;
                    return this.head = 1 === this.length ? this.tail = null : this.head.next,
                    --this.length,
                    e
                }
            }
            ,
            t.clear = function() {
                this.head = this.tail = null,
                this.length = 0
            }
            ,
            t.join = function(e) {
                if (0 === this.length)
                    return "";
                for (var t = this.head, n = "" + t.data; t = t.next; )
                    n += e + t.data;
                return n
            }
            ,
            t.concat = function(e) {
                if (0 === this.length)
                    return d.alloc(0);
                for (var t = d.allocUnsafe(e >>> 0), n = this.head, r = 0; n; )
                    a(n.data, t, r),
                    r += n.data.length,
                    n = n.next;
                return t
            }
            ,
            t.consume = function(e, t) {
                var n;
                return e < this.head.data.length ? (n = this.head.data.slice(0, e),
                this.head.data = this.head.data.slice(e)) : e === this.head.data.length ? n = this.shift() : n = t ? this._getString(e) : this._getBuffer(e),
                n
            }
            ,
            t.first = function() {
                return this.head.data
            }
            ,
            t._getString = function(e) {
                var t = this.head
                  , r = 1
                  , a = t.data;
                for (e -= a.length; t = t.next; ) {
                    var o = t.data
                      , i = e > o.length ? o.length : e;
                    if (a += i === o.length ? o : o.slice(0, e),
                    e -= i,
                    0 === e) {
                        i === o.length ? (++r,
                        this.head = t.next ? t.next : this.tail = null) : (this.head = t,
                        t.data = o.slice(i));
                        break
                    }
                    ++r
                }
                return this.length -= r,
                a
            }
            ,
            t._getBuffer = function(e) {
                var t = d.allocUnsafe(e)
                  , r = this.head
                  , a = 1;
                for (r.data.copy(t),
                e -= r.data.length; r = r.next; ) {
                    var o = r.data
                      , i = e > o.length ? o.length : e;
                    if (o.copy(t, t.length - e, 0, i),
                    e -= i,
                    0 === e) {
                        i === o.length ? (++a,
                        this.head = r.next ? r.next : this.tail = null) : (this.head = r,
                        r.data = o.slice(i));
                        break
                    }
                    ++a
                }
                return this.length -= a,
                t
            }
            ,
            t[c] = function(e, t) {
                return l(this, n({}, t, {
                    depth: 0,
                    customInspect: !1
                }))
            }
            ,
            e
        }()
    }
    , {
        buffer: 23,
        util: 17
    }],
    155: [function(e, t) {
        (function(e) {
            'use strict';
            function n(e, t) {
                a(e, t),
                r(e)
            }
            function r(e) {
                e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close")
            }
            function a(e, t) {
                e.emit("error", t)
            }
            t.exports = {
                destroy: function(t, o) {
                    var i = this
                      , d = this._readableState && this._readableState.destroyed
                      , s = this._writableState && this._writableState.destroyed;
                    return d || s ? (o ? o(t) : t && (!this._writableState || !this._writableState.errorEmitted) && e.nextTick(a, this, t),
                    this) : (this._readableState && (this._readableState.destroyed = !0),
                    this._writableState && (this._writableState.destroyed = !0),
                    this._destroy(t || null, function(t) {
                        !o && t ? (e.nextTick(n, i, t),
                        i._writableState && (i._writableState.errorEmitted = !0)) : o ? (e.nextTick(r, i),
                        o(t)) : e.nextTick(r, i)
                    }),
                    this)
                },
                undestroy: function() {
                    this._readableState && (this._readableState.destroyed = !1,
                    this._readableState.reading = !1,
                    this._readableState.ended = !1,
                    this._readableState.endEmitted = !1),
                    this._writableState && (this._writableState.destroyed = !1,
                    this._writableState.ended = !1,
                    this._writableState.ending = !1,
                    this._writableState.finalCalled = !1,
                    this._writableState.prefinished = !1,
                    this._writableState.finished = !1,
                    this._writableState.errorEmitted = !1)
                }
            }
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137
    }],
    156: [function(e, t) {
        'use strict';
        function n(e) {
            var t = !1;
            return function() {
                if (!t) {
                    t = !0;
                    for (var n = arguments.length, r = Array(n), a = 0; a < n; a++)
                        r[a] = arguments[a];
                    e.apply(this, r)
                }
            }
        }
        function r() {}
        function a(e) {
            return e.setHeader && "function" == typeof e.abort
        }
        function o(e, t, d) {
            if ("function" == typeof t)
                return o(e, null, t);
            t || (t = {}),
            d = n(d || r);
            var s = t.readable || !1 !== t.readable && e.readable
              , l = t.writable || !1 !== t.writable && e.writable
              , c = function() {
                e.writable || f()
            }
              , u = e._writableState && e._writableState.finished
              , f = function() {
                l = !1,
                u = !0,
                s || d.call(e)
            }
              , p = e._readableState && e._readableState.endEmitted
              , h = function() {
                s = !1,
                p = !0,
                l || d.call(e)
            }
              , m = function(t) {
                d.call(e, t)
            }
              , g = function() {
                var t;
                return s && !p ? (e._readableState && e._readableState.ended || (t = new i),
                d.call(e, t)) : l && !u ? (e._writableState && e._writableState.ended || (t = new i),
                d.call(e, t)) : void 0
            }
              , _ = function() {
                e.req.on("finish", f)
            };
            return a(e) ? (e.on("complete", f),
            e.on("abort", g),
            e.req ? _() : e.on("request", _)) : l && !e._writableState && (e.on("end", c),
            e.on("close", c)),
            e.on("end", h),
            e.on("finish", f),
            !1 !== t.error && e.on("error", m),
            e.on("close", g),
            function() {
                e.removeListener("complete", f),
                e.removeListener("abort", g),
                e.removeListener("request", _),
                e.req && e.req.removeListener("finish", f),
                e.removeListener("end", c),
                e.removeListener("close", c),
                e.removeListener("finish", f),
                e.removeListener("end", h),
                e.removeListener("error", m),
                e.removeListener("close", g)
            }
        }
        var i = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;
        t.exports = o
    }
    , {
        "../../../errors": 146
    }],
    157: [function(e, t) {
        'use strict';
        function n(e) {
            var t = !1;
            return function() {
                t || (t = !0,
                e.apply(void 0, arguments))
            }
        }
        function r(e) {
            if (e)
                throw e
        }
        function a(e) {
            return e.setHeader && "function" == typeof e.abort
        }
        function o(t, r, o, i) {
            i = n(i);
            var d = !1;
            t.on("close", function() {
                d = !0
            }),
            f === void 0 && (f = e("./end-of-stream")),
            f(t, {
                readable: r,
                writable: o
            }, function(e) {
                return e ? i(e) : void (d = !0,
                i())
            });
            var s = !1;
            return function(e) {
                if (!d)
                    return s ? void 0 : (s = !0,
                    a(t) ? t.abort() : "function" == typeof t.destroy ? t.destroy() : void i(e || new u("pipe")))
            }
        }
        function i(e) {
            e()
        }
        function d(e, t) {
            return e.pipe(t)
        }
        function s(e) {
            return e.length ? "function" == typeof e[e.length - 1] ? e.pop() : r : r
        }
        var l = e("../../../errors").codes, c = l.ERR_MISSING_ARGS, u = l.ERR_STREAM_DESTROYED, f;
        t.exports = function() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            var r = s(t);
            if (Array.isArray(t[0]) && (t = t[0]),
            2 > t.length)
                throw new c("streams");
            var a = t.map(function(e, n) {
                var d = n < t.length - 1;
                return o(e, d, 0 < n, function(e) {
                    l || (l = e),
                    e && a.forEach(i),
                    d || (a.forEach(i),
                    r(l))
                })
            }), l;
            return t.reduce(d)
        }
    }
    , {
        "../../../errors": 146,
        "./end-of-stream": 156
    }],
    158: [function(e, t) {
        'use strict';
        var r = Math.floor;
        function n(e, t, n) {
            return null == e.highWaterMark ? t ? e[n] : null : e.highWaterMark
        }
        var a = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
        t.exports = {
            getHighWaterMark: function(e, t, o, i) {
                var d = n(t, i, o);
                if (null != d) {
                    if (!(isFinite(d) && r(d) === d) || 0 > d) {
                        var s = i ? o : "highWaterMark";
                        throw new a(s,d)
                    }
                    return r(d)
                }
                return e.objectMode ? 16 : 16384
            }
        }
    }
    , {
        "../../../errors": 146
    }],
    159: [function(e, t) {
        t.exports = e("events").EventEmitter
    }
    , {
        events: 53
    }],
    160: [function(e, t, n) {
        n = t.exports = e("./lib/_stream_readable.js"),
        n.Stream = n,
        n.Readable = n,
        n.Writable = e("./lib/_stream_writable.js"),
        n.Duplex = e("./lib/_stream_duplex.js"),
        n.Transform = e("./lib/_stream_transform.js"),
        n.PassThrough = e("./lib/_stream_passthrough.js"),
        n.finished = e("./lib/internal/streams/end-of-stream.js"),
        n.pipeline = e("./lib/internal/streams/pipeline.js")
    }
    , {
        "./lib/_stream_duplex.js": 148,
        "./lib/_stream_passthrough.js": 149,
        "./lib/_stream_readable.js": 150,
        "./lib/_stream_transform.js": 151,
        "./lib/_stream_writable.js": 152,
        "./lib/internal/streams/end-of-stream.js": 156,
        "./lib/internal/streams/pipeline.js": 157
    }],
    161: [function(e, t, n) {
        function r(e, t, n, r) {
            function o() {
                return !("number" == typeof e.length && e.length > n.maxBlobLength) || (l("File length too large for Blob URL approach: %d (max: %d)", e.length, n.maxBlobLength),
                S(new Error("File length too large for Blob URL approach: " + e.length + " (max: " + n.maxBlobLength + ")")),
                !1)
            }
            function d(n) {
                o() && (I = t(n),
                a(e, function(e, t) {
                    return e ? S(e) : void (I.addEventListener("error", S),
                    I.addEventListener("loadstart", s),
                    I.addEventListener("canplay", p),
                    I.src = t)
                }))
            }
            function s() {
                I.removeEventListener("loadstart", s),
                n.autoplay && I.play()
            }
            function p() {
                I.removeEventListener("canplay", p),
                r(null, I)
            }
            function v() {
                a(e, function(e, n) {
                    return e ? S(e) : void (".pdf" === E ? (I = t("object"),
                    I.setAttribute("typemustmatch", !0),
                    I.setAttribute("type", "application/pdf"),
                    I.setAttribute("data", n)) : (I = t("iframe"),
                    I.sandbox = "allow-forms allow-scripts",
                    I.src = n),
                    r(null, I))
                })
            }
            function S(t) {
                t.message = "Error rendering file \"" + e.name + "\": " + t.message,
                l(t.message),
                r(t)
            }
            var E = f.extname(e.name).toLowerCase(), C = 0, I;
            0 <= _.indexOf(E) ? function() {
                function n() {
                    l("Use `videostream` package for " + e.name),
                    _(),
                    I.addEventListener("error", c),
                    I.addEventListener("loadstart", s),
                    I.addEventListener("canplay", p),
                    h(e, I)
                }
                function r() {
                    l("Use MediaSource API for " + e.name),
                    _(),
                    I.addEventListener("error", f),
                    I.addEventListener("loadstart", s),
                    I.addEventListener("canplay", p);
                    var t = new u(I)
                      , n = t.createWriteStream(i(e.name));
                    e.createReadStream().pipe(n),
                    C && (I.currentTime = C)
                }
                function d() {
                    l("Use Blob URL for " + e.name),
                    _(),
                    I.addEventListener("error", S),
                    I.addEventListener("loadstart", s),
                    I.addEventListener("canplay", p),
                    a(e, function(e, t) {
                        return e ? S(e) : void (I.src = t,
                        C && (I.currentTime = C))
                    })
                }
                function c(e) {
                    l("videostream error: fallback to MediaSource API: %o", e.message || e),
                    I.removeEventListener("error", c),
                    I.removeEventListener("canplay", p),
                    r()
                }
                function f(e) {
                    l("MediaSource API error: fallback to Blob URL: %o", e.message || e);
                    o() && (I.removeEventListener("error", f),
                    I.removeEventListener("canplay", p),
                    d())
                }
                function _() {
                    I || (I = t(b),
                    I.addEventListener("progress", function() {
                        C = I.currentTime
                    }))
                }
                var b = 0 <= g.indexOf(E) ? "video" : "audio";
                x ? 0 <= m.indexOf(E) ? n() : r() : d()
            }() : 0 <= b.indexOf(E) ? d("video") : 0 <= y.indexOf(E) ? d("audio") : 0 <= w.indexOf(E) ? function() {
                I = t("img"),
                a(e, function(t, n) {
                    return t ? S(t) : void (I.src = n,
                    I.alt = e.name,
                    r(null, I))
                })
            }() : 0 <= k.indexOf(E) ? v() : function() {
                function t() {
                    c(n) ? (l("File extension \"%s\" appears ascii, so will render.", E),
                    v()) : (l("File extension \"%s\" appears non-ascii, will not render.", E),
                    r(new Error("Unsupported file type \"" + E + "\": Cannot append to DOM")))
                }
                l("Unknown file extension \"%s\" - will attempt to render into iframe", E);
                var n = "";
                e.createReadStream({
                    start: 0,
                    end: 1e3
                }).setEncoding("utf8").on("data", function(e) {
                    n += e
                }).on("end", t).on("error", r)
            }()
        }
        function a(e, t) {
            var r = f.extname(e.name).toLowerCase();
            p(e.createReadStream(), n.mime[r]).then(e=>t(null, e), e=>t(e))
        }
        function o(e) {
            if (null == e)
                throw new Error("file cannot be null or undefined");
            if ("string" != typeof e.name)
                throw new Error("missing or invalid file.name property");
            if ("function" != typeof e.createReadStream)
                throw new Error("missing or invalid file.createReadStream property")
        }
        function i(e) {
            var t = f.extname(e).toLowerCase();
            return {
                ".m4a": "audio/mp4; codecs=\"mp4a.40.5\"",
                ".m4b": "audio/mp4; codecs=\"mp4a.40.5\"",
                ".m4p": "audio/mp4; codecs=\"mp4a.40.5\"",
                ".m4v": "video/mp4; codecs=\"avc1.640029, mp4a.40.5\"",
                ".mkv": "video/webm; codecs=\"avc1.640029, mp4a.40.5\"",
                ".mp3": "audio/mpeg",
                ".mp4": "video/mp4; codecs=\"avc1.640029, mp4a.40.5\"",
                ".webm": "video/webm; codecs=\"vorbis, vp8\""
            }[t]
        }
        function d(e) {
            null == e.autoplay && (e.autoplay = !1),
            null == e.muted && (e.muted = !1),
            null == e.controls && (e.controls = !0),
            null == e.maxBlobLength && (e.maxBlobLength = 200000000)
        }
        function s(e, t) {
            e.autoplay = !!t.autoplay,
            e.muted = !!t.muted,
            e.controls = !!t.controls
        }
        n.render = function(e, t, n, a) {
            "function" == typeof n && (a = n,
            n = {}),
            n || (n = {}),
            a || (a = function() {}
            ),
            o(e),
            d(n),
            "string" == typeof t && (t = document.querySelector(t)),
            r(e, function(r) {
                if (t.nodeName !== r.toUpperCase()) {
                    var a = f.extname(e.name).toLowerCase();
                    throw new Error("Cannot render \"" + a + "\" inside a \"" + t.nodeName.toLowerCase() + "\" element, expected \"" + r + "\"")
                }
                return ("video" === r || "audio" === r) && s(t, n),
                t
            }, n, a)
        }
        ,
        n.append = function(e, t, n, a) {
            function i(e) {
                var r = l(e);
                return s(r, n),
                t.appendChild(r),
                r
            }
            function l(e) {
                var n = document.createElement(e);
                return t.appendChild(n),
                n
            }
            function c(e, t) {
                e && t && t.remove(),
                a(e, t)
            }
            if ("function" == typeof n && (a = n,
            n = {}),
            n || (n = {}),
            a || (a = function() {}
            ),
            o(e),
            d(n),
            "string" == typeof t && (t = document.querySelector(t)),
            t && ("VIDEO" === t.nodeName || "AUDIO" === t.nodeName))
                throw new Error("Invalid video/audio node argument. Argument must be root element that video/audio tag will be appended to.");
            r(e, function(e) {
                return "video" === e || "audio" === e ? i(e) : l(e)
            }, n, c)
        }
        ,
        n.mime = e("./lib/mime.json");
        var l = e("debug")("render-media")
          , c = e("is-ascii")
          , u = e("mediasource")
          , f = e("path")
          , p = e("stream-to-blob-url")
          , h = e("videostream")
          , m = [".m4a", ".m4b", ".m4p", ".m4v", ".mp4"]
          , g = [".m4v", ".mkv", ".mp4", ".webm"]
          , _ = [].concat(g, [".m4a", ".m4b", ".m4p", ".mp3"])
          , b = [".mov", ".ogv"]
          , y = [".aac", ".oga", ".ogg", ".wav", ".flac"]
          , w = [".bmp", ".gif", ".jpeg", ".jpg", ".png", ".svg"]
          , k = [".css", ".html", ".js", ".md", ".pdf", ".txt"]
          , x = "undefined" != typeof window && window.MediaSource
    }
    , {
        "./lib/mime.json": 162,
        debug: 49,
        "is-ascii": 61,
        mediasource: 104,
        path: 133,
        "stream-to-blob-url": 194,
        videostream: 217
    }],
    162: [function(e, t) {
        t.exports = {
            ".3gp": "video/3gpp",
            ".aac": "audio/aac",
            ".aif": "audio/x-aiff",
            ".aiff": "audio/x-aiff",
            ".atom": "application/atom+xml",
            ".avi": "video/x-msvideo",
            ".bmp": "image/bmp",
            ".bz2": "application/x-bzip2",
            ".conf": "text/plain",
            ".css": "text/css",
            ".csv": "text/plain",
            ".diff": "text/x-diff",
            ".doc": "application/msword",
            ".flv": "video/x-flv",
            ".gif": "image/gif",
            ".gz": "application/x-gzip",
            ".htm": "text/html",
            ".html": "text/html",
            ".ico": "image/vnd.microsoft.icon",
            ".ics": "text/calendar",
            ".iso": "application/octet-stream",
            ".jar": "application/java-archive",
            ".jpeg": "image/jpeg",
            ".jpg": "image/jpeg",
            ".js": "application/javascript",
            ".json": "application/json",
            ".less": "text/css",
            ".log": "text/plain",
            ".m3u": "audio/x-mpegurl",
            ".m4a": "audio/x-m4a",
            ".m4b": "audio/mp4",
            ".m4p": "audio/mp4",
            ".m4v": "video/x-m4v",
            ".manifest": "text/cache-manifest",
            ".markdown": "text/x-markdown",
            ".mathml": "application/mathml+xml",
            ".md": "text/x-markdown",
            ".mid": "audio/midi",
            ".midi": "audio/midi",
            ".mov": "video/quicktime",
            ".mp3": "audio/mpeg",
            ".mp4": "video/mp4",
            ".mp4v": "video/mp4",
            ".mpeg": "video/mpeg",
            ".mpg": "video/mpeg",
            ".odp": "application/vnd.oasis.opendocument.presentation",
            ".ods": "application/vnd.oasis.opendocument.spreadsheet",
            ".odt": "application/vnd.oasis.opendocument.text",
            ".oga": "audio/ogg",
            ".ogg": "application/ogg",
            ".pdf": "application/pdf",
            ".png": "image/png",
            ".pps": "application/vnd.ms-powerpoint",
            ".ppt": "application/vnd.ms-powerpoint",
            ".ps": "application/postscript",
            ".psd": "image/vnd.adobe.photoshop",
            ".qt": "video/quicktime",
            ".rar": "application/x-rar-compressed",
            ".rdf": "application/rdf+xml",
            ".rss": "application/rss+xml",
            ".rtf": "application/rtf",
            ".svg": "image/svg+xml",
            ".svgz": "image/svg+xml",
            ".swf": "application/x-shockwave-flash",
            ".tar": "application/x-tar",
            ".tbz": "application/x-bzip-compressed-tar",
            ".text": "text/plain",
            ".tif": "image/tiff",
            ".tiff": "image/tiff",
            ".torrent": "application/x-bittorrent",
            ".ttf": "application/x-font-ttf",
            ".txt": "text/plain",
            ".wav": "audio/wav",
            ".webm": "video/webm",
            ".wma": "audio/x-ms-wma",
            ".wmv": "video/x-ms-wmv",
            ".xls": "application/vnd.ms-excel",
            ".xml": "application/xml",
            ".yaml": "text/yaml",
            ".yml": "text/yaml",
            ".zip": "application/zip"
        }
    }
    , {}],
    163: [function(e, t) {
        (function(e) {
            t.exports = function(t, n, r) {
                function a(t) {
                    function n() {
                        r && r(t, d),
                        r = null
                    }
                    i ? e.nextTick(n) : n()
                }
                function o(e, n, r) {
                    if (d[e] = r,
                    n && (u = !0),
                    0 == --l || n)
                        a(n);
                    else if (!u && f < s) {
                        var i;
                        c ? (i = c[f],
                        f += 1,
                        t[i](function(e, t) {
                            o(i, e, t)
                        })) : (i = f,
                        f += 1,
                        t[i](function(e, t) {
                            o(i, e, t)
                        }))
                    }
                }
                if ("number" != typeof n)
                    throw new Error("second argument must be a Number");
                var i = !0, d, s, l, c, u;
                Array.isArray(t) ? (d = [],
                l = s = t.length) : (c = Object.keys(t),
                d = {},
                l = s = c.length);
                var f = n;
                l ? c ? c.some(function(e, r) {
                    if (t[e](function(t, n) {
                        o(e, t, n)
                    }),
                    r === n - 1)
                        return !0
                }) : t.some(function(e, t) {
                    if (e(function(e, n) {
                        o(t, e, n)
                    }),
                    t === n - 1)
                        return !0
                }) : a(null),
                i = !1
            }
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137
    }],
    164: [function(e, t) {
        (function(e) {
            t.exports = function(t, n) {
                function r(t) {
                    function r() {
                        n && n(t, d),
                        n = null
                    }
                    o ? e.nextTick(r) : r()
                }
                function a(e, t, n) {
                    d[e] = n,
                    (0 == --s || t) && r(t)
                }
                var o = !0, d, s, l;
                Array.isArray(t) ? (d = [],
                s = t.length) : (l = Object.keys(t),
                d = {},
                s = l.length),
                s ? l ? l.forEach(function(e) {
                    t[e](function(t, n) {
                        a(e, t, n)
                    })
                }) : t.forEach(function(e, t) {
                    e(function(e, n) {
                        a(t, e, n)
                    })
                }) : r(null),
                o = !1
            }
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137
    }],
    165: [function(e, t, n) {
        var r = Math.min;
        (function(e, r) {
            "object" == typeof n && "object" == typeof t ? t.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof n ? n.Rusha = r() : e.Rusha = r()
        }
        )("undefined" == typeof self ? this : self, function() {
            return function(e) {
                function t(r) {
                    if (n[r])
                        return n[r].exports;
                    var a = n[r] = {
                        i: r,
                        l: !1,
                        exports: {}
                    };
                    return e[r].call(a.exports, a, a.exports, t),
                    a.l = !0,
                    a.exports
                }
                var n = {};
                return t.m = e,
                t.c = n,
                t.d = function(e, n, r) {
                    t.o(e, n) || Object.defineProperty(e, n, {
                        configurable: !1,
                        enumerable: !0,
                        get: r
                    })
                }
                ,
                t.n = function(e) {
                    var n = e && e.__esModule ? function() {
                        return e["default"]
                    }
                    : function() {
                        return e
                    }
                    ;
                    return t.d(n, "a", n),
                    n
                }
                ,
                t.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                ,
                t.p = "",
                t(t.s = 3)
            }([function(e, t, n) {
                function a(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }
                var o = n(5)
                  , i = n(1)
                  , d = i.toHex
                  , s = i.ceilHeapSize
                  , l = n(6)
                  , c = function(e) {
                    for (e += 9; 0 < e % 64; e += 1)
                        ;
                    return e
                }
                  , u = function(e, t) {
                    var n = new Uint8Array(e.buffer)
                      , r = t % 4
                      , a = t - r;
                    switch (r) {
                    case 0:
                        n[a + 3] = 0;
                    case 1:
                        n[a + 2] = 0;
                    case 2:
                        n[a + 1] = 0;
                    case 3:
                        n[a + 0] = 0;
                    }
                    for (var o = (t >> 2) + 1; o < e.length; o++)
                        e[o] = 0
                }
                  , f = function(e, t, n) {
                    e[t >> 2] |= 128 << 24 - (t % 4 << 3),
                    e[(-16 & (t >> 2) + 2) + 14] = 0 | n / 536870912,
                    e[(-16 & (t >> 2) + 2) + 15] = n << 3
                }
                  , p = function(e, t) {
                    var n = new Int32Array(e,t + 320,5)
                      , r = new Int32Array(5)
                      , a = new DataView(r.buffer);
                    return a.setInt32(0, n[0], !1),
                    a.setInt32(4, n[1], !1),
                    a.setInt32(8, n[2], !1),
                    a.setInt32(12, n[3], !1),
                    a.setInt32(16, n[4], !1),
                    r
                }
                  , h = function() {
                    function e(t) {
                        if (a(this, e),
                        t = t || 65536,
                        0 < t % 64)
                            throw new Error("Chunk size must be a multiple of 128 bit");
                        this._offset = 0,
                        this._maxChunkLen = t,
                        this._padMaxChunkLen = c(t),
                        this._heap = new ArrayBuffer(s(this._padMaxChunkLen + 320 + 20)),
                        this._h32 = new Int32Array(this._heap),
                        this._h8 = new Int8Array(this._heap),
                        this._core = new o({
                            Int32Array: Int32Array
                        },{},this._heap)
                    }
                    return e.prototype._initState = function(e, t) {
                        this._offset = 0;
                        var n = new Int32Array(e,t + 320,5);
                        n[0] = 1732584193,
                        n[1] = -271733879,
                        n[2] = -1732584194,
                        n[3] = 271733878,
                        n[4] = -1009589776
                    }
                    ,
                    e.prototype._padChunk = function(e, t) {
                        var n = c(e)
                          , r = new Int32Array(this._heap,0,n >> 2);
                        return u(r, e),
                        f(r, e, t),
                        n
                    }
                    ,
                    e.prototype._write = function(e, t, n, r) {
                        l(e, this._h8, this._h32, t, n, r || 0)
                    }
                    ,
                    e.prototype._coreCall = function(e, t, n, r, a) {
                        var o = n;
                        this._write(e, t, n),
                        a && (o = this._padChunk(n, r)),
                        this._core.hash(o, this._padMaxChunkLen)
                    }
                    ,
                    e.prototype.rawDigest = function(e) {
                        var t = e.byteLength || e.length || e.size || 0;
                        this._initState(this._heap, this._padMaxChunkLen);
                        var n = 0
                          , r = this._maxChunkLen;
                        for (n = 0; t > n + r; n += r)
                            this._coreCall(e, n, r, t, !1);
                        return this._coreCall(e, n, t - n, t, !0),
                        p(this._heap, this._padMaxChunkLen)
                    }
                    ,
                    e.prototype.digest = function(e) {
                        return d(this.rawDigest(e).buffer)
                    }
                    ,
                    e.prototype.digestFromString = function(e) {
                        return this.digest(e)
                    }
                    ,
                    e.prototype.digestFromBuffer = function(e) {
                        return this.digest(e)
                    }
                    ,
                    e.prototype.digestFromArrayBuffer = function(e) {
                        return this.digest(e)
                    }
                    ,
                    e.prototype.resetState = function() {
                        return this._initState(this._heap, this._padMaxChunkLen),
                        this
                    }
                    ,
                    e.prototype.append = function(e) {
                        var t = 0
                          , n = e.byteLength || e.length || e.size || 0
                          , a = this._offset % this._maxChunkLen
                          , o = void 0;
                        for (this._offset += n; t < n; )
                            o = r(n - t, this._maxChunkLen - a),
                            this._write(e, t, o, a),
                            a += o,
                            t += o,
                            a === this._maxChunkLen && (this._core.hash(this._maxChunkLen, this._padMaxChunkLen),
                            a = 0);
                        return this
                    }
                    ,
                    e.prototype.getState = function() {
                        var e = this._offset % this._maxChunkLen
                          , t = void 0;
                        if (!e) {
                            var n = new Int32Array(this._heap,this._padMaxChunkLen + 320,5);
                            t = n.buffer.slice(n.byteOffset, n.byteOffset + n.byteLength)
                        } else
                            t = this._heap.slice(0);
                        return {
                            offset: this._offset,
                            heap: t
                        }
                    }
                    ,
                    e.prototype.setState = function(e) {
                        if (this._offset = e.offset,
                        20 === e.heap.byteLength) {
                            var t = new Int32Array(this._heap,this._padMaxChunkLen + 320,5);
                            t.set(new Int32Array(e.heap))
                        } else
                            this._h32.set(new Int32Array(e.heap));
                        return this
                    }
                    ,
                    e.prototype.rawEnd = function() {
                        var e = this._offset
                          , t = e % this._maxChunkLen
                          , n = this._padChunk(t, e);
                        this._core.hash(n, this._padMaxChunkLen);
                        var r = p(this._heap, this._padMaxChunkLen);
                        return this._initState(this._heap, this._padMaxChunkLen),
                        r
                    }
                    ,
                    e.prototype.end = function() {
                        return d(this.rawEnd().buffer)
                    }
                    ,
                    e
                }();
                e.exports = h,
                e.exports._core = o
            }
            , function(e) {
                for (var t = Array(256), n = 0; 256 > n; n++)
                    t[n] = (16 > n ? "0" : "") + n.toString(16);
                e.exports.toHex = function(e) {
                    for (var n = new Uint8Array(e), r = Array(e.byteLength), a = 0; a < r.length; a++)
                        r[a] = t[n[a]];
                    return r.join("")
                }
                ,
                e.exports.ceilHeapSize = function(e) {
                    var t = 0;
                    if (65536 >= e)
                        return 65536;
                    if (16777216 > e)
                        for (t = 1; t < e; t <<= 1)
                            ;
                    else
                        for (t = 16777216; t < e; t += 16777216)
                            ;
                    return t
                }
                ,
                e.exports.isDedicatedWorkerScope = function(e) {
                    var t = "WorkerGlobalScope"in e && e instanceof e.WorkerGlobalScope
                      , n = "SharedWorkerGlobalScope"in e && e instanceof e.SharedWorkerGlobalScope
                      , r = "ServiceWorkerGlobalScope"in e && e instanceof e.ServiceWorkerGlobalScope;
                    return t && !n && !r
                }
            }
            , function(e, t, n) {
                e.exports = function() {
                    var e = n(0)
                      , t = function(e, t, n) {
                        try {
                            return n(null, e.digest(t))
                        } catch (t) {
                            return n(t)
                        }
                    }
                      , r = function(e, t, n, a, o) {
                        var i = new self.FileReader;
                        i.onloadend = function() {
                            if (i.error)
                                return o(i.error);
                            var d = i.result;
                            t += i.result.byteLength;
                            try {
                                e.append(d)
                            } catch (t) {
                                return void o(t)
                            }
                            t < a.size ? r(e, t, n, a, o) : o(null, e.end())
                        }
                        ,
                        i.readAsArrayBuffer(a.slice(t, t + n))
                    }
                      , a = !0;
                    return self.onmessage = function(n) {
                        if (a) {
                            var o = n.data.data
                              , i = n.data.file
                              , d = n.data.id;
                            if ("undefined" != typeof d && (i || o)) {
                                var s = n.data.blockSize || 4194304
                                  , l = new e(s);
                                l.resetState();
                                var c = function(e, t) {
                                    e ? self.postMessage({
                                        id: d,
                                        error: e.name
                                    }) : self.postMessage({
                                        id: d,
                                        hash: t
                                    })
                                };
                                o && t(l, o, c),
                                i && r(l, 0, s, i, c)
                            }
                        }
                    }
                    ,
                    function() {
                        a = !1
                    }
                }
            }
            , function(e, t, n) {
                var r = n(4)
                  , a = n(0)
                  , o = n(7)
                  , i = n(2)
                  , d = n(1)
                  , s = d.isDedicatedWorkerScope
                  , l = "undefined" != typeof self && s(self);
                a.disableWorkerBehaviour = l ? i() : function() {}
                ,
                a.createWorker = function() {
                    var e = r(2)
                      , t = e.terminate;
                    return e.terminate = function() {
                        URL.revokeObjectURL(e.objectURL),
                        t.call(e)
                    }
                    ,
                    e
                }
                ,
                a.createHash = o,
                e.exports = a
            }
            , function(e, t, n) {
                function r(e) {
                    function t(r) {
                        if (n[r])
                            return n[r].exports;
                        var a = n[r] = {
                            i: r,
                            l: !1,
                            exports: {}
                        };
                        return e[r].call(a.exports, a, a.exports, t),
                        a.l = !0,
                        a.exports
                    }
                    var n = {};
                    t.m = e,
                    t.c = n,
                    t.i = function(e) {
                        return e
                    }
                    ,
                    t.d = function(e, n, r) {
                        t.o(e, n) || Object.defineProperty(e, n, {
                            configurable: !1,
                            enumerable: !0,
                            get: r
                        })
                    }
                    ,
                    t.r = function(e) {
                        Object.defineProperty(e, "__esModule", {
                            value: !0
                        })
                    }
                    ,
                    t.n = function(e) {
                        var n = e && e.__esModule ? function() {
                            return e["default"]
                        }
                        : function() {
                            return e
                        }
                        ;
                        return t.d(n, "a", n),
                        n
                    }
                    ,
                    t.o = function(e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t)
                    }
                    ,
                    t.p = "/",
                    t.oe = function(e) {
                        throw console.error(e),
                        e
                    }
                    ;
                    var r = t(t.s = ENTRY_MODULE);
                    return r.default || r
                }
                function a(e) {
                    return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
                }
                function o(e, t, r) {
                    var o = {};
                    o[r] = [];
                    var i = t.toString()
                      , d = i.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);
                    if (!d)
                        return o;
                    for (var s = d[1], l = new RegExp("(\\\\n|\\W)" + a(s) + "\\((/\\*.*?\\*/)?s?.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)","g"), c; c = l.exec(i); )
                        "dll-reference" !== c[3] && o[r].push(c[3]);
                    for (l = new RegExp("\\(" + a(s) + "\\(\"(dll-reference\\s([\\.|\\-|\\+|\\w|/|@]+))\"\\)\\)\\((/\\*.*?\\*/)?s?.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)","g"); c = l.exec(i); )
                        e[c[2]] || (o[r].push(c[1]),
                        e[c[2]] = n(c[1]).m),
                        o[c[2]] = o[c[2]] || [],
                        o[c[2]].push(c[4]);
                    return o
                }
                function d(e) {
                    var t = Object.keys(e);
                    return t.reduce(function(t, n) {
                        return t || 0 < e[n].length
                    }, !1)
                }
                function s(e, t) {
                    for (var n = {
                        main: [t]
                    }, r = {
                        main: []
                    }, a = {
                        main: {}
                    }; d(n); )
                        for (var s = Object.keys(n), l = 0; l < s.length; l++) {
                            var c = s[l]
                              , u = n[c]
                              , f = u.pop();
                            if (a[c] = a[c] || {},
                            !a[c][f] && e[c][f]) {
                                a[c][f] = !0,
                                r[c] = r[c] || [],
                                r[c].push(f);
                                for (var p = o(e, e[c][f], c), h = Object.keys(p), m = 0; m < h.length; m++)
                                    n[h[m]] = n[h[m]] || [],
                                    n[h[m]] = n[h[m]].concat(p[h[m]])
                            }
                        }
                    return r
                }
                e.exports = function(e, t) {
                    t = t || {};
                    var a = {
                        main: n.m
                    }
                      , o = t.all ? {
                        main: Object.keys(a)
                    } : s(a, e)
                      , i = "";
                    Object.keys(o).filter(function(e) {
                        return "main" !== e
                    }).forEach(function(e) {
                        for (var t = 0; o[e][t]; )
                            t++;
                        o[e].push(t),
                        a[e][t] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })",
                        i = i + "var " + e + " = (" + r.toString().replace("ENTRY_MODULE", JSON.stringify(t)) + ")({" + o[e].map(function(t) {
                            return "" + JSON.stringify(t) + ": " + a[e][t].toString()
                        }).join(",") + "});\n"
                    }),
                    i = i + "(" + r.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + o.main.map(function(e) {
                        return "" + JSON.stringify(e) + ": " + a.main[e].toString()
                    }).join(",") + "})(self);";
                    var d = new window.Blob([i],{
                        type: "text/javascript"
                    });
                    if (t.bare)
                        return d;
                    var l = window.URL || window.webkitURL || window.mozURL || window.msURL
                      , c = l.createObjectURL(d)
                      , u = new window.Worker(c);
                    return u.objectURL = c,
                    u
                }
            }
            , function(e) {
                e.exports = function(e, t, n) {
                    'use asm';
                    var r = new e.Int32Array(n);
                    return {
                        hash: function(e, t) {
                            e |= 0,
                            t |= 0;
                            var n = 0
                              , a = 0
                              , o = 0
                              , i = 0
                              , d = 0
                              , s = 0
                              , l = 0
                              , c = 0
                              , u = 0
                              , f = 0
                              , p = 0
                              , h = 0
                              , m = 0
                              , g = 0;
                            for (o = 0 | r[t + 320 >> 2],
                            d = 0 | r[t + 324 >> 2],
                            l = 0 | r[t + 328 >> 2],
                            u = 0 | r[t + 332 >> 2],
                            p = 0 | r[t + 336 >> 2],
                            n = 0; (0 | n) < (0 | e); n = 0 | n + 64) {
                                for (i = o,
                                s = d,
                                c = l,
                                f = u,
                                h = p,
                                a = 0; 64 > (0 | a); a = 0 | a + 4)
                                    g = 0 | r[n + a >> 2],
                                    m = 0 | (0 | (o << 5 | o >>> 27) + (d & l | ~d & u)) + (0 | (0 | g + p) + 1518500249),
                                    p = u,
                                    u = l,
                                    l = d << 30 | d >>> 2,
                                    d = o,
                                    o = m,
                                    r[e + a >> 2] = g;
                                for (a = 0 | e + 64; (0 | a) < (0 | e + 80); a = 0 | a + 4)
                                    g = (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) << 1 | (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) >>> 31,
                                    m = 0 | (0 | (o << 5 | o >>> 27) + (d & l | ~d & u)) + (0 | (0 | g + p) + 1518500249),
                                    p = u,
                                    u = l,
                                    l = d << 30 | d >>> 2,
                                    d = o,
                                    o = m,
                                    r[a >> 2] = g;
                                for (a = 0 | e + 80; (0 | a) < (0 | e + 160); a = 0 | a + 4)
                                    g = (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) << 1 | (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) >>> 31,
                                    m = 0 | (0 | (o << 5 | o >>> 27) + (d ^ l ^ u)) + (0 | (0 | g + p) + 1859775393),
                                    p = u,
                                    u = l,
                                    l = d << 30 | d >>> 2,
                                    d = o,
                                    o = m,
                                    r[a >> 2] = g;
                                for (a = 0 | e + 160; (0 | a) < (0 | e + 240); a = 0 | a + 4)
                                    g = (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) << 1 | (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) >>> 31,
                                    m = 0 | (0 | (o << 5 | o >>> 27) + (d & l | d & u | l & u)) + (0 | (0 | g + p) - 1894007588),
                                    p = u,
                                    u = l,
                                    l = d << 30 | d >>> 2,
                                    d = o,
                                    o = m,
                                    r[a >> 2] = g;
                                for (a = 0 | e + 240; (0 | a) < (0 | e + 320); a = 0 | a + 4)
                                    g = (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) << 1 | (r[a - 12 >> 2] ^ r[a - 32 >> 2] ^ r[a - 56 >> 2] ^ r[a - 64 >> 2]) >>> 31,
                                    m = 0 | (0 | (o << 5 | o >>> 27) + (d ^ l ^ u)) + (0 | (0 | g + p) - 899497514),
                                    p = u,
                                    u = l,
                                    l = d << 30 | d >>> 2,
                                    d = o,
                                    o = m,
                                    r[a >> 2] = g;
                                o = 0 | o + i,
                                d = 0 | d + s,
                                l = 0 | l + c,
                                u = 0 | u + f,
                                p = 0 | p + h
                            }
                            r[t + 320 >> 2] = o,
                            r[t + 324 >> 2] = d,
                            r[t + 328 >> 2] = l,
                            r[t + 332 >> 2] = u,
                            r[t + 336 >> 2] = p
                        }
                    }
                }
            }
            , function(e) {
                var t = this
                  , n = void 0;
                "undefined" != typeof self && "undefined" != typeof self.FileReaderSync && (n = new self.FileReaderSync);
                var r = function(e, t, n, r, a, o) {
                    var d = o % 4, s = (a + d) % 4, l = a - s, c;
                    switch (d) {
                    case 0:
                        t[o] = e.charCodeAt(r + 3);
                    case 1:
                        t[0 | o + 1 - (d << 1)] = e.charCodeAt(r + 2);
                    case 2:
                        t[0 | o + 2 - (d << 1)] = e.charCodeAt(r + 1);
                    case 3:
                        t[0 | o + 3 - (d << 1)] = e.charCodeAt(r);
                    }
                    if (!(a < s + (4 - d))) {
                        for (c = 4 - d; c < l; c = 0 | c + 4)
                            n[o + c >> 2] = e.charCodeAt(r + c) << 24 | e.charCodeAt(r + c + 1) << 16 | e.charCodeAt(r + c + 2) << 8 | e.charCodeAt(r + c + 3);
                        switch (s) {
                        case 3:
                            t[0 | o + l + 1] = e.charCodeAt(r + l + 2);
                        case 2:
                            t[0 | o + l + 2] = e.charCodeAt(r + l + 1);
                        case 1:
                            t[0 | o + l + 3] = e.charCodeAt(r + l);
                        }
                    }
                }
                  , a = function(e, t, n, r, a, o) {
                    var d = o % 4, s = (a + d) % 4, l = a - s, c;
                    switch (d) {
                    case 0:
                        t[o] = e[r + 3];
                    case 1:
                        t[0 | o + 1 - (d << 1)] = e[r + 2];
                    case 2:
                        t[0 | o + 2 - (d << 1)] = e[r + 1];
                    case 3:
                        t[0 | o + 3 - (d << 1)] = e[r];
                    }
                    if (!(a < s + (4 - d))) {
                        for (c = 4 - d; c < l; c = 0 | c + 4)
                            n[0 | o + c >> 2] = e[r + c] << 24 | e[r + c + 1] << 16 | e[r + c + 2] << 8 | e[r + c + 3];
                        switch (s) {
                        case 3:
                            t[0 | o + l + 1] = e[r + l + 2];
                        case 2:
                            t[0 | o + l + 2] = e[r + l + 1];
                        case 1:
                            t[0 | o + l + 3] = e[r + l];
                        }
                    }
                }
                  , o = function(e, t, r, a, o, d) {
                    var s = void 0
                      , l = d % 4
                      , c = (o + l) % 4
                      , u = o - c
                      , f = new Uint8Array(n.readAsArrayBuffer(e.slice(a, a + o)));
                    switch (l) {
                    case 0:
                        t[d] = f[3];
                    case 1:
                        t[0 | d + 1 - (l << 1)] = f[2];
                    case 2:
                        t[0 | d + 2 - (l << 1)] = f[1];
                    case 3:
                        t[0 | d + 3 - (l << 1)] = f[0];
                    }
                    if (!(o < c + (4 - l))) {
                        for (s = 4 - l; s < u; s = 0 | s + 4)
                            r[0 | d + s >> 2] = f[s] << 24 | f[s + 1] << 16 | f[s + 2] << 8 | f[s + 3];
                        switch (c) {
                        case 3:
                            t[0 | d + u + 1] = f[u + 2];
                        case 2:
                            t[0 | d + u + 2] = f[u + 1];
                        case 1:
                            t[0 | d + u + 3] = f[u];
                        }
                    }
                };
                e.exports = function(e, n, i, d, s, l) {
                    if ("string" == typeof e)
                        return r(e, n, i, d, s, l);
                    if (e instanceof Array)
                        return a(e, n, i, d, s, l);
                    if (t && t.Buffer && t.Buffer.isBuffer(e))
                        return a(e, n, i, d, s, l);
                    if (e instanceof ArrayBuffer)
                        return a(new Uint8Array(e), n, i, d, s, l);
                    if (e.buffer instanceof ArrayBuffer)
                        return a(new Uint8Array(e.buffer,e.byteOffset,e.byteLength), n, i, d, s, l);
                    if (e instanceof Blob)
                        return o(e, n, i, d, s, l);
                    throw new Error("Unsupported data type.")
                }
            }
            , function(e, t, n) {
                function r(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }
                var a = n(0)
                  , o = n(1)
                  , i = o.toHex
                  , d = function() {
                    function e() {
                        r(this, e),
                        this._rusha = new a,
                        this._rusha.resetState()
                    }
                    return e.prototype.update = function(e) {
                        return this._rusha.append(e),
                        this
                    }
                    ,
                    e.prototype.digest = function e(t) {
                        var e = this._rusha.rawEnd().buffer;
                        if (!t)
                            return e;
                        if ("hex" === t)
                            return i(e);
                        throw new Error("unsupported digest encoding")
                    }
                    ,
                    e
                }();
                e.exports = function() {
                    return new d
                }
            }
            ])
        })
    }
    , {}],
    166: [function(e, t, n) {
        function r(e, t) {
            for (var n in e)
                t[n] = e[n]
        }
        function a(e, t, n) {
            return i(e, t, n)
        }
        var o = e("buffer")
          , i = o.Buffer;
        i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = o : (r(o, n),
        n.Buffer = a),
        r(i, a),
        a.from = function(e, t, n) {
            if ("number" == typeof e)
                throw new TypeError("Argument must not be a number");
            return i(e, t, n)
        }
        ,
        a.alloc = function(e, t, n) {
            if ("number" != typeof e)
                throw new TypeError("Argument must be a number");
            var r = i(e);
            return void 0 === t ? r.fill(0) : "string" == typeof n ? r.fill(t, n) : r.fill(t),
            r
        }
        ,
        a.allocUnsafe = function(e) {
            if ("number" != typeof e)
                throw new TypeError("Argument must be a number");
            return i(e)
        }
        ,
        a.allocUnsafeSlow = function(e) {
            if ("number" != typeof e)
                throw new TypeError("Argument must be a number");
            return o.SlowBuffer(e)
        }
    }
    , {
        buffer: 23
    }],
    167: [function(e, t) {
        (function(e) {
            'use strict';
            t.exports = "function" == typeof e ? e : function() {
                var e = [].slice.apply(arguments);
                e.splice(1, 0, 0),
                setTimeout.apply(null, e)
            }
        }
        ).call(this, e("timers").setImmediate)
    }
    , {
        timers: 203
    }],
    168: [function(e, t) {
        (function(e) {
            t.exports = function(t, n) {
                var r = [];
                t.on("data", function(e) {
                    r.push(e)
                }),
                t.once("end", function() {
                    n && n(null, e.concat(r)),
                    n = null
                }),
                t.once("error", function(e) {
                    n && n(e),
                    n = null
                })
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23
    }],
    169: [function(e, t) {
        (function(n) {
            function r(e, t) {
                if (e = Object.assign({
                    maxRedirects: 10
                }, "string" == typeof e ? {
                    url: e
                } : e),
                t = s(t),
                e.url) {
                    const {hostname: t, port: n, protocol: r, auth: a, path: o} = c.parse(e.url);
                    delete e.url,
                    t || n || r || a ? Object.assign(e, {
                        hostname: t,
                        port: n,
                        protocol: r,
                        auth: a,
                        path: o
                    }) : e.path = o
                }
                const a = {
                    "accept-encoding": "gzip, deflate"
                };
                e.headers && Object.keys(e.headers).forEach(t=>a[t.toLowerCase()] = e.headers[t]),
                e.headers = a;
                let f;
                e.body ? f = e.json && !u(e.body) ? JSON.stringify(e.body) : e.body : e.form && (f = "string" == typeof e.form ? e.form : l.stringify(e.form),
                e.headers["content-type"] = "application/x-www-form-urlencoded"),
                f && (!e.method && (e.method = "POST"),
                !u(f) && (e.headers["content-length"] = n.byteLength(f)),
                e.json && !e.form && (e.headers["content-type"] = "application/json")),
                delete e.body,
                delete e.form,
                e.json && (e.headers.accept = "application/json"),
                e.method && (e.method = e.method.toUpperCase());
                const p = "https:" === e.protocol ? d : i
                  , h = p.request(e, n=>{
                    if (!1 !== e.followRedirects && 300 <= n.statusCode && 400 > n.statusCode && n.headers.location)
                        return e.url = n.headers.location,
                        delete e.headers.host,
                        n.resume(),
                        "POST" === e.method && [301, 302].includes(n.statusCode) && (e.method = "GET",
                        delete e.headers["content-length"],
                        delete e.headers["content-type"]),
                        0 == e.maxRedirects-- ? t(new Error("too many redirects")) : r(e, t);
                    const a = "function" == typeof o && "HEAD" !== e.method;
                    t(null, a ? o(n) : n)
                }
                );
                return h.on("timeout", ()=>{
                    h.abort(),
                    t(new Error("Request timed out"))
                }
                ),
                h.on("error", t),
                u(f) ? f.on("error", t).pipe(h) : h.end(f),
                h
            }
            t.exports = r;
            const a = e("simple-concat")
              , o = e("decompress-response")
              , i = e("http")
              , d = e("https")
              , s = e("once")
              , l = e("querystring")
              , c = e("url")
              , u = e=>null !== e && "object" == typeof e && "function" == typeof e.pipe;
            r.concat = (e,t)=>r(e, (n,r)=>n ? t(n) : void a(r, (n,a)=>{
                if (n)
                    return t(n);
                if (e.json)
                    try {
                        a = JSON.parse(a.toString())
                    } catch (e) {
                        return t(e, r, a)
                    }
                t(null, r, a)
            }
            )),
            ["get", "post", "put", "patch", "head", "delete"].forEach(e=>{
                r[e] = (t,n)=>("string" == typeof t && (t = {
                    url: t
                }),
                r(Object.assign({
                    method: e.toUpperCase()
                }, t), n))
            }
            )
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23,
        "decompress-response": 17,
        http: 190,
        https: 56,
        once: 114,
        querystring: 141,
        "simple-concat": 168,
        url: 212
    }],
    170: [function(e, t) {
        (function(n) {
            function r(e) {
                return e.replace(/a=ice-options:trickle\s\n/g, "")
            }
            function a(e, t) {
                var n = new Error(e);
                return n.code = t,
                n
            }
            function o(e) {
                console.warn(e)
            }
            var i = e("debug")("simple-peer")
              , d = e("get-browser-rtc")
              , s = e("randombytes")
              , l = e("readable-stream")
              , c = e("queue-microtask")
              , u = 65536;
            class f extends l.Duplex {
                constructor(e) {
                    if (e = Object.assign({
                        allowHalfOpen: !1
                    }, e),
                    super(e),
                    this._id = s(4).toString("hex").slice(0, 7),
                    this._debug("new peer %o", e),
                    this.channelName = e.initiator ? e.channelName || s(20).toString("hex") : null,
                    this.initiator = e.initiator || !1,
                    this.channelConfig = e.channelConfig || f.channelConfig,
                    this.config = Object.assign({}, f.config, e.config),
                    this.offerOptions = e.offerOptions || {},
                    this.answerOptions = e.answerOptions || {},
                    this.sdpTransform = e.sdpTransform || (e=>e),
                    this.streams = e.streams || (e.stream ? [e.stream] : []),
                    this.trickle = void 0 === e.trickle || e.trickle,
                    this.allowHalfTrickle = void 0 !== e.allowHalfTrickle && e.allowHalfTrickle,
                    this.iceCompleteTimeout = e.iceCompleteTimeout || 5000,
                    this.destroyed = !1,
                    this._connected = !1,
                    this.remoteAddress = void 0,
                    this.remoteFamily = void 0,
                    this.remotePort = void 0,
                    this.localAddress = void 0,
                    this.localFamily = void 0,
                    this.localPort = void 0,
                    this._wrtc = e.wrtc && "object" == typeof e.wrtc ? e.wrtc : d(),
                    !this._wrtc)
                        if ("undefined" == typeof window)
                            throw a("No WebRTC support: Specify `opts.wrtc` option in this environment", "ERR_WEBRTC_SUPPORT");
                        else
                            throw a("No WebRTC support: Not a supported browser", "ERR_WEBRTC_SUPPORT");
                    this._pcReady = !1,
                    this._channelReady = !1,
                    this._iceComplete = !1,
                    this._iceCompleteTimer = null,
                    this._channel = null,
                    this._pendingCandidates = [],
                    this._isNegotiating = !this.initiator,
                    this._batchedNegotiation = !1,
                    this._queuedNegotiation = !1,
                    this._sendersAwaitingStable = [],
                    this._senderMap = new Map,
                    this._firstStable = !0,
                    this._closingInterval = null,
                    this._remoteTracks = [],
                    this._remoteStreams = [],
                    this._chunk = null,
                    this._cb = null,
                    this._interval = null;
                    try {
                        this._pc = new this._wrtc.RTCPeerConnection(this.config)
                    } catch (e) {
                        return void c(()=>this.destroy(a(e, "ERR_PC_CONSTRUCTOR")))
                    }
                    this._isReactNativeWebrtc = "number" == typeof this._pc._peerConnectionId,
                    this._pc.oniceconnectionstatechange = ()=>{
                        this._onIceStateChange()
                    }
                    ,
                    this._pc.onicegatheringstatechange = ()=>{
                        this._onIceStateChange()
                    }
                    ,
                    this._pc.onsignalingstatechange = ()=>{
                        this._onSignalingStateChange()
                    }
                    ,
                    this._pc.onicecandidate = e=>{
                        this._onIceCandidate(e)
                    }
                    ,
                    this.initiator ? this._setupData({
                        channel: this._pc.createDataChannel(this.channelName, this.channelConfig)
                    }) : this._pc.ondatachannel = e=>{
                        this._setupData(e)
                    }
                    ,
                    this.streams && this.streams.forEach(e=>{
                        this.addStream(e)
                    }
                    ),
                    this._pc.ontrack = e=>{
                        this._onTrack(e)
                    }
                    ,
                    this.initiator && this._needsNegotiation(),
                    this._onFinishBound = ()=>{
                        this._onFinish()
                    }
                    ,
                    this.once("finish", this._onFinishBound)
                }
                get bufferSize() {
                    return this._channel && this._channel.bufferedAmount || 0
                }
                get connected() {
                    return this._connected && "open" === this._channel.readyState
                }
                address() {
                    return {
                        port: this.localPort,
                        family: this.localFamily,
                        address: this.localAddress
                    }
                }
                signal(e) {
                    if (this.destroyed)
                        throw a("cannot signal after peer is destroyed", "ERR_SIGNALING");
                    if ("string" == typeof e)
                        try {
                            e = JSON.parse(e)
                        } catch (t) {
                            e = {}
                        }
                    this._debug("signal()"),
                    e.renegotiate && this.initiator && (this._debug("got request to renegotiate"),
                    this._needsNegotiation()),
                    e.transceiverRequest && this.initiator && (this._debug("got request for transceiver"),
                    this.addTransceiver(e.transceiverRequest.kind, e.transceiverRequest.init)),
                    e.candidate && (this._pc.localDescription && this._pc.localDescription.type && this._pc.remoteDescription && this._pc.remoteDescription.type ? this._addIceCandidate(e.candidate) : this._pendingCandidates.push(e.candidate)),
                    e.sdp && this._pc.setRemoteDescription(new this._wrtc.RTCSessionDescription(e)).then(()=>{
                        this.destroyed || (this._pendingCandidates.forEach(e=>{
                            this._addIceCandidate(e)
                        }
                        ),
                        this._pendingCandidates = [],
                        "offer" === this._pc.remoteDescription.type && this._createAnswer())
                    }
                    ).catch(e=>{
                        this.destroy(a(e, "ERR_SET_REMOTE_DESCRIPTION"))
                    }
                    ),
                    e.sdp || e.candidate || e.renegotiate || e.transceiverRequest || this.destroy(a("signal() called with invalid signal data", "ERR_SIGNALING"))
                }
                _addIceCandidate(e) {
                    var t = new this._wrtc.RTCIceCandidate(e);
                    this._pc.addIceCandidate(t).catch(e=>{
                        !t.address || t.address.endsWith(".local") ? o("Ignoring unsupported ICE candidate.") : this.destroy(a(e, "ERR_ADD_ICE_CANDIDATE"))
                    }
                    )
                }
                send(e) {
                    this._channel.send(e)
                }
                addTransceiver(e, t) {
                    if (this._debug("addTransceiver()"),
                    this.initiator)
                        try {
                            this._pc.addTransceiver(e, t),
                            this._needsNegotiation()
                        } catch (e) {
                            this.destroy(a(e, "ERR_ADD_TRANSCEIVER"))
                        }
                    else
                        this.emit("signal", {
                            transceiverRequest: {
                                kind: e,
                                init: t
                            }
                        })
                }
                addStream(e) {
                    this._debug("addStream()"),
                    e.getTracks().forEach(t=>{
                        this.addTrack(t, e)
                    }
                    )
                }
                addTrack(e, t) {
                    this._debug("addTrack()");
                    var n = this._senderMap.get(e) || new Map
                      , r = n.get(t);
                    if (!r)
                        r = this._pc.addTrack(e, t),
                        n.set(t, r),
                        this._senderMap.set(e, n),
                        this._needsNegotiation();
                    else if (r.removed)
                        throw a("Track has been removed. You should enable/disable tracks that you want to re-add.", "ERR_SENDER_REMOVED");
                    else
                        throw a("Track has already been added to that stream.", "ERR_SENDER_ALREADY_ADDED")
                }
                replaceTrack(e, t, n) {
                    this._debug("replaceTrack()");
                    var r = this._senderMap.get(e)
                      , o = r ? r.get(n) : null;
                    if (!o)
                        throw a("Cannot replace track that was never added.", "ERR_TRACK_NOT_ADDED");
                    t && this._senderMap.set(t, r),
                    null == o.replaceTrack ? this.destroy(a("replaceTrack is not supported in this browser", "ERR_UNSUPPORTED_REPLACETRACK")) : o.replaceTrack(t)
                }
                removeTrack(e, t) {
                    this._debug("removeSender()");
                    var n = this._senderMap.get(e)
                      , r = n ? n.get(t) : null;
                    if (!r)
                        throw a("Cannot remove track that was never added.", "ERR_TRACK_NOT_ADDED");
                    try {
                        r.removed = !0,
                        this._pc.removeTrack(r)
                    } catch (e) {
                        "NS_ERROR_UNEXPECTED" === e.name ? this._sendersAwaitingStable.push(r) : this.destroy(a(e, "ERR_REMOVE_TRACK"))
                    }
                    this._needsNegotiation()
                }
                removeStream(e) {
                    this._debug("removeSenders()"),
                    e.getTracks().forEach(t=>{
                        this.removeTrack(t, e)
                    }
                    )
                }
                _needsNegotiation() {
                    this._debug("_needsNegotiation");
                    this._batchedNegotiation || (this._batchedNegotiation = !0,
                    c(()=>{
                        this._batchedNegotiation = !1,
                        this._debug("starting batched negotiation"),
                        this.negotiate()
                    }
                    ))
                }
                negotiate() {
                    this.initiator ? this._isNegotiating ? (this._queuedNegotiation = !0,
                    this._debug("already negotiating, queueing")) : (this._debug("start negotiation"),
                    setTimeout(()=>{
                        this._createOffer()
                    }
                    , 0)) : !this._isNegotiating && (this._debug("requesting negotiation from initiator"),
                    this.emit("signal", {
                        renegotiate: !0
                    })),
                    this._isNegotiating = !0
                }
                destroy(e) {
                    this._destroy(e, ()=>{}
                    )
                }
                _destroy(e, t) {
                    if (!this.destroyed) {
                        if (this._debug("destroy (error: %s)", e && (e.message || e)),
                        this.readable = this.writable = !1,
                        this._readableState.ended || this.push(null),
                        this._writableState.finished || this.end(),
                        this.destroyed = !0,
                        this._connected = !1,
                        this._pcReady = !1,
                        this._channelReady = !1,
                        this._remoteTracks = null,
                        this._remoteStreams = null,
                        this._senderMap = null,
                        clearInterval(this._closingInterval),
                        this._closingInterval = null,
                        clearInterval(this._interval),
                        this._interval = null,
                        this._chunk = null,
                        this._cb = null,
                        this._onFinishBound && this.removeListener("finish", this._onFinishBound),
                        this._onFinishBound = null,
                        this._channel) {
                            try {
                                this._channel.close()
                            } catch (e) {}
                            this._channel.onmessage = null,
                            this._channel.onopen = null,
                            this._channel.onclose = null,
                            this._channel.onerror = null
                        }
                        if (this._pc) {
                            try {
                                this._pc.close()
                            } catch (e) {}
                            this._pc.oniceconnectionstatechange = null,
                            this._pc.onicegatheringstatechange = null,
                            this._pc.onsignalingstatechange = null,
                            this._pc.onicecandidate = null,
                            this._pc.ontrack = null,
                            this._pc.ondatachannel = null
                        }
                        this._pc = null,
                        this._channel = null,
                        e && this.emit("error", e),
                        this.emit("close"),
                        t()
                    }
                }
                _setupData(e) {
                    if (!e.channel)
                        return this.destroy(a("Data channel event is missing `channel` property", "ERR_DATA_CHANNEL"));
                    this._channel = e.channel,
                    this._channel.binaryType = "arraybuffer",
                    "number" == typeof this._channel.bufferedAmountLowThreshold && (this._channel.bufferedAmountLowThreshold = u),
                    this.channelName = this._channel.label,
                    this._channel.onmessage = e=>{
                        this._onChannelMessage(e)
                    }
                    ,
                    this._channel.onbufferedamountlow = ()=>{
                        this._onChannelBufferedAmountLow()
                    }
                    ,
                    this._channel.onopen = ()=>{
                        this._onChannelOpen()
                    }
                    ,
                    this._channel.onclose = ()=>{
                        this._onChannelClose()
                    }
                    ,
                    this._channel.onerror = e=>{
                        this.destroy(a(e, "ERR_DATA_CHANNEL"))
                    }
                    ;
                    var t = !1;
                    this._closingInterval = setInterval(()=>{
                        this._channel && "closing" === this._channel.readyState ? (t && this._onChannelClose(),
                        t = !0) : t = !1
                    }
                    , 5000)
                }
                _read() {}
                _write(e, t, n) {
                    if (this.destroyed)
                        return n(a("cannot write after peer is destroyed", "ERR_DATA_CHANNEL"));
                    if (this._connected) {
                        try {
                            this.send(e)
                        } catch (e) {
                            return this.destroy(a(e, "ERR_DATA_CHANNEL"))
                        }
                        this._channel.bufferedAmount > u ? (this._debug("start backpressure: bufferedAmount %d", this._channel.bufferedAmount),
                        this._cb = n) : n(null)
                    } else
                        this._debug("write before connect"),
                        this._chunk = e,
                        this._cb = n
                }
                _onFinish() {
                    if (!this.destroyed) {
                        const e = ()=>{
                            setTimeout(()=>this.destroy(), 1e3)
                        }
                        ;
                        this._connected ? e() : this.once("connect", e)
                    }
                }
                _startIceCompleteTimeout() {
                    this.destroyed || this._iceCompleteTimer || (this._debug("started iceComplete timeout"),
                    this._iceCompleteTimer = setTimeout(()=>{
                        this._iceComplete || (this._iceComplete = !0,
                        this._debug("iceComplete timeout completed"),
                        this.emit("iceTimeout"),
                        this.emit("_iceComplete"))
                    }
                    , this.iceCompleteTimeout))
                }
                _createOffer() {
                    this.destroyed || this._pc.createOffer(this.offerOptions).then(e=>{
                        if (this.destroyed)
                            return;
                        this.trickle || this.allowHalfTrickle || (e.sdp = r(e.sdp)),
                        e.sdp = this.sdpTransform(e.sdp);
                        const t = ()=>{
                            if (!this.destroyed) {
                                var t = this._pc.localDescription || e;
                                this._debug("signal"),
                                this.emit("signal", {
                                    type: t.type,
                                    sdp: t.sdp
                                })
                            }
                        }
                        ;
                        this._pc.setLocalDescription(e).then(()=>{
                            this._debug("createOffer success");
                            this.destroyed || (this.trickle || this._iceComplete ? t() : this.once("_iceComplete", t))
                        }
                        ).catch(e=>{
                            this.destroy(a(e, "ERR_SET_LOCAL_DESCRIPTION"))
                        }
                        )
                    }
                    ).catch(e=>{
                        this.destroy(a(e, "ERR_CREATE_OFFER"))
                    }
                    )
                }
                _requestMissingTransceivers() {
                    this._pc.getTransceivers && this._pc.getTransceivers().forEach(e=>{
                        e.mid || !e.sender.track || e.requested || (e.requested = !0,
                        this.addTransceiver(e.sender.track.kind))
                    }
                    )
                }
                _createAnswer() {
                    this.destroyed || this._pc.createAnswer(this.answerOptions).then(e=>{
                        if (this.destroyed)
                            return;
                        this.trickle || this.allowHalfTrickle || (e.sdp = r(e.sdp)),
                        e.sdp = this.sdpTransform(e.sdp);
                        const t = ()=>{
                            if (!this.destroyed) {
                                var t = this._pc.localDescription || e;
                                this._debug("signal"),
                                this.emit("signal", {
                                    type: t.type,
                                    sdp: t.sdp
                                }),
                                this.initiator || this._requestMissingTransceivers()
                            }
                        }
                        ;
                        this._pc.setLocalDescription(e).then(()=>{
                            this.destroyed || (this.trickle || this._iceComplete ? t() : this.once("_iceComplete", t))
                        }
                        ).catch(e=>{
                            this.destroy(a(e, "ERR_SET_LOCAL_DESCRIPTION"))
                        }
                        )
                    }
                    ).catch(e=>{
                        this.destroy(a(e, "ERR_CREATE_ANSWER"))
                    }
                    )
                }
                _onIceStateChange() {
                    if (!this.destroyed) {
                        var e = this._pc.iceConnectionState
                          , t = this._pc.iceGatheringState;
                        this._debug("iceStateChange (connection: %s) (gathering: %s)", e, t),
                        this.emit("iceStateChange", e, t),
                        ("connected" === e || "completed" === e) && (this._pcReady = !0,
                        this._maybeReady()),
                        "failed" === e && this.destroy(a("Ice connection failed.", "ERR_ICE_CONNECTION_FAILURE")),
                        "closed" === e && this.destroy(a("Ice connection closed.", "ERR_ICE_CONNECTION_CLOSED"))
                    }
                }
                getStats(e) {
                    const t = e=>("[object Array]" === Object.prototype.toString.call(e.values) && e.values.forEach(t=>{
                        Object.assign(e, t)
                    }
                    ),
                    e);
                    0 === this._pc.getStats.length ? this._pc.getStats().then(n=>{
                        var r = [];
                        n.forEach(e=>{
                            r.push(t(e))
                        }
                        ),
                        e(null, r)
                    }
                    , t=>e(t)) : this._isReactNativeWebrtc ? this._pc.getStats(null, n=>{
                        var r = [];
                        n.forEach(e=>{
                            r.push(t(e))
                        }
                        ),
                        e(null, r)
                    }
                    , t=>e(t)) : 0 < this._pc.getStats.length ? this._pc.getStats(n=>{
                        if (!this.destroyed) {
                            var r = [];
                            n.result().forEach(e=>{
                                var n = {};
                                e.names().forEach(t=>{
                                    n[t] = e.stat(t)
                                }
                                ),
                                n.id = e.id,
                                n.type = e.type,
                                n.timestamp = e.timestamp,
                                r.push(t(n))
                            }
                            ),
                            e(null, r)
                        }
                    }
                    , t=>e(t)) : e(null, [])
                }
                _maybeReady() {
                    if (this._debug("maybeReady pc %s channel %s", this._pcReady, this._channelReady),
                    this._connected || this._connecting || !this._pcReady || !this._channelReady)
                        return;
                    this._connecting = !0;
                    const e = ()=>{
                        this.destroyed || this.getStats((t,n)=>{
                            if (this.destroyed)
                                return;
                            t && (n = []);
                            var r = {}
                              , o = {}
                              , i = {}
                              , d = !1;
                            n.forEach(e=>{
                                ("remotecandidate" === e.type || "remote-candidate" === e.type) && (r[e.id] = e),
                                ("localcandidate" === e.type || "local-candidate" === e.type) && (o[e.id] = e),
                                ("candidatepair" === e.type || "candidate-pair" === e.type) && (i[e.id] = e)
                            }
                            );
                            const s = e=>{
                                d = !0;
                                var t = o[e.localCandidateId];
                                t && (t.ip || t.address) ? (this.localAddress = t.ip || t.address,
                                this.localPort = +t.port) : t && t.ipAddress ? (this.localAddress = t.ipAddress,
                                this.localPort = +t.portNumber) : "string" == typeof e.googLocalAddress && (t = e.googLocalAddress.split(":"),
                                this.localAddress = t[0],
                                this.localPort = +t[1]),
                                this.localAddress && (this.localFamily = this.localAddress.includes(":") ? "IPv6" : "IPv4");
                                var n = r[e.remoteCandidateId];
                                n && (n.ip || n.address) ? (this.remoteAddress = n.ip || n.address,
                                this.remotePort = +n.port) : n && n.ipAddress ? (this.remoteAddress = n.ipAddress,
                                this.remotePort = +n.portNumber) : "string" == typeof e.googRemoteAddress && (n = e.googRemoteAddress.split(":"),
                                this.remoteAddress = n[0],
                                this.remotePort = +n[1]),
                                this.remoteAddress && (this.remoteFamily = this.remoteAddress.includes(":") ? "IPv6" : "IPv4"),
                                this._debug("connect local: %s:%s remote: %s:%s", this.localAddress, this.localPort, this.remoteAddress, this.remotePort)
                            }
                            ;
                            if (n.forEach(e=>{
                                "transport" === e.type && e.selectedCandidatePairId && s(i[e.selectedCandidatePairId]),
                                ("googCandidatePair" === e.type && "true" === e.googActiveConnection || ("candidatepair" === e.type || "candidate-pair" === e.type) && e.selected) && s(e)
                            }
                            ),
                            !d && (!Object.keys(i).length || Object.keys(o).length))
                                return void setTimeout(e, 100);
                            if (this._connecting = !1,
                            this._connected = !0,
                            this._chunk) {
                                try {
                                    this.send(this._chunk)
                                } catch (e) {
                                    return this.destroy(a(e, "ERR_DATA_CHANNEL"))
                                }
                                this._chunk = null,
                                this._debug("sent chunk from \"write before connect\"");
                                var l = this._cb;
                                this._cb = null,
                                l(null)
                            }
                            "number" != typeof this._channel.bufferedAmountLowThreshold && (this._interval = setInterval(()=>this._onInterval(), 150),
                            this._interval.unref && this._interval.unref()),
                            this._debug("connect"),
                            this.emit("connect")
                        }
                        )
                    }
                    ;
                    e()
                }
                _onInterval() {
                    this._cb && this._channel && !(this._channel.bufferedAmount > u) && this._onChannelBufferedAmountLow()
                }
                _onSignalingStateChange() {
                    this.destroyed || ("stable" === this._pc.signalingState && !this._firstStable && (this._isNegotiating = !1,
                    this._debug("flushing sender queue", this._sendersAwaitingStable),
                    this._sendersAwaitingStable.forEach(e=>{
                        this._pc.removeTrack(e),
                        this._queuedNegotiation = !0
                    }
                    ),
                    this._sendersAwaitingStable = [],
                    this._queuedNegotiation && (this._debug("flushing negotiation queue"),
                    this._queuedNegotiation = !1,
                    this._needsNegotiation()),
                    this._debug("negotiate"),
                    this.emit("negotiate")),
                    this._firstStable = !1,
                    this._debug("signalingStateChange %s", this._pc.signalingState),
                    this.emit("signalingStateChange", this._pc.signalingState))
                }
                _onIceCandidate(e) {
                    this.destroyed || (e.candidate && this.trickle ? this.emit("signal", {
                        candidate: {
                            candidate: e.candidate.candidate,
                            sdpMLineIndex: e.candidate.sdpMLineIndex,
                            sdpMid: e.candidate.sdpMid
                        }
                    }) : !e.candidate && !this._iceComplete && (this._iceComplete = !0,
                    this.emit("_iceComplete")),
                    e.candidate && this._startIceCompleteTimeout())
                }
                _onChannelMessage(e) {
                    if (!this.destroyed) {
                        var t = e.data;
                        t instanceof ArrayBuffer && (t = n.from(t)),
                        this.push(t)
                    }
                }
                _onChannelBufferedAmountLow() {
                    if (!this.destroyed && this._cb) {
                        this._debug("ending backpressure: bufferedAmount %d", this._channel.bufferedAmount);
                        var e = this._cb;
                        this._cb = null,
                        e(null)
                    }
                }
                _onChannelOpen() {
                    this._connected || this.destroyed || (this._debug("on channel open"),
                    this._channelReady = !0,
                    this._maybeReady())
                }
                _onChannelClose() {
                    this.destroyed || (this._debug("on channel close"),
                    this.destroy())
                }
                _onTrack(e) {
                    this.destroyed || e.streams.forEach(t=>{
                        this._debug("on track"),
                        this.emit("track", e.track, t),
                        this._remoteTracks.push({
                            track: e.track,
                            stream: t
                        });
                        this._remoteStreams.some(e=>e.id === t.id) || (this._remoteStreams.push(t),
                        c(()=>{
                            this.emit("stream", t)
                        }
                        ))
                    }
                    )
                }
                _debug() {
                    var e = [].slice.call(arguments);
                    e[0] = "[" + this._id + "] " + e[0],
                    i.apply(null, e)
                }
            }
            f.WEBRTC_SUPPORT = !!d(),
            f.config = {
                iceServers: [{
                    urls: "stun:stun.l.google.com:19302"
                }, {
                    urls: "stun:global.stun.twilio.com:3478?transport=udp"
                }],
                sdpSemantics: "unified-plan"
            },
            f.channelConfig = {},
            t.exports = f
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23,
        debug: 49,
        "get-browser-rtc": 55,
        "queue-microtask": 142,
        randombytes: 144,
        "readable-stream": 160
    }],
    171: [function(e, t) {
        function n(e) {
            return s.digest(e)
        }
        function r(e, t) {
            return u ? void ("string" == typeof e && (e = a(e)),
            u.digest({
                name: "sha-1"
            }, e).then(function(e) {
                t(o(new Uint8Array(e)))
            }, function() {
                t(n(e))
            })) : void ("undefined" == typeof window ? queueMicrotask(()=>t(n(e))) : d(e, function(r, a) {
                return r ? void t(n(e)) : void t(a)
            }))
        }
        function a(e) {
            for (var t = e.length, n = new Uint8Array(t), r = 0; r < t; r++)
                n[r] = e.charCodeAt(r);
            return n
        }
        function o(e) {
            for (var t = e.length, n = [], r = 0, a; r < t; r++)
                a = e[r],
                n.push((a >>> 4).toString(16)),
                n.push((15 & a).toString(16));
            return n.join("")
        }
        var i = e("rusha")
          , d = e("./rusha-worker-sha1")
          , s = new i
          , l = "undefined" == typeof window ? self : window
          , c = l.crypto || l.msCrypto || {}
          , u = c.subtle || c.webkitSubtle;
        try {
            u.digest({
                name: "sha-1"
            }, new Uint8Array).catch(function() {
                u = !1
            })
        } catch (e) {
            u = !1
        }
        t.exports = r,
        t.exports.sync = n
    }
    , {
        "./rusha-worker-sha1": 172,
        rusha: 165
    }],
    172: [function(e, t) {
        function n() {
            o = a.createWorker(),
            i = 1,
            d = {},
            o.onmessage = function(t) {
                var e = t.data.id
                  , n = d[e];
                delete d[e],
                null == t.data.error ? n(null, t.data.hash) : n(new Error("Rusha worker error: " + t.data.error))
            }
        }
        function r(e, t) {
            o || n(),
            d[i] = t,
            o.postMessage({
                id: i,
                data: e
            }),
            i += 1
        }
        var a = e("rusha"), o, i, d;
        t.exports = r
    }
    , {
        rusha: 165
    }],
    173: [function(e, t) {
        (function(n, r) {
            const a = e("debug")("simple-websocket")
              , o = e("randombytes")
              , i = e("readable-stream")
              , d = e("ws")
              , s = "function" == typeof d ? d : WebSocket
              , l = 65536;
            class c extends i.Duplex {
                constructor(e={}) {
                    if ("string" == typeof e && (e = {
                        url: e
                    }),
                    e = Object.assign({
                        allowHalfOpen: !1
                    }, e),
                    super(e),
                    null == e.url && null == e.socket)
                        throw new Error("Missing required `url` or `socket` option");
                    if (null != e.url && null != e.socket)
                        throw new Error("Must specify either `url` or `socket` option, not both");
                    if (this._id = o(4).toString("hex").slice(0, 7),
                    this._debug("new websocket: %o", e),
                    this.connected = !1,
                    this.destroyed = !1,
                    this._chunk = null,
                    this._cb = null,
                    this._interval = null,
                    e.socket)
                        this.url = e.socket.url,
                        this._ws = e.socket,
                        this.connected = e.socket.readyState === s.OPEN;
                    else {
                        this.url = e.url;
                        try {
                            this._ws = "function" == typeof d ? new s(e.url,e) : new s(e.url)
                        } catch (e) {
                            return void n.nextTick(()=>this.destroy(e))
                        }
                    }
                    this._ws.binaryType = "arraybuffer",
                    this._ws.onopen = ()=>{
                        this._onOpen()
                    }
                    ,
                    this._ws.onmessage = e=>{
                        this._onMessage(e)
                    }
                    ,
                    this._ws.onclose = ()=>{
                        this._onClose()
                    }
                    ,
                    this._ws.onerror = ()=>{
                        this.destroy(new Error("connection error to " + this.url))
                    }
                    ,
                    this._onFinishBound = ()=>{
                        this._onFinish()
                    }
                    ,
                    this.once("finish", this._onFinishBound)
                }
                send(e) {
                    this._ws.send(e)
                }
                destroy(e) {
                    this._destroy(e, ()=>{}
                    )
                }
                _destroy(e, t) {
                    if (!this.destroyed) {
                        if (this._debug("destroy (error: %s)", e && (e.message || e)),
                        this.readable = this.writable = !1,
                        this._readableState.ended || this.push(null),
                        this._writableState.finished || this.end(),
                        this.connected = !1,
                        this.destroyed = !0,
                        clearInterval(this._interval),
                        this._interval = null,
                        this._chunk = null,
                        this._cb = null,
                        this._onFinishBound && this.removeListener("finish", this._onFinishBound),
                        this._onFinishBound = null,
                        this._ws) {
                            const e = this._ws
                              , t = ()=>{
                                e.onclose = null
                            }
                            ;
                            if (e.readyState === s.CLOSED)
                                t();
                            else
                                try {
                                    e.onclose = t,
                                    e.close()
                                } catch (e) {
                                    t()
                                }
                            e.onopen = null,
                            e.onmessage = null,
                            e.onerror = ()=>{}
                        }
                        if (this._ws = null,
                        e) {
                            if ("undefined" != typeof DOMException && e instanceof DOMException) {
                                const t = e.code;
                                e = new Error(e.message),
                                e.code = t
                            }
                            this.emit("error", e)
                        }
                        this.emit("close"),
                        t()
                    }
                }
                _read() {}
                _write(e, t, n) {
                    if (this.destroyed)
                        return n(new Error("cannot write after socket is destroyed"));
                    if (this.connected) {
                        try {
                            this.send(e)
                        } catch (e) {
                            return this.destroy(e)
                        }
                        "function" != typeof d && this._ws.bufferedAmount > l ? (this._debug("start backpressure: bufferedAmount %d", this._ws.bufferedAmount),
                        this._cb = n) : n(null)
                    } else
                        this._debug("write before connect"),
                        this._chunk = e,
                        this._cb = n
                }
                _onFinish() {
                    if (!this.destroyed) {
                        const e = ()=>{
                            setTimeout(()=>this.destroy(), 1e3)
                        }
                        ;
                        this.connected ? e() : this.once("connect", e)
                    }
                }
                _onMessage(e) {
                    if (this.destroyed)
                        return;
                    let t = e.data;
                    t instanceof ArrayBuffer && (t = r.from(t)),
                    this.push(t)
                }
                _onOpen() {
                    if (!(this.connected || this.destroyed)) {
                        if (this.connected = !0,
                        this._chunk) {
                            try {
                                this.send(this._chunk)
                            } catch (e) {
                                return this.destroy(e)
                            }
                            this._chunk = null,
                            this._debug("sent chunk from \"write before connect\"");
                            const e = this._cb;
                            this._cb = null,
                            e(null)
                        }
                        "function" != typeof d && (this._interval = setInterval(()=>this._onInterval(), 150),
                        this._interval.unref && this._interval.unref()),
                        this._debug("connect"),
                        this.emit("connect")
                    }
                }
                _onInterval() {
                    if (this._cb && this._ws && !(this._ws.bufferedAmount > l)) {
                        this._debug("ending backpressure: bufferedAmount %d", this._ws.bufferedAmount);
                        const e = this._cb;
                        this._cb = null,
                        e(null)
                    }
                }
                _onClose() {
                    this.destroyed || (this._debug("on close"),
                    this.destroy())
                }
                _debug() {
                    const e = [].slice.call(arguments);
                    e[0] = "[" + this._id + "] " + e[0],
                    a.apply(null, e)
                }
            }
            c.WEBSOCKET_SUPPORT = !!s,
            t.exports = c
        }
        ).call(this, e("_process"), e("buffer").Buffer)
    }
    , {
        _process: 137,
        buffer: 23,
        debug: 49,
        randombytes: 144,
        "readable-stream": 160,
        ws: 17
    }],
    174: [function(e, t) {
        var n = 1, r = 65535, a = 4, o = function() {
            n = n + 1 & r
        }, i;
        t.exports = function(e) {
            i || (i = setInterval(o, 0 | 1e3 / a),
            i.unref && i.unref());
            var t = a * (e || 5)
              , d = [0]
              , s = 1
              , l = n - 1 & r;
            return function(e) {
                var o = n - l & r;
                for (o > t && (o = t),
                l = n; o--; )
                    s === t && (s = 0),
                    d[s] = d[0 === s ? t - 1 : s - 1],
                    s++;
                e && (d[s - 1] += e);
                var i = d[s - 1]
                  , c = d.length < t ? 0 : d[s === t ? 0 : s];
                return d.length < a ? i : (i - c) * a / d.length
            }
        }
    }
    , {}],
    175: [function(e, t) {
        function n() {
            r.call(this)
        }
        t.exports = n;
        var r = e("events").EventEmitter
          , a = e("inherits");
        a(n, r),
        n.Readable = e("readable-stream/readable.js"),
        n.Writable = e("readable-stream/writable.js"),
        n.Duplex = e("readable-stream/duplex.js"),
        n.Transform = e("readable-stream/transform.js"),
        n.PassThrough = e("readable-stream/passthrough.js"),
        n.Stream = n,
        n.prototype.pipe = function(e, t) {
            function n(t) {
                e.writable && !1 === e.write(t) && l.pause && l.pause()
            }
            function a() {
                l.readable && l.resume && l.resume()
            }
            function o() {
                c || (c = !0,
                e.end())
            }
            function i() {
                c || (c = !0,
                "function" == typeof e.destroy && e.destroy())
            }
            function d(e) {
                if (s(),
                0 === r.listenerCount(this, "error"))
                    throw e
            }
            function s() {
                l.removeListener("data", n),
                e.removeListener("drain", a),
                l.removeListener("end", o),
                l.removeListener("close", i),
                l.removeListener("error", d),
                e.removeListener("error", d),
                l.removeListener("end", s),
                l.removeListener("close", s),
                e.removeListener("close", s)
            }
            var l = this;
            l.on("data", n),
            e.on("drain", a),
            e._isStdio || t && !1 === t.end || (l.on("end", o),
            l.on("close", i));
            var c = !1;
            return l.on("error", d),
            e.on("error", d),
            l.on("end", s),
            l.on("close", s),
            e.on("close", s),
            e.emit("pipe", l),
            e
        }
    }
    , {
        events: 53,
        inherits: 60,
        "readable-stream/duplex.js": 176,
        "readable-stream/passthrough.js": 185,
        "readable-stream/readable.js": 186,
        "readable-stream/transform.js": 187,
        "readable-stream/writable.js": 188
    }],
    176: [function(e, t) {
        t.exports = e("./lib/_stream_duplex.js")
    }
    , {
        "./lib/_stream_duplex.js": 177
    }],
    177: [function(e, t) {
        'use strict';
        function n(e) {
            return this instanceof n ? void (s.call(this, e),
            l.call(this, e),
            e && !1 === e.readable && (this.readable = !1),
            e && !1 === e.writable && (this.writable = !1),
            this.allowHalfOpen = !0,
            e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1),
            this.once("end", r)) : new n(e)
        }
        function r() {
            this.allowHalfOpen || this._writableState.ended || o.nextTick(a, this)
        }
        function a(e) {
            e.end()
        }
        var o = e("process-nextick-args")
          , i = Object.keys || function(e) {
            var t = [];
            for (var n in e)
                t.push(n);
            return t
        }
        ;
        t.exports = n;
        var d = e("core-util-is");
        d.inherits = e("inherits");
        var s = e("./_stream_readable")
          , l = e("./_stream_writable");
        d.inherits(n, s);
        for (var c = i(l.prototype), u = 0, f; u < c.length; u++)
            f = c[u],
            n.prototype[f] || (n.prototype[f] = l.prototype[f]);
        Object.defineProperty(n.prototype, "writableHighWaterMark", {
            enumerable: !1,
            get: function() {
                return this._writableState.highWaterMark
            }
        }),
        Object.defineProperty(n.prototype, "destroyed", {
            get: function() {
                return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
            },
            set: function(e) {
                void 0 === this._readableState || void 0 === this._writableState || (this._readableState.destroyed = e,
                this._writableState.destroyed = e)
            }
        }),
        n.prototype._destroy = function(e, t) {
            this.push(null),
            this.end(),
            o.nextTick(t, e)
        }
    }
    , {
        "./_stream_readable": 179,
        "./_stream_writable": 181,
        "core-util-is": 26,
        inherits: 60,
        "process-nextick-args": 136
    }],
    178: [function(e, t) {
        'use strict';
        function n(e) {
            return this instanceof n ? void r.call(this, e) : new n(e)
        }
        t.exports = n;
        var r = e("./_stream_transform")
          , a = e("core-util-is");
        a.inherits = e("inherits"),
        a.inherits(n, r),
        n.prototype._transform = function(e, t, n) {
            n(null, e)
        }
    }
    , {
        "./_stream_transform": 180,
        "core-util-is": 26,
        inherits: 60
    }],
    179: [function(e, t) {
        (function(n, r) {
            'use strict';
            function a(e) {
                return j.from(e)
            }
            function o(e) {
                return j.isBuffer(e) || e instanceof N
            }
            function i(e, t, n) {
                return "function" == typeof e.prependListener ? e.prependListener(t, n) : void (e._events && e._events[t] ? P(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]] : e.on(t, n))
            }
            function d(t, n) {
                O = O || e("./_stream_duplex"),
                t = t || {};
                var r = n instanceof O;
                this.objectMode = !!t.objectMode,
                r && (this.objectMode = this.objectMode || !!t.readableObjectMode);
                var a = t.highWaterMark
                  , o = t.readableHighWaterMark
                  , i = this.objectMode ? 16 : 16384;
                this.highWaterMark = a || 0 === a ? a : r && (o || 0 === o) ? o : i,
                this.highWaterMark = Math.floor(this.highWaterMark),
                this.buffer = new H,
                this.length = 0,
                this.pipes = null,
                this.pipesCount = 0,
                this.flowing = null,
                this.ended = !1,
                this.endEmitted = !1,
                this.reading = !1,
                this.sync = !0,
                this.needReadable = !1,
                this.emittedReadable = !1,
                this.readableListening = !1,
                this.resumeScheduled = !1,
                this.destroyed = !1,
                this.defaultEncoding = t.defaultEncoding || "utf8",
                this.awaitDrain = 0,
                this.readingMore = !1,
                this.decoder = null,
                this.encoding = null,
                t.encoding && (!G && (G = e("string_decoder/").StringDecoder),
                this.decoder = new G(t.encoding),
                this.encoding = t.encoding)
            }
            function s(t) {
                return O = O || e("./_stream_duplex"),
                this instanceof s ? void (this._readableState = new d(t,this),
                this.readable = !0,
                t && ("function" == typeof t.read && (this._read = t.read),
                "function" == typeof t.destroy && (this._destroy = t.destroy)),
                M.call(this)) : new s(t)
            }
            function l(e, t, n, r, o) {
                var i = e._readableState;
                if (null === t)
                    i.reading = !1,
                    m(e, i);
                else {
                    var d;
                    o || (d = u(i, t)),
                    d ? e.emit("error", d) : i.objectMode || t && 0 < t.length ? ("string" != typeof t && !i.objectMode && Object.getPrototypeOf(t) !== j.prototype && (t = a(t)),
                    r ? i.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : c(e, i, t, !0) : i.ended ? e.emit("error", new Error("stream.push() after EOF")) : (i.reading = !1,
                    i.decoder && !n ? (t = i.decoder.write(t),
                    i.objectMode || 0 !== t.length ? c(e, i, t, !1) : b(e, i)) : c(e, i, t, !1))) : !r && (i.reading = !1)
                }
                return f(i)
            }
            function c(e, t, n, r) {
                t.flowing && 0 === t.length && !t.sync ? (e.emit("data", n),
                e.read(0)) : (t.length += t.objectMode ? 1 : n.length,
                r ? t.buffer.unshift(n) : t.buffer.push(n),
                t.needReadable && g(e)),
                b(e, t)
            }
            function u(e, t) {
                var n;
                return o(t) || "string" == typeof t || void 0 === t || e.objectMode || (n = new TypeError("Invalid non-string/buffer chunk")),
                n
            }
            function f(e) {
                return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
            }
            function p(e) {
                return 8388608 <= e ? e = 8388608 : (e--,
                e |= e >>> 1,
                e |= e >>> 2,
                e |= e >>> 4,
                e |= e >>> 8,
                e |= e >>> 16,
                e++),
                e
            }
            function h(e, t) {
                return 0 >= e || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e === e ? (e > t.highWaterMark && (t.highWaterMark = p(e)),
                e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0,
                0)) : t.flowing && t.length ? t.buffer.head.data.length : t.length
            }
            function m(e, t) {
                if (!t.ended) {
                    if (t.decoder) {
                        var n = t.decoder.end();
                        n && n.length && (t.buffer.push(n),
                        t.length += t.objectMode ? 1 : n.length)
                    }
                    t.ended = !0,
                    g(e)
                }
            }
            function g(e) {
                var t = e._readableState;
                t.needReadable = !1,
                t.emittedReadable || (W("emitReadable", t.flowing),
                t.emittedReadable = !0,
                t.sync ? A.nextTick(_, e) : _(e))
            }
            function _(e) {
                W("emit readable"),
                e.emit("readable"),
                S(e)
            }
            function b(e, t) {
                t.readingMore || (t.readingMore = !0,
                A.nextTick(y, e, t))
            }
            function y(e, t) {
                for (var n = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (W("maybeReadMore read 0"),
                e.read(0),
                n !== t.length); )
                    n = t.length;
                t.readingMore = !1
            }
            function w(e) {
                return function() {
                    var t = e._readableState;
                    W("pipeOnDrain", t.awaitDrain),
                    t.awaitDrain && t.awaitDrain--,
                    0 === t.awaitDrain && D(e, "data") && (t.flowing = !0,
                    S(e))
                }
            }
            function k(e) {
                W("readable nexttick read 0"),
                e.read(0)
            }
            function x(e, t) {
                t.resumeScheduled || (t.resumeScheduled = !0,
                A.nextTick(v, e, t))
            }
            function v(e, t) {
                t.reading || (W("resume read 0"),
                e.read(0)),
                t.resumeScheduled = !1,
                t.awaitDrain = 0,
                e.emit("resume"),
                S(e),
                t.flowing && !t.reading && e.read(0)
            }
            function S(e) {
                var t = e._readableState;
                for (W("flow", t.flowing); t.flowing && null !== e.read(); )
                    ;
            }
            function E(e, t) {
                if (0 === t.length)
                    return null;
                var n;
                return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length),
                t.buffer.clear()) : n = C(e, t.buffer, t.decoder),
                n
            }
            function C(e, t, n) {
                var r;
                return e < t.head.data.length ? (r = t.head.data.slice(0, e),
                t.head.data = t.head.data.slice(e)) : e === t.head.data.length ? r = t.shift() : r = n ? I(e, t) : T(e, t),
                r
            }
            function I(e, t) {
                var r = t.head
                  , a = 1
                  , o = r.data;
                for (e -= o.length; r = r.next; ) {
                    var i = r.data
                      , d = e > i.length ? i.length : e;
                    if (o += d === i.length ? i : i.slice(0, e),
                    e -= d,
                    0 === e) {
                        d === i.length ? (++a,
                        t.head = r.next ? r.next : t.tail = null) : (t.head = r,
                        r.data = i.slice(d));
                        break
                    }
                    ++a
                }
                return t.length -= a,
                o
            }
            function T(e, t) {
                var r = j.allocUnsafe(e)
                  , a = t.head
                  , o = 1;
                for (a.data.copy(r),
                e -= a.data.length; a = a.next; ) {
                    var i = a.data
                      , d = e > i.length ? i.length : e;
                    if (i.copy(r, r.length - e, 0, d),
                    e -= d,
                    0 === e) {
                        d === i.length ? (++o,
                        t.head = a.next ? a.next : t.tail = null) : (t.head = a,
                        a.data = i.slice(d));
                        break
                    }
                    ++o
                }
                return t.length -= o,
                r
            }
            function R(e) {
                var t = e._readableState;
                if (0 < t.length)
                    throw new Error("\"endReadable()\" called on non-empty stream");
                t.endEmitted || (t.ended = !0,
                A.nextTick(B, t, e))
            }
            function B(e, t) {
                e.endEmitted || 0 !== e.length || (e.endEmitted = !0,
                t.readable = !1,
                t.emit("end"))
            }
            function L(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t)
                        return n;
                return -1
            }
            var A = e("process-nextick-args");
            t.exports = s;
            var P = e("isarray"), O;
            s.ReadableState = d;
            var U = e("events").EventEmitter
              , D = function(e, t) {
                return e.listeners(t).length
            }
              , M = e("./internal/streams/stream")
              , j = e("safe-buffer").Buffer
              , N = r.Uint8Array || function() {}
              , z = e("core-util-is");
            z.inherits = e("inherits");
            var F = e("util")
              , W = void 0;
            W = F && F.debuglog ? F.debuglog("stream") : function() {}
            ;
            var H = e("./internal/streams/BufferList"), q = e("./internal/streams/destroy"), G;
            z.inherits(s, M);
            var Z = ["error", "close", "destroy", "pause", "resume"];
            Object.defineProperty(s.prototype, "destroyed", {
                get: function() {
                    return void 0 !== this._readableState && this._readableState.destroyed
                },
                set: function(e) {
                    this._readableState && (this._readableState.destroyed = e)
                }
            }),
            s.prototype.destroy = q.destroy,
            s.prototype._undestroy = q.undestroy,
            s.prototype._destroy = function(e, t) {
                this.push(null),
                t(e)
            }
            ,
            s.prototype.push = function(e, t) {
                var n = this._readableState, r;
                return n.objectMode ? r = !0 : "string" == typeof e && (t = t || n.defaultEncoding,
                t !== n.encoding && (e = j.from(e, t),
                t = ""),
                r = !0),
                l(this, e, t, !1, r)
            }
            ,
            s.prototype.unshift = function(e) {
                return l(this, e, null, !0, !1)
            }
            ,
            s.prototype.isPaused = function() {
                return !1 === this._readableState.flowing
            }
            ,
            s.prototype.setEncoding = function(t) {
                return G || (G = e("string_decoder/").StringDecoder),
                this._readableState.decoder = new G(t),
                this._readableState.encoding = t,
                this
            }
            ;
            s.prototype.read = function(e) {
                W("read", e),
                e = parseInt(e, 10);
                var t = this._readableState
                  , r = e;
                if (0 !== e && (t.emittedReadable = !1),
                0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended))
                    return W("read: emitReadable", t.length, t.ended),
                    0 === t.length && t.ended ? R(this) : g(this),
                    null;
                if (e = h(e, t),
                0 === e && t.ended)
                    return 0 === t.length && R(this),
                    null;
                var a = t.needReadable;
                W("need readable", a),
                (0 === t.length || t.length - e < t.highWaterMark) && (a = !0,
                W("length less than watermark", a)),
                t.ended || t.reading ? (a = !1,
                W("reading or ended", a)) : a && (W("do read"),
                t.reading = !0,
                t.sync = !0,
                0 === t.length && (t.needReadable = !0),
                this._read(t.highWaterMark),
                t.sync = !1,
                !t.reading && (e = h(r, t)));
                var o;
                return o = 0 < e ? E(e, t) : null,
                null === o ? (t.needReadable = !0,
                e = 0) : t.length -= e,
                0 === t.length && (!t.ended && (t.needReadable = !0),
                r !== e && t.ended && R(this)),
                null !== o && this.emit("data", o),
                o
            }
            ,
            s.prototype._read = function() {
                this.emit("error", new Error("_read() is not implemented"))
            }
            ,
            s.prototype.pipe = function(e, t) {
                function r(e, t) {
                    W("onunpipe"),
                    e === f && t && !1 === t.hasUnpiped && (t.hasUnpiped = !0,
                    o())
                }
                function a() {
                    W("onend"),
                    e.end()
                }
                function o() {
                    W("cleanup"),
                    e.removeListener("close", l),
                    e.removeListener("finish", c),
                    e.removeListener("drain", g),
                    e.removeListener("error", s),
                    e.removeListener("unpipe", r),
                    f.removeListener("end", a),
                    f.removeListener("end", u),
                    f.removeListener("data", d),
                    _ = !0,
                    p.awaitDrain && (!e._writableState || e._writableState.needDrain) && g()
                }
                function d(t) {
                    W("ondata"),
                    b = !1;
                    var n = e.write(t);
                    !1 !== n || b || ((1 === p.pipesCount && p.pipes === e || 1 < p.pipesCount && -1 !== L(p.pipes, e)) && !_ && (W("false write response, pause", f._readableState.awaitDrain),
                    f._readableState.awaitDrain++,
                    b = !0),
                    f.pause())
                }
                function s(t) {
                    W("onerror", t),
                    u(),
                    e.removeListener("error", s),
                    0 === D(e, "error") && e.emit("error", t)
                }
                function l() {
                    e.removeListener("finish", c),
                    u()
                }
                function c() {
                    W("onfinish"),
                    e.removeListener("close", l),
                    u()
                }
                function u() {
                    W("unpipe"),
                    f.unpipe(e)
                }
                var f = this
                  , p = this._readableState;
                switch (p.pipesCount) {
                case 0:
                    p.pipes = e;
                    break;
                case 1:
                    p.pipes = [p.pipes, e];
                    break;
                default:
                    p.pipes.push(e);
                }
                p.pipesCount += 1,
                W("pipe count=%d opts=%j", p.pipesCount, t);
                var h = (!t || !1 !== t.end) && e !== n.stdout && e !== n.stderr
                  , m = h ? a : u;
                p.endEmitted ? A.nextTick(m) : f.once("end", m),
                e.on("unpipe", r);
                var g = w(f);
                e.on("drain", g);
                var _ = !1
                  , b = !1;
                return f.on("data", d),
                i(e, "error", s),
                e.once("close", l),
                e.once("finish", c),
                e.emit("pipe", f),
                p.flowing || (W("pipe resume"),
                f.resume()),
                e
            }
            ,
            s.prototype.unpipe = function(e) {
                var t = this._readableState
                  , n = {
                    hasUnpiped: !1
                };
                if (0 === t.pipesCount)
                    return this;
                if (1 === t.pipesCount)
                    return e && e !== t.pipes ? this : (e || (e = t.pipes),
                    t.pipes = null,
                    t.pipesCount = 0,
                    t.flowing = !1,
                    e && e.emit("unpipe", this, n),
                    this);
                if (!e) {
                    var r = t.pipes
                      , a = t.pipesCount;
                    t.pipes = null,
                    t.pipesCount = 0,
                    t.flowing = !1;
                    for (var o = 0; o < a; o++)
                        r[o].emit("unpipe", this, n);
                    return this
                }
                var d = L(t.pipes, e);
                return -1 === d ? this : (t.pipes.splice(d, 1),
                t.pipesCount -= 1,
                1 === t.pipesCount && (t.pipes = t.pipes[0]),
                e.emit("unpipe", this, n),
                this)
            }
            ,
            s.prototype.on = function(e, t) {
                var n = M.prototype.on.call(this, e, t);
                if ("data" === e)
                    !1 !== this._readableState.flowing && this.resume();
                else if ("readable" === e) {
                    var r = this._readableState;
                    r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0,
                    r.emittedReadable = !1,
                    r.reading ? r.length && g(this) : A.nextTick(k, this))
                }
                return n
            }
            ,
            s.prototype.addListener = s.prototype.on,
            s.prototype.resume = function() {
                var e = this._readableState;
                return e.flowing || (W("resume"),
                e.flowing = !0,
                x(this, e)),
                this
            }
            ,
            s.prototype.pause = function() {
                return W("call pause flowing=%j", this._readableState.flowing),
                !1 !== this._readableState.flowing && (W("pause"),
                this._readableState.flowing = !1,
                this.emit("pause")),
                this
            }
            ,
            s.prototype.wrap = function(e) {
                var t = this
                  , r = this._readableState
                  , a = !1;
                for (var o in e.on("end", function() {
                    if (W("wrapped end"),
                    r.decoder && !r.ended) {
                        var e = r.decoder.end();
                        e && e.length && t.push(e)
                    }
                    t.push(null)
                }),
                e.on("data", function(n) {
                    if ((W("wrapped data"),
                    r.decoder && (n = r.decoder.write(n)),
                    !(r.objectMode && (null === n || void 0 === n))) && (r.objectMode || n && n.length)) {
                        var o = t.push(n);
                        o || (a = !0,
                        e.pause())
                    }
                }),
                e)
                    void 0 === this[o] && "function" == typeof e[o] && (this[o] = function(t) {
                        return function() {
                            return e[t].apply(e, arguments)
                        }
                    }(o));
                for (var i = 0; i < Z.length; i++)
                    e.on(Z[i], this.emit.bind(this, Z[i]));
                return this._read = function(t) {
                    W("wrapped _read", t),
                    a && (a = !1,
                    e.resume())
                }
                ,
                this
            }
            ,
            Object.defineProperty(s.prototype, "readableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._readableState.highWaterMark
                }
            }),
            s._fromList = E
        }
        ).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {
        "./_stream_duplex": 177,
        "./internal/streams/BufferList": 182,
        "./internal/streams/destroy": 183,
        "./internal/streams/stream": 184,
        _process: 137,
        "core-util-is": 26,
        events: 53,
        inherits: 60,
        isarray: 65,
        "process-nextick-args": 136,
        "safe-buffer": 166,
        "string_decoder/": 189,
        util: 17
    }],
    180: [function(e, t) {
        'use strict';
        function n(e, t) {
            var n = this._transformState;
            n.transforming = !1;
            var r = n.writecb;
            if (!r)
                return this.emit("error", new Error("write callback called multiple times"));
            n.writechunk = null,
            n.writecb = null,
            null != t && this.push(t),
            r(e);
            var a = this._readableState;
            a.reading = !1,
            (a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
        }
        function r(e) {
            return this instanceof r ? void (i.call(this, e),
            this._transformState = {
                afterTransform: n.bind(this),
                needTransform: !1,
                transforming: !1,
                writecb: null,
                writechunk: null,
                writeencoding: null
            },
            this._readableState.needReadable = !0,
            this._readableState.sync = !1,
            e && ("function" == typeof e.transform && (this._transform = e.transform),
            "function" == typeof e.flush && (this._flush = e.flush)),
            this.on("prefinish", a)) : new r(e)
        }
        function a() {
            var e = this;
            "function" == typeof this._flush ? this._flush(function(t, n) {
                o(e, t, n)
            }) : o(this, null, null)
        }
        function o(e, t, n) {
            if (t)
                return e.emit("error", t);
            if (null != n && e.push(n),
            e._writableState.length)
                throw new Error("Calling transform done when ws.length != 0");
            if (e._transformState.transforming)
                throw new Error("Calling transform done when still transforming");
            return e.push(null)
        }
        t.exports = r;
        var i = e("./_stream_duplex")
          , d = e("core-util-is");
        d.inherits = e("inherits"),
        d.inherits(r, i),
        r.prototype.push = function(e, t) {
            return this._transformState.needTransform = !1,
            i.prototype.push.call(this, e, t)
        }
        ,
        r.prototype._transform = function() {
            throw new Error("_transform() is not implemented")
        }
        ,
        r.prototype._write = function(e, t, n) {
            var r = this._transformState;
            if (r.writecb = n,
            r.writechunk = e,
            r.writeencoding = t,
            !r.transforming) {
                var a = this._readableState;
                (r.needTransform || a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
            }
        }
        ,
        r.prototype._read = function() {
            var e = this._transformState;
            null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0,
            this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0
        }
        ,
        r.prototype._destroy = function(e, t) {
            var n = this;
            i.prototype._destroy.call(this, e, function(e) {
                t(e),
                n.emit("close")
            })
        }
    }
    , {
        "./_stream_duplex": 177,
        "core-util-is": 26,
        inherits: 60
    }],
    181: [function(e, t) {
        (function(n, r, a) {
            'use strict';
            function o(e) {
                var t = this;
                this.next = null,
                this.entry = null,
                this.finish = function() {
                    I(t, e)
                }
            }
            function i(e) {
                return O.from(e)
            }
            function d(e) {
                return O.isBuffer(e) || e instanceof U
            }
            function s() {}
            function l(t, n) {
                B = B || e("./_stream_duplex"),
                t = t || {};
                var r = n instanceof B;
                this.objectMode = !!t.objectMode,
                r && (this.objectMode = this.objectMode || !!t.writableObjectMode);
                var a = t.highWaterMark
                  , i = t.writableHighWaterMark
                  , d = this.objectMode ? 16 : 16384;
                this.highWaterMark = a || 0 === a ? a : r && (i || 0 === i) ? i : d,
                this.highWaterMark = Math.floor(this.highWaterMark),
                this.finalCalled = !1,
                this.needDrain = !1,
                this.ending = !1,
                this.ended = !1,
                this.finished = !1,
                this.destroyed = !1;
                var s = !1 === t.decodeStrings;
                this.decodeStrings = !s,
                this.defaultEncoding = t.defaultEncoding || "utf8",
                this.length = 0,
                this.writing = !1,
                this.corked = 0,
                this.sync = !0,
                this.bufferProcessing = !1,
                this.onwrite = function(e) {
                    b(n, e)
                }
                ,
                this.writecb = null,
                this.writelen = 0,
                this.bufferedRequest = null,
                this.lastBufferedRequest = null,
                this.pendingcb = 0,
                this.prefinished = !1,
                this.errorEmitted = !1,
                this.bufferedRequestCount = 0,
                this.corkedRequestsFree = new o(this)
            }
            function c(t) {
                return B = B || e("./_stream_duplex"),
                M.call(c, this) || this instanceof B ? void (this._writableState = new l(t,this),
                this.writable = !0,
                t && ("function" == typeof t.write && (this._write = t.write),
                "function" == typeof t.writev && (this._writev = t.writev),
                "function" == typeof t.destroy && (this._destroy = t.destroy),
                "function" == typeof t.final && (this._final = t.final)),
                P.call(this)) : new c(t)
            }
            function u(e, t) {
                var n = new Error("write after end");
                e.emit("error", n),
                T.nextTick(t, n)
            }
            function f(e, t, n, r) {
                var a = !0
                  , o = !1;
                return null === n ? o = new TypeError("May not write null values to stream") : "string" != typeof n && void 0 !== n && !t.objectMode && (o = new TypeError("Invalid non-string/buffer chunk")),
                o && (e.emit("error", o),
                T.nextTick(r, o),
                a = !1),
                a
            }
            function p(e, t, n) {
                return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = O.from(t, n)),
                t
            }
            function h(e, t, n, r, a, o) {
                if (!n) {
                    var i = p(t, r, a);
                    r !== i && (n = !0,
                    a = "buffer",
                    r = i)
                }
                var d = t.objectMode ? 1 : r.length;
                t.length += d;
                var s = t.length < t.highWaterMark;
                if (s || (t.needDrain = !0),
                t.writing || t.corked) {
                    var l = t.lastBufferedRequest;
                    t.lastBufferedRequest = {
                        chunk: r,
                        encoding: a,
                        isBuf: n,
                        callback: o,
                        next: null
                    },
                    l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest,
                    t.bufferedRequestCount += 1
                } else
                    m(e, t, !1, d, r, a, o);
                return s
            }
            function m(e, t, n, r, a, o, i) {
                t.writelen = r,
                t.writecb = i,
                t.writing = !0,
                t.sync = !0,
                n ? e._writev(a, t.onwrite) : e._write(a, o, t.onwrite),
                t.sync = !1
            }
            function g(e, t, n, r, a) {
                --t.pendingcb,
                n ? (T.nextTick(a, r),
                T.nextTick(E, e, t),
                e._writableState.errorEmitted = !0,
                e.emit("error", r)) : (a(r),
                e._writableState.errorEmitted = !0,
                e.emit("error", r),
                E(e, t))
            }
            function _(e) {
                e.writing = !1,
                e.writecb = null,
                e.length -= e.writelen,
                e.writelen = 0
            }
            function b(e, t) {
                var n = e._writableState
                  , r = n.sync
                  , a = n.writecb;
                if (_(n),
                t)
                    g(e, n, r, t, a);
                else {
                    var o = x(n);
                    o || n.corked || n.bufferProcessing || !n.bufferedRequest || k(e, n),
                    r ? R(y, e, n, o, a) : y(e, n, o, a)
                }
            }
            function y(e, t, n, r) {
                n || w(e, t),
                t.pendingcb--,
                r(),
                E(e, t)
            }
            function w(e, t) {
                0 === t.length && t.needDrain && (t.needDrain = !1,
                e.emit("drain"))
            }
            function k(e, t) {
                t.bufferProcessing = !0;
                var n = t.bufferedRequest;
                if (e._writev && n && n.next) {
                    var r = t.bufferedRequestCount
                      , a = Array(r)
                      , i = t.corkedRequestsFree;
                    i.entry = n;
                    for (var d = 0, s = !0; n; )
                        a[d] = n,
                        n.isBuf || (s = !1),
                        n = n.next,
                        d += 1;
                    a.allBuffers = s,
                    m(e, t, !0, t.length, a, "", i.finish),
                    t.pendingcb++,
                    t.lastBufferedRequest = null,
                    i.next ? (t.corkedRequestsFree = i.next,
                    i.next = null) : t.corkedRequestsFree = new o(t),
                    t.bufferedRequestCount = 0
                } else {
                    for (; n; ) {
                        var l = n.chunk
                          , c = n.encoding
                          , u = n.callback
                          , f = t.objectMode ? 1 : l.length;
                        if (m(e, t, !1, f, l, c, u),
                        n = n.next,
                        t.bufferedRequestCount--,
                        t.writing)
                            break
                    }
                    null === n && (t.lastBufferedRequest = null)
                }
                t.bufferedRequest = n,
                t.bufferProcessing = !1
            }
            function x(e) {
                return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
            }
            function v(e, t) {
                e._final(function(n) {
                    t.pendingcb--,
                    n && e.emit("error", n),
                    t.prefinished = !0,
                    e.emit("prefinish"),
                    E(e, t)
                })
            }
            function S(e, t) {
                t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++,
                t.finalCalled = !0,
                T.nextTick(v, e, t)) : (t.prefinished = !0,
                e.emit("prefinish")))
            }
            function E(e, t) {
                var n = x(t);
                return n && (S(e, t),
                0 === t.pendingcb && (t.finished = !0,
                e.emit("finish"))),
                n
            }
            function C(e, t, n) {
                t.ending = !0,
                E(e, t),
                n && (t.finished ? T.nextTick(n) : e.once("finish", n)),
                t.ended = !0,
                e.writable = !1
            }
            function I(e, t, n) {
                var r = e.entry;
                for (e.entry = null; r; ) {
                    var a = r.callback;
                    t.pendingcb--,
                    a(n),
                    r = r.next
                }
                t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e
            }
            var T = e("process-nextick-args");
            t.exports = c;
            var R = !n.browser && -1 < ["v0.10", "v0.9."].indexOf(n.version.slice(0, 5)) ? a : T.nextTick, B;
            c.WritableState = l;
            var L = e("core-util-is");
            L.inherits = e("inherits");
            var A = {
                deprecate: e("util-deprecate")
            }
              , P = e("./internal/streams/stream")
              , O = e("safe-buffer").Buffer
              , U = r.Uint8Array || function() {}
              , D = e("./internal/streams/destroy");
            L.inherits(c, P),
            l.prototype.getBuffer = function() {
                for (var e = this.bufferedRequest, t = []; e; )
                    t.push(e),
                    e = e.next;
                return t
            }
            ,
            function() {
                try {
                    Object.defineProperty(l.prototype, "buffer", {
                        get: A.deprecate(function() {
                            return this.getBuffer()
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                    })
                } catch (e) {}
            }();
            var M;
            "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (M = Function.prototype[Symbol.hasInstance],
            Object.defineProperty(c, Symbol.hasInstance, {
                value: function(e) {
                    return !!M.call(this, e) || !(this !== c) && e && e._writableState instanceof l
                }
            })) : M = function(e) {
                return e instanceof this
            }
            ,
            c.prototype.pipe = function() {
                this.emit("error", new Error("Cannot pipe, not readable"))
            }
            ,
            c.prototype.write = function(e, t, n) {
                var r = this._writableState
                  , a = !1
                  , o = !r.objectMode && d(e);
                return o && !O.isBuffer(e) && (e = i(e)),
                "function" == typeof t && (n = t,
                t = null),
                o ? t = "buffer" : !t && (t = r.defaultEncoding),
                "function" != typeof n && (n = s),
                r.ended ? u(this, n) : (o || f(this, r, e, n)) && (r.pendingcb++,
                a = h(this, r, o, e, t, n)),
                a
            }
            ,
            c.prototype.cork = function() {
                var e = this._writableState;
                e.corked++
            }
            ,
            c.prototype.uncork = function() {
                var e = this._writableState;
                e.corked && (e.corked--,
                !e.writing && !e.corked && !e.finished && !e.bufferProcessing && e.bufferedRequest && k(this, e))
            }
            ,
            c.prototype.setDefaultEncoding = function(e) {
                if ("string" == typeof e && (e = e.toLowerCase()),
                !(-1 < ["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase())))
                    throw new TypeError("Unknown encoding: " + e);
                return this._writableState.defaultEncoding = e,
                this
            }
            ,
            Object.defineProperty(c.prototype, "writableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._writableState.highWaterMark
                }
            }),
            c.prototype._write = function(e, t, n) {
                n(new Error("_write() is not implemented"))
            }
            ,
            c.prototype._writev = null,
            c.prototype.end = function(e, t, n) {
                var r = this._writableState;
                "function" == typeof e ? (n = e,
                e = null,
                t = null) : "function" == typeof t && (n = t,
                t = null),
                null !== e && e !== void 0 && this.write(e, t),
                r.corked && (r.corked = 1,
                this.uncork()),
                r.ending || r.finished || C(this, r, n)
            }
            ,
            Object.defineProperty(c.prototype, "destroyed", {
                get: function() {
                    return void 0 !== this._writableState && this._writableState.destroyed
                },
                set: function(e) {
                    this._writableState && (this._writableState.destroyed = e)
                }
            }),
            c.prototype.destroy = D.destroy,
            c.prototype._undestroy = D.undestroy,
            c.prototype._destroy = function(e, t) {
                this.end(),
                t(e)
            }
        }
        ).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("timers").setImmediate)
    }
    , {
        "./_stream_duplex": 177,
        "./internal/streams/destroy": 183,
        "./internal/streams/stream": 184,
        _process: 137,
        "core-util-is": 26,
        inherits: 60,
        "process-nextick-args": 136,
        "safe-buffer": 166,
        timers: 203,
        "util-deprecate": 215
    }],
    182: [function(e, t) {
        'use strict';
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function r(e, t, n) {
            e.copy(t, n)
        }
        var a = e("safe-buffer").Buffer
          , o = e("util");
        t.exports = function() {
            function e() {
                n(this, e),
                this.head = null,
                this.tail = null,
                this.length = 0
            }
            return e.prototype.push = function(e) {
                var t = {
                    data: e,
                    next: null
                };
                0 < this.length ? this.tail.next = t : this.head = t,
                this.tail = t,
                ++this.length
            }
            ,
            e.prototype.unshift = function(e) {
                var t = {
                    data: e,
                    next: this.head
                };
                0 === this.length && (this.tail = t),
                this.head = t,
                ++this.length
            }
            ,
            e.prototype.shift = function() {
                if (0 !== this.length) {
                    var e = this.head.data;
                    return this.head = 1 === this.length ? this.tail = null : this.head.next,
                    --this.length,
                    e
                }
            }
            ,
            e.prototype.clear = function() {
                this.head = this.tail = null,
                this.length = 0
            }
            ,
            e.prototype.join = function(e) {
                if (0 === this.length)
                    return "";
                for (var t = this.head, n = "" + t.data; t = t.next; )
                    n += e + t.data;
                return n
            }
            ,
            e.prototype.concat = function(e) {
                if (0 === this.length)
                    return a.alloc(0);
                if (1 === this.length)
                    return this.head.data;
                for (var t = a.allocUnsafe(e >>> 0), n = this.head, o = 0; n; )
                    r(n.data, t, o),
                    o += n.data.length,
                    n = n.next;
                return t
            }
            ,
            e
        }(),
        o && o.inspect && o.inspect.custom && (t.exports.prototype[o.inspect.custom] = function() {
            var e = o.inspect({
                length: this.length
            });
            return this.constructor.name + " " + e
        }
        )
    }
    , {
        "safe-buffer": 166,
        util: 17
    }],
    183: [function(e, t) {
        'use strict';
        function n(e, t) {
            e.emit("error", t)
        }
        var r = e("process-nextick-args");
        t.exports = {
            destroy: function(e, t) {
                var a = this
                  , o = this._readableState && this._readableState.destroyed
                  , i = this._writableState && this._writableState.destroyed;
                return o || i ? (t ? t(e) : e && (!this._writableState || !this._writableState.errorEmitted) && r.nextTick(n, this, e),
                this) : (this._readableState && (this._readableState.destroyed = !0),
                this._writableState && (this._writableState.destroyed = !0),
                this._destroy(e || null, function(e) {
                    !t && e ? (r.nextTick(n, a, e),
                    a._writableState && (a._writableState.errorEmitted = !0)) : t && t(e)
                }),
                this)
            },
            undestroy: function() {
                this._readableState && (this._readableState.destroyed = !1,
                this._readableState.reading = !1,
                this._readableState.ended = !1,
                this._readableState.endEmitted = !1),
                this._writableState && (this._writableState.destroyed = !1,
                this._writableState.ended = !1,
                this._writableState.ending = !1,
                this._writableState.finished = !1,
                this._writableState.errorEmitted = !1)
            }
        }
    }
    , {
        "process-nextick-args": 136
    }],
    184: [function(e, t, n) {
        arguments[4][159][0].apply(n, arguments)
    }
    , {
        dup: 159,
        events: 53
    }],
    185: [function(e, t) {
        t.exports = e("./readable").PassThrough
    }
    , {
        "./readable": 186
    }],
    186: [function(e, t, n) {
        n = t.exports = e("./lib/_stream_readable.js"),
        n.Stream = n,
        n.Readable = n,
        n.Writable = e("./lib/_stream_writable.js"),
        n.Duplex = e("./lib/_stream_duplex.js"),
        n.Transform = e("./lib/_stream_transform.js"),
        n.PassThrough = e("./lib/_stream_passthrough.js")
    }
    , {
        "./lib/_stream_duplex.js": 177,
        "./lib/_stream_passthrough.js": 178,
        "./lib/_stream_readable.js": 179,
        "./lib/_stream_transform.js": 180,
        "./lib/_stream_writable.js": 181
    }],
    187: [function(e, t) {
        t.exports = e("./readable").Transform
    }
    , {
        "./readable": 186
    }],
    188: [function(e, t) {
        t.exports = e("./lib/_stream_writable.js")
    }
    , {
        "./lib/_stream_writable.js": 181
    }],
    189: [function(e, t, n) {
        'use strict';
        function r(e) {
            if (!e)
                return "utf8";
            for (var t; ; )
                switch (e) {
                case "utf8":
                case "utf-8":
                    return "utf8";
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return "utf16le";
                case "latin1":
                case "binary":
                    return "latin1";
                case "base64":
                case "ascii":
                case "hex":
                    return e;
                default:
                    if (t)
                        return;
                    e = ("" + e).toLowerCase(),
                    t = !0;
                }
        }
        function a(e) {
            var t = r(e);
            if ("string" != typeof t && (_.isEncoding === b || !b(e)))
                throw new Error("Unknown encoding: " + e);
            return t || e
        }
        function o(e) {
            this.encoding = a(e);
            var t;
            switch (this.encoding) {
            case "utf16le":
                this.text = u,
                this.end = f,
                t = 4;
                break;
            case "utf8":
                this.fillLast = c,
                t = 4;
                break;
            case "base64":
                this.text = p,
                this.end = h,
                t = 3;
                break;
            default:
                return this.write = m,
                void (this.end = g);
            }
            this.lastNeed = 0,
            this.lastTotal = 0,
            this.lastChar = _.allocUnsafe(t)
        }
        function d(e) {
            if (127 >= e)
                return 0;
            return 6 == e >> 5 ? 2 : 14 == e >> 4 ? 3 : 30 == e >> 3 ? 4 : 2 == e >> 6 ? -1 : -2
        }
        function s(e, t, n) {
            var r = t.length - 1;
            if (r < n)
                return 0;
            var a = d(t[r]);
            return 0 <= a ? (0 < a && (e.lastNeed = a - 1),
            a) : --r < n || -2 === a ? 0 : (a = d(t[r]),
            0 <= a) ? (0 < a && (e.lastNeed = a - 2),
            a) : --r < n || -2 === a ? 0 : (a = d(t[r]),
            0 <= a ? (0 < a && (2 === a ? a = 0 : e.lastNeed = a - 3),
            a) : 0)
        }
        function l(e, t) {
            if (128 != (192 & t[0]))
                return e.lastNeed = 0,
                "\uFFFD";
            if (1 < e.lastNeed && 1 < t.length) {
                if (128 != (192 & t[1]))
                    return e.lastNeed = 1,
                    "\uFFFD";
                if (2 < e.lastNeed && 2 < t.length && 128 != (192 & t[2]))
                    return e.lastNeed = 2,
                    "\uFFFD"
            }
        }
        function c(e) {
            var t = this.lastTotal - this.lastNeed
              , n = l(this, e, t);
            return void 0 === n ? this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed),
            this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void (e.copy(this.lastChar, t, 0, e.length),
            this.lastNeed -= e.length) : n
        }
        function u(e, t) {
            if (0 == (e.length - t) % 2) {
                var n = e.toString("utf16le", t);
                if (n) {
                    var r = n.charCodeAt(n.length - 1);
                    if (55296 <= r && 56319 >= r)
                        return this.lastNeed = 2,
                        this.lastTotal = 4,
                        this.lastChar[0] = e[e.length - 2],
                        this.lastChar[1] = e[e.length - 1],
                        n.slice(0, -1)
                }
                return n
            }
            return this.lastNeed = 1,
            this.lastTotal = 2,
            this.lastChar[0] = e[e.length - 1],
            e.toString("utf16le", t, e.length - 1)
        }
        function f(e) {
            var t = e && e.length ? this.write(e) : "";
            if (this.lastNeed) {
                var n = this.lastTotal - this.lastNeed;
                return t + this.lastChar.toString("utf16le", 0, n)
            }
            return t
        }
        function p(e, t) {
            var r = (e.length - t) % 3;
            return 0 == r ? e.toString("base64", t) : (this.lastNeed = 3 - r,
            this.lastTotal = 3,
            1 == r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2],
            this.lastChar[1] = e[e.length - 1]),
            e.toString("base64", t, e.length - r))
        }
        function h(e) {
            var t = e && e.length ? this.write(e) : "";
            return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
        }
        function m(e) {
            return e.toString(this.encoding)
        }
        function g(e) {
            return e && e.length ? this.write(e) : ""
        }
        var _ = e("safe-buffer").Buffer
          , b = _.isEncoding || function(e) {
            switch (e = "" + e,
            e && e.toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
            case "raw":
                return !0;
            default:
                return !1;
            }
        }
        ;
        n.StringDecoder = o,
        o.prototype.write = function(e) {
            if (0 === e.length)
                return "";
            var t, n;
            if (this.lastNeed) {
                if (t = this.fillLast(e),
                void 0 === t)
                    return "";
                n = this.lastNeed,
                this.lastNeed = 0
            } else
                n = 0;
            return n < e.length ? t ? t + this.text(e, n) : this.text(e, n) : t || ""
        }
        ,
        o.prototype.end = function(e) {
            var t = e && e.length ? this.write(e) : "";
            return this.lastNeed ? t + "\uFFFD" : t
        }
        ,
        o.prototype.text = function(e, t) {
            var n = s(this, e, t);
            if (!this.lastNeed)
                return e.toString("utf8", t);
            this.lastTotal = n;
            var r = e.length - (n - this.lastNeed);
            return e.copy(this.lastChar, 0, r),
            e.toString("utf8", t, r)
        }
        ,
        o.prototype.fillLast = function(e) {
            return this.lastNeed <= e.length ? (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
            this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
            this.lastNeed -= e.length)
        }
    }
    , {
        "safe-buffer": 166
    }],
    190: [function(e, t, n) {
        (function(t) {
            var r = e("./lib/request")
              , a = e("./lib/response")
              , o = e("xtend")
              , i = e("builtin-status-codes")
              , d = e("url")
              , s = n;
            s.request = function(e, n) {
                e = "string" == typeof e ? d.parse(e) : o(e);
                var a = -1 === t.location.protocol.search(/^https?:$/) ? "http:" : ""
                  , i = e.protocol || a
                  , s = e.hostname || e.host
                  , l = e.port
                  , c = e.path || "/";
                s && -1 !== s.indexOf(":") && (s = "[" + s + "]"),
                e.url = (s ? i + "//" + s : "") + (l ? ":" + l : "") + c,
                e.method = (e.method || "GET").toUpperCase(),
                e.headers = e.headers || {};
                var u = new r(e);
                return n && u.on("response", n),
                u
            }
            ,
            s.get = function(e, t) {
                var n = s.request(e, t);
                return n.end(),
                n
            }
            ,
            s.ClientRequest = r,
            s.IncomingMessage = a.IncomingMessage,
            s.Agent = function() {}
            ,
            s.Agent.defaultMaxSockets = 4,
            s.globalAgent = new s.Agent,
            s.STATUS_CODES = i,
            s.METHODS = ["CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"]
        }
        ).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {
        "./lib/request": 192,
        "./lib/response": 193,
        "builtin-status-codes": 24,
        url: 212,
        xtend: 227
    }],
    191: [function(e, t, n) {
        (function(e) {
            function t() {
                if (o !== void 0)
                    return o;
                if (e.XMLHttpRequest) {
                    o = new e.XMLHttpRequest;
                    try {
                        o.open("GET", e.XDomainRequest ? "/" : "https://example.com")
                    } catch (t) {
                        o = null
                    }
                } else
                    o = null;
                return o
            }
            function r(e) {
                var n = t();
                if (!n)
                    return !1;
                try {
                    return n.responseType = e,
                    n.responseType === e
                } catch (t) {}
                return !1
            }
            function a(e) {
                return "function" == typeof e
            }
            n.fetch = a(e.fetch) && a(e.ReadableStream),
            n.writableStream = a(e.WritableStream),
            n.abortController = a(e.AbortController);
            var o;
            n.arraybuffer = n.fetch || r("arraybuffer"),
            n.msstream = !n.fetch && r("ms-stream"),
            n.mozchunkedarraybuffer = !n.fetch && r("moz-chunked-arraybuffer"),
            n.overrideMimeType = n.fetch || !!t() && a(t().overrideMimeType),
            o = null
        }
        ).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {}],
    192: [function(e, t) {
        (function(n, r, a) {
            function o(e, t) {
                return d.fetch && t ? "fetch" : d.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : d.msstream ? "ms-stream" : d.arraybuffer && e ? "arraybuffer" : "text"
            }
            function i(e) {
                try {
                    var t = e.status;
                    return null !== t && 0 !== t
                } catch (t) {
                    return !1
                }
            }
            var d = e("./capability")
              , s = e("inherits")
              , l = e("./response")
              , c = e("readable-stream")
              , u = l.IncomingMessage
              , f = l.readyStates
              , p = t.exports = function(e) {
                var t = this;
                c.Writable.call(t),
                t._opts = e,
                t._body = [],
                t._headers = {},
                e.auth && t.setHeader("Authorization", "Basic " + a.from(e.auth).toString("base64")),
                Object.keys(e.headers).forEach(function(n) {
                    t.setHeader(n, e.headers[n])
                });
                var n = !0, r;
                if ("disable-fetch" === e.mode || "requestTimeout"in e && !d.abortController)
                    n = !1,
                    r = !0;
                else if ("prefer-streaming" === e.mode)
                    r = !1;
                else if ("allow-wrong-content-type" === e.mode)
                    r = !d.overrideMimeType;
                else if (!e.mode || "default" === e.mode || "prefer-fast" === e.mode)
                    r = !0;
                else
                    throw new Error("Invalid value for opts.mode");
                t._mode = o(r, n),
                t._fetchTimer = null,
                t.on("finish", function() {
                    t._onFinish()
                })
            }
            ;
            s(p, c.Writable),
            p.prototype.setHeader = function(e, t) {
                var n = this
                  , r = e.toLowerCase();
                -1 !== h.indexOf(r) || (n._headers[r] = {
                    name: e,
                    value: t
                })
            }
            ,
            p.prototype.getHeader = function(e) {
                var t = this._headers[e.toLowerCase()];
                return t ? t.value : null
            }
            ,
            p.prototype.removeHeader = function(e) {
                var t = this;
                delete t._headers[e.toLowerCase()]
            }
            ,
            p.prototype._onFinish = function() {
                var e = this;
                if (!e._destroyed) {
                    var t = e._opts
                      , a = e._headers
                      , o = null;
                    "GET" !== t.method && "HEAD" !== t.method && (o = new Blob(e._body,{
                        type: (a["content-type"] || {}).value || ""
                    }));
                    var i = [];
                    if (Object.keys(a).forEach(function(e) {
                        var t = a[e].name
                          , n = a[e].value;
                        Array.isArray(n) ? n.forEach(function(e) {
                            i.push([t, e])
                        }) : i.push([t, n])
                    }),
                    "fetch" === e._mode) {
                        var s = null;
                        if (d.abortController) {
                            var l = new AbortController;
                            s = l.signal,
                            e._fetchAbortController = l,
                            "requestTimeout"in t && 0 !== t.requestTimeout && (e._fetchTimer = r.setTimeout(function() {
                                e.emit("requestTimeout"),
                                e._fetchAbortController && e._fetchAbortController.abort()
                            }, t.requestTimeout))
                        }
                        r.fetch(e._opts.url, {
                            method: e._opts.method,
                            headers: i,
                            body: o || void 0,
                            mode: "cors",
                            credentials: t.withCredentials ? "include" : "same-origin",
                            signal: s
                        }).then(function(t) {
                            e._fetchResponse = t,
                            e._connect()
                        }, function(t) {
                            r.clearTimeout(e._fetchTimer),
                            e._destroyed || e.emit("error", t)
                        })
                    } else {
                        var c = e._xhr = new r.XMLHttpRequest;
                        try {
                            c.open(e._opts.method, e._opts.url, !0)
                        } catch (t) {
                            return void n.nextTick(function() {
                                e.emit("error", t)
                            })
                        }
                        "responseType"in c && (c.responseType = e._mode),
                        "withCredentials"in c && (c.withCredentials = !!t.withCredentials),
                        "text" === e._mode && "overrideMimeType"in c && c.overrideMimeType("text/plain; charset=x-user-defined"),
                        "requestTimeout"in t && (c.timeout = t.requestTimeout,
                        c.ontimeout = function() {
                            e.emit("requestTimeout")
                        }
                        ),
                        i.forEach(function(e) {
                            c.setRequestHeader(e[0], e[1])
                        }),
                        e._response = null,
                        c.onreadystatechange = function() {
                            switch (c.readyState) {
                            case f.LOADING:
                            case f.DONE:
                                e._onXHRProgress();
                            }
                        }
                        ,
                        "moz-chunked-arraybuffer" === e._mode && (c.onprogress = function() {
                            e._onXHRProgress()
                        }
                        ),
                        c.onerror = function() {
                            e._destroyed || e.emit("error", new Error("XHR error"))
                        }
                        ;
                        try {
                            c.send(o)
                        } catch (t) {
                            return void n.nextTick(function() {
                                e.emit("error", t)
                            })
                        }
                    }
                }
            }
            ,
            p.prototype._onXHRProgress = function() {
                var e = this;
                !i(e._xhr) || e._destroyed || (!e._response && e._connect(),
                e._response._onXHRProgress())
            }
            ,
            p.prototype._connect = function() {
                var e = this;
                e._destroyed || (e._response = new u(e._xhr,e._fetchResponse,e._mode,e._fetchTimer),
                e._response.on("error", function(t) {
                    e.emit("error", t)
                }),
                e.emit("response", e._response))
            }
            ,
            p.prototype._write = function(e, t, n) {
                var r = this;
                r._body.push(e),
                n()
            }
            ,
            p.prototype.abort = p.prototype.destroy = function() {
                var e = this;
                e._destroyed = !0,
                r.clearTimeout(e._fetchTimer),
                e._response && (e._response._destroyed = !0),
                e._xhr ? e._xhr.abort() : e._fetchAbortController && e._fetchAbortController.abort()
            }
            ,
            p.prototype.end = function(e, t, n) {
                var r = this;
                "function" == typeof e && (n = e,
                e = void 0),
                c.Writable.prototype.end.call(r, e, t, n)
            }
            ,
            p.prototype.flushHeaders = function() {}
            ,
            p.prototype.setTimeout = function() {}
            ,
            p.prototype.setNoDelay = function() {}
            ,
            p.prototype.setSocketKeepAlive = function() {}
            ;
            var h = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"]
        }
        ).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("buffer").Buffer)
    }
    , {
        "./capability": 191,
        "./response": 193,
        _process: 137,
        buffer: 23,
        inherits: 60,
        "readable-stream": 160
    }],
    193: [function(e, t, n) {
        (function(t, r, a) {
            var o = e("./capability")
              , i = e("inherits")
              , d = e("readable-stream")
              , s = n.readyStates = {
                UNSENT: 0,
                OPENED: 1,
                HEADERS_RECEIVED: 2,
                LOADING: 3,
                DONE: 4
            }
              , l = n.IncomingMessage = function(e, n, i, s) {
                var l = this;
                if (d.Readable.call(l),
                l._mode = i,
                l.headers = {},
                l.rawHeaders = [],
                l.trailers = {},
                l.rawTrailers = [],
                l.on("end", function() {
                    t.nextTick(function() {
                        l.emit("close")
                    })
                }),
                "fetch" === i) {
                    function e() {
                        u.read().then(function(t) {
                            return l._destroyed ? void 0 : t.done ? (r.clearTimeout(s),
                            void l.push(null)) : void (l.push(a.from(t.value)),
                            e())
                        }).catch(function(e) {
                            r.clearTimeout(s),
                            l._destroyed || l.emit("error", e)
                        })
                    }
                    if (l._fetchResponse = n,
                    l.url = n.url,
                    l.statusCode = n.status,
                    l.statusMessage = n.statusText,
                    n.headers.forEach(function(e, t) {
                        l.headers[t.toLowerCase()] = e,
                        l.rawHeaders.push(t, e)
                    }),
                    o.writableStream) {
                        var c = new WritableStream({
                            write: function(e) {
                                return new Promise(function(t, n) {
                                    l._destroyed ? n() : l.push(a.from(e)) ? t() : l._resumeFetch = t
                                }
                                )
                            },
                            close: function() {
                                r.clearTimeout(s),
                                l._destroyed || l.push(null)
                            },
                            abort: function(e) {
                                l._destroyed || l.emit("error", e)
                            }
                        });
                        try {
                            return void n.body.pipeTo(c).catch(function(e) {
                                r.clearTimeout(s),
                                l._destroyed || l.emit("error", e)
                            })
                        } catch (t) {}
                    }
                    var u = n.body.getReader();
                    e()
                } else {
                    l._xhr = e,
                    l._pos = 0,
                    l.url = e.responseURL,
                    l.statusCode = e.status,
                    l.statusMessage = e.statusText;
                    var f = e.getAllResponseHeaders().split(/\r?\n/);
                    if (f.forEach(function(e) {
                        var t = e.match(/^([^:]+):\s*(.*)/);
                        if (t) {
                            var n = t[1].toLowerCase();
                            "set-cookie" === n ? (void 0 === l.headers[n] && (l.headers[n] = []),
                            l.headers[n].push(t[2])) : void 0 === l.headers[n] ? l.headers[n] = t[2] : l.headers[n] += ", " + t[2],
                            l.rawHeaders.push(t[1], t[2])
                        }
                    }),
                    l._charset = "x-user-defined",
                    !o.overrideMimeType) {
                        var p = l.rawHeaders["mime-type"];
                        if (p) {
                            var h = p.match(/;\s*charset=([^;])(;|$)/);
                            h && (l._charset = h[1].toLowerCase())
                        }
                        l._charset || (l._charset = "utf-8")
                    }
                }
            }
            ;
            i(l, d.Readable),
            l.prototype._read = function() {
                var e = this
                  , t = e._resumeFetch;
                t && (e._resumeFetch = null,
                t())
            }
            ,
            l.prototype._onXHRProgress = function() {
                var e = this
                  , t = e._xhr
                  , n = null;
                switch (e._mode) {
                case "text":
                    if (n = t.responseText,
                    n.length > e._pos) {
                        var o = n.substr(e._pos);
                        if ("x-user-defined" === e._charset) {
                            for (var d = a.alloc(o.length), l = 0; l < o.length; l++)
                                d[l] = 255 & o.charCodeAt(l);
                            e.push(d)
                        } else
                            e.push(o, e._charset);
                        e._pos = n.length
                    }
                    break;
                case "arraybuffer":
                    if (t.readyState !== s.DONE || !t.response)
                        break;
                    n = t.response,
                    e.push(a.from(new Uint8Array(n)));
                    break;
                case "moz-chunked-arraybuffer":
                    if (n = t.response,
                    t.readyState !== s.LOADING || !n)
                        break;
                    e.push(a.from(new Uint8Array(n)));
                    break;
                case "ms-stream":
                    if (n = t.response,
                    t.readyState !== s.LOADING)
                        break;
                    var c = new r.MSStreamReader;
                    c.onprogress = function() {
                        c.result.byteLength > e._pos && (e.push(a.from(new Uint8Array(c.result.slice(e._pos)))),
                        e._pos = c.result.byteLength)
                    }
                    ,
                    c.onload = function() {
                        e.push(null)
                    }
                    ,
                    c.readAsArrayBuffer(n);
                }
                e._xhr.readyState === s.DONE && "ms-stream" !== e._mode && e.push(null)
            }
        }
        ).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("buffer").Buffer)
    }
    , {
        "./capability": 191,
        _process: 137,
        buffer: 23,
        inherits: 60,
        "readable-stream": 160
    }],
    194: [function(e, t) {
        t.exports = async function(e, t) {
            const r = await n(e,t)
              , a = URL.createObjectURL(r);
            return a
        }
        ;
        const n = e("stream-to-blob")
    }
    , {
        "stream-to-blob": 195
    }],
    195: [function(e, t) {
        t.exports = function(e, t) {
            if (null != t && "string" != typeof t)
                throw new Error("Invalid mimetype, expected string.");
            return new Promise((n,r)=>{
                const a = [];
                e.on("data", e=>a.push(e)).once("end", ()=>{
                    const e = null == t ? new Blob(a) : new Blob(a,{
                        type: t
                    });
                    n(e)
                }
                ).once("error", r)
            }
            )
        }
    }
    , {}],
    196: [function(e, t) {
        (function(n) {
            var r = e("once");
            t.exports = function(e, t, a) {
                a = r(a);
                var o = n.alloc(t)
                  , i = 0;
                e.on("data", function(e) {
                    e.copy(o, i),
                    i += e.length
                }).on("end", function() {
                    a(null, o)
                }).on("error", a)
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23,
        once: 114
    }],
    197: [function(e, t, n) {
        arguments[4][189][0].apply(n, arguments)
    }
    , {
        dup: 189,
        "safe-buffer": 198
    }],
    198: [function(e, t, n) {
        function r(e, t) {
            for (var n in e)
                t[n] = e[n]
        }
        function a(e, t, n) {
            return i(e, t, n)
        }
        var o = e("buffer")
          , i = o.Buffer;
        i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = o : (r(o, n),
        n.Buffer = a),
        a.prototype = Object.create(i.prototype),
        r(i, a),
        a.from = function(e, t, n) {
            if ("number" == typeof e)
                throw new TypeError("Argument must not be a number");
            return i(e, t, n)
        }
        ,
        a.alloc = function(e, t, n) {
            if ("number" != typeof e)
                throw new TypeError("Argument must be a number");
            var r = i(e);
            return void 0 === t ? r.fill(0) : "string" == typeof n ? r.fill(t, n) : r.fill(t),
            r
        }
        ,
        a.allocUnsafe = function(e) {
            if ("number" != typeof e)
                throw new TypeError("Argument must be a number");
            return i(e)
        }
        ,
        a.allocUnsafeSlow = function(e) {
            if ("number" != typeof e)
                throw new TypeError("Argument must be a number");
            return o.SlowBuffer(e)
        }
    }
    , {
        buffer: 23
    }],
    199: [function(e, t, n) {
        var r = e("./thirty-two");
        n.encode = r.encode,
        n.decode = r.decode
    }
    , {
        "./thirty-two": 200
    }],
    200: [function(e, t, n) {
        (function(e) {
            'use strict';
            function t(e) {
                var t = Math.floor(e.length / 5);
                return 0 == e.length % 5 ? t : t + 1
            }
            var r = [255, 255, 26, 27, 28, 29, 30, 31, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255];
            n.encode = function(n) {
                e.isBuffer(n) || (n = new e(n));
                for (var r = 0, a = 0, o = 0, d = 0, s = new e(8 * t(n)); r < n.length; ) {
                    var l = n[r];
                    3 < o ? (d = l & 255 >> o,
                    o = (o + 5) % 8,
                    d = d << o | (r + 1 < n.length ? n[r + 1] : 0) >> 8 - o,
                    r++) : (d = 31 & l >> 8 - (o + 5),
                    o = (o + 5) % 8,
                    0 === o && r++),
                    s[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".charCodeAt(d),
                    a++
                }
                for (r = a; r < s.length; r++)
                    s[r] = 61;
                return s
            }
            ,
            n.decode = function(t) {
                var n = 0, a = 0, o = 0, d;
                e.isBuffer(t) || (t = new e(t));
                for (var s = new e(Math.ceil(5 * t.length / 8)), l = 0; l < t.length && !(61 === t[l]); l++) {
                    var c = t[l] - 48;
                    if (c < r.length)
                        a = r[c],
                        3 >= n ? (n = (n + 5) % 8,
                        0 === n ? (d |= a,
                        s[o] = d,
                        o++,
                        d = 0) : d |= 255 & a << 8 - n) : (n = (n + 5) % 8,
                        d |= 255 & a >>> n,
                        s[o] = d,
                        o++,
                        d = 255 & a << 8 - n);
                    else
                        throw new Error("Invalid input - it is not base32 encoded string")
                }
                return s.slice(0, o)
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23
    }],
    201: [function(e, t) {
        t.exports = function(e, t) {
            function n() {
                d = 0,
                r = +new Date,
                i = e.apply(a, o),
                a = null,
                o = null
            }
            var r = 0, a, o, i, d;
            return function() {
                a = this,
                o = arguments;
                var e = new Date - r;
                return d || (e >= t ? n() : d = setTimeout(n, t - e)),
                i
            }
        }
    }
    , {}],
    202: [function(e, t) {
        (function(e) {
            'use strict';
            function n(e) {
                return "[object Error]" === Object.prototype.toString.call(e)
            }
            function r() {}
            function a(e, t) {
                e.apply(null, t)
            }
            var o = function(t, n, r) {
                e.nextTick(function() {
                    t(n, r)
                })
            };
            e.nextTick(function(t) {
                42 === t && (o = e.nextTick)
            }, 42),
            t.exports = function(e) {
                function t(e) {
                    d(e || r)
                }
                function i(t) {
                    var r = [t];
                    d = function(e) {
                        r.push(e)
                    }
                    ,
                    e(function(e) {
                        function t(e) {
                            o(a, e, s)
                        }
                        var s = arguments;
                        for (d = n(e) ? i : t; r.length; )
                            t(r.shift())
                    })
                }
                var d = i;
                return t
            }
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137
    }],
    203: [function(e, t, n) {
        (function(t, r) {
            function a(e, t) {
                this._id = e,
                this._clearFn = t
            }
            var o = e("process/browser.js").nextTick
              , i = Function.prototype.apply
              , d = Array.prototype.slice
              , s = {}
              , l = 0;
            n.setTimeout = function() {
                return new a(i.call(setTimeout, window, arguments),clearTimeout)
            }
            ,
            n.setInterval = function() {
                return new a(i.call(setInterval, window, arguments),clearInterval)
            }
            ,
            n.clearTimeout = n.clearInterval = function(e) {
                e.close()
            }
            ,
            a.prototype.unref = a.prototype.ref = function() {}
            ,
            a.prototype.close = function() {
                this._clearFn.call(window, this._id)
            }
            ,
            n.enroll = function(e, t) {
                clearTimeout(e._idleTimeoutId),
                e._idleTimeout = t
            }
            ,
            n.unenroll = function(e) {
                clearTimeout(e._idleTimeoutId),
                e._idleTimeout = -1
            }
            ,
            n._unrefActive = n.active = function(e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                0 <= t && (e._idleTimeoutId = setTimeout(function() {
                    e._onTimeout && e._onTimeout()
                }, t))
            }
            ,
            n.setImmediate = "function" == typeof t ? t : function(e) {
                var t = l++
                  , r = !(2 > arguments.length) && d.call(arguments, 1);
                return s[t] = !0,
                o(function() {
                    s[t] && (r ? e.apply(null, r) : e.call(null),
                    n.clearImmediate(t))
                }),
                t
            }
            ,
            n.clearImmediate = "function" == typeof r ? r : function(e) {
                delete s[e]
            }
        }
        ).call(this, e("timers").setImmediate, e("timers").clearImmediate)
    }
    , {
        "process/browser.js": 137,
        timers: 203
    }],
    204: [function(e, t) {
        var n = e("buffer").Buffer;
        t.exports = function(e) {
            if (e instanceof Uint8Array) {
                if (0 === e.byteOffset && e.byteLength === e.buffer.byteLength)
                    return e.buffer;
                if ("function" == typeof e.buffer.slice)
                    return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)
            }
            if (n.isBuffer(e)) {
                for (var t = new Uint8Array(e.length), r = e.length, a = 0; a < r; a++)
                    t[a] = e[a];
                return t.buffer
            }
            throw new Error("Argument must be a Buffer")
        }
    }
    , {
        buffer: 23
    }],
    205: [function(e, t) {
        (function(n) {
            const r = e("debug")("torrent-discovery")
              , a = e("bittorrent-dht/client")
              , o = e("events").EventEmitter
              , i = e("run-parallel")
              , d = e("bittorrent-tracker/client");
            t.exports = class extends o {
                constructor(e) {
                    if (super(),
                    !e.peerId)
                        throw new Error("Option `peerId` is required");
                    if (!e.infoHash)
                        throw new Error("Option `infoHash` is required");
                    if (!n.browser && !e.port)
                        throw new Error("Option `port` is required");
                    this.peerId = "string" == typeof e.peerId ? e.peerId : e.peerId.toString("hex"),
                    this.infoHash = "string" == typeof e.infoHash ? e.infoHash.toLowerCase() : e.infoHash.toString("hex"),
                    this._port = e.port,
                    this._userAgent = e.userAgent,
                    this.destroyed = !1,
                    this._announce = e.announce || [],
                    this._intervalMs = e.intervalMs || 900000,
                    this._trackerOpts = null,
                    this._dhtAnnouncing = !1,
                    this._dhtTimeout = !1,
                    this._internalDHT = !1,
                    this._onWarning = e=>{
                        this.emit("warning", e)
                    }
                    ,
                    this._onError = e=>{
                        this.emit("error", e)
                    }
                    ,
                    this._onDHTPeer = (e,t)=>{
                        t.toString("hex") !== this.infoHash || this.emit("peer", `${e.host}:${e.port}`, "dht")
                    }
                    ,
                    this._onTrackerPeer = e=>{
                        this.emit("peer", e, "tracker")
                    }
                    ,
                    this._onTrackerAnnounce = ()=>{
                        this.emit("trackerAnnounce")
                    }
                    ;
                    const t = (e,t)=>{
                        const n = new a(t);
                        return n.on("warning", this._onWarning),
                        n.on("error", this._onError),
                        n.listen(e),
                        this._internalDHT = !0,
                        n
                    }
                    ;
                    !1 === e.tracker ? this.tracker = null : e.tracker && "object" == typeof e.tracker ? (this._trackerOpts = Object.assign({}, e.tracker),
                    this.tracker = this._createTracker()) : this.tracker = this._createTracker(),
                    this.dht = !1 === e.dht || "function" != typeof a ? null : e.dht && "function" == typeof e.dht.addNode ? e.dht : e.dht && "object" == typeof e.dht ? t(e.dhtPort, e.dht) : t(e.dhtPort),
                    this.dht && (this.dht.on("peer", this._onDHTPeer),
                    this._dhtAnnounce())
                }
                updatePort(e) {
                    e === this._port || (this._port = e,
                    this.dht && this._dhtAnnounce(),
                    this.tracker && (this.tracker.stop(),
                    this.tracker.destroy(()=>{
                        this.tracker = this._createTracker()
                    }
                    )))
                }
                complete(e) {
                    this.tracker && this.tracker.complete(e)
                }
                destroy(e) {
                    if (!this.destroyed) {
                        this.destroyed = !0,
                        clearTimeout(this._dhtTimeout);
                        const t = [];
                        this.tracker && (this.tracker.stop(),
                        this.tracker.removeListener("warning", this._onWarning),
                        this.tracker.removeListener("error", this._onError),
                        this.tracker.removeListener("peer", this._onTrackerPeer),
                        this.tracker.removeListener("update", this._onTrackerAnnounce),
                        t.push(e=>{
                            this.tracker.destroy(e)
                        }
                        )),
                        this.dht && this.dht.removeListener("peer", this._onDHTPeer),
                        this._internalDHT && (this.dht.removeListener("warning", this._onWarning),
                        this.dht.removeListener("error", this._onError),
                        t.push(e=>{
                            this.dht.destroy(e)
                        }
                        )),
                        i(t, e),
                        this.dht = null,
                        this.tracker = null,
                        this._announce = null
                    }
                }
                _createTracker() {
                    const e = Object.assign({}, this._trackerOpts, {
                        infoHash: this.infoHash,
                        announce: this._announce,
                        peerId: this.peerId,
                        port: this._port,
                        userAgent: this._userAgent
                    })
                      , t = new d(e);
                    return t.on("warning", this._onWarning),
                    t.on("error", this._onError),
                    t.on("peer", this._onTrackerPeer),
                    t.on("update", this._onTrackerAnnounce),
                    t.setInterval(this._intervalMs),
                    t.start(),
                    t
                }
                _dhtAnnounce() {
                    this._dhtAnnouncing || (r("dht announce"),
                    this._dhtAnnouncing = !0,
                    clearTimeout(this._dhtTimeout),
                    this.dht.announce(this.infoHash, this._port, e=>{
                        this._dhtAnnouncing = !1,
                        r("dht announce complete"),
                        e && this.emit("warning", e),
                        this.emit("dhtAnnounce"),
                        this.destroyed || (this._dhtTimeout = setTimeout(()=>{
                            this._dhtAnnounce()
                        }
                        , this._intervalMs + Math.floor(Math.random() * this._intervalMs / 5)),
                        this._dhtTimeout.unref && this._dhtTimeout.unref())
                    }
                    ))
                }
            }
        }
        ).call(this, e("_process"))
    }
    , {
        _process: 137,
        "bittorrent-dht/client": 17,
        "bittorrent-tracker/client": 11,
        debug: 49,
        events: 53,
        "run-parallel": 164
    }],
    206: [function(e, t) {
        var n = Math.ceil;
        (function(e) {
            const r = 16384;
            class a {
                constructor(e) {
                    this.length = e,
                    this.missing = e,
                    this.sources = null,
                    this._chunks = n(e / r),
                    this._remainder = e % r || r,
                    this._buffered = 0,
                    this._buffer = null,
                    this._cancellations = null,
                    this._reservations = 0,
                    this._flushed = !1
                }
                chunkLength(e) {
                    return e === this._chunks - 1 ? this._remainder : r
                }
                chunkLengthRemaining(e) {
                    return this.length - e * r
                }
                chunkOffset(e) {
                    return e * r
                }
                reserve() {
                    return this.init() ? this._cancellations.length ? this._cancellations.pop() : this._reservations < this._chunks ? this._reservations++ : -1 : -1
                }
                reserveRemaining() {
                    if (!this.init())
                        return -1;
                    if (this._reservations < this._chunks) {
                        const e = this._reservations;
                        return this._reservations = this._chunks,
                        e
                    }
                    return -1
                }
                cancel(e) {
                    this.init() && this._cancellations.push(e)
                }
                cancelRemaining(e) {
                    this.init() && (this._reservations = e)
                }
                get(e) {
                    return this.init() ? this._buffer[e] : null
                }
                set(e, t, a) {
                    if (!this.init())
                        return !1;
                    const o = t.length
                      , i = n(o / r);
                    for (let n = 0; n < i; n++)
                        if (!this._buffer[e + n]) {
                            const o = n * r
                              , i = t.slice(o, o + r);
                            this._buffered++,
                            this._buffer[e + n] = i,
                            this.missing -= i.length,
                            this.sources.includes(a) || this.sources.push(a)
                        }
                    return this._buffered === this._chunks
                }
                flush() {
                    if (!this._buffer || this._chunks !== this._buffered)
                        return null;
                    const t = e.concat(this._buffer, this.length);
                    return this._buffer = null,
                    this._cancellations = null,
                    this.sources = null,
                    this._flushed = !0,
                    t
                }
                init() {
                    return !this._flushed && (!!this._buffer || (this._buffer = Array(this._chunks),
                    this._cancellations = [],
                    this.sources = [],
                    !0))
                }
            }
            Object.defineProperty(a, "BLOCK_LENGTH", {
                value: 16384
            }),
            t.exports = a
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23
    }],
    207: [function(e, t) {
        (function(n) {
            var r = e("is-typedarray").strict;
            t.exports = function(e) {
                if (r(e)) {
                    var t = n.from(e.buffer);
                    return e.byteLength !== e.buffer.byteLength && (t = t.slice(e.byteOffset, e.byteOffset + e.byteLength)),
                    t
                }
                return n.from(e)
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        buffer: 23,
        "is-typedarray": 64
    }],
    208: [function(e, t, n) {
        var r = Math.floor
          , a = e("buffer-alloc")
          , o = Math.pow(2, 32);
        n.encodingLength = function() {
            return 8
        }
        ,
        n.encode = function(e, t, n) {
            t || (t = a(8)),
            n || (n = 0);
            var i = r(e / o);
            return t.writeUInt32BE(i, n),
            t.writeUInt32BE(e - i * o, n + 4),
            t
        }
        ,
        n.decode = function(e, t) {
            t || (t = 0);
            var n = e.readUInt32BE(t)
              , r = e.readUInt32BE(t + 4);
            return n * o + r
        }
        ,
        n.encode.bytes = 8,
        n.decode.bytes = 8
    }
    , {
        "buffer-alloc": 21
    }],
    209: [function(e, t) {
        "use strict";
        function n(e, t) {
            for (var n = 1, r = e.length, o = e[0], d = e[0], s = 1; s < r; ++s)
                if (d = o,
                o = e[s],
                t(o, d)) {
                    if (s === n) {
                        n++;
                        continue
                    }
                    e[n++] = o
                }
            return e.length = n,
            e
        }
        function r(e) {
            for (var t = 1, n = e.length, r = e[0], o = e[0], d = 1; d < n; ++d,
            o = r)
                if (o = r,
                r = e[d],
                r !== o) {
                    if (d === t) {
                        t++;
                        continue
                    }
                    e[t++] = r
                }
            return e.length = t,
            e
        }
        t.exports = function(e, t, a) {
            return 0 === e.length ? e : t ? (a || e.sort(t),
            n(e, t)) : (a || e.sort(),
            r(e))
        }
    }
    , {}],
    210: [function(e, t) {
        t.exports = function(e, t) {
            if (!(t >= e.length || 0 > t)) {
                var n = e.pop();
                if (t < e.length) {
                    var r = e[t];
                    return e[t] = n,
                    r
                }
                return n
            }
        }
    }
    , {}],
    211: [function(e, t) {
        t.exports = function(t, n, r) {
            "function" == typeof n && (r = n,
            n = {}),
            "string" == typeof n && (n = {
                type: n
            }),
            t.addEventListener("change", function() {
                function a(e) {
                    var r = t.files[e];
                    "text" === n.type ? o.readAsText(r) : "url" === n.type ? o.readAsDataURL(r) : o.readAsArrayBuffer(r)
                }
                if (0 === t.files.length)
                    return r(null, []);
                var o = new FileReader
                  , i = 0
                  , d = [];
                o.addEventListener("load", function(n) {
                    d.push({
                        file: t.files[i],
                        target: n.target
                    }),
                    i++,
                    i === t.files.length ? r(null, d) : a(i)
                }),
                a(i)
            })
        }
    }
    , {}],
    212: [function(e, t, n) {
        'use strict';
        function r() {
            this.protocol = null,
            this.slashes = null,
            this.auth = null,
            this.host = null,
            this.port = null,
            this.hostname = null,
            this.hash = null,
            this.search = null,
            this.query = null,
            this.pathname = null,
            this.path = null,
            this.href = null
        }
        function a(e, t, n) {
            if (e && d.isObject(e) && e instanceof r)
                return e;
            var a = new r;
            return a.parse(e, t, n),
            a
        }
        var o = e("punycode")
          , d = e("./util");
        n.parse = a,
        n.resolve = function(e, t) {
            return a(e, !1, !0).resolve(t)
        }
        ,
        n.resolveObject = function(e, t) {
            return e ? a(e, !1, !0).resolveObject(t) : t
        }
        ,
        n.format = function(e) {
            return d.isString(e) && (e = a(e)),
            e instanceof r ? e.format() : r.prototype.format.call(e)
        }
        ,
        n.Url = r;
        var c = /^([a-z0-9.+-]+:)/i
          , u = /:[0-9]*$/
          , f = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/
          , p = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", "\"", "`", " ", "\r", "\n", "\t"])
          , h = ["'"].concat(p)
          , m = ["%", "/", "?", ";", "#"].concat(h)
          , g = ["/", "?", "#"]
          , _ = /^[+a-z0-9A-Z_-]{0,63}$/
          , b = /^([+a-z0-9A-Z_-]{0,63})(.*)$/
          , y = {
            javascript: !0,
            "javascript:": !0
        }
          , w = {
            javascript: !0,
            "javascript:": !0
        }
          , x = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
        }
          , v = e("querystring");
        r.prototype.parse = function(e, t, n) {
            if (!d.isString(e))
                throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
            var r = e.indexOf("?")
              , a = -1 !== r && r < e.indexOf("#") ? "?" : "#"
              , u = e.split(a)
              , S = /\\/g;
            u[0] = u[0].replace(S, "/"),
            e = u.join(a);
            var E = e;
            if (E = E.trim(),
            !n && 1 === e.split("#").length) {
                var C = f.exec(E);
                if (C)
                    return this.path = E,
                    this.href = E,
                    this.pathname = C[1],
                    C[2] ? (this.search = C[2],
                    this.query = t ? v.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "",
                    this.query = {}),
                    this
            }
            var I = c.exec(E);
            if (I) {
                I = I[0];
                var T = I.toLowerCase();
                this.protocol = T,
                E = E.substr(I.length)
            }
            if (n || I || E.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                var R = "//" === E.substr(0, 2);
                R && !(I && w[I]) && (E = E.substr(2),
                this.slashes = !0)
            }
            if (!w[I] && (R || I && !x[I])) {
                for (var B = -1, L = 0, A; L < g.length; L++)
                    A = E.indexOf(g[L]),
                    -1 !== A && (-1 === B || A < B) && (B = A);
                var P, O;
                O = -1 === B ? E.lastIndexOf("@") : E.lastIndexOf("@", B),
                -1 !== O && (P = E.slice(0, O),
                E = E.slice(O + 1),
                this.auth = decodeURIComponent(P)),
                B = -1;
                for (var L = 0, A; L < m.length; L++)
                    A = E.indexOf(m[L]),
                    -1 !== A && (-1 === B || A < B) && (B = A);
                -1 === B && (B = E.length),
                this.host = E.slice(0, B),
                E = E.slice(B),
                this.parseHost(),
                this.hostname = this.hostname || "";
                var U = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                if (!U)
                    for (var D = this.hostname.split(/\./), L = 0, M = D.length, N; L < M; L++)
                        if (N = D[L],
                        N && !N.match(_)) {
                            for (var z = "", F = 0, W = N.length; F < W; F++)
                                z += 127 < N.charCodeAt(F) ? "x" : N[F];
                            if (!z.match(_)) {
                                var k = D.slice(0, L)
                                  , H = D.slice(L + 1)
                                  , q = N.match(b);
                                q && (k.push(q[1]),
                                H.unshift(q[2])),
                                H.length && (E = "/" + H.join(".") + E),
                                this.hostname = k.join(".");
                                break
                            }
                        }
                this.hostname = 255 < this.hostname.length ? "" : this.hostname.toLowerCase(),
                U || (this.hostname = o.toASCII(this.hostname));
                var G = this.port ? ":" + this.port : ""
                  , Z = this.hostname || "";
                this.host = Z + G,
                this.href += this.host,
                U && (this.hostname = this.hostname.substr(1, this.hostname.length - 2),
                "/" !== E[0] && (E = "/" + E))
            }
            if (!y[T])
                for (var L = 0, M = h.length, V; L < M; L++)
                    if (V = h[L],
                    -1 !== E.indexOf(V)) {
                        var K = encodeURIComponent(V);
                        K === V && (K = escape(V)),
                        E = E.split(V).join(K)
                    }
            var X = E.indexOf("#");
            -1 !== X && (this.hash = E.substr(X),
            E = E.slice(0, X));
            var Y = E.indexOf("?");
            if (-1 === Y ? t && (this.search = "",
            this.query = {}) : (this.search = E.substr(Y),
            this.query = E.substr(Y + 1),
            t && (this.query = v.parse(this.query)),
            E = E.slice(0, Y)),
            E && (this.pathname = E),
            x[T] && this.hostname && !this.pathname && (this.pathname = "/"),
            this.pathname || this.search) {
                var G = this.pathname || ""
                  , J = this.search || "";
                this.path = G + J
            }
            return this.href = this.format(),
            this
        }
        ,
        r.prototype.format = function() {
            var e = this.auth || "";
            e && (e = encodeURIComponent(e),
            e = e.replace(/%3A/i, ":"),
            e += "@");
            var t = this.protocol || ""
              , n = this.pathname || ""
              , r = this.hash || ""
              , a = !1
              , o = "";
            this.host ? a = e + this.host : this.hostname && (a = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"),
            this.port && (a += ":" + this.port)),
            this.query && d.isObject(this.query) && Object.keys(this.query).length && (o = v.stringify(this.query));
            var i = this.search || o && "?" + o || "";
            return t && ":" !== t.substr(-1) && (t += ":"),
            this.slashes || (!t || x[t]) && !1 !== a ? (a = "//" + (a || ""),
            n && "/" !== n.charAt(0) && (n = "/" + n)) : !a && (a = ""),
            r && "#" !== r.charAt(0) && (r = "#" + r),
            i && "?" !== i.charAt(0) && (i = "?" + i),
            n = n.replace(/[?#]/g, function(e) {
                return encodeURIComponent(e)
            }),
            i = i.replace("#", "%23"),
            t + a + n + i + r
        }
        ,
        r.prototype.resolve = function(e) {
            return this.resolveObject(a(e, !1, !0)).format()
        }
        ,
        r.prototype.resolveObject = function(e) {
            if (d.isString(e)) {
                var t = new r;
                t.parse(e, !1, !0),
                e = t
            }
            for (var n = new r, a = Object.keys(this), o = 0, l; o < a.length; o++)
                l = a[o],
                n[l] = this[l];
            if (n.hash = e.hash,
            "" === e.href)
                return n.href = n.format(),
                n;
            if (e.slashes && !e.protocol) {
                for (var c = Object.keys(e), u = 0, f; u < c.length; u++)
                    f = c[u],
                    "protocol" !== f && (n[f] = e[f]);
                return x[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"),
                n.href = n.format(),
                n
            }
            if (e.protocol && e.protocol !== n.protocol) {
                if (!x[e.protocol]) {
                    for (var h = Object.keys(e), m = 0, g; m < h.length; m++)
                        g = h[m],
                        n[g] = e[g];
                    return n.href = n.format(),
                    n
                }
                if (n.protocol = e.protocol,
                !e.host && !w[e.protocol]) {
                    for (var _ = (e.pathname || "").split("/"); _.length && !(e.host = _.shift()); )
                        ;
                    e.host || (e.host = ""),
                    e.hostname || (e.hostname = ""),
                    "" !== _[0] && _.unshift(""),
                    2 > _.length && _.unshift(""),
                    n.pathname = _.join("/")
                } else
                    n.pathname = e.pathname;
                if (n.search = e.search,
                n.query = e.query,
                n.host = e.host || "",
                n.auth = e.auth,
                n.hostname = e.hostname || e.host,
                n.port = e.port,
                n.pathname || n.search) {
                    var b = n.pathname || ""
                      , p = n.search || "";
                    n.path = b + p
                }
                return n.slashes = n.slashes || e.slashes,
                n.href = n.format(),
                n
            }
            var s = n.pathname && "/" === n.pathname.charAt(0)
              , y = e.host || e.pathname && "/" === e.pathname.charAt(0)
              , S = y || s || n.host && e.pathname
              , E = S
              , C = n.pathname && n.pathname.split("/") || []
              , _ = e.pathname && e.pathname.split("/") || []
              , I = n.protocol && !x[n.protocol];
            if (I && (n.hostname = "",
            n.port = null,
            n.host && ("" === C[0] ? C[0] = n.host : C.unshift(n.host)),
            n.host = "",
            e.protocol && (e.hostname = null,
            e.port = null,
            e.host && ("" === _[0] ? _[0] = e.host : _.unshift(e.host)),
            e.host = null),
            S = S && ("" === _[0] || "" === C[0])),
            y)
                n.host = e.host || "" === e.host ? e.host : n.host,
                n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname,
                n.search = e.search,
                n.query = e.query,
                C = _;
            else if (_.length)
                C || (C = []),
                C.pop(),
                C = C.concat(_),
                n.search = e.search,
                n.query = e.query;
            else if (!d.isNullOrUndefined(e.search)) {
                if (I) {
                    n.hostname = n.host = C.shift();
                    var T = !!(n.host && 0 < n.host.indexOf("@")) && n.host.split("@");
                    T && (n.auth = T.shift(),
                    n.host = n.hostname = T.shift())
                }
                return n.search = e.search,
                n.query = e.query,
                d.isNull(n.pathname) && d.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
                n.href = n.format(),
                n
            }
            if (!C.length)
                return n.pathname = null,
                n.path = n.search ? "/" + n.search : null,
                n.href = n.format(),
                n;
            for (var R = C.slice(-1)[0], B = (n.host || e.host || 1 < C.length) && ("." === R || ".." === R) || "" === R, L = 0, A = C.length; 0 <= A; A--)
                R = C[A],
                "." === R ? C.splice(A, 1) : ".." === R ? (C.splice(A, 1),
                L++) : L && (C.splice(A, 1),
                L--);
            if (!S && !E)
                for (; L--; L)
                    C.unshift("..");
            S && "" !== C[0] && (!C[0] || "/" !== C[0].charAt(0)) && C.unshift(""),
            B && "/" !== C.join("/").substr(-1) && C.push("");
            var P = "" === C[0] || C[0] && "/" === C[0].charAt(0);
            if (I) {
                n.hostname = n.host = P ? "" : C.length ? C.shift() : "";
                var T = !!(n.host && 0 < n.host.indexOf("@")) && n.host.split("@");
                T && (n.auth = T.shift(),
                n.host = n.hostname = T.shift())
            }
            return S = S || n.host && C.length,
            S && !P && C.unshift(""),
            C.length ? n.pathname = C.join("/") : (n.pathname = null,
            n.path = null),
            d.isNull(n.pathname) && d.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")),
            n.auth = e.auth || n.auth,
            n.slashes = n.slashes || e.slashes,
            n.href = n.format(),
            n
        }
        ,
        r.prototype.parseHost = function() {
            var e = this.host
              , t = u.exec(e);
            t && (t = t[0],
            ":" !== t && (this.port = t.substr(1)),
            e = e.substr(0, e.length - t.length)),
            e && (this.hostname = e)
        }
    }
    , {
        "./util": 213,
        punycode: 19,
        querystring: 141
    }],
    213: [function(e, t) {
        'use strict';
        t.exports = {
            isString: function(e) {
                return "string" == typeof e
            },
            isObject: function(e) {
                return "object" == typeof e && null !== e
            },
            isNull: function(e) {
                return null === e
            },
            isNullOrUndefined: function(e) {
                return null == e
            }
        }
    }
    , {}],
    214: [function(e, t) {
        var n = Math.ceil;
        (function(r) {
            const {EventEmitter: a} = e("events")
              , o = e("bencode")
              , i = e("bitfield")
              , d = e("debug")("ut_metadata")
              , s = e("simple-sha1")
              , l = 1E3
              , c = 16384;
            t.exports = e=>{
                class t extends a {
                    constructor(t) {
                        super(),
                        this._wire = t,
                        this._fetching = !1,
                        this._metadataComplete = !1,
                        this._metadataSize = null,
                        this._remainingRejects = null,
                        this._bitfield = new i(0,{
                            grow: l
                        }),
                        r.isBuffer(e) && this.setMetadata(e)
                    }
                    onHandshake(e, t, n) {
                        this._infoHash = e
                    }
                    onExtendedHandshake(e) {
                        return e.m && e.m.ut_metadata ? e.metadata_size ? "number" != typeof e.metadata_size || 1E7 < e.metadata_size || 0 >= e.metadata_size ? this.emit("warning", new Error("Peer gave invalid metadata size")) : void (this._metadataSize = e.metadata_size,
                        this._numPieces = n(this._metadataSize / c),
                        this._remainingRejects = 2 * this._numPieces,
                        this._requestPieces()) : this.emit("warning", new Error("Peer does not have metadata")) : this.emit("warning", new Error("Peer does not support ut_metadata"))
                    }
                    onMessage(e) {
                        let t, n;
                        try {
                            const r = e.toString()
                              , a = r.indexOf("ee") + 2;
                            t = o.decode(r.substring(0, a)),
                            n = e.slice(a)
                        } catch (e) {
                            return
                        }
                        switch (t.msg_type) {
                        case 0:
                            this._onRequest(t.piece);
                            break;
                        case 1:
                            this._onData(t.piece, n, t.total_size);
                            break;
                        case 2:
                            this._onReject(t.piece);
                        }
                    }
                    fetch() {
                        this._metadataComplete || (this._fetching = !0,
                        this._metadataSize && this._requestPieces())
                    }
                    cancel() {
                        this._fetching = !1
                    }
                    setMetadata(e) {
                        if (this._metadataComplete)
                            return !0;
                        d("set metadata");
                        try {
                            const t = o.decode(e).info;
                            t && (e = o.encode(t))
                        } catch (e) {}
                        return !(this._infoHash && this._infoHash !== s.sync(e)) && (this.cancel(),
                        this.metadata = e,
                        this._metadataComplete = !0,
                        this._metadataSize = this.metadata.length,
                        this._wire.extendedHandshake.metadata_size = this._metadataSize,
                        this.emit("metadata", o.encode({
                            info: o.decode(this.metadata)
                        })),
                        !0)
                    }
                    _send(e, t) {
                        let n = o.encode(e);
                        r.isBuffer(t) && (n = r.concat([n, t])),
                        this._wire.extended("ut_metadata", n)
                    }
                    _request(e) {
                        this._send({
                            msg_type: 0,
                            piece: e
                        })
                    }
                    _data(e, t, n) {
                        const r = {
                            msg_type: 1,
                            piece: e
                        };
                        "number" == typeof n && (r.total_size = n),
                        this._send(r, t)
                    }
                    _reject(e) {
                        this._send({
                            msg_type: 2,
                            piece: e
                        })
                    }
                    _onRequest(e) {
                        if (!this._metadataComplete)
                            return void this._reject(e);
                        const t = e * c;
                        let n = t + c;
                        n > this._metadataSize && (n = this._metadataSize);
                        const r = this.metadata.slice(t, n);
                        this._data(e, r, this._metadataSize)
                    }
                    _onData(e, t, n) {
                        t.length > c || !this._fetching || (t.copy(this.metadata, e * c),
                        this._bitfield.set(e),
                        this._checkDone())
                    }
                    _onReject(e) {
                        0 < this._remainingRejects && this._fetching ? (this._request(e),
                        this._remainingRejects -= 1) : this.emit("warning", new Error("Peer sent \"reject\" too much"))
                    }
                    _requestPieces() {
                        if (this._fetching) {
                            this.metadata = r.alloc(this._metadataSize);
                            for (let e = 0; e < this._numPieces; e++)
                                this._request(e)
                        }
                    }
                    _checkDone() {
                        let e = !0;
                        for (let t = 0; t < this._numPieces; t++)
                            if (!this._bitfield.get(t)) {
                                e = !1;
                                break
                            }
                        if (e) {
                            const e = this.setMetadata(this.metadata);
                            e || this._failedMetadata()
                        }
                    }
                    _failedMetadata() {
                        this._bitfield = new i(0,{
                            grow: l
                        }),
                        this._remainingRejects -= this._numPieces,
                        0 < this._remainingRejects ? this._requestPieces() : this.emit("warning", new Error("Peer sent invalid metadata"))
                    }
                }
                return t.prototype.name = "ut_metadata",
                t
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        bencode: 7,
        bitfield: 9,
        buffer: 23,
        debug: 49,
        events: 53,
        "simple-sha1": 171
    }],
    215: [function(e, t) {
        (function(e) {
            function n(t) {
                try {
                    if (!e.localStorage)
                        return !1
                } catch (e) {
                    return !1
                }
                var n = e.localStorage[t];
                return null != n && "true" === (n + "").toLowerCase()
            }
            t.exports = function(e, t) {
                function r() {
                    if (!a) {
                        if (n("throwDeprecation"))
                            throw new Error(t);
                        else
                            n("traceDeprecation") ? console.trace(t) : console.warn(t);
                        a = !0
                    }
                    return e.apply(this, arguments)
                }
                if (n("noDeprecation"))
                    return e;
                var a = !1;
                return r
            }
        }
        ).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {}],
    216: [function(e, t) {
        (function(n) {
            function r() {
                return {
                    version: 0,
                    flags: 0,
                    entries: []
                }
            }
            const a = e("binary-search")
              , o = e("events")
              , d = e("mp4-stream")
              , s = e("mp4-box-encoding")
              , l = e("range-slice-stream");
            class c {
                constructor(e, t) {
                    this._entries = e,
                    this._countName = t || "count",
                    this._index = 0,
                    this._offset = 0,
                    this.value = this._entries[0]
                }
                inc() {
                    this._offset++,
                    this._offset >= this._entries[this._index][this._countName] && (this._index++,
                    this._offset = 0),
                    this.value = this._entries[this._index]
                }
            }
            t.exports = class extends o {
                constructor(e) {
                    super(),
                    this._tracks = [],
                    this._file = e,
                    this._decoder = null,
                    this._findMoov(0)
                }
                _findMoov(e) {
                    this._decoder && this._decoder.destroy();
                    let t = 0;
                    this._decoder = d.decode();
                    const n = this._file.createReadStream({
                        start: e
                    });
                    n.pipe(this._decoder);
                    const r = a=>{
                        "moov" === a.type ? (this._decoder.removeListener("box", r),
                        this._decoder.decode(e=>{
                            n.destroy();
                            try {
                                this._processMoov(e)
                            } catch (e) {
                                e.message = `Cannot parse mp4 file: ${e.message}`,
                                this.emit("error", e)
                            }
                        }
                        )) : a.length < 4096 ? (t += a.length,
                        this._decoder.ignore()) : (this._decoder.removeListener("box", r),
                        t += a.length,
                        n.destroy(),
                        this._decoder.destroy(),
                        this._findMoov(e + t))
                    }
                    ;
                    this._decoder.on("box", r)
                }
                _processMoov(e) {
                    const t = e.traks;
                    this._tracks = [],
                    this._hasVideo = !1,
                    this._hasAudio = !1;
                    for (let n = 0; n < t.length; n++) {
                        const o = t[n]
                          , i = o.mdia.minf.stbl
                          , d = i.stsd.entries[0]
                          , s = o.mdia.hdlr.handlerType;
                        let l, u;
                        if ("vide" === s && "avc1" === d.type) {
                            if (this._hasVideo)
                                continue;
                            this._hasVideo = !0,
                            l = "avc1",
                            d.avcC && (l += `.${d.avcC.mimeCodec}`),
                            u = `video/mp4; codecs="${l}"`
                        } else if ("soun" === s && "mp4a" === d.type) {
                            if (this._hasAudio)
                                continue;
                            this._hasAudio = !0,
                            l = "mp4a",
                            d.esds && d.esds.mimeCodec && (l += `.${d.esds.mimeCodec}`),
                            u = `audio/mp4; codecs="${l}"`
                        } else
                            continue;
                        const f = [];
                        let p = 0
                          , h = 0
                          , m = 0
                          , g = 0
                          , _ = 0
                          , b = 0;
                        const y = new c(i.stts.entries);
                        let w = null;
                        i.ctts && (w = new c(i.ctts.entries));
                        for (let e = 0; ; ) {
                            var a = i.stsc.entries[_];
                            const t = i.stsz.entries[p]
                              , n = y.value.duration
                              , r = w ? w.value.compositionOffset : 0;
                            let o = !0;
                            i.stss && (o = i.stss.entries[e] === p + 1);
                            const d = i.stco || i.co64;
                            if (f.push({
                                size: t,
                                duration: n,
                                dts: b,
                                presentationOffset: r,
                                sync: o,
                                offset: g + d.entries[m]
                            }),
                            p++,
                            p >= i.stsz.entries.length)
                                break;
                            if (h++,
                            g += t,
                            h >= a.samplesPerChunk) {
                                h = 0,
                                g = 0,
                                m++;
                                const e = i.stsc.entries[_ + 1];
                                e && m + 1 >= e.firstChunk && _++
                            }
                            b += n,
                            y.inc(),
                            w && w.inc(),
                            o && e++
                        }
                        o.mdia.mdhd.duration = 0,
                        o.tkhd.duration = 0;
                        const k = a.sampleDescriptionId
                          , x = {
                            type: "moov",
                            mvhd: e.mvhd,
                            traks: [{
                                tkhd: o.tkhd,
                                mdia: {
                                    mdhd: o.mdia.mdhd,
                                    hdlr: o.mdia.hdlr,
                                    elng: o.mdia.elng,
                                    minf: {
                                        vmhd: o.mdia.minf.vmhd,
                                        smhd: o.mdia.minf.smhd,
                                        dinf: o.mdia.minf.dinf,
                                        stbl: {
                                            stsd: i.stsd,
                                            stts: r(),
                                            ctts: r(),
                                            stsc: r(),
                                            stsz: r(),
                                            stco: r(),
                                            stss: r()
                                        }
                                    }
                                }
                            }],
                            mvex: {
                                mehd: {
                                    fragmentDuration: e.mvhd.duration
                                },
                                trexs: [{
                                    trackId: o.tkhd.trackId,
                                    defaultSampleDescriptionIndex: k,
                                    defaultSampleDuration: 0,
                                    defaultSampleSize: 0,
                                    defaultSampleFlags: 0
                                }]
                            }
                        };
                        this._tracks.push({
                            fragmentSequence: 1,
                            trackId: o.tkhd.trackId,
                            timeScale: o.mdia.mdhd.timeScale,
                            samples: f,
                            currSample: null,
                            currTime: null,
                            moov: x,
                            mime: u
                        })
                    }
                    if (0 === this._tracks.length)
                        return void this.emit("error", new Error("no playable tracks"));
                    e.mvhd.duration = 0,
                    this._ftyp = {
                        type: "ftyp",
                        brand: "iso5",
                        brandVersion: 0,
                        compatibleBrands: ["iso5"]
                    };
                    const o = s.encode(this._ftyp)
                      , i = this._tracks.map(e=>{
                        const t = s.encode(e.moov);
                        return {
                            mime: e.mime,
                            init: n.concat([o, t])
                        }
                    }
                    );
                    this.emit("ready", i)
                }
                seek(e) {
                    if (!this._tracks)
                        throw new Error("Not ready yet; wait for 'ready' event");
                    this._fileStream && (this._fileStream.destroy(),
                    this._fileStream = null);
                    let t = -1;
                    if (this._tracks.map((n,r)=>{
                        n.outStream && n.outStream.destroy(),
                        n.inStream && (n.inStream.destroy(),
                        n.inStream = null);
                        const a = n.outStream = d.encode()
                          , o = this._generateFragment(r, e);
                        if (!o)
                            return a.finalize();
                        (-1 === t || o.ranges[0].start < t) && (t = o.ranges[0].start);
                        const i = e=>{
                            a.destroyed || a.box(e.moof, t=>{
                                if (t)
                                    return this.emit("error", t);
                                if (!a.destroyed) {
                                    const t = n.inStream.slice(e.ranges);
                                    t.pipe(a.mediaData(e.length, e=>{
                                        if (e)
                                            return this.emit("error", e);
                                        if (!a.destroyed) {
                                            const e = this._generateFragment(r);
                                            return e ? void i(e) : a.finalize()
                                        }
                                    }
                                    ))
                                }
                            }
                            )
                        }
                        ;
                        i(o)
                    }
                    ),
                    0 <= t) {
                        const e = this._fileStream = this._file.createReadStream({
                            start: t
                        });
                        this._tracks.forEach(n=>{
                            n.inStream = new l(t,{
                                highWaterMark: 1e7
                            }),
                            e.pipe(n.inStream)
                        }
                        )
                    }
                    return this._tracks.map(e=>e.outStream)
                }
                _findSampleBefore(e, t) {
                    const n = this._tracks[e]
                      , r = Math.floor(n.timeScale * t);
                    let o = a(n.samples, r, (e,n)=>{
                        const t = e.dts + e.presentationOffset;
                        return t - n
                    }
                    );
                    for (-1 === o ? o = 0 : 0 > o && (o = -o - 2); !n.samples[o].sync; )
                        o--;
                    return o
                }
                _generateFragment(e, t) {
                    const n = this._tracks[e];
                    let r;
                    if (r = void 0 === t ? n.currSample : this._findSampleBefore(e, t),
                    r >= n.samples.length)
                        return null;
                    const a = n.samples[r].dts;
                    let o = 0;
                    const i = [];
                    for (var d = r; d < n.samples.length; d++) {
                        const e = n.samples[d];
                        if (e.sync && e.dts - a >= n.timeScale * 1)
                            break;
                        o += e.size;
                        const t = i.length - 1;
                        0 > t || i[t].end !== e.offset ? i.push({
                            start: e.offset,
                            end: e.offset + e.size
                        }) : i[t].end += e.size
                    }
                    return n.currSample = d,
                    {
                        moof: this._generateMoof(e, r, d),
                        ranges: i,
                        length: o
                    }
                }
                _generateMoof(e, t, n) {
                    const r = this._tracks[e]
                      , a = [];
                    let o = 0;
                    for (let i = t; i < n; i++) {
                        const e = r.samples[i];
                        0 > e.presentationOffset && (o = 1),
                        a.push({
                            sampleDuration: e.duration,
                            sampleSize: e.size,
                            sampleFlags: e.sync ? 33554432 : 16842752,
                            sampleCompositionTimeOffset: e.presentationOffset
                        })
                    }
                    const i = {
                        type: "moof",
                        mfhd: {
                            sequenceNumber: r.fragmentSequence++
                        },
                        trafs: [{
                            tfhd: {
                                flags: 131072,
                                trackId: r.trackId
                            },
                            tfdt: {
                                baseMediaDecodeTime: r.samples[t].dts
                            },
                            trun: {
                                flags: 3841,
                                dataOffset: 8,
                                entries: a,
                                version: o
                            }
                        }]
                    };
                    return i.trafs[0].trun.dataOffset += s.encodingLength(i),
                    i
                }
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        "binary-search": 8,
        buffer: 23,
        events: 53,
        "mp4-box-encoding": 108,
        "mp4-stream": 111,
        "range-slice-stream": 145
    }],
    217: [function(e, t) {
        function n(e, t, a={}) {
            return this instanceof n ? void (this.detailedError = null,
            this._elem = t,
            this._elemWrapper = new r(t),
            this._waitingFired = !1,
            this._trackMeta = null,
            this._file = e,
            this._tracks = null,
            "none" !== this._elem.preload && this._createMuxer(),
            this._onError = ()=>{
                this.detailedError = this._elemWrapper.detailedError,
                this.destroy()
            }
            ,
            this._onWaiting = ()=>{
                this._waitingFired = !0,
                this._muxer ? this._tracks && this._pump() : this._createMuxer()
            }
            ,
            t.autoplay && (t.preload = "auto"),
            t.addEventListener("waiting", this._onWaiting),
            t.addEventListener("error", this._onError)) : (console.warn("don't invoked VideoStream without 'new'"),
            new n(e,t,a))
        }
        const r = e("mediasource")
          , a = e("pump")
          , o = e("./mp4-remuxer");
        n.prototype = {
            _createMuxer() {
                this._muxer = new o(this._file),
                this._muxer.on("ready", e=>{
                    this._tracks = e.map(e=>{
                        const t = this._elemWrapper.createWriteStream(e.mime);
                        t.on("error", e=>{
                            this._elemWrapper.error(e)
                        }
                        );
                        const n = {
                            muxed: null,
                            mediaSource: t,
                            initFlushed: !1,
                            onInitFlushed: null
                        };
                        return t.write(e.init, e=>{
                            n.initFlushed = !0,
                            n.onInitFlushed && n.onInitFlushed(e)
                        }
                        ),
                        n
                    }
                    ),
                    (this._waitingFired || "auto" === this._elem.preload) && this._pump()
                }
                ),
                this._muxer.on("error", e=>{
                    this._elemWrapper.error(e)
                }
                )
            },
            _pump() {
                const e = this._muxer.seek(this._elem.currentTime, !this._tracks);
                this._tracks.forEach((t,n)=>{
                    const r = ()=>{
                        t.muxed && (t.muxed.destroy(),
                        t.mediaSource = this._elemWrapper.createWriteStream(t.mediaSource),
                        t.mediaSource.on("error", e=>{
                            this._elemWrapper.error(e)
                        }
                        )),
                        t.muxed = e[n],
                        a(t.muxed, t.mediaSource)
                    }
                    ;
                    t.initFlushed ? r() : t.onInitFlushed = e=>e ? void this._elemWrapper.error(e) : void r()
                }
                )
            },
            destroy() {
                this.destroyed || (this.destroyed = !0,
                this._elem.removeEventListener("waiting", this._onWaiting),
                this._elem.removeEventListener("error", this._onError),
                this._tracks && this._tracks.forEach(e=>{
                    e.muxed && e.muxed.destroy()
                }
                ),
                this._elem.src = "")
            }
        },
        t.exports = n
    }
    , {
        "./mp4-remuxer": 216,
        mediasource: 104,
        pump: 138
    }],
    218: [function(e, t) {
        (function(n, r, a) {
            function o(e) {
                return "object" == typeof e && null != e && "function" == typeof e.pipe
            }
            function i(e) {
                return "undefined" != typeof FileList && e instanceof FileList
            }
            const {EventEmitter: d} = e("events")
              , s = e("simple-concat")
              , l = e("create-torrent")
              , c = e("debug")("webtorrent")
              , u = e("bittorrent-dht/client")
              , f = e("load-ip-set")
              , p = e("run-parallel")
              , h = e("parse-torrent")
              , m = e("path")
              , g = e("simple-peer")
              , _ = e("randombytes")
              , b = e("speedometer")
              , y = e("./lib/tcp-pool")
              , w = e("./lib/torrent")
              , k = e("./package.json").version
              , x = k.replace(/\d*./g, e=>`0${e % 100}`.slice(-2)).slice(0, 4);
            class v extends d {
                constructor(e={}) {
                    super(),
                    this.peerId = "string" == typeof e.peerId ? e.peerId : a.isBuffer(e.peerId) ? e.peerId.toString("hex") : a.from(`-WW${x}-` + _(9).toString("base64")).toString("hex"),
                    this.peerIdBuffer = a.from(this.peerId, "hex"),
                    this.nodeId = "string" == typeof e.nodeId ? e.nodeId : a.isBuffer(e.nodeId) ? e.nodeId.toString("hex") : _(20).toString("hex"),
                    this.nodeIdBuffer = a.from(this.nodeId, "hex"),
                    this._debugId = this.peerId.toString("hex").substring(0, 7),
                    this.destroyed = !1,
                    this.listening = !1,
                    this.torrentPort = e.torrentPort || 0,
                    this.dhtPort = e.dhtPort || 0,
                    this.tracker = e.tracker === void 0 ? {} : e.tracker,
                    this.torrents = [],
                    this.maxConns = +e.maxConns || 55,
                    this._debug("new webtorrent (peerId %s, nodeId %s, port %s)", this.peerId, this.nodeId, this.torrentPort),
                    this.tracker && ("object" != typeof this.tracker && (this.tracker = {}),
                    e.rtcConfig && (console.warn("WebTorrent: opts.rtcConfig is deprecated. Use opts.tracker.rtcConfig instead"),
                    this.tracker.rtcConfig = e.rtcConfig),
                    e.wrtc && (console.warn("WebTorrent: opts.wrtc is deprecated. Use opts.tracker.wrtc instead"),
                    this.tracker.wrtc = e.wrtc),
                    r.WRTC && !this.tracker.wrtc && (this.tracker.wrtc = r.WRTC)),
                    "function" == typeof y ? this._tcpPool = new y(this) : n.nextTick(()=>{
                        this._onListening()
                    }
                    ),
                    this._downloadSpeed = b(),
                    this._uploadSpeed = b(),
                    !1 !== e.dht && "function" == typeof u ? (this.dht = new u(Object.assign({}, {
                        nodeId: this.nodeId
                    }, e.dht)),
                    this.dht.once("error", e=>{
                        this._destroy(e)
                    }
                    ),
                    this.dht.once("listening", ()=>{
                        const e = this.dht.address();
                        e && (this.dhtPort = e.port)
                    }
                    ),
                    this.dht.setMaxListeners(0),
                    this.dht.listen(this.dhtPort)) : this.dht = !1,
                    this.enableWebSeeds = !1 !== e.webSeeds;
                    const t = ()=>{
                        this.destroyed || (this.ready = !0,
                        this.emit("ready"))
                    }
                    ;
                    "function" == typeof f && null != e.blocklist ? f(e.blocklist, {
                        headers: {
                            "user-agent": `WebTorrent/${k} (https://webtorrent.io)`
                        }
                    }, (e,n)=>e ? this.error(`Failed to load blocklist: ${e.message}`) : void (this.blocked = n,
                    t())) : n.nextTick(t)
                }
                get downloadSpeed() {
                    return this._downloadSpeed()
                }
                get uploadSpeed() {
                    return this._uploadSpeed()
                }
                get progress() {
                    const e = this.torrents.filter(e=>1 !== e.progress)
                      , t = e.reduce((e,t)=>e + t.downloaded, 0)
                      , n = e.reduce((e,t)=>e + (t.length || 0), 0) || 1;
                    return t / n
                }
                get ratio() {
                    const e = this.torrents.reduce((e,t)=>e + t.uploaded, 0)
                      , t = this.torrents.reduce((e,t)=>e + t.received, 0) || 1;
                    return e / t
                }
                get(e) {
                    if (!(e instanceof w)) {
                        let t;
                        try {
                            t = h(e)
                        } catch (e) {}
                        if (!t)
                            return null;
                        if (!t.infoHash)
                            throw new Error("Invalid torrent identifier");
                        for (const e of this.torrents)
                            if (e.infoHash === t.infoHash)
                                return e
                    } else if (this.torrents.includes(e))
                        return e;
                    return null
                }
                download(e, t, n) {
                    return console.warn("WebTorrent: client.download() is deprecated. Use client.add() instead"),
                    this.add(e, t, n)
                }
                add(e, t={}, n) {
                    function r() {
                        i.removeListener("_infoHash", a),
                        i.removeListener("ready", o),
                        i.removeListener("close", r)
                    }
                    if (this.destroyed)
                        throw new Error("client is destroyed");
                    "function" == typeof t && ([t,n] = [{}, t]);
                    const a = ()=>{
                        if (!this.destroyed)
                            for (const e of this.torrents)
                                if (e.infoHash === i.infoHash && e !== i)
                                    return void i._destroy(new Error(`Cannot add duplicate torrent ${i.infoHash}`))
                    }
                      , o = ()=>{
                        this.destroyed || ("function" == typeof n && n(i),
                        this.emit("torrent", i))
                    }
                    ;
                    this._debug("add"),
                    t = t ? Object.assign({}, t) : {};
                    const i = new w(e,this,t);
                    return this.torrents.push(i),
                    i.once("_infoHash", a),
                    i.once("ready", o),
                    i.once("close", r),
                    i
                }
                seed(e, t, n) {
                    if (this.destroyed)
                        throw new Error("client is destroyed");
                    "function" == typeof t && ([t,n] = [{}, t]),
                    this._debug("seed"),
                    t = t ? Object.assign({}, t) : {},
                    t.skipVerify = !0;
                    const r = "string" == typeof e;
                    r && (t.path = m.dirname(e)),
                    t.createdBy || (t.createdBy = `WebTorrent/${x}`);
                    const a = e=>{
                        this._debug("on seed"),
                        "function" == typeof n && n(e),
                        e.emit("seed"),
                        this.emit("seed", e)
                    }
                      , d = this.add(null, t, e=>{
                        const t = [t=>r ? t() : void e.load(c, t)];
                        this.dht && t.push(t=>{
                            e.once("dhtAnnounce", t)
                        }
                        ),
                        p(t, t=>this.destroyed ? void 0 : t ? e._destroy(t) : void a(e))
                    }
                    );
                    let c;
                    return i(e) ? e = Array.from(e) : !Array.isArray(e) && (e = [e]),
                    p(e.map(e=>t=>{
                        o(e) ? s(e, t) : t(null, e)
                    }
                    ), (e,n)=>this.destroyed ? void 0 : e ? d._destroy(e) : void l.parseInput(n, t, (e,r)=>this.destroyed ? void 0 : e ? d._destroy(e) : void (c = r.map(e=>e.getStream),
                    l(n, t, (e,t)=>{
                        if (!this.destroyed) {
                            if (e)
                                return d._destroy(e);
                            const n = this.get(t);
                            n ? d._destroy(new Error(`Cannot add duplicate torrent ${n.infoHash}`)) : d._onTorrentId(t)
                        }
                    }
                    )))),
                    d
                }
                remove(e, t) {
                    this._debug("remove");
                    const n = this.get(e);
                    if (!n)
                        throw new Error(`No torrent with id ${e}`);
                    this._remove(e, t)
                }
                _remove(e, t) {
                    const n = this.get(e);
                    n && (this.torrents.splice(this.torrents.indexOf(n), 1),
                    n.destroy(t))
                }
                address() {
                    return this.listening ? this._tcpPool ? this._tcpPool.server.address() : {
                        address: "0.0.0.0",
                        family: "IPv4",
                        port: 0
                    } : null
                }
                destroy(e) {
                    if (this.destroyed)
                        throw new Error("client already destroyed");
                    this._destroy(null, e)
                }
                _destroy(e, t) {
                    this._debug("client destroy"),
                    this.destroyed = !0;
                    const n = this.torrents.map(e=>t=>{
                        e.destroy(t)
                    }
                    );
                    this._tcpPool && n.push(e=>{
                        this._tcpPool.destroy(e)
                    }
                    ),
                    this.dht && n.push(e=>{
                        this.dht.destroy(e)
                    }
                    ),
                    p(n, t),
                    e && this.emit("error", e),
                    this.torrents = [],
                    this._tcpPool = null,
                    this.dht = null
                }
                _onListening() {
                    if (this._debug("listening"),
                    this.listening = !0,
                    this._tcpPool) {
                        const e = this._tcpPool.server.address();
                        e && (this.torrentPort = e.port)
                    }
                    this.emit("listening")
                }
                _debug() {
                    const e = [].slice.call(arguments);
                    e[0] = `[${this._debugId}] ${e[0]}`,
                    c(...e)
                }
            }
            v.WEBRTC_SUPPORT = g.WEBRTC_SUPPORT,
            v.VERSION = k,
            t.exports = v
        }
        ).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global, e("buffer").Buffer)
    }
    , {
        "./lib/tcp-pool": 17,
        "./lib/torrent": 223,
        "./package.json": 225,
        _process: 137,
        "bittorrent-dht/client": 17,
        buffer: 23,
        "create-torrent": 27,
        debug: 49,
        events: 53,
        "load-ip-set": 17,
        "parse-torrent": 132,
        path: 133,
        randombytes: 144,
        "run-parallel": 164,
        "simple-concat": 168,
        "simple-peer": 170,
        speedometer: 174
    }],
    219: [function(e, t) {
        const n = e("debug")("webtorrent:file-stream")
          , r = e("readable-stream");
        class a extends r.Readable {
            constructor(e, t) {
                super(t),
                this.destroyed = !1,
                this._torrent = e._torrent;
                const n = t && t.start || 0
                  , r = t && t.end && t.end < e.length ? t.end : e.length - 1
                  , a = e._torrent.pieceLength;
                this._startPiece = 0 | (n + e.offset) / a,
                this._endPiece = 0 | (r + e.offset) / a,
                this._piece = this._startPiece,
                this._offset = n + e.offset - this._startPiece * a,
                this._missing = r - n + 1,
                this._reading = !1,
                this._notifying = !1,
                this._criticalLength = Math.min(0 | 1048576 / a, 2)
            }
            _read() {
                this._reading || (this._reading = !0,
                this._notify())
            }
            _notify() {
                if (!this._reading || 0 === this._missing)
                    return;
                if (!this._torrent.bitfield.get(this._piece))
                    return this._torrent.critical(this._piece, this._piece + this._criticalLength);
                if (this._notifying)
                    return;
                if (this._notifying = !0,
                this._torrent.destroyed)
                    return this._destroy(new Error("Torrent removed"));
                const e = this._piece;
                this._torrent.store.get(e, (t,r)=>{
                    if (this._notifying = !1,
                    !this.destroyed)
                        return n("read %s (length %s) (err %s)", e, r.length, t && t.message),
                        t ? this._destroy(t) : void (this._offset && (r = r.slice(this._offset),
                        this._offset = 0),
                        this._missing < r.length && (r = r.slice(0, this._missing)),
                        this._missing -= r.length,
                        n("pushing buffer of length %s", r.length),
                        this._reading = !1,
                        this.push(r),
                        0 === this._missing && this.push(null))
                }
                ),
                this._piece += 1
            }
            destroy(e) {
                this._destroy(null, e)
            }
            _destroy(e, t) {
                this.destroyed || (this.destroyed = !0,
                !this._torrent.destroyed && this._torrent.deselect(this._startPiece, this._endPiece, !0),
                e && this.emit("error", e),
                this.emit("close"),
                t && t())
            }
        }
        t.exports = a
    }
    , {
        debug: 49,
        "readable-stream": 160
    }],
    220: [function(e, t) {
        (function(n) {
            const {EventEmitter: r} = e("events")
              , {PassThrough: a} = e("readable-stream")
              , o = e("end-of-stream")
              , i = e("path")
              , d = e("render-media")
              , s = e("stream-to-blob")
              , l = e("stream-to-blob-url")
              , c = e("stream-with-known-length-to-buffer")
              , u = e("./file-stream");
            class f extends r {
                constructor(e, t) {
                    super(),
                    this._torrent = e,
                    this._destroyed = !1,
                    this.name = t.name,
                    this.path = t.path,
                    this.length = t.length,
                    this.offset = t.offset,
                    this.done = !1;
                    const n = t.offset
                      , r = n + t.length - 1;
                    this._startPiece = 0 | n / this._torrent.pieceLength,
                    this._endPiece = 0 | r / this._torrent.pieceLength,
                    0 === this.length && (this.done = !0,
                    this.emit("done"))
                }
                get downloaded() {
                    if (!this._torrent.bitfield)
                        return 0;
                    const {pieces: e, bitfield: t, pieceLength: n} = this._torrent
                      , {_startPiece: r, _endPiece: a} = this
                      , o = e[r]
                      , i = this.offset % n;
                    let d = t.get(r) ? n - i : Math.max(n - i - o.missing, 0);
                    for (let o = r + 1; o <= a; ++o)
                        if (t.get(o))
                            d += n;
                        else {
                            const t = e[o];
                            d += n - t.missing
                        }
                    return Math.min(d, this.length)
                }
                get progress() {
                    return this.length ? this.downloaded / this.length : 0
                }
                select(e) {
                    0 === this.length || this._torrent.select(this._startPiece, this._endPiece, e)
                }
                deselect() {
                    0 === this.length || this._torrent.deselect(this._startPiece, this._endPiece, !1)
                }
                createReadStream(e) {
                    if (0 === this.length) {
                        const e = new a;
                        return n.nextTick(()=>{
                            e.end()
                        }
                        ),
                        e
                    }
                    const t = new u(this,e);
                    return this._torrent.select(t._startPiece, t._endPiece, !0, ()=>{
                        t._notify()
                    }
                    ),
                    o(t, ()=>{
                        this._destroyed || !this._torrent.destroyed && this._torrent.deselect(t._startPiece, t._endPiece, !0)
                    }
                    ),
                    t
                }
                getBuffer(e) {
                    c(this.createReadStream(), this.length, e)
                }
                getBlob(e) {
                    if ("undefined" == typeof window)
                        throw new Error("browser-only method");
                    s(this.createReadStream(), this._getMimeType()).then(t=>e(null, t), t=>e(t))
                }
                getBlobURL(e) {
                    if ("undefined" == typeof window)
                        throw new Error("browser-only method");
                    l(this.createReadStream(), this._getMimeType()).then(t=>e(null, t), t=>e(t))
                }
                appendTo(e, t, n) {
                    if ("undefined" == typeof window)
                        throw new Error("browser-only method");
                    d.append(this, e, t, n)
                }
                renderTo(e, t, n) {
                    if ("undefined" == typeof window)
                        throw new Error("browser-only method");
                    d.render(this, e, t, n)
                }
                _getMimeType() {
                    return d.mime[i.extname(this.name).toLowerCase()]
                }
                _destroy() {
                    this._destroyed = !0,
                    this._torrent = null
                }
            }
            t.exports = f
        }
        ).call(this, e("_process"))
    }
    , {
        "./file-stream": 219,
        _process: 137,
        "end-of-stream": 52,
        events: 53,
        path: 133,
        "readable-stream": 160,
        "render-media": 161,
        "stream-to-blob": 195,
        "stream-to-blob-url": 194,
        "stream-with-known-length-to-buffer": 196
    }],
    221: [function(e, t, n) {
        const r = e("unordered-array-remove")
          , a = e("debug")("webtorrent:peer")
          , o = e("bittorrent-protocol")
          , i = e("./webconn");
        n.createWebRTCPeer = (e,t)=>{
            const n = new d(e.id,"webrtc");
            return n.conn = e,
            n.swarm = t,
            n.conn.connected ? n.onConnect() : (n.conn.once("connect", ()=>{
                n.onConnect()
            }
            ),
            n.conn.once("error", e=>{
                n.destroy(e)
            }
            ),
            n.startConnectTimeout()),
            n
        }
        ,
        n.createTCPIncomingPeer = e=>{
            const t = `${e.remoteAddress}:${e.remotePort}`
              , n = new d(t,"tcpIncoming");
            return n.conn = e,
            n.addr = t,
            n.onConnect(),
            n
        }
        ,
        n.createTCPOutgoingPeer = (e,t)=>{
            const n = new d(e,"tcpOutgoing");
            return n.addr = e,
            n.swarm = t,
            n
        }
        ,
        n.createWebSeedPeer = (e,t)=>{
            const n = new d(e,"webSeed");
            return n.swarm = t,
            n.conn = new i(e,t),
            n.onConnect(),
            n
        }
        ;
        class d {
            constructor(e, t) {
                this.id = e,
                this.type = t,
                a("new %s Peer %s", t, e),
                this.addr = null,
                this.conn = null,
                this.swarm = null,
                this.wire = null,
                this.connected = !1,
                this.destroyed = !1,
                this.timeout = null,
                this.retries = 0,
                this.sentHandshake = !1
            }
            onConnect() {
                if (!this.destroyed) {
                    this.connected = !0,
                    a("Peer %s connected", this.id),
                    clearTimeout(this.connectTimeout);
                    const e = this.conn;
                    e.once("end", ()=>{
                        this.destroy()
                    }
                    ),
                    e.once("close", ()=>{
                        this.destroy()
                    }
                    ),
                    e.once("finish", ()=>{
                        this.destroy()
                    }
                    ),
                    e.once("error", e=>{
                        this.destroy(e)
                    }
                    );
                    const t = this.wire = new o;
                    t.type = this.type,
                    t.once("end", ()=>{
                        this.destroy()
                    }
                    ),
                    t.once("close", ()=>{
                        this.destroy()
                    }
                    ),
                    t.once("finish", ()=>{
                        this.destroy()
                    }
                    ),
                    t.once("error", e=>{
                        this.destroy(e)
                    }
                    ),
                    t.once("handshake", (e,t)=>{
                        this.onHandshake(e, t)
                    }
                    ),
                    this.startHandshakeTimeout(),
                    e.pipe(t).pipe(e),
                    this.swarm && !this.sentHandshake && this.handshake()
                }
            }
            onHandshake(e, t) {
                if (!this.swarm)
                    return;
                if (this.destroyed)
                    return;
                if (this.swarm.destroyed)
                    return this.destroy(new Error("swarm already destroyed"));
                if (e !== this.swarm.infoHash)
                    return this.destroy(new Error("unexpected handshake info hash for this swarm"));
                if (t === this.swarm.peerId)
                    return this.destroy(new Error("refusing to connect to ourselves"));
                a("Peer %s got handshake %s", this.id, e),
                clearTimeout(this.handshakeTimeout),
                this.retries = 0;
                let n = this.addr;
                !n && this.conn.remoteAddress && this.conn.remotePort && (n = `${this.conn.remoteAddress}:${this.conn.remotePort}`),
                this.swarm._onWire(this.wire, n);
                this.swarm && !this.swarm.destroyed && (this.sentHandshake || this.handshake())
            }
            handshake() {
                const e = {
                    dht: !this.swarm.private && !!this.swarm.client.dht
                };
                this.wire.handshake(this.swarm.infoHash, this.swarm.client.peerId, e),
                this.sentHandshake = !0
            }
            startConnectTimeout() {
                clearTimeout(this.connectTimeout),
                this.connectTimeout = setTimeout(()=>{
                    this.destroy(new Error("connect timeout"))
                }
                , "webrtc" === this.type ? 25e3 : 5e3),
                this.connectTimeout.unref && this.connectTimeout.unref()
            }
            startHandshakeTimeout() {
                clearTimeout(this.handshakeTimeout),
                this.handshakeTimeout = setTimeout(()=>{
                    this.destroy(new Error("handshake timeout"))
                }
                , 25e3),
                this.handshakeTimeout.unref && this.handshakeTimeout.unref()
            }
            destroy(e) {
                if (this.destroyed)
                    return;
                this.destroyed = !0,
                this.connected = !1,
                a("destroy %s (error: %s)", this.id, e && (e.message || e)),
                clearTimeout(this.connectTimeout),
                clearTimeout(this.handshakeTimeout);
                const t = this.swarm
                  , n = this.conn
                  , o = this.wire;
                this.swarm = null,
                this.conn = null,
                this.wire = null,
                t && o && r(t.wires, t.wires.indexOf(o)),
                n && (n.on("error", ()=>{}
                ),
                n.destroy()),
                o && o.destroy(),
                t && t.removePeer(this.id)
            }
        }
    }
    , {
        "./webconn": 224,
        "bittorrent-protocol": 10,
        debug: 49,
        "unordered-array-remove": 210
    }],
    222: [function(e, t) {
        t.exports = class {
            constructor(e) {
                this._torrent = e,
                this._numPieces = e.pieces.length,
                this._pieces = Array(this._numPieces),
                this._onWire = e=>{
                    this.recalculate(),
                    this._initWire(e)
                }
                ,
                this._onWireHave = e=>{
                    this._pieces[e] += 1
                }
                ,
                this._onWireBitfield = ()=>{
                    this.recalculate()
                }
                ,
                this._torrent.wires.forEach(e=>{
                    this._initWire(e)
                }
                ),
                this._torrent.on("wire", this._onWire),
                this.recalculate()
            }
            getRarestPiece(e) {
                let t = []
                  , n = 1 / 0;
                for (let r = 0; r < this._numPieces; ++r) {
                    if (e && !e(r))
                        continue;
                    const a = this._pieces[r];
                    a === n ? t.push(r) : a < n && (t = [r],
                    n = a)
                }
                return t.length ? t[0 | Math.random() * t.length] : -1
            }
            destroy() {
                this._torrent.removeListener("wire", this._onWire),
                this._torrent.wires.forEach(e=>{
                    this._cleanupWireEvents(e)
                }
                ),
                this._torrent = null,
                this._pieces = null,
                this._onWire = null,
                this._onWireHave = null,
                this._onWireBitfield = null
            }
            _initWire(e) {
                e._onClose = ()=>{
                    this._cleanupWireEvents(e);
                    for (let t = 0; t < this._numPieces; ++t)
                        this._pieces[t] -= e.peerPieces.get(t)
                }
                ,
                e.on("have", this._onWireHave),
                e.on("bitfield", this._onWireBitfield),
                e.once("close", e._onClose)
            }
            recalculate() {
                this._pieces.fill(0);
                for (const e of this._torrent.wires)
                    for (let t = 0; t < this._numPieces; ++t)
                        this._pieces[t] += e.peerPieces.get(t)
            }
            _cleanupWireEvents(e) {
                e.removeListener("have", this._onWireHave),
                e.removeListener("bitfield", this._onWireBitfield),
                e._onClose && e.removeListener("close", e._onClose),
                e._onClose = null
            }
        }
    }
    , {}],
    223: [function(e, t) {
        var n = Math.ceil
          , r = Math.max
          , a = Math.min;
        (function(o, i) {
            function d(e, t) {
                return 2 + n(t * e.downloadSpeed() / T.BLOCK_LENGTH)
            }
            function s(e, t, r) {
                return 1 + n(t * e.downloadSpeed() / r)
            }
            function l(e) {
                return 0 | Math.random() * e
            }
            function c() {}
            const u = e("addr-to-ip-port")
              , f = e("bitfield")
              , p = e("chunk-store-stream/write")
              , h = e("debug")("webtorrent:torrent")
              , m = e("torrent-discovery")
              , g = e("events").EventEmitter
              , _ = e("fs")
              , b = e("fs-chunk-store")
              , y = e("simple-get")
              , w = e("immediate-chunk-store")
              , k = e("multistream")
              , x = e("net")
              , v = e("os")
              , S = e("run-parallel")
              , E = e("run-parallel-limit")
              , C = e("parse-torrent")
              , I = e("path")
              , T = e("torrent-piece")
              , R = e("pump")
              , B = e("random-iterate")
              , L = e("simple-sha1")
              , A = e("speedometer")
              , P = e("uniq")
              , O = e("ut_metadata")
              , U = e("ut_pex")
              , D = e("parse-numeric-range")
              , M = e("./file")
              , j = e("./peer")
              , N = e("./rarity-map")
              , z = e("./server")
              , F = 5e3
              , W = 3 * T.BLOCK_LENGTH
              , H = 1
              , q = o.browser ? 1 / 0 : 2
              , G = [1e3, 5e3, 15e3]
              , Z = e("../package.json").version
              , V = `WebTorrent/${Z} (https://webtorrent.io)`;
            let K;
            try {
                K = I.join(_.statSync("/tmp") && "/tmp", "webtorrent")
            } catch (e) {
                K = I.join("function" == typeof v.tmpdir ? v.tmpdir() : "/", "webtorrent")
            }
            class X extends g {
                constructor(e, t, n) {
                    super(),
                    this._debugId = "unknown infohash",
                    this.client = t,
                    this.announce = n.announce,
                    this.urlList = n.urlList,
                    this.path = n.path,
                    this.skipVerify = !!n.skipVerify,
                    this._store = n.store || b,
                    this._getAnnounceOpts = n.getAnnounceOpts,
                    this.strategy = n.strategy || "sequential",
                    this.maxWebConns = n.maxWebConns || 4,
                    this._rechokeNumSlots = !1 === n.uploads || 0 === n.uploads ? 0 : +n.uploads || 10,
                    this._rechokeOptimisticWire = null,
                    this._rechokeOptimisticTime = 0,
                    this._rechokeIntervalId = null,
                    this.ready = !1,
                    this.destroyed = !1,
                    this.paused = !1,
                    this.done = !1,
                    this.metadata = null,
                    this.store = null,
                    this.files = [],
                    this.pieces = [],
                    this._amInterested = !1,
                    this._selections = [],
                    this._critical = [],
                    this.wires = [],
                    this._queue = [],
                    this._peers = {},
                    this._peersLength = 0,
                    this.received = 0,
                    this.uploaded = 0,
                    this._downloadSpeed = A(),
                    this._uploadSpeed = A(),
                    this._servers = [],
                    this._xsRequests = [],
                    this._fileModtimes = n.fileModtimes,
                    null !== e && this._onTorrentId(e),
                    this._debug("new torrent")
                }
                get timeRemaining() {
                    return this.done ? 0 : 0 === this.downloadSpeed ? 1 / 0 : 1e3 * ((this.length - this.downloaded) / this.downloadSpeed)
                }
                get downloaded() {
                    if (!this.bitfield)
                        return 0;
                    let e = 0;
                    for (let t = 0, n = this.pieces.length; t < n; ++t)
                        if (this.bitfield.get(t))
                            e += t === n - 1 ? this.lastPieceLength : this.pieceLength;
                        else {
                            const n = this.pieces[t];
                            e += n.length - n.missing
                        }
                    return e
                }
                get downloadSpeed() {
                    return this._downloadSpeed()
                }
                get uploadSpeed() {
                    return this._uploadSpeed()
                }
                get progress() {
                    return this.length ? this.downloaded / this.length : 0
                }
                get ratio() {
                    return this.uploaded / (this.received || 1)
                }
                get numPeers() {
                    return this.wires.length
                }
                get torrentFileBlobURL() {
                    if ("undefined" == typeof window)
                        throw new Error("browser-only property");
                    return this.torrentFile ? URL.createObjectURL(new Blob([this.torrentFile],{
                        type: "application/x-bittorrent"
                    })) : null
                }
                get _numQueued() {
                    return this._queue.length + (this._peersLength - this._numConns)
                }
                get _numConns() {
                    let e = 0;
                    for (const t in this._peers)
                        this._peers[t].connected && (e += 1);
                    return e
                }
                get swarm() {
                    return console.warn("WebTorrent: `torrent.swarm` is deprecated. Use `torrent` directly instead."),
                    this
                }
                _onTorrentId(e) {
                    if (this.destroyed)
                        return;
                    let t;
                    try {
                        t = C(e)
                    } catch (e) {}
                    t ? (this.infoHash = t.infoHash,
                    this._debugId = t.infoHash.toString("hex").substring(0, 7),
                    o.nextTick(()=>{
                        this.destroyed || this._onParsedTorrent(t)
                    }
                    )) : C.remote(e, (e,t)=>this.destroyed ? void 0 : e ? this._destroy(e) : void this._onParsedTorrent(t))
                }
                _onParsedTorrent(e) {
                    if (!this.destroyed) {
                        if (this._processParsedTorrent(e),
                        !this.infoHash)
                            return this._destroy(new Error("Malformed torrent data: No info hash"));
                        (this.path || (this.path = I.join(K, this.infoHash)),
                        this._rechokeIntervalId = setInterval(()=>{
                            this._rechoke()
                        }
                        , 1e4),
                        this._rechokeIntervalId.unref && this._rechokeIntervalId.unref(),
                        this.emit("_infoHash", this.infoHash),
                        !this.destroyed) && (this.emit("infoHash", this.infoHash),
                        this.destroyed || (this.client.listening ? this._onListening() : this.client.once("listening", ()=>{
                            this._onListening()
                        }
                        )))
                    }
                }
                _processParsedTorrent(e) {
                    this._debugId = e.infoHash.toString("hex").substring(0, 7),
                    this.announce && (e.announce = e.announce.concat(this.announce)),
                    this.client.tracker && i.WEBTORRENT_ANNOUNCE && !this.private && (e.announce = e.announce.concat(i.WEBTORRENT_ANNOUNCE)),
                    this.urlList && (e.urlList = e.urlList.concat(this.urlList)),
                    P(e.announce),
                    P(e.urlList),
                    Object.assign(this, e),
                    this.magnetURI = C.toMagnetURI(e),
                    this.torrentFile = C.toTorrentFile(e)
                }
                _onListening() {
                    this.destroyed || (this.info ? this._onMetadata(this) : (this.xs && this._getMetadataFromServer(),
                    this._startDiscovery()))
                }
                _startDiscovery() {
                    if (this.discovery || this.destroyed)
                        return;
                    let e = this.client.tracker;
                    e && (e = Object.assign({}, this.client.tracker, {
                        getAnnounceOpts: ()=>{
                            const e = {
                                uploaded: this.uploaded,
                                downloaded: this.downloaded,
                                left: r(this.length - this.downloaded, 0)
                            };
                            return this.client.tracker.getAnnounceOpts && Object.assign(e, this.client.tracker.getAnnounceOpts()),
                            this._getAnnounceOpts && Object.assign(e, this._getAnnounceOpts()),
                            e
                        }
                    })),
                    this.discovery = new m({
                        infoHash: this.infoHash,
                        announce: this.announce,
                        peerId: this.client.peerId,
                        dht: !this.private && this.client.dht,
                        tracker: e,
                        port: this.client.torrentPort,
                        userAgent: V
                    }),
                    this.discovery.on("error", e=>{
                        this._destroy(e)
                    }
                    ),
                    this.discovery.on("peer", e=>{
                        "string" == typeof e && this.done || this.addPeer(e)
                    }
                    ),
                    this.discovery.on("trackerAnnounce", ()=>{
                        this.emit("trackerAnnounce"),
                        0 === this.numPeers && this.emit("noPeers", "tracker")
                    }
                    ),
                    this.discovery.on("dhtAnnounce", ()=>{
                        this.emit("dhtAnnounce"),
                        0 === this.numPeers && this.emit("noPeers", "dht")
                    }
                    ),
                    this.discovery.on("warning", e=>{
                        this.emit("warning", e)
                    }
                    )
                }
                _getMetadataFromServer() {
                    function e(e, n) {
                        function r(r, a, o) {
                            if (t.destroyed)
                                return n(null);
                            if (t.metadata)
                                return n(null);
                            if (r)
                                return t.emit("warning", new Error(`http error from xs param: ${e}`)),
                                n(null);
                            if (200 !== a.statusCode)
                                return t.emit("warning", new Error(`non-200 status code ${a.statusCode} from xs param: ${e}`)),
                                n(null);
                            let i;
                            try {
                                i = C(o)
                            } catch (e) {}
                            return i ? i.infoHash === t.infoHash ? void (t._onMetadata(i),
                            n(null)) : (t.emit("warning", new Error(`got torrent file with incorrect info hash from xs param: ${e}`)),
                            n(null)) : (t.emit("warning", new Error(`got invalid torrent file from xs param: ${e}`)),
                            n(null))
                        }
                        if (0 !== e.indexOf("http://") && 0 !== e.indexOf("https://"))
                            return t.emit("warning", new Error(`skipping non-http xs param: ${e}`)),
                            n(null);
                        let a;
                        try {
                            a = y.concat({
                                url: e,
                                method: "GET",
                                headers: {
                                    "user-agent": V
                                }
                            }, r)
                        } catch (r) {
                            return t.emit("warning", new Error(`skipping invalid url xs param: ${e}`)),
                            n(null)
                        }
                        t._xsRequests.push(a)
                    }
                    const t = this
                      , n = Array.isArray(this.xs) ? this.xs : [this.xs]
                      , r = n.map(t=>n=>{
                        e(t, n)
                    }
                    );
                    S(r)
                }
                _onMetadata(e) {
                    if (this.metadata || this.destroyed)
                        return;
                    this._debug("got metadata"),
                    this._xsRequests.forEach(e=>{
                        e.abort()
                    }
                    ),
                    this._xsRequests = [];
                    let t;
                    if (e && e.infoHash)
                        t = e;
                    else
                        try {
                            t = C(e)
                        } catch (e) {
                            return this._destroy(e)
                        }
                    if (this._processParsedTorrent(t),
                    this.metadata = this.torrentFile,
                    this.client.enableWebSeeds && this.urlList.forEach(e=>{
                        this.addWebSeed(e)
                    }
                    ),
                    this._rarityMap = new N(this),
                    this.store = new w(new this._store(this.pieceLength,{
                        torrent: {
                            infoHash: this.infoHash
                        },
                        files: this.files.map(e=>({
                            path: I.join(this.path, e.path),
                            length: e.length,
                            offset: e.offset
                        })),
                        length: this.length,
                        name: this.infoHash
                    })),
                    this.files = this.files.map(e=>new M(this,e)),
                    this.so) {
                        const e = D.parse(this.so);
                        this.files.forEach((t,n)=>{
                            e.includes(n) && this.files[n].select(!0)
                        }
                        )
                    } else
                        0 !== this.pieces.length && this.select(0, this.pieces.length - 1, !1);
                    if (this._hashes = this.pieces,
                    this.pieces = this.pieces.map((e,t)=>{
                        const n = t === this.pieces.length - 1 ? this.lastPieceLength : this.pieceLength;
                        return new T(n)
                    }
                    ),
                    this._reservations = this.pieces.map(()=>[]),
                    this.bitfield = new f(this.pieces.length),
                    this.wires.forEach(e=>{
                        e.ut_metadata && e.ut_metadata.setMetadata(this.metadata),
                        this._onWireWithMetadata(e)
                    }
                    ),
                    this.emit("metadata"),
                    !this.destroyed)
                        if (this.skipVerify)
                            this._markAllVerified(),
                            this._onStore();
                        else {
                            const e = e=>e ? this._destroy(e) : void (this._debug("done verifying"),
                            this._onStore());
                            this._debug("verifying existing torrent data"),
                            this._fileModtimes && this._store === b ? this.getFileModtimes((t,n)=>{
                                if (t)
                                    return this._destroy(t);
                                const r = this.files.map((e,t)=>n[t] === this._fileModtimes[t]).every(e=>e);
                                r ? (this._markAllVerified(),
                                this._onStore()) : this._verifyPieces(e)
                            }
                            ) : this._verifyPieces(e)
                        }
                }
                getFileModtimes(e) {
                    const t = [];
                    E(this.files.map((e,n)=>r=>{
                        _.stat(I.join(this.path, e.path), (e,a)=>e && "ENOENT" !== e.code ? r(e) : void (t[n] = a && a.mtime.getTime(),
                        r(null)))
                    }
                    ), q, n=>{
                        this._debug("done getting file modtimes"),
                        e(n, t)
                    }
                    )
                }
                _verifyPieces(e) {
                    E(this.pieces.map((e,t)=>e=>this.destroyed ? e(new Error("torrent is destroyed")) : void this.store.get(t, (n,r)=>this.destroyed ? e(new Error("torrent is destroyed")) : n ? o.nextTick(e, null) : void L(r, n=>{
                        if (this.destroyed)
                            return e(new Error("torrent is destroyed"));
                        if (n === this._hashes[t]) {
                            if (!this.pieces[t])
                                return e(null);
                            this._debug("piece verified %s", t),
                            this._markVerified(t)
                        } else
                            this._debug("piece invalid %s", t);
                        e(null)
                    }
                    ))), q, e)
                }
                rescanFiles(e) {
                    if (this.destroyed)
                        throw new Error("torrent is destroyed");
                    e || (e = c),
                    this._verifyPieces(t=>t ? (this._destroy(t),
                    e(t)) : void (this._checkDone(),
                    e(null)))
                }
                _markAllVerified() {
                    for (let e = 0; e < this.pieces.length; e++)
                        this._markVerified(e)
                }
                _markVerified(e) {
                    this.pieces[e] = null,
                    this._reservations[e] = null,
                    this.bitfield.set(e, !0)
                }
                _onStore() {
                    this.destroyed || (this._debug("on store"),
                    this._startDiscovery(),
                    this.ready = !0,
                    this.emit("ready"),
                    this._checkDone(),
                    this._updateSelections())
                }
                destroy(e) {
                    this._destroy(null, e)
                }
                _destroy(e, t) {
                    if (!this.destroyed) {
                        for (const e in this.destroyed = !0,
                        this._debug("destroy"),
                        this.client._remove(this),
                        clearInterval(this._rechokeIntervalId),
                        this._xsRequests.forEach(e=>{
                            e.abort()
                        }
                        ),
                        this._rarityMap && this._rarityMap.destroy(),
                        this._peers)
                            this.removePeer(e);
                        this.files.forEach(e=>{
                            e instanceof M && e._destroy()
                        }
                        );
                        const n = this._servers.map(e=>t=>{
                            e.destroy(t)
                        }
                        );
                        this.discovery && n.push(e=>{
                            this.discovery.destroy(e)
                        }
                        ),
                        this.store && n.push(e=>{
                            this.store.close(e)
                        }
                        ),
                        S(n, t),
                        e && (0 === this.listenerCount("error") ? this.client.emit("error", e) : this.emit("error", e)),
                        this.emit("close"),
                        this.client = null,
                        this.files = [],
                        this.discovery = null,
                        this.store = null,
                        this._rarityMap = null,
                        this._peers = null,
                        this._servers = null,
                        this._xsRequests = null
                    }
                }
                addPeer(t) {
                    if (this.destroyed)
                        throw new Error("torrent is destroyed");
                    if (!this.infoHash)
                        throw new Error("addPeer() must not be called before the `infoHash` event");
                    if (this.client.blocked) {
                        let e;
                        if ("string" == typeof t) {
                            let n;
                            try {
                                n = u(t)
                            } catch (n) {
                                return this._debug("ignoring peer: invalid %s", t),
                                this.emit("invalidPeer", t),
                                !1
                            }
                            e = n[0]
                        } else
                            "string" == typeof t.remoteAddress && (e = t.remoteAddress);
                        if (e && this.client.blocked.contains(e))
                            return this._debug("ignoring peer: blocked %s", t),
                            "string" != typeof t && t.destroy(),
                            this.emit("blockedPeer", t),
                            !1
                    }
                    const n = !!this._addPeer(t);
                    return n ? this.emit("peer", t) : this.emit("invalidPeer", t),
                    n
                }
                _addPeer(e) {
                    if (this.destroyed)
                        return "string" != typeof e && e.destroy(),
                        null;
                    if ("string" == typeof e && !this._validAddr(e))
                        return this._debug("ignoring peer: invalid %s", e),
                        null;
                    const t = e && e.id || e;
                    if (this._peers[t])
                        return this._debug("ignoring peer: duplicate (%s)", t),
                        "string" != typeof e && e.destroy(),
                        null;
                    if (this.paused)
                        return this._debug("ignoring peer: torrent is paused"),
                        "string" != typeof e && e.destroy(),
                        null;
                    this._debug("add peer %s", t);
                    let n;
                    return n = "string" == typeof e ? j.createTCPOutgoingPeer(e, this) : j.createWebRTCPeer(e, this),
                    this._peers[n.id] = n,
                    this._peersLength += 1,
                    "string" == typeof e && (this._queue.push(n),
                    this._drain()),
                    n
                }
                addWebSeed(e) {
                    if (this.destroyed)
                        throw new Error("torrent is destroyed");
                    if (!/^https?:\/\/.+/.test(e))
                        return this.emit("warning", new Error(`ignoring invalid web seed: ${e}`)),
                        void this.emit("invalidPeer", e);
                    if (this._peers[e])
                        return this.emit("warning", new Error(`ignoring duplicate web seed: ${e}`)),
                        void this.emit("invalidPeer", e);
                    this._debug("add web seed %s", e);
                    const t = j.createWebSeedPeer(e, this);
                    this._peers[t.id] = t,
                    this._peersLength += 1,
                    this.emit("peer", e)
                }
                _addIncomingPeer(e) {
                    return this.destroyed ? e.destroy(new Error("torrent is destroyed")) : this.paused ? e.destroy(new Error("torrent is paused")) : void (this._debug("add incoming peer %s", e.id),
                    this._peers[e.id] = e,
                    this._peersLength += 1)
                }
                removePeer(e) {
                    const t = e && e.id || e;
                    e = this._peers[t];
                    e && (this._debug("removePeer %s", t),
                    delete this._peers[t],
                    this._peersLength -= 1,
                    e.destroy(),
                    this._drain())
                }
                select(e, t, n, r) {
                    if (this.destroyed)
                        throw new Error("torrent is destroyed");
                    if (0 > e || t < e || this.pieces.length <= t)
                        throw new Error(`invalid selection ${e} : ${t}`);
                    n = +n || 0,
                    this._debug("select %s-%s (priority %s)", e, t, n),
                    this._selections.push({
                        from: e,
                        to: t,
                        offset: 0,
                        priority: n,
                        notify: r || c
                    }),
                    this._selections.sort((e,t)=>t.priority - e.priority),
                    this._updateSelections()
                }
                deselect(e, t, n) {
                    if (this.destroyed)
                        throw new Error("torrent is destroyed");
                    n = +n || 0,
                    this._debug("deselect %s-%s (priority %s)", e, t, n);
                    for (let r = 0; r < this._selections.length; ++r) {
                        const a = this._selections[r];
                        if (a.from === e && a.to === t && a.priority === n) {
                            this._selections.splice(r, 1);
                            break
                        }
                    }
                    this._updateSelections()
                }
                critical(e, t) {
                    if (this.destroyed)
                        throw new Error("torrent is destroyed");
                    this._debug("critical %s-%s", e, t);
                    for (let n = e; n <= t; ++n)
                        this._critical[n] = !0;
                    this._updateSelections()
                }
                _onWire(e, t) {
                    if (this._debug("got wire %s (%s)", e._debugId, t || "Unknown"),
                    e.on("download", e=>{
                        this.destroyed || (this.received += e,
                        this._downloadSpeed(e),
                        this.client._downloadSpeed(e),
                        this.emit("download", e),
                        this.client.emit("download", e))
                    }
                    ),
                    e.on("upload", e=>{
                        this.destroyed || (this.uploaded += e,
                        this._uploadSpeed(e),
                        this.client._uploadSpeed(e),
                        this.emit("upload", e),
                        this.client.emit("upload", e))
                    }
                    ),
                    this.wires.push(e),
                    t) {
                        const n = u(t);
                        e.remoteAddress = n[0],
                        e.remotePort = n[1]
                    }
                    this.client.dht && this.client.dht.listening && e.on("port", n=>this.destroyed || this.client.dht.destroyed ? void 0 : e.remoteAddress ? 0 === n || 65536 < n ? this._debug("ignoring invalid PORT from peer") : void (this._debug("port: %s (from %s)", n, t),
                    this.client.dht.addNode({
                        host: e.remoteAddress,
                        port: n
                    })) : this._debug("ignoring PORT from peer with no address")),
                    e.on("timeout", ()=>{
                        this._debug("wire timeout (%s)", t),
                        e.destroy()
                    }
                    ),
                    e.setTimeout(3e4, !0),
                    e.setKeepAlive(!0),
                    e.use(O(this.metadata)),
                    e.ut_metadata.on("warning", e=>{
                        this._debug("ut_metadata warning: %s", e.message)
                    }
                    ),
                    this.metadata || (e.ut_metadata.on("metadata", e=>{
                        this._debug("got metadata via ut_metadata"),
                        this._onMetadata(e)
                    }
                    ),
                    e.ut_metadata.fetch()),
                    "function" != typeof U || this.private || (e.use(U()),
                    e.ut_pex.on("peer", e=>{
                        this.done || (this._debug("ut_pex: got peer: %s (from %s)", e, t),
                        this.addPeer(e))
                    }
                    ),
                    e.ut_pex.on("dropped", e=>{
                        const n = this._peers[e];
                        n && !n.connected && (this._debug("ut_pex: dropped peer: %s (from %s)", e, t),
                        this.removePeer(e))
                    }
                    ),
                    e.once("close", ()=>{
                        e.ut_pex.reset()
                    }
                    )),
                    this.emit("wire", e, t),
                    this.metadata && o.nextTick(()=>{
                        this._onWireWithMetadata(e)
                    }
                    )
                }
                _onWireWithMetadata(e) {
                    let t = null;
                    const n = ()=>{
                        this.destroyed || e.destroyed || (this._numQueued > 2 * (this._numConns - this.numPeers) && e.amInterested ? e.destroy() : (t = setTimeout(n, F),
                        t.unref && t.unref()))
                    }
                    ;
                    let r;
                    const a = ()=>{
                        if (e.peerPieces.buffer.length === this.bitfield.buffer.length) {
                            for (r = 0; r < this.pieces.length; ++r)
                                if (!e.peerPieces.get(r))
                                    return;
                            e.isSeeder = !0,
                            e.choke()
                        }
                    }
                    ;
                    e.on("bitfield", ()=>{
                        a(),
                        this._update()
                    }
                    ),
                    e.on("have", ()=>{
                        a(),
                        this._update()
                    }
                    ),
                    e.once("interested", ()=>{
                        e.unchoke()
                    }
                    ),
                    e.once("close", ()=>{
                        clearTimeout(t)
                    }
                    ),
                    e.on("choke", ()=>{
                        clearTimeout(t),
                        t = setTimeout(n, F),
                        t.unref && t.unref()
                    }
                    ),
                    e.on("unchoke", ()=>{
                        clearTimeout(t),
                        this._update()
                    }
                    ),
                    e.on("request", (t,n,r,a)=>r > 131072 ? e.destroy() : void (this.pieces[t] || this.store.get(t, {
                        offset: n,
                        length: r
                    }, a))),
                    e.bitfield(this.bitfield),
                    e.uninterested(),
                    e.peerExtensions.dht && this.client.dht && this.client.dht.listening && e.port(this.client.dht.address().port),
                    "webSeed" !== e.type && (t = setTimeout(n, F),
                    t.unref && t.unref()),
                    e.isSeeder = !1,
                    a()
                }
                _updateSelections() {
                    !this.ready || this.destroyed || (o.nextTick(()=>{
                        this._gcSelections()
                    }
                    ),
                    this._updateInterest(),
                    this._update())
                }
                _gcSelections() {
                    for (let e = 0; e < this._selections.length; ++e) {
                        const t = this._selections[e]
                          , n = t.offset;
                        for (; this.bitfield.get(t.from + t.offset) && t.from + t.offset < t.to; )
                            t.offset += 1;
                        n !== t.offset && t.notify(),
                        t.to === t.from + t.offset && this.bitfield.get(t.from + t.offset) && (this._selections.splice(e, 1),
                        e -= 1,
                        t.notify(),
                        this._updateInterest())
                    }
                    this._selections.length || this.emit("idle")
                }
                _updateInterest() {
                    const e = this._amInterested;
                    this._amInterested = !!this._selections.length,
                    this.wires.forEach(e=>{
                        let t = !1;
                        for (let n = 0; n < this.pieces.length; ++n)
                            if (this.pieces[n] && e.peerPieces.get(n)) {
                                t = !0;
                                break
                            }
                        t ? e.interested() : e.uninterested()
                    }
                    );
                    e === this._amInterested || (this._amInterested ? this.emit("interested") : this.emit("uninterested"))
                }
                _update() {
                    if (!this.destroyed) {
                        const e = B(this.wires);
                        for (let t; t = e(); )
                            this._updateWireWrapper(t)
                    }
                }
                _updateWireWrapper(e) {
                    const t = this;
                    "undefined" != typeof window && "function" == typeof window.requestIdleCallback ? window.requestIdleCallback(function() {
                        t._updateWire(e)
                    }, {
                        timeout: 250
                    }) : t._updateWire(e)
                }
                _updateWire(e) {
                    function t(t, n, r, a) {
                        return o=>o >= t && o <= n && !(o in r) && e.peerPieces.get(o) && (!a || a(o))
                    }
                    function n() {
                        const t = e.downloadSpeed() || 1;
                        if (t > W)
                            return ()=>!0;
                        const n = r(1, e.requests.length) * T.BLOCK_LENGTH / t;
                        let a = 10
                          , o = 0;
                        return e=>{
                            if (!a || s.bitfield.get(e))
                                return !0;
                            for (let r = s.pieces[e].missing; o < s.wires.length; o++) {
                                const i = s.wires[o]
                                  , d = i.downloadSpeed();
                                if (!(d < W) && !(d <= t) && i.peerPieces.get(e) && !(0 < (r -= d * n)))
                                    return a--,
                                    !1
                            }
                            return !0
                        }
                    }
                    function a(e) {
                        let t = e;
                        for (let n = e; n < s._selections.length && s._selections[n].priority; n++)
                            t = n;
                        const n = s._selections[e];
                        s._selections[e] = s._selections[t],
                        s._selections[t] = n
                    }
                    function o(r) {
                        if (e.requests.length >= c)
                            return !0;
                        const o = n();
                        for (let n = 0; n < s._selections.length; n++) {
                            const i = s._selections[n];
                            let d;
                            if ("rarest" === s.strategy) {
                                const l = i.from + i.offset
                                  , u = i.to
                                  , f = {};
                                let p = 0;
                                for (const h = t(l, u, f, o); p < u - l + 1 && (d = s._rarityMap.getRarestPiece(h),
                                !(0 > d)); ) {
                                    for (; s._request(e, d, s._critical[d] || r); )
                                        ;
                                    if (e.requests.length < c) {
                                        f[d] = !0,
                                        p++;
                                        continue
                                    }
                                    return i.priority && a(n),
                                    !0
                                }
                            } else
                                for (d = i.from + i.offset; d <= i.to; d++)
                                    if (e.peerPieces.get(d) && o(d)) {
                                        for (; s._request(e, d, s._critical[d] || r); )
                                            ;
                                        if (!(e.requests.length < c))
                                            return i.priority && a(n),
                                            !0
                                    }
                        }
                        return !1
                    }
                    const s = this;
                    if (e.peerChoking)
                        return;
                    if (!e.downloaded)
                        return function() {
                            if (!e.requests.length)
                                for (let n = s._selections.length; n--; ) {
                                    const r = s._selections[n];
                                    let a;
                                    if ("rarest" === s.strategy) {
                                        const n = r.from + r.offset
                                          , o = r.to
                                          , i = {};
                                        let d = 0;
                                        for (const r = t(n, o, i); d < o - n + 1 && (a = s._rarityMap.getRarestPiece(r),
                                        !(0 > a)); ) {
                                            if (s._request(e, a, !1))
                                                return;
                                            i[a] = !0,
                                            d += 1
                                        }
                                    } else
                                        for (a = r.to; a >= r.from + r.offset; --a)
                                            if (e.peerPieces.get(a) && s._request(e, a, !1))
                                                return
                                }
                        }();
                    const l = d(e, .5);
                    if (e.requests.length >= l)
                        return;
                    const c = d(e, H);
                    o(!1) || o(!0)
                }
                _rechoke() {
                    if (!this.ready)
                        return;
                    0 < this._rechokeOptimisticTime ? this._rechokeOptimisticTime -= 1 : this._rechokeOptimisticWire = null;
                    const e = [];
                    this.wires.forEach(t=>{
                        t.isSeeder || t === this._rechokeOptimisticWire || e.push({
                            wire: t,
                            downloadSpeed: t.downloadSpeed(),
                            uploadSpeed: t.uploadSpeed(),
                            salt: Math.random(),
                            isChoked: !0
                        })
                    }
                    ),
                    e.sort(function(e, t) {
                        return e.downloadSpeed === t.downloadSpeed ? e.uploadSpeed === t.uploadSpeed ? e.wire.amChoking === t.wire.amChoking ? e.salt - t.salt : e.wire.amChoking ? 1 : -1 : t.uploadSpeed - e.uploadSpeed : t.downloadSpeed - e.downloadSpeed
                    });
                    let t = 0
                      , n = 0;
                    for (; n < e.length && t < this._rechokeNumSlots; ++n)
                        e[n].isChoked = !1,
                        e[n].wire.peerInterested && (t += 1);
                    if (!this._rechokeOptimisticWire && n < e.length && this._rechokeNumSlots) {
                        const t = e.slice(n).filter(e=>e.wire.peerInterested)
                          , r = t[l(t.length)];
                        r && (r.isChoked = !1,
                        this._rechokeOptimisticWire = r.wire,
                        this._rechokeOptimisticTime = 2)
                    }
                    e.forEach(e=>{
                        e.wire.amChoking !== e.isChoked && (e.isChoked ? e.wire.choke() : e.wire.unchoke())
                    }
                    )
                }
                _hotswap(e, t) {
                    const n = e.downloadSpeed();
                    if (n < T.BLOCK_LENGTH)
                        return !1;
                    if (!this._reservations[t])
                        return !1;
                    const a = this._reservations[t];
                    if (!a)
                        return !1;
                    let r = 1 / 0, o, d;
                    for (d = 0; d < a.length; d++) {
                        const t = a[d];
                        if (!t || t === e)
                            continue;
                        const i = t.downloadSpeed();
                        i >= W || 2 * i > n || i > r || (o = t,
                        r = i)
                    }
                    if (!o)
                        return !1;
                    for (d = 0; d < a.length; d++)
                        a[d] === o && (a[d] = null);
                    for (d = 0; d < o.requests.length; d++) {
                        const e = o.requests[d];
                        e.piece === t && this.pieces[t].cancel(0 | e.offset / T.BLOCK_LENGTH)
                    }
                    return this.emit("hotswap", o, e, t),
                    !0
                }
                _request(e, t, n) {
                    function l() {
                        o.nextTick(()=>{
                            c._update()
                        }
                        )
                    }
                    const c = this
                      , u = e.requests.length
                      , f = "webSeed" === e.type;
                    if (c.bitfield.get(t))
                        return !1;
                    const p = f ? a(s(e, H, c.pieceLength), c.maxWebConns) : d(e, H);
                    if (u >= p)
                        return !1;
                    const h = c.pieces[t];
                    let m = f ? h.reserveRemaining() : h.reserve();
                    if (-1 === m && n && c._hotswap(e, t) && (m = f ? h.reserveRemaining() : h.reserve()),
                    -1 === m)
                        return !1;
                    let g = c._reservations[t];
                    g || (g = c._reservations[t] = []);
                    let _ = g.indexOf(null);
                    -1 === _ && (_ = g.length),
                    g[_] = e;
                    const b = h.chunkOffset(m)
                      , y = f ? h.chunkLengthRemaining(m) : h.chunkLength(m);
                    return e.request(t, b, y, function n(r, a) {
                        if (c.destroyed)
                            return;
                        if (!c.ready)
                            return c.once("ready", ()=>{
                                n(r, a)
                            }
                            );
                        if (g[_] === e && (g[_] = null),
                        h !== c.pieces[t])
                            return l();
                        if (r)
                            return c._debug("error getting piece %s (offset: %s length: %s) from %s: %s", t, b, y, `${e.remoteAddress}:${e.remotePort}`, r.message),
                            f ? h.cancelRemaining(m) : h.cancel(m),
                            void l();
                        if (c._debug("got piece %s (offset: %s length: %s) from %s", t, b, y, `${e.remoteAddress}:${e.remotePort}`),
                        !h.set(m, a, e))
                            return l();
                        const o = h.flush();
                        L(o, e=>{
                            if (!c.destroyed) {
                                if (e === c._hashes[t]) {
                                    if (!c.pieces[t])
                                        return;
                                    c._debug("piece verified %s", t),
                                    c.pieces[t] = null,
                                    c._reservations[t] = null,
                                    c.bitfield.set(t, !0),
                                    c.store.put(t, o),
                                    c.wires.forEach(e=>{
                                        e.have(t)
                                    }
                                    ),
                                    c._checkDone() && !c.destroyed && c.discovery.complete()
                                } else
                                    c.pieces[t] = new T(h.length),
                                    c.emit("warning", new Error(`Piece ${t} failed verification`));
                                l()
                            }
                        }
                        )
                    }),
                    !0
                }
                _checkDone() {
                    if (this.destroyed)
                        return;
                    this.files.forEach(e=>{
                        if (!e.done) {
                            for (let t = e._startPiece; t <= e._endPiece; ++t)
                                if (!this.bitfield.get(t))
                                    return;
                            e.done = !0,
                            e.emit("done"),
                            this._debug(`file done: ${e.name}`)
                        }
                    }
                    );
                    let e = !0;
                    for (let t = 0; t < this._selections.length; t++) {
                        const n = this._selections[t];
                        for (let t = n.from; t <= n.to; t++)
                            if (!this.bitfield.get(t)) {
                                e = !1;
                                break
                            }
                        if (!e)
                            break
                    }
                    return !this.done && e && (this.done = !0,
                    this._debug(`torrent done: ${this.infoHash}`),
                    this.emit("done")),
                    this._gcSelections(),
                    e
                }
                load(e, t) {
                    if (this.destroyed)
                        throw new Error("torrent is destroyed");
                    if (!this.ready)
                        return this.once("ready", ()=>{
                            this.load(e, t)
                        }
                        );
                    Array.isArray(e) || (e = [e]),
                    t || (t = c);
                    const n = new k(e)
                      , r = new p(this.store,this.pieceLength);
                    R(n, r, e=>e ? t(e) : void (this._markAllVerified(),
                    this._checkDone(),
                    t(null)))
                }
                createServer(e) {
                    if ("function" != typeof z)
                        throw new Error("node.js-only method");
                    if (this.destroyed)
                        throw new Error("torrent is destroyed");
                    const t = new z(this,e);
                    return this._servers.push(t),
                    t
                }
                pause() {
                    this.destroyed || (this._debug("pause"),
                    this.paused = !0)
                }
                resume() {
                    this.destroyed || (this._debug("resume"),
                    this.paused = !1,
                    this._drain())
                }
                _debug() {
                    const e = [].slice.call(arguments);
                    e[0] = `[${this.client._debugId}] [${this._debugId}] ${e[0]}`,
                    h(...e)
                }
                _drain() {
                    if (this._debug("_drain numConns %s maxConns %s", this._numConns, this.client.maxConns),
                    "function" != typeof x.connect || this.destroyed || this.paused || this._numConns >= this.client.maxConns)
                        return;
                    this._debug("drain (%s queued, %s/%s peers)", this._numQueued, this.numPeers, this.client.maxConns);
                    const e = this._queue.shift();
                    if (!e)
                        return;
                    this._debug("tcp connect attempt to %s", e.addr);
                    const t = u(e.addr)
                      , n = {
                        host: t[0],
                        port: t[1]
                    }
                      , r = e.conn = x.connect(n);
                    r.once("connect", ()=>{
                        e.onConnect()
                    }
                    ),
                    r.once("error", t=>{
                        e.destroy(t)
                    }
                    ),
                    e.startConnectTimeout(),
                    r.on("close", ()=>{
                        if (!this.destroyed) {
                            if (e.retries >= G.length)
                                return void this._debug("conn %s closed: will not re-add (max %s attempts)", e.addr, G.length);
                            const t = G[e.retries];
                            this._debug("conn %s closed: will re-add to queue in %sms (attempt %s)", e.addr, t, e.retries + 1);
                            const n = setTimeout(()=>{
                                const t = this._addPeer(e.addr);
                                t && (t.retries = e.retries + 1)
                            }
                            , t);
                            n.unref && n.unref()
                        }
                    }
                    )
                }
                _validAddr(e) {
                    let t;
                    try {
                        t = u(e)
                    } catch (t) {
                        return !1
                    }
                    const n = t[0]
                      , r = t[1];
                    return 0 < r && 65535 > r && ("127.0.0.1" !== n || r !== this.client.torrentPort)
                }
            }
            t.exports = X
        }
        ).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
    }
    , {
        "../package.json": 225,
        "./file": 220,
        "./peer": 221,
        "./rarity-map": 222,
        "./server": 17,
        _process: 137,
        "addr-to-ip-port": 3,
        bitfield: 9,
        "chunk-store-stream/write": 25,
        debug: 49,
        events: 53,
        fs: 18,
        "fs-chunk-store": 105,
        "immediate-chunk-store": 58,
        multistream: 112,
        net: 17,
        os: 17,
        "parse-numeric-range": 131,
        "parse-torrent": 132,
        path: 133,
        pump: 138,
        "random-iterate": 143,
        "run-parallel": 164,
        "run-parallel-limit": 163,
        "simple-get": 169,
        "simple-sha1": 171,
        speedometer: 174,
        "torrent-discovery": 205,
        "torrent-piece": 206,
        uniq: 209,
        ut_metadata: 214,
        ut_pex: 17
    }],
    224: [function(e, t) {
        var n = Math.max;
        (function(r) {
            const a = e("bitfield")
              , o = e("debug")("webtorrent:webconn")
              , i = e("simple-get")
              , d = e("simple-sha1")
              , s = e("bittorrent-protocol")
              , l = e("../package.json").version;
            t.exports = class extends s {
                constructor(e, t) {
                    super(),
                    this.url = e,
                    this.webPeerId = d.sync(e),
                    this._torrent = t,
                    this._init()
                }
                _init() {
                    this.setKeepAlive(!0),
                    this.once("handshake", e=>{
                        if (this.destroyed)
                            return;
                        this.handshake(e, this.webPeerId);
                        const t = this._torrent.pieces.length
                          , n = new a(t);
                        for (let r = 0; r <= t; r++)
                            n.set(r, !0);
                        this.bitfield(n)
                    }
                    ),
                    this.once("interested", ()=>{
                        o("interested"),
                        this.unchoke()
                    }
                    ),
                    this.on("uninterested", ()=>{
                        o("uninterested")
                    }
                    ),
                    this.on("choke", ()=>{
                        o("choke")
                    }
                    ),
                    this.on("unchoke", ()=>{
                        o("unchoke")
                    }
                    ),
                    this.on("bitfield", ()=>{
                        o("bitfield")
                    }
                    ),
                    this.on("request", (e,t,n,r)=>{
                        o("request pieceIndex=%d offset=%d length=%d", e, t, n),
                        this.httpRequest(e, t, n, r)
                    }
                    )
                }
                httpRequest(e, t, a, d) {
                    const s = e * this._torrent.pieceLength
                      , c = s + t
                      , u = c + a - 1
                      , f = this._torrent.files;
                    let p;
                    if (1 >= f.length)
                        p = [{
                            url: this.url,
                            start: c,
                            end: u
                        }];
                    else {
                        const e = f.filter(e=>e.offset <= u && e.offset + e.length > c);
                        if (1 > e.length)
                            return d(new Error("Could not find file corresponnding to web seed range request"));
                        p = e.map(e=>{
                            const t = e.offset + e.length - 1
                              , r = this.url + ("/" === this.url[this.url.length - 1] ? "" : "/") + e.path;
                            return {
                                url: r,
                                fileOffsetInRange: n(e.offset - c, 0),
                                start: n(c - e.offset, 0),
                                end: Math.min(t, u - e.offset)
                            }
                        }
                        )
                    }
                    let h = 0, m = !1, g;
                    1 < p.length && (g = r.alloc(a)),
                    p.forEach(n=>{
                        function r(e, t) {
                            return 200 > e.statusCode || 300 <= e.statusCode ? (m = !0,
                            d(new Error(`Unexpected HTTP status code ${e.statusCode}`))) : void (o("Got data of length %d", t.length),
                            1 === p.length ? d(null, t) : (t.copy(g, n.fileOffsetInRange),
                            ++h === p.length && d(null, g)))
                        }
                        const s = n.url
                          , c = n.start
                          , u = n.end;
                        o("Requesting url=%s pieceIndex=%d offset=%d length=%d start=%d end=%d", s, e, t, a, c, u);
                        const f = {
                            url: s,
                            method: "GET",
                            headers: {
                                "user-agent": `WebTorrent/${l} (https://webtorrent.io)`,
                                range: `bytes=${c}-${u}`
                            }
                        };
                        i.concat(f, (e,t,n)=>m ? void 0 : e ? "undefined" == typeof window || s.startsWith(`${window.location.origin}/`) ? (m = !0,
                        d(e)) : i.head(s, (t,n)=>m ? void 0 : t ? (m = !0,
                        d(t)) : 200 > n.statusCode || 300 <= n.statusCode ? (m = !0,
                        d(new Error(`Unexpected HTTP status code ${n.statusCode}`))) : n.url === s ? (m = !0,
                        d(e)) : void (f.url = n.url,
                        i.concat(f, (e,t,n)=>m ? void 0 : e ? (m = !0,
                        d(e)) : void r(t, n)))) : void r(t, n))
                    }
                    )
                }
                destroy() {
                    super.destroy(),
                    this._torrent = null
                }
            }
        }
        ).call(this, e("buffer").Buffer)
    }
    , {
        "../package.json": 225,
        bitfield: 9,
        "bittorrent-protocol": 10,
        buffer: 23,
        debug: 49,
        "simple-get": 169,
        "simple-sha1": 171
    }],
    225: [function(e, t) {
        t.exports = {
            version: "0.107.16"
        }
    }
    , {}],
    226: [function(e, t) {
        function n(e, t) {
            function r() {
                for (var t = Array(arguments.length), n = 0; n < t.length; n++)
                    t[n] = arguments[n];
                var r = e.apply(this, t)
                  , a = t[t.length - 1];
                return "function" == typeof r && r !== a && Object.keys(a).forEach(function(e) {
                    r[e] = a[e]
                }),
                r
            }
            if (e && t)
                return n(e)(t);
            if ("function" != typeof e)
                throw new TypeError("need wrapper function");
            return Object.keys(e).forEach(function(t) {
                r[t] = e[t]
            }),
            r
        }
        t.exports = n
    }
    , {}],
    227: [function(e, t) {
        t.exports = function() {
            for (var e = {}, t = 0, r; t < arguments.length; t++)
                for (var a in r = arguments[t],
                r)
                    n.call(r, a) && (e[a] = r[a]);
            return e
        }
        ;
        var n = Object.prototype.hasOwnProperty
    }
    , {}]
}, {}, [2]);
