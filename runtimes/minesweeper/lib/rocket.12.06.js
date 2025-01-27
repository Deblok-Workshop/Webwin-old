/*
 The Rocket JavaScript library.

  This library is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library.  If not, see
  <http://www.gnu.org/licenses/>.
*/
var rocket = rocket || {};
rocket.mission = "Alpha Centauri";
rocket.version = 12.06;
rocket.KEY = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  control: 17,
  alt: 18,
  escape: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  home: 36,
  end: 35,
  del: 46,
};
rocket.inherits = function (a, b) {
  function c() {}
  c.prototype = b.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;
};
rocket.$ = function (a, b) {
  var c;
  "string" === typeof a
    ? ((c = b
        ? "string" === typeof b
          ? rocket.querySelectorAll(b)[0]
          : b.nodeType
            ? b
            : b
              ? b[0]
              : document
        : document),
      (c = rocket.querySelectorAll(a, c)))
    : (c = a ? (a.nodeType || a === window ? [a] : a) : []);
  return new rocket.Elements(c);
};
rocket.EventTarget = function () {};
rocket.EventTarget.prototype.parentNode = null;
rocket.EventTarget.prototype.customEventTarget = !0;
rocket.EventTarget.prototype.addEventListener = function (a, b) {
  return rocket.addEventListener(this, a, b);
};
rocket.EventTarget.prototype.removeEventListener = function (a, b) {
  return rocket.removeEventListener(this, a, b);
};
rocket.EventTarget.prototype.dispatchEvent = function (a) {
  return rocket.dispatchEvent(this, a);
};
rocket.Component = function (a) {
  this.decorate(a);
};
rocket.inherits(rocket.Component, rocket.EventTarget);
rocket.Component.prototype.render = function (a) {
  this.renderInternal();
  this.decorateInternal();
  this.parent_ = 0 === arguments.length ? document.body : rocket.$(a)[0];
  this.parent_.appendChild(this.element_);
};
rocket.Component.prototype.renderInternal = function () {};
rocket.Component.prototype.decorate = function (a) {
  this.element_ = rocket.$(a)[0];
  this.parent_ = this.element_.parentNode;
  this.decorateInternal();
};
rocket.Component.prototype.decorateInternal = function () {};
rocket.Component.prototype.dispose = function () {
  var a, b, c;
  rocket.removeEventListener(this);
  rocket.removeEventListener(this.element_);
  a = 0;
  c = this.element_.getElementsByTagName("*");
  for (b = c.length; a < b; ++a) rocket.removeEventListener(c[a]);
  this.parent_.removeChild(this.element_);
  if (this.children_) {
    a = 0;
    for (b = this.children_.length; a < b; ++a) this.children_[a].dispose();
  }
  this.element_ = this.parent_ = null;
};
rocket.addEventListener = function (a, b, c) {
  var d = rocket.guid(a),
    e,
    f,
    g,
    h;
  e = b.indexOf(".");
  -1 === e ? (h = "") : ((h = b.substr(e + 1)), (b = b.substr(0, e)));
  if (b in rocket.listenerTree)
    if (d in rocket.listenerTree[b]) {
      e = rocket.listenerTree[b][d];
      f = 0;
      for (g = e.length; f < g; ++f) if (c === e[f].listener) return a;
    } else rocket.listenerTree[b][d] = [];
  else (rocket.listenerTree[b] = {}), (rocket.listenerTree[b][d] = []);
  c = new rocket.EventListener(a, b, h, c);
  rocket.listeners[c.guid] = c;
  rocket.listenerTree[b][d].push(c);
  if (!0 !== a.customEventTarget) {
    c.init_bound();
    h = rocket.EventListener.custom_events[b]
      ? rocket.EventListener.custom_events[b].types
      : [b];
    b = 0;
    for (d = h.length; b < d; ++b)
      rocket.addEventListener.add_event_listener_(a, h[b], c.bound);
  }
  return a;
};
rocket.addEventListener.add_event_listener_ = function (a, b, c) {
  rocket.addEventListener.add_event_listener_ = document.addEventListener
    ? function (a, b, c) {
        a.addEventListener(b, c, !1);
      }
    : function (a, b, c) {
        a.attachEvent("on" + b, c);
      };
  rocket.addEventListener.add_event_listener_(a, b, c);
};
rocket.arrayify = function (a) {
  if ("string" !== typeof a) return a || [];
  a = rocket.trim(a);
  return "" === a
    ? []
    : -1 === a.indexOf(",")
      ? -1 === a.indexOf("  ") &&
        -1 === a.indexOf("\r") &&
        -1 === a.indexOf("\n") &&
        -1 === a.indexOf("\t")
        ? a.split(" ")
        : a.split(/\s+/)
      : a.split(/[\s,]+/);
};
rocket.AutoComplete = function (a, b) {
  this.url = a;
  this.key = b;
};
rocket.inherits(rocket.AutoComplete, rocket.Component);
rocket.AutoComplete.prototype.renderInternal = function () {
  this.element_ = document.createElement("input");
};
rocket.AutoComplete.prototype.decorateInternal = function () {
  this.input = new rocket.Elements([this.element_]);
  var a = this,
    b = !1;
  this.container = rocket.createElement("div");
  this.selected = new rocket.Elements([]);
  this.json = {};
  this.row = {};
  this.request = new rocket.XMLHttpRequest();
  this.container.preventSelect();
  this.container.innerHTML(this.beginSearchInnerHTML);
  this.container.style({
    position: "absolute",
    backgroundColor: "white",
    border: "1px solid gray",
    display: "none",
  });
  this.container.live("tr", "mouseover", function () {
    a.selected.style("backgroundColor", "");
    a.selected = new rocket.Elements([this]);
    a.selected.style("backgroundColor", a.backgroundColor);
  });
  this.container.live("tr", "click", function () {
    a.selected.style("backgroundColor", "");
    a.selected = new rocket.Elements([this]);
    a.selected.style("backgroundColor", a.backgroundColor);
    a.input.value(
      a.selected.firstElementChild().innerHTML().replace(a.replace, ""),
    );
    a.update_this_row_();
    a.dispatchEvent("select");
    a.container.hide();
    b = !1;
  });
  this.container.addEventListener("mousedown", function () {
    b = !0;
  });
  this.children_ = [];
  var c = new rocket.Component(this.container[0]);
  c.render(document.body);
  this.children_ = [c];
  this.input.setAttribute({ autocomplete: "off", spellcheck: !1 });
  this.input.addEventListener(
    ["focus.autocomplete", "click.autocomplete"],
    function () {
      a.position();
      a.container.show();
      0 === a.value.length &&
        0 !== this.value.length &&
        a.input.dispatchEvent("afterkeydown");
    },
  );
  this.input.addEventListener("blur.autocomplete", function () {
    var c;
    b
      ? ((b = !1),
        (c = a.input.value().length),
        a.input.focus().setSelectionRange(c, c))
      : a.container.hide();
  });
  this.input.addEventListener("keydown.autocomplete", function (b) {
    a.container.show();
    var c;
    0 !== this.value.length &&
      (b.which === rocket.KEY.down || b.which === rocket.KEY.up
        ? (0 === a.selected.length
            ? 0 !== a.container.firstElementChild().length &&
              ((c = a.container.firstElementChild().firstElementChild()),
              (a.selected =
                b.which === rocket.KEY.down
                  ? c.firstElementChild()
                  : c.lastElementChild()))
            : (a.selected.style("backgroundColor", ""),
              (a.selected =
                b.which === rocket.KEY.down
                  ? a.selected.nextElementSibling()
                  : a.selected.previousElementSibling())),
          0 === a.selected.length
            ? a.input.value(a.value)
            : (a.input.value(
                a.selected
                  .firstElementChild()
                  .innerHTML()
                  .replace(a.replace, ""),
              ),
              a.selected.style("backgroundColor", a.backgroundColor)),
          (a.row = {}),
          a.dispatchEvent("unselect"))
        : b.which === rocket.KEY.enter
          ? (1 === a.selected.length
              ? (a.input.value(
                  a.selected
                    .firstElementChild()
                    .innerHTML()
                    .replace(a.replace, ""),
                ),
                a.update_this_row_(),
                a.dispatchEvent("select"))
              : 0 !== a.container.firstElementChild().length &&
                ((c = a.container
                  .firstElementChild()
                  .firstElementChild()
                  .children()),
                1 === c.length &&
                  (a.selected.style("backgroundColor", ""),
                  (a.selected = c),
                  a.selected.style("backgroundColor", a.backgroundColor),
                  a.input.value(
                    a.selected
                      .firstElementChild()
                      .innerHTML()
                      .replace(a.replace, ""),
                  ),
                  a.update_this_row_(),
                  a.dispatchEvent("select"))),
            a.container.hide(),
            b.preventDefault())
          : b.which === rocket.KEY.escape &&
            (a.selected.style("backgroundColor", ""),
            (a.selected = new rocket.Elements([])),
            a.input.value(a.value),
            (a.row = {}),
            a.dispatchEvent("unselect")));
  });
  var d = function () {
    var b, c, d, h, i;
    a.json = rocket.JSON.parse(this.responseText);
    if ((d = a.json[0] && a.json[0].length)) {
      h = [];
      for (b = 0; a.json[b]; ++b)
        for (c = 0; c < d; ++c)
          0 === b && (h[c] = rocket.createElement("tr")),
            (i = rocket
              .createElement("td")
              .style({
                whiteSpace: "nowrap",
                overflow: "hidden",
                paddingLeft: 2 + a.paddingLeftOffset,
              })
              .innerHTML(a.json[b][c])),
            a.tdStyle && i.style(a.tdStyle),
            h[c].appendChild(i);
      b = [];
      for (c = 0; c < d; ++c) b[c] = h[c][0];
      a.container
        .innerHTML("")
        .appendChild(
          rocket
            .createElement("table")
            .style({ width: "100%", cursor: "pointer", tableLayout: "fixed" })
            .setAttribute({ border: 0, cellSpacing: 0 }),
        )
        .appendChild(rocket.createElement("tbody"))
        .appendChild(b);
    } else a.container.innerHTML(a.noResultsInnerHTML);
  };
  this.input.addEventListener("afterkeydown.autocomplete", function (b) {
    b.which !== rocket.KEY.down &&
      b.which !== rocket.KEY.up &&
      b.which !== rocket.KEY.enter &&
      this.value !== a.value &&
      ((a.selected = new rocket.Elements([])),
      (a.value = this.value),
      (a.row = {}),
      a.dispatchEvent("unselect"),
      0 === this.value.length
        ? a.container.innerHTML(a.beginSearchInnerHTML)
        : (a.request.open("POST", a.url),
          a.request.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded",
          ),
          a.request.addEventListener("success", d),
          (a.request.data = function () {
            var b = {};
            b[a.key] = a.input.value();
            return b;
          }),
          a.request.send()));
  });
};
rocket.AutoComplete.prototype.update_this_row_ = function () {
  var a = this.selected.getAttribute("rowindex");
  this.row = {};
  if (-1 !== a) for (var b in this.json) this.row[b] = this.json[b][a];
};
rocket.AutoComplete.prototype.position = function () {
  var a = this.input.getBoundingClientRect();
  this.container.style({
    top: this.top || a.bottom - 2 + this.topOffset,
    left: this.left || a.left + this.leftOffset,
    width: this.width || a.width - 3 + this.widthOffset,
  });
};
rocket.AutoComplete.prototype.topOffset = 0;
rocket.AutoComplete.prototype.widthOffset = 0;
rocket.AutoComplete.prototype.leftOffset = 0;
rocket.AutoComplete.prototype.paddingLeftOffset = 0;
rocket.AutoComplete.prototype.backgroundColor = "#D5E2FF";
rocket.AutoComplete.prototype.value = "";
rocket.AutoComplete.prototype.replace = /<[^>]+>/g;
rocket.AutoComplete.prototype.noResultsInnerHTML =
  '<div style="padding:1px 2px 2px">no results found...</div>';
rocket.AutoComplete.prototype.beginSearchInnerHTML =
  '<div style="padding:1px 2px 2px">begin typing to search...</div>';
rocket.bind = function (a, b, c) {
  rocket.bind = Function.prototype.bind
    ? function (a, b, c) {
        return a.bind.apply(b, Array.prototype.slice.call(arguments, 2));
      }
    : function (a, b, c) {
        var g;
        if (2 === arguments.length)
          return function () {
            return a.apply(b, arguments);
          };
        g = Array.prototype.slice.call(arguments, 2);
        return function () {
          return a.apply(b, g.concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
  return rocket.bind(a, b, c);
};
rocket.clamp = function (a, b, c) {
  return a < b ? b : a > c ? c : a;
};
rocket.createElement = function (a) {
  return new rocket.Elements([document.createElement(a)]);
};
rocket.debounce = function (a, b) {
  var c;
  return function () {
    clearTimeout(c);
    var d = this,
      e = arguments;
    c = setTimeout(function () {
      b.apply(d, e);
    }, a);
  };
};
rocket.dispatchEvent = function (a, b) {
  var c, d, e, f, g, h, i;
  e = "string" === typeof b ? new rocket.Event({ type: b }) : b;
  e.target || (e.target = a);
  if (
    e.type in rocket.listenerTree &&
    (d = rocket.listenerTree[e.type][rocket.guid(a)])
  ) {
    i = [];
    f = 0;
    for (g = d.length; f < g; ++f) i.push(d[f].guid);
    f = 0;
    for (g = i.length; f < g; ++f)
      (c = rocket.listeners[i[f]]) && c.listener.call(a, e);
  }
  !0 !== e.propagationStopped &&
    (h = a.parentNode) &&
    rocket.dispatchEvent(h, e);
  return !(!e || !e.defaultPrevented);
};
rocket.Event = function (a) {
  var b;
  rocket.extend(this, a, rocket.Event.properties_);
  this.originalEvent = a;
  this.defaultPrevented =
    !0 === this.defaultPrevented || !1 === this.returnValue ? !0 : !1;
  this.propagationStopped = !0 === this.cancelBubble ? !0 : !1;
  void 0 === this.which &&
    void 0 !== this.keyCode &&
    (this.which = this.keyCode);
  void 0 === this.target &&
    void 0 !== this.srcElement &&
    (this.target = this.srcElement);
  void 0 === this.relatedTarget &&
    void 0 !== this.fromElement &&
    void 0 !== this.toElement &&
    (this.relatedTarget =
      this.fromElement === this.target ? this.toElement : this.fromElement);
  void 0 === this.pageX &&
    void 0 !== this.clientX &&
    (((this.pageX = this.clientX),
    (a = document.body),
    (b = document.documentElement)
      ? (this.pageX += b.scrollLeft - b.clientLeft)
      : a && (this.pageX += a.scrollLeft - a.clientLeft),
    (this.pageY = this.clientY),
    b)
      ? (this.pageY += b.scrollTop - b.clientTop)
      : a && (this.pageY += a.scrollTop - a.clientTop));
};
rocket.Event.properties_ =
  "type defaultPrevented returnValue cancelBubble which keyCode target srcElement relatedTarget fromElement toElement pageX pageY clientX clientY".split(
    " ",
  );
rocket.Event.prototype.stopPropagation = function () {
  "function" === typeof this.originalEvent.stopPropagation
    ? this.originalEvent.stopPropagation()
    : (this.originalEvent.cancelBubble = !0);
  this.propagationStopped = !0;
};
rocket.Event.prototype.preventDefault = function () {
  "function" === typeof this.originalEvent.preventDefault
    ? this.originalEvent.preventDefault()
    : (this.originalEvent.returnValue = !1);
  this.defaultPrevented = !0;
};
rocket.EventListener = function (a, b, c, d) {
  this.source = a;
  this.type = b;
  this.namespace = c;
  this.listener = d;
  this.guid = ++rocket.EventListener.counter_;
};
rocket.EventListener.counter_ = 0;
rocket.EventListener.prototype.init_bound = function () {
  var a = this.guid,
    b = rocket.EventListener.custom_events[this.type];
  this.bound_listener =
    b && b.transformer ? b.transformer(this.listener) : this.listener;
  this.bound = function (b) {
    return rocket.listeners[a].bound_listener.call(
      rocket.listeners[a].source,
      new rocket.Event(b),
    );
  };
};
rocket.EventListener.mouse_enter_leave_ = function (a) {
  return function (b) {
    var c;
    if (b.originalEvent && (c = b.relatedTarget))
      for (; c !== this && (c = c.parentNode); );
    c || a.call(this, b);
  };
};
rocket.EventListener.after_key_down_ = function (a) {
  var b,
    c,
    d = function () {
      b && (clearInterval(b), (b = 0));
      c = 0;
    },
    e,
    f,
    g,
    h = function () {
      e.value !== f &&
        (clearInterval(b), (b = 0), (g.type = "afterkeydown"), a.call(e, g));
    };
  return function (i) {
    a.call(this, i);
    "keyup" === i.type
      ? b && (clearInterval(b), (b = 0), c && (clearTimeout(c), (c = 0)))
      : (b || ((e = this), (f = this.value), (g = i), (b = setInterval(h, 17))),
        c && clearTimeout(c),
        (c = setTimeout(d, 1e3)));
  };
};
rocket.EventListener.custom_events = {
  mouseenter: {
    transformer: rocket.EventListener.mouse_enter_leave_,
    types: ["mouseover"],
  },
  mouseleave: {
    transformer: rocket.EventListener.mouse_enter_leave_,
    types: ["mouseout"],
  },
  afterkeydown: {
    transformer: rocket.EventListener.after_key_down_,
    types: ["keydown", "keyup"],
  },
};
rocket.every = function (a, b, c) {
  rocket.every = Array.prototype.every
    ? function (a, b, c) {
        return Array.prototype.every.call(a, b, c);
      }
    : function (a, b, c) {
        for (var g = 0, h = a.length; g < h; ++g)
          if (!b.call(c, a[g], g, a)) return !1;
        return !0;
      };
  return rocket.every(a, b, c);
};
rocket.extend = function (a, b, c) {
  if (c) for (var d = 0, e = c.length; d < e; ++d) a[c[d]] = b[c[d]];
  else for (d in b) a[d] = b[d];
  return a;
};
rocket.filter = function (a, b, c) {
  rocket.filter = Array.prototype.filter
    ? function (a, b, c) {
        return Array.prototype.filter.call(a, b, c);
      }
    : function (a, b, c) {
        for (var g = 0, h = a.length, i = []; g < h; ++g)
          b.call(c, a[g], g, a) && i.push(a[g]);
        return i;
      };
  return rocket.filter(a, b, c);
};
rocket.forEach = function (a, b, c) {
  rocket.forEach = Array.prototype.forEach
    ? function (a, b, c) {
        Array.prototype.forEach.call(a, b, c);
      }
    : function (a, b, c) {
        for (var g = 0, h = a.length; g < h; ++g) b.call(c, a[g], g, a);
      };
  rocket.forEach(a, b, c);
};
rocket.get = function (a, b, c) {
  var d = new rocket.XMLHttpRequest();
  c && (d.data = c);
  d.open("GET", a);
  b && d.addEventListener("success", b);
  d.send();
};
rocket.guid = function (a) {
  return (
    a[rocket.guid.expando_] ||
    (a[rocket.guid.expando_] = ++rocket.guid.counter_)
  );
};
rocket.guid.counter_ = 0;
rocket.guid.expando_ = "rocket_" + rocket.version + "_" + new Date().getTime();
rocket.indexOf = function (a, b, c) {
  rocket.indexOf = Array.prototype.indexOf
    ? function (a, b, c) {
        return Array.prototype.indexOf.call(a, b, c);
      }
    : function (a, b, c) {
        for (var c = c || 0, g = a.length; c < g; ++c) if (b === a[c]) return c;
        return -1;
      };
  return rocket.indexOf(a, b, c);
};
rocket.isArray = function (a) {
  rocket.isArray = Array.isArray
    ? Array.isArray
    : function (a) {
        return (
          !!a &&
          "number" === typeof a.length &&
          "[object Array]" === Object.prototype.toString.call(a)
        );
      };
  return rocket.isArray(a);
};
rocket.isEmpty = function (a) {
  for (var b in a) return !1;
  return !0;
};
rocket.JSON = {};
rocket.JSON.parse = function (a) {
  rocket.JSON.parse =
    window.JSON && window.JSON.parse
      ? window.JSON.parse
      : function (a) {
          return eval("(" + a + ")");
        };
  return rocket.JSON.parse(a);
};
rocket.JSON.stringify = function (a) {
  rocket.JSON.stringify =
    window.JSON && window.JSON.stringify
      ? window.JSON.stringify
      : function (a) {
          var c, d, e;
          if (void 0 !== a) {
            d = typeof a;
            if ("string" === d) return '"' + encodeURIComponent(a) + '"';
            if ("number" === d || "boolean" === d || null === a) return "" + a;
            if ("number" === typeof a.length) {
              d = a.length;
              c = 0;
              for (e = []; c < d; ++c)
                e[c] = void 0 === a[c] ? "null" : rocket.JSON.stringify(a[c]);
              return "[" + e.join(",") + "]";
            }
            e = [];
            for (c in a)
              void 0 !== a[c] &&
                e.push(
                  '"' +
                    encodeURIComponent(c) +
                    '":' +
                    rocket.JSON.stringify(a[c]),
                );
            return "{" + e.join(",") + "}";
          }
        };
  return rocket.JSON.stringify(a);
};
rocket.keys = function (a) {
  rocket.keys = Object.keys
    ? Object.keys
    : function (a) {
        var c = [],
          d;
        for (d in a) c.push(d);
        return c;
      };
  return rocket.keys(a);
};
rocket.lastIndexOf = function (a, b, c) {
  rocket.lastIndexOf = Array.prototype.lastIndexOf
    ? function (a, b, c) {
        return void 0 === c
          ? Array.prototype.lastIndexOf.call(a, b)
          : Array.prototype.lastIndexOf.call(a, b, c);
      }
    : function (a, b, c) {
        for (
          var g = a.length - 1, c = void 0 === c ? g : Math.min(g, c);
          -1 < c;
          --c
        )
          if (b === a[c]) return c;
        return -1;
      };
  return rocket.lastIndexOf(a, b, c);
};
rocket.listeners = {};
rocket.listenerTree = {};
rocket.load = function (a, b) {
  var c, d, e, f;
  c = document.head;
  c ||
    ((c = document.getElementsByTagName("head")),
    (c = c[0]),
    c ||
      ((c = document.getElementsByTagName("script")), (c = c[0].parentNode)));
  d = document.createElement("script");
  d.async = !0;
  d.type = "text/javascript";
  d.src = a;
  d.onload = d.onreadystatechange = function () {
    var a = rocket.load.elements_[f].readyState;
    if (!a || a === "loaded" || a === "complete") {
      b && b();
      rocket.load.elements_[e].removeChild(rocket.load.elements_[f]);
      delete rocket.load.elements_[e];
      delete rocket.load.elements_[f];
    }
  };
  c.insertBefore(d, c.firstChild);
  e = ++rocket.load.guid_;
  f = ++rocket.load.guid_;
  rocket.load.elements_[e] = c;
  rocket.load.elements_[f] = d;
  d = c = null;
};
rocket.load.guid_ = 0;
rocket.load.elements_ = {};
rocket.map = function (a, b, c) {
  rocket.map = Array.prototype.map
    ? function (a, b, c) {
        return Array.prototype.map.call(a, b, c);
      }
    : function (a, b, c) {
        for (var g = 0, h = a.length, i = []; g < h; ++g)
          i[g] = b.call(c, a[g], g, a);
        return i;
      };
  return rocket.map(a, b, c);
};
rocket.matchesSelector = function (a, b) {
  return rocket.matchesSelector.helper_(a, b);
};
rocket.matchesSelector.helper_ = function (a, b) {
  rocket.matchesSelector.helper_ = document.body.webkitMatchesSelector
    ? function (a, b) {
        return a.webkitMatchesSelector(b);
      }
    : document.body.mozMatchesSelector
      ? function (a, b) {
          return a.mozMatchesSelector(b);
        }
      : document.body.msMatchesSelector
        ? function (a, b) {
            return a.msMatchesSelector(b);
          }
        : function (a, b) {
            var e, f, g;
            if (-1 !== b.indexOf(",")) {
              e = b.split(",");
              f = 0;
              for (g = e.length; f < g; ++f)
                if (rocket.matchesSelector.helper_(a, e[f])) return !0;
              return !1;
            }
            e = rocket.arrayify(b);
            f = e.pop();
            if (!f || !rocket.matchesSelector.simple_match_(a, f)) return !1;
            g = a.parentNode;
            for (f = e.pop(); g && f; )
              rocket.matchesSelector.simple_match_(g, f) && (f = e.pop()),
                (g = g.parentNode);
            return !f;
          };
  return rocket.matchesSelector.helper_(a, b);
};
rocket.matchesSelector.simple_match_ = function (a, b) {
  var c = b.charAt(0),
    d;
  return "#" === c
    ? a.id === b.substr(1)
    : "." === c
      ? RegExp("(?:\\s|^)" + b.substr(1) + "(?:\\s|$)").test(a.className)
      : -1 === (d = b.indexOf("."))
        ? a.nodeName === b.toUpperCase()
        : a.nodeName === b.substr(0, d).toUpperCase() &&
          RegExp("(?:\\s|^)" + b.substr(d + 1) + "(?:\\s|$)").test(a.className);
};
rocket.now = function () {
  rocket.now = Date.now
    ? Date.now
    : function () {
        return new Date().getTime();
      };
  return rocket.now();
};
rocket.numberFormat = function (a, b, c, d) {
  var e,
    b = b || 0,
    f,
    d = void 0 === d ? "," : d;
  f = void 0 === c ? "." : c;
  c = b && f ? 0 : 2;
  "string" === typeof a && (a = parseFloat(a));
  a = a.toFixed(b);
  a = ("" + a).split("");
  e = a.length - 1 - b;
  b && (a[e] = f);
  if (d) for (b = e - 1; 0 < b; --b) (e - b) % 3 === c && a.splice(b, 0, d);
  return a.join("");
};
rocket.padLeft = function (a, b, c) {
  b -= a.length;
  return 0 < b
    ? Array(b + 1)
        .join(c || " ")
        .substr(0, b) + a
    : a;
};
rocket.padRight = function (a, b, c) {
  b -= a.length;
  return 0 < b
    ? a +
        Array(b + 1)
          .join(c || " ")
          .substr(0, b)
    : a;
};
rocket.post = function (a, b, c) {
  var d = new rocket.XMLHttpRequest();
  c && (d.data = c);
  d.open("POST", a);
  d.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  b && d.addEventListener("success", b);
  d.send();
};
rocket.querySelectorAll = function (a, b) {
  return rocket.querySelectorAll.helper_(a, b);
};
rocket.querySelectorAll.helper_ = function (a, b) {
  rocket.querySelectorAll.helper_ = document.querySelectorAll
    ? function (a, b) {
        return (b || document).querySelectorAll(a);
      }
    : function (a, b) {
        var e = a.charAt(0),
          f = b || document;
        if (-1 !== a.indexOf(","))
          return rocket.querySelectorAll.multiple_(a.split(","), f);
        if (-1 !== a.indexOf(" "))
          return rocket.querySelectorAll.crawler_(a, f);
        if ("#" === e)
          return ((f = f.getElementById(a.substr(1))) && [f]) || [];
        if ("." === e)
          return rocket.querySelectorAll.class_name_(a.substr(1), f);
        e = a.indexOf(".");
        return -1 === e
          ? f.getElementsByTagName(a)
          : rocket.querySelectorAll.tag_class_name_(a, f, e);
      };
  return rocket.querySelectorAll.helper_(a, b);
};
rocket.querySelectorAll.multiple_ = function (a, b) {
  for (var c = 0, d = a.length, e, f, g = [], h; c < d; ++c) {
    h = rocket.querySelectorAll(rocket.trim(a[c]), b);
    e = 0;
    for (f = h.length; e < f; ++e) g.push(h[e]);
  }
  return g;
};
rocket.querySelectorAll.crawler_ = function (a, b) {
  for (
    var c = rocket.arrayify(a),
      c = rocket.querySelectorAll(c[c.length - 1], b),
      d = 0,
      e = c.length,
      f = [];
    d < e;
    ++d
  )
    rocket.matchesSelector(c[d], a) && f.push(c[d]);
  return f;
};
rocket.querySelectorAll.class_name_ = function (a, b) {
  for (
    var c = b.getElementsByTagName("*"),
      d = [],
      e = 0,
      f,
      g = c.length,
      h = RegExp("(?:\\s|^)" + a + "(?:\\s|$)"),
      i = {},
      j;
    e < g;
    ++e
  )
    (f = c[e]),
      (j = f.className),
      void 0 !== i[j]
        ? i[j] && d.push(f)
        : h.test(j)
          ? (d.push(f), (i[j] = !0))
          : (i[j] = !1);
  return d;
};
rocket.querySelectorAll.tag_class_name_ = function (a, b, c) {
  for (
    var b = b.getElementsByTagName(a.substr(0, c)),
      a = RegExp("(?:\\s|^)" + a.substr(c + 1) + "(?:\\s|$)"),
      c = [],
      d = 0,
      e,
      f = b.length,
      g = {},
      h;
    d < f;
    ++d
  )
    (e = b[d]),
      (h = e.className),
      void 0 !== g[h]
        ? g[h] && c.push(e)
        : a.test(h)
          ? (c.push(e), (g[h] = !0))
          : (g[h] = !1);
  return c;
};
rocket.ready = function (a) {
  var b, c, d, e, f;
  "complete" === document.readyState
    ? ((rocket.ready = function (a) {
        a();
      }),
      a())
    : ((d = new rocket.Elements([window])),
      (b = !0),
      (c = [a]),
      (rocket.ready = function (a) {
        c.push(a);
      }),
      (e = function () {
        var a, f;
        if (b) {
          b = !1;
          d.removeEventListener(["load.ready", "DOMContentLoaded.ready"], e);
          rocket.ready = function (a) {
            a();
          };
          a = 0;
          for (f = c.length; a < f; ++a) c[a]();
        }
      }),
      d.addEventListener(["load.ready", "DOMContentLoaded.ready"], e),
      document.documentElement &&
        null === window.frameElement &&
        ((f = function () {
          if (b) {
            try {
              document.documentElement.doScroll("left");
            } catch (a) {
              return setTimeout(f, 17);
            }
            e();
          }
        }),
        setTimeout(f, 0)));
};
rocket.reduce = function (a, b, c) {
  rocket.reduce = Array.prototype.reduce
    ? function (a, b, c) {
        return 3 === arguments.length
          ? Array.prototype.reduce.call(a, b, c)
          : Array.prototype.reduce.call(a, b);
      }
    : function (a, b, c) {
        var g,
          h = a.length,
          i;
        3 === arguments.length ? ((g = 0), (i = c)) : ((g = 1), (i = a[0]));
        for (; g < h; ++g) i = b(i, a[g], g, a);
        return i;
      };
  return 3 === arguments.length ? rocket.reduce(a, b, c) : rocket.reduce(a, b);
};
rocket.reduceRight = function (a, b, c) {
  rocket.reduceRight = Array.prototype.reduceRight
    ? function (a, b, c) {
        return 3 === arguments.length
          ? Array.prototype.reduceRight.call(a, b, c)
          : Array.prototype.reduceRight.call(a, b);
      }
    : function (a, b, c) {
        var g,
          h = a.length - 1;
        3 === arguments.length ? ((g = h), (h = c)) : ((g = h - 1), (h = a[h]));
        for (; -1 > g; --g) h = b(h, a[g], g, a);
        return h;
      };
  return 3 === arguments.length
    ? rocket.reduceRight(a, b, c)
    : rocket.reduceRight(a, b);
};
rocket.removeEventListener = function (a, b, c) {
  var d, e, f, g, h, i, j, l, n, m;
  b
    ? ((h = b.indexOf(".")),
      -1 === h
        ? ((e = {}), (e[b] = !0), (m = ""))
        : ((m = b.substr(h + 1)),
          0 === h
            ? (e = rocket.listenerTree)
            : ((e = {}), (e[b.substr(0, h)] = !0))))
    : ((m = ""), (e = rocket.listenerTree));
  a && ((g = {}), (g[rocket.guid(a)] = !0));
  for (d in e)
    if (d in rocket.listenerTree)
      for (f in (a || (g = rocket.listenerTree[d]), g))
        if ((e = rocket.listenerTree[d][f])) {
          h = 0;
          for (i = e.length; h < i; ++h)
            if (
              ((b = e[h]),
              (!c || b.listener === c) && (!m || b.namespace === m))
            ) {
              if (!0 !== b.source.customEventTarget) {
                n =
                  b.type in rocket.EventListener.custom_events
                    ? rocket.EventListener.custom_events[b.type].types
                    : [b.type];
                j = 0;
                for (l = n.length; j < l; ++j)
                  rocket.removeEventListener.remove_event_listener_(
                    b.source,
                    n[j],
                    b.bound,
                  );
              }
              delete rocket.listeners[b.guid];
              e.splice(h, 1);
              --h;
              --i;
            }
          rocket.isEmpty(e) &&
            (delete rocket.listenerTree[d][f],
            rocket.isEmpty(rocket.listenerTree[d]) &&
              delete rocket.listenerTree[d]);
        }
  return a;
};
rocket.removeEventListener.remove_event_listener_ = function (a, b, c) {
  rocket.removeEventListener.remove_event_listener_ =
    document.removeEventListener
      ? function (a, b, c) {
          a.removeEventListener(b, c, !1);
        }
      : function (a, b, c) {
          a.detachEvent("on" + b, c);
        };
  rocket.removeEventListener.remove_event_listener_(a, b, c);
};
rocket.setInterval = function (a, b, c) {
  rocket.setInterval = function (a, b, c) {
    if (3 > arguments.length) return setInterval(a, b);
    var g = Array.prototype.slice.call(arguments, 2);
    return setInterval(function () {
      a.apply(window, g);
    }, b);
  };
  setTimeout(
    function (a) {
      !0 === a &&
        (rocket.setInterval = function () {
          return setInterval.apply(window, arguments);
        });
    },
    0,
    !0,
  );
  return rocket.setInterval.apply(window, arguments);
};
rocket.setTimeout = function (a, b, c) {
  rocket.setTimeout = function (a, b, c) {
    if (3 > arguments.length) return setTimeout(a, b);
    var g = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function () {
      a.apply(window, g);
    }, b);
  };
  setTimeout(
    function (a) {
      !0 === a &&
        (rocket.setTimeout = function () {
          return setTimeout.apply(window, arguments);
        });
    },
    0,
    !0,
  );
  return rocket.setTimeout.apply(window, arguments);
};
rocket.some = function (a, b, c) {
  rocket.some = Array.prototype.some
    ? function (a, b, c) {
        return Array.prototype.some.call(a, b, c);
      }
    : function (a, b, c) {
        for (var g = 0, h = a.length; g < h; ++g)
          if (b.call(c, a[g], g, a)) return !0;
        return !1;
      };
  return rocket.some(a, b, c);
};
rocket.SortTable = function (a) {
  this.table = new rocket.Elements([a]);
  this.headers = this.table.firstElementChild().firstElementChild().children();
  this.order = {};
  this.type = {};
  this.order_map_ = [];
  for (
    var b = this,
      c = this.table.firstElementChild(),
      d = c.children().slice(1),
      e = d.length,
      f = [],
      a = 0;
    a < e;
    ++a
  )
    f[a] = [];
  var g = function (a, c) {
    for (var d = 0, e = a.length, f, g, k; d < e; ++d) {
      k = b.order_map_[d];
      b.type[k]
        ? ((f = rocket.SortTable.data_type_converter_(b.type[k], a[d])),
          (g = rocket.SortTable.data_type_converter_(b.type[k], c[d])))
        : ((f = a[d]), (g = c[d]));
      if (f > g) return 1 * b.order[k];
      if (f < g) return -1 * b.order[k];
    }
    return 0;
  };
  this.headers.preventSelect();
  this.headers.style("cursor", "pointer");
  this.headers.addEventListener(
    ["click.sorttable", "dblclick.sorttable"],
    rocket.throttle(100, function () {
      var a = b.headers.indexOf(this),
        i,
        j;
      j = b.headers[a];
      if (b.order[a])
        if (((i = rocket.indexOf(b.order_map_, a)), 1 === b.order[a]))
          (j.innerHTML =
            j.innerHTML.substr(0, j.innerHTML.length - 1) + b.down),
            (b.order[a] = -1);
        else {
          j.innerHTML = j.innerHTML.substr(0, j.innerHTML.length - 1);
          for (j = 0; j < e; ++j) f[j].splice(i, 1);
          b.order_map_.splice(i, 1);
          delete b.order[a];
        }
      else {
        j.innerHTML += b.up;
        b.order[a] = 1;
        b.order_map_.push(a);
        i = rocket.indexOf(b.order_map_, a);
        for (j = 0; j < e; ++j)
          f[j][i] = d
            .slice(j, j + 1)
            .children()
            .slice(a, a + 1)
            .innerHTML();
      }
      if (!rocket.isEmpty(b.order)) {
        a = f.slice(0);
        a.sort(g);
        for (j = 0; j < e; ++j)
          (i = rocket.indexOf(f, a[j], j)),
            i !== j - 1 &&
              (c.insertBefore(d[i], d[j + 1]),
              d.splice(j, 0, d.splice(i, 1)[0]),
              f.splice(j, 0, f.splice(i, 1)[0]));
      }
    }),
  );
};
rocket.inherits(rocket.SortTable, rocket.EventTarget);
rocket.SortTable.data_type_converter_ = function (a, b) {
  var c;
  if ("numeric" === a) return parseFloat(b);
  if ("monetary" === a)
    return parseFloat(b.replace(/<[^>]+>|[,\$\)]/g, "").replace("(", "-"));
  if ("date_mdy" === a) {
    if (((c = b.split(/\D+/)), c[2]))
      if ("" === c[0]) {
        if (c[3]) return (c[1] << 5) + +c[2] + (c[3] << 9);
      } else return (c[0] << 5) + +c[1] + (c[2] << 9);
  } else if ("date_ymd" === a && ((c = b.split(/\D+/)), c[2]))
    if ("" === c[0]) {
      if (c[3]) return (c[1] << 9) + (c[2] << 5) + +c[3];
    } else return (c[0] << 9) + (c[1] << 5) + +c[2];
  return 0;
};
rocket.SortTable.prototype.up = "\u2191";
rocket.SortTable.prototype.down = "\u2193";
rocket.step = function (a, b, c, d) {
  var d = d || rocket.step.fps_,
    e = b || rocket.step.duration_,
    f = new Date().getTime(),
    g = setInterval(function () {
      var b = (new Date().getTime() - f) / e;
      1 < b && (b = 1);
      a(b, 0.5 - Math.cos(Math.PI * b) / 2);
      1 === b && (clearInterval(g), c && c());
    }, 1e3 / d);
  return g;
};
rocket.step.duration_ = 300;
rocket.step.fps_ = 20;
rocket.throttle = function (a, b) {
  var c = !1,
    d = function () {
      c = !1;
    };
  return function () {
    c || ((c = !0), setTimeout(d, a), b.apply(this, arguments));
  };
};
rocket.trim = function (a) {
  rocket.trim = String.trim
    ? String.trim
    : function (a) {
        return a && a.replace(/^\s+|\s+$/g, "");
      };
  return rocket.trim(a);
};
rocket.trimLeft = function (a) {
  rocket.trimLeft = String.trimLeft
    ? String.trimLeft
    : function (a) {
        return a && a.replace(/^\s+/, "");
      };
  return rocket.trimLeft(a);
};
rocket.trimRight = function (a) {
  rocket.trimRight = String.trimRight
    ? String.trimRight
    : function (a) {
        return a && a.replace(/\s+$/, "");
      };
  return rocket.trimRight(a);
};
rocket.values = function (a) {
  var b = [],
    c;
  for (c in a) b.push(a[c]);
  return b;
};
rocket.XMLHttpRequest = function (a) {
  this.request_ = a || this.get_request_();
  this.guid_ = ++rocket.XMLHttpRequest.guid_;
  this.headers_ = {};
};
rocket.inherits(rocket.XMLHttpRequest, rocket.EventTarget);
rocket.XMLHttpRequest.prototype.readyState = 0;
rocket.XMLHttpRequest.prototype.status = 0;
rocket.XMLHttpRequest.prototype.responseText = "";
rocket.XMLHttpRequest.prototype.uri_encode_ = function (a) {
  if ("string" === typeof a) return a;
  var b = [],
    c;
  for (c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
  return b.join("&").replace(/%20/g, "+");
};
rocket.XMLHttpRequest.prototype.get_request_ = function () {
  var a, b, c, d;
  if (window.XMLHttpRequest)
    return (
      (rocket.XMLHttpRequest.prototype.get_request_ = function () {
        return new XMLHttpRequest();
      }),
      new XMLHttpRequest()
    );
  a = [
    "MSXML2.XMLHTTP.6.0",
    "MSXML2.XMLHTTP.3.0",
    "MSXML2.XMLHTTP",
    "Microsoft.XMLHTTP",
  ];
  b = 0;
  c = a.length;
  for (
    rocket.XMLHttpRequest.prototype.get_request_ = function () {
      return new ActiveXObject(a[b]);
    };
    b < c;
    ++b
  )
    try {
      d = new ActiveXObject(a[b]);
      break;
    } catch (e) {}
  return d;
};
rocket.XMLHttpRequest.prototype.open = function (a, b) {
  this.method_ = a;
  this.url_ = b;
  var c = "GET" === a.toUpperCase();
  c && this.init_data_();
  this.request_.open(
    a,
    b +
      (c && this.saved_data_
        ? (-1 === b.indexOf("?") ? "?" : "&") + this.saved_data_
        : ""),
    !0,
  );
  this.init_ready_state_change_();
  this.headers_ = {};
  this.readyState = 1;
  this.status = 0;
  this.responseText = "";
  if (this.onreadystatechange) this.onreadystatechange();
  else this.dispatchEvent("readystatechange");
};
rocket.XMLHttpRequest.prototype.send = function (a) {
  this.method_ && this.method_.toUpperCase();
  a
    ? this.request_.send(a)
    : this.request_.send(
        "POST" === this.method_.toUpperCase() ? this.init_data_() : "",
      );
  if (this.onreadystatechange) this.onreadystatechange();
  else this.dispatchEvent("readystatechange");
};
rocket.XMLHttpRequest.prototype.setRequestHeader = function (a, b) {
  this.headers_[a] = b;
  this.request_.setRequestHeader(a, b);
};
rocket.XMLHttpRequest.prototype.abort = function () {
  this.request_ &&
    "function" === typeof this.request_.abort &&
    this.request_.abort();
  if (this.onabort) this.onabort();
  else this.dispatchEvent("abort");
  this.removeEventListener();
  this.headers_ = {};
  this.status = this.readyState = 0;
  this.responseText = "";
};
rocket.XMLHttpRequest.prototype.init_data_ = function () {
  var a;
  this.data
    ? "string" === typeof this.data
      ? (this.saved_data_ = this.data)
      : ((a = "function" === typeof this.data ? this.data() : this.data),
        (this.saved_data_ = this.uri_encode_(a)))
    : (this.saved_data_ = "");
  return this.saved_data_;
};
rocket.XMLHttpRequest.prototype.init_ready_state_change_ = function () {
  var a = this.guid_;
  rocket.XMLHttpRequest.requests_[a] = this;
  this.request_.onreadystatechange = function () {
    var b = rocket.XMLHttpRequest.requests_[a];
    if (b) {
      b.readyState = b.request_.readyState;
      4 === b.readyState &&
        ((b.status = b.request_.status),
        200 === b.status
          ? ((b.responseText = b.request_.responseText),
            "function" === typeof b.data &&
            b.saved_data_ !== b.uri_encode_(b.data())
              ? b.dispatchEvent("change")
              : b.dispatchEvent("nochange"),
            b.dispatchEvent("success"))
          : 0 !== b.status && b.dispatchEvent("error"),
        b.dispatchEvent("complete"));
      if (b.onreadystatechange) b.onreadystatechange();
      else b.dispatchEvent("readystatechange");
      4 === b.readyState &&
        (b.removeEventListener(),
        delete b.onreadystatechange,
        delete b.onabort,
        delete rocket.XMLHttpRequest.requests_[a]);
    }
  };
};
rocket.XMLHttpRequest.guid_ = 0;
rocket.XMLHttpRequest.requests_ = {};
rocket.Elements = function (a) {
  for (var b = 0, c = (this.length = a.length); b < c; ++b) this[b] = a[b];
};
rocket.Elements.prototype.activeClass = function (a) {
  return this.addEventListener(
    ["mousedown.activeClass", "keydown.activeClass"],
    function (b) {
      ("keydown" !== b.type || b.which === rocket.KEY.space) &&
        new rocket.Elements([this]).addClass(a);
    },
  ).addEventListener(
    [
      "blur.activeClass",
      "mouseout.activeClass",
      "mousup.activeClass",
      "keyup.activeClass",
    ],
    function () {
      new rocket.Elements([this]).removeClass(a);
    },
  );
};
rocket.Elements.prototype.addClass = function (a) {
  for (
    var a = rocket.arrayify(a),
      b = {},
      c = 0,
      d = this.length,
      e,
      f = a.length,
      g,
      h,
      i,
      j = a.join(" ");
    c < d;
    ++c
  )
    if (((g = this[c]), (h = g.className), b[h])) g.className = b[h];
    else {
      if ("" === h || h === j) i = a;
      else {
        i = rocket.arrayify(h);
        for (e = 0; e < f; ++e) -1 === rocket.indexOf(i, a[e]) && i.push(a[e]);
      }
      g.className = b[h] = i.join(" ");
    }
  return this;
};
rocket.Elements.prototype.addEventListener = function (a, b) {
  for (
    var c = rocket.arrayify(a), d = 0, e = this.length, f, g = c.length;
    d < e;
    ++d
  )
    for (f = 0; f < g; ++f) rocket.addEventListener(this[d], c[f], b);
  return this;
};
rocket.Elements.prototype.appendChild = function (a) {
  var b, c;
  if (this.length) {
    c = a.nodeType ? [a] : a;
    a = 0;
    for (b = c.length; a < b; ++a) this[0].appendChild(c[a]);
  } else c = [];
  return new rocket.Elements(c);
};
rocket.Elements.prototype.autotab = function () {
  for (var a = 0, b = this.length, c = this, d = [], e = [], f = []; a < b; ++a)
    (f[a] = new rocket.Elements([this[a]])),
      (d[a] = this[a].maxLength),
      (e[a] = this[a].value.length);
  this.addEventListener("afterkeydown.autotab", function (a) {
    var h = c.indexOf(this),
      i,
      j = this.value;
    if ("keydown" === a.type)
      if (a.which === rocket.KEY.home)
        f[0].focus().setSelectionRange(0, d[0]), a.preventDefault();
      else if (a.which === rocket.KEY.end)
        f[b - 1].focus().setSelectionRange(0, d[b - 1]), a.preventDefault();
      else if (a.which === rocket.KEY.right || a.which === rocket.KEY.del) {
        if (
          h !== b - 1 &&
          ((i = f[h].selectionStart()),
          i === d[h] || (0 === j.length && 0 === i))
        )
          f[h + 1]
            .focus()
            .setSelectionRange(0, a.which === rocket.KEY.right ? 0 : d[h + 1]),
            a.preventDefault();
      } else if (
        (a.which === rocket.KEY.left || a.which === rocket.KEY.backspace) &&
        0 !== h &&
        0 === f[h].selectionEnd()
      )
        f[h - 1]
          .focus()
          .setSelectionRange(
            a.which === rocket.KEY.left ? d[h - 1] : 0,
            d[h - 1],
          ),
          a.preventDefault();
    j.length === d[h] &&
      f[h].selectionStart() === d[h] &&
      e[h] < d[h] &&
      h !== b - 1 &&
      f[h + 1].focus().setSelectionRange(0, d[h + 1]);
    e[h] = j.length;
  });
  return this;
};
rocket.Elements.prototype.blur = function () {
  this.length && this[0].blur();
  return this;
};
rocket.Elements.prototype.checked = function (a) {
  return 0 === arguments.length
    ? this.getAttribute("checked")
    : this.setAttribute("checked", a);
};
rocket.Elements.prototype.children = function () {
  for (var a = 0, b = this.length, c = [], d, e, f, g; a < b; ++a) {
    f = this[a].children;
    d = 0;
    for (e = f.length; d < e; ++d) (g = f[d]), 1 === g.nodeType && c.push(g);
  }
  return new rocket.Elements(c);
};
rocket.Elements.prototype.cloneNode = function (a) {
  for (var b = 0, c = this.length, d = []; b < c; ++b)
    d[b] = this[b].cloneNode(a);
  return new rocket.Elements(d);
};
rocket.Elements.prototype.dataset = function (a, b) {
  var c,
    d,
    e = 0,
    f = this.length;
  if (1 === arguments.length) {
    if ("string" === typeof a) {
      if (f) return this.dataset_get_(this[0], a);
      return;
    }
    c = a;
  } else (c = {}), (c[a] = b);
  for (; e < f; ++e) for (d in c) this.dataset_set_(this[e], d, c[d]);
  return this;
};
rocket.Elements.prototype.dataset_get_ = function (a, b) {
  rocket.Elements.prototype.dataset_get_ = a.dataset
    ? function (a, b) {
        return a.dataset[b];
      }
    : function (a, b) {
        return a.getAttribute("data-" + b);
      };
  return rocket.Elements.prototype.dataset_get_(a, b);
};
rocket.Elements.prototype.dataset_set_ = function (a, b, c) {
  rocket.Elements.prototype.dataset_set_ = a.dataset
    ? function (a, b, c) {
        a.dataset[b] = c;
      }
    : function (a, b, c) {
        a.setAttribute("data-" + b, c);
      };
  rocket.Elements.prototype.dataset_set_(a, b, c);
};
rocket.Elements.prototype.disabled = function (a) {
  return void 0 === a
    ? this.getAttribute("disabled")
    : this.setAttribute("disabled", a);
};
rocket.Elements.prototype.dispatchEvent = function (a) {
  for (
    var a =
        "string" === typeof a
          ? rocket.arrayify(a)
          : rocket.isArray(a)
            ? a
            : [a],
      b = 0,
      c = this.length,
      d,
      e = a.length;
    b < c;
    ++b
  )
    for (d = 0; d < e; ++d) rocket.dispatchEvent(this[b], a[d]);
  return this;
};
rocket.Elements.prototype.every = function (a, b) {
  rocket.Elements.prototype.every = Array.prototype.every
    ? Array.prototype.every
    : function (a, b) {
        return rocket.every(this, a, b);
      };
  return this.every(a, b);
};
rocket.Elements.prototype.fade = function (a, b, c) {
  var d = 0,
    e = this.length,
    f = this,
    g = [],
    h = [],
    i = [],
    j;
  for (
    c &&
    (j = function () {
      c.call(f);
    });
    d < e;
    ++d
  )
    (i[d] = new rocket.Elements([this[d]])),
      (g[d] = i[d].style("opacity")),
      (h[d] = a - g[d]);
  rocket.step(
    function (a, b) {
      for (d = 0; d < e; ++d) i[d].style("opacity", g[d] + b * h[d]);
    },
    b,
    j,
  );
  return this;
};
rocket.Elements.prototype.filter = function (a, b) {
  return new rocket.Elements(rocket.filter(this, a, b));
};
rocket.Elements.prototype.firstElementChild = function () {
  if (0 === this.length) return new rocket.Elements([]);
  rocket.Elements.prototype.firstElementChild =
    void 0 !== this[0].firstElementChild
      ? function () {
          for (var a = 0, b = this.length, c = [], d; a < b; ++a)
            (d = this[a].firstElementChild) && c.push(d);
          return new rocket.Elements(c);
        }
      : function () {
          for (var a = 0, b = this.length, c = [], d; a < b; ++a) {
            for (d = this[a].firstChild; d && 1 !== d.nodeType; )
              d = d.nextSibling;
            d && c.push(d);
          }
          return new rocket.Elements(c);
        };
  return this.firstElementChild();
};
rocket.Elements.prototype.focus = function () {
  this.length && this[0].focus();
  return this;
};
rocket.Elements.prototype.focusClass = function (a) {
  return this.addEventListener("focus.focusClass", function () {
    new rocket.Elements([this]).addClass(a);
  }).addEventListener("blur.focusClass", function () {
    new rocket.Elements([this]).removeClass(a);
  });
};
rocket.Elements.prototype.forEach = function (a, b) {
  rocket.Elements.prototype.forEach = Array.prototype.forEach
    ? Array.prototype.forEach
    : function (a, b) {
        return rocket.forEach(this, a, b);
      };
  this.forEach(a, b);
};
rocket.Elements.prototype.getAttribute = function (a) {
  var b, c, d;
  if (this.length) {
    b = this[0];
    if ("value" === a && "SELECT" === b.nodeName) {
      if (b.multiple) {
        b = b.options;
        a = 0;
        c = b.length;
        for (d = []; a < c; ++a)
          b[a].selected && d.push(b[a].value || b[a].innerHTML);
        return d;
      }
      if ((a = b.value)) return a;
      b = b.options[b.selectedIndex];
      return b.value || b.innerHTML;
    }
    return b[rocket.Elements.get_attribute_map_[a] || a];
  }
};
rocket.Elements.get_attribute_map_ = {
  cellspacing: "cellSpacing",
  cellpadding: "cellPadding",
  valign: "vAlign",
  for: "htmlFor",
  maxlength: "maxLength",
  rowspan: "rowSpan",
  colspan: "colSpan",
  tabindex: "tabIndex",
  cellindex: "cellIndex",
  rowindex: "rowIndex",
  sectionrowindex: "sectionRowIndex",
  scrollleft: "scrollLeft",
  scrolltop: "scrollTop",
  clientwidth: "clientWidth",
  clientheight: "clientHeight",
  offsetwidth: "offsetWidth",
  offsetheight: "offsetHeight",
  frameborder: "frameBorder",
};
rocket.Elements.prototype.getBoundingClientRect = function () {
  if (this.length) {
    var a = this[0].getBoundingClientRect(),
      b = document.documentElement,
      c = document.body,
      d =
        (window.pageYOffset || (b && b.scrollTop) || (c && c.scrollTop) || 0) -
        ((b && b.clientTop) || (c && c.clientTop) || 0),
      b =
        (window.pageXOffset ||
          (b && b.scrollLeft) ||
          (c && c.scrollLeft) ||
          0) - ((b && b.clientLeft) || (c && c.clientLeft) || 0);
    return {
      top: a.top + d,
      right: a.right + b,
      bottom: a.bottom + d,
      left: a.left + b,
      width: a.width || a.right - a.left,
      height: a.height || a.bottom - a.top,
    };
  }
  return {
    top: NaN,
    right: NaN,
    bottom: NaN,
    left: NaN,
    width: NaN,
    height: NaN,
  };
};
rocket.Elements.prototype.hasClass = function (a) {
  for (
    var a = rocket.arrayify(a),
      b = [],
      c,
      d = 0,
      e = this.length,
      f,
      g = a.length;
    d < e;
    ++d
  ) {
    c = this[d].className;
    for (f = 0; f < g; ++f)
      if (
        (b[f] || (b[f] = RegExp("(?:\\s|^)" + a[f] + "(?:\\s|$)")),
        b[f].test(c))
      )
        return !0;
  }
  return !1;
};
rocket.Elements.prototype.hide = function (a) {
  return a
    ? this.style({ visibility: "hidden" })
    : this.style({ display: "none" });
};
rocket.Elements.prototype.hoverClass = function (a) {
  return this.addEventListener("mouseenter.hoverClass", function () {
    new rocket.Elements([this]).addClass(a);
  }).addEventListener("mouseleave.hoverClass", function () {
    new rocket.Elements([this]).removeClass(a);
  });
};
rocket.Elements.prototype.indexOf = function (a, b) {
  return rocket.indexOf(this, a.nodeType ? a : a[0], b);
};
rocket.Elements.prototype.innerHTML = function (a) {
  return void 0 === a
    ? this.getAttribute("innerHTML")
    : this.setAttribute("innerHTML", a);
};
rocket.Elements.prototype.insertBefore = function (a, b) {
  var c, d, e, f;
  if (this.length) {
    f = a.nodeType ? [a] : a;
    e = b ? (b.nodeType ? b : b[0]) : null;
    c = 0;
    for (d = f.length; c < d; ++c) this[0].insertBefore(f[c], e || null);
  } else f = [];
  return new rocket.Elements(f);
};
rocket.Elements.prototype.lastElementChild = function () {
  if (0 === this.length) return new rocket.Elements([]);
  rocket.Elements.prototype.lastElementChild =
    void 0 !== this[0].lastElementChild
      ? function () {
          for (var a = 0, b = this.length, c = [], d; a < b; ++a)
            (d = this[a].lastElementChild) && c.push(d);
          return new rocket.Elements(c);
        }
      : function () {
          for (var a = 0, b = this.length, c = [], d; a < b; ++a) {
            for (d = this[a].lastChild; d && 1 !== d.nodeType; )
              d = d.previousSibling;
            d && c.push(d);
          }
          return new rocket.Elements(c);
        };
  return this.lastElementChild();
};
rocket.Elements.prototype.lastIndexOf = function (a, b) {
  return rocket.lastIndexOf(this, a.nodeType ? a : a[0], b);
};
rocket.Elements.prototype.live = function (a, b, c) {
  return this.addEventListener(b, function (b) {
    for (var e = b.target; e && e !== this; )
      rocket.matchesSelector(e, a) && c.call(e, b), (e = e.parentNode);
  });
};
rocket.Elements.prototype.load = function (a, b) {
  var c = 0,
    d = this.length,
    e = this;
  rocket.get(
    a,
    function () {
      for (; c < d; ++c) e[c].innerHTML = this.responseText;
    },
    b,
  );
  return this;
};
rocket.Elements.prototype.map = function (a, b) {
  rocket.Elements.prototype.map = Array.prototype.map
    ? Array.prototype.map
    : function (a, b) {
        return rocket.map(this, a, b);
      };
  return this.map(a, b);
};
rocket.Elements.prototype.nextElementSibling = function () {
  if (0 === this.length) return new rocket.Elements([]);
  rocket.Elements.prototype.nextElementSibling =
    void 0 !== this[0].nextElementSibling
      ? function () {
          for (var a = 0, b = this.length, c = [], d; a < b; ++a)
            (d = this[a].nextElementSibling) && c.push(d);
          return new rocket.Elements(c);
        }
      : function () {
          for (var a = 0, b = this.length, c = [], d; a < b; ++a) {
            for (d = this[a].nextSibling; d && 1 !== d.nodeType; )
              d = d.nextSibling;
            d && c.push(d);
          }
          return new rocket.Elements(c);
        };
  return this.nextElementSibling();
};
rocket.Elements.prototype.parentNode = function () {
  for (var a = 0, b = this.length, c = []; a < b; ++a)
    c.push(this[a].parentNode);
  return new rocket.Elements(c);
};
rocket.Elements.prototype.preventSelect = function () {
  return this.addEventListener(
    ["selectstart.preventSelect", "mousedown.preventSelect"],
    function (a) {
      a.preventDefault();
    },
  );
};
rocket.Elements.prototype.previousElementSibling = function () {
  if (0 === this.length) return new rocket.Elements([]);
  rocket.Elements.prototype.previousElementSibling =
    void 0 !== this[0].previousElementSibling
      ? function () {
          for (var a = 0, b = this.length, c = [], d; a < b; ++a)
            (d = this[a].previousElementSibling) && c.push(d);
          return new rocket.Elements(c);
        }
      : function () {
          for (var a = 0, b = this.length, c = [], d; a < b; ++a) {
            for (d = this[a].previousSibling; d && 1 !== d.nodeType; )
              d = d.previousSibling;
            d && c.push(d);
          }
          return new rocket.Elements(c);
        };
  return this.previousElementSibling();
};
rocket.Elements.prototype.reduce = function (a, b) {
  rocket.Elements.prototype.reduce = Array.prototype.reduce
    ? Array.prototype.reduce
    : function (a, b) {
        return 2 === arguments.length
          ? rocket.reduce(this, a, b)
          : rocket.reduce(this, a);
      };
  return 2 === arguments.length ? this.reduce(a, b) : this.reduce(a);
};
rocket.Elements.prototype.reduceRight = function (a, b) {
  rocket.Elements.prototype.reduceRight = Array.prototype.reduceRight
    ? Array.prototype.reduceRight
    : function (a, b) {
        return 2 === arguments.length
          ? rocket.reduceRight(this, a, b)
          : rocket.reduceRight(this, a);
      };
  return 2 === arguments.length ? this.reduceRight(a, b) : this.reduceRight(a);
};
rocket.Elements.prototype.removeChild = function (a) {
  var b, c;
  if (this.length) {
    c = a.nodeType ? [a] : a;
    a = 0;
    for (b = c.length; a < b; ++a) this[0].removeChild(c[a]);
  } else c = [];
  return new rocket.Elements(c);
};
rocket.Elements.prototype.removeClass = function (a) {
  for (
    var a = rocket.arrayify(a),
      b = {},
      c = 0,
      d = this.length,
      e,
      f = a.length,
      g,
      h,
      i,
      j,
      l = a.join(" ");
    c < d;
    ++c
  )
    if (((g = this[c]), (h = g.className), void 0 !== b[h])) g.className = b[h];
    else {
      if ("" === h || h === l) i = [];
      else {
        i = rocket.arrayify(h);
        for (e = 0; e < f; ++e)
          (j = rocket.indexOf(i, a[e])), -1 !== j && i.splice(j, 1);
      }
      g.className = b[h] = i.join(" ");
    }
  return this;
};
rocket.Elements.prototype.removeEventListener = function (a, b) {
  var c,
    d = 0,
    e = this.length,
    f,
    g;
  if (a) {
    c = rocket.arrayify(a);
    for (g = c.length; d < e; ++d)
      for (f = 0; f < g; ++f) rocket.removeEventListener(this[d], c[f], b);
  } else for (; d < e; ++d) rocket.removeEventListener(this[d]);
  return this;
};
rocket.Elements.prototype.replaceChild = function (a, b) {
  var c, d;
  return this.length
    ? ((c = a.nodeType ? a : a[0]),
      (d = b.nodeType ? b : b[0]),
      this[0].replaceChild(c, d),
      new rocket.Elements([d]))
    : new rocket.Elements([]);
};
rocket.Elements.prototype.scrollIntoView = function (a) {
  this.length && this[0].scrollIntoView(!a);
  return this;
};
rocket.Elements.prototype.selected = function (a) {
  return 0 === arguments.length
    ? this.getAttribute("selected")
    : this.setAttribute("selected", a);
};
rocket.Elements.prototype.selectionStart = function () {
  return this.length
    ? ((rocket.Elements.prototype.selectionStart =
        void 0 !== this[0].selectionStart
          ? function () {
              return this.length ? this[0].selectionStart : -1;
            }
          : function () {
              if (this.length) {
                var a = document.selection.createRange();
                return Math.abs(
                  a.moveStart("character", -this[0].value.length),
                );
              }
              return -1;
            }),
      this.selectionStart())
    : -1;
};
rocket.Elements.prototype.selectionEnd = function () {
  return this.length
    ? ((rocket.Elements.prototype.selectionEnd =
        void 0 !== this[0].selectionEnd
          ? function () {
              return this.length ? this[0].selectionEnd : -1;
            }
          : function () {
              if (this.length) {
                var a = document.selection.createRange(),
                  b = this[0].value.length;
                return b - a.moveEnd("character", b);
              }
              return -1;
            }),
      this.selectionEnd())
    : -1;
};
rocket.Elements.prototype.setSelectionRange = function (a, b) {
  return this.length
    ? ((rocket.Elements.prototype.setSelectionRange = this[0].setSelectionRange
        ? function (a, b) {
            this.length && (this[0].setSelectionRange(a, b), this[0].focus());
            return this;
          }
        : function (a, b) {
            var e;
            this.length &&
              ((e = this[0].createTextRange()),
              e.moveStart("character", a),
              e.moveEnd("character", b - this[0].value.length),
              e.select());
            return this;
          }),
      this.setSelectionRange(a, b))
    : this;
};
rocket.Elements.prototype.toggleClass = function (a) {
  for (
    var a = rocket.arrayify(a),
      b = {},
      c = 0,
      d = this.length,
      e,
      f = a.length,
      g,
      h,
      i,
      j,
      l = a.join(" ");
    c < d;
    ++c
  )
    if (((g = this[c]), (h = g.className), void 0 !== b[h])) g.className = b[h];
    else {
      if ("" === h) i = a;
      else if (h === l) i = [];
      else {
        i = rocket.arrayify(h);
        for (e = 0; e < f; ++e)
          (j = rocket.indexOf(i, a[e])),
            -1 === j ? i.push(a[e]) : i.splice(j, 1);
      }
      g.className = b[h] = i.join(" ");
    }
  return this;
};
rocket.Elements.prototype.setAttribute = function (a, b) {
  var c;
  1 === arguments.length ? (c = a) : ((c = {}), (c[a] = b));
  for (var d = 0, e = this.length, f, g, h, i, j, l, n, m; d < e; ++d)
    for (var k in c)
      if ("value" === k && "SELECT" === this[d].nodeName)
        if (
          ((j = this[d].options), (f = 0), (g = j.length), this[d].multiple)
        ) {
          n = rocket.isArray(c[k]) ? c[k] : [c[k]];
          for (i = n.length; f < g; ++f) {
            j[f].selected = m = !1;
            for (h = 0; h < i && !1 === m; ++h)
              if (((l = n[h] + ""), j[f].value === l || j[f].innerHTML === l))
                j[f].selected = m = !0;
          }
        } else {
          for (h = -1; f < g && -1 === h; ++f)
            j[f].value === c[k] + "" && (h = f);
          if (-1 === h)
            for (f = 0; f < g && -1 === h; ++f)
              j[f].innerHTML === c[k] + "" && (h = f);
          -1 !== h && (this[d].selectedIndex = h);
        }
      else this[d][rocket.Elements.set_attribute_map_[k] || k] = c[k];
  return this;
};
rocket.Elements.set_attribute_map_ = {
  cellspacing: "cellSpacing",
  cellpadding: "cellPadding",
  valign: "vAlign",
  for: "htmlFor",
  maxlength: "maxLength",
  rowspan: "rowSpan",
  colspan: "colSpan",
  tabindex: "tabIndex",
  cellindex: "cellIndex",
  rowindex: "rowIndex",
  sectionrowindex: "sectionRowIndex",
  scrollleft: "scrollLeft",
  scrolltop: "scrollTop",
  clientwidth: "clientWidth",
  clientheight: "clientHeight",
  offsetwidth: "offsetWidth",
  offsetheight: "offsetHeight",
  frameborder: "frameBorder",
};
rocket.Elements.prototype.show = function (a) {
  return a ? this.style({ visibility: "" }) : this.style({ display: "" });
};
rocket.Elements.prototype.slice = function (a, b) {
  return new rocket.Elements(Array.prototype.slice.apply(this, arguments));
};
rocket.Elements.prototype.some = function (a, b) {
  rocket.Elements.prototype.some = Array.prototype.some
    ? Array.prototype.some
    : function (a, b) {
        return rocket.some(this, a, b);
      };
  return this.some(a, b);
};
rocket.Elements.prototype.splice = function (a, b, c) {
  return new rocket.Elements(Array.prototype.splice.apply(this, arguments));
};
rocket.Elements.prototype.style = function (a, b) {
  var c;
  if (1 === arguments.length) {
    if ("string" === typeof a) return this.style_get_(a);
    c = a;
  } else (c = {}), (c[a] = b);
  this.style_set_(c);
  return this;
};
rocket.Elements.style_opacity_get_ = function (a, b) {
  rocket.Elements.style_opacity_get_ =
    void 0 === a.style.opacity
      ? function (a) {
          return (a = a.style.filter)
            ? (a = /opacity=(\d+)/.exec(a))
              ? a[1] / 100
              : 1
            : 1;
        }
      : function (a) {
          return (
            parseFloat(a.style.opacity) || ("" === a.style.opacity && 1) || 0
          );
        };
  return rocket.Elements.style_opacity_get_(a, b);
};
rocket.Elements.style_opacity_set_ = function (a, b, c) {
  rocket.Elements.style_opacity_set_ =
    void 0 === a.style.opacity
      ? function (a, b) {
          var c = a.style,
            g = c.filter,
            h;
          1 === b
            ? "" !== g &&
              /^alpha\(opacity=\d+\)$/.test(g) &&
              c.removeAttribute("filter")
            : (c.zoom || (c.zoom = 1),
              (h = "alpha(opacity=" + 100 * b + ")"),
              (c.filter = g ? g.replace(/\alpha\([^)]+\)/, h) : h));
        }
      : function (a, b) {
          a.style.opacity = b;
        };
  rocket.Elements.style_opacity_set_(a, b, c);
};
rocket.Elements.style_float_get_ = function (a) {
  a = a.style;
  return a.cssFloat || a.styleFloat || "";
};
rocket.Elements.style_float_set_ = function (a, b) {
  var c = a.style;
  c.cssFloat = b;
  c.styleFloat = b;
};
rocket.Elements.style_px_property_set_ = function (a, b, c) {
  a.style[c] = b + ("number" === typeof b ? "px" : "");
};
rocket.Elements.style_px_property_get_ = function (a, b) {
  var c = a.style[b];
  return "px" === c.substr(c.length - 2) ? parseFloat(c) || 0 : c;
};
rocket.Elements.style_transformers_ = {
  float: {
    get: rocket.Elements.style_float_get_,
    set: rocket.Elements.style_float_set_,
  },
  opacity: {
    get: rocket.Elements.style_opacity_get_,
    set: rocket.Elements.style_opacity_set_,
  },
  lineHeight: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  fontSize: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  left: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  top: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  right: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  bottom: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  width: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  height: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  padding: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  paddingLeft: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  paddingTop: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  paddingRight: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  paddingBottom: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  margin: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  marginLeft: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  marginTop: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  marginRight: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
  marginBottom: {
    set: rocket.Elements.style_px_property_set_,
    get: rocket.Elements.style_px_property_get_,
  },
};
rocket.Elements.prototype.style_get_ = function (a) {
  var a = this.style_camel_case_(a),
    b;
  if (this.length)
    return (b = rocket.Elements.style_transformers_[a])
      ? b.get(this[0], a)
      : this[0].style[a];
};
rocket.Elements.prototype.style_set_ = function (a) {
  for (var b = 0, c = this.length, d, e, f, g; b < c; ++b)
    for (d in ((e = this[b].style), a))
      (f = this.style_camel_case_(d)),
        (g = rocket.Elements.style_transformers_[f])
          ? g.set(this[b], a[d], f)
          : (e[f] = a[d]);
};
rocket.Elements.prototype.style_camel_case_ = function (a) {
  var b, c;
  if (-1 === a.indexOf("-")) return a;
  a = a.split("-");
  b = a.length;
  for (c = 1; c < b; ++c) a[c] = a[c].charAt(0).toUpperCase() + a[c].substr(1);
  return a.join("");
};
rocket.Elements.prototype.submit = function () {
  this.length && this[0].submit();
  return this;
};
rocket.Elements.prototype.value = function (a) {
  return 0 === arguments.length
    ? this.getAttribute("value")
    : this.setAttribute("value", a);
};
