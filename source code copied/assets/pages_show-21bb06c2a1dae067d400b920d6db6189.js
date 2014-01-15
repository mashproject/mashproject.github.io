(function() {
window.Bobcat = window.$B = window.Bobcat || {}, window.console || (window.console = {
log:function() {
return {};
},
error:function() {
return {};
},
warn:function() {
return {};
}
});
}).call(this), function(t, e) {
t.rails !== e && t.error("jquery-ujs has already been loaded!");
var n;
t.rails = n = {
linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
buttonClickSelector:"button[data-remote]",
inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",
formSubmitSelector:"form",
formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
fileInputSelector:"input[type=file]",
linkDisableSelector:"a[data-disable-with]",
CSRFProtection:function(e) {
var n = t('meta[name="csrf-token"]').attr("content");
n && e.setRequestHeader("X-CSRF-Token", n);
},
fire:function(e, n, i) {
var r = t.Event(n);
return e.trigger(r, i), r.result !== !1;
},
confirm:function(t) {
return confirm(t);
},
ajax:function(e) {
return t.ajax(e);
},
href:function(t) {
return t.attr("href");
},
handleRemote:function(i) {
var r, o, a, s, l, c, u, d;
if (n.fire(i, "ajax:before")) {
if (s = i.data("cross-domain"), l = s === e ? null :s, c = i.data("with-credentials") || null, 
u = i.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, i.is("form")) {
r = i.attr("method"), o = i.attr("action"), a = i.serializeArray();
var p = i.data("ujs:submit-button");
p && (a.push(p), i.data("ujs:submit-button", null));
} else i.is(n.inputChangeSelector) ? (r = i.data("method"), o = i.data("url"), a = i.serialize(), 
i.data("params") && (a = a + "&" + i.data("params"))) :i.is(n.buttonClickSelector) ? (r = i.data("method") || "get", 
o = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) :(r = i.data("method"), 
o = n.href(i), a = i.data("params") || null);
d = {
type:r || "GET",
data:a,
dataType:u,
beforeSend:function(t, r) {
return r.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), 
n.fire(i, "ajax:beforeSend", [ t, r ]);
},
success:function(t, e, n) {
i.trigger("ajax:success", [ t, e, n ]);
},
complete:function(t, e) {
i.trigger("ajax:complete", [ t, e ]);
},
error:function(t, e, n) {
i.trigger("ajax:error", [ t, e, n ]);
},
crossDomain:l
}, c && (d.xhrFields = {
withCredentials:c
}), o && (d.url = o);
var h = n.ajax(d);
return i.trigger("ajax:send", h), h;
}
return !1;
},
handleMethod:function(i) {
var r = n.href(i), o = i.data("method"), a = i.attr("target"), s = t("meta[name=csrf-token]").attr("content"), l = t("meta[name=csrf-param]").attr("content"), c = t('<form method="post" action="' + r + '"></form>'), u = '<input name="_method" value="' + o + '" type="hidden" />';
l !== e && s !== e && (u += '<input name="' + l + '" value="' + s + '" type="hidden" />'), 
a && c.attr("target", a), c.hide().append(u).appendTo("body"), c.submit();
},
disableFormElements:function(e) {
e.find(n.disableSelector).each(function() {
var e = t(this), n = e.is("button") ? "html" :"val";
e.data("ujs:enable-with", e[n]()), e[n](e.data("disable-with")), e.prop("disabled", !0);
});
},
enableFormElements:function(e) {
e.find(n.enableSelector).each(function() {
var e = t(this), n = e.is("button") ? "html" :"val";
e.data("ujs:enable-with") && e[n](e.data("ujs:enable-with")), e.prop("disabled", !1);
});
},
allowAction:function(t) {
var e, i = t.data("confirm"), r = !1;
return i ? (n.fire(t, "confirm") && (r = n.confirm(i), e = n.fire(t, "confirm:complete", [ r ])), 
r && e) :!0;
},
blankInputs:function(e, n, i) {
var r, o, a = t(), s = n || "input,textarea", l = e.find(s);
return l.each(function() {
if (r = t(this), o = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") :r.val(), 
!o == !i) {
if (r.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + r.attr("name") + '"]').length) return !0;
a = a.add(r);
}
}), a.length ? a :!1;
},
nonBlankInputs:function(t, e) {
return n.blankInputs(t, e, !0);
},
stopEverything:function(e) {
return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), 
!1;
},
disableElement:function(t) {
t.data("ujs:enable-with", t.html()), t.html(t.data("disable-with")), t.bind("click.railsDisable", function(t) {
return n.stopEverything(t);
});
},
enableElement:function(t) {
t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), 
t.unbind("click.railsDisable");
}
}, n.fire(t(document), "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, i) {
t.crossDomain || n.CSRFProtection(i);
}), t(document).delegate(n.linkDisableSelector, "ajax:complete", function() {
n.enableElement(t(this));
}), t(document).delegate(n.linkClickSelector, "click.rails", function(i) {
var r = t(this), o = r.data("method"), a = r.data("params");
if (!n.allowAction(r)) return n.stopEverything(i);
if (r.is(n.linkDisableSelector) && n.disableElement(r), r.data("remote") !== e) {
if (!(!i.metaKey && !i.ctrlKey || o && "GET" !== o || a)) return !0;
var s = n.handleRemote(r);
return s === !1 ? n.enableElement(r) :s.error(function() {
n.enableElement(r);
}), !1;
}
return r.data("method") ? (n.handleMethod(r), !1) :void 0;
}), t(document).delegate(n.buttonClickSelector, "click.rails", function(e) {
var i = t(this);
return n.allowAction(i) ? (n.handleRemote(i), !1) :n.stopEverything(e);
}), t(document).delegate(n.inputChangeSelector, "change.rails", function(e) {
var i = t(this);
return n.allowAction(i) ? (n.handleRemote(i), !1) :n.stopEverything(e);
}), t(document).delegate(n.formSubmitSelector, "submit.rails", function(i) {
var r = t(this), o = r.data("remote") !== e, a = n.blankInputs(r, n.requiredInputSelector), s = n.nonBlankInputs(r, n.fileInputSelector);
if (!n.allowAction(r)) return n.stopEverything(i);
if (a && r.attr("novalidate") == e && n.fire(r, "ajax:aborted:required", [ a ])) return n.stopEverything(i);
if (o) {
if (s) {
setTimeout(function() {
n.disableFormElements(r);
}, 13);
var l = n.fire(r, "ajax:aborted:file", [ s ]);
return l || setTimeout(function() {
n.enableFormElements(r);
}, 13), l;
}
return n.handleRemote(r), !1;
}
setTimeout(function() {
n.disableFormElements(r);
}, 13);
}), t(document).delegate(n.formInputClickSelector, "click.rails", function(e) {
var i = t(this);
if (!n.allowAction(i)) return n.stopEverything(e);
var r = i.attr("name"), o = r ? {
name:r,
value:i.val()
} :null;
i.closest("form").data("ujs:submit-button", o);
}), t(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails", function(e) {
this == e.target && n.disableFormElements(t(this));
}), t(document).delegate(n.formSubmitSelector, "ajax:complete.rails", function(e) {
this == e.target && n.enableFormElements(t(this));
}), t(function() {
var e = t("meta[name=csrf-token]").attr("content"), n = t("meta[name=csrf-param]").attr("content");
t('form input[name="' + n + '"]').val(e);
}));
}(jQuery), function() {
var t, e;
jQuery.uaMatch = function(t) {
t = t.toLowerCase();
var e = /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
return {
browser:e[1] || "",
version:e[2] || "0"
};
}, t = jQuery.uaMatch(navigator.userAgent), e = {}, t.browser && (e[t.browser] = !0, 
e.version = t.version), e.chrome ? e.webkit = !0 :e.webkit && (e.safari = !0), jQuery.browser = e, 
jQuery.sub = function() {
function t(e, n) {
return new t.fn.init(e, n);
}
jQuery.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, 
t.sub = this.sub, t.fn.init = function(n, i) {
return i && i instanceof jQuery && !(i instanceof t) && (i = t(i)), jQuery.fn.init.call(this, n, i, e);
}, t.fn.init.prototype = t.fn;
var e = t(document);
return t;
};
}(), function(t) {
function e(t) {
return "object" == typeof t ? t :{
top:t,
left:t
};
}
var n = t.scrollTo = function(e, n, i) {
t(window).scrollTo(e, n, i);
};
n.defaults = {
axis:"xy",
duration:parseFloat(t.fn.jquery) >= 1.3 ? 0 :1
}, n.window = function() {
return t(window)._scrollable();
}, t.fn._scrollable = function() {
return this.map(function() {
var e = this, n = !e.nodeName || -1 != t.inArray(e.nodeName.toLowerCase(), [ "iframe", "#document", "html", "body" ]);
if (!n) return e;
var i = (e.contentWindow || e).document || e.ownerDocument || e;
return t.browser.safari || "BackCompat" == i.compatMode ? i.body :i.documentElement;
});
}, t.fn.scrollTo = function(i, r, o) {
return "object" == typeof r && (o = r, r = 0), "function" == typeof o && (o = {
onAfter:o
}), "max" == i && (i = 9e9), o = t.extend({}, n.defaults, o), r = r || o.speed || o.duration, 
o.queue = o.queue && o.axis.length > 1, o.queue && (r /= 2), o.offset = e(o.offset), 
o.over = e(o.over), this._scrollable().each(function() {
function a(t) {
c.animate(d, r, o.easing, t && function() {
t.call(this, i, o);
});
}
var s, l = this, c = t(l), u = i, d = {}, p = c.is("html,body");
switch (typeof u) {
case "number":
case "string":
if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(u)) {
u = e(u);
break;
}
u = t(u, this);

case "object":
(u.is || u.style) && (s = (u = t(u)).offset());
}
t.each(o.axis.split(""), function(t, e) {
var i = "x" == e ? "Left" :"Top", r = i.toLowerCase(), h = "scroll" + i, f = l[h], m = n.max(l, e);
if (s) d[h] = s[r] + (p ? 0 :f - c.offset()[r]), o.margin && (d[h] -= parseInt(u.css("margin" + i)) || 0, 
d[h] -= parseInt(u.css("border" + i + "Width")) || 0), d[h] += o.offset[r] || 0, 
o.over[r] && (d[h] += u["x" == e ? "width" :"height"]() * o.over[r]); else {
var g = u[r];
d[h] = g.slice && "%" == g.slice(-1) ? parseFloat(g) / 100 * m :g;
}
/^\d+$/.test(d[h]) && (d[h] = d[h] <= 0 ? 0 :Math.min(d[h], m)), !t && o.queue && (f != d[h] && a(o.onAfterFirst), 
delete d[h]);
}), a(o.onAfter);
}).end();
}, n.max = function(e, n) {
var i = "x" == n ? "Width" :"Height", r = "scroll" + i;
if (!t(e).is("html,body")) return e[r] - t(e)[i.toLowerCase()]();
var o = "client" + i, a = e.ownerDocument.documentElement, s = e.ownerDocument.body;
return Math.max(a[r], s[r]) - Math.min(a[o], s[o]);
};
}(jQuery), /*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
def:"easeOutQuad",
swing:function(t, e, n, i, r) {
return (e /= r / 2) < 1 ? i / 2 * e * e + n :-i / 2 * (--e * (e - 2) - 1) + n;
},
easeInQuad:function(t, e, n, i, r) {
return i * (e /= r) * e + n;
},
easeOutQuad:function(t, e, n, i, r) {
return -i * (e /= r) * (e - 2) + n;
},
easeInOutQuad:function(t, e, n, i, r) {
return (e /= r / 2) < 1 ? i / 2 * e * e + n :-i / 2 * (--e * (e - 2) - 1) + n;
},
easeInCubic:function(t, e, n, i, r) {
return i * (e /= r) * e * e + n;
},
easeOutCubic:function(t, e, n, i, r) {
return i * ((e = e / r - 1) * e * e + 1) + n;
},
easeInOutCubic:function(t, e, n, i, r) {
return (e /= r / 2) < 1 ? i / 2 * e * e * e + n :i / 2 * ((e -= 2) * e * e + 2) + n;
},
easeInQuart:function(t, e, n, i, r) {
return i * (e /= r) * e * e * e + n;
},
easeOutQuart:function(t, e, n, i, r) {
return -i * ((e = e / r - 1) * e * e * e - 1) + n;
},
easeInOutQuart:function(t, e, n, i, r) {
return (e /= r / 2) < 1 ? i / 2 * e * e * e * e + n :-i / 2 * ((e -= 2) * e * e * e - 2) + n;
},
easeInQuint:function(t, e, n, i, r) {
return i * (e /= r) * e * e * e * e + n;
},
easeOutQuint:function(t, e, n, i, r) {
return i * ((e = e / r - 1) * e * e * e * e + 1) + n;
},
easeInOutQuint:function(t, e, n, i, r) {
return (e /= r / 2) < 1 ? i / 2 * e * e * e * e * e + n :i / 2 * ((e -= 2) * e * e * e * e + 2) + n;
},
easeInSine:function(t, e, n, i, r) {
return -i * Math.cos(e / r * (Math.PI / 2)) + i + n;
},
easeOutSine:function(t, e, n, i, r) {
return i * Math.sin(e / r * (Math.PI / 2)) + n;
},
easeInOutSine:function(t, e, n, i, r) {
return -i / 2 * (Math.cos(Math.PI * e / r) - 1) + n;
},
easeInExpo:function(t, e, n, i, r) {
return 0 == e ? n :i * Math.pow(2, 10 * (e / r - 1)) + n;
},
easeOutExpo:function(t, e, n, i, r) {
return e == r ? n + i :i * (-Math.pow(2, -10 * e / r) + 1) + n;
},
easeInOutExpo:function(t, e, n, i, r) {
return 0 == e ? n :e == r ? n + i :(e /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (e - 1)) + n :i / 2 * (-Math.pow(2, -10 * --e) + 2) + n;
},
easeInCirc:function(t, e, n, i, r) {
return -i * (Math.sqrt(1 - (e /= r) * e) - 1) + n;
},
easeOutCirc:function(t, e, n, i, r) {
return i * Math.sqrt(1 - (e = e / r - 1) * e) + n;
},
easeInOutCirc:function(t, e, n, i, r) {
return (e /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - e * e) - 1) + n :i / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + n;
},
easeInElastic:function(t, e, n, i, r) {
var o = 1.70158, a = 0, s = i;
if (0 == e) return n;
if (1 == (e /= r)) return n + i;
if (a || (a = .3 * r), s < Math.abs(i)) {
s = i;
var o = a / 4;
} else var o = a / (2 * Math.PI) * Math.asin(i / s);
return -(s * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * r - o) * Math.PI / a)) + n;
},
easeOutElastic:function(t, e, n, i, r) {
var o = 1.70158, a = 0, s = i;
if (0 == e) return n;
if (1 == (e /= r)) return n + i;
if (a || (a = .3 * r), s < Math.abs(i)) {
s = i;
var o = a / 4;
} else var o = a / (2 * Math.PI) * Math.asin(i / s);
return s * Math.pow(2, -10 * e) * Math.sin(2 * (e * r - o) * Math.PI / a) + i + n;
},
easeInOutElastic:function(t, e, n, i, r) {
var o = 1.70158, a = 0, s = i;
if (0 == e) return n;
if (2 == (e /= r / 2)) return n + i;
if (a || (a = .3 * r * 1.5), s < Math.abs(i)) {
s = i;
var o = a / 4;
} else var o = a / (2 * Math.PI) * Math.asin(i / s);
return 1 > e ? -.5 * s * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * r - o) * Math.PI / a) + n :s * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e * r - o) * Math.PI / a) * .5 + i + n;
},
easeInBack:function(t, e, n, i, r, o) {
return void 0 == o && (o = 1.70158), i * (e /= r) * e * ((o + 1) * e - o) + n;
},
easeOutBack:function(t, e, n, i, r, o) {
return void 0 == o && (o = 1.70158), i * ((e = e / r - 1) * e * ((o + 1) * e + o) + 1) + n;
},
easeInOutBack:function(t, e, n, i, r, o) {
return void 0 == o && (o = 1.70158), (e /= r / 2) < 1 ? i / 2 * e * e * (((o *= 1.525) + 1) * e - o) + n :i / 2 * ((e -= 2) * e * (((o *= 1.525) + 1) * e + o) + 2) + n;
},
easeInBounce:function(t, e, n, i, r) {
return i - jQuery.easing.easeOutBounce(t, r - e, 0, i, r) + n;
},
easeOutBounce:function(t, e, n, i, r) {
return (e /= r) < 1 / 2.75 ? 7.5625 * i * e * e + n :2 / 2.75 > e ? i * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + n :2.5 / 2.75 > e ? i * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + n :i * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + n;
},
easeInOutBounce:function(t, e, n, i, r) {
return r / 2 > e ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, i, r) + n :.5 * jQuery.easing.easeOutBounce(t, 2 * e - r, 0, i, r) + .5 * i + n;
}
}), /*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
function() {
var t = [].indexOf || function(t) {
for (var e = 0, n = this.length; n > e; e++) if (e in this && this[e] === t) return e;
return -1;
}, e = [].slice;
!function(t, e) {
return "function" == typeof define && define.amd ? define("waypoints", [ "jquery" ], function(n) {
return e(n, t);
}) :e(t.jQuery, t);
}(this, function(n, i) {
var r, o, a, s, l, c, u, d, p, h, f, m, g, v, y, b;
return r = n(i), d = t.call(i, "ontouchstart") >= 0, s = {
horizontal:{},
vertical:{}
}, l = 1, u = {}, c = "waypoints-context-id", f = "resize.waypoints", m = "scroll.waypoints", 
g = 1, v = "waypoints-waypoint-ids", y = "waypoint", b = "waypoints", o = function() {
function t(t) {
var e = this;
this.$element = t, this.element = t[0], this.didResize = !1, this.didScroll = !1, 
this.id = "context" + l++, this.oldScroll = {
x:t.scrollLeft(),
y:t.scrollTop()
}, this.waypoints = {
horizontal:{},
vertical:{}
}, t.data(c, this.id), u[this.id] = this, t.bind(m, function() {
var t;
return e.didScroll || d ? void 0 :(e.didScroll = !0, t = function() {
return e.doScroll(), e.didScroll = !1;
}, i.setTimeout(t, n[b].settings.scrollThrottle));
}), t.bind(f, function() {
var t;
return e.didResize ? void 0 :(e.didResize = !0, t = function() {
return n[b]("refresh"), e.didResize = !1;
}, i.setTimeout(t, n[b].settings.resizeThrottle));
});
}
return t.prototype.doScroll = function() {
var t, e = this;
return t = {
horizontal:{
newScroll:this.$element.scrollLeft(),
oldScroll:this.oldScroll.x,
forward:"right",
backward:"left"
},
vertical:{
newScroll:this.$element.scrollTop(),
oldScroll:this.oldScroll.y,
forward:"down",
backward:"up"
}
}, !d || t.vertical.oldScroll && t.vertical.newScroll || n[b]("refresh"), n.each(t, function(t, i) {
var r, o, a;
return a = [], o = i.newScroll > i.oldScroll, r = o ? i.forward :i.backward, n.each(e.waypoints[t], function(t, e) {
var n, r;
return i.oldScroll < (n = e.offset) && n <= i.newScroll ? a.push(e) :i.newScroll < (r = e.offset) && r <= i.oldScroll ? a.push(e) :void 0;
}), a.sort(function(t, e) {
return t.offset - e.offset;
}), o || a.reverse(), n.each(a, function(t, e) {
return e.options.continuous || t === a.length - 1 ? e.trigger([ r ]) :void 0;
});
}), this.oldScroll = {
x:t.horizontal.newScroll,
y:t.vertical.newScroll
};
}, t.prototype.refresh = function() {
var t, e, i, r = this;
return i = n.isWindow(this.element), e = this.$element.offset(), this.doScroll(), 
t = {
horizontal:{
contextOffset:i ? 0 :e.left,
contextScroll:i ? 0 :this.oldScroll.x,
contextDimension:this.$element.width(),
oldScroll:this.oldScroll.x,
forward:"right",
backward:"left",
offsetProp:"left"
},
vertical:{
contextOffset:i ? 0 :e.top,
contextScroll:i ? 0 :this.oldScroll.y,
contextDimension:i ? n[b]("viewportHeight") :this.$element.height(),
oldScroll:this.oldScroll.y,
forward:"down",
backward:"up",
offsetProp:"top"
}
}, n.each(t, function(t, e) {
return n.each(r.waypoints[t], function(t, i) {
var r, o, a, s, l;
return r = i.options.offset, a = i.offset, o = n.isWindow(i.element) ? 0 :i.$element.offset()[e.offsetProp], 
n.isFunction(r) ? r = r.apply(i.element) :"string" == typeof r && (r = parseFloat(r), 
i.options.offset.indexOf("%") > -1 && (r = Math.ceil(e.contextDimension * r / 100))), 
i.offset = o - e.contextOffset + e.contextScroll - r, i.options.onlyOnScroll && null != a || !i.enabled ? void 0 :null !== a && a < (s = e.oldScroll) && s <= i.offset ? i.trigger([ e.backward ]) :null !== a && a > (l = e.oldScroll) && l >= i.offset ? i.trigger([ e.forward ]) :null === a && e.oldScroll >= i.offset ? i.trigger([ e.forward ]) :void 0;
});
});
}, t.prototype.checkEmpty = function() {
return n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([ f, m ].join(" ")), 
delete u[this.id]) :void 0;
}, t;
}(), a = function() {
function t(t, e, i) {
var r, o;
i = n.extend({}, n.fn[y].defaults, i), "bottom-in-view" === i.offset && (i.offset = function() {
var t;
return t = n[b]("viewportHeight"), n.isWindow(e.element) || (t = e.$element.height()), 
t - n(this).outerHeight();
}), this.$element = t, this.element = t[0], this.axis = i.horizontal ? "horizontal" :"vertical", 
this.callback = i.handler, this.context = e, this.enabled = i.enabled, this.id = "waypoints" + g++, 
this.offset = null, this.options = i, e.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, 
r = null != (o = t.data(v)) ? o :[], r.push(this.id), t.data(v, r);
}
return t.prototype.trigger = function(t) {
return this.enabled ? (null != this.callback && this.callback.apply(this.element, t), 
this.options.triggerOnce ? this.destroy() :void 0) :void 0;
}, t.prototype.disable = function() {
return this.enabled = !1;
}, t.prototype.enable = function() {
return this.context.refresh(), this.enabled = !0;
}, t.prototype.destroy = function() {
return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], 
this.context.checkEmpty();
}, t.getWaypointsByElement = function(t) {
var e, i;
return (i = n(t).data(v)) ? (e = n.extend({}, s.horizontal, s.vertical), n.map(i, function(t) {
return e[t];
})) :[];
}, t;
}(), h = {
init:function(t, e) {
var i;
return null == e && (e = {}), null == (i = e.handler) && (e.handler = t), this.each(function() {
var t, i, r, s;
return t = n(this), r = null != (s = e.context) ? s :n.fn[y].defaults.context, n.isWindow(r) || (r = t.closest(r)), 
r = n(r), i = u[r.data(c)], i || (i = new o(r)), new a(t, i, e);
}), n[b]("refresh"), this;
},
disable:function() {
return h._invoke(this, "disable");
},
enable:function() {
return h._invoke(this, "enable");
},
destroy:function() {
return h._invoke(this, "destroy");
},
prev:function(t, e) {
return h._traverse.call(this, t, e, function(t, e, n) {
return e > 0 ? t.push(n[e - 1]) :void 0;
});
},
next:function(t, e) {
return h._traverse.call(this, t, e, function(t, e, n) {
return e < n.length - 1 ? t.push(n[e + 1]) :void 0;
});
},
_traverse:function(t, e, r) {
var o, a;
return null == t && (t = "vertical"), null == e && (e = i), a = p.aggregate(e), 
o = [], this.each(function() {
var e;
return e = n.inArray(this, a[t]), r(o, e, a[t]);
}), this.pushStack(o);
},
_invoke:function(t, e) {
return t.each(function() {
var t;
return t = a.getWaypointsByElement(this), n.each(t, function(t, n) {
return n[e](), !0;
});
}), this;
}
}, n.fn[y] = function() {
var t, i;
return i = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) :[], h[i] ? h[i].apply(this, t) :n.isFunction(i) ? h.init.apply(this, arguments) :n.isPlainObject(i) ? h.init.apply(this, [ null, i ]) :i ? n.error("The " + i + " method does not exist in jQuery Waypoints.") :n.error("jQuery Waypoints needs a callback function or handler option.");
}, n.fn[y].defaults = {
context:i,
continuous:!0,
enabled:!0,
horizontal:!1,
offset:0,
triggerOnce:!1
}, p = {
refresh:function() {
return n.each(u, function(t, e) {
return e.refresh();
});
},
viewportHeight:function() {
var t;
return null != (t = i.innerHeight) ? t :r.height();
},
aggregate:function(t) {
var e, i, r;
return e = s, t && (e = null != (r = u[n(t).data(c)]) ? r.waypoints :void 0), e ? (i = {
horizontal:[],
vertical:[]
}, n.each(i, function(t, r) {
return n.each(e[t], function(t, e) {
return r.push(e);
}), r.sort(function(t, e) {
return t.offset - e.offset;
}), i[t] = n.map(r, function(t) {
return t.element;
}), i[t] = n.unique(i[t]);
}), i) :[];
},
above:function(t) {
return null == t && (t = i), p._filter(t, "vertical", function(t, e) {
return e.offset <= t.oldScroll.y;
});
},
below:function(t) {
return null == t && (t = i), p._filter(t, "vertical", function(t, e) {
return e.offset > t.oldScroll.y;
});
},
left:function(t) {
return null == t && (t = i), p._filter(t, "horizontal", function(t, e) {
return e.offset <= t.oldScroll.x;
});
},
right:function(t) {
return null == t && (t = i), p._filter(t, "horizontal", function(t, e) {
return e.offset > t.oldScroll.x;
});
},
enable:function() {
return p._invoke("enable");
},
disable:function() {
return p._invoke("disable");
},
destroy:function() {
return p._invoke("destroy");
},
extendFn:function(t, e) {
return h[t] = e;
},
_invoke:function(t) {
var e;
return e = n.extend({}, s.vertical, s.horizontal), n.each(e, function(e, n) {
return n[t](), !0;
});
},
_filter:function(t, e, i) {
var r, o;
return (r = u[n(t).data(c)]) ? (o = [], n.each(r.waypoints[e], function(t, e) {
return i(r, e) ? o.push(e) :void 0;
}), o.sort(function(t, e) {
return t.offset - e.offset;
}), n.map(o, function(t) {
return t.element;
})) :[];
}
}, n[b] = function() {
var t, n;
return n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) :[], p[n] ? p[n].apply(null, t) :p.aggregate.call(null, n);
}, n[b].settings = {
resizeThrottle:100,
scrollThrottle:30
}, r.load(function() {
return n[b]("refresh");
});
});
}.call(this), /*!
 * jQuery Templates Plugin
 * http://github.com/jquery/jquery-tmpl
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
function(t) {
function e(e, n, i, r) {
var o = {
data:r || (n ? n.data :{}),
_wrap:n ? n._wrap :null,
tmpl:null,
parent:n || null,
nodes:[],
calls:c,
nest:u,
wrap:d,
html:p,
update:h
};
return e && t.extend(o, e, {
nodes:[],
parent:n
}), i && (o.tmpl = i, o._ctnt = o._ctnt || o.tmpl(t, o), o.key = ++_, (x.length ? b :y)[_] = o), 
o;
}
function n(e, r, o) {
var a, s = o ? t.map(o, function(t) {
return "string" == typeof t ? e.key ? t.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + g + '="' + e.key + '" $2') :t :n(t, e, t._ctnt);
}) :e;
return r ? s :(s = s.join(""), s.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(e, n, r, o) {
a = t(r).get(), l(a), n && (a = i(n).concat(a)), o && (a = a.concat(i(o)));
}), a ? a :i(s));
}
function i(e) {
var n = document.createElement("div");
return n.innerHTML = e, t.makeArray(n.childNodes);
}
function r(e) {
return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + t.trim(e).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(e, n, i, r, o, s, l) {
var c, u, d, p = t.tmpl.tag[i];
if (!p) throw "Template command not found: " + i;
return c = p._default || [], s && !/\w$/.test(o) && (o += s, s = ""), o ? (o = a(o), 
l = l ? "," + a(l) + ")" :s ? ")" :"", u = s ? o.indexOf(".") > -1 ? o + s :"(" + o + ").call($item" + l :o, 
d = s ? u :"(typeof(" + o + ")==='function'?(" + o + ").call($item):(" + o + "))") :d = u = c.$1 || "null", 
r = a(r), "');" + p[n ? "close" :"open"].split("$notnull_1").join(o ? "typeof(" + o + ")!=='undefined' && (" + o + ")!=null" :"true").split("$1a").join(d).split("$1").join(u).split("$2").join(r ? r.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function(t, e, n, i) {
return i = i ? "," + i + ")" :n ? ")" :"", i ? "(" + e + ").call($item" + i :t;
}) :c.$2 || "") + "_.push('";
}) + "');}return _;");
}
function o(e, i) {
e._wrap = n(e, !0, t.isArray(i) ? i :[ v.test(i) ? i :t(i).html() ]).join("");
}
function a(t) {
return t ? t.replace(/\\'/g, "'").replace(/\\\\/g, "\\") :null;
}
function s(t) {
var e = document.createElement("div");
return e.appendChild(t.cloneNode(!0)), e.innerHTML;
}
function l(n) {
function i(n) {
function i(t) {
t += c, a = u[t] = u[t] || e(a, y[a.parent.key + c] || a.parent, null, !0);
}
var r, o, a, s, l = n;
if (s = n.getAttribute(g)) {
for (;l.parentNode && 1 === (l = l.parentNode).nodeType && !(r = l.getAttribute(g)); ) ;
r !== s && (l = l.parentNode ? 11 === l.nodeType ? 0 :l.getAttribute(g) || 0 :0, 
(a = y[s]) || (a = b[s], a = e(a, y[l] || b[l], null, !0), a.key = ++_, y[_] = a), 
k && i(s)), n.removeAttribute(g);
} else k && (a = t.data(n, "tmplItem")) && (i(a.key), y[a.key] = a, l = t.data(n.parentNode, "tmplItem"), 
l = l ? l.key :0);
if (a) {
for (o = a; o && o.key != l; ) o.nodes.push(n), o = o.parent;
delete a._ctnt, delete a._wrap, t.data(n, "tmplItem", a);
}
}
var r, o, a, s, l, c = "_" + k, u = {};
for (a = 0, s = n.length; s > a; a++) if (1 === (r = n[a]).nodeType) {
for (o = r.getElementsByTagName("*"), l = o.length - 1; l >= 0; l--) i(o[l]);
i(r);
}
}
function c(t, e, n, i) {
return t ? (x.push({
_:t,
tmpl:e,
item:this,
data:n,
options:i
}), void 0) :x.pop();
}
function u(e, n, i) {
return t.tmpl(t.template(e), n, i, this);
}
function d(e, n) {
var i = e.options || {};
return i.wrapped = n, t.tmpl(t.template(e.tmpl), e.data, i, e.item);
}
function p(e, n) {
var i = this._wrap;
return t.map(t(t.isArray(i) ? i.join("") :i).filter(e || "*"), function(t) {
return n ? t.innerText || t.textContent :t.outerHTML || s(t);
});
}
function h() {
var e = this.nodes;
t.tmpl(null, null, null, this).insertBefore(e[0]), t(e).remove();
}
var f, m = t.fn.domManip, g = "_tmplitem", v = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, y = {}, b = {}, w = {
key:0,
data:{}
}, _ = 0, k = 0, x = [];
t.each({
appendTo:"append",
prependTo:"prepend",
insertBefore:"before",
insertAfter:"after",
replaceAll:"replaceWith"
}, function(e, n) {
t.fn[e] = function(i) {
var r, o, a, s, l = [], c = t(i), u = 1 === this.length && this[0].parentNode;
if (f = y || {}, u && 11 === u.nodeType && 1 === u.childNodes.length && 1 === c.length) c[n](this[0]), 
l = this; else {
for (o = 0, a = c.length; a > o; o++) k = o, r = (o > 0 ? this.clone(!0) :this).get(), 
t.fn[n].apply(t(c[o]), r), l = l.concat(r);
k = 0, l = this.pushStack(l, e, c.selector);
}
return s = f, f = null, t.tmpl.complete(s), l;
};
}), t.fn.extend({
tmpl:function(e, n, i) {
return t.tmpl(this[0], e, n, i);
},
tmplItem:function() {
return t.tmplItem(this[0]);
},
template:function(e) {
return t.template(e, this[0]);
},
domManip:function(e, n, i) {
if (e[0] && e[0].nodeType) {
for (var r, o = t.makeArray(arguments), a = e.length, s = 0; a > s && !(r = t.data(e[s++], "tmplItem")); ) ;
a > 1 && (o[0] = [ t.makeArray(e) ]), r && k && (o[2] = function(e) {
t.tmpl.afterManip(this, e, i);
}), m.apply(this, o);
} else m.apply(this, arguments);
return k = 0, f || t.tmpl.complete(y), this;
}
}), t.extend({
tmpl:function(i, r, a, s) {
var l, c = !s;
if (c) s = w, i = t.template[i] || t.template(null, i), b = {}; else if (!i) return i = s.tmpl, 
y[s.key] = s, s.nodes = [], s.wrapped && o(s, s.wrapped), t(n(s, null, s.tmpl(t, s)));
return i ? ("function" == typeof r && (r = r.call(s || {})), a && a.wrapped && o(a, a.wrapped), 
l = t.isArray(r) ? t.map(r, function(t) {
return t ? e(a, s, i, t) :null;
}) :[ e(a, s, i, r) ], c ? t(n(s, null, l)) :l) :[];
},
tmplItem:function(e) {
var n;
for (e instanceof t && (e = e[0]); e && 1 === e.nodeType && !(n = t.data(e, "tmplItem")) && (e = e.parentNode); ) ;
return n || w;
},
template:function(e, n) {
return n ? ("string" == typeof n ? n = r(n) :n instanceof t && (n = n[0] || {}), 
n.nodeType && (n = t.data(n, "tmpl") || t.data(n, "tmpl", r(n.innerHTML))), "string" == typeof e ? t.template[e] = n :n) :e ? "string" != typeof e ? t.template(null, e) :t.template[e] || t.template(null, v.test(e) ? e :t(e)) :null;
},
encode:function(t) {
return ("" + t).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
}
}), t.extend(t.tmpl, {
tag:{
tmpl:{
_default:{
$2:"null"
},
open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"
},
wrap:{
_default:{
$2:"null"
},
open:"$item.calls(_,$1,$2);_=[];",
close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"
},
each:{
_default:{
$2:"$index, $value"
},
open:"if($notnull_1){$.each($1a,function($2){with(this){",
close:"}});}"
},
"if":{
open:"if(($notnull_1) && $1a){",
close:"}"
},
"else":{
_default:{
$1:"true"
},
open:"}else if(($notnull_1) && $1a){"
},
html:{
open:"if($notnull_1){_.push($1a);}"
},
"=":{
_default:{
$1:"$data"
},
open:"if($notnull_1){_.push($.encode($1a));}"
},
"!":{
open:""
}
},
complete:function() {
y = {};
},
afterManip:function(e, n, i) {
var r = 11 === n.nodeType ? t.makeArray(n.childNodes) :1 === n.nodeType ? [ n ] :[];
i.call(e, n), l(r), k++;
}
});
}(jQuery), function(t) {
function e() {
var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
window.console && window.console.log ? window.console.log(t) :window.opera && window.opera.postError && window.opera.postError(t);
}
t.fn.ajaxSubmit = function(n) {
function i(i) {
function o(t) {
var e = t.contentWindow ? t.contentWindow.document :t.contentDocument ? t.contentDocument :t.document;
return e;
}
function a() {
function n() {
try {
var t = o(m).readyState;
e("state = " + t), "uninitialized" == t.toLowerCase() && setTimeout(n, 50);
} catch (i) {
e("Server abort: ", i, " (", i.name, ")"), l(S), w && clearTimeout(w), w = void 0;
}
}
var i = s.attr("target"), a = s.attr("action");
_.setAttribute("target", h), r || _.setAttribute("method", "POST"), a != d.url && _.setAttribute("action", d.url), 
d.skipEncodingOverride || r && !/post/i.test(r) || s.attr({
encoding:"multipart/form-data",
enctype:"multipart/form-data"
}), d.timeout && (w = setTimeout(function() {
b = !0, l(x);
}, d.timeout));
var c = [];
try {
if (d.extraData) for (var u in d.extraData) c.push(t('<input type="hidden" name="' + u + '" />').attr("value", d.extraData[u]).appendTo(_)[0]);
d.iframeTarget || (f.appendTo("body"), m.attachEvent ? m.attachEvent("onload", l) :m.addEventListener("load", l, !1)), 
setTimeout(n, 15), _.submit();
} finally {
_.setAttribute("action", a), i ? _.setAttribute("target", i) :s.removeAttr("target"), 
t(c).remove();
}
}
function l(n) {
if (!g.aborted && !T) {
try {
C = o(m);
} catch (i) {
e("cannot access response document: ", i), n = S;
}
if (n === x && g) return g.abort("timeout"), void 0;
if (n == S && g) return g.abort("server abort"), void 0;
if (C && C.location.href != d.iframeSrc || b) {
m.detachEvent ? m.detachEvent("onload", l) :m.removeEventListener("load", l, !1);
var r, a = "success";
try {
if (b) throw "timeout";
var s = "xml" == d.dataType || C.XMLDocument || t.isXMLDoc(C);
if (e("isXml=" + s), !s && window.opera && (null == C.body || "" == C.body.innerHTML) && --$) return e("requeing onLoad callback, DOM not available"), 
setTimeout(l, 250), void 0;
var c = C.body ? C.body :C.documentElement;
g.responseText = c ? c.innerHTML :null, g.responseXML = C.XMLDocument ? C.XMLDocument :C, 
s && (d.dataType = "xml"), g.getResponseHeader = function(t) {
var e = {
"content-type":d.dataType
};
return e[t];
}, c && (g.status = Number(c.getAttribute("status")) || g.status, g.statusText = c.getAttribute("statusText") || g.statusText);
var u = d.dataType || "", h = /(json|script|text)/.test(u.toLowerCase());
if (h || d.textarea) {
var v = C.getElementsByTagName("textarea")[0];
if (v) g.responseText = v.value, g.status = Number(v.getAttribute("status")) || g.status, 
g.statusText = v.getAttribute("statusText") || g.statusText; else if (h) {
var y = C.getElementsByTagName("pre")[0], _ = C.getElementsByTagName("body")[0];
y ? g.responseText = y.textContent ? y.textContent :y.innerHTML :_ && (g.responseText = _.innerHTML);
}
} else "xml" != d.dataType || g.responseXML || null == g.responseText || (g.responseXML = I(g.responseText));
try {
E = B(g, d.dataType, d);
} catch (n) {
a = "parsererror", g.error = r = n || a;
}
} catch (n) {
e("error caught: ", n), a = "error", g.error = r = n || a;
}
g.aborted && (e("upload aborted"), a = null), g.status && (a = g.status >= 200 && g.status < 300 || 304 === g.status ? "success" :"error"), 
"success" === a ? (d.success && d.success.call(d.context, E, "success", g), p && t.event.trigger("ajaxSuccess", [ g, d ])) :a && (void 0 == r && (r = g.statusText), 
d.error && d.error.call(d.context, g, a, r), p && t.event.trigger("ajaxError", [ g, d, r ])), 
p && t.event.trigger("ajaxComplete", [ g, d ]), p && !--t.active && t.event.trigger("ajaxStop"), 
d.complete && d.complete.call(d.context, g, a), T = !0, d.timeout && clearTimeout(w), 
setTimeout(function() {
d.iframeTarget || f.remove(), g.responseXML = null;
}, 100);
}
}
}
var c, u, d, p, h, f, m, g, v, y, b, w, _ = s[0], k = !!t.fn.prop;
if (i) for (u = 0; u < i.length; u++) c = t(_[i[u].name]), c[k ? "prop" :"attr"]("disabled", !1);
if (t(":input[name=submit],:input[id=submit]", _).length) return alert('Error: Form elements must not have name or id of "submit".'), 
void 0;
if (d = t.extend(!0, {}, t.ajaxSettings, n), d.context = d.context || d, h = "jqFormIO" + new Date().getTime(), 
d.iframeTarget ? (f = t(d.iframeTarget), y = f.attr("name"), null == y ? f.attr("name", h) :h = y) :(f = t('<iframe name="' + h + '" src="' + d.iframeSrc + '" />'), 
f.css({
position:"absolute",
top:"-1000px",
left:"-1000px"
})), m = f[0], g = {
aborted:0,
responseText:null,
responseXML:null,
status:0,
statusText:"n/a",
getAllResponseHeaders:function() {},
getResponseHeader:function() {},
setRequestHeader:function() {},
abort:function(n) {
var i = "timeout" === n ? "timeout" :"aborted";
e("aborting upload... " + i), this.aborted = 1, f.attr("src", d.iframeSrc), g.error = i, 
d.error && d.error.call(d.context, g, i, n), p && t.event.trigger("ajaxError", [ g, d, i ]), 
d.complete && d.complete.call(d.context, g, i);
}
}, p = d.global, p && !t.active++ && t.event.trigger("ajaxStart"), p && t.event.trigger("ajaxSend", [ g, d ]), 
d.beforeSend && d.beforeSend.call(d.context, g, d) === !1) return d.global && t.active--, 
void 0;
if (!g.aborted) {
v = _.clk, v && (y = v.name, y && !v.disabled && (d.extraData = d.extraData || {}, 
d.extraData[y] = v.value, "image" == v.type && (d.extraData[y + ".x"] = _.clk_x, 
d.extraData[y + ".y"] = _.clk_y)));
var x = 1, S = 2;
d.forceSync ? a() :setTimeout(a, 10);
var E, C, T, $ = 50, I = t.parseXML || function(t, e) {
return window.ActiveXObject ? (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", 
e.loadXML(t)) :e = new DOMParser().parseFromString(t, "text/xml"), e && e.documentElement && "parsererror" != e.documentElement.nodeName ? e :null;
}, A = t.parseJSON || function(t) {
return window.eval("(" + t + ")");
}, B = function(e, n, i) {
var r = e.getResponseHeader("content-type") || "", o = "xml" === n || !n && r.indexOf("xml") >= 0, a = o ? e.responseXML :e.responseText;
return o && "parsererror" === a.documentElement.nodeName && t.error && t.error("parsererror"), 
i && i.dataFilter && (a = i.dataFilter(a, n)), "string" == typeof a && ("json" === n || !n && r.indexOf("json") >= 0 ? a = A(a) :("script" === n || !n && r.indexOf("javascript") >= 0) && t.globalEval(a)), 
a;
};
}
}
if (!this.length) return e("ajaxSubmit: skipping submit process - no element selected"), 
this;
var r, o, a, s = this;
"function" == typeof n && (n = {
success:n
}), r = this.attr("method"), o = this.attr("action"), a = "string" == typeof o ? t.trim(o) :"", 
a = a || window.location.href || "", a && (a = (a.match(/^([^#]+)/) || [])[1]), 
n = t.extend(!0, {
url:a,
success:t.ajaxSettings.success,
type:r || "GET",
iframeSrc:/^https/i.test(window.location.href || "") ? "javascript:false" :"about:blank"
}, n);
var l = {};
if (this.trigger("form-pre-serialize", [ this, n, l ]), l.veto) return e("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), 
this;
if (n.beforeSerialize && n.beforeSerialize(this, n) === !1) return e("ajaxSubmit: submit aborted via beforeSerialize callback"), 
this;
var c, u, d = this.formToArray(n.semantic);
if (n.data) {
n.extraData = n.data;
for (c in n.data) if (n.data[c] instanceof Array) for (var p in n.data[c]) d.push({
name:c,
value:n.data[c][p]
}); else u = n.data[c], u = t.isFunction(u) ? u() :u, d.push({
name:c,
value:u
});
}
if (n.beforeSubmit && n.beforeSubmit(d, this, n) === !1) return e("ajaxSubmit: submit aborted via beforeSubmit callback"), 
this;
if (this.trigger("form-submit-validate", [ d, this, n, l ]), l.veto) return e("ajaxSubmit: submit vetoed via form-submit-validate trigger"), 
this;
var h = t.param(d);
"GET" == n.type.toUpperCase() ? (n.url += (n.url.indexOf("?") >= 0 ? "&" :"?") + h, 
n.data = null) :n.data = h;
var f = [];
if (n.resetForm && f.push(function() {
s.resetForm();
}), n.clearForm && f.push(function() {
s.clearForm();
}), !n.dataType && n.target) {
var m = n.success || function() {};
f.push(function(e) {
var i = n.replaceTarget ? "replaceWith" :"html";
t(n.target)[i](e).each(m, arguments);
});
} else n.success && f.push(n.success);
n.success = function(t, e, i) {
for (var r = n.context || n, o = 0, a = f.length; a > o; o++) f[o].apply(r, [ t, e, i || s, s ]);
};
var g = t("input:file", this).length > 0, v = "multipart/form-data", y = s.attr("enctype") == v || s.attr("encoding") == v;
if (n.iframe !== !1 && (g || n.iframe || y)) n.closeKeepAlive ? t.get(n.closeKeepAlive, function() {
i(d);
}) :i(d); else {
if (t.browser.msie && "get" == r) {
var b = s[0].getAttribute("method");
"string" == typeof b && (n.type = b);
}
t.ajax(n);
}
return this.trigger("form-submit-notify", [ this, n ]), this;
}, t.fn.ajaxForm = function(n) {
if (0 === this.length) {
var i = {
s:this.selector,
c:this.context
};
return !t.isReady && i.s ? (e("DOM not ready, queuing ajaxForm"), t(function() {
t(i.s, i.c).ajaxForm(n);
}), this) :(e("terminating; zero elements found by selector" + (t.isReady ? "" :" (DOM not ready)")), 
this);
}
return this.ajaxFormUnbind().bind("submit.form-plugin", function(e) {
e.isDefaultPrevented() || (e.preventDefault(), t(this).ajaxSubmit(n));
}).bind("click.form-plugin", function(e) {
var n = e.target, i = t(n);
if (!i.is(":submit,input:image")) {
var r = i.closest(":submit");
if (0 == r.length) return;
n = r[0];
}
var o = this;
if (o.clk = n, "image" == n.type) if (void 0 != e.offsetX) o.clk_x = e.offsetX, 
o.clk_y = e.offsetY; else if ("function" == typeof t.fn.offset) {
var a = i.offset();
o.clk_x = e.pageX - a.left, o.clk_y = e.pageY - a.top;
} else o.clk_x = e.pageX - n.offsetLeft, o.clk_y = e.pageY - n.offsetTop;
setTimeout(function() {
o.clk = o.clk_x = o.clk_y = null;
}, 100);
});
}, t.fn.ajaxFormUnbind = function() {
return this.unbind("submit.form-plugin click.form-plugin");
}, t.fn.formToArray = function(e) {
var n = [];
if (0 === this.length) return n;
var i = this[0], r = e ? i.getElementsByTagName("*") :i.elements;
if (!r) return n;
var o, a, s, l, c, u, d;
for (o = 0, u = r.length; u > o; o++) if (c = r[o], s = c.name) if (e && i.clk && "image" == c.type) c.disabled || i.clk != c || (n.push({
name:s,
value:t(c).val()
}), n.push({
name:s + ".x",
value:i.clk_x
}, {
name:s + ".y",
value:i.clk_y
})); else if (l = t.fieldValue(c, !0), l && l.constructor == Array) for (a = 0, 
d = l.length; d > a; a++) n.push({
name:s,
value:l[a]
}); else null !== l && "undefined" != typeof l && n.push({
name:s,
value:l
});
if (!e && i.clk) {
var p = t(i.clk), h = p[0];
s = h.name, s && !h.disabled && "image" == h.type && (n.push({
name:s,
value:p.val()
}), n.push({
name:s + ".x",
value:i.clk_x
}, {
name:s + ".y",
value:i.clk_y
}));
}
return n;
}, t.fn.formSerialize = function(e) {
return t.param(this.formToArray(e));
}, t.fn.fieldSerialize = function(e) {
var n = [];
return this.each(function() {
var i = this.name;
if (i) {
var r = t.fieldValue(this, e);
if (r && r.constructor == Array) for (var o = 0, a = r.length; a > o; o++) n.push({
name:i,
value:r[o]
}); else null !== r && "undefined" != typeof r && n.push({
name:this.name,
value:r
});
}
}), t.param(n);
}, t.fn.fieldValue = function(e) {
for (var n = [], i = 0, r = this.length; r > i; i++) {
var o = this[i], a = t.fieldValue(o, e);
null === a || "undefined" == typeof a || a.constructor == Array && !a.length || (a.constructor == Array ? t.merge(n, a) :n.push(a));
}
return n;
}, t.fieldValue = function(e, n) {
var i = e.name, r = e.type, o = e.tagName.toLowerCase();
if (void 0 === n && (n = !0), n && (!i || e.disabled || "reset" == r || "button" == r || ("checkbox" == r || "radio" == r) && !e.checked || ("submit" == r || "image" == r) && e.form && e.form.clk != e || "select" == o && -1 == e.selectedIndex)) return null;
if ("select" == o) {
var a = e.selectedIndex;
if (0 > a) return null;
for (var s = [], l = e.options, c = "select-one" == r, u = c ? a + 1 :l.length, d = c ? a :0; u > d; d++) {
var p = l[d];
if (p.selected) {
var h = p.value;
if (h || (h = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text :p.value), 
c) return h;
s.push(h);
}
}
return s;
}
return t(e).val();
}, t.fn.clearForm = function() {
return this.each(function() {
t("input,select,textarea", this).clearFields();
});
}, t.fn.clearFields = t.fn.clearInputs = function() {
var t = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
return this.each(function() {
var e = this.type, n = this.tagName.toLowerCase();
t.test(e) || "textarea" == n ? this.value = "" :"checkbox" == e || "radio" == e ? this.checked = !1 :"select" == n && (this.selectedIndex = -1);
});
}, t.fn.resetForm = function() {
return this.each(function() {
("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset();
});
}, t.fn.enable = function(t) {
return void 0 === t && (t = !0), this.each(function() {
this.disabled = !t;
});
}, t.fn.selected = function(e) {
return void 0 === e && (e = !0), this.each(function() {
var n = this.type;
if ("checkbox" == n || "radio" == n) this.checked = e; else if ("option" == this.tagName.toLowerCase()) {
var i = t(this).parent("select");
e && i[0] && "select-one" == i[0].type && i.find("option").selected(!1), this.selected = e;
}
});
};
}(jQuery), /* ========================================================================
 * Bootstrap: tooltip.js v3.0.3
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(t) {
"use strict";
var e = function(t, e) {
this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
this.init("tooltip", t, e);
};
e.DEFAULTS = {
animation:!0,
placement:"top",
selector:!1,
template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger:"hover focus",
title:"",
delay:0,
html:!1,
container:"body"
}, e.prototype.init = function(e, n, i) {
this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i);
for (var r = this.options.trigger.split(" "), o = r.length; o--; ) {
var a = r[o];
if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != a) {
var s = "hover" == a ? "mouseenter" :"focus", l = "hover" == a ? "mouseleave" :"blur";
this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), 
this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this));
}
}
this.options.selector ? this._options = t.extend({}, this.options, {
trigger:"manual",
selector:""
}) :this.fixTitle();
}, e.prototype.getDefaults = function() {
return e.DEFAULTS;
}, e.prototype.getOptions = function(e) {
return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
show:e.delay,
hide:e.delay
}), e;
}, e.prototype.getDelegateOptions = function() {
var e = {}, n = this.getDefaults();
return this._options && t.each(this._options, function(t, i) {
n[t] != i && (e[t] = i);
}), e;
}, e.prototype.enter = function(e) {
var n = e instanceof this.constructor ? e :t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? (n.timeout = setTimeout(function() {
"in" == n.hoverState && n.show();
}, n.options.delay.show), void 0) :n.show();
}, e.prototype.leave = function(e) {
var n = e instanceof this.constructor ? e :t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? (n.timeout = setTimeout(function() {
"out" == n.hoverState && n.hide();
}, n.options.delay.hide), void 0) :n.hide();
}, e.prototype.show = function() {
var e = t.Event("show.bs." + this.type);
if (this.hasContent() && this.enabled) {
if (this.$element.trigger(e), e.isDefaultPrevented()) return;
var n = this.tip();
this.setContent(), this.options.animation && n.addClass("fade");
var i = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) :this.options.placement, r = /\s?auto?\s?/i, o = r.test(i);
o && (i = i.replace(r, "") || "top"), n.detach().css({
top:0,
left:0,
display:"block"
}).addClass(i), this.options.container ? n.appendTo(this.options.container) :n.insertAfter(this.$element);
var a = this.getPosition(), s = n[0].offsetWidth, l = n[0].offsetHeight;
if (o) {
var c = this.$element.parent(), u = i, d = document.documentElement.scrollTop || document.body.scrollTop, p = "body" == this.options.container ? window.innerWidth :c.outerWidth(), h = "body" == this.options.container ? window.innerHeight :c.outerHeight(), f = "body" == this.options.container ? 0 :c.offset().left;
i = "bottom" == i && a.top + a.height + l - d > h ? "top" :"top" == i && a.top - d - l < 0 ? "bottom" :"right" == i && a.right + s > p ? "left" :"left" == i && a.left - s < f ? "right" :i, 
n.removeClass(u).addClass(i);
}
var m = this.getCalculatedOffset(i, a, s, l);
this.applyPlacement(m, i), this.$element.trigger("shown.bs." + this.type);
}
}, e.prototype.applyPlacement = function(t, e) {
var n, i = this.tip(), r = i[0].offsetWidth, o = i[0].offsetHeight, a = parseInt(i.css("margin-top"), 10), s = parseInt(i.css("margin-left"), 10);
isNaN(a) && (a = 0), isNaN(s) && (s = 0), t.top = t.top + a, t.left = t.left + s, 
i.offset(t).addClass("in");
var l = i[0].offsetWidth, c = i[0].offsetHeight;
if ("top" == e && c != o && (n = !0, t.top = t.top + o - c), /bottom|top/.test(e)) {
var u = 0;
t.left < 0 && (u = -2 * t.left, t.left = 0, i.offset(t), l = i[0].offsetWidth, c = i[0].offsetHeight), 
this.replaceArrow(u - r + l, l, "left");
} else this.replaceArrow(c - o, c, "top");
n && i.offset(t);
}, e.prototype.replaceArrow = function(t, e, n) {
this.arrow().css(n, t ? 50 * (1 - t / e) + "%" :"");
}, e.prototype.setContent = function() {
var t = this.tip(), e = this.getTitle();
t.find(".tooltip-inner")[this.options.html ? "html" :"text"](e), t.removeClass("fade in top bottom left right");
}, e.prototype.hide = function() {
function e() {
"in" != n.hoverState && i.detach();
}
var n = this, i = this.tip(), r = t.Event("hide.bs." + this.type);
return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 :(i.removeClass("in"), 
t.support.transition && this.$tip.hasClass("fade") ? i.one(t.support.transition.end, e).emulateTransitionEnd(150) :e(), 
this.$element.trigger("hidden.bs." + this.type), this);
}, e.prototype.fixTitle = function() {
var t = this.$element;
(t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "");
}, e.prototype.hasContent = function() {
return this.getTitle();
}, e.prototype.getPosition = function() {
var e = this.$element[0];
return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() :{
width:e.offsetWidth,
height:e.offsetHeight
}, this.$element.offset());
}, e.prototype.getCalculatedOffset = function(t, e, n, i) {
return "bottom" == t ? {
top:e.top + e.height,
left:e.left + e.width / 2 - n / 2
} :"top" == t ? {
top:e.top - i,
left:e.left + e.width / 2 - n / 2
} :"left" == t ? {
top:e.top + e.height / 2 - i / 2,
left:e.left - n
} :{
top:e.top + e.height / 2 - i / 2,
left:e.left + e.width
};
}, e.prototype.getTitle = function() {
var t, e = this.$element, n = this.options;
return t = "function" == typeof n.title ? n.title.call(e[0]) :e.attr("data-original-title") || n.title;
}, e.prototype.tip = function() {
return this.$tip = this.$tip || t(this.options.template);
}, e.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
}, e.prototype.validate = function() {
this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
}, e.prototype.enable = function() {
this.enabled = !0;
}, e.prototype.disable = function() {
this.enabled = !1;
}, e.prototype.toggleEnabled = function() {
this.enabled = !this.enabled;
}, e.prototype.toggle = function(e) {
var n = e ? t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) :this;
n.tip().hasClass("in") ? n.leave(n) :n.enter(n);
}, e.prototype.destroy = function() {
this.hide().$element.off("." + this.type).removeData("bs." + this.type);
};
var n = t.fn.tooltip;
t.fn.tooltip = function(n) {
return this.each(function() {
var i = t(this), r = i.data("bs.tooltip"), o = "object" == typeof n && n;
r || i.data("bs.tooltip", r = new e(this, o)), "string" == typeof n && r[n]();
});
}, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
return t.fn.tooltip = n, this;
};
}(jQuery), /* ========================================================================
 * Bootstrap: popover.js v3.0.3
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
+function(t) {
"use strict";
var e = function(t, e) {
this.init("popover", t, e);
};
if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
placement:"right",
trigger:"click",
content:"",
template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
}), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, 
e.prototype.getDefaults = function() {
return e.DEFAULTS;
}, e.prototype.setContent = function() {
var t = this.tip(), e = this.getTitle(), n = this.getContent();
t.find(".popover-title")[this.options.html ? "html" :"text"](e), t.find(".popover-content")[this.options.html ? "html" :"text"](n), 
t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide();
}, e.prototype.hasContent = function() {
return this.getTitle() || this.getContent();
}, e.prototype.getContent = function() {
var t = this.$element, e = this.options;
return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) :e.content);
}, e.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".arrow");
}, e.prototype.tip = function() {
return this.$tip || (this.$tip = t(this.options.template)), this.$tip;
};
var n = t.fn.popover;
t.fn.popover = function(n) {
return this.each(function() {
var i = t(this), r = i.data("bs.popover"), o = "object" == typeof n && n;
r || i.data("bs.popover", r = new e(this, o)), "string" == typeof n && r[n]();
});
}, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
return t.fn.popover = n, this;
};
}(jQuery), /*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
// Copyright (c) 2010 "Cowboy" Ben Alman,
function(t, e, n) {
"$:nomunge";
function i(t) {
return t = t || location.href, "#" + t.replace(/^[^#]*#?(.*)$/, "$1");
}
var r, o = "hashchange", a = document, s = t.event.special, l = a.documentMode, c = "on" + o in e && (l === n || l > 7);
t.fn[o] = function(t) {
return t ? this.bind(o, t) :this.trigger(o);
}, t.fn[o].delay = 50, s[o] = t.extend(s[o], {
setup:function() {
return c ? !1 :(t(r.start), void 0);
},
teardown:function() {
return c ? !1 :(t(r.stop), void 0);
}
}), r = function() {
function r() {
var n = i(), a = h(u);
n !== u ? (p(u = n, a), t(e).trigger(o)) :a !== u && (location.href = location.href.replace(/#.*/, "") + a), 
s = setTimeout(r, t.fn[o].delay);
}
var s, l = {}, u = i(), d = function(t) {
return t;
}, p = d, h = d;
return l.start = function() {
s || r();
}, l.stop = function() {
s && clearTimeout(s), s = n;
}, t.browser.msie && !c && function() {
var e, n;
l.start = function() {
e || (n = t.fn[o].src, n = n && n + i(), e = t('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
n || p(i()), r();
}).attr("src", n || "javascript:0").insertAfter("body")[0].contentWindow, a.onpropertychange = function() {
try {
"title" === event.propertyName && (e.document.title = a.title);
} catch (t) {}
});
}, l.stop = d, h = function() {
return i(e.location.href);
}, p = function(n, i) {
var r = e.document, s = t.fn[o].domain;
n !== i && (r.title = a.title, r.open(), s && r.write('<script>document.domain="' + s + '"</script>'), 
r.close(), e.location.hash = n);
};
}(), l;
}();
}(jQuery, this), !function(t) {
var e = "waitForImages";
t.waitForImages = {
hasImageProperties:[ "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor" ]
}, t.expr[":"].uncached = function(e) {
if (!t(e).is('img[src!=""]')) return !1;
var n = new Image();
return n.src = e.src, !n.complete;
}, t.fn.waitForImages = function(n, i, r) {
var o = 0, a = 0;
if (t.isPlainObject(arguments[0]) && (r = arguments[0].waitForAll, i = arguments[0].each, 
n = arguments[0].finished), n = n || t.noop, i = i || t.noop, r = !!r, !t.isFunction(n) || !t.isFunction(i)) throw new TypeError("An invalid callback was supplied.");
return this.each(function() {
var s = t(this), l = [], c = t.waitForImages.hasImageProperties || [], u = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
r ? s.find("*").addBack().each(function() {
var e = t(this);
e.is("img:uncached") && l.push({
src:e.attr("src"),
element:e[0]
}), t.each(c, function(t, n) {
var i, r = e.css(n);
if (!r) return !0;
for (;i = u.exec(r); ) l.push({
src:i[2],
element:e[0]
});
});
}) :s.find("img:uncached").each(function() {
l.push({
src:this.src,
element:this
});
}), o = l.length, a = 0, 0 === o && n.call(s[0]), t.each(l, function(r, l) {
var c = new Image();
t(c).on("load." + e + " error." + e, function(t) {
return a++, i.call(l.element, a, o, "load" == t.type), a == o ? (n.call(s[0]), !1) :void 0;
}), c.src = l.src;
});
});
};
}(jQuery), /*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.5
 *
 */
function(t, e, n, i) {
var r = t(e);
t.fn.lazyload = function(o) {
function a() {
var e = 0;
l.each(function() {
var n = t(this);
if (!c.skip_invisible || n.is(":visible")) if (t.abovethetop(this, c) || t.leftofbegin(this, c)) ; else if (t.belowthefold(this, c) || t.rightoffold(this, c)) {
if (++e > c.failure_limit) return !1;
} else n.trigger("appear"), e = 0;
});
}
var s, l = this, c = {
threshold:0,
failure_limit:0,
event:"scroll",
effect:"show",
container:e,
data_attribute:"original",
skip_invisible:!0,
appear:null,
load:null
};
return o && (i !== o.failurelimit && (o.failure_limit = o.failurelimit, delete o.failurelimit), 
i !== o.effectspeed && (o.effect_speed = o.effectspeed, delete o.effectspeed), t.extend(c, o)), 
s = c.container === i || c.container === e ? r :t(c.container), 0 === c.event.indexOf("scroll") && s.bind(c.event, function() {
return a();
}), this.each(function() {
var e = this, n = t(e);
e.loaded = !1, n.one("appear", function() {
if (!this.loaded) {
if (c.appear) {
var i = l.length;
c.appear.call(e, i, c);
}
if (n.data("background")) {
var r = n.data("background");
n.css("backgroundImage", "url(" + r + ")");
} else {
var r = n.data(c.data_attribute);
t("<img />").bind("load", function() {
n.hide().attr("src", r).on("load", function() {
n.trigger("afterAppear");
}), n[c.effect](c.effect_speed), e.loaded = !0;
var i = t.grep(l, function(t) {
return !t.loaded;
});
if (l = t(i), c.load) {
var o = l.length;
c.load.call(e, o, c);
}
}).attr("src", r);
}
}
}), 0 !== c.event.indexOf("scroll") && n.bind(c.event, function() {
e.loaded || n.trigger("appear");
});
}), r.bind("resize", function() {
a();
}), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && r.bind("pageshow", function(e) {
e.originalEvent && e.originalEvent.persisted && l.each(function() {
t(this).trigger("appear");
});
}), t(n).ready(function() {
a();
}), this;
}, t.belowthefold = function(n, o) {
var a;
return a = o.container === i || o.container === e ? r.height() + r.scrollTop() :t(o.container).offset().top + t(o.container).height(), 
a <= t(n).offset().top - o.threshold;
}, t.rightoffold = function(n, o) {
var a;
return a = o.container === i || o.container === e ? r.width() + r.scrollLeft() :t(o.container).offset().left + t(o.container).width(), 
a <= t(n).offset().left - o.threshold;
}, t.abovethetop = function(n, o) {
var a;
return a = o.container === i || o.container === e ? r.scrollTop() :t(o.container).offset().top, 
a >= t(n).offset().top + o.threshold + t(n).height();
}, t.leftofbegin = function(n, o) {
var a;
return a = o.container === i || o.container === e ? r.scrollLeft() :t(o.container).offset().left, 
a >= t(n).offset().left + o.threshold + t(n).width();
}, t.inviewport = function(e, n) {
return !(t.rightoffold(e, n) || t.leftofbegin(e, n) || t.belowthefold(e, n) || t.abovethetop(e, n));
}, t.extend(t.expr[":"], {
"below-the-fold":function(e) {
return t.belowthefold(e, {
threshold:0
});
},
"above-the-top":function(e) {
return !t.belowthefold(e, {
threshold:0
});
},
"right-of-screen":function(e) {
return t.rightoffold(e, {
threshold:0
});
},
"left-of-screen":function(e) {
return !t.rightoffold(e, {
threshold:0
});
},
"in-viewport":function(e) {
return t.inviewport(e, {
threshold:0
});
},
"above-the-fold":function(e) {
return !t.belowthefold(e, {
threshold:0
});
},
"right-of-fold":function(e) {
return t.rightoffold(e, {
threshold:0
});
},
"left-of-fold":function(e) {
return !t.rightoffold(e, {
threshold:0
});
}
});
}(jQuery, window, document), function(t, e) {
function n(t, e) {
var n = null === t || typeof t in r;
return n ? t === e :!1;
}
var i = t.ko = {};
i.exportSymbol = function(e, n) {
for (var i = e.split("."), r = t, o = 0; o < i.length - 1; o++) r = r[i[o]];
r[i[i.length - 1]] = n;
}, i.exportProperty = function(t, e, n) {
t[e] = n;
}, i.utils = new function() {
function n(t, e) {
if ("INPUT" != t.tagName || !t.type) return !1;
if ("click" != e.toLowerCase()) return !1;
var n = t.type.toLowerCase();
return "checkbox" == n || "radio" == n;
}
var r = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, o = /MSIE 6/i.test(navigator.userAgent), a = /MSIE 7/i.test(navigator.userAgent), s = {}, l = {}, c = /Firefox\/2/i.test(navigator.userAgent) ? "KeyboardEvent" :"UIEvents";
s[c] = [ "keyup", "keydown", "keypress" ], s.MouseEvents = [ "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave" ];
for (var u in s) {
var d = s[u];
if (d.length) for (var p = 0, h = d.length; h > p; p++) l[d[p]] = u;
}
return {
fieldsIncludedWithJsonPost:[ "authenticity_token", /^__RequestVerificationToken(_.*)?$/ ],
arrayForEach:function(t, e) {
for (var n = 0, i = t.length; i > n; n++) e(t[n]);
},
arrayIndexOf:function(t, e) {
if ("function" == typeof t.indexOf) return t.indexOf(e);
for (var n = 0, i = t.length; i > n; n++) if (t[n] === e) return n;
return -1;
},
arrayFirst:function(t, e, n) {
for (var i = 0, r = t.length; r > i; i++) if (e.call(n, t[i])) return t[i];
return null;
},
arrayRemoveItem:function(t, e) {
var n = i.utils.arrayIndexOf(t, e);
n >= 0 && t.splice(n, 1);
},
arrayGetDistinctValues:function(t) {
t = t || [];
for (var e = [], n = 0, r = t.length; r > n; n++) i.utils.arrayIndexOf(e, t[n]) < 0 && e.push(t[n]);
return e;
},
arrayMap:function(t, e) {
t = t || [];
for (var n = [], i = 0, r = t.length; r > i; i++) n.push(e(t[i]));
return n;
},
arrayFilter:function(t, e) {
t = t || [];
for (var n = [], i = 0, r = t.length; r > i; i++) e(t[i]) && n.push(t[i]);
return n;
},
arrayPushAll:function(t, e) {
for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
},
emptyDomNode:function(t) {
for (;t.firstChild; ) i.removeNode(t.firstChild);
},
setDomNodeChildren:function(t, e) {
i.utils.emptyDomNode(t), e && i.utils.arrayForEach(e, function(e) {
t.appendChild(e);
});
},
replaceDomNodes:function(t, e) {
var n = t.nodeType ? [ t ] :t;
if (n.length > 0) {
for (var r = n[0], o = r.parentNode, a = 0, s = e.length; s > a; a++) o.insertBefore(e[a], r);
for (var a = 0, s = n.length; s > a; a++) i.removeNode(n[a]);
}
},
setOptionNodeSelectionState:function(t, e) {
navigator.userAgent.indexOf("MSIE 6") >= 0 ? t.setAttribute("selected", e) :t.selected = e;
},
getElementsHavingAttribute:function(t, e) {
if (!t || 1 != t.nodeType) return [];
var n = [];
null !== t.getAttribute(e) && n.push(t);
for (var i = t.getElementsByTagName("*"), r = 0, o = i.length; o > r; r++) null !== i[r].getAttribute(e) && n.push(i[r]);
return n;
},
stringTrim:function(t) {
return (t || "").replace(r, "");
},
stringTokenize:function(t, e) {
for (var n = [], r = (t || "").split(e), o = 0, a = r.length; a > o; o++) {
var s = i.utils.stringTrim(r[o]);
"" !== s && n.push(s);
}
return n;
},
stringStartsWith:function(t, e) {
return t = t || "", e.length > t.length ? !1 :t.substring(0, e.length) === e;
},
evalWithinScope:function(t, n) {
return n === e ? new Function("return " + t)() :new Function("sc", "with(sc) { return (" + t + ") }")(n);
},
domNodeIsContainedBy:function(t, e) {
if (e.compareDocumentPosition) return 16 == (16 & e.compareDocumentPosition(t));
for (;null != t; ) {
if (t == e) return !0;
t = t.parentNode;
}
return !1;
},
domNodeIsAttachedToDocument:function(t) {
return i.utils.domNodeIsContainedBy(t, document);
},
registerEventHandler:function(t, e, i) {
if ("undefined" != typeof jQuery) {
if (n(t, e)) {
var r = i;
i = function(t, e) {
var n = this.checked;
e && (this.checked = e.checkedStateBeforeEvent !== !0), r.call(this, t), this.checked = n;
};
}
jQuery(t).bind(e, i);
} else if ("function" == typeof t.addEventListener) t.addEventListener(e, i, !1); else {
if ("undefined" == typeof t.attachEvent) throw new Error("Browser doesn't support addEventListener or attachEvent");
t.attachEvent("on" + e, function(e) {
i.call(t, e);
});
}
},
triggerEvent:function(e, i) {
if (!e || !e.nodeType) throw new Error("element must be a DOM node when calling triggerEvent");
if ("undefined" != typeof jQuery) {
var r = [];
n(e, i) && r.push({
checkedStateBeforeEvent:e.checked
}), jQuery(e).trigger(i, r);
} else if ("function" == typeof document.createEvent) {
if ("function" != typeof e.dispatchEvent) throw new Error("The supplied element doesn't support dispatchEvent");
var o = l[i] || "HTMLEvents", a = document.createEvent(o);
a.initEvent(i, !0, !0, t, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, e), e.dispatchEvent(a);
} else {
if ("undefined" == typeof e.fireEvent) throw new Error("Browser doesn't support triggering events");
"click" == i && ("INPUT" != e.tagName || "checkbox" != e.type.toLowerCase() && "radio" != e.type.toLowerCase() || (e.checked = e.checked !== !0)), 
e.fireEvent("on" + i);
}
},
unwrapObservable:function(t) {
return i.isObservable(t) ? t() :t;
},
domNodeHasCssClass:function(t, e) {
var n = (t.className || "").split(/\s+/);
return i.utils.arrayIndexOf(n, e) >= 0;
},
toggleDomNodeCssClass:function(t, e, n) {
var r = i.utils.domNodeHasCssClass(t, e);
if (n && !r) t.className = (t.className || "") + " " + e; else if (r && !n) {
for (var o = (t.className || "").split(/\s+/), a = "", s = 0; s < o.length; s++) o[s] != e && (a += o[s] + " ");
t.className = i.utils.stringTrim(a);
}
},
range:function(t, e) {
t = i.utils.unwrapObservable(t), e = i.utils.unwrapObservable(e);
for (var n = [], r = t; e >= r; r++) n.push(r);
return n;
},
makeArray:function(t) {
for (var e = [], n = 0, i = t.length; i > n; n++) e.push(t[n]);
return e;
},
isIe6:o,
isIe7:a,
getFormFields:function(t, e) {
for (var n = i.utils.makeArray(t.getElementsByTagName("INPUT")).concat(i.utils.makeArray(t.getElementsByTagName("TEXTAREA"))), r = "string" == typeof e ? function(t) {
return t.name === e;
} :function(t) {
return e.test(t.name);
}, o = [], a = n.length - 1; a >= 0; a--) r(n[a]) && o.push(n[a]);
return o;
},
parseJson:function(e) {
return "string" == typeof e && (e = i.utils.stringTrim(e)) ? t.JSON && t.JSON.parse ? t.JSON.parse(e) :new Function("return " + e)() :null;
},
stringifyJson:function(t) {
if ("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return JSON.stringify(i.utils.unwrapObservable(t));
},
postJson:function(t, e, n) {
n = n || {};
var r = n.params || {}, o = n.includeFields || this.fieldsIncludedWithJsonPost, a = t;
if ("object" == typeof t && "FORM" == t.tagName) {
var s = t;
a = s.action;
for (var l = o.length - 1; l >= 0; l--) for (var c = i.utils.getFormFields(s, o[l]), u = c.length - 1; u >= 0; u--) r[c[u].name] = c[u].value;
}
e = i.utils.unwrapObservable(e);
var d = document.createElement("FORM");
d.style.display = "none", d.action = a, d.method = "post";
for (var p in e) {
var h = document.createElement("INPUT");
h.name = p, h.value = i.utils.stringifyJson(i.utils.unwrapObservable(e[p])), d.appendChild(h);
}
for (var p in r) {
var h = document.createElement("INPUT");
h.name = p, h.value = r[p], d.appendChild(h);
}
document.body.appendChild(d), n.submitter ? n.submitter(d) :d.submit(), setTimeout(function() {
d.parentNode.removeChild(d);
}, 0);
}
};
}(), i.exportSymbol("ko.utils", i.utils), i.exportSymbol("ko.utils.arrayForEach", i.utils.arrayForEach), 
i.exportSymbol("ko.utils.arrayFirst", i.utils.arrayFirst), i.exportSymbol("ko.utils.arrayFilter", i.utils.arrayFilter), 
i.exportSymbol("ko.utils.arrayGetDistinctValues", i.utils.arrayGetDistinctValues), 
i.exportSymbol("ko.utils.arrayIndexOf", i.utils.arrayIndexOf), i.exportSymbol("ko.utils.arrayMap", i.utils.arrayMap), 
i.exportSymbol("ko.utils.arrayPushAll", i.utils.arrayPushAll), i.exportSymbol("ko.utils.arrayRemoveItem", i.utils.arrayRemoveItem), 
i.exportSymbol("ko.utils.fieldsIncludedWithJsonPost", i.utils.fieldsIncludedWithJsonPost), 
i.exportSymbol("ko.utils.getElementsHavingAttribute", i.utils.getElementsHavingAttribute), 
i.exportSymbol("ko.utils.getFormFields", i.utils.getFormFields), i.exportSymbol("ko.utils.postJson", i.utils.postJson), 
i.exportSymbol("ko.utils.parseJson", i.utils.parseJson), i.exportSymbol("ko.utils.registerEventHandler", i.utils.registerEventHandler), 
i.exportSymbol("ko.utils.stringifyJson", i.utils.stringifyJson), i.exportSymbol("ko.utils.range", i.utils.range), 
i.exportSymbol("ko.utils.toggleDomNodeCssClass", i.utils.toggleDomNodeCssClass), 
i.exportSymbol("ko.utils.triggerEvent", i.utils.triggerEvent), i.exportSymbol("ko.utils.unwrapObservable", i.utils.unwrapObservable), 
Function.prototype.bind || (Function.prototype.bind = function(t) {
var e = this, n = Array.prototype.slice.call(arguments), t = n.shift();
return function() {
return e.apply(t, n.concat(Array.prototype.slice.call(arguments)));
};
}), i.utils.domData = new function() {
var t = 0, n = "__ko__" + new Date().getTime(), r = {};
return {
get:function(t, n) {
var r = i.utils.domData.getAll(t, !1);
return r === e ? e :r[n];
},
set:function(t, n, r) {
if (r !== e || i.utils.domData.getAll(t, !1) !== e) {
var o = i.utils.domData.getAll(t, !0);
o[n] = r;
}
},
getAll:function(i, o) {
var a = i[n];
if (!a) {
if (!o) return e;
a = i[n] = "ko" + t++, r[a] = {};
}
return r[a];
},
clear:function(t) {
var e = t[n];
e && (delete r[e], t[n] = null);
}
};
}(), i.utils.domNodeDisposal = new function() {
function t(t, n) {
var r = i.utils.domData.get(t, o);
return r === e && n && (r = [], i.utils.domData.set(t, o, r)), r;
}
function n(t) {
i.utils.domData.set(t, o, e);
}
function r(e) {
var n = t(e, !1);
if (n) {
n = n.slice(0);
for (var r = 0; r < n.length; r++) n[r](e);
}
i.utils.domData.clear(e), "function" == typeof jQuery && "function" == typeof jQuery.cleanData && jQuery.cleanData([ e ]);
}
var o = "__ko_domNodeDisposal__" + new Date().getTime();
return {
addDisposeCallback:function(e, n) {
if ("function" != typeof n) throw new Error("Callback must be a function");
t(e, !0).push(n);
},
removeDisposeCallback:function(e, r) {
var o = t(e, !1);
o && (i.utils.arrayRemoveItem(o, r), 0 == o.length && n(e));
},
cleanNode:function(t) {
if (1 == t.nodeType || 9 == t.nodeType) {
r(t);
var e = [];
i.utils.arrayPushAll(e, t.getElementsByTagName("*"));
for (var n = 0, o = e.length; o > n; n++) r(e[n]);
}
},
removeNode:function(t) {
i.cleanNode(t), t.parentNode && t.parentNode.removeChild(t);
}
};
}(), i.cleanNode = i.utils.domNodeDisposal.cleanNode, i.removeNode = i.utils.domNodeDisposal.removeNode, 
i.exportSymbol("ko.cleanNode", i.cleanNode), i.exportSymbol("ko.removeNode", i.removeNode), 
i.exportSymbol("ko.utils.domNodeDisposal", i.utils.domNodeDisposal), i.exportSymbol("ko.utils.domNodeDisposal.addDisposeCallback", i.utils.domNodeDisposal.addDisposeCallback), 
i.exportSymbol("ko.utils.domNodeDisposal.removeDisposeCallback", i.utils.domNodeDisposal.removeDisposeCallback), 
function() {
function t(t) {
var e = i.utils.stringTrim(t).toLowerCase(), n = document.createElement("div"), r = e.match(/^<(thead|tbody|tfoot)/) && [ 1, "<table>", "</table>" ] || !e.indexOf("<tr") && [ 2, "<table><tbody>", "</tbody></table>" ] || (!e.indexOf("<td") || !e.indexOf("<th")) && [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ] || [ 0, "", "" ];
for (n.innerHTML = r[1] + t + r[2]; r[0]--; ) n = n.lastChild;
return i.utils.makeArray(n.childNodes);
}
i.utils.parseHtmlFragment = function(e) {
return "undefined" != typeof jQuery ? jQuery.clean([ e ]) :t(e);
}, i.utils.setHtml = function(t, n) {
if (i.utils.emptyDomNode(t), null !== n && n !== e) if ("string" != typeof n && (n = n.toString()), 
"undefined" != typeof jQuery) jQuery(t).html(n); else for (var r = i.utils.parseHtmlFragment(n), o = 0; o < r.length; o++) t.appendChild(r[o]);
};
}(), i.memoization = function() {
function t() {
return (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
}
function n() {
return t() + t();
}
function r(t, e) {
if (t) if (8 == t.nodeType) {
var n = i.memoization.parseMemoText(t.nodeValue);
null != n && e.push({
domNode:t,
memoId:n
});
} else if (1 == t.nodeType) for (var o = 0, a = t.childNodes, s = a.length; s > o; o++) r(a[o], e);
}
var o = {};
return {
memoize:function(t) {
if ("function" != typeof t) throw new Error("You can only pass a function to ko.memoization.memoize()");
var e = n();
return o[e] = t, "<!--[ko_memo:" + e + "]-->";
},
unmemoize:function(t, n) {
var i = o[t];
if (i === e) throw new Error("Couldn't find any memo with ID " + t + ". Perhaps it's already been unmemoized.");
try {
return i.apply(null, n || []), !0;
} finally {
delete o[t];
}
},
unmemoizeDomNodeAndDescendants:function(t, e) {
var n = [];
r(t, n);
for (var o = 0, a = n.length; a > o; o++) {
var s = n[o].domNode, l = [ s ];
e && i.utils.arrayPushAll(l, e), i.memoization.unmemoize(n[o].memoId, l), s.nodeValue = "", 
s.parentNode && s.parentNode.removeChild(s);
}
},
parseMemoText:function(t) {
var e = t.match(/^\[ko_memo\:(.*?)\]$/);
return e ? e[1] :null;
}
};
}(), i.exportSymbol("ko.memoization", i.memoization), i.exportSymbol("ko.memoization.memoize", i.memoization.memoize), 
i.exportSymbol("ko.memoization.unmemoize", i.memoization.unmemoize), i.exportSymbol("ko.memoization.parseMemoText", i.memoization.parseMemoText), 
i.exportSymbol("ko.memoization.unmemoizeDomNodeAndDescendants", i.memoization.unmemoizeDomNodeAndDescendants), 
i.subscription = function(t, e) {
this.callback = t, this.dispose = function() {
this.isDisposed = !0, e();
}.bind(this), i.exportProperty(this, "dispose", this.dispose);
}, i.subscribable = function() {
var t = [];
this.subscribe = function(e, n) {
var r = n ? e.bind(n) :e, o = new i.subscription(r, function() {
i.utils.arrayRemoveItem(t, o);
});
return t.push(o), o;
}, this.notifySubscribers = function(e) {
i.utils.arrayForEach(t.slice(0), function(t) {
t && t.isDisposed !== !0 && t.callback(e);
});
}, this.getSubscriptionsCount = function() {
return t.length;
}, i.exportProperty(this, "subscribe", this.subscribe), i.exportProperty(this, "notifySubscribers", this.notifySubscribers), 
i.exportProperty(this, "getSubscriptionsCount", this.getSubscriptionsCount);
}, i.isSubscribable = function(t) {
return "function" == typeof t.subscribe && "function" == typeof t.notifySubscribers;
}, i.exportSymbol("ko.subscribable", i.subscribable), i.exportSymbol("ko.isSubscribable", i.isSubscribable), 
i.dependencyDetection = function() {
var t = [];
return {
begin:function() {
t.push([]);
},
end:function() {
return t.pop();
},
registerDependency:function(e) {
if (!i.isSubscribable(e)) throw "Only subscribable things can act as dependencies";
t.length > 0 && t[t.length - 1].push(e);
}
};
}();
var r = {
undefined:!0,
"boolean":!0,
number:!0,
string:!0
};
i.observable = function(t) {
function e() {
return arguments.length > 0 ? (e.equalityComparer && e.equalityComparer(r, arguments[0]) || (r = arguments[0], 
e.notifySubscribers(r)), this) :(i.dependencyDetection.registerDependency(e), r);
}
var r = t;
return e.__ko_proto__ = i.observable, e.valueHasMutated = function() {
e.notifySubscribers(r);
}, e.equalityComparer = n, i.subscribable.call(e), i.exportProperty(e, "valueHasMutated", e.valueHasMutated), 
e;
}, i.isObservable = function(t) {
return null === t || t === e || t.__ko_proto__ === e ? !1 :t.__ko_proto__ === i.observable ? !0 :i.isObservable(t.__ko_proto__);
}, i.isWriteableObservable = function(t) {
return "function" == typeof t && t.__ko_proto__ === i.observable ? !0 :"function" == typeof t && t.__ko_proto__ === i.dependentObservable && t.hasWriteFunction ? !0 :!1;
}, i.exportSymbol("ko.observable", i.observable), i.exportSymbol("ko.isObservable", i.isObservable), 
i.exportSymbol("ko.isWriteableObservable", i.isWriteableObservable), i.observableArray = function(t) {
if (0 == arguments.length && (t = []), null !== t && t !== e && !("length" in t)) throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
var n = new i.observable(t);
return i.utils.arrayForEach([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(t) {
n[t] = function() {
var e = n(), i = e[t].apply(e, arguments);
return n.valueHasMutated(), i;
};
}), i.utils.arrayForEach([ "slice" ], function(t) {
n[t] = function() {
var e = n();
return e[t].apply(e, arguments);
};
}), n.remove = function(t) {
for (var e = n(), i = [], r = [], o = "function" == typeof t ? t :function(e) {
return e === t;
}, a = 0, s = e.length; s > a; a++) {
var l = e[a];
o(l) ? r.push(l) :i.push(l);
}
return n(i), r;
}, n.removeAll = function(t) {
if (t === e) {
var r = n();
return n([]), r;
}
return t ? n.remove(function(e) {
return i.utils.arrayIndexOf(t, e) >= 0;
}) :[];
}, n.destroy = function(t) {
for (var e = n(), i = "function" == typeof t ? t :function(e) {
return e === t;
}, r = e.length - 1; r >= 0; r--) {
var o = e[r];
i(o) && (e[r]._destroy = !0);
}
n.valueHasMutated();
}, n.destroyAll = function(t) {
return t === e ? n.destroy(function() {
return !0;
}) :t ? n.destroy(function(e) {
return i.utils.arrayIndexOf(t, e) >= 0;
}) :[];
}, n.indexOf = function(t) {
var e = n();
return i.utils.arrayIndexOf(e, t);
}, n.replace = function(t, e) {
var i = n.indexOf(t);
i >= 0 && (n()[i] = e, n.valueHasMutated());
}, i.exportProperty(n, "remove", n.remove), i.exportProperty(n, "removeAll", n.removeAll), 
i.exportProperty(n, "destroy", n.destroy), i.exportProperty(n, "destroyAll", n.destroyAll), 
i.exportProperty(n, "indexOf", n.indexOf), n;
}, i.exportSymbol("ko.observableArray", i.observableArray), i.dependentObservable = function(t, e, n) {
function r() {
i.utils.arrayForEach(h, function(t) {
t.dispose();
}), h = [];
}
function o(t) {
r(), i.utils.arrayForEach(t, function(t) {
h.push(t.subscribe(a));
});
}
function a() {
if (c && "function" == typeof n.disposeWhen && n.disposeWhen()) return s.dispose(), 
void 0;
try {
i.dependencyDetection.begin(), l = n.owner ? n.read.call(n.owner) :n.read();
} finally {
var t = i.utils.arrayGetDistinctValues(i.dependencyDetection.end());
o(t);
}
s.notifySubscribers(l), c = !0;
}
function s() {
if (!(arguments.length > 0)) return c || a(), i.dependencyDetection.registerDependency(s), 
l;
if ("function" != typeof n.write) throw "Cannot write a value to a dependentObservable unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.";
var t = arguments[0];
n.owner ? n.write.call(n.owner, t) :n.write(t);
}
var l, c = !1;
if (t && "object" == typeof t ? n = t :(n = n || {}, n.read = t || n.read, n.owner = e || n.owner), 
"function" != typeof n.read) throw "Pass a function that returns the value of the dependentObservable";
var u = "object" == typeof n.disposeWhenNodeIsRemoved ? n.disposeWhenNodeIsRemoved :null, d = null;
if (u) {
d = function() {
s.dispose();
}, i.utils.domNodeDisposal.addDisposeCallback(u, d);
var p = n.disposeWhen;
n.disposeWhen = function() {
return !i.utils.domNodeIsAttachedToDocument(u) || "function" == typeof p && p();
};
}
var h = [];
return s.__ko_proto__ = i.dependentObservable, s.getDependenciesCount = function() {
return h.length;
}, s.hasWriteFunction = "function" == typeof n.write, s.dispose = function() {
u && i.utils.domNodeDisposal.removeDisposeCallback(u, d), r();
}, i.subscribable.call(s), n.deferEvaluation !== !0 && a(), i.exportProperty(s, "dispose", s.dispose), 
i.exportProperty(s, "getDependenciesCount", s.getDependenciesCount), s;
}, i.dependentObservable.__ko_proto__ = i.observable, i.exportSymbol("ko.dependentObservable", i.dependentObservable), 
function() {
function t(i, o, a) {
a = a || new r(), i = o(i);
var s = "object" == typeof i && null !== i && i !== e;
if (!s) return i;
var l = i instanceof Array ? [] :{};
return a.save(i, l), n(i, function(n) {
var r = o(i[n]);
switch (typeof r) {
case "boolean":
case "number":
case "string":
case "function":
l[n] = r;
break;

case "object":
case "undefined":
var s = a.get(r);
l[n] = s !== e ? s :t(r, o, a);
}
}), l;
}
function n(t, e) {
if (t instanceof Array) for (var n = 0; n < t.length; n++) e(n); else for (var i in t) e(i);
}
function r() {
var t = [], n = [];
this.save = function(e, r) {
var o = i.utils.arrayIndexOf(t, e);
o >= 0 ? n[o] = r :(t.push(e), n.push(r));
}, this.get = function(r) {
var o = i.utils.arrayIndexOf(t, r);
return o >= 0 ? n[o] :e;
};
}
var o = 10;
i.toJS = function(e) {
if (0 == arguments.length) throw new Error("When calling ko.toJS, pass the object you want to convert.");
return t(e, function(t) {
for (var e = 0; i.isObservable(t) && o > e; e++) t = t();
return t;
});
}, i.toJSON = function(t) {
var e = i.toJS(t);
return i.utils.stringifyJson(e);
};
}(), i.exportSymbol("ko.toJS", i.toJS), i.exportSymbol("ko.toJSON", i.toJSON), function() {
i.selectExtensions = {
readValue:function(t) {
return "OPTION" == t.tagName ? t.__ko__hasDomDataOptionValue__ === !0 ? i.utils.domData.get(t, i.bindingHandlers.options.optionValueDomDataKey) :t.getAttribute("value") :"SELECT" == t.tagName ? t.selectedIndex >= 0 ? i.selectExtensions.readValue(t.options[t.selectedIndex]) :e :t.value;
},
writeValue:function(t, n) {
if ("OPTION" == t.tagName) switch (typeof n) {
case "string":
case "number":
i.utils.domData.set(t, i.bindingHandlers.options.optionValueDomDataKey, e), "__ko__hasDomDataOptionValue__" in t && delete t.__ko__hasDomDataOptionValue__, 
t.value = n;
break;

default:
i.utils.domData.set(t, i.bindingHandlers.options.optionValueDomDataKey, n), t.__ko__hasDomDataOptionValue__ = !0, 
t.value = "";
} else if ("SELECT" == t.tagName) {
for (var r = t.options.length - 1; r >= 0; r--) if (i.selectExtensions.readValue(t.options[r]) == n) {
t.selectedIndex = r;
break;
}
} else (null === n || n === e) && (n = ""), t.value = n;
}
};
}(), i.exportSymbol("ko.selectExtensions", i.selectExtensions), i.exportSymbol("ko.selectExtensions.readValue", i.selectExtensions.readValue), 
i.exportSymbol("ko.selectExtensions.writeValue", i.selectExtensions.writeValue), 
i.jsonExpressionRewriting = function() {
function t(t, e) {
return t.replace(n, function(t, n) {
return e[n];
});
}
function e(t) {
return i.utils.arrayIndexOf(o, i.utils.stringTrim(t).toLowerCase()) >= 0 ? !1 :null !== t.match(r);
}
var n = /\[ko_token_(\d+)\]/g, r = /^[\_$a-z][\_$a-z0-9]*(\[.*?\])*(\.[\_$a-z][\_$a-z0-9]*(\[.*?\])*)*$/i, o = [ "true", "false" ];
return {
parseJson:function(e) {
if (e = i.utils.stringTrim(e), e.length < 3) return {};
for (var n, r = [], o = null, a = "{" == e.charAt(0) ? 1 :0; a < e.length; a++) {
var s = e.charAt(a);
if (null === o) switch (s) {
case '"':
case "'":
case "/":
o = a, n = s;
break;

case "{":
o = a, n = "}";
break;

case "[":
o = a, n = "]";
} else if (s == n) {
var l = e.substring(o, a + 1);
r.push(l);
var c = "[ko_token_" + (r.length - 1) + "]";
e = e.substring(0, o) + c + e.substring(a + 1), a -= l.length - c.length, o = null;
}
}
for (var u = {}, d = e.split(","), p = 0, h = d.length; h > p; p++) {
var f = d[p], m = f.indexOf(":");
if (m > 0 && m < f.length - 1) {
var g = i.utils.stringTrim(f.substring(0, m)), v = i.utils.stringTrim(f.substring(m + 1));
"{" == g.charAt(0) && (g = g.substring(1)), "}" == v.charAt(v.length - 1) && (v = v.substring(0, v.length - 1)), 
g = i.utils.stringTrim(t(g, r)), v = i.utils.stringTrim(t(v, r)), u[g] = v;
}
}
return u;
},
insertPropertyAccessorsIntoJson:function(t) {
var n = i.jsonExpressionRewriting.parseJson(t), r = [];
for (var o in n) {
var a = n[o];
e(a) && (r.length > 0 && r.push(", "), r.push(o + " : function(__ko_value) { " + a + " = __ko_value; }"));
}
if (r.length > 0) {
var s = r.join("");
t = t + ", '_ko_property_writers' : { " + s + " } ";
}
return t;
}
};
}(), i.exportSymbol("ko.jsonExpressionRewriting", i.jsonExpressionRewriting), i.exportSymbol("ko.jsonExpressionRewriting.parseJson", i.jsonExpressionRewriting.parseJson), 
i.exportSymbol("ko.jsonExpressionRewriting.insertPropertyAccessorsIntoJson", i.jsonExpressionRewriting.insertPropertyAccessorsIntoJson), 
function() {
function n(e, n) {
try {
var r = " { " + i.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(e) + " } ";
return i.utils.evalWithinScope(r, null === n ? t :n);
} catch (o) {
throw new Error("Unable to parse binding attribute.\nMessage: " + o + ";\nAttribute value: " + e);
}
}
function r(t, e, n, i, r) {
t(e, n, i, r);
}
var o = "data-bind";
i.bindingHandlers = {}, i.applyBindingsToNode = function(t, e, a, s) {
function l(t) {
return function() {
return d[t];
};
}
function c() {
return d;
}
var u = !0;
s = s || o;
var d;
new i.dependentObservable(function() {
var o = "function" == typeof e ? e() :e;
if (d = o || n(t.getAttribute(s), a), u) for (var p in d) i.bindingHandlers[p] && "function" == typeof i.bindingHandlers[p].init && r(i.bindingHandlers[p].init, t, l(p), c, a);
for (var p in d) i.bindingHandlers[p] && "function" == typeof i.bindingHandlers[p].update && r(i.bindingHandlers[p].update, t, l(p), c, a);
}, null, {
disposeWhenNodeIsRemoved:t
}), u = !1;
}, i.applyBindings = function(n, r) {
if (r && r.nodeType == e) throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node (note: this is a breaking change since KO version 1.05)");
r = r || t.document.body;
var a = i.utils.getElementsHavingAttribute(r, o);
i.utils.arrayForEach(a, function(t) {
i.applyBindingsToNode(t, null, n);
});
}, i.exportSymbol("ko.bindingHandlers", i.bindingHandlers), i.exportSymbol("ko.applyBindings", i.applyBindings), 
i.exportSymbol("ko.applyBindingsToNode", i.applyBindingsToNode);
}();
var o = [ "click" ];
i.utils.arrayForEach(o, function(t) {
i.bindingHandlers[t] = {
init:function(e, n, r, o) {
var a = function() {
var e = {};
return e[t] = n(), e;
};
return i.bindingHandlers.event.init.call(this, e, a, r, o);
}
};
}), i.bindingHandlers.event = {
init:function(t, e, n, r) {
var o = e() || {};
for (var a in o) !function() {
var o = a;
"string" == typeof o && i.utils.registerEventHandler(t, o, function(t) {
var i, a = e()[o];
if (a) {
var s = n();
try {
i = a.apply(r, arguments);
} finally {
i !== !0 && (t.preventDefault ? t.preventDefault() :t.returnValue = !1);
}
var l = s[o + "Bubble"] !== !1;
l || (t.cancelBubble = !0, t.stopPropagation && t.stopPropagation());
}
});
}();
}
}, i.bindingHandlers.submit = {
init:function(t, e, n, r) {
if ("function" != typeof e()) throw new Error("The value for a submit binding must be a function to invoke on submit");
i.utils.registerEventHandler(t, "submit", function(n) {
var i, o = e();
try {
i = o.call(r, t);
} finally {
i !== !0 && (n.preventDefault ? n.preventDefault() :n.returnValue = !1);
}
});
}
}, i.bindingHandlers.visible = {
update:function(t, e) {
var n = i.utils.unwrapObservable(e()), r = !("none" == t.style.display);
n && !r ? t.style.display = "" :!n && r && (t.style.display = "none");
}
}, i.bindingHandlers.enable = {
update:function(t, e) {
var n = i.utils.unwrapObservable(e());
n && t.disabled ? t.removeAttribute("disabled") :n || t.disabled || (t.disabled = !0);
}
}, i.bindingHandlers.disable = {
update:function(t, e) {
i.bindingHandlers.enable.update(t, function() {
return !i.utils.unwrapObservable(e());
});
}
}, i.bindingHandlers.value = {
init:function(t, e, n) {
var r = [ "change" ], o = n().valueUpdate;
o && ("string" == typeof o && (o = [ o ]), i.utils.arrayPushAll(r, o), r = i.utils.arrayGetDistinctValues(r)), 
i.utils.arrayForEach(r, function(r) {
var o = !1;
i.utils.stringStartsWith(r, "after") && (o = !0, r = r.substring("after".length));
var a = o ? function(t) {
setTimeout(t, 0);
} :function(t) {
t();
};
i.utils.registerEventHandler(t, r, function() {
a(function() {
var r = e(), o = i.selectExtensions.readValue(t);
if (i.isWriteableObservable(r)) r(o); else {
var a = n();
a._ko_property_writers && a._ko_property_writers.value && a._ko_property_writers.value(o);
}
});
});
});
},
update:function(t, e) {
var n = i.utils.unwrapObservable(e()), r = i.selectExtensions.readValue(t), o = n != r;
if (0 === n && 0 !== r && "0" !== r && (o = !0), o) {
var a = function() {
i.selectExtensions.writeValue(t, n);
};
a();
var s = "SELECT" == t.tagName;
s && setTimeout(a, 0);
}
"SELECT" == t.tagName && (r = i.selectExtensions.readValue(t), r !== n && i.utils.triggerEvent(t, "change"));
}
}, i.bindingHandlers.options = {
update:function(t, n, r) {
if ("SELECT" != t.tagName) throw new Error("options binding applies only to SELECT elements");
{
var o = i.utils.arrayMap(i.utils.arrayFilter(t.childNodes, function(t) {
return t.tagName && "OPTION" == t.tagName && t.selected;
}), function(t) {
return i.selectExtensions.readValue(t) || t.innerText || t.textContent;
}), a = t.scrollTop, s = i.utils.unwrapObservable(n());
t.value;
}
if (i.utils.emptyDomNode(t), s) {
var l = r();
if ("number" != typeof s.length && (s = [ s ]), l.optionsCaption) {
var c = document.createElement("OPTION");
c.innerHTML = l.optionsCaption, i.selectExtensions.writeValue(c, e), t.appendChild(c);
}
for (var u = 0, d = s.length; d > u; u++) {
var c = document.createElement("OPTION"), p = "string" == typeof l.optionsValue ? s[u][l.optionsValue] :s[u];
p = i.utils.unwrapObservable(p), i.selectExtensions.writeValue(c, p);
var h = l.optionsText;
optionText = "function" == typeof h ? h(s[u]) :"string" == typeof h ? s[u][h] :p, 
(null === optionText || optionText === e) && (optionText = ""), optionText = i.utils.unwrapObservable(optionText).toString(), 
"string" == typeof c.innerText ? c.innerText = optionText :c.textContent = optionText, 
t.appendChild(c);
}
for (var f = t.getElementsByTagName("OPTION"), m = 0, u = 0, d = f.length; d > u; u++) i.utils.arrayIndexOf(o, i.selectExtensions.readValue(f[u])) >= 0 && (i.utils.setOptionNodeSelectionState(f[u], !0), 
m++);
a && (t.scrollTop = a);
}
}
}, i.bindingHandlers.options.optionValueDomDataKey = "__ko.bindingHandlers.options.optionValueDomData__", 
i.bindingHandlers.selectedOptions = {
getSelectedValuesFromSelectNode:function(t) {
for (var e = [], n = t.childNodes, r = 0, o = n.length; o > r; r++) {
var a = n[r];
"OPTION" == a.tagName && a.selected && e.push(i.selectExtensions.readValue(a));
}
return e;
},
init:function(t, e, n) {
i.utils.registerEventHandler(t, "change", function() {
var t = e();
if (i.isWriteableObservable(t)) t(i.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this)); else {
var r = n();
r._ko_property_writers && r._ko_property_writers.value && r._ko_property_writers.value(i.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this));
}
});
},
update:function(t, e) {
if ("SELECT" != t.tagName) throw new Error("values binding applies only to SELECT elements");
var n = i.utils.unwrapObservable(e());
if (n && "number" == typeof n.length) for (var r = t.childNodes, o = 0, a = r.length; a > o; o++) {
var s = r[o];
"OPTION" == s.tagName && i.utils.setOptionNodeSelectionState(s, i.utils.arrayIndexOf(n, i.selectExtensions.readValue(s)) >= 0);
}
}
}, i.bindingHandlers.text = {
update:function(t, n) {
var r = i.utils.unwrapObservable(n());
(null === r || r === e) && (r = ""), "string" == typeof t.innerText ? t.innerText = r :t.textContent = r;
}
}, i.bindingHandlers.html = {
update:function(t, e) {
var n = i.utils.unwrapObservable(e());
i.utils.setHtml(t, n);
}
}, i.bindingHandlers.css = {
update:function(t, e) {
var n = i.utils.unwrapObservable(e() || {});
for (var r in n) if ("string" == typeof r) {
var o = i.utils.unwrapObservable(n[r]);
i.utils.toggleDomNodeCssClass(t, r, o);
}
}
}, i.bindingHandlers.style = {
update:function(t, e) {
var n = i.utils.unwrapObservable(e() || {});
for (var r in n) if ("string" == typeof r) {
var o = i.utils.unwrapObservable(n[r]);
t.style[r] = o || "";
}
}
}, i.bindingHandlers.uniqueName = {
init:function(t, e) {
e() && (t.name = "ko_unique_" + ++i.bindingHandlers.uniqueName.currentIndex, i.utils.isIe6 && t.mergeAttributes(document.createElement("<input name='" + t.name + "'/>"), !1));
}
}, i.bindingHandlers.uniqueName.currentIndex = 0, i.bindingHandlers.checked = {
init:function(t, e, n) {
var r = function() {
var r;
if ("checkbox" == t.type) r = t.checked; else {
if ("radio" != t.type || !t.checked) return;
r = t.value;
}
var o = e();
if ("checkbox" == t.type && i.utils.unwrapObservable(o) instanceof Array) {
var a = i.utils.arrayIndexOf(i.utils.unwrapObservable(o), t.value);
t.checked && 0 > a ? o.push(t.value) :!t.checked && a >= 0 && o.splice(a, 1);
} else if (i.isWriteableObservable(o)) o() !== r && o(r); else {
var s = n();
s._ko_property_writers && s._ko_property_writers.checked && s._ko_property_writers.checked(r);
}
};
i.utils.registerEventHandler(t, "click", r), "radio" != t.type || t.name || i.bindingHandlers.uniqueName.init(t, function() {
return !0;
});
},
update:function(t, e) {
var n = i.utils.unwrapObservable(e());
"checkbox" == t.type ? (t.checked = n instanceof Array ? i.utils.arrayIndexOf(n, t.value) >= 0 :n, 
n && i.utils.isIe6 && t.mergeAttributes(document.createElement("<input type='checkbox' checked='checked' />"), !1)) :"radio" == t.type && (t.checked = t.value == n, 
t.value == n && (i.utils.isIe6 || i.utils.isIe7) && t.mergeAttributes(document.createElement("<input type='radio' checked='checked' />"), !1));
}
}, i.bindingHandlers.attr = {
update:function(t, n) {
var r = i.utils.unwrapObservable(n()) || {};
for (var o in r) if ("string" == typeof o) {
var a = i.utils.unwrapObservable(r[o]);
a === !1 || null === a || a === e ? t.removeAttribute(o) :t.setAttribute(o, a.toString());
}
}
}, i.templateEngine = function() {
this.renderTemplate = function() {
throw "Override renderTemplate in your ko.templateEngine subclass";
}, this.isTemplateRewritten = function() {
throw "Override isTemplateRewritten in your ko.templateEngine subclass";
}, this.rewriteTemplate = function() {
throw "Override rewriteTemplate in your ko.templateEngine subclass";
}, this.createJavaScriptEvaluatorBlock = function() {
throw "Override createJavaScriptEvaluatorBlock in your ko.templateEngine subclass";
};
}, i.exportSymbol("ko.templateEngine", i.templateEngine), i.templateRewriting = function() {
var t = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi;
return {
ensureTemplateIsRewritten:function(t, e) {
e.isTemplateRewritten(t) || e.rewriteTemplate(t, function(t) {
return i.templateRewriting.memoizeBindingAttributeSyntax(t, e);
});
},
memoizeBindingAttributeSyntax:function(e, n) {
return e.replace(t, function() {
var t = arguments[1], e = arguments[6];
e = i.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(e);
var r = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                     return (function() { return { " + e + " } })()                 })";
return n.createJavaScriptEvaluatorBlock(r) + t;
});
},
applyMemoizedBindingsToNextSibling:function(t) {
return i.memoization.memoize(function(e, n) {
e.nextSibling && i.applyBindingsToNode(e.nextSibling, t, n);
});
}
};
}(), i.exportSymbol("ko.templateRewriting", i.templateRewriting), i.exportSymbol("ko.templateRewriting.applyMemoizedBindingsToNextSibling", i.templateRewriting.applyMemoizedBindingsToNextSibling), 
function() {
function t(t) {
return t.nodeType ? t :t.length > 0 ? t[0] :null;
}
function n(t, e, n, r, a) {
var s = i.utils.unwrapObservable(r);
a = a || {};
var l = a.templateEngine || o;
i.templateRewriting.ensureTemplateIsRewritten(n, l);
var c = l.renderTemplate(n, s, a);
if ("number" != typeof c.length || c.length > 0 && "number" != typeof c[0].nodeType) throw "Template engine must return an array of DOM nodes";
switch (c && i.utils.arrayForEach(c, function(t) {
i.memoization.unmemoizeDomNodeAndDescendants(t, [ r ]);
}), e) {
case "replaceChildren":
i.utils.setDomNodeChildren(t, c);
break;

case "replaceNode":
i.utils.replaceDomNodes(t, c);
break;

case "ignoreTargetNode":
break;

default:
throw new Error("Unknown renderMode: " + e);
}
return a.afterRender && a.afterRender(c, r), c;
}
function r(t, e) {
var n = i.utils.domData.get(t, a);
n && "function" == typeof n.dispose && n.dispose(), i.utils.domData.set(t, a, e);
}
var o;
i.setTemplateEngine = function(t) {
if (t != e && !(t instanceof i.templateEngine)) throw "templateEngine must inherit from ko.templateEngine";
o = t;
}, i.renderTemplate = function(r, a, s, l, c) {
if (s = s || {}, (s.templateEngine || o) == e) throw "Set a template engine before calling renderTemplate";
if (c = c || "replaceChildren", l) {
var u = t(l), d = function() {
return !u || !i.utils.domNodeIsAttachedToDocument(u);
}, p = u && "replaceNode" == c ? u.parentNode :u;
return new i.dependentObservable(function() {
var e = "function" == typeof r ? r(a) :r, i = n(l, c, e, a, s);
"replaceNode" == c && (l = i, u = t(l));
}, null, {
disposeWhen:d,
disposeWhenNodeIsRemoved:p
});
}
return i.memoization.memoize(function(t) {
i.renderTemplate(r, a, s, t, "replaceNode");
});
}, i.renderTemplateForEach = function(t, e, r, o) {
return new i.dependentObservable(function() {
var a = i.utils.unwrapObservable(e) || [];
"undefined" == typeof a.length && (a = [ a ]);
var s = i.utils.arrayFilter(a, function(t) {
return r.includeDestroyed || !t._destroy;
});
i.utils.setDomNodeChildrenFromArrayMapping(o, s, function(e) {
var i = "function" == typeof t ? t(e) :t;
return n(null, "ignoreTargetNode", i, e, r);
}, r);
}, null, {
disposeWhenNodeIsRemoved:o
});
};
var a = "__ko__templateSubscriptionDomDataKey__";
i.bindingHandlers.template = {
update:function(t, e, n, o) {
var a, s = i.utils.unwrapObservable(e()), l = "string" == typeof s ? s :s.name;
if ("undefined" != typeof s.foreach) a = i.renderTemplateForEach(l, s.foreach || [], {
templateOptions:s.templateOptions,
afterAdd:s.afterAdd,
beforeRemove:s.beforeRemove,
includeDestroyed:s.includeDestroyed,
afterRender:s.afterRender
}, t); else {
var c = s.data;
a = i.renderTemplate(l, "undefined" == typeof c ? o :c, {
templateOptions:s.templateOptions,
afterRender:s.afterRender
}, t);
}
r(t, a);
}
};
}(), i.exportSymbol("ko.setTemplateEngine", i.setTemplateEngine), i.exportSymbol("ko.renderTemplate", i.renderTemplate), 
function() {
function t(t, n, i) {
for (var r = [], o = 0; o <= n.length; o++) r[o] = [];
for (var o = 0, a = Math.min(t.length, i); a >= o; o++) r[0][o] = o;
for (var o = 1, a = Math.min(n.length, i); a >= o; o++) r[o][0] = o;
var s, l, c = t.length, u = n.length;
for (s = 1; c >= s; s++) {
var d = Math.max(1, s - i), p = Math.min(u, s + i);
for (l = d; p >= l; l++) if (t[s - 1] === n[l - 1]) r[l][s] = r[l - 1][s - 1]; else {
var h = r[l - 1][s] === e ? Number.MAX_VALUE :r[l - 1][s] + 1, f = r[l][s - 1] === e ? Number.MAX_VALUE :r[l][s - 1] + 1;
r[l][s] = Math.min(h, f);
}
}
return r;
}
function n(t, n, i) {
var r = n.length, o = i.length, a = [], s = t[o][r];
if (s === e) return null;
for (;r > 0 || o > 0; ) {
var l = t[o][r], c = o > 0 ? t[o - 1][r] :s + 1, u = r > 0 ? t[o][r - 1] :s + 1, d = o > 0 && r > 0 ? t[o - 1][r - 1] :s + 1;
(c === e || l - 1 > c) && (c = s + 1), (u === e || l - 1 > u) && (u = s + 1), l - 1 > d && (d = s + 1), 
u >= c && d > c ? (a.push({
status:"added",
value:i[o - 1]
}), o--) :c > u && d > u ? (a.push({
status:"deleted",
value:n[r - 1]
}), r--) :(a.push({
status:"retained",
value:n[r - 1]
}), o--, r--);
}
return a.reverse();
}
i.utils.compareArrays = function(r, o, a) {
if (a === e) return i.utils.compareArrays(r, o, 1) || i.utils.compareArrays(r, o, 10) || i.utils.compareArrays(r, o, Number.MAX_VALUE);
r = r || [], o = o || [];
var s = t(r, o, a);
return n(s, r, o);
};
}(), i.exportSymbol("ko.utils.compareArrays", i.utils.compareArrays), function() {
function t(t, e, n) {
var r = [], o = i.dependentObservable(function() {
var t = e(n) || [];
r.length > 0 && i.utils.replaceDomNodes(r, t), r.splice(0, r.length), i.utils.arrayPushAll(r, t);
}, null, {
disposeWhenNodeIsRemoved:t,
disposeWhen:function() {
return 0 == r.length || !i.utils.domNodeIsAttachedToDocument(r[0]);
}
});
return {
mappedNodes:r,
dependentObservable:o
};
}
i.utils.setDomNodeChildrenFromArrayMapping = function(n, r, o, a) {
r = r || [], a = a || {};
for (var s = i.utils.domData.get(n, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === e, l = i.utils.domData.get(n, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [], c = i.utils.arrayMap(l, function(t) {
return t.arrayEntry;
}), u = i.utils.compareArrays(c, r), d = [], p = 0, h = [], f = [], m = null, g = 0, v = u.length; v > g; g++) switch (u[g].status) {
case "retained":
var y = l[p];
d.push(y), y.domNodes.length > 0 && (m = y.domNodes[y.domNodes.length - 1]), p++;
break;

case "deleted":
l[p].dependentObservable.dispose(), i.utils.arrayForEach(l[p].domNodes, function(t) {
h.push({
element:t,
index:g,
value:u[g].value
}), m = t;
}), p++;
break;

case "added":
var b = t(n, o, u[g].value), w = b.mappedNodes;
d.push({
arrayEntry:u[g].value,
domNodes:w,
dependentObservable:b.dependentObservable
});
for (var _ = 0, k = w.length; k > _; _++) {
var x = w[_];
f.push({
element:x,
index:g,
value:u[g].value
}), null == m ? n.firstChild ? n.insertBefore(x, n.firstChild) :n.appendChild(x) :m.nextSibling ? n.insertBefore(x, m.nextSibling) :n.appendChild(x), 
m = x;
}
}
i.utils.arrayForEach(h, function(t) {
i.cleanNode(t.element);
});
var S = !1;
if (!s) {
if (a.afterAdd) for (var g = 0; g < f.length; g++) a.afterAdd(f[g].element, f[g].index, f[g].value);
if (a.beforeRemove) {
for (var g = 0; g < h.length; g++) a.beforeRemove(h[g].element, h[g].index, h[g].value);
S = !0;
}
}
S || i.utils.arrayForEach(h, function(t) {
t.element.parentNode && t.element.parentNode.removeChild(t.element);
}), i.utils.domData.set(n, "setDomNodeChildrenFromArrayMapping_lastMappingResult", d);
};
}(), i.exportSymbol("ko.utils.setDomNodeChildrenFromArrayMapping", i.utils.setDomNodeChildrenFromArrayMapping), 
i.jqueryTmplTemplateEngine = function() {
this.jQueryTmplVersion = function() {
return "undefined" != typeof jQuery && jQuery.tmpl ? jQuery.tmpl.tag ? jQuery.tmpl.tag.tmpl && jQuery.tmpl.tag.tmpl.open && jQuery.tmpl.tag.tmpl.open.toString().indexOf("__") >= 0 ? 3 :2 :1 :0;
}(), this.getTemplateNode = function(t) {
var e = document.getElementById(t);
if (null == e) throw new Error("Cannot find template with ID=" + t);
return e;
};
var t = "__ko_apos__", e = new RegExp(t, "g");
this.renderTemplate = function(t, n, i) {
if (i = i || {}, 0 == this.jQueryTmplVersion) throw new Error("jquery.tmpl not detected.\nTo use KO's default template engine, reference jQuery and jquery.tmpl. See Knockout installation documentation for more details.");
if (1 == this.jQueryTmplVersion) {
var r = '<script type="text/html">' + this.getTemplateNode(t).text + "</script>", o = jQuery.tmpl(r, n), a = o[0].text.replace(e, "'");
return jQuery.clean([ a ], document);
}
if (!(t in jQuery.template)) {
var s = this.getTemplateNode(t).text;
jQuery.template(t, s);
}
n = [ n ];
var l = jQuery.tmpl(t, n, i.templateOptions);
return l.appendTo(document.createElement("div")), jQuery.fragments = {}, l;
}, this.isTemplateRewritten = function(t) {
return t in jQuery.template ? !0 :this.getTemplateNode(t).isRewritten === !0;
}, this.rewriteTemplate = function(e, n) {
var r = this.getTemplateNode(e);
text = r.text.replace(/([\w-]+)=([\w-]+)([ >])/g, function(t, e, n, i) {
return e + '="' + n + '"' + i;
});
var o = n(text);
1 == this.jQueryTmplVersion && (o = i.utils.stringTrim(o), o = o.replace(/([\s\S]*?)(\${[\s\S]*?}|{{[\=a-z][\s\S]*?}}|$)/g, function() {
var e = arguments[1], n = arguments[2];
return e.replace(/\'/g, t) + n;
})), r.text = o, r.isRewritten = !0;
}, this.createJavaScriptEvaluatorBlock = function(t) {
return 1 == this.jQueryTmplVersion ? "{{= " + t + "}}" :"{{ko_code ((function() { return " + t + " })()) }}";
}, this.addTemplate = function(t, e) {
document.write("<script type='text/html' id='" + t + "'>" + e + "</script>");
}, i.exportProperty(this, "addTemplate", this.addTemplate), this.jQueryTmplVersion > 1 && (jQuery.tmpl.tag.ko_code = {
open:(this.jQueryTmplVersion < 3 ? "_" :"__") + ".push($1 || '');"
});
}, i.jqueryTmplTemplateEngine.prototype = new i.templateEngine(), i.setTemplateEngine(new i.jqueryTmplTemplateEngine()), 
i.exportSymbol("ko.jqueryTmplTemplateEngine", i.jqueryTmplTemplateEngine);
}(window), ko.exportSymbol = function(t, e) {
for (var n = t.split("."), i = window, r = 0; r < n.length - 1; r++) i = i[n[r]];
i[n[n.length - 1]] = e;
}, ko.exportProperty = function(t, e, n) {
t[e] = n;
}, function() {
function t(e, n) {
for (var i in n) n.hasOwnProperty(i) && n[i] && (!e[i] || e[i] instanceof Array ? e[i] = n[i] :t(e[i], n[i]));
}
function e(e, n) {
var i = {};
return t(i, e), t(i, n), i;
}
function n(t) {
return t && "object" == typeof t && t.constructor == new Date().constructor ? "date" :typeof t;
}
function i(t, e) {
return t = t || {}, (t.create instanceof Function || t.key instanceof Function || t.arrayChanged instanceof Function) && (t = {
"":t
}), e && (t.ignore = r(e.ignore, t.ignore), t.include = r(e.include, t.include), 
t.copy = r(e.copy, t.copy)), t.ignore = r(t.ignore, y.ignore), t.include = r(t.include, y.include), 
t.copy = r(t.copy, y.copy), t.mappedProperties = {}, t;
}
function r(t, e) {
return t instanceof Array || (t = "undefined" === n(t) ? [] :[ t ]), e instanceof Array || (e = "undefined" === n(e) ? [] :[ e ]), 
t.concat(e);
}
function o(t) {
var e = ko.dependentObservable;
ko.dependentObservable = function() {
var t = arguments[2] || {};
t.deferEvaluation = !0;
var e = new g(arguments[0], arguments[1], t);
return e.__ko_proto__ = g, e;
};
var n = t();
return ko.dependentObservable = e, n;
}
function a(t, i, r, l, h, g, v) {
var y = ko.utils.unwrapObservable(i) instanceof Array;
if (v = v || "", ko.mapping.isMapped(t)) {
var b = ko.utils.unwrapObservable(t)[m];
r = e(b, r);
}
var w = function() {
return r[h] && r[h].create instanceof Function;
};
if (l = l || new f(), l.get(i)) return t;
if (h = h || "", y) {
var _ = [], k = function(t) {
return t;
};
r[h] && r[h].key && (k = r[h].key);
var x = function(t) {
return t;
};
w() && (x = function(t) {
return r[h].create({
data:t,
parent:g
});
}), ko.isObservable(t) || (t = ko.observableArray([]), t.mappedRemove = function(e) {
var n = "function" == typeof e ? e :function(t) {
return t === k(e);
};
return t.remove(function(t) {
return n(k(t));
});
}, t.mappedRemoveAll = function(e) {
var n = u(e, k);
return t.remove(function(t) {
return -1 != ko.utils.arrayIndexOf(n, k(t));
});
}, t.mappedDestroy = function(e) {
var n = "function" == typeof e ? e :function(t) {
return t === k(e);
};
return t.destroy(function(t) {
return n(k(t));
});
}, t.mappedDestroyAll = function(e) {
var n = u(e, k);
return t.destroy(function(t) {
return -1 != ko.utils.arrayIndexOf(n, k(t));
});
}, t.mappedIndexOf = function(e) {
var n = u(t(), k), i = k(e);
return ko.utils.arrayIndexOf(n, i);
}, t.mappedCreate = function(e) {
if (-1 !== t.mappedIndexOf(e)) throw new Error("There already is an object with the key that you specified.");
var n = x(e);
return t.push(n), n;
});
for (var S = u(ko.utils.unwrapObservable(t), k).sort(), E = u(i, k).sort(), C = ko.utils.compareArrays(S, E), T = {}, $ = [], I = 0, A = C.length; A > I; I++) {
var B, O = C[I], D = v + "[" + I + "]";
switch (O.status) {
case "added":
var M = c(ko.utils.unwrapObservable(i), O.value, k);
B = ko.utils.unwrapObservable(a(void 0, M, r, l, h, t, D));
var N = s(ko.utils.unwrapObservable(i), M, T);
$[N] = B, T[N] = !0;
break;

case "retained":
var M = c(ko.utils.unwrapObservable(i), O.value, k);
B = c(t, O.value, k), a(B, M, r, l, h, t, D);
var N = s(ko.utils.unwrapObservable(i), M, T);
$[N] = B, T[N] = !0;
break;

case "deleted":
B = c(t, O.value, k);
}
_.push({
event:O.status,
item:B
});
}
t($), r[h] && r[h].arrayChanged && ko.utils.arrayForEach(_, function(t) {
r[h].arrayChanged(t.event, t.item);
});
} else if (p(i)) {
if (!t) {
if (w()) {
var P = o(function() {
return r[h].create({
data:i,
parent:g
});
});
return P;
}
t = {};
}
l.save(i, t), d(i, function(e) {
var n = v.length ? v + "." + e :e;
if (-1 == ko.utils.arrayIndexOf(r.ignore, n)) {
if (-1 != ko.utils.arrayIndexOf(r.copy, n)) return t[e] = i[e], void 0;
var o = l.get(i[e]);
t[e] = o ? o :a(t[e], i[e], r, l, e, t, n), r.mappedProperties[n] = !0;
}
});
} else switch (n(i)) {
case "function":
t = i;
break;

default:
ko.isWriteableObservable(t) ? t(ko.utils.unwrapObservable(i)) :t = w() ? o(function() {
return r[h].create({
data:i,
parent:g
});
}) :ko.observable(ko.utils.unwrapObservable(i));
}
return t;
}
function s(t, e, n) {
for (var i = 0, r = t.length; r > i; i++) if (n[i] !== !0 && t[i] == e) return i;
return null;
}
function l(t, e) {
var i;
return e && (i = e(t)), "undefined" === n(i) && (i = t), ko.utils.unwrapObservable(i);
}
function c(t, e, n) {
var i = ko.utils.arrayFilter(ko.utils.unwrapObservable(t), function(t) {
return l(t, n) == e;
});
if (0 == i.length) throw new Error("When calling ko.update*, the key '" + e + "' was not found!");
if (i.length > 1 && p(i[0])) throw new Error("When calling ko.update*, the key '" + e + "' was not unique!");
return i[0];
}
function u(t, e) {
return ko.utils.arrayMap(ko.utils.unwrapObservable(t), function(t) {
return e ? l(t, e) :t;
});
}
function d(t, e) {
if (t instanceof Array) for (var n = 0; n < t.length; n++) e(n); else for (var i in t) e(i);
}
function p(t) {
var e = n(t);
return "object" == e && null !== t && "undefined" !== e;
}
function h(t, e, n) {
var i = t || "";
return e instanceof Array ? t && (i += "[" + n + "]") :(t && (i += "."), i += n), 
i;
}
function f() {
var t = [], e = [];
this.save = function(n, i) {
var r = ko.utils.arrayIndexOf(t, n);
r >= 0 ? e[r] = i :(t.push(n), e.push(i));
}, this.get = function(n) {
var i = ko.utils.arrayIndexOf(t, n);
return i >= 0 ? e[i] :void 0;
};
}
ko.mapping = {};
var m = "__ko_mapping__", g = ko.dependentObservable, v = {
include:[ "_destroy" ],
ignore:[],
copy:[]
}, y = v;
ko.mapping.fromJS = function(t, n, r) {
if (0 == arguments.length) throw new Error("When calling ko.fromJS, pass the object you want to convert.");
n = i(n);
var o = a(r, t, n);
return o[m] = e(o[m], n), o;
}, ko.mapping.fromJSON = function(t, e) {
var n = ko.utils.parseJson(t);
return ko.mapping.fromJS(n, e);
}, ko.mapping.isMapped = function(t) {
var e = ko.utils.unwrapObservable(t);
return e && e[m];
}, ko.mapping.updateFromJS = function(t, e) {
if (arguments.length < 2) throw new Error("When calling ko.updateFromJS, pass: the object to update and the object you want to update from.");
if (!t) throw new Error("The object is undefined.");
if (!t[m]) throw new Error("The object you are trying to update was not created by a 'fromJS' or 'fromJSON' mapping.");
return a(t, e, t[m]);
}, ko.mapping.updateFromJSON = function(t, e, n) {
var i = ko.utils.parseJson(e);
return ko.mapping.updateFromJS(t, i, n);
}, ko.mapping.toJS = function(t, e) {
if (y || ko.mapping.resetDefaultOptions(), 0 == arguments.length) throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.");
if (!(y.ignore instanceof Array)) throw new Error("ko.mapping.defaultOptions().ignore should be an array.");
if (!(y.include instanceof Array)) throw new Error("ko.mapping.defaultOptions().include should be an array.");
if (!(y.copy instanceof Array)) throw new Error("ko.mapping.defaultOptions().copy should be an array.");
return e = i(e, t[m]), ko.mapping.visitModel(t, function(t) {
return ko.utils.unwrapObservable(t);
}, e);
}, ko.mapping.toJSON = function(t, e) {
var n = ko.mapping.toJS(t, e);
return ko.utils.stringifyJson(n);
}, ko.mapping.defaultOptions = function() {
return arguments.length > 0 ? (y = arguments[0], void 0) :y;
}, ko.mapping.resetDefaultOptions = function() {
y = {
include:v.include.slice(0),
ignore:v.ignore.slice(0),
copy:v.copy.slice(0)
};
}, ko.mapping.visitModel = function(t, e, r) {
r = r || {}, r.visitedObjects = r.visitedObjects || new f(), r.parentName || (r = i(r));
var o, a = ko.utils.unwrapObservable(t);
if (!p(a)) return e(t, r.parentName);
e(t, r.parentName), o = a instanceof Array ? [] :{}, r.visitedObjects.save(t, o);
var s = r.parentName;
return d(a, function(t) {
if (!r.ignore || -1 == ko.utils.arrayIndexOf(r.ignore, t)) {
var i = a[t];
if (r.parentName = h(s, a, t), -1 !== ko.utils.arrayIndexOf(r.copy, t) || -1 !== ko.utils.arrayIndexOf(r.include, t) || !a[m] || !a[m].mappedProperties || a[m].mappedProperties[t] || a instanceof Array) {
switch (n(ko.utils.unwrapObservable(i))) {
case "object":
case "undefined":
var l = r.visitedObjects.get(i);
o[t] = "undefined" !== n(l) ? l :ko.mapping.visitModel(i, e, r);
break;

default:
o[t] = e(i, r.parentName);
}
}
}
}), o;
}, ko.exportSymbol("ko.mapping", ko.mapping), ko.exportSymbol("ko.mapping.fromJS", ko.mapping.fromJS), 
ko.exportSymbol("ko.mapping.fromJSON", ko.mapping.fromJSON), ko.exportSymbol("ko.mapping.isMapped", ko.mapping.isMapped), 
ko.exportSymbol("ko.mapping.defaultOptions", ko.mapping.defaultOptions), ko.exportSymbol("ko.mapping.toJS", ko.mapping.toJS), 
ko.exportSymbol("ko.mapping.toJSON", ko.mapping.toJSON), ko.exportSymbol("ko.mapping.updateFromJS", ko.mapping.updateFromJS), 
ko.exportSymbol("ko.mapping.updateFromJSON", ko.mapping.updateFromJSON), ko.exportSymbol("ko.mapping.visitModel", ko.mapping.visitModel);
}(), function(t) {
var e = "data-bind";
t.currentlyBindingNamespace = "", t.applyBindings = function(n, i, r) {
i && void 0 !== i.nodeType ? (r = i, i = "") :(i = i || "", r = r || window.document.body), 
t.currentlyBindingNamespace = i;
var o = i.length > 0 ? "-" + i :"", a = e + o, s = t.utils.getElementsHavingAttribute(r, a);
t.utils.arrayForEach(s, function(e) {
t.applyBindingsToNode(e, null, n, a);
}), t.currentlyBindingNamespace = "";
}, t.templateRewriting = function() {
var e = /(<[a-z]+\d*(\s+(?!data-bind(-[a-z0-9\-]*)?=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind(-[a-z0-9\-]*)?=(["'])([\s\S]*?)\7/gi;
return {
ensureTemplateIsRewritten:function(e, n) {
n.isTemplateRewritten(e) || n.rewriteTemplate(e, function(e) {
return t.templateRewriting.memoizeBindingAttributeSyntax(e, n);
});
},
memoizeBindingAttributeSyntax:function(n, i) {
return n.replace(e, function(e) {
var n = arguments[1], r = arguments[8], o = arguments[6] ? arguments[6].slice(1) :"";
if ("" === o || o === t.currentlyBindingNamespace) {
r = t.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(r);
var a = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                         return (function() { return { " + r + " } })()                     })";
return i.createJavaScriptEvaluatorBlock(a) + n;
}
return e;
});
},
applyMemoizedBindingsToNextSibling:function(e) {
return t.memoization.memoize(function(n, i) {
n.nextSibling && t.applyBindingsToNode(n.nextSibling, e, i);
});
}
};
}();
}(ko), function() {
function t(e, n, i) {
if (e === n) return 0 !== e || 1 / e == 1 / n;
if (null == e || null == n) return e === n;
if (e._chain && (e = e._wrapped), n._chain && (n = n._wrapped), e.isEqual && x.isFunction(e.isEqual)) return e.isEqual(n);
if (n.isEqual && x.isFunction(n.isEqual)) return n.isEqual(e);
var r = c.call(e);
if (r != c.call(n)) return !1;
switch (r) {
case "[object String]":
return e == String(n);

case "[object Number]":
return e != +e ? n != +n :0 == e ? 1 / e == 1 / n :e == +n;

case "[object Date]":
case "[object Boolean]":
return +e == +n;

case "[object RegExp]":
return e.source == n.source && e.global == n.global && e.multiline == n.multiline && e.ignoreCase == n.ignoreCase;
}
if ("object" != typeof e || "object" != typeof n) return !1;
for (var o = i.length; o--; ) if (i[o] == e) return !0;
i.push(e);
var a = 0, s = !0;
if ("[object Array]" == r) {
if (a = e.length, s = a == n.length) for (;a-- && (s = a in e == a in n && t(e[a], n[a], i)); ) ;
} else {
if ("constructor" in e != "constructor" in n || e.constructor != n.constructor) return !1;
for (var l in e) if (x.has(e, l) && (a++, !(s = x.has(n, l) && t(e[l], n[l], i)))) break;
if (s) {
for (l in n) if (x.has(n, l) && !a--) break;
s = !a;
}
}
return i.pop(), s;
}
var e = this, n = e._, i = {}, r = Array.prototype, o = Object.prototype, a = Function.prototype, s = r.slice, l = r.unshift, c = o.toString, u = o.hasOwnProperty, d = r.forEach, p = r.map, h = r.reduce, f = r.reduceRight, m = r.filter, g = r.every, v = r.some, y = r.indexOf, b = r.lastIndexOf, w = Array.isArray, _ = Object.keys, k = a.bind, x = function(t) {
return new A(t);
};
"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), 
exports._ = x) :e._ = x, x.VERSION = "1.3.1";
var S = x.each = x.forEach = function(t, e, n) {
if (null != t) if (d && t.forEach === d) t.forEach(e, n); else if (t.length === +t.length) {
for (var r = 0, o = t.length; o > r; r++) if (r in t && e.call(n, t[r], r, t) === i) return;
} else for (var a in t) if (x.has(t, a) && e.call(n, t[a], a, t) === i) return;
};
x.map = x.collect = function(t, e, n) {
var i = [];
return null == t ? i :p && t.map === p ? t.map(e, n) :(S(t, function(t, r, o) {
i[i.length] = e.call(n, t, r, o);
}), t.length === +t.length && (i.length = t.length), i);
}, x.reduce = x.foldl = x.inject = function(t, e, n, i) {
var r = arguments.length > 2;
if (null == t && (t = []), h && t.reduce === h) return i && (e = x.bind(e, i)), 
r ? t.reduce(e, n) :t.reduce(e);
if (S(t, function(t, o, a) {
r ? n = e.call(i, n, t, o, a) :(n = t, r = !0);
}), !r) throw new TypeError("Reduce of empty array with no initial value");
return n;
}, x.reduceRight = x.foldr = function(t, e, n, i) {
var r = arguments.length > 2;
if (null == t && (t = []), f && t.reduceRight === f) return i && (e = x.bind(e, i)), 
r ? t.reduceRight(e, n) :t.reduceRight(e);
var o = x.toArray(t).reverse();
return i && !r && (e = x.bind(e, i)), r ? x.reduce(o, e, n, i) :x.reduce(o, e);
}, x.find = x.detect = function(t, e, n) {
var i;
return E(t, function(t, r, o) {
return e.call(n, t, r, o) ? (i = t, !0) :void 0;
}), i;
}, x.filter = x.select = function(t, e, n) {
var i = [];
return null == t ? i :m && t.filter === m ? t.filter(e, n) :(S(t, function(t, r, o) {
e.call(n, t, r, o) && (i[i.length] = t);
}), i);
}, x.reject = function(t, e, n) {
var i = [];
return null == t ? i :(S(t, function(t, r, o) {
e.call(n, t, r, o) || (i[i.length] = t);
}), i);
}, x.every = x.all = function(t, e, n) {
var r = !0;
return null == t ? r :g && t.every === g ? t.every(e, n) :(S(t, function(t, o, a) {
return (r = r && e.call(n, t, o, a)) ? void 0 :i;
}), r);
};
var E = x.some = x.any = function(t, e, n) {
e || (e = x.identity);
var r = !1;
return null == t ? r :v && t.some === v ? t.some(e, n) :(S(t, function(t, o, a) {
return r || (r = e.call(n, t, o, a)) ? i :void 0;
}), !!r);
};
x.include = x.contains = function(t, e) {
var n = !1;
return null == t ? n :y && t.indexOf === y ? -1 != t.indexOf(e) :n = E(t, function(t) {
return t === e;
});
}, x.invoke = function(t, e) {
var n = s.call(arguments, 2);
return x.map(t, function(t) {
return (x.isFunction(e) ? e || t :t[e]).apply(t, n);
});
}, x.pluck = function(t, e) {
return x.map(t, function(t) {
return t[e];
});
}, x.max = function(t, e, n) {
if (!e && x.isArray(t)) return Math.max.apply(Math, t);
if (!e && x.isEmpty(t)) return -1/0;
var i = {
computed:-1/0
};
return S(t, function(t, r, o) {
var a = e ? e.call(n, t, r, o) :t;
a >= i.computed && (i = {
value:t,
computed:a
});
}), i.value;
}, x.min = function(t, e, n) {
if (!e && x.isArray(t)) return Math.min.apply(Math, t);
if (!e && x.isEmpty(t)) return 1/0;
var i = {
computed:1/0
};
return S(t, function(t, r, o) {
var a = e ? e.call(n, t, r, o) :t;
a < i.computed && (i = {
value:t,
computed:a
});
}), i.value;
}, x.shuffle = function(t) {
var e, n = [];
return S(t, function(t, i) {
0 == i ? n[0] = t :(e = Math.floor(Math.random() * (i + 1)), n[i] = n[e], n[e] = t);
}), n;
}, x.sortBy = function(t, e, n) {
return x.pluck(x.map(t, function(t, i, r) {
return {
value:t,
criteria:e.call(n, t, i, r)
};
}).sort(function(t, e) {
var n = t.criteria, i = e.criteria;
return i > n ? -1 :n > i ? 1 :0;
}), "value");
}, x.groupBy = function(t, e) {
var n = {}, i = x.isFunction(e) ? e :function(t) {
return t[e];
};
return S(t, function(t, e) {
var r = i(t, e);
(n[r] || (n[r] = [])).push(t);
}), n;
}, x.sortedIndex = function(t, e, n) {
n || (n = x.identity);
for (var i = 0, r = t.length; r > i; ) {
var o = i + r >> 1;
n(t[o]) < n(e) ? i = o + 1 :r = o;
}
return i;
}, x.toArray = function(t) {
return t ? t.toArray ? t.toArray() :x.isArray(t) ? s.call(t) :x.isArguments(t) ? s.call(t) :x.values(t) :[];
}, x.size = function(t) {
return x.toArray(t).length;
}, x.first = x.head = function(t, e, n) {
return null == e || n ? t[0] :s.call(t, 0, e);
}, x.initial = function(t, e, n) {
return s.call(t, 0, t.length - (null == e || n ? 1 :e));
}, x.last = function(t, e, n) {
return null == e || n ? t[t.length - 1] :s.call(t, Math.max(t.length - e, 0));
}, x.rest = x.tail = function(t, e, n) {
return s.call(t, null == e || n ? 1 :e);
}, x.compact = function(t) {
return x.filter(t, function(t) {
return !!t;
});
}, x.flatten = function(t, e) {
return x.reduce(t, function(t, n) {
return x.isArray(n) ? t.concat(e ? n :x.flatten(n)) :(t[t.length] = n, t);
}, []);
}, x.without = function(t) {
return x.difference(t, s.call(arguments, 1));
}, x.uniq = x.unique = function(t, e, n) {
var i = n ? x.map(t, n) :t, r = [];
return x.reduce(i, function(n, i, o) {
return 0 != o && (e === !0 ? x.last(n) == i :x.include(n, i)) || (n[n.length] = i, 
r[r.length] = t[o]), n;
}, []), r;
}, x.union = function() {
return x.uniq(x.flatten(arguments, !0));
}, x.intersection = x.intersect = function(t) {
var e = s.call(arguments, 1);
return x.filter(x.uniq(t), function(t) {
return x.every(e, function(e) {
return x.indexOf(e, t) >= 0;
});
});
}, x.difference = function(t) {
var e = x.flatten(s.call(arguments, 1));
return x.filter(t, function(t) {
return !x.include(e, t);
});
}, x.zip = function() {
for (var t = s.call(arguments), e = x.max(x.pluck(t, "length")), n = new Array(e), i = 0; e > i; i++) n[i] = x.pluck(t, "" + i);
return n;
}, x.indexOf = function(t, e, n) {
if (null == t) return -1;
var i, r;
if (n) return i = x.sortedIndex(t, e), t[i] === e ? i :-1;
if (y && t.indexOf === y) return t.indexOf(e);
for (i = 0, r = t.length; r > i; i++) if (i in t && t[i] === e) return i;
return -1;
}, x.lastIndexOf = function(t, e) {
if (null == t) return -1;
if (b && t.lastIndexOf === b) return t.lastIndexOf(e);
for (var n = t.length; n--; ) if (n in t && t[n] === e) return n;
return -1;
}, x.range = function(t, e, n) {
arguments.length <= 1 && (e = t || 0, t = 0), n = arguments[2] || 1;
for (var i = Math.max(Math.ceil((e - t) / n), 0), r = 0, o = new Array(i); i > r; ) o[r++] = t, 
t += n;
return o;
};
var C = function() {};
x.bind = function(t, e) {
var n, i;
if (t.bind === k && k) return k.apply(t, s.call(arguments, 1));
if (!x.isFunction(t)) throw new TypeError();
return i = s.call(arguments, 2), n = function() {
if (!(this instanceof n)) return t.apply(e, i.concat(s.call(arguments)));
C.prototype = t.prototype;
var r = new C(), o = t.apply(r, i.concat(s.call(arguments)));
return Object(o) === o ? o :r;
};
}, x.bindAll = function(t) {
var e = s.call(arguments, 1);
return 0 == e.length && (e = x.functions(t)), S(e, function(e) {
t[e] = x.bind(t[e], t);
}), t;
}, x.memoize = function(t, e) {
var n = {};
return e || (e = x.identity), function() {
var i = e.apply(this, arguments);
return x.has(n, i) ? n[i] :n[i] = t.apply(this, arguments);
};
}, x.delay = function(t, e) {
var n = s.call(arguments, 2);
return setTimeout(function() {
return t.apply(t, n);
}, e);
}, x.defer = function(t) {
return x.delay.apply(x, [ t, 1 ].concat(s.call(arguments, 1)));
}, x.throttle = function(t, e) {
var n, i, r, o, a, s = x.debounce(function() {
a = o = !1;
}, e);
return function() {
n = this, i = arguments;
var l = function() {
r = null, a && t.apply(n, i), s();
};
r || (r = setTimeout(l, e)), o ? a = !0 :t.apply(n, i), s(), o = !0;
};
}, x.debounce = function(t, e) {
var n;
return function() {
var i = this, r = arguments, o = function() {
n = null, t.apply(i, r);
};
clearTimeout(n), n = setTimeout(o, e);
};
}, x.once = function(t) {
var e, n = !1;
return function() {
return n ? e :(n = !0, e = t.apply(this, arguments));
};
}, x.wrap = function(t, e) {
return function() {
var n = [ t ].concat(s.call(arguments, 0));
return e.apply(this, n);
};
}, x.compose = function() {
var t = arguments;
return function() {
for (var e = arguments, n = t.length - 1; n >= 0; n--) e = [ t[n].apply(this, e) ];
return e[0];
};
}, x.after = function(t, e) {
return 0 >= t ? e() :function() {
return --t < 1 ? e.apply(this, arguments) :void 0;
};
}, x.keys = _ || function(t) {
if (t !== Object(t)) throw new TypeError("Invalid object");
var e = [];
for (var n in t) x.has(t, n) && (e[e.length] = n);
return e;
}, x.values = function(t) {
return x.map(t, x.identity);
}, x.functions = x.methods = function(t) {
var e = [];
for (var n in t) x.isFunction(t[n]) && e.push(n);
return e.sort();
}, x.extend = function(t) {
return S(s.call(arguments, 1), function(e) {
for (var n in e) t[n] = e[n];
}), t;
}, x.defaults = function(t) {
return S(s.call(arguments, 1), function(e) {
for (var n in e) null == t[n] && (t[n] = e[n]);
}), t;
}, x.clone = function(t) {
return x.isObject(t) ? x.isArray(t) ? t.slice() :x.extend({}, t) :t;
}, x.tap = function(t, e) {
return e(t), t;
}, x.isEqual = function(e, n) {
return t(e, n, []);
}, x.isEmpty = function(t) {
if (x.isArray(t) || x.isString(t)) return 0 === t.length;
for (var e in t) if (x.has(t, e)) return !1;
return !0;
}, x.isElement = function(t) {
return !(!t || 1 != t.nodeType);
}, x.isArray = w || function(t) {
return "[object Array]" == c.call(t);
}, x.isObject = function(t) {
return t === Object(t);
}, x.isArguments = function(t) {
return "[object Arguments]" == c.call(t);
}, x.isArguments(arguments) || (x.isArguments = function(t) {
return !(!t || !x.has(t, "callee"));
}), x.isFunction = function(t) {
return "[object Function]" == c.call(t);
}, x.isString = function(t) {
return "[object String]" == c.call(t);
}, x.isNumber = function(t) {
return "[object Number]" == c.call(t);
}, x.isNaN = function(t) {
return t !== t;
}, x.isBoolean = function(t) {
return t === !0 || t === !1 || "[object Boolean]" == c.call(t);
}, x.isDate = function(t) {
return "[object Date]" == c.call(t);
}, x.isRegExp = function(t) {
return "[object RegExp]" == c.call(t);
}, x.isNull = function(t) {
return null === t;
}, x.isUndefined = function(t) {
return void 0 === t;
}, x.has = function(t, e) {
return u.call(t, e);
}, x.noConflict = function() {
return e._ = n, this;
}, x.identity = function(t) {
return t;
}, x.times = function(t, e, n) {
for (var i = 0; t > i; i++) e.call(n, i);
}, x.escape = function(t) {
return ("" + t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}, x.mixin = function(t) {
S(x.functions(t), function(e) {
O(e, x[e] = t[e]);
});
};
var T = 0;
x.uniqueId = function(t) {
var e = T++;
return t ? t + e :e;
}, x.templateSettings = {
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g
};
var $ = /.^/, I = function(t) {
return t.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
};
x.template = function(t, e) {
var n = x.templateSettings, i = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + t.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(n.escape || $, function(t, e) {
return "',_.escape(" + I(e) + "),'";
}).replace(n.interpolate || $, function(t, e) {
return "'," + I(e) + ",'";
}).replace(n.evaluate || $, function(t, e) {
return "');" + I(e).replace(/[\r\n\t]/g, " ") + ";__p.push('";
}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');", r = new Function("obj", "_", i);
return e ? r(e, x) :function(t) {
return r.call(this, t, x);
};
}, x.chain = function(t) {
return x(t).chain();
};
var A = function(t) {
this._wrapped = t;
};
x.prototype = A.prototype;
var B = function(t, e) {
return e ? x(t).chain() :t;
}, O = function(t, e) {
A.prototype[t] = function() {
var t = s.call(arguments);
return l.call(t, this._wrapped), B(e.apply(x, t), this._chain);
};
};
x.mixin(x), S([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(t) {
var e = r[t];
A.prototype[t] = function() {
var n = this._wrapped;
e.apply(n, arguments);
var i = n.length;
return "shift" != t && "splice" != t || 0 !== i || delete n[0], B(n, this._chain);
};
}), S([ "concat", "join", "slice" ], function(t) {
var e = r[t];
A.prototype[t] = function() {
return B(e.apply(this._wrapped, arguments), this._chain);
};
}), A.prototype.chain = function() {
return this._chain = !0, this;
}, A.prototype.value = function() {
return this._wrapped;
};
}.call(this), /*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
function(t, e, n, i) {
"use strict";
var r = n("html"), o = n(t), a = n(e), s = n.fancybox = function() {
s.open.apply(this, arguments);
}, l = navigator.userAgent.match(/msie/i), c = null, u = e.createTouch !== i, d = function(t) {
return t && t.hasOwnProperty && t instanceof n;
}, p = function(t) {
return t && "string" === n.type(t);
}, h = function(t) {
return p(t) && t.indexOf("%") > 0;
}, f = function(t) {
return t && !(t.style.overflow && "hidden" === t.style.overflow) && (t.clientWidth && t.scrollWidth > t.clientWidth || t.clientHeight && t.scrollHeight > t.clientHeight);
}, m = function(t, e) {
var n = parseInt(t, 10) || 0;
return e && h(t) && (n = s.getViewport()[e] / 100 * n), Math.ceil(n);
}, g = function(t, e) {
return m(t, e) + "px";
};
n.extend(s, {
version:"2.1.5",
defaults:{
padding:15,
margin:20,
width:800,
height:600,
minWidth:100,
minHeight:100,
maxWidth:9999,
maxHeight:9999,
pixelRatio:1,
autoSize:!0,
autoHeight:!1,
autoWidth:!1,
autoResize:!0,
autoCenter:!u,
fitToView:!0,
aspectRatio:!1,
topRatio:.5,
leftRatio:.5,
scrolling:"auto",
wrapCSS:"",
arrows:!0,
closeBtn:!0,
closeClick:!1,
nextClick:!1,
mouseWheel:!0,
autoPlay:!1,
playSpeed:3e3,
preload:3,
modal:!1,
loop:!0,
ajax:{
dataType:"html",
headers:{
"X-fancyBox":!0
}
},
iframe:{
scrolling:"auto",
preload:!0
},
swf:{
wmode:"transparent",
allowfullscreen:"true",
allowscriptaccess:"always"
},
keys:{
next:{
13:"left",
34:"up",
39:"left",
40:"up"
},
prev:{
8:"right",
33:"down",
37:"right",
38:"down"
},
close:[ 27 ],
play:[ 32 ],
toggle:[ 70 ]
},
direction:{
next:"left",
prev:"right"
},
scrollOutside:!0,
index:0,
type:null,
href:null,
content:null,
title:null,
tpl:{
wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
image:'<img class="fancybox-image" src="{href}" alt="" />',
iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' :"") + "></iframe>",
error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
},
openEffect:"fade",
openSpeed:250,
openEasing:"swing",
openOpacity:!0,
openMethod:"zoomIn",
closeEffect:"fade",
closeSpeed:250,
closeEasing:"swing",
closeOpacity:!0,
closeMethod:"zoomOut",
nextEffect:"elastic",
nextSpeed:250,
nextEasing:"swing",
nextMethod:"changeIn",
prevEffect:"elastic",
prevSpeed:250,
prevEasing:"swing",
prevMethod:"changeOut",
helpers:{
overlay:!0,
title:!0
},
onCancel:n.noop,
beforeLoad:n.noop,
afterLoad:n.noop,
beforeShow:n.noop,
afterShow:n.noop,
beforeChange:n.noop,
beforeClose:n.noop,
afterClose:n.noop
},
group:{},
opts:{},
previous:null,
coming:null,
current:null,
isActive:!1,
isOpen:!1,
isOpened:!1,
wrap:null,
skin:null,
outer:null,
inner:null,
player:{
timer:null,
isActive:!1
},
ajaxLoad:null,
imgPreload:null,
transitions:{},
helpers:{},
open:function(t, e) {
return t && (n.isPlainObject(e) || (e = {}), !1 !== s.close(!0)) ? (n.isArray(t) || (t = d(t) ? n(t).get() :[ t ]), 
n.each(t, function(r, o) {
var a, l, c, u, h, f, m, g = {};
"object" === n.type(o) && (o.nodeType && (o = n(o)), d(o) ? (g = {
href:o.data("fancybox-href") || o.attr("href"),
title:o.data("fancybox-title") || o.attr("title"),
isDom:!0,
element:o
}, n.metadata && n.extend(!0, g, o.metadata())) :g = o), a = e.href || g.href || (p(o) ? o :null), 
l = e.title !== i ? e.title :g.title || "", c = e.content || g.content, u = c ? "html" :e.type || g.type, 
!u && g.isDom && (u = o.data("fancybox-type"), u || (h = o.prop("class").match(/fancybox\.(\w+)/), 
u = h ? h[1] :null)), p(a) && (u || (s.isImage(a) ? u = "image" :s.isSWF(a) ? u = "swf" :"#" === a.charAt(0) ? u = "inline" :p(o) && (u = "html", 
c = o)), "ajax" === u && (f = a.split(/\s+/, 2), a = f.shift(), m = f.shift())), 
c || ("inline" === u ? a ? c = n(p(a) ? a.replace(/.*(?=#[^\s]+$)/, "") :a) :g.isDom && (c = o) :"html" === u ? c = a :u || a || !g.isDom || (u = "inline", 
c = o)), n.extend(g, {
href:a,
type:u,
content:c,
title:l,
selector:m
}), t[r] = g;
}), s.opts = n.extend(!0, {}, s.defaults, e), e.keys !== i && (s.opts.keys = e.keys ? n.extend({}, s.defaults.keys, e.keys) :!1), 
s.group = t, s._start(s.opts.index)) :void 0;
},
cancel:function() {
var t = s.coming;
t && !1 !== s.trigger("onCancel") && (s.hideLoading(), s.ajaxLoad && s.ajaxLoad.abort(), 
s.ajaxLoad = null, s.imgPreload && (s.imgPreload.onload = s.imgPreload.onerror = null), 
t.wrap && t.wrap.stop(!0, !0).trigger("onReset").remove(), s.coming = null, s.current || s._afterZoomOut(t));
},
close:function(t) {
s.cancel(), !1 !== s.trigger("beforeClose") && (s.unbindEvents(), s.isActive && (s.isOpen && t !== !0 ? (s.isOpen = s.isOpened = !1, 
s.isClosing = !0, n(".fancybox-item, .fancybox-nav").remove(), s.wrap.stop(!0, !0).removeClass("fancybox-opened"), 
s.transitions[s.current.closeMethod]()) :(n(".fancybox-wrap").stop(!0).trigger("onReset").remove(), 
s._afterZoomOut())));
},
play:function(t) {
var e = function() {
clearTimeout(s.player.timer);
}, n = function() {
e(), s.current && s.player.isActive && (s.player.timer = setTimeout(s.next, s.current.playSpeed));
}, i = function() {
e(), a.unbind(".player"), s.player.isActive = !1, s.trigger("onPlayEnd");
}, r = function() {
s.current && (s.current.loop || s.current.index < s.group.length - 1) && (s.player.isActive = !0, 
a.bind({
"onCancel.player beforeClose.player":i,
"onUpdate.player":n,
"beforeLoad.player":e
}), n(), s.trigger("onPlayStart"));
};
t === !0 || !s.player.isActive && t !== !1 ? r() :i();
},
next:function(t) {
var e = s.current;
e && (p(t) || (t = e.direction.next), s.jumpto(e.index + 1, t, "next"));
},
prev:function(t) {
var e = s.current;
e && (p(t) || (t = e.direction.prev), s.jumpto(e.index - 1, t, "prev"));
},
jumpto:function(t, e, n) {
var r = s.current;
r && (t = m(t), s.direction = e || r.direction[t >= r.index ? "next" :"prev"], s.router = n || "jumpto", 
r.loop && (0 > t && (t = r.group.length + t % r.group.length), t %= r.group.length), 
r.group[t] !== i && (s.cancel(), s._start(t)));
},
reposition:function(t, e) {
var i, r = s.current, o = r ? r.wrap :null;
o && (i = s._getPosition(e), t && "scroll" === t.type ? (delete i.position, o.stop(!0, !0).animate(i, 200)) :(o.css(i), 
r.pos = n.extend({}, r.dim, i)));
},
update:function(t) {
var e = t && t.type, n = !e || "orientationchange" === e;
n && (clearTimeout(c), c = null), s.isOpen && !c && (c = setTimeout(function() {
var i = s.current;
i && !s.isClosing && (s.wrap.removeClass("fancybox-tmp"), (n || "load" === e || "resize" === e && i.autoResize) && s._setDimension(), 
"scroll" === e && i.canShrink || s.reposition(t), s.trigger("onUpdate"), c = null);
}, n && !u ? 0 :300));
},
toggle:function(t) {
s.isOpen && (s.current.fitToView = "boolean" === n.type(t) ? t :!s.current.fitToView, 
u && (s.wrap.removeAttr("style").addClass("fancybox-tmp"), s.trigger("onUpdate")), 
s.update());
},
hideLoading:function() {
a.unbind(".loading"), n("#fancybox-loading").remove();
},
showLoading:function() {
var t, e;
s.hideLoading(), t = n('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"), 
a.bind("keydown.loading", function(t) {
27 === (t.which || t.keyCode) && (t.preventDefault(), s.cancel());
}), s.defaults.fixed || (e = s.getViewport(), t.css({
position:"absolute",
top:.5 * e.h + e.y,
left:.5 * e.w + e.x
}));
},
getViewport:function() {
var e = s.current && s.current.locked || !1, n = {
x:o.scrollLeft(),
y:o.scrollTop()
};
return e ? (n.w = e[0].clientWidth, n.h = e[0].clientHeight) :(n.w = u && t.innerWidth ? t.innerWidth :o.width(), 
n.h = u && t.innerHeight ? t.innerHeight :o.height()), n;
},
unbindEvents:function() {
s.wrap && d(s.wrap) && s.wrap.unbind(".fb"), a.unbind(".fb"), o.unbind(".fb");
},
bindEvents:function() {
var t, e = s.current;
e && (o.bind("orientationchange.fb" + (u ? "" :" resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" :""), s.update), 
t = e.keys, t && a.bind("keydown.fb", function(r) {
var o = r.which || r.keyCode, a = r.target || r.srcElement;
return 27 === o && s.coming ? !1 :(r.ctrlKey || r.altKey || r.shiftKey || r.metaKey || a && (a.type || n(a).is("[contenteditable]")) || n.each(t, function(t, a) {
return e.group.length > 1 && a[o] !== i ? (s[t](a[o]), r.preventDefault(), !1) :n.inArray(o, a) > -1 ? (s[t](), 
r.preventDefault(), !1) :void 0;
}), void 0);
}), n.fn.mousewheel && e.mouseWheel && s.wrap.bind("mousewheel.fb", function(t, i, r, o) {
for (var a = t.target || null, l = n(a), c = !1; l.length && !(c || l.is(".fancybox-skin") || l.is(".fancybox-wrap")); ) c = f(l[0]), 
l = n(l).parent();
0 === i || c || s.group.length > 1 && !e.canShrink && (o > 0 || r > 0 ? s.prev(o > 0 ? "down" :"left") :(0 > o || 0 > r) && s.next(0 > o ? "up" :"right"), 
t.preventDefault());
}));
},
trigger:function(t, e) {
var i, r = e || s.coming || s.current;
if (r) {
if (n.isFunction(r[t]) && (i = r[t].apply(r, Array.prototype.slice.call(arguments, 1))), 
i === !1) return !1;
r.helpers && n.each(r.helpers, function(e, i) {
i && s.helpers[e] && n.isFunction(s.helpers[e][t]) && s.helpers[e][t](n.extend(!0, {}, s.helpers[e].defaults, i), r);
}), a.trigger(t);
}
},
isImage:function(t) {
return p(t) && t.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
},
isSWF:function(t) {
return p(t) && t.match(/\.(swf)((\?|#).*)?$/i);
},
_start:function(t) {
var e, i, r, o, a, l = {};
if (t = m(t), e = s.group[t] || null, !e) return !1;
if (l = n.extend(!0, {}, s.opts, e), o = l.margin, a = l.padding, "number" === n.type(o) && (l.margin = [ o, o, o, o ]), 
"number" === n.type(a) && (l.padding = [ a, a, a, a ]), l.modal && n.extend(!0, l, {
closeBtn:!1,
closeClick:!1,
nextClick:!1,
arrows:!1,
mouseWheel:!1,
keys:null,
helpers:{
overlay:{
closeClick:!1
}
}
}), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), 
"auto" === l.height && (l.autoHeight = !0), l.group = s.group, l.index = t, s.coming = l, 
!1 === s.trigger("beforeLoad")) return s.coming = null, void 0;
if (r = l.type, i = l.href, !r) return s.coming = null, s.current && s.router && "jumpto" !== s.router ? (s.current.index = t, 
s[s.router](s.direction)) :!1;
if (s.isActive = !0, ("image" === r || "swf" === r) && (l.autoHeight = l.autoWidth = !1, 
l.scrolling = "visible"), "image" === r && (l.aspectRatio = !0), "iframe" === r && u && (l.scrolling = "scroll"), 
l.wrap = n(l.tpl.wrap).addClass("fancybox-" + (u ? "mobile" :"desktop") + " fancybox-type-" + r + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), 
n.extend(l, {
skin:n(".fancybox-skin", l.wrap),
outer:n(".fancybox-outer", l.wrap),
inner:n(".fancybox-inner", l.wrap)
}), n.each([ "Top", "Right", "Bottom", "Left" ], function(t, e) {
l.skin.css("padding" + e, g(l.padding[t]));
}), s.trigger("onReady"), "inline" === r || "html" === r) {
if (!l.content || !l.content.length) return s._error("content");
} else if (!i) return s._error("href");
"image" === r ? s._loadImage() :"ajax" === r ? s._loadAjax() :"iframe" === r ? s._loadIframe() :s._afterLoad();
},
_error:function(t) {
n.extend(s.coming, {
type:"html",
autoWidth:!0,
autoHeight:!0,
minWidth:0,
minHeight:0,
scrolling:"no",
hasError:t,
content:s.coming.tpl.error
}), s._afterLoad();
},
_loadImage:function() {
var t = s.imgPreload = new Image();
t.onload = function() {
this.onload = this.onerror = null, s.coming.width = this.width / s.opts.pixelRatio, 
s.coming.height = this.height / s.opts.pixelRatio, s._afterLoad();
}, t.onerror = function() {
this.onload = this.onerror = null, s._error("image");
}, t.src = s.coming.href, t.complete !== !0 && s.showLoading();
},
_loadAjax:function() {
var t = s.coming;
s.showLoading(), s.ajaxLoad = n.ajax(n.extend({}, t.ajax, {
url:t.href,
error:function(t, e) {
s.coming && "abort" !== e ? s._error("ajax", t) :s.hideLoading();
},
success:function(e, n) {
"success" === n && (t.content = e, s._afterLoad());
}
}));
},
_loadIframe:function() {
var t = s.coming, e = n(t.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr("scrolling", u ? "auto" :t.iframe.scrolling).attr("src", t.href);
n(t.wrap).bind("onReset", function() {
try {
n(this).find("iframe").hide().attr("src", "//about:blank").end().empty();
} catch (t) {}
}), t.iframe.preload && (s.showLoading(), e.one("load", function() {
n(this).data("ready", 1), u || n(this).bind("load.fb", s.update), n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), 
s._afterLoad();
})), t.content = e.appendTo(t.inner), t.iframe.preload || s._afterLoad();
},
_preloadImages:function() {
var t, e, n = s.group, i = s.current, r = n.length, o = i.preload ? Math.min(i.preload, r - 1) :0;
for (e = 1; o >= e; e += 1) t = n[(i.index + e) % r], "image" === t.type && t.href && (new Image().src = t.href);
},
_afterLoad:function() {
var t, e, i, r, o, a, l = s.coming, c = s.current, u = "fancybox-placeholder";
if (s.hideLoading(), l && s.isActive !== !1) {
if (!1 === s.trigger("afterLoad", l, c)) return l.wrap.stop(!0).trigger("onReset").remove(), 
s.coming = null, void 0;
switch (c && (s.trigger("beforeChange", c), c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), 
s.unbindEvents(), t = l, e = l.content, i = l.type, r = l.scrolling, n.extend(s, {
wrap:t.wrap,
skin:t.skin,
outer:t.outer,
inner:t.inner,
current:t,
previous:c
}), o = t.href, i) {
case "inline":
case "ajax":
case "html":
t.selector ? e = n("<div>").html(e).find(t.selector) :d(e) && (e.data(u) || e.data(u, n('<div class="' + u + '"></div>').insertAfter(e).hide()), 
e = e.show().detach(), t.wrap.bind("onReset", function() {
n(this).find(e).length && e.hide().replaceAll(e.data(u)).data(u, !1);
}));
break;

case "image":
e = t.tpl.image.replace("{href}", o);
break;

case "swf":
e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>', 
a = "", n.each(t.swf, function(t, n) {
e += '<param name="' + t + '" value="' + n + '"></param>', a += " " + t + '="' + n + '"';
}), e += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>";
}
d(e) && e.parent().is(t.inner) || t.inner.append(e), s.trigger("beforeShow"), t.inner.css("overflow", "yes" === r ? "scroll" :"no" === r ? "hidden" :r), 
s._setDimension(), s.reposition(), s.isOpen = !1, s.coming = null, s.bindEvents(), 
s.isOpened ? c.prevMethod && s.transitions[c.prevMethod]() :n(".fancybox-wrap").not(t.wrap).stop(!0).trigger("onReset").remove(), 
s.transitions[s.isOpened ? t.nextMethod :t.openMethod](), s._preloadImages();
}
},
_setDimension:function() {
var t, e, i, r, o, a, l, c, u, d, p, f, v, y, b, w = s.getViewport(), _ = 0, k = !1, x = !1, S = s.wrap, E = s.skin, C = s.inner, T = s.current, $ = T.width, I = T.height, A = T.minWidth, B = T.minHeight, O = T.maxWidth, D = T.maxHeight, M = T.scrolling, N = T.scrollOutside ? T.scrollbarWidth :0, P = T.margin, H = m(P[1] + P[3]), F = m(P[0] + P[2]);
if (S.add(E).add(C).width("auto").height("auto").removeClass("fancybox-tmp"), t = m(E.outerWidth(!0) - E.width()), 
e = m(E.outerHeight(!0) - E.height()), i = H + t, r = F + e, o = h($) ? (w.w - i) * m($) / 100 :$, 
a = h(I) ? (w.h - r) * m(I) / 100 :I, "iframe" === T.type) {
if (y = T.content, T.autoHeight && 1 === y.data("ready")) try {
y[0].contentWindow.document.location && (C.width(o).height(9999), b = y.contents().find("body"), 
N && b.css("overflow-x", "hidden"), a = b.outerHeight(!0));
} catch (L) {}
} else (T.autoWidth || T.autoHeight) && (C.addClass("fancybox-tmp"), T.autoWidth || C.width(o), 
T.autoHeight || C.height(a), T.autoWidth && (o = C.width()), T.autoHeight && (a = C.height()), 
C.removeClass("fancybox-tmp"));
if ($ = m(o), I = m(a), u = o / a, A = m(h(A) ? m(A, "w") - i :A), O = m(h(O) ? m(O, "w") - i :O), 
B = m(h(B) ? m(B, "h") - r :B), D = m(h(D) ? m(D, "h") - r :D), l = O, c = D, T.fitToView && (O = Math.min(w.w - i, O), 
D = Math.min(w.h - r, D)), f = w.w - H, v = w.h - F, T.aspectRatio ? ($ > O && ($ = O, 
I = m($ / u)), I > D && (I = D, $ = m(I * u)), A > $ && ($ = A, I = m($ / u)), B > I && (I = B, 
$ = m(I * u))) :($ = Math.max(A, Math.min($, O)), T.autoHeight && "iframe" !== T.type && (C.width($), 
I = C.height()), I = Math.max(B, Math.min(I, D))), T.fitToView) if (C.width($).height(I), 
S.width($ + t), d = S.width(), p = S.height(), T.aspectRatio) for (;(d > f || p > v) && $ > A && I > B && !(_++ > 19); ) I = Math.max(B, Math.min(D, I - 10)), 
$ = m(I * u), A > $ && ($ = A, I = m($ / u)), $ > O && ($ = O, I = m($ / u)), C.width($).height(I), 
S.width($ + t), d = S.width(), p = S.height(); else $ = Math.max(A, Math.min($, $ - (d - f))), 
I = Math.max(B, Math.min(I, I - (p - v)));
N && "auto" === M && a > I && f > $ + t + N && ($ += N), C.width($).height(I), S.width($ + t), 
d = S.width(), p = S.height(), k = (d > f || p > v) && $ > A && I > B, x = T.aspectRatio ? l > $ && c > I && o > $ && a > I :(l > $ || c > I) && (o > $ || a > I), 
n.extend(T, {
dim:{
width:g(d),
height:g(p)
},
origWidth:o,
origHeight:a,
canShrink:k,
canExpand:x,
wPadding:t,
hPadding:e,
wrapSpace:p - E.outerHeight(!0),
skinSpace:E.height() - I
}), !y && T.autoHeight && I > B && D > I && !x && C.height("auto");
},
_getPosition:function(t) {
var e = s.current, n = s.getViewport(), i = e.margin, r = s.wrap.width() + i[1] + i[3], o = s.wrap.height() + i[0] + i[2], a = {
position:"absolute",
top:i[0],
left:i[3]
};
return e.autoCenter && e.fixed && !t && o <= n.h && r <= n.w ? a.position = "fixed" :e.locked || (a.top += n.y, 
a.left += n.x), a.top = g(Math.max(a.top, a.top + (n.h - o) * e.topRatio)), a.left = g(Math.max(a.left, a.left + (n.w - r) * e.leftRatio)), 
a;
},
_afterZoomIn:function() {
var t = s.current;
t && (s.isOpen = s.isOpened = !0, s.wrap.css("overflow", "visible").addClass("fancybox-opened"), 
s.update(), (t.closeClick || t.nextClick && s.group.length > 1) && s.inner.css("cursor", "pointer").bind("click.fb", function(e) {
n(e.target).is("a") || n(e.target).parent().is("a") || (e.preventDefault(), s[t.closeClick ? "close" :"next"]());
}), t.closeBtn && n(t.tpl.closeBtn).appendTo(s.skin).bind("click.fb", function(t) {
t.preventDefault(), s.close();
}), t.arrows && s.group.length > 1 && ((t.loop || t.index > 0) && n(t.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev), 
(t.loop || t.index < s.group.length - 1) && n(t.tpl.next).appendTo(s.outer).bind("click.fb", s.next)), 
s.trigger("afterShow"), t.loop || t.index !== t.group.length - 1 ? s.opts.autoPlay && !s.player.isActive && (s.opts.autoPlay = !1, 
s.play()) :s.play(!1));
},
_afterZoomOut:function(t) {
t = t || s.current, n(".fancybox-wrap").trigger("onReset").remove(), n.extend(s, {
group:{},
opts:{},
router:!1,
current:null,
isActive:!1,
isOpened:!1,
isOpen:!1,
isClosing:!1,
wrap:null,
skin:null,
outer:null,
inner:null
}), s.trigger("afterClose", t);
}
}), s.transitions = {
getOrigPosition:function() {
var t = s.current, e = t.element, n = t.orig, i = {}, r = 50, o = 50, a = t.hPadding, l = t.wPadding, c = s.getViewport();
return !n && t.isDom && e.is(":visible") && (n = e.find("img:first"), n.length || (n = e)), 
d(n) ? (i = n.offset(), n.is("img") && (r = n.outerWidth(), o = n.outerHeight())) :(i.top = c.y + (c.h - o) * t.topRatio, 
i.left = c.x + (c.w - r) * t.leftRatio), ("fixed" === s.wrap.css("position") || t.locked) && (i.top -= c.y, 
i.left -= c.x), i = {
top:g(i.top - a * t.topRatio),
left:g(i.left - l * t.leftRatio),
width:g(r + l),
height:g(o + a)
};
},
step:function(t, e) {
var n, i, r, o = e.prop, a = s.current, l = a.wrapSpace, c = a.skinSpace;
("width" === o || "height" === o) && (n = e.end === e.start ? 1 :(t - e.start) / (e.end - e.start), 
s.isClosing && (n = 1 - n), i = "width" === o ? a.wPadding :a.hPadding, r = t - i, 
s.skin[o](m("width" === o ? r :r - l * n)), s.inner[o](m("width" === o ? r :r - l * n - c * n)));
},
zoomIn:function() {
var t = s.current, e = t.pos, i = t.openEffect, r = "elastic" === i, o = n.extend({
opacity:1
}, e);
delete o.position, r ? (e = this.getOrigPosition(), t.openOpacity && (e.opacity = .1)) :"fade" === i && (e.opacity = .1), 
s.wrap.css(e).animate(o, {
duration:"none" === i ? 0 :t.openSpeed,
easing:t.openEasing,
step:r ? this.step :null,
complete:s._afterZoomIn
});
},
zoomOut:function() {
var t = s.current, e = t.closeEffect, n = "elastic" === e, i = {
opacity:.1
};
n && (i = this.getOrigPosition(), t.closeOpacity && (i.opacity = .1)), s.wrap.animate(i, {
duration:"none" === e ? 0 :t.closeSpeed,
easing:t.closeEasing,
step:n ? this.step :null,
complete:s._afterZoomOut
});
},
changeIn:function() {
var t, e = s.current, n = e.nextEffect, i = e.pos, r = {
opacity:1
}, o = s.direction, a = 200;
i.opacity = .1, "elastic" === n && (t = "down" === o || "up" === o ? "top" :"left", 
"down" === o || "right" === o ? (i[t] = g(m(i[t]) - a), r[t] = "+=" + a + "px") :(i[t] = g(m(i[t]) + a), 
r[t] = "-=" + a + "px")), "none" === n ? s._afterZoomIn() :s.wrap.css(i).animate(r, {
duration:e.nextSpeed,
easing:e.nextEasing,
complete:s._afterZoomIn
});
},
changeOut:function() {
var t = s.previous, e = t.prevEffect, i = {
opacity:.1
}, r = s.direction, o = 200;
"elastic" === e && (i["down" === r || "up" === r ? "top" :"left"] = ("up" === r || "left" === r ? "-" :"+") + "=" + o + "px"), 
t.wrap.animate(i, {
duration:"none" === e ? 0 :t.prevSpeed,
easing:t.prevEasing,
complete:function() {
n(this).trigger("onReset").remove();
}
});
}
}, s.helpers.overlay = {
defaults:{
closeClick:!0,
speedOut:200,
showEarly:!0,
css:{},
locked:!u,
fixed:!0
},
overlay:null,
fixed:!1,
el:n("html"),
create:function(t) {
t = n.extend({}, this.defaults, t), this.overlay && this.close(), this.overlay = n('<div class="fancybox-overlay"></div>').appendTo(s.coming ? s.coming.parent :t.parent), 
this.fixed = !1, t.fixed && s.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), 
this.fixed = !0);
},
open:function(t) {
var e = this;
t = n.extend({}, this.defaults, t), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") :this.create(t), 
this.fixed || (o.bind("resize.overlay", n.proxy(this.update, this)), this.update()), 
t.closeClick && this.overlay.bind("click.overlay", function(t) {
return n(t.target).hasClass("fancybox-overlay") ? (s.isActive ? s.close() :e.close(), 
!1) :void 0;
}), this.overlay.css(t.css).show();
},
close:function() {
var t, e;
o.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (n(".fancybox-margin").removeClass("fancybox-margin"), 
t = o.scrollTop(), e = o.scrollLeft(), this.el.removeClass("fancybox-lock"), o.scrollTop(t).scrollLeft(e)), 
n(".fancybox-overlay").remove().hide(), n.extend(this, {
overlay:null,
fixed:!1
});
},
update:function() {
var t, n = "100%";
this.overlay.width(n).height("100%"), l ? (t = Math.max(e.documentElement.offsetWidth, e.body.offsetWidth), 
a.width() > t && (n = a.width())) :a.width() > o.width() && (n = a.width()), this.overlay.width(n).height(a.height());
},
onReady:function(t, e) {
var i = this.overlay;
n(".fancybox-overlay").stop(!0, !0), i || this.create(t), t.locked && this.fixed && e.fixed && (i || (this.margin = a.height() > o.height() ? n("html").css("margin-right").replace("px", "") :!1), 
e.locked = this.overlay.append(e.wrap), e.fixed = !1), t.showEarly === !0 && this.beforeShow.apply(this, arguments);
},
beforeShow:function(t, e) {
var i, r;
e.locked && (this.margin !== !1 && (n("*").filter(function() {
return "fixed" === n(this).css("position") && !n(this).hasClass("fancybox-overlay") && !n(this).hasClass("fancybox-wrap");
}).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), i = o.scrollTop(), 
r = o.scrollLeft(), this.el.addClass("fancybox-lock"), o.scrollTop(i).scrollLeft(r)), 
this.open(t);
},
onUpdate:function() {
this.fixed || this.update();
},
afterClose:function(t) {
this.overlay && !s.coming && this.overlay.fadeOut(t.speedOut, n.proxy(this.close, this));
}
}, s.helpers.title = {
defaults:{
type:"float",
position:"bottom"
},
beforeShow:function(t) {
var e, i, r = s.current, o = r.title, a = t.type;
if (n.isFunction(o) && (o = o.call(r.element, r)), p(o) && "" !== n.trim(o)) {
switch (e = n('<div class="fancybox-title fancybox-title-' + a + '-wrap">' + o + "</div>"), 
a) {
case "inside":
i = s.skin;
break;

case "outside":
i = s.wrap;
break;

case "over":
i = s.inner;
break;

default:
i = s.skin, e.appendTo("body"), l && e.width(e.width()), e.wrapInner('<span class="child"></span>'), 
s.current.margin[2] += Math.abs(m(e.css("margin-bottom")));
}
e["top" === t.position ? "prependTo" :"appendTo"](i);
}
}
}, n.fn.fancybox = function(t) {
var e, i = n(this), r = this.selector || "", o = function(o) {
var a, l, c = n(this).blur(), u = e;
o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || c.is(".fancybox-wrap") || (a = t.groupAttr || "data-fancybox-group", 
l = c.attr(a), l || (a = "rel", l = c.get(0)[a]), l && "" !== l && "nofollow" !== l && (c = r.length ? n(r) :i, 
c = c.filter("[" + a + '="' + l + '"]'), u = c.index(this)), t.index = u, s.open(c, t) !== !1 && o.preventDefault());
};
return t = t || {}, e = t.index || 0, r && t.live !== !1 ? a.undelegate(r, "click.fb-start").delegate(r + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", o) :i.unbind("click.fb-start").bind("click.fb-start", o), 
this.filter("[data-fancybox-start=1]").trigger("click"), this;
}, a.ready(function() {
var e, o;
n.scrollbarWidth === i && (n.scrollbarWidth = function() {
var t = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), e = t.children(), i = e.innerWidth() - e.height(99).innerWidth();
return t.remove(), i;
}), n.support.fixedPosition === i && (n.support.fixedPosition = function() {
var t = n('<div style="position:fixed;top:20px;"></div>').appendTo("body"), e = 20 === t[0].offsetTop || 15 === t[0].offsetTop;
return t.remove(), e;
}()), n.extend(s.defaults, {
scrollbarWidth:n.scrollbarWidth(),
fixed:n.support.fixedPosition,
parent:n("body")
}), e = n(t).width(), r.addClass("fancybox-lock-test"), o = n(t).width(), r.removeClass("fancybox-lock-test"), 
n("<style type='text/css'>.fancybox-margin{margin-right:" + (o - e) + "px;}</style>").appendTo("head");
});
}(window, document, jQuery), function(t) {
var e = t.fancybox;
e.helpers.buttons = {
defaults:{
skipSingle:!1,
position:"top",
tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
},
list:null,
buttons:null,
beforeLoad:function(t, e) {
return t.skipSingle && e.group.length < 2 ? (e.helpers.buttons = !1, e.closeBtn = !0, 
void 0) :(e.margin["bottom" === t.position ? 2 :0] += 30, void 0);
},
onPlayStart:function() {
this.buttons && this.buttons.play.attr("title", "Pause slideshow").addClass("btnPlayOn");
},
onPlayEnd:function() {
this.buttons && this.buttons.play.attr("title", "Start slideshow").removeClass("btnPlayOn");
},
afterShow:function(n, i) {
var r = this.buttons;
r || (this.list = t(n.tpl).addClass(n.position).appendTo("body"), r = {
prev:this.list.find(".btnPrev").click(e.prev),
next:this.list.find(".btnNext").click(e.next),
play:this.list.find(".btnPlay").click(e.play),
toggle:this.list.find(".btnToggle").click(e.toggle),
close:this.list.find(".btnClose").click(e.close)
}), i.index > 0 || i.loop ? r.prev.removeClass("btnDisabled") :r.prev.addClass("btnDisabled"), 
i.loop || i.index < i.group.length - 1 ? (r.next.removeClass("btnDisabled"), r.play.removeClass("btnDisabled")) :(r.next.addClass("btnDisabled"), 
r.play.addClass("btnDisabled")), this.buttons = r, this.onUpdate(n, i);
},
onUpdate:function(t, e) {
var n;
this.buttons && (n = this.buttons.toggle.removeClass("btnDisabled btnToggleOn"), 
e.canShrink ? n.addClass("btnToggleOn") :e.canExpand || n.addClass("btnDisabled"));
},
beforeClose:function() {
this.list && this.list.remove(), this.list = null, this.buttons = null;
}
};
}(jQuery), function(t) {
var e = t.fancybox;
e.helpers.thumbs = {
defaults:{
width:50,
height:50,
position:"bottom",
source:function(e) {
var n;
return e.element && (n = t(e.element).find("img").attr("src")), !n && "image" === e.type && e.href && (n = e.href), 
n;
}
},
wrap:null,
list:null,
width:0,
init:function(e, n) {
var i, r = this, o = e.width, a = e.height, s = e.source;
i = "";
for (var l = 0; l < n.group.length; l++) i += '<li><a style="width:' + o + "px;height:" + a + 'px;" href="javascript:jQuery.fancybox.jumpto(' + l + ');"></a></li>';
this.wrap = t('<div id="fancybox-thumbs"></div>').addClass(e.position).appendTo("body"), 
this.list = t("<ul>" + i + "</ul>").appendTo(this.wrap), t.each(n.group, function(e) {
var i = s(n.group[e]);
i && t("<img />").load(function() {
var n, i, s, l = this.width, c = this.height;
r.list && l && c && (n = l / o, i = c / a, s = r.list.children().eq(e).find("a"), 
n >= 1 && i >= 1 && (n > i ? (l = Math.floor(l / i), c = a) :(l = o, c = Math.floor(c / n))), 
t(this).css({
width:l,
height:c,
top:Math.floor(a / 2 - c / 2),
left:Math.floor(o / 2 - l / 2)
}), s.width(o).height(a), t(this).hide().appendTo(s).fadeIn(300));
}).attr("src", i);
}), this.width = this.list.children().eq(0).outerWidth(!0), this.list.width(this.width * (n.group.length + 1)).css("left", Math.floor(.5 * t(window).width() - (n.index * this.width + .5 * this.width)));
},
beforeLoad:function(t, e) {
return e.group.length < 2 ? (e.helpers.thumbs = !1, void 0) :(e.margin["top" === t.position ? 0 :2] += t.height + 15, 
void 0);
},
afterShow:function(t, e) {
this.list ? this.onUpdate(t, e) :this.init(t, e), this.list.children().removeClass("active").eq(e.index).addClass("active");
},
onUpdate:function(e, n) {
this.list && this.list.stop(!0).animate({
left:Math.floor(.5 * t(window).width() - (n.index * this.width + .5 * this.width))
}, 150);
},
beforeClose:function() {
this.wrap && this.wrap.remove(), this.wrap = null, this.list = null, this.width = 0;
}
};
}(jQuery), function(t) {
"use strict";
var e = t.fancybox, n = function(e, n, i) {
return i = i || "", "object" === t.type(i) && (i = t.param(i, !0)), t.each(n, function(t, n) {
e = e.replace("$" + t, n || "");
}), i.length && (e += (e.indexOf("?") > 0 ? "&" :"?") + i), e;
};
e.helpers.media = {
defaults:{
youtube:{
matcher:/(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
params:{
autoplay:1,
autohide:1,
fs:1,
rel:0,
hd:1,
wmode:"opaque",
enablejsapi:1
},
type:"iframe",
url:"//www.youtube.com/embed/$3"
},
vimeo:{
matcher:/(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
params:{
autoplay:1,
hd:1,
show_title:1,
show_byline:1,
show_portrait:0,
fullscreen:1
},
type:"iframe",
url:"//player.vimeo.com/video/$1"
},
metacafe:{
matcher:/metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
params:{
autoPlay:"yes"
},
type:"swf",
url:function(e, n, i) {
return i.swf.flashVars = "playerVars=" + t.param(n, !0), "//www.metacafe.com/fplayer/" + e[1] + "/.swf";
}
},
dailymotion:{
matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,
params:{
additionalInfos:0,
autoStart:1
},
type:"swf",
url:"//www.dailymotion.com/swf/video/$1"
},
twitvid:{
matcher:/twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
params:{
autoplay:0
},
type:"iframe",
url:"//www.twitvid.com/embed.php?guid=$1"
},
twitpic:{
matcher:/twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
type:"image",
url:"//twitpic.com/show/full/$1/"
},
instagram:{
matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
type:"image",
url:"//$1/p/$2/media/?size=l"
},
google_maps:{
matcher:/maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
type:"iframe",
url:function(t) {
return "//maps.google." + t[1] + "/" + t[3] + t[4] + "&output=" + (t[4].indexOf("layer=c") > 0 ? "svembed" :"embed");
}
}
},
beforeLoad:function(e, i) {
var r, o, a, s, l = i.href || "", c = !1;
for (r in e) if (e.hasOwnProperty(r) && (o = e[r], a = l.match(o.matcher))) {
c = o.type, s = t.extend(!0, {}, o.params, i[r] || (t.isPlainObject(e[r]) ? e[r].params :null)), 
l = "function" === t.type(o.url) ? o.url.call(this, a, s, i) :n(o.url, a, s);
break;
}
c && (i.href = l, i.type = c, i.autoHeight = !1);
}
};
}(jQuery), function() {
"undefined" != typeof _ && null !== _ && (_.templateSettings = {
evaluate:/\{\{(.+?)\}\}/g,
interpolate:/\{\{=(.+?)\}\}/g
}), "undefined" != typeof $ && null !== $ && ($.support.cors = !0), $B.Singleton || ($B.Singleton = {});
}.call(this), function() {
var t, e, n, i, r = function(t, e) {
return function() {
return t.apply(e, arguments);
};
}, o = {}.hasOwnProperty, a = function(t, e) {
function n() {
this.constructor = t;
}
for (var i in e) o.call(e, i) && (t[i] = e[i]);
return n.prototype = e.prototype, t.prototype = new n(), t.__super__ = e.prototype, 
t;
}, s = [].indexOf || function(t) {
for (var e = 0, n = this.length; n > e; e++) if (e in this && this[e] === t) return e;
return -1;
};
String.prototype.toSlug = function() {
var t;
return t = this.replace(/[^\u0020-\u007e]/g, ""), t = t.replace(/["'`]/g, ""), t = t.replace(/@/g, " at "), 
t = t.replace(/&/g, " and "), t = t.replace(/\W+/g, " "), t = t.replace(/_/g, " "), 
t = t.trim(), t = t.replace(/\s+/g, "-"), t = t.toLowerCase();
}, String.prototype.trim || (String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
}), $B.dialog = function(t) {
return 0 === $("#sdialog").length && ($("body").append('      <div id="sdialog" style="opacity: 0">        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0; background: #222; opacity: .8;">        </div>        <div style="height: 100%; width: 100%; position: fixed; z-index: 999999; left: 0; top: 0;">          <div id="sdialog-content" style="width: 300px; margin: auto; margin-top: 200px; background: white; position: relative; overflow: hidden;">            <!--text-->          </div>        </div>      </div>      '), 
$("#sdialog > div").click(function() {
return $("#sdialog").css({
display:"none",
opacity:"0"
});
}), $("#sdialog-content").click(function(t) {
return t.stopPropagation();
})), $("#sdialog-content").html(t), $("#sdialog").show().animate({
opacity:"1"
});
}, $B.log = function() {
var t, e;
return t = "true" === (null != (e = window.localStorage) ? "function" == typeof e.getItem ? e.getItem("strikinglyLogger") :void 0 :void 0), 
$B.log.enabled() && console && console.log ? console.log(Array.prototype.slice.call(arguments)) :void 0;
}, $.smartPoller = function(t, e) {
var n;
return $.isFunction(t) && (e = t, t = 1e3), n = function() {
return setTimeout(function() {
return e.call(this, n);
}, t), t = 1.5 * t;
}, n();
}, $B.firstTimeTrack = function(t, e, n) {
return 1 === $S.user_meta[t] && $S.user_meta.first_time_log_in ? window.mixpanel.track(e, n) :void 0;
}, $.strikingPoller = function(t, e, n) {
return e || (e = function(t) {
return console.log(t);
}), n || (n = function(t) {
return console.log(t);
}), $.smartPoller(function(i) {
return console.log("Polling URL " + t), $.getJSON(t).success(function(t) {
return t ? "retry" === t.html ? (i(), void 0) :e(t) :i();
}).error(n);
});
}, $B.waitFor = function(t, e, n) {
var i;
return n = n || 100, i = setInterval(function() {
return t() ? (clearInterval(i), e()) :void 0;
}, n);
}, function(t) {
var e;
return e = {}, t.setCustomization = function(t, n) {
return e[t] = n;
}, t.getCustomization = function(t) {
return null != e[t] ? e[t] :void 0;
};
}($B), function(t) {
var e;
return e = {}, t.meta = function(t, n) {
var i;
return null == n && (n = !1), null == e[t] || n ? (i = $('meta[name="' + t + '"]').attr("content"), 
null != i ? e[t] = i :($B.log("" + t + " missing in meta."), void 0)) :e[t];
}, t.metaObject = function(t, n) {
var i;
return null == n && (n = !1), null == e[t] || n ? (i = $('meta[name="' + t + '"]').attr("content"), 
null != i ? e[t] = jQuery.parseJSON(i) :($B.log("" + t + " missing in meta object."), 
{})) :e[t];
}, t.appMeta = function(e) {
return t.metaObject("app-configs")[e];
}, t.siteMeta = function(e) {
return t.metaObject("site-configs")[e];
};
}($B), $B.log.enabled = function() {
var t, e, n;
return e = "true" === (null != (n = window.localStorage) ? "function" == typeof n.getItem ? n.getItem("strikinglyLogger") :void 0 :void 0), 
t = "true" === $("meta[name=a-minimum]").attr("content"), e || t;
}, $B.log.enable = function() {
var t;
return null != (t = window.localStorage) && "function" == typeof t.setItem && t.setItem("strikinglyLogger", "true"), 
console.log("Bobcat logger enabled!");
}, $B.log.disable = function() {
var t;
return null != (t = window.localStorage) && "function" == typeof t.setItem && t.setItem("strikinglyLogger", "false"), 
console.log("Bobcat logger disabled!");
}, $B.growl = function(t) {
var e, n, i;
if ($B.log.enabled()) return n = 2800, i = 20 + 34 * $(".s-growl").length, e = $("<div></div>").addClass("s-growl").text(t).css({
background:"rgba(0,0,0,0.85)",
color:"white",
padding:"6px 14px",
"font-size":"110%",
position:"fixed",
"z-index":999e3,
top:i,
right:20,
"-webkit-border-radius":"4px"
}), setTimeout(function() {
return e.animate({
top:"-=5",
opacity:0
}, function() {
return e.remove();
});
}, n), $("body").append(e);
}, $B.ui = {
openModal:function(t) {
var e;
if (!t.is(":visible") || "1" !== t.css("opacity")) return t.css({
top:"51.5%",
opacity:0
}).show(), t.css({
"margin-top":-t.height() / 2
}), t.stop().animate({
top:"50%",
opacity:1
}, 400, "easeInOutQuart"), (e = $(".s-modal-bg")).length ? (e.css("opacity", 0).show(), 
e.css("pointer-events", "auto"), e.animate({
opacity:1
}, 400, "easeInOutQuart"), e.click(function() {
return e.css("pointer-events", "none"), $B.ui.closeModal(t);
})) :void 0;
},
closeModal:function(t) {
var e;
return e = $(".s-modal-bg"), e.stop().animate({
opacity:0
}, 400, "easeInOutQuart", function() {
return e.hide();
}), t.is(":visible") || "0" !== t.css("opacity") ? t.stop().animate({
top:"50.5%",
opacity:0
}, 400, "easeInOutQuart", function() {
return t.hide();
}) :void 0;
},
openCloseModal:function(t, e) {
var n;
return null == e && (e = !1), n = t.is(":visible"), n ? e || this.closeModal(t) :this.openModal(t), 
n;
},
openPanel:function(t) {
return t.is(":visible") && "1" === t.css("opacity") ? void 0 :(t.css({
left:"-120px"
}).show(), t.stop().animate({
left:"200px"
}, 400, "easeInOutQuart"));
},
closePanel:function(t) {
return t.is(":visible") || "0" !== t.css("opacity") ? t.stop().animate({
left:"-120px"
}, 400, "easeInOutQuart", function() {
return t.hide();
}) :void 0;
},
openClosePanel:function(t, e) {
var n;
return null == e && (e = !1), n = t.is(":visible"), n ? e || this.closePanel(t) :this.openPanel(t), 
n;
}
}, $B.Queue = function() {
function t() {
this.clear = r(this.clear, this), this.size = r(this.size, this), this.dequeue = r(this.dequeue, this), 
this.enqueue = r(this.enqueue, this), this.q = [];
}
return t.prototype.enqueue = function(t) {
return this.q.push(t);
}, t.prototype.dequeue = function() {
return this.q.shift();
}, t.prototype.size = function() {
return this.q.length;
}, t.prototype.clear = function() {
return this.q = [];
}, t;
}(), $B.Stack = function() {
function t() {
this.clear = r(this.clear, this), this.size = r(this.size, this), this.pop = r(this.pop, this), 
this.push = r(this.push, this), this.q = [];
}
return t.prototype.push = function(t) {
return this.q.push(t);
}, t.prototype.pop = function() {
return this.q.pop();
}, t.prototype.size = function() {
return this.q.length;
}, t.prototype.clear = function() {
return this.q = [];
}, t;
}(), $B.ObservableStack = function(t) {
function e() {
this.clear = r(this.clear, this), this.pop = r(this.pop, this), this.push = r(this.push, this), 
e.__super__.constructor.call(this), this.observableSize = ko.observable(0);
}
return a(e, t), e.prototype.push = function(t) {
return e.__super__.push.call(this, t), this.observableSize(this.size());
}, e.prototype.pop = function() {
return this.observableSize(this.size() - 1), e.__super__.pop.call(this);
}, e.prototype.clear = function() {
return e.__super__.clear.call(this), this.observableSize(this.size());
}, e;
}($B.Stack), window.Singleton = function() {
function t() {}
var e;
return e = void 0, t.get = function(t) {
return null != e ? e :e = new i(t);
}, t;
}(), i = function() {
function t(t) {
this.args = t;
}
return t.prototype.echo = function() {
return this.args;
}, t;
}(), n = [ "extended", "included" ], $B.Module = function() {
function t() {}
return t.extend = function(t) {
var e, i, r;
for (e in t) i = t[e], s.call(n, e) < 0 && (this[e] = i);
return null != (r = t.extended) && r.apply(this), this;
}, t.include = function(t) {
var e, i, r;
for (e in t) i = t[e], s.call(n, e) < 0 && (this.prototype[e] = i);
return null != (r = t.included) && r.apply(this), this;
}, t;
}(), Bobcat.UrlHelper = {
isEmail:function(t) {
var e;
return e = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
e.test(t);
},
hasProtocol:function(t) {
var e, n;
return e = /^((http|https|ftp|mailto|tel|fb|skype):)/, n = /^(#)/, e.test(t) || n.test(t);
},
addProtocol:function(t, e) {
return null == e && (e = !1), t = $.trim(t), 0 === t.length ? t = e ? "" :"javascript:void(0);" :this.isEmail(t) ? t = "mailto:" + t :this.hasProtocol(t) || (t = "http://" + t), 
t;
},
createUrlParser:function(t) {
var e;
return e = document.createElement("a"), e.href = this.addProtocol(t, !0), e;
}
}, Bobcat.HtmlHelper = {
htmlEncode:function(t) {
return $("<div/>").text(t).html();
},
htmlDecode:function(t) {
return $("<div/>").html(t).text();
},
checkClosingTags:function(t) {
var e, n, i, r, o, a, s, l, c, u, d;
for (n = function(t) {
var e;
return e = "area, base, br, col, embed, hr, img, input, keygen, link, meta, param, source, track, wbr".split(", "), 
t = t.split(/[<>\s]/g)[1], t = t.replace(/\//g, ""), -1 !== $.inArray(t, e) ? !0 :!1;
}, e = /<\/?([A-Z][A-Z0-9]*)\b[^>]*>/gi, s = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, 
c = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, l = t; s.test(l) || c.test(l); ) l = l.replace(s, ""), 
l = l.replace(c, "");
d = l.match(e), i = 0;
for (o in d) if (u = d[o], r = n(u), !r && (a = !0, "/" === u[1] && (a = !1), a ? i += 1 :i -= 1, 
0 > i)) return !1;
return 0 === i ? !0 :!1;
}
}, Bobcat.ImageOptionHelper = {
IMAGE_SIZE:{
small:"300x225>",
medium:"720x540>",
large:"1200x900>",
background:"2000x1200>"
},
getOptions:function(t) {
var e, n, i, r, o, a, s;
return this.conversions ? this.conversions :(window.form = t, r = t.find('[name="asset[image_size]"]').get(0), 
a = t.find('[name="asset[thumb_size]"]').get(0), o = this.toImageSize($(r).val()), 
s = this.toImageSize($(a).val()), i = function(t) {
return t.slice(0, -1).split("x")[0];
}, n = function(t) {
return t.slice(0, -1).split("x")[1];
}, e = function(t) {
var e;
return e = t.charAt(t.length - 1), "#" === e ? {
crop:"fill",
gravity:"faces:center"
} :"<" === e || ">" === e ? {
crop:"limit"
} :void 0;
}, this.conversions = {
custom:{
width:i(o),
height:n(o)
},
thumb:{
width:i(s),
height:n(s)
}
}, this.conversions.custom = _.extend(this.conversions.custom, e(o)), this.conversions.thumb = _.extend(this.conversions.thumb, e(s)), 
this.conversions);
},
toImageSize:function(t) {
return ("small" === t || "medium" === t || "large" === t || "background" === t) && (t = this.IMAGE_SIZE[t]), 
t;
}
}, t = function() {
function t(t) {
this.handler = t, this.queue = [];
}
return t.prototype.run = function() {
var t, e = this;
return t = function() {
return e.queue.length > 0 ? e.run() :void 0;
}, this.handler(this.queue.shift(), t);
}, t.prototype.append = function(t) {
return this.queue.push(t), 1 === this.queue.length ? this.run() :void 0;
}, t;
}(), e = function() {
function t(t, e, n) {
this.item = t, this.url = e, this.callback = n;
}
return t;
}(), $B.FacebookLogin = function() {
function t(t) {
this._configs = t, this.loadFacebook = r(this.loadFacebook, this), this.fbLoginPopup = r(this.fbLoginPopup, this);
}
return t.prototype.fbLoginPopup = function(t) {
return FB.login(function(e) {
if (e.authResponse) {
if (t.success) return t.success(e);
} else if (t.fail) return t.fail(e);
}, {
scope:this._configs.facebook_perms
});
}, t.prototype.loadFacebook = function(t) {
var e = this;
return window.fbAsyncInit = function() {
return FB.init({
appId:e._configs.facebook_app_id,
channelUrl:"" + window.location.protocol + "//" + window.location.host + "/fb/channel.html",
status:!1,
cookie:!0,
xfbml:!0,
oauth:!0
}), FB.Event.subscribe("auth.authResponseChange", function(e) {
if (console.log(e), "connected" === e.status) {
if (t.connected) return t.connected(e);
} else if ("not_authorized" === e.status) {
if (t.notAuthorized) return t.notAuthorized(e);
} else if (t.others) return t.others(e);
});
}, function(t) {
var e, n, i;
return e = "facebook-jssdk", i = t.getElementsByTagName("script")[0], t.getElementById(e) ? void 0 :(n = t.createElement("script"), 
n.id = e, n.async = !0, n.src = "//connect.facebook.net/en_US/all.js", i.parentNode.insertBefore(n, i));
}(document);
}, t;
}(), $B.LinkedinLogin = function() {
function t(t) {
this._configs = t, this.loadLinkedin = r(this.loadLinkedin, this), this.linkedinLoginPopup = r(this.linkedinLoginPopup, this);
}
return t.prototype.linkedinLoginPopup = function(t) {
return IN.User.authorize(function() {
if (IN.User.isAuthorized()) {
if (t.success) return t.success();
} else if (t.fail) return t.fail();
});
}, t.prototype.loadLinkedin = function(t) {
var e = this;
return window.linkedinAsyncInit = function() {
return IN.init({
api_key:e._configs.linkedin_api_key,
scope:e._configs.linkedin_perms,
authorize:!1,
credentials_cookie:!0,
credentials_cookie_crc:!0
}), IN.Event.on(IN, "auth", function() {
return IN.User.isAuthorized() && ($B.log("[LinkedIn] Authorized user"), t.connected) ? t.connected() :void 0;
}), IN.Event.on(IN, "logout", function() {
return !IN.User.isAuthorized() && ($B.log("[LinkedIn] Deauthorized user"), t.disconnected) ? t.disconnected() :void 0;
}), t.initialized ? $B.waitFor(function() {
return "undefined" != typeof IN && null !== IN && null != IN.User && null != IN.Event;
}, t.initialized, 500) :void 0;
}, $.getScript("//platform.linkedin.com/in.js?async=true", linkedinAsyncInit);
}, t;
}(), window.AjaxQueueBuffer = t, window.Task = e, $B.FirstTimeTracker = function() {
function t(t) {
var e;
e = this, this.completedActions = {}, this.firstAction = void 0, this.trackFirstTimeClickEvents(".text-component .edit-overlay", "Edit Text - Editor v1"), 
this.trackFirstTimeClickEvents("#add-new-section-button", "Click Add Section - Editor v1"), 
this.trackFirstTimeClickEvents(".preview-button.tablet", "Preview Mobile - Editor v1", {
device:"tablet"
}), this.trackFirstTimeClickEvents(".preview-button.phone", "Preview Mobile - Editor v1", {
device:"phone"
}), this.trackFirstTimeClickEvents(".panel.panel1 .edit-btn.green", "Click Tour - Editor v1"), 
this.trackFirstTimeClickEvents(".panel.panel1 .edit-btn.gray", "Click Thanks - Editor v1"), 
this.trackFirstTimeClickEvents(".panel.panel2 .edit-btn.green", "Click Next - Editor v1", {
at_step:1,
step_text:"the editor panel"
}), this.trackFirstTimeClickEvents(".panel.panel3 .edit-btn.green", "Click Next - Editor v1", {
at_step:2,
step_text:"page settings"
}), this.trackFirstTimeClickEvents(".panel.panel4 .edit-btn.green", "Click Next - Editor v1", {
at_step:3,
step_text:"page sections"
}), this.trackFirstTimeClickEvents(".panel.panel5 .edit-btn.green", "Click Next - Editor v1", {
at_step:4,
step_text:"page content"
}), this.trackFirstTimeClickEvents(".panel.panel6 .edit-btn.green", "Click Next - Editor v1", {
at_step:5,
step_text:"get help"
}), this.trackFirstTimeClickEvents(".panel.panel7 .edit-btn.green", "Click Next - Editor v1", {
at_step:6,
step_text:"all set"
}), this.trackFirstTimeClickEvents(".publish-button", "Click Publish - Editor v1"), 
this.trackFirstTimeClickEvents(".settings", "Click Settings - Editor v1"), this.trackFirstTimeClickEvents("#exit-editor-button", "Exit - Editor v1"), 
this.trackFirstTimeClickEvents(".strikingly-settings-form .edit-btn.green", "Update Settings - Editor v1"), 
t.Event.subscribe("Slide.afterReorder", function() {
return e.trackFirstTimeEditorEvent("Rearrange Section - Editor v1");
}), t.Event.subscribe("Slide.afterReorder", function() {
return e.onCompleteAction("Rearrange Section");
}), $("body").on("click", ".edit-overlay", function() {
return e.onCompleteAction("Click Edit"), !0;
}), $("body").on("click", "#add-new-section-button", function() {
return e.onCompleteAction("Click Add Section"), !0;
}), $("body").on("click", ".preview-button.tablet", function() {
return e.onCompleteAction("Preview Mobile"), !0;
}), $("body").on("click", ".preview-button.phone", function() {
return e.onCompleteAction("Preview Mobile"), !0;
}), $("body").on("change", "#page_name", function() {
return e.trackFirstTimeEditorEvent("Edit Title - Editor v1"), !0;
}), $("body").on("change", "#page_permalink", function() {
return e.trackFirstTimeEditorEvent("Edit Permalink - Editor v1"), !0;
}), $("body").on("click", ".image-editor + .edit-buttons .edit-btn.green", function() {
return e.trackFirstTimeEditorEvent("Save Image - Editor v1"), !0;
}), $("body").on("click", ".media-editor + .edit-buttons .edit-btn.green", function() {
return e.trackFirstTimeEditorEvent("Save Image - Editor v1", {
is_background:!1
}), !0;
}), $("body").on("click", "#uvTabLabel", function() {
return e.trackFirstTimeEditorEvent("Click Support - Editor v1"), !1;
});
}
return t.prototype.trackFirstTimeEditorEvent = function(t, e) {
return $B.firstTimeTrack("editor_counter", t, e), this.firstAction ? void 0 :(this.firstAction = t, 
$B.firstTimeTrack("editor_counter", "First Action - Editor v1", {
action_name:t
}));
}, t.prototype.trackFirstTimeClickEvents = function(t, e, n) {
var i;
return i = this, $("body").on("click", t, function() {
return i.trackFirstTimeEditorEvent(e, n), !0;
});
}, t.prototype.onCompleteAction = function(t) {
var e, n, i, r;
this.completedActions[t] = !0, console.log(this.completedActions), e = 0, r = this.completedActions;
for (n in r) i = r[n], e += 1;
return 5 === e ? this.trackFirstTimeEditorEvent("Complete All Actions - Editor v1", {
actions:this.completedActions
}) :void 0;
}, t;
}();
}.call(this), function() {
window.Bobcat = window.$B = window.Bobcat || {}, window.Bobcat.GALLERY_COUNTER = 1, 
window.Bobcat.DOM = {
SLIDES:".slides .slide",
PAGE_DATA_SCOPE:"page",
EDITPAGE_DATA_SCOPE:"editpage",
NAVIGATOR:"#s-header, .navigator",
FOOTER:"#footer",
FOOTER_LOGO_EDITOR:"#edit-logo-footer",
EDITOR_OVERLAY:".edit-overlay",
EDITOR:".editor",
CONTENT:".content",
PAGE_SETTING_DIALOG:"#page-settings-menu",
NEW_PAGE_MESSAGE_DIALOG:"#new-page-message-dialog",
NEW_SECTION_DIALOG:"#new-section-dialog",
SHARE_DIALOG:"#sharing-options-dialog",
PUBLISH_DIALOG:"#publish-dialog-new",
SAVED_DIALOG:"#saved-dialog",
FEEDBACK_DIALOG:"#feedback-dialog",
FEEDBACK_DIALOG_STEP1:".step-1",
FEEDBACK_DIALOG_STEP2:".step-2",
DIALOG_INACTIVE_CLASS:"inactive",
FACEBOOK_ROOT:"#fb-root",
FONT_SELECTOR:"select.fontselector",
VARIATION_SELECTOR:"select.variationselector",
PRESET_SELECTOR:"select.s-preset-selector-input",
STRIKINGLY_LOGO:"#strikingly-footer-logo",
SETTINGS:{
FORM:".strikingly-settings-form",
PUBLISH:{
FB_SHARE:"#publish-fb-button",
PUBLIC_URL:"#publish-public-url"
}
},
IMAGE_TITLE:function(t) {
return t.find("img").attr("alt") || "";
},
IMAGE_DESCRIPTION:function(t) {
return t.find("img").attr("data-description") || "";
},
GALLERY:function(t) {
var e, n, i, r;
for (r = t.parent().find("a.item"), n = 0, i = r.length; i > n; n++) e = r[n], $(e).attr("rel", "gallery_" + window.Bobcat.GALLERY_COUNTER);
return $("a.item[rel=gallery_" + window.Bobcat.GALLERY_COUNTER++ + "]");
},
GALLERY_IMAGES:function(t) {
return t.find("a.item");
},
GALLERY_IMAGES_EDITOR:function(t) {
return t.find(".gallery-editor-image");
}
};
}.call(this), function() {
var t = function(t, e) {
return function() {
return t.apply(e, arguments);
};
};
Bobcat.UserAnalyticsEngine = function() {
function e(e, n, i) {
this.user_id = e, this.user_email = n, this.urlBase = i, this.save = t(this.save, this), 
this.track = t(this.track, this), this.trackWithoutMixpanel = t(this.trackWithoutMixpanel, this), 
null == this.urlBase && (this.urlBase = $B.appMeta("analytics_logger_url"));
}
return e.prototype.trackWithoutMixpanel = function(t) {
return this.user_id && this.user_email ? this.save(this.user_id, t) :void 0;
}, e.prototype.track = function(t, e) {
return window.mixpanel.track(t, e), this.user_id && this.user_email ? this.save(this.user_id, t) :void 0;
}, e.prototype.save = function(t, e) {
var n = this;
return $.ajax({
type:"POST",
url:"" + this.urlBase + "/events",
data:{
user_id:t,
event:e
},
success:function(t) {
return "Editor - edit" === e ? _veroq.push([ "user", {
id:n.user_id,
edit_count:t.count
} ]) :void 0;
},
dataType:"json"
});
}, e;
}(), Bobcat.PageAnalyticsEngine = function() {
function e(e, n) {
this.pageData = e, this.source = n, this.sendData = t(this.sendData, this), this.logSocialClicks = t(this.logSocialClicks, this), 
this.logPageSectionView = t(this.logPageSectionView, this), this.startPing = t(this.startPing, this), 
this.logClick = t(this.logClick, this), this.logPageView = t(this.logPageView, this), 
this.baseData = {
pageId:this.pageData.page_id,
permalink:this.pageData.permalink,
referrer:document.referrer,
membership:this.pageData.membership,
createdAt:this.pageData.created_at,
strikinglyBranding:this.pageData.showStrikinglyLogo
};
}
return e.prototype.pingInterval = 1e4, e.prototype.logPageView = function() {
var t;
return t = _.extend({
eventName:"PageView"
}, this.baseData), _gaq.push([ "_setCustomVar", 1, "pageType", "page", 3 ]), _gaq.push([ "_setCustomVar", 2, "pageId", this.baseData.pageId, 3 ]), 
_gaq.push([ "_setCustomVar", 3, "permalink", this.baseData.permalink, 3 ]), _gaq.push([ "_setCustomVar", 4, "membership", this.baseData.membership, 3 ]), 
_gaq.push([ "_setCustomVar", 5, "createdAt", this.baseData.createdAt, 3 ]), _gaq.push([ "_setCustomVar", 6, "strikinglyBranding", this.baseData.strikinglyBranding, 3 ]), 
this.sendData(this.source, t);
}, e.prototype.logClick = function(t) {
var e, n, i;
return e = t.attr("data-click-name") || "N/A", n = t.attr("href") || "N/A", i = _.extend({
eventName:"PageClick",
clickName:e,
clickTarget:n
}, this.baseData), this.sendData(this.source, i);
}, e.prototype.startPing = function() {
var t, e, n = this;
return this.lastTimestamp || (this.lastTimestamp = new Date().getTime()), this.firstTimestamp || (this.firstTimestamp = this.lastTimestamp), 
t = _.extend({
eventName:"PagePing"
}, this.baseData), e = function() {
return window.setTimeout(function() {
var i;
return t.sectionId = window.slide_navigator.currentIndex(), t.sectionName = window.slide_navigator.currentSectionName(), 
i = new Date().getTime(), t.diff = i - n.lastTimestamp, t.diff > 0 && t.diff < 3e5 && n.sendData(n.source, t), 
n.lastTimestamp = i, n.logPageSectionView(), n.lastTimestamp - n.firstTimestamp < 3e5 ? e() :void 0;
}, n.pingInterval);
}, e();
}, e.prototype.logPageSectionView = function() {
var t, e, n;
return this.sectionBitmap || (this.sectionBitmap = {}), e = window.slide_navigator.currentIndex(), 
this.sectionBitmap[e] ? void 0 :(n = window.slide_navigator.currentSectionName(), 
t = _.extend({
eventName:"PageSectionView",
sectionId:e,
sectionName:n
}, this.baseData), this.sendData(this.source, t), this.sectionBitmap[e] = !0);
}, e.prototype.logSocialClicks = function(t) {
var e;
return e = _.extend({
eventName:"SocialClicks",
channel:t
}, this.baseData), this.sendData(this.source, e);
}, e.prototype.sendData = function(t, e) {
return window._grepdata.push([ "send", t, e ]);
}, e;
}();
}.call(this), function() {
var t = {}.hasOwnProperty, e = function(e, n) {
function i() {
this.constructor = e;
}
for (var r in n) t.call(n, r) && (e[r] = n[r]);
return i.prototype = n.prototype, e.prototype = new i(), e.__super__ = n.prototype, 
e;
}, n = [].indexOf || function(t) {
for (var e = 0, n = this.length; n > e; e++) if (e in this && this[e] === t) return e;
return -1;
};
window.partial = function(t, e) {
return _.template($("#" + t + "-partial").html(), e);
}, Bobcat.IndexGenerator = function() {
function t() {
this.currentIndex = 0;
}
return t.prototype.increment = function() {
return this.currentIndex += 1;
}, t.prototype.getNext = function() {
var t;
return t = this.currentIndex, this.increment(), "model" + t;
}, t;
}(), Bobcat.PageTransformer = function() {
function t(t, e) {
this.domTree = t, this.isEdit = e, this.textTransformer = new Bobcat.TextTransformer(), 
this.imageTransformer = new Bobcat.ImageTransformer(), this.htmlTransformer = new Bobcat.HtmlTransformer();
}
return t.prototype.transform = function() {
var t, e, n, i, r, o, a, s, l, c, u, d, p, h, f, m;
for (h = this.domTree.find("[data-component='repeatable_item_template']"), o = 0, 
c = h.length; c > o; o++) n = h[o], e = $(n), $("<div id='" + e.attr("id") + "_temp' style='display:none;'>" + e.html() + "</div>").appendTo(this.domTree);
for (this.indexGenerator = new Bobcat.IndexGenerator(), r = [ this.textTransformer, this.imageTransformer, this.htmlTransformer ], 
a = 0, u = r.length; u > a; a++) i = r[a], i.indexGenerator = this.indexGenerator;
for (s = 0, d = r.length; d > s; s++) i = r[s], i.transform(this.domTree, this.isEdit);
for (f = this.domTree.find("[data-component='repeatable_item_template']"), m = [], 
l = 0, p = f.length; p > l; l++) n = f[l], e = $(n), t = $("#" + e.attr("id") + "_temp"), 
$.browser.msie && parseInt($.browser.version) > 7 && t.find("*").filter(function() {
return "" !== $(this).attr("class");
}).addClass("ie-fix"), n.text = t.html(), m.push(t.remove());
return m;
}, t;
}(), Bobcat.Transformer = function() {
function t() {}
return t.prototype.validateName = function(t) {
return null == t.attr("data-name") && (this.warning("The following DOM doesn't have data-name."), 
this.warning(t)), !0;
}, t.prototype.getDataName = function(t) {
var e;
return e = t.attr("data-name"), e || (e = this.indexGenerator.getNext()), e;
}, t.prototype.clearDom = function(t) {
return t.html("");
}, t.prototype.isEditable = function(t) {
var e;
return e = t.attr("data-show"), "true" !== e;
}, t.prototype.warning = function(t) {
return console.warn(t);
}, t.prototype.error = function(t) {
return console.error(t);
}, t;
}(), Bobcat.TextTransformer = function(t) {
function i() {}
return e(i, t), i.prototype.transform = function(t, e) {
var n = this;
return this.domTree = t, this.isEdit = null != e ? e :!1, this.domTree.find("[data-component='text']").each(function(t, e) {
var i;
return i = $(e), n.validate(i) ? n.isEdit && n.isEditable(i) ? n.transformToEditable(i) :n.transformToShow(i) :void 0;
});
}, i.prototype.getTextType = function(t) {
var e;
if (e = t.attr("data-text-type")) {
if ("heading" === e) return "headingFont";
if ("title" === e) return "titleFont";
if ("navigation" === e) return "navFont";
}
return "bodyFont";
}, i.prototype.getUseFont = function(t) {
var e;
return e = t.attr("data-use-font"), "false" === e ? !1 :!0;
}, i.prototype.buildData = function(t) {
var e, n, i, r;
return e = t.html(), n = this.getDataName(t), i = this.getTextType(t), r = this.getUseFont(t), 
{
content:e,
name:n,
textType:i,
useFont:r
};
}, i.prototype.transformToShow = function(t) {
var e, n;
return e = this.buildData(t), t.addClass("text-component").html(""), n = $.trim(_.template($("#textContent-partial").html())(e)), 
$(n).appendTo(t);
}, i.prototype.transformToEditable = function(t) {
var e, n;
return e = this.buildData(t), this.clearDom(t), t.addClass("editable text-component"), 
t.attr("data-text-type", "" + e.textType), t.attr("data-name", "" + e.name), t.attr("data-bind", "css: {'empty-text': " + e.name + ".showEmptyText()}, mouseenter : " + e.name + ".mouseenterHandler, mouseleave: " + e.name + ".mouseleaveHandler, mouseclick:" + e.name + ".clickEditorHandler"), 
n = $.trim(_.template($("#textEditor").html())(e)), $(n).appendTo(t);
}, i.prototype.validate = function(t) {
var e;
return e = this.validateName(t) && this.validateTextType(t);
}, i.prototype.validateTextType = function(t) {
var e, i, r, o;
return r = !0, i = t.attr("data-text-type"), e = [ "body", "heading", "title", "navigation" ], 
i && (o = !i, n.call(e, o) >= 0 && (r = !1, this.warning("data-text-type should be one of " + e.join(", ")), 
this.warning(t))), r;
}, i;
}(Bobcat.Transformer), Bobcat.ImageTransformer = function(t) {
function n() {
return n.__super__.constructor.apply(this, arguments);
}
return e(n, t), n.prototype.transform = function(t, e) {
var n = this;
return this.domTree = t, this.isEdit = e, this.domTree.find("[data-component='image']").each(function(t, e) {
var i;
return i = $(e), n.validate(i) ? n.isEdit && n.isEditable(i) ? n.transformToEditable(i) :n.transformToShow(i) :void 0;
});
}, n.prototype.validate = function(t) {
var e;
return e = this.validateName(t) && this.validateUrl(t) && this.validateImageSize(t) && this.validateThumbSize(t);
}, n.prototype.getImageDom = function(t) {
return t.imageDom ? t.imageDom :t.imageDom = t.find("img").first();
}, n.prototype.validateUrl = function(t) {
return "undefined" == typeof this.getImageDom(t).attr("src") ? (this.error("img doesn't have a src"), 
this.error(this.getImageDom(t)), !1) :!0;
}, n.prototype.transformToEditable = function(t) {
var e, n;
return e = this.buildData(t), this.clearDom(t), t.addClass("editable image-component"), 
t.attr("data-name", "" + e.name), t.attr("data-bind", "css: {'empty-image':!" + e.name + ".hasContent()}, mouseenter : " + e.name + ".mouseenterHandler, mouseleave: " + e.name + ".mouseleaveHandler, mouseclick:" + e.name + ".clickEditorHandler"), 
n = $.trim(_.template($("#imageEditor").html())(e)), $(n).appendTo(t);
}, n.prototype.transformToShow = function(t) {
var e, n;
return e = this.buildData(t), t.html(""), n = $.trim(_.template($("#imageContent-partial").html())(e)), 
$(n).appendTo(t);
}, n.prototype.validateSize = function(t) {
return "small" === t || "medium" === t || "large" === t || "background" === t ? !0 :/^\d+x\d+[><^#]+$/.test(t) ? !0 :"undefined" == typeof t ? !0 :!1;
}, n.prototype.validateThumbSize = function(t) {
var e, n;
return e = t.attr("data-thumb-size"), n = this.validateSize(e), n || (this.warning("size format is wrong"), 
this.warning(t)), n;
}, n.prototype.validateImageSize = function(t) {
var e, n;
return e = t.attr("data-image-size"), n = this.validateSize(e), n || (this.warning("size format is wrong"), 
this.warning(t)), n;
}, n.prototype.getImageSize = function(t) {
var e;
return e = t.attr("data-image-size"), e || (e = "medium");
}, n.prototype.getThumbSize = function(t) {
var e;
return e = t.attr("data-thumb-size"), e || (e = "128x128#");
}, n.prototype.getHasUrl = function(t) {
var e;
return e = t.attr("data-use-url"), "true" === e;
}, n.prototype.getAssetUrls = function(t) {
var e;
return e = t.attr("data-assets"), e ? e.split(" ") :[];
}, n.prototype.buildData = function(t) {
var e, n, i, r, o, a, s, l;
return s = this.getImageDom(t).attr("src"), n = this.getImageDom(t).attr("alt"), 
r = this.getDataName(t), e = this.getAssetUrls(t), o = this.getImageSize(t), a = this.getThumbSize(t), 
l = this.getHasUrl(t), n || (n = ""), i = {
url:s,
caption:n,
name:r,
imageSize:o,
useUrl:l,
thumbSize:a,
assetUrls:e
};
}, n;
}(Bobcat.Transformer), Bobcat.HtmlTransformer = function(t) {
function n() {}
return e(n, t), n.prototype.transform = function(t, e) {
var n = this;
return this.domTree = t, this.isEdit = e, this.domTree.find("[data-component='html']").each(function(t, e) {
var i;
return i = $(e), n.validate(i) ? n.isEdit && n.isEditable(i) ? n.transformToEditable(i) :n.transformToShow(i) :void 0;
});
}, n.prototype.validate = function(t) {
var e;
return e = this.validateName(t);
}, n.prototype.transformToEditable = function(t) {
var e, n;
return e = this.buildData(t), this.clearDom(t), t.addClass("editable html-component"), 
t.attr("data-name", "" + e.name), t.attr("data-bind", "mouseenter : " + e.name + ".mouseenterHandler, mouseleave: " + e.name + ".mouseleaveHandler, mouseclick:" + e.name + ".clickEditorHandler"), 
n = $.trim(_.template($("#htmlEditor").html())(e)), $(n).appendTo(t);
}, n.prototype.buildData = function(t) {
var e;
return e = this.getDataName(t), {
name:e
};
}, n.prototype.transformToShow = function() {}, n;
}(Bobcat.Transformer);
}.call(this), function() {
var t = function(t, e) {
return function() {
return t.apply(e, arguments);
};
};
Bobcat.ShowPage = function() {
function e(e) {
this.checkIframe = t(this.checkIframe, this), this.init = t(this.init, this), this.data = new Bobcat.PageData(e), 
this.Event = new Bobcat.Event(), this.unsavedChanges = ko.observable(!1), this.isShowPage = !0;
}
return e.prototype.init = function() {
var t, e, n, i;
for (this.data.removePremiumSlides(), this.data.bindSlides(), Bobcat.TH.initPageHelpers(), 
i = window.runAfterDomBinding.getAllJobs(), e = 0, n = i.length; n > e; e++) t = i[e], 
t();
return window.slide_navigator.init(), this.checkIframe();
}, e.prototype.registerUserAnalytics = function() {
return $B.siteMeta("google_analytics_tracker") && (_gaq.push([ "b._trackPageview" ]), 
_gaq.push([ "b._setAccount" ], $B.siteMeta("google_analytics_tracker"))), $B.siteMeta("custom_domain") ? _gaq.push([ "b._setDomainName", $B.siteMeta("custom_domain") ]) :void 0;
}, e.prototype.checkIframe = function() {
var t, e, n, i;
return window.top.location !== window.location && document.referrer && (i = document.referrer.match(/^https?:\/\/([^.]+\.)?([^:\/\s]+)\/?.*/), 
i && (e = $B.meta("strikingly-host-name"), e && (n = $.map(e.split(","), function(t) {
return t.trim();
}), t = i[2], -1 === $.inArray(t.toLowerCase(), n)))) ? (alert("Framing is not allowed with free account. Redirecting to Strikingly.com. Please contact support@strikingly.com if you have any questions."), 
window.top.location = window.location) :void 0;
}, e;
}();
}.call(this), function() {
window.$B = window.Bobcat || {}, $B.TH = {
fixNavOnScroll:function(t, e, n) {
var i, r;
return null == n && (n = 0), $B.TH.isSmallScreen() ? void 0 :(i = function() {
return $("ul.slides li.slide").css({
"padding-top":0
}), $B.TH.isSmallScreen() ? t.css("position", "static") :(t.css("position", "fixed"), 
$("ul.slides li.slide").first().css({
"padding-top":t.outerHeight(!1)
}));
}, r = function() {
var i, r, o, a;
return r = t.outerHeight() - e.height() - n, 0 !== t.length ? (i = $(window).height(), 
o = t.height(), a = $(window).scrollTop(), a > r && (a = r), $(".demo-bar-spacer").length && (a -= $(".demo-bar-spacer").outerHeight()), 
t.stop().animate({
top:-a
})) :void 0;
}, $(window).scroll(r), $(window).resize(i), setTimeout(i, 2e3), i());
},
isMobile:function() {
return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)|(windows phone)|(iemobile)/i);
},
isAndroid:function() {
return navigator.userAgent.match(/(android)/i);
},
isWindowsPhone:function() {
return navigator.userAgent.match(/(windows phone)|(iemobile)/i);
},
isIpad:function() {
return navigator.userAgent.match(/(iPad)/i);
},
isIOS:function() {
return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i);
},
isSmallScreen:function() {
return $(window).width() <= 727 || $(window).height() < 400;
},
iOSversion:function() {
var t, e;
return /iP(hone|od|ad)/.test(navigator.platform) ? (t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), 
e = [ parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10) ], e[0]) :void 0;
},
androidVersion:function() {
var t;
return $B.TH.isAndroid() ? (t = navigator.userAgent, parseFloat(t.slice(t.indexOf("Android") + 8))) :void 0;
},
isAndroid2x:function() {
return $B.TH.isAndroid() && $B.TH.androidVersion() < 3;
},
shiftBody:function(t) {
var e, n;
return n = $("#s-content"), e = $("body"), t ? n.addClass("translate-" + t) :n.removeClass("translate-right translate-left"), 
e.css({
overflow:"visible",
"overflow-x":"visible"
}), n.css({
width:"auto"
});
},
shiftDrawer:function(t, e, n, i) {
return null == t && (t = 0), null == e && (e = !1), null == n && (n = 450), null == i && (i = "easeInOutQuart"), 
$(".navbar-drawer").toggleClass("translate");
},
shiftMobileDrawer:function(t, e, n, i) {
var r;
return null == t && (t = 0), null == e && (e = !1), null == n && (n = 450), null == i && (i = "easeInOutQuart"), 
r = $(".mobile-drawer"), e ? r.css({
right:t
}) :r.animate({
right:t
}, n, i);
},
toggleDrawer:function(t) {
var e, n, i, r, o, a, s, l;
return null == t && (t = !0), r = $(".navbar-drawer"), o = $(".navbar-drawer-bar"), 
i = $("#s-content"), $B.TH.canAnimateCSS() ? (s = "translate", e = "translate-left", 
n = "translate-right") :(s = "shown", e = "left", n = "right"), r.hasClass(s) ? (o.removeClass(e + " " + n), 
r.removeClass(s)) :(o.removeClass(e).addClass(n), r.addClass(s)), a = $(".mobile-actions"), 
a.removeClass(s), $B.TH.androidVersion() < 3 ? (l = $(window).scrollTop(), $("#nav-drawer-list").attr("data-top", l)) :void 0;
},
toggleMobileDrawer:function(t) {
var e, n;
return null == t && (t = !0), e = $(".mobile-actions"), 0 !== e.length ? (n = $B.TH.canAnimateCSS() ? "translate" :"shown", 
e.hasClass(n) ? e.removeClass(n) :e.addClass(n)) :void 0;
},
detectCSSFeature:function(t) {
var e, n, i, r, o, a, s;
if (i = !1, e = "Webkit Moz ms O".split(" "), n = document.createElement("div"), 
t = t.toLowerCase(), r = t.charAt(0).toUpperCase() + t.substr(1), void 0 !== n.style[t]) return !0;
for (a = 0, s = e.length; s > a; a++) if (o = e[a], void 0 !== n.style[o + r]) return !0;
return !1;
},
canAnimateCSS:function() {
return $B.TH.detectCSSFeature("transform") && !$B.TH.isAndroid2x() && !$B.TH.isWindowsPhone();
},
isIE:function() {
var t;
return t = navigator.userAgent.toLowerCase(), -1 !== t.indexOf("msie") ? parseInt(t.split("msie")[1]) :!1;
},
enableAnimationForBlocks:function(t) {
return null == t && (t = "75%"), !window.edit_page.isShowPage || $B.TH.isMobile() || $B.TH.isIE() && $B.TH.isIE() <= 9 ? void 0 :($(".fadeInUp").css("opacity", "0").waypoint(function() {
return $(this).addClass("animated");
}, {
offset:t
}), $(".fadeInRight").css("opacity", "0").waypoint(function() {
return $(this).addClass("animated");
}, {
offset:t
}));
},
applyTouchNav:function() {
var t, e, n;
return $B.getCustomization("disableMobileNav") ? $(".strikingly-nav-spacer").hide() :(t = $(".navbar-touch").first(), 
$(".navbar-drawer").length && (n = $("#nav-drawer-list"), $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").removeClass("hidden"), 
$(".mobile-actions").css({
height:$(".mobile-actions").height()
}), $("body").bind("touchstart", function() {}).attr("ontouchstart", "").attr("screen_capture_injected", "true"), 
$B.TH.isAndroid2x() ? $(window).height() < n.height() && (n.css({
overflow:"visible",
height:"auto"
}), $(window).scroll(function() {
var t, e, i, r;
return t = parseInt(n.attr("data-top"), 10), t || 0 === t ? (r = $(window).scrollTop(), 
i = t - r, i > 0 && (i = 0), e = $(window).height() - n.height(), e > i && (i = e), 
n.css({
top:i
})) :void 0;
})) :n.height($(window).height()), $B.TH.canAnimateCSS() && $(".navbar-drawer, .navbar-drawer-bar, .mobile-actions").addClass("strikingly-nav-transition"), 
e = $(".navbar-drawer-bar .navbar-drawer-title"), e.width() < 170 && e.height() < 20 && e.addClass("big"))), 
$(window).resize(function() {
return n = $("#nav-drawer-list"), $B.TH.isAndroid2x() || n.height($(window).height()), 
$(".navbar-drawer").hasClass("shown") || $(".navbar-drawer").hasClass("translate") ? $B.TH.toggleDrawer() :void 0;
});
},
matchHeights:function(t) {
var e, n, i, r;
if (t && ("string" == typeof t && (t = $(t)), 0 !== t.length)) {
i = {}, n = 0, t.each(function() {
var t;
return t = $(this), n = t.offset().top + "", i[n] = i[n] ? i[n].add(t) :t;
}), r = [];
for (n in i) e = i[n], e.length > 1 ? r.push($B.TH.matchHeightsAll(e)) :r.push(void 0);
return r;
}
},
matchHeightsAll:function(t) {
var e, n;
if (0 !== t.length && (e = 0, n = t.first().offset().top, t.each(function() {
var t;
return t = $(this), t.css("height", "auto"), t.height() > e ? e = t.height() :void 0;
}), !(5 > e))) return t.each(function() {
var t, n;
return n = $(this), n.css("height", e), t = n.find("img"), "" === $.trim(n.text()) && t.length ? (t.css("vertical-align", "middle"), 
n.css("line-height", e + "px")) :void 0;
});
},
applyMatchHeights:function(t, e) {
var n, i;
return null == t && (t = ".s-mhi"), null == e && (e = ".s-mh"), n = function(n) {
return null == n && (n = !0), $(e).each(function() {
var e, i, r, o;
return e = $(this), r = e.find(t), i = $(this).find("img"), o = $(this).find("img.lazy"), 
o.length ? o.on("afterAppear", function() {
return $B.TH.matchHeights(r);
}) :i.length && n ? $(this).waitForImages(function() {
return $B.TH.matchHeights(r);
}) :$B.TH.matchHeights(r);
});
}, $(window).resize(function() {
return n(!1);
}), n(!0), window.edit_page.isShowPage ? void 0 :(i = function(n, i) {
var r, o, a;
if (i && (o = i.target, a = o.closest(e), a.length)) return r = a.find(t), $B.TH.matchHeights(r);
}, window.edit_page.Event.subscribe("RichTextComponent.afterTextChange", i), window.edit_page.Event.subscribe("ImageComponent.afterChange", i), 
window.edit_page.Event.subscribe("Repeatable.add", i), window.edit_page.Event.subscribe("Repeatable.remove", i));
},
fitText:function(t) {
return 0 !== t.length ? t.each(function() {
var t, e, n, i, r;
return r = $(this), i = r.width(), n = parseInt(r.css("font-size")), t = r.css({
position:"absolute"
}).width(), r.css({
position:"relative"
}), i >= t ? void 0 :(e = n * i / t, r.css({
"font-size":e
}));
}) :void 0;
},
isTouchDevice:function() {
try {
return document.createEvent("TouchEvent"), !0;
} catch (t) {
return !1;
}
},
touchScroll:function(t) {
var e;
return $B.TH.isTouchDevice() ? (e = 0, t.addEventListener("touchstart", function(t) {
return e = this.scrollTop + t.touches[0].pageY;
}, !1), t.addEventListener("touchmove", function(t) {
return this.scrollTop = e - t.touches[0].pageY;
}, !1)) :void 0;
},
resizeIFrame:function(t) {
var e, n, i;
if (1 !== t.data("height-binding-complete")) return t.data("height-binding-complete", 1), 
$.browser.safari || $.browser.opera ? (t.load(function() {
var e;
return e = function() {
return t.height(t.contents().height() + "px");
}, setTimeout(e, 1);
}), e = t[0].src, t[0].src = "", t[0].src = e) :t.load(function() {
return t.height(t.contents().height() + "px");
}), "complete" === (null != (n = t.contents()) ? null != (i = n[0]) ? i.readyState :void 0 :void 0) && t.height() < t.contents().height() ? t.height(t.contents().height() + "px") :void 0;
},
adjustIFrameHeight:function() {
return $("iframe.s-show-frame").each(function() {
return $B.TH.resizeIFrame($(this));
});
},
enableParallax:function(t, e) {
return null == e && (e = !1), $B.TH.isMobile() || $B.TH.isSmallScreen() ? void 0 :($(window).scroll(function() {
var n, i, r;
return i = $(document).scrollTop(), r = $(window).height(), n = $(document).height(), 
t.each(function() {
var t, o, a, s, l, c, u;
if ($(this).css("background-image").length) return l = $(this), e ? (o = 0, t = n - r) :(u = l.offset().top, 
c = l.outerHeight(), o = u - r, t = u + c), s = t - o, a = 100 - .01 * ~~(1e4 * (i - o) / s), 
e && (a = 100 - a), a >= 0 && 100 >= a ? l.css({
backgroundPosition:"49.5% " + a + "%"
}) :void 0;
});
}), $(window).scroll());
},
setupStrikinglyLogo:function() {
var t, e, n, i, r, o, a;
return n = $(window), t = $(document), e = $($B.DOM.STRIKINGLY_LOGO), e && e.is(":visible") ? $B.TH.isMobile() ? (e.css({
bottom:-100,
position:"fixed"
}).show(), r = !1, n.scroll(function() {
return r = !0;
}), setInterval(function() {
var i;
if (r) {
if (i = t.height() - n.height() - 20, r = !1, n.scrollTop() >= i) return e.animate({
bottom:-20
}, 1e3, "easeInOutBack");
if (n.scrollTop() < i) return e.animate({
bottom:-100
}, 1e3, "easeInOutBack");
}
}, 250)) :(i = -70, e.css({
bottom:i,
position:"fixed"
}).hide(), a = 500, o = 100, n.scroll(function() {
var r, s, l, c, u;
return l = "free" === (null != (c = $S.page_meta) ? null != (u = c.user) ? u.membership :void 0 :void 0) ? n.height() + 100 :t.height() - a - 200, 
r = t.scrollTop() + n.height() + o, r > l + i ? (s = i + (r - l) / a * 60, s > -10 && (s = -10), 
i > s && (s = i), e.css({
bottom:s
}).show()) :e.css({
bottom:i
});
})) :void 0;
},
disableLazyload:function(t) {
return t.each(function(t, e) {
var n;
return n = $(e), null != n.data("background") && (null != n.data("background") && n.css("background-image", "url(" + n.data("background") + ")"), 
n.removeClass("lazy")), n.is("img") && null != n.data("original") ? (n.attr("src", n.data("original")), 
n.removeClass("lazy"), n.on("load", function() {
return n.trigger("afterAppear");
})) :void 0;
});
},
applyLazyload:function(t) {
return null == t && (t = $(".lazy")), t.lazyload({
effect:"fadeIn",
effect_speed:500,
skip_invisible:!1,
threshold:$(window).height()
}), $("img.lazy-img").each(function() {
return "static" === $(this).css("position") ? $(this).css("position", "relative") :void 0;
});
},
lazyloadSection:function(t) {
return null != t ? ($B.TH.disableLazyload(t.find(".lazy-background")), $B.TH.disableLazyload(t.find(".lazy-img")), 
$B.TH.applyLazyload(t.find(".lazy"))) :void 0;
},
lazyload:function() {
var t;
return $B.TH.isMobile() ? $B.TH.disableLazyload($(".lazy")) :(t = $($B.DOM.SLIDES), 
$B.TH.disableLazyload($($B.DOM.NAVIGATOR).find(".lazy").addBack()), t.each(function(t, e) {
return $B.TH.lazyloadSection($(e));
}));
},
initPageHelpers:function() {
return $B.TH.adjustIFrameHeight(), $B.TH.applyMatchHeights(), window.edit_page.isShowPage ? ($B.TH.lazyload(), 
$B.TH.setupStrikinglyLogo()) :void 0;
}
};
}.call(this), function() {
Bobcat.Event = function() {
function t() {
this.topics = {}, this.subUid = -1;
}
return t.prototype.subscribe = function(t, e) {
var n;
return this.topics[t] || (this.topics[t] = []), n = (++this.subUid).to_s, this.topics[t].push({
token:n,
func:e
}), n;
}, t.prototype.publish = function(t, e) {
var n, i, r, o, a;
if (!this.topics[t]) return !1;
for (o = this.topics[t], a = [], i = 0, r = o.length; r > i; i++) n = o[i], a.push(n.func(t, e));
return a;
}, t.prototype.unsubscribe = function(t) {
var e, n, i, r, o;
o = this.topics;
for (r in o) {
i = o[r];
for (e in i) if (n = i[e], n.token === t) return i.splice(e, 1), t;
}
return !1;
}, t;
}();
}.call(this), function() {
var t = function(t, e) {
return function() {
return t.apply(e, arguments);
};
};
window.Bobcat = window.Bobcat || {}, Bobcat.Navigator = function() {
function e() {
this.selectAndGotoSlideWithIndex = t(this.selectAndGotoSlideWithIndex, this), this.registerSlideWaypoint = t(this.registerSlideWaypoint, this), 
this.selectSlideByWaypoint = t(this.selectSlideByWaypoint, this), this.hashTagChangeHandler = t(this.hashTagChangeHandler, this), 
this.getSlideName = t(this.getSlideName, this), this.setupKeyBindings = t(this.setupKeyBindings, this), 
this.prev = t(this.prev, this), this.next = t(this.next, this), this.isLast = t(this.isLast, this), 
this.isFirst = t(this.isFirst, this), this.currentSectionName = t(this.currentSectionName, this), 
this.currentIndex = t(this.currentIndex, this), this.slideIndex = t(this.slideIndex, this), 
this.unlockKeyboard = t(this.unlockKeyboard, this), this.lockKeyboard = t(this.lockKeyboard, this), 
this.removeHash = t(this.removeHash, this), this.setupHashTagChangeHandler = t(this.setupHashTagChangeHandler, this), 
this.runMobileOptimization = t(this.runMobileOptimization, this), this.scrolling = !1, 
this.keyboardLock = !1, this.firstTime = !0, this.current = ko.observable();
}
return e.prototype.init = function() {
var t;
return $B.log("[NAVIGATOR] Init"), this.selectSlide($(".slides .slide").first()), 
this.setupHashTagChangeHandler(), t = this.registerSlideWaypoint, $(".slides .slide").each(function() {
return t($(this));
}), $B.getCustomization("pageKeybinding") && this.setupKeyBindings(), this.runMobileOptimization();
}, e.prototype.runMobileOptimization = function() {
var t;
return t = $B.TH.isMobile(), t && !location.hash ? window.scrollTo(0, 1) :void 0;
}, e.prototype.setupHashTagChangeHandler = function() {
var t = this;
return $(window).hashchange(function() {
return t.hashTagChangeHandler(location.hash);
}), 0 === $(document).scrollTop() ? setTimeout(function() {
return $(window).hashchange();
}, 1500) :void 0;
}, e.prototype.removeHash = function() {
var t;
return t = window.location.hash, "" !== t && "#" !== t && 0 !== t.indexOf("#!/~") ? "undefined" != typeof history && null !== history ? "function" == typeof history.replaceState ? history.replaceState("", document.title, window.location.pathname + window.location.search) :void 0 :void 0 :void 0;
}, e.prototype.lockKeyboard = function() {
return this.keyboardLock = !0;
}, e.prototype.unlockKeyboard = function() {
return this.keyboardLock = !1;
}, e.prototype.slideIndex = function(t) {
var e;
return e = $(".slides .slide"), e.index(t);
}, e.prototype.currentIndex = function() {
return this.slideIndex(this.current());
}, e.prototype.currentSectionName = function() {
return this.current().find("a.section-name-anchor").attr("data-section-name");
}, e.prototype.isFirst = function() {
var t;
return t = this.slideIndex(this.current()), 0 === t;
}, e.prototype.isLast = function() {
var t, e;
return e = $(".slides .slide"), t = this.slideIndex(this.current()), t === e.length - 1;
}, e.prototype.next = function() {
var t, e;
return e = $(".slides .slide"), t = e.index(this.current()), e.length - 1 > t ? this.selectAndGotoSlideWithIndex(t + 1) :t === e.length - 1 ? $("html, body").stop().animate({
scrollTop:$(document).height() - $(window).height()
}, 1200, "easeInOutQuart") :void 0;
}, e.prototype.prev = function() {
var t, e;
return e = $(".slides .slide"), t = e.index(this.current()), t > 0 ? this.selectAndGotoSlideWithIndex(t - 1) :$("html, body").stop().animate({
scrollTop:0
}, 1200, "easeInOutQuart");
}, e.prototype.setupKeyBindings = function() {
var t, e, n = this;
return e = !1, t = !0, $(document).on({
keydown:function(e) {
if (13 === e.keyCode && e.shiftKey && window.editorTracker.closeLastEditor(), !n.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) {
switch (e.keyCode) {
case 32:
e.preventDefault();
break;

case 38:
e.preventDefault();
break;

case 40:
e.preventDefault();
}
return t = !0;
}
},
keyup:function(i) {
if (clearTimeout(e), e = !1, !t) return t = !0, void 0;
if (!n.keyboardLock && !(window.editable && window.currentComponent && window.currentComponent.isState("editor") || $("input:focus, textarea:focus, select:focus, .redactor_editor:focus").length || $(document.activeElement).is(".redactor_editor"))) switch (i.keyCode) {
case 32:
return i.preventDefault(), n.next();

case 38:
return i.preventDefault(), n.prev();

case 40:
return i.preventDefault(), n.next();
}
}
});
}, e.prototype.getSlug = function(t, e) {
return t = t.toSlug(), (0 === t.length || t.match(/^[0-9]+$/g)) && (t = "_" + (e + 1)), 
t;
}, e.prototype.getSlideNames = function() {
var t, e, n, i, r, o, a, s, l;
for (i = [], l = window.edit_page.data.slides(), e = a = 0, s = l.length; s > a; e = ++a) {
for (o = l[e], n = r = "#" + this.getSlug(o.getName(), e), t = 1; -1 !== $.inArray(n, i); ) n = r + "-" + t++;
i.push(n);
}
return i;
}, e.prototype.getSlideName = function(t) {
return this.getSlideNames()[t];
}, e.prototype.hashTagChangeHandler = function(t) {
var e, n, i, r = this;
return $B.log("[NAVIGATOR] Got hash change " + t), $("html, body").stop(), n = $('a[data-scroll-name="' + t + '"]'), 
n.length ? (i = n.closest(".slide"), $B.log("[NAVIGATOR] Found section number")) :(e = $.inArray(t, this.getSlideNames()), 
-1 !== e && ($B.log("[NAVIGATOR] Found section slug"), i = $("ul.slides .slide").eq(e), 
n = i.find("a.section-anchor").first())), n.length > 0 ? (this.scrolling = !0, window.edit_page.Event.publish("Menu.beforeChange", t), 
$(Bobcat.DOM.FACEBOOK_ROOT).css("height", "1px"), this.selectSlide(i), $B.log("[NAVIGATOR] Animating to #" + ($(".slides .slide").index(i) + 1)), 
$("html, body").stop().animate({
scrollTop:n.first().offset().top
}, 1200, "easeInOutQuart", function() {
return $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "0px"), window.edit_page.Event.publish("Menu.afterChange", t), 
r.scrolling = !1;
})) :void 0;
}, e.prototype.selectSlideByWaypoint = function(t, e) {
var n;
return n = this.getSlideName(e), window.location.hash !== n ? ($B.log("[NAVIGATOR] Selecting slide " + (e + 1) + " by waypoint"), 
this.selectSlide(t), this.removeHash()) :void 0;
}, e.prototype.registerSlideWaypoint = function(t) {
var e, n, i, r, o = this;
return n = this.slideIndex, t.waypoint(function(e) {
var i, r;
if (o.firstTime) return o.firstTime = !1, $B.log("[NAVIGATOR] Canceling first waypoint event"), 
void 0;
if (!o.scrolling) {
if (r = n(t), "down" === e || 0 === r) i = t; else if ("up" === e && (i = t.prev(), 
r -= 1, 0 === $(document).scrollTop() && 0 !== r)) return;
return $B.log("[NAVIGATOR] Got waypoint event " + e + ", " + r), o.selectSlideByWaypoint(i, r);
}
}, {
offset:"50%",
continuous:!1
}), e = 0, 0 === (null != (i = t.first()) ? null != (r = i.offset()) ? r.top :void 0 :void 0) ? $(window).scroll(function() {
var i;
if (!o.scrolling && 0 === n(t.first()) && t.first().height() < .5 * $(window).height() && t.eq(1).length) {
if (i = $(document).scrollTop(), e === i) return;
return 0 === i ? o.selectSlideByWaypoint(t.first(), 0) :0 === e && o.selectSlideByWaypoint(t.eq(1), 1), 
e = i;
}
}) :void 0;
}, e.prototype.selectSlide = function(t) {
return $(".slides .slide").removeClass("selected"), t.addClass("selected"), this.current(t), 
this.currentIndex();
}, e.prototype.selectAndGotoSlideWithIndex = function(t) {
return window.location.hash = this.getSlideName(t);
}, e;
}();
}.call(this), function() {
var t = function(t, e) {
return function() {
return t.apply(e, arguments);
};
}, e = {}.hasOwnProperty, n = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
window.currentComponent = null, window.currentRepeatable = null, Bobcat.EditorTracker = function(e) {
function i() {
this.closeLastEditor = t(this.closeLastEditor, this), this.addOpenedEditor = t(this.addOpenedEditor, this), 
this.removeFromOpenedEditors = t(this.removeFromOpenedEditors, this), this.hasOpenedEditor = t(this.hasOpenedEditor, this), 
this.openedEditors = [];
}
return n(i, e), i.prototype.hasOpenedEditor = function() {
return 0 === this.openedEditors.length;
}, i.prototype.removeFromOpenedEditors = function(t) {
var e;
return e = $.inArray(t, this.openedEditors), e > -1 ? this.openedEditors.splice(e, 1) :void 0;
}, i.prototype.addOpenedEditor = function(t) {
return this.openedEditors.push(t);
}, i.prototype.closeLastEditor = function() {
var t;
return t = this.openedEditors.pop(), t && (Bobcat.AE.track("Editor - Combo Key - Done"), 
t.doneClickHandler()), t;
}, i;
}($B.Module), window.editorTracker = new Bobcat.EditorTracker(), Bobcat.ComponentHelper = {
TRANSPARENT_IMAGE_URL:"/assets/icons/transparent.png",
isImageTransparent:function(t) {
return null == t && (t = ""), -1 !== t.indexOf(this.TRANSPARENT_IMAGE_URL);
}
}, Bobcat.Component = function(e) {
function i(e, n) {
null == e && (e = {}), null == n && (n = {}), this.destroy = t(this.destroy, this), 
this.loadData = t(this.loadData, this), this.storeCommand = t(this.storeCommand, this), 
this.doneClickHandler = t(this.doneClickHandler, this), this.hideEditorHandler = t(this.hideEditorHandler, this), 
this.clickEditorHandler = t(this.clickEditorHandler, this), this.mouseleaveHandler = t(this.mouseleaveHandler, this), 
this.mouseenterHandler = t(this.mouseenterHandler, this), this.firstTimeToLoad = !0, 
this.loadData(e, n), this.selected = ko.observable(), this.dialogOpen = ko.observable(!1), 
this.state = ko.observable(0), this.lastData = e, this.mapping = n;
}
return n(i, e), i.include(Bobcat.ComponentHelper), i.prototype.isNull = function(t) {
return "undefined" == typeof t || null === t;
}, i.prototype.isState = function(t) {
return "normal" === t && 0 === this.state() ? !0 :"overlay" === t && 1 === this.state() ? !0 :"editor" === t && 2 === this.state() ? !0 :!1;
}, i.prototype.gotoState = function(t) {
return "normal" === t ? (this === window.currentComponent && (window.currentComponent = null), 
this === window.currentRepeatable && (window.currentRepeatable = null), this.state(0), 
window.editorTracker.removeFromOpenedEditors(this)) :"overlay" === t ? this.type && "RepeatableItem" === this.type() || !window.currentComponent || !window.currentComponent.isState("overlay") ? (this.type && "RepeatableItem" === this.type() ? window.currentRepeatable = this :window.currentComponent = this, 
this.state(1)) :(window.currentComponent.gotoState("normal"), void 0) :"editor" === t ? (window.editorTracker.addOpenedEditor(this), 
this.state(2)) :void 0;
}, i.prototype.mouseenterHandler = function() {
return this.isState("normal") ? this.gotoState("overlay") :void 0;
}, i.prototype.mouseleaveHandler = function() {
return this.isState("overlay") ? this.gotoState("normal") :void 0;
}, i.prototype.clickEditorHandler = function() {
return this.isState("overlay") ? this.gotoState("editor") :void 0;
}, i.prototype.hideEditorHandler = function() {
return this.isState("editor") ? this.gotoState("normal") :void 0;
}, i.prototype.doneClickHandler = function(t) {
return this.hideEditorHandler(t), window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutMixpanel("Editor - Edited " + this.type()), 
window.edit_page.saveWhenUnsaved(!0), this.storeCommand();
}, i.prototype.storeCommand = function() {
var t;
return t = this.lastData, this.lastData = JSON.parse(ko.toJSON(ko.mapping.toJS(this))), 
$B.Singleton.TimeMachine.pushOp({
action:"modify",
self:this,
data:{
mapping:this.mapping,
oldValue:t,
newValue:this.lastData
}
});
}, i.prototype.loadData = function(t, e) {
var n, i, r;
null == t && (t = {}), null == e && (e = {}), this.firstTimeToLoad && (this.lastData = t, 
this.firstTimeToLoad = !1), ko.mapping.fromJS(t, e, this), r = [];
for (n in t) i = t[n], this[n] && ko.isSubscribable(this[n]) ? r.push(this[n].subscribe(function() {
return window.edit_page.unsavedChanges(!0);
})) :r.push(void 0);
return r;
}, i.prototype.destroy = function() {}, i;
}($B.Module);
}.call(this), function() {
var t = function(t, e) {
return function() {
return t.apply(e, arguments);
};
}, e = {}.hasOwnProperty, n = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
window.asset_path = function(t) {
var e, n;
return e = $("meta[name=asset-url]").attr("content"), n = /^\/assets\//, n.test(t) && e && (t = e + t), 
t;
}, Bobcat.DelayJob = function() {
function e() {
this.init = t(this.init, this), this.getAllJobs = t(this.getAllJobs, this), this.getJob = t(this.getJob, this), 
this.add = t(this.add, this), this.jobs = {};
}
return e.prototype.add = function(t, e) {
return this.jobs[t] = e;
}, e.prototype.getJob = function(t) {
return this.jobs[t];
}, e.prototype.getAllJobs = function() {
var t, e, n, i;
n = [], i = this.jobs;
for (e in i) t = i[e], n.push(t);
return n;
}, e.prototype.init = function() {}, e;
}(), window.runAfterDomBinding = new Bobcat.DelayJob(), Bobcat.PageData = function(e) {
function i(e) {
this.removePremiumSlides = t(this.removePremiumSlides, this), this.selectedPreset = t(this.selectedPreset, this);
var n;
this.isNull(e.showNavigationButtons) && (e.showNavigationButtons = !1), this.isNull(e.submenu) && (e.submenu = {
type:"SubMenu",
list:[],
components:{
link:{
type:"Button",
url:"http://www.wordpress.com",
text:"Blog",
new_target:!0
}
}
}), this.isNull(e.templateVariation) && (e.templateVariation = ""), this.isNull(e.templatePreset) && (e.templatePreset = ""), 
n = {
slides:{
create:function(t) {
return new Bobcat.Slide(t.data);
}
},
menu:{
create:function(t) {
return new Bobcat.Menu(t.data);
}
},
footer:{
create:function(t) {
return new Bobcat.Footer(t.data);
}
},
submenu:{
create:function(t) {
return new Bobcat.SubMenu(t.data);
}
}
}, i.__super__.constructor.call(this, e, n);
}
return n(i, e), i.prototype.selectedPreset = function() {}, i.prototype.removePremiumSlides = function() {
var t, e;
return (e = $B.meta("premium-slides")) ? (t = e.split(","), this.slides($.grep(this.slides(), function(e) {
return -1 === $.inArray(e.data.template_name, t);
}))) :void 0;
}, i.prototype.bindSlides = function() {
var t, e, n, i, r, o, a, s, l, c;
for (this.menu.bind($(Bobcat.DOM.NAVIGATOR)), this.footer.bind($(Bobcat.DOM.FOOTER)), 
$(Bobcat.DOM.SLIDES).length !== this.slides().length && console.warn("Slide data and .slide classes are different."), 
s = this.slides(), e = i = 0, o = s.length; o > i; e = ++i) n = s[e], t = $(Bobcat.DOM.SLIDES).eq(e), 
n.index(e), n.html(t);
for (this.slides.subscribe(function(t) {
var n, i, r, o, a;
for (e = i = 0, o = t.length; o > i; e = ++i) n = t[e], n.index(e);
for (r = 0, a = t.length; a > r; r++) n = t[r], n.html().find(".section-anchor").attr("data-scroll-name", "#" + (n.index() + 1)), 
n.beforeMoveHandler(), $(".slides").append(n.html()), n.afterMovedHandler();
return $.waypoints("refresh");
}), ko.applyBindings(this, Bobcat.DOM.PAGE_DATA_SCOPE), l = this.slides(), c = [], 
r = 0, a = l.length; a > r; r++) n = l[r], c.push(n.bind());
return c;
}, i.prototype.addSlideData = function(t, e) {
return this.slides.splice(t, 0, e), window.edit_page.setupTooltips();
}, i.prototype.removeSlideData = function(t) {
return this.slides.splice(t, 1), window.edit_page.removeTooltips();
}, i.prototype.hideAllEditors = function() {
var t, e, n, i;
for (i = this.slides(), e = 0, n = i.length; n > e; e++) t = i[e], t.hideAllEditors();
return this.menu.hideAllEditors();
}, i.prototype.highlightInNav = function(t) {
var e;
return e = t.data, e.isSelected() && !e.isHidden() ? !0 :void 0;
}, i;
}(Bobcat.Component), Bobcat.Slide = function(e) {
function i(e) {
var n;
this.data = e, this.destroy = t(this.destroy, this), this.deleteSlide = t(this.deleteSlide, this), 
this.isSelected = t(this.isSelected, this), this.isHighlighted = t(this.isHighlighted, this), 
this.getName = t(this.getName, this), this.isHidden = t(this.isHidden, this), this.selectSlide = t(this.selectSlide, this), 
this.toggleMenu = t(this.toggleMenu, this), this.renameDone = t(this.renameDone, this), 
this.rename = t(this.rename, this), n = {
components:{
create:function(t) {
var e, n, i, r;
n = {}, r = t.data;
for (e in r) i = r[e], n[e] = new Bobcat[i.type](i), "undefined" != typeof n[e].init && n[e].init();
return n;
}
}
}, i.__super__.constructor.call(this, this.data, n), this.html = ko.observable(), 
this.index = ko.observable(), this.renameMode = ko.observable(!1);
}
return n(i, e), i.StripHtml = function(t) {
return Bobcat.Gallery.StripHtml(t);
}, i.prototype.htmlCopy = function() {
return this.html().html();
}, i.prototype.hideAllEditors = function() {
var t, e, n, i;
n = this.components, i = [];
for (e in n) t = n[e], i.push(t.hideEditorHandler());
return i;
}, i.prototype.bind = function() {
return ko.applyBindings(this.components, this.html().get(0));
}, i.prototype.rename = function(t) {
return this.renameMode(!0), window.dom = t, $(t.closest(".section").find("input").first()).focus(), 
window.slide_navigator.lockKeyboard();
}, i.prototype.renameDone = function() {
return this.renameMode(!1), window.slide_navigator.unlockKeyboard(), Bobcat.AE.track("Editor - Rename Section");
}, i.prototype.toggleMenu = function() {
var t;
return t = this.components.slideSettings.show_nav(), this.components.slideSettings.show_nav(!t);
}, i.prototype.selectSlide = function(t) {
return this.isSelected() ? this.rename(t) :window.slide_navigator.selectAndGotoSlideWithIndex(this.index());
}, i.prototype.isHidden = function() {
return !this.components.slideSettings.show_nav();
}, i.prototype.hashHref = function() {
return window.slide_navigator.getSlideName(this.index());
}, i.prototype.getName = function() {
return this.components.slideSettings.name();
}, i.prototype.isHighlighted = function() {
var t, e;
if (this.isSelected() && !this.isHidden()) return !0;
if (this.index() > window.slide_navigator.currentIndex()) return !1;
for (t = this.index() + 1, e = window.edit_page.data.slides(); e[t] && e[t].isHidden(); ) {
if (e[t].isSelected()) return !0;
t += 1;
}
return !1;
}, i.prototype.isSelected = function() {
return window.slide_navigator.currentIndex() === this.index();
}, i.prototype.deleteSlide = function() {
var t, e = this;
return t = !0, $("html body").stop().animate({
scrollTop:this.html().first().offset().top
}, 500, "easeInOutQuart", function() {
return t && (t = !1, window.confirm(I18n.t("js.pages.edit.confirm.delete_section"))) ? (window.edit_page.deleteSlide(e.index()), 
e.destroy()) :void 0;
});
}, i.prototype.destroy = function() {
var t, e, n, i;
n = this.components, i = [];
for (e in n) t = n[e], i.push(t.destroy());
return i;
}, i.prototype.duplicateSlide = function() {
return window.edit_page.duplicateSlide(this.index()), window.edit_page.removeTooltips();
}, i.prototype.beforeMoveHandler = function() {
var t, e, n, i;
n = this.components, i = [];
for (e in n) t = n[e], null != t.beforeMoveHandler ? i.push(t.beforeMoveHandler()) :i.push(void 0);
return i;
}, i.prototype.afterMovedHandler = function() {}, i;
}(Bobcat.Component), Bobcat.Text = function(t) {
function e(t) {
var n;
n = {
style:{
create:function(t) {
return new Bobcat.TextStyle(t.data);
}
}
}, e.__super__.constructor.call(this, t, n), this.oldValue = ko.observable();
}
return n(e, t), e.prototype.edit = function() {
return e.__super__.edit.call(this), this["default"]() ? (this.oldValue(this.value()), 
this.value("&nbsp;")) :void 0;
}, e.prototype.deselect = function() {
return e.__super__.deselect.call(this), this["default"]() ? "&nbsp;" === this.value() ? this.value(this.oldValue()) :this["default"](!1) :void 0;
}, e;
}(Bobcat.Component), Bobcat.RichText = function(e) {
function i(e) {
this.isCenterAligned = t(this.isCenterAligned, this), this.isRightAligned = t(this.isRightAligned, this), 
this.isLeftAligned = t(this.isLeftAligned, this), this.hasContentOrIsEditMode = t(this.hasContentOrIsEditMode, this), 
this.showEmptyText = t(this.showEmptyText, this), this.hasContent = t(this.hasContent, this), 
this.clickEditorHandler = t(this.clickEditorHandler, this), this.changeFontHandler = t(this.changeFontHandler, this), 
this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), this.doneClickHandler = t(this.doneClickHandler, this), 
this.deleteHandler = t(this.deleteHandler, this), i.__super__.constructor.call(this, e), 
this.textarea = null, this.editor = null, this.originText = null;
}
return n(i, e), i.prototype.deleteHandler = function(t, e) {
return e.stopPropagation(), this.editor && this.editor.tinymce() ? (this.editor.tinymce().setContent(""), 
this.editor.tinymce().focus()) :void 0;
}, i.prototype.init = function() {}, i.prototype.doneClickHandler = function(t) {
return this.done(), i.__super__.doneClickHandler.call(this, t), window.edit_page.Event.publish("RichTextComponent.afterTextChange", {
target:t.closest(".text-component")
});
}, i.prototype.clickCancelEditorHandler = function() {
return this.cancel(), this.hideEditorHandler();
}, i.prototype.changeFontHandler = function(t) {
return this.doneClickHandler(t), window.edit_page.showFontMenu(t.attr("text-type")), 
window.edit_page.showMenu();
}, i.prototype.clickEditorHandler = function(t) {
var e = this;
if (i.__super__.clickEditorHandler.call(this, t)) return this.textarea = t.find(Bobcat.DOM.EDITOR).find("textarea"), 
this.originText = this.filterText(this.textarea.val()), this.editor && this.editor.tinymce() || (this.editor = this.textarea.tinymce({
theme:"advanced",
skin:"striking",
plugins:"autoresize,paste,inlinepopups",
forced_root_block:"div",
remove_linebreaks:!1,
theme_advanced_buttons1:"bold,italic,underline,link,unlink,bullist,numlist,justifyleft,justifycenter,justifyright,justifyfull",
theme_advanced_buttons2:"",
theme_advanced_statusbar_location:"none",
theme_advanced_toolbar_align:"left",
paste_text_sticky:!0,
convert_urls:!1,
relative_urls:!1,
valid_styles:{
"*":"text-align,text-decoration"
},
setup:function(t) {
return t.onInit.add(function(t) {
return t.pasteAsPlainText = !0;
}), t.onKeyDown.add(function(t, e) {
return 13 === e.keyCode && e.shiftKey && window.editorTracker.closeLastEditor() ? e.preventDefault() :void 0;
}), t.onClick.add(function(t) {
return $(t.getBody()).find("a").each(function(t, n) {
var i;
return i = $(n).attr("href"), e.pattern || (e.pattern = new RegExp("^((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i")), 
e.pattern.test(i) ? ($(n).attr("href", "http://" + i), $(n).attr("data-mce-href", "http://" + i)) :void 0;
});
});
}
})), this.editor.tinymce() ? this.editor.tinymce().focus() :void 0;
}, i.prototype.hasContent = function() {
return !/^\s*$/.test(this.value());
}, i.prototype.showEmptyText = function() {
return !this.hasContent() && !this.isState("editor");
}, i.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, i.prototype.isLeftAligned = function() {
return /style="text-align: left;"/.test(this.value());
}, i.prototype.isRightAligned = function() {
return /style="text-align: right;"/.test(this.value());
}, i.prototype.isCenterAligned = function() {
return /style="text-align: center;"/.test(this.value());
}, i.prototype.done = function() {
var t;
return this.editor && this.editor.tinymce() ? (t = this.filterText(this.textarea.val()), 
this.value(t), this.originText = t) :void 0;
}, i.prototype.filterText = function(t) {
return t = t.replace(/^<div>(\s|&nbsp;)?<\/div>$/, ""), t.replace("<p><br></p>", "");
}, i.prototype.cancel = function() {
return this.editor && this.editor.tinymce() ? (this.value(this.originText), this.textarea.tinymce().execCommand("mceSetContent", !1, this.originText)) :void 0;
}, i.prototype.beforeMoveHandler = function() {
return this.editor && this.editor.tinymce() ? (this.editor.tinymce().remove(), this.gotoState("normal")) :void 0;
}, i.prototype.afterMoveHandler = function() {}, i;
}(Bobcat.Text), Bobcat.SocialMediaList = function(e) {
function i(e) {
this.doneClickHandler = t(this.doneClickHandler, this), this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = t(this.clickEditorHandler, this), this.bind = t(this.bind, this);
var n, r, o = this;
n = $.extend(!0, {}, e), window.social_media_config.updateButtonListData(n), r = {
link_list:{
create:function(t) {
return new Bobcat[t.data.type](t.data, o);
}
},
button_list:{
create:function(t) {
return new Bobcat[t.data.type](t.data, o);
}
}
}, i.__super__.constructor.call(this, n, r), this.mediaListHtml = ko.observable();
}
return n(i, e), i.prototype.bind = function() {
return this.render();
}, i.prototype.render = function() {
var t, e, n, i, r, o, a, s, l, c;
for (n = "", s = this.button_list(), i = 0, o = s.length; o > i; i++) e = s[i], 
e.show_button() && (n += e.getTemplate());
for (this.mediaListHtml(n), l = this.button_list(), c = [], r = 0, a = l.length; a > r; r++) e = l[r], 
t = $('meta[name="force-social-js"]') && "true" === $('meta[name="force-social-js"]').attr("content"), 
window.edit_page.isShowPage ? e.show_button() || t ? c.push(e.reRender()) :c.push(void 0) :c.push(e.reRender());
return c;
}, i.prototype.clickEditorHandler = function(t) {
return i.__super__.clickEditorHandler.call(this, t);
}, i.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, i.prototype.doneClickHandler = function(t) {
var e, n, r, o;
for (this.render(), o = this.link_list(), n = 0, r = o.length; r > n; n++) e = o[n], 
e.doneClickHandler();
return i.__super__.doneClickHandler.call(this, t);
}, i;
}(Bobcat.Component), Bobcat.SocialMediaItem = function(e) {
function i(e) {
this.doneClickHandler = t(this.doneClickHandler, this), this.onScriptLoad = t(this.onScriptLoad, this), 
this.getUrl = t(this.getUrl, this);
var n = this;
e.link_url || (e.link_url = ""), e.share_text || (e.share_text = window.social_media_config.get("description")), 
i.__super__.constructor.call(this, e), this.show_link = ko.dependentObservable(function() {
return n.link_url().length > 0;
});
}
return n(i, e), i.include(Bobcat.UrlHelper), i.prototype.getUrl = function() {
return this.url && this.url() ? this.url() :window.social_media_config.get("url");
}, i.prototype.getSubtitle = function() {
return "";
}, i.prototype.openLinkInput = function(t) {
var e;
return e = t.closest(".social-media-item"), e.length ? (e.find("input.url").show(), 
t.hide()) :void 0;
}, i.prototype.onScriptLoad = function() {
return this.runScript();
}, i.prototype.createScriptTag = function(t, e) {
var n, i;
return n = $("<div></div>").addClass(t), i = $("<script></script>").attr({
async:!0,
src:e
}), i.bind("load", this.onScriptLoad), n.get(0).appendChild(i.get(0)), $("#fb-root").get(0).appendChild(n.get(0));
}, i.prototype.doneClickHandler = function() {
var t, e;
return e = this.link_url(), t = this.addProtocol(e, !0), this.link_url(t);
}, i;
}(Bobcat.Component), Bobcat.Facebook = function(e) {
function i(e, n) {
this.parent = n, this.runScript = t(this.runScript, this), e.app_id = window.social_media_config.get("fb_app_id"), 
e.imageUrl = asset_path("/assets/icons/facebook.png"), i.__super__.constructor.call(this, e);
}
return n(i, e), i.prototype.getTemplate = function() {
return '<div class="col fb-counter"><fb:like href="' + this.getUrl() + '" send="false" layout="button_count" data-width="100" show_faces="false" font="arial"></fb:like></div>';
}, i.prototype.getSubtitle = function() {
return "Facebook Like";
}, i.prototype.runScript = function() {
return "undefined" != typeof FB ? (FB.init({
appId:this.app_id(),
status:!0,
cookie:!0,
xfbml:!0
}), FB.Event.subscribe("edge.create", function(t) {
return window.edit_page.Event.publish("Site.facebook.edge.create", t), $("#footer").css("margin-bottom", "150px");
})) :void 0;
}, i.prototype.reRender = function() {
return $("#fb-root .facebook_script").length < 1 ? this.createScriptTag("facebook_script", document.location.protocol + "//connect.facebook.net/en_US/all.js") :this.runScript();
}, i;
}(Bobcat.SocialMediaItem), Bobcat.LinkedIn = function(e) {
function i(e, n) {
this.parent = n, this.runScript = t(this.runScript, this), e.imageUrl = asset_path("/assets/icons/linkedin.png"), 
i.__super__.constructor.call(this, e);
}
return n(i, e), i.prototype.getTemplate = function() {
return '<div class="col linkedin-counter"><script type="IN/Share" data-showzero="true" data-counter="right" data-url="' + this.getUrl() + '"></script></div>';
}, i.prototype.getSubtitle = function() {
return "LinkedIn Share";
}, i.prototype.runScript = function() {}, i.prototype.reRender = function() {
try {
delete window.IN;
} catch (t) {
window.IN = void 0;
}
return $("#fb-root .linkedin_script").remove(), this.createScriptTag("linkedin_script", document.location.protocol + "//platform.linkedin.com/in.js");
}, i;
}(Bobcat.SocialMediaItem), Bobcat.Twitter = function(e) {
function i(e, n) {
this.parent = n, this.runScript = t(this.runScript, this), e.imageUrl = asset_path("/assets/icons/twitter.png"), 
i.__super__.constructor.call(this, e);
}
return n(i, e), i.prototype.getTemplate = function() {
return '<div class="col twitter-counter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + this.getUrl() + '" data-text="' + this.share_text() + '"  data-count="horizontal">Tweet</a></div>';
}, i.prototype.getSubtitle = function() {
return "Tweet button";
}, i.prototype.runScript = function() {
return "undefined" != typeof twttr && "undefined" != typeof twttr.widgets ? twttr.widgets.load() :void 0;
}, i.prototype.reRender = function() {
return $("#fb-root .twitter_script").length < 1 ? this.createScriptTag("twitter_script", document.location.protocol + "//platform.twitter.com/widgets.js") :this.runScript();
}, i;
}(Bobcat.SocialMediaItem), Bobcat.GPlus = function(e) {
function i(e, n) {
this.parent = n, this.runScript = t(this.runScript, this), e.imageUrl = asset_path("/assets/icons/gplus.png"), 
i.__super__.constructor.call(this, e);
}
return n(i, e), i.prototype.getTemplate = function() {
return '<div class="col gplus-counter"><g:plusone size="medium" annotation="bubble" href="' + this.getUrl() + '" ></g:plusone></div>';
}, i.prototype.getSubtitle = function() {
return "Google +1";
}, i.prototype.runScript = function() {
var t;
return "undefined" != typeof gapi && "undefined" != typeof gapi.plusone ? (t = $(".gplus-counter"), 
t.each(function() {
return gapi.plusone.go(this);
})) :void 0;
}, i.prototype.reRender = function() {
return $("#fb-root .gplus_script").length < 1 ? this.createScriptTag("gplus_script", document.location.protocol + "//apis.google.com/js/plusone.js") :this.runScript();
}, i;
}(Bobcat.SocialMediaItem), Bobcat.Renren = function(e) {
function i(e, n) {
this.parent = n, this.runScript = t(this.runScript, this), e.imageUrl = asset_path("/assets/icons/renren.png"), 
i.__super__.constructor.call(this, e);
}
return n(i, e), i.prototype.getSubtitle = function() {
return "人人喜欢";
}, i.prototype.getTemplate = function() {
var t, e;
this.p = [], t = {
url:this.getUrl(),
title:window.social_media_config.get("title"),
description:window.social_media_config.get("description"),
image:window.social_media_config.get("image")
};
for (e in t) this.p.push(e + "=" + encodeURIComponent(t[e] || ""));
return '<div class="col renren-counter"><iframe scrolling="no" frameborder="0" allowtransparency="true" src="' + document.location.protocol + "//www.connect.renren.com/like/v2?" + this.p.join("&") + '" style="width:130px;height:24px;"></iframe></div>';
}, i.prototype.runScript = function() {}, i.prototype.reRender = function() {}, 
i;
}(Bobcat.SocialMediaItem), Bobcat.SinaWeibo = function(e) {
function i(e, n) {
this.parent = n, this.runScript = t(this.runScript, this), this.getTemplate = t(this.getTemplate, this), 
e.imageUrl = asset_path("/assets/icons/weibo.png"), i.__super__.constructor.call(this, e);
}
return n(i, e), i.prototype.getSubtitle = function() {
return "新浪微博";
}, i.prototype.getTemplate = function() {
var t, e, n, i, r;
r = 90, i = 24, e = {
url:this.getUrl(),
type:"2",
count:"1",
title:window.social_media_config.get("title"),
pic:window.social_media_config.get("image"),
rnd:new Date().valueOf()
}, n = [];
for (t in e) n.push(t + "=" + encodeURIComponent(e[t] || ""));
return '<div class="col sinaweibo-counter"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="' + document.location.protocol + "//hits.sinajs.cn/A1/weiboshare.html?" + n.join("&") + '" width="' + r + '" height="' + i + '"></iframe></div>';
}, i.prototype.runScript = function() {}, i.prototype.reRender = function() {}, 
i;
}(Bobcat.SocialMediaItem), Bobcat.Person = function(t) {
function e(t, n) {
this.parent = n, e.__super__.constructor.call(this, t), this.name = new Bobcat.RichText(this.name), 
this.name.init(), this.title = new Bobcat.RichText(this.title), this.title.init(), 
this.image = new Bobcat.Image(this.image, {}), this.choosingImage = ko.observable(!1);
}
return n(e, t), e.prototype.remove = function() {
return this.parent.list.remove(this);
}, e.prototype.toggleImageChooser = function() {
return this.choosingImage(!this.choosingImage());
}, e;
}(Bobcat.Component), Bobcat.Video = function(e) {
function i(e) {
this.remove = t(this.remove, this), this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = t(this.clickEditorHandler, this), this.errorCallback = t(this.errorCallback, this), 
this.successCallback = t(this.successCallback, this), this.upload = t(this.upload, this);
i.__super__.constructor.call(this, e), this.visible = ko.dependentObservable(function() {
return !window.edit_page.isLoading();
});
}
return n(i, e), i.include(Bobcat.UrlHelper), i.prototype.upload = function(t) {
var e = this;
if (!window.edit_page.isLoading()) return window.edit_page.isLoading(!0), t.target && (t = $(t.target)), 
this.url(this.addProtocol(this.url())), t.closest("form").ajaxSubmit({
url:"/s/videos.json",
type:"POST",
dataType:"json",
beforeSend:function(t) {
return t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(t) {
return console.log(t), "retry" === t.html ? $.strikingPoller("/s/tasks/" + t.message.type + "/" + t.message.id + ".jsm?v=1", e.successCallback, e.errorCallback) :"success" === t.html ? e.successCallback(t) :void 0;
},
error:this.errorCallback
});
}, i.prototype.successCallback = function(t) {
return window.edit_page.isLoading(!1), this.html(t.message.html), Bobcat.AE.track("Editor - Add Video");
}, i.prototype.errorCallback = function(t) {
var e;
return e = jQuery.parseJSON(t.responseText), window.edit_page.isLoading(!1), $B.log(e), 
alert(I18n.t(e.html, e.message.i18n));
}, i.prototype.clickEditorHandler = function(t) {
return this.oldHtml = this.html(), i.__super__.clickEditorHandler.call(this, t);
}, i.prototype.clickCancelEditorHandler = function() {
return this.html(this.oldHtml), this.hideEditorHandler();
}, i.prototype.remove = function() {
return this.html(""), this.url("");
}, i;
}(Bobcat.Component), Bobcat.Repeatable = function(e) {
function i(e) {
this.hasContent = t(this.hasContent, this), this.selectedIndex = t(this.selectedIndex, this), 
this.changeToPrev = t(this.changeToPrev, this), this.changeToNext = t(this.changeToNext, this), 
this.changeSelected = t(this.changeSelected, this), this.add = t(this.add, this);
var n, r = this;
this.isNull(e.subItemClassName) && (e.subItemClassName = "RepeatableItem"), n = {
list:{
create:function(t) {
return new Bobcat[e.subItemClassName](t.data, r);
}
},
components:{
create:function(t) {
return t.data;
}
}
}, i.__super__.constructor.call(this, e, n), this.selected = ko.observable(), this.direction = ko.observable(1);
}
return n(i, e), i.prototype.add = function(t) {
var e;
return e = new (Bobcat[this.subItemClassName()])({
components:this.components
}, this), this.changeSelected(e), this.list.push(e), this.changeSelected(e), window.edit_page.Event.publish("Repeatable.add", {
target:t
}), Bobcat.AE.track("Editor - Add Repeatable"), this.storeCommand();
}, i.prototype.changeSelected = function(t) {
return this.selected() && t.index() > 0 && this.selectedIndex() > t.index() ? this.direction(-1) :this.direction(1), 
this.selected(t);
}, i.prototype.changeToNext = function(t) {
return this.changeSelected(this.list()[(t.index() + 1) % this.list().length]);
}, i.prototype.changeToPrev = function(t) {
return this.changeSelected(this.list()[(t.index() - 1) % this.list().length]);
}, i.prototype.beforeMoveHandler = function() {
var t, e, n, i, r;
for (i = this.list(), r = [], e = 0, n = i.length; n > e; e++) t = i[e], null != t.beforeMoveHandler ? r.push(t.beforeMoveHandler()) :r.push(void 0);
return r;
}, i.prototype.afterMovedHandler = function() {}, i.prototype.selectedIndex = function() {
return this.selected() ? this.selected().index() :void 0;
}, i.prototype.hasContent = function() {
return this.list().length > 0;
}, i;
}(Bobcat.Component), Bobcat.RepeatableItem = function(e) {
function i(e, n) {
var r, o = this;
this.parent = n, this.col4 = t(this.col4, this), this.col3 = t(this.col3, this), 
this.smartCol3 = t(this.smartCol3, this), this.smartCol = t(this.smartCol, this), 
this.deselect = t(this.deselect, this), this.selectForEdit = t(this.selectForEdit, this), 
this.direction = t(this.direction, this), this.prev = t(this.prev, this), this.next = t(this.next, this), 
this.select = t(this.select, this), this.showEditor = t(this.showEditor, this), 
this.leaveDeleteHandler = t(this.leaveDeleteHandler, this), this.enterDeleteHandler = t(this.enterDeleteHandler, this), 
this.isLast = t(this.isLast, this), this.isFirst = t(this.isFirst, this), this.isEven = t(this.isEven, this), 
this.index = t(this.index, this), this.remove = t(this.remove, this), r = {
components:{
create:function(t) {
var e, n, i, r;
n = {}, r = t.data;
for (e in r) i = r[e], n[e] = new Bobcat[i.type](i), "undefined" != typeof n[e].init && n[e].init();
return n;
}
}
}, e.type = "RepeatableItem", e.deleteOverlayEnabled = !1, i.__super__.constructor.call(this, e, r), 
this.isSelected = ko.dependentObservable(function() {
return o.parent.selected() === o;
}, this);
}
return n(i, e), i.prototype.remove = function(t) {
var e, n;
return e = t.closest(".repeatable").prev(), n = this.parent.list().indexOf(this), 
this.parent.list.remove(this), window.edit_page.Event.publish("Repeatable.remove", {
target:e
}), Bobcat.AE.track("Editor - Remove Repeatable"), $B.Singleton.TimeMachine.pushOp({
action:"remove",
self:this,
data:{
index:n,
parent:this.parent
}
});
}, i.prototype.index = function() {
return $.inArray(this, this.parent.list());
}, i.prototype.isEven = function() {
return this.index() % 2 === 0;
}, i.prototype.isFirst = function() {
return 0 === this.index();
}, i.prototype.isLast = function() {
return this.index() === this.parent.list().length - 1;
}, i.prototype.enterDeleteHandler = function() {
return this.deleteOverlayEnabled(!0);
}, i.prototype.leaveDeleteHandler = function() {
return this.deleteOverlayEnabled(!1);
}, i.prototype.showEditor = function() {
var t, e, n, i;
n = !0, i = this.components;
for (e in i) t = i[e], n = n && (t.isState("normal") || t.isState("overlay"));
return n;
}, i.prototype.select = function() {
return this.parent.changeSelected(this);
}, i.prototype.next = function() {
return this.deselect(), this.parent.changeToNext(this);
}, i.prototype.prev = function() {
return this.deselect(), this.parent.changeToPrev(this);
}, i.prototype.direction = function() {
return this.parent.direction();
}, i.prototype.selectForEdit = function(t) {
var e, n, i;
this.deselect(), this.select(t), i = this.components;
for (n in i) if (e = i[n], "Image" === e.type()) return e.mouseenterHandler(), e.clickEditorHandler(), 
void 0;
}, i.prototype.deselect = function() {
var t, e, n, i, r, o, a;
for (o = this.parent.list(), a = [], i = 0, r = o.length; r > i; i++) e = o[i], 
a.push(function() {
var i, r;
i = e.components, r = [];
for (n in i) t = i[n], "Image" === t.type() && t.isState("editor") ? r.push(t.clickCancelEditorHandler()) :r.push(void 0);
return r;
}());
return a;
}, i.prototype.beforeMoveHandler = function() {
var t, e, n, i;
n = this.components, i = [];
for (e in n) t = n[e], null != t.beforeMoveHandler ? i.push(t.beforeMoveHandler()) :i.push(void 0);
return i;
}, i.prototype.afterMovedHandler = function() {}, i.prototype.smartCol = function() {
return 4 === this.parent.list().length || this.parent.list().length < 3;
}, i.prototype.smartCol3 = function() {
return this.parent.list().length % 3 === 0 || this.parent.list().length < 3;
}, i.prototype.col3 = function() {
return this.parent.list().length <= 3;
}, i.prototype.col4 = function() {
return this.parent.list().length <= 4;
}, i;
}(Bobcat.Component), Bobcat.SubMenu = function(e) {
function i(e) {
this.add = t(this.add, this), e.subItemClassName = "SubMenuItem", i.__super__.constructor.call(this, e);
}
return n(i, e), i.prototype.add = function(t) {
return i.__super__.add.call(this, t), this.selected().edit(), window.edit_page.setupTooltips(), 
Bobcat.AE.track("Editor - Add External Link");
}, i;
}(Bobcat.Repeatable), Bobcat.SubMenuItem = function(e) {
function i() {
return this.remove = t(this.remove, this), this.select = t(this.select, this), this.editDone = t(this.editDone, this), 
this.edit = t(this.edit, this), i.__super__.constructor.apply(this, arguments);
}
return n(i, e), i.prototype.edit = function() {
return this.gotoState("editor");
}, i.prototype.editDone = function() {
return this.gotoState("normal"), this.parent.selected(null);
}, i.prototype.select = function(t) {
return this.isSelected() ? this.parent.selected(null) :(i.__super__.select.call(this, t), 
this.edit());
}, i.prototype.remove = function(t) {
return window.edit_page.removeTooltips(), i.__super__.remove.call(this, t);
}, i;
}(Bobcat.RepeatableItem), Bobcat.Gallery = function(e) {
function i(e) {
this.prevImage = t(this.prevImage, this), this.nextImage = t(this.nextImage, this), 
this.changeImage = t(this.changeImage, this), this.error_callback = t(this.error_callback, this), 
this.upload = t(this.upload, this), this.clickRemoveCurrentHandler = t(this.clickRemoveCurrentHandler, this), 
this.clickEditorHandler = t(this.clickEditorHandler, this), this.mouseleaveHandler = t(this.mouseleaveHandler, this), 
this.mouseenterHandler = t(this.mouseenterHandler, this), this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), 
this.add = t(this.add, this);
var n, r, o = this;
r = {
sources:{
create:function(t) {
return new Bobcat.Image(t.data, {}, o);
}
}
}, i.__super__.constructor.call(this, e, r), this.nullImage = new Bobcat.Image({
type:"Image",
url:"",
caption:"",
description:""
}, {}, this), n = function() {
return "";
}, this.emptyImage = {
url:n,
caption:n,
description:n
}, this.current = ko.observable(), this.sources().length ? this.current(this.sources()[0]) :this.current(this.nullImage), 
this.empty = ko.dependentObservable(function() {
return 0 === o.sources().length;
}, this);
}
return n(i, e), i.include(Bobcat.ImageOptionHelper), i.StripHtml = function(t) {
return Bobcat.DOM.GALLERY_IMAGES(t).remove(), Bobcat.DOM.GALLERY_IMAGES_EDITOR(t).remove();
}, i.prototype.add = function(t) {
var e;
return console.log("Gallery#add"), e = new Bobcat.Image(t, {}, this), this.sources.push(e), 
this.current(e), this.storeCommand();
}, i.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, i.prototype.mouseenterHandler = function() {
return this.isState("normal") ? this.gotoState("overlay") :void 0;
}, i.prototype.mouseleaveHandler = function() {
return this.isState("overlay") ? this.gotoState("normal") :void 0;
}, i.prototype.clickEditorHandler = function(t) {
return this.current(t), this.gotoState("editor");
}, i.prototype.clickRemoveCurrentHandler = function() {
return this.current() && (this.current().clickRemoveHandler(), this.current(this.nullImage)), 
this.gotoState("normal");
}, i.prototype.upload = function(t) {
var e, n, i = this;
return t.target && (t = $(t.target)), "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
_gaq.push([ "_trackEvent", "UploadError", "network error" ]), void 0) :(e = {
multiple:!0,
maxSize:6291456,
container:"modal",
mimetypes:[ "image/jpeg", "image/pjpeg", "image/png", "image/gif" ],
openTo:"COMPUTER",
services:[ "COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "DROPBOX", "GOOGLE_DRIVE", "FLICKR", "INSTAGRAM", "PICASA" ]
}, n = function(t, e, n) {
return $.smartPoller(function(i) {
var r;
return r = "/s/tasks/" + e + "/" + t + ".jsm", $.getJSON(r).success(function(t) {
return console.log(t), t ? "retry" === t.html ? (i(), void 0) :n(t) :i();
}).error(function(t) {
return console.log(t), window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error"));
});
});
}, filepicker.pickAndStore(e, window.store_options, function(e) {
var r, o, a, s, l, c;
for (window.edit_page.isLoading(!0), console.log(e), r = t.closest("form"), a = e.length, 
c = [], s = 0, l = e.length; l > s; s++) o = e[s], c.push($.ajax({
url:"/r/v1/users/" + $S.user_meta.id + "/asset_images",
type:"POST",
dataType:"json",
crossDomain:!0,
data:{
asset:{
file:o,
tags:$("meta[name=cloudinary-tags]").attr("content")
}
},
beforeSend:function(t) {
return t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(t) {
var e;
return e = function(t) {
var e, n;
return n = i.getOptions(r), e = t.message, i.add({
url:$.cloudinary.url("" + e.public_id + "." + e.format, n.custom),
thumb_url:$.cloudinary.url("" + e.public_id + "." + e.format, n.thumb)
}), a--, console.log(a), 0 === a ? (window.edit_page.isLoading(!1), Bobcat.AE.track("Editor - Upload Image Gallery"), 
window.edit_page.save(!0)) :void 0;
}, console.log("Begin poll"), n(t.task.id, t.task.type, e);
},
error:i.error_callback
}));
return c;
}));
}, i.prototype.error_callback = function(t) {
return window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
t ? _gaq.push([ "_trackEvent", "GalleryUploadErrors", t ]) :void 0;
}, i.prototype.changeImage = function(t) {
var e;
return e = (this.sources.indexOf(this.current()) + t) % this.sources().length, 0 > e && (e += this.sources().length), 
this.current(this.sources()[e]);
}, i.prototype.nextImage = function() {
return this.changeImage(1);
}, i.prototype.prevImage = function() {
return this.changeImage(-1);
}, i.prototype.isLastElement = function(t) {
return t.parent().find(".thumb").index(t) === this.sources().length - 1;
}, i.prototype.afterRender = function(t) {
var e;
return this.isLastElement($(t)) ? (e = Bobcat.DOM.GALLERY($(t)), e.fancybox({
beforeLoad:function() {
var t;
return t = Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)), this.title = Bobcat.DOM.IMAGE_TITLE($(this.element)), 
t.length ? this.title += " - " + Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)) :void 0;
},
closeBtn:!1,
helpers:{
buttons:{},
thumbs:{
width:40,
height:40
}
},
margin:[ 20, 8, 8, 8 ],
padding:5,
arrows:!1,
nextClick:!0,
nextEffect:"fade",
prevEffect:"fade"
})) :void 0;
}, i;
}(Bobcat.Component), Bobcat.Button = function(e) {
function i(e) {
this.toggleTarget = t(this.toggleTarget, this), this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = t(this.clickEditorHandler, this), this.hasText = t(this.hasText, this), 
this.changeUrl = t(this.changeUrl, this), this.doneClickHandler = t(this.doneClickHandler, this), 
this.link_url = t(this.link_url, this), this.target = t(this.target, this), "undefined" == typeof e.new_target && (e.new_target = !0), 
i.__super__.constructor.call(this, e);
}
return n(i, e), i.include(Bobcat.UrlHelper), i.prototype.target = function() {
return this.new_target() && "" !== this.url() ? "_blank" :"_self";
}, i.prototype.link_url = function() {
var t;
return t = this.url(), this.addProtocol(t);
}, i.prototype.doneClickHandler = function(t) {
var e;
return e = this.addProtocol(this.url()), this.url(e), i.__super__.doneClickHandler.call(this, t);
}, i.prototype.changeUrl = function(t) {
return this.url(t.attr("data-url"));
}, i.prototype.hasText = function() {
return this.text().length > 0;
}, i.prototype.clickEditorHandler = function(t) {
return this.oldText = this.text(), this.oldUrl = this.url(), i.__super__.clickEditorHandler.call(this, t);
}, i.prototype.clickCancelEditorHandler = function() {
return this.text(this.oldText), this.url(this.oldUrl), this.hideEditorHandler();
}, i.prototype.toggleTarget = function() {
return this.new_target(!this.new_target());
}, i;
}(Bobcat.Component), Bobcat.Image = function(e) {
function i(e, n, r) {
var o = this;
this.parent = r, this.hasContentOrIsEditMode = t(this.hasContentOrIsEditMode, this), 
this.hasContent = t(this.hasContent, this), this.remove = t(this.remove, this), 
this.clickRemoveHandler = t(this.clickRemoveHandler, this), this.clickGalleryEditorHandler = t(this.clickGalleryEditorHandler, this), 
this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), this.clickEditorHandler = t(this.clickEditorHandler, this), 
this.addFilter = t(this.addFilter, this), this.uploadFile = t(this.uploadFile, this), 
this.error_callback = t(this.error_callback, this), this.upload = t(this.upload, this), 
this.link = t(this.link, this), this.selectImage = t(this.selectImage, this), this.recover = t(this.recover, this), 
this.previewImage = t(this.previewImage, this), this.doneClickHandler = t(this.doneClickHandler, this), 
this.showDescriptionInput = t(this.showDescriptionInput, this), this.openDescriptionInput = t(this.openDescriptionInput, this), 
this.showLinkInput = t(this.showLinkInput, this), this.openLinkInput = t(this.openLinkInput, this), 
this.goToDescriptionField = t(this.goToDescriptionField, this), this.goToLinkUrlField = t(this.goToLinkUrlField, this), 
this.target = t(this.target, this), this.isNull(e.original_url) && (e.original_url = e.url), 
this.isNull(e.new_target) && (e.new_target = !0), e.linkInputEnabled = e.link_url ? e.link_url.length > 0 :!1, 
e.descriptionInputEnabled = e.caption ? e.caption.length > 0 :!1, this.isNull(e.caption) && (e.caption = ""), 
this.isNull(e.description) && (e.description = ""), i.__super__.constructor.call(this, e, n), 
this.parent && (this.selected = ko.dependentObservable(function() {
return o === o.parent.current();
}, this)), this.assetUrl = ko.dependentObservable(function() {
return window.asset_path(o.url());
}, this), this.loadingSpinner = !0;
}
return n(i, e), i.include(Bobcat.UrlHelper), i.include(Bobcat.ImageOptionHelper), 
i.prototype.target = function() {
return this.new_target() && "" !== this.link_url() ? "_blank" :"_self";
}, i.prototype.goToLinkUrlField = function(t, e) {
return t.preventDefault(), $(e).closest("form").find(".link_url").focus(), window.el = e;
}, i.prototype.goToDescriptionField = function(t, e) {
return t.preventDefault(), $(e).closest("form").find("textarea").focus(), window.el = e;
}, i.prototype.openLinkInput = function() {
return this.linkInputEnabled(!0);
}, i.prototype.showLinkInput = function() {
return this.linkInputEnabled();
}, i.prototype.openDescriptionInput = function() {
return this.descriptionInputEnabled(!0);
}, i.prototype.showDescriptionInput = function() {
return this.descriptionInputEnabled();
}, i.prototype.doneClickHandler = function(t) {
return i.__super__.doneClickHandler.call(this, t), window.edit_page.Event.publish("ImageComponent.afterChange", {
target:t.closest(".image-component")
});
}, i.prototype.previewImage = function(t) {
return this.tmpUrl || (this.tmpUrl = this.url()), this.url(t.attr("data-image-url")), 
this.onPreview = !0;
}, i.prototype.recover = function() {
return this.onPreview ? (this.url(this.tmpUrl), this.tmpUrl = "") :void 0;
}, i.prototype.selectImage = function(t) {
return this.url(t.attr("data-image-url")), this.tmpUrl = "", this.onPreview = !1, 
this.doneClickHandler(t.closest(".editor").find(".se-done-btn").first());
}, i.prototype.link = function() {
var t;
return t = this.link_url(), this.addProtocol(t);
}, i.prototype.upload = function(t) {
var e, n = this;
return t.target && (t = $(t.target)), "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
_gaq.push([ "_trackEvent", "UploadError", "network error" ]), void 0) :(console.log(window.filepicker_options), 
e = {
maxSize:6291456,
container:"modal",
mimetypes:[ "image/jpeg", "image/pjpeg", "image/png", "image/gif" ],
openTo:"COMPUTER",
services:[ "COMPUTER", "IMAGE_SEARCH", "URL", "FACEBOOK", "DROPBOX", "GOOGLE_DRIVE", "FLICKR", "INSTAGRAM", "PICASA" ]
}, console.log(e), filepicker.pickAndStore(e, window.store_options, function(e) {
var i, r;
return console.log(e), r = e[0], i = t.closest("form"), window.edit_page.isLoading(!0), 
n.oldUrl = n.url(), n.loadingSpinner && n.url($('meta[name="loading-image-spinner"]').attr("content")), 
console.log(n.url()), console.log(JSON.stringify(r)), n.uploadFile(r, n.getOptions(i));
}, function(t) {
return _gaq.push([ "_trackEvent", "FilepickPickerUploadError", t ]);
}));
}, i.prototype.error_callback = function(t) {
return this.url(this.oldUrl), window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error")), 
window.mixpanel.track("Editor - UploadErrors", t.responseText), _gaq.push([ "_trackEvent", "UploadErrors", t.responseText ]);
}, i.prototype.uploadFile = function(t, e) {
var n, i = this;
return n = function(t, e, n) {
return $.smartPoller(function(i) {
var r;
return r = "/s/tasks/" + e + "/" + t + ".jsm", $.getJSON(r).success(function(t) {
return console.log(t), t ? "retry" === t.html ? (i(), void 0) :n(t) :i();
}).error(function(t) {
return console.log(t), this.url(this.oldUrl), window.edit_page.isLoading(!1), alert(I18n.t("js.pages.edit.errors.upload_network_error"));
});
});
}, $.ajax({
url:"/r/v1/users/" + $S.user_meta.id + "/asset_images",
type:"POST",
dataType:"json",
crossDomain:!0,
data:{
asset:{
file:t,
tags:$("meta[name=cloudinary-tags]").attr("content")
}
},
beforeSend:function(t) {
return t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(t) {
var r;
return r = function(t) {
var n;
return n = t.message, "BackgroundImage" === i.type() && "gif" !== n.format && (n.format = "jpg", 
e.custom.quality = 90, e.custom.flags = "progressive"), "BackgroundImage" === i.type() && $B.Singleton.TimeMachine.pushOp({
action:"uploadBackgroundImage",
self:i,
data:{
oldUrl:i.url(),
cloudinary:{
url:$.cloudinary.url("" + n.public_id + "." + n.format, e.custom),
thumb_url:$.cloudinary.url("" + n.public_id + "." + n.format, e.thumb),
original_url:n.url
}
}
}), i.loadData({
url:$.cloudinary.url("" + n.public_id + "." + n.format, e.custom),
thumb_url:$.cloudinary.url("" + n.public_id + "." + n.format, e.thumb),
original_url:n.url
}), window.edit_page.isLoading(!1), Bobcat.AE.track("Editor - Upload Image"), "BackgroundImage" === i.type() ? i.oldUrl = i.url() :void 0;
}, console.log("Begin poll"), n(t.task.id, t.task.type, r);
},
error:this.error_callback
});
}, i.prototype.addFilter = function(t) {
var e, n, i = this;
return "undefined" == typeof window.featherEditor || "undefined" == typeof filepicker ? (alert(I18n.t("js.pages.edit.errors.effects_network_error")), 
_gaq.push([ "_trackEvent", "UploadError", "network error" ]), void 0) :(n = "free" === $S.user_meta.plan ? [ "effects", "crop", "orientation", "resize", "sharpness", "brightness", "contrast" ] :[ "enhance", "effects", "crop", "orientation", "resize", "warmth", "brightness", "contrast", "saturation", "sharpness", "text", "redeye", "whiten", "blemish" ], 
e = function(t) {
return t = window.asset_path(t), t.replace("https", "http");
}, window.featherEditor.launch({
tools:n,
onSave:function(e, n) {
var r;
return window.edit_page.isLoading(!0), i.oldUrl = i.url(), i.loadingSpinner && i.url($('meta[name="loading-image-spinner"]').attr("content")), 
window.featherEditor.close(), r = t.closest("form"), i.uploadFile(n, i.getOptions(r));
},
image:t.closest("form").find("img"),
url:e(this.url())
}));
}, i.prototype.clickEditorHandler = function(t) {
return this.oldUrl = this.url(), this.oldThumbUrl = this.thumb_url(), i.__super__.clickEditorHandler.call(this, t);
}, i.prototype.clickCancelEditorHandler = function() {
return this.url(this.oldUrl), this.thumb_url(this.oldThumbUrl), this.hideEditorHandler();
}, i.prototype.clickGalleryEditorHandler = function(t) {
return this.parent ? (this.parent.current(this), this.parent.gotoState("editor"), 
setTimeout(function() {
return $(window).scrollTo(t.closest(".editable").find(".editor"), {
easing:"easeOutQuint",
duration:300,
axis:"y",
offset:-150
});
}, 200)) :void 0;
}, i.prototype.clickRemoveHandler = function() {
return $B.Singleton.TimeMachine.pushOp({
action:"removeImageFromGallery",
self:this,
data:{
parent:this.parent,
index:this.parent.sources.indexOf(this)
}
}), this.parent.sources.remove(this);
}, i.prototype.remove = function() {
return this.url(this.TRANSPARENT_IMAGE_URL), this.thumb_url(this.TRANSPARENT_IMAGE_URL);
}, i.prototype.hasContent = function() {
return !this.isImageTransparent(this.url());
}, i.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, i;
}(Bobcat.Component), Bobcat.TextStyle = function(t) {
function e(t, n) {
this.parent = n, e.__super__.constructor.call(this, t);
}
return n(e, t), e;
}(Bobcat.Component), Bobcat.BackgroundImage = function(e) {
function i(e) {
this.onDoneHandler = t(this.onDoneHandler, this), this.onClickHandler = t(this.onClickHandler, this), 
this.selectImage = t(this.selectImage, this), this.stockImages = t(this.stockImages, this), 
this.bgObject = t(this.bgObject, this), this.recover = t(this.recover, this), this.previewImage = t(this.previewImage, this), 
this.remove = t(this.remove, this), this.selectedStyleLazy = t(this.selectedStyleLazy, this), 
this.selectedStyle = t(this.selectedStyle, this), this.textStyle = t(this.textStyle, this);
var n, r = this;
n = {}, n.textStyles = {
create:function(t) {
return new Bobcat.TextStyle(t.data, this);
}
}, "undefined" != typeof e.textStyles && e.textStyles && e.selectedClassName || (e.textStyles = [], 
e.textStyles.push({
type:"TextStyle",
displayName:"Light Text",
colorCode:"#ffffff",
className:"strikingly-light-text"
}), e.textStyles.push({
type:"TextStyle",
displayName:"Dark Text",
colorCode:"#222222",
className:"strikingly-dark-text"
}), e.selectedClassName = "strikingly-light"), i.__super__.constructor.call(this, e, n), 
this.opacity_f = ko.dependentObservable(function() {
return r.opacity() / 100;
}), this.onPreview = !1, this.formOpen = !1, this.loadingSpinner = !1;
}
return n(i, e), i.prototype.textStyle = function() {
var t, e = this;
return t = this.textStyles().filter(function(t) {
return t.className() === e.selectedClassName();
}), t[0];
}, i.prototype.selectedStyle = function() {
var t, e, n;
return e = function() {
switch (this.style()) {
case "cover":
return "cover";

case "contain":
return "contain";

case "100%":
return "100%";

case "stretch":
return "100%";

case "fit":
return "cover";

default:
return "auto";
}
}.call(this), t = function() {
switch (this.style()) {
case "tile":
return "repeat";

default:
return "no-repeat";
}
}.call(this), n = {
backgroundPosition:"49% 50%",
backgroundImage:"url(" + this.assetUrl() + ")",
backgroundRepeat:t,
backgroundSize:e
};
}, i.prototype.selectedStyleLazy = function() {
var t;
return t = this.selectedStyle(), t.backgroundImage = "url(" + asset_path("/assets/icons/transparent.png") + ")", 
t;
}, i.prototype.remove = function() {
return this.url(this.TRANSPARENT_IMAGE_URL);
}, i.prototype.previewImage = function(t) {
return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style()), 
this.url(t.attr("data-url")), this.style(t.attr("data-style")), this.onPreview = !0;
}, i.prototype.recover = function() {
return this.onPreview ? (this.url(this.oldUrl), this.style(this.oldStyle), this.oldUrl = "", 
this.oldStyle = "") :void 0;
}, i.prototype.bgObject = function(t) {
return {
url:"http://uploads.striking.ly/page/images/backgrounds/" + t + ".jpg",
thumbUrl:"http://uploads.striking.ly/page/images/backgrounds/" + t + "-thumb.jpg",
style:"stretch",
component:this
};
}, i.prototype.stockImages = function(t) {
var e, n, i, r, o, a, s, l, c;
if ("solidBanner" === t) {
for (a = [ "banners/banner1", "bg3", "banners/banner3", "banners/banner4" ], l = [], 
n = 0, r = a.length; r > n; n++) e = a[n], l.push(this.bgObject(e));
return l;
}
for (s = [ "bg1", "bg5", "bg6", "bg4" ], c = [], i = 0, o = s.length; o > i; i++) e = s[i], 
c.push(this.bgObject(e));
return c;
}, i.prototype.selectImage = function(t) {
return this.url(t.attr("data-url")), this.style(t.attr("data-style")), this.storeCommand(), 
this.oldUrl = "", this.oldStyle = "", this.onPreview = !1, window.edit_page.unsavedChanges() && (Bobcat.AE.track("Editor - Edit Background"), 
$B.firstTimeTracker.trackFirstTimeEditorEvent("Save Image - Editor v1", {
is_background:!0
})), window.edit_page.saveWhenUnsaved();
}, i.prototype.onClickHandler = function(t) {
var e;
return e = t.parent().find(".background-form"), this.formOpen ? (e.slideUp(), this.formOpen = !1) :(e.slideDown(), 
this.formOpen = !0);
}, i.prototype.onDoneHandler = function(t) {
var e;
return e = t.closest(".background-form"), e.slideUp(), window.edit_page.unsavedChanges() && (Bobcat.AE.track("Editor - Edit Background"), 
$B.firstTimeTracker.trackFirstTimeEditorEvent("Save Image - Editor v1", {
is_background:!0
})), window.edit_page.saveWhenUnsaved(), this.formOpen = !1;
}, i;
}(Bobcat.Image), Bobcat.SlideSettings = function(t) {
function e() {
return e.__super__.constructor.apply(this, arguments);
}
return n(e, t), e;
}(Bobcat.Component), Bobcat.Menu = function(t) {
function e(t) {
var n;
this.data = t, n = {}, n.components = {
create:function(t) {
var e, n, i, r;
n = {}, r = t.data;
for (e in r) i = r[e], n[e] = new Bobcat[i.type](i), "undefined" != typeof n[e].init && n[e].init();
return n;
}
}, e.__super__.constructor.call(this, this.data, n);
}
return n(e, t), e.prototype.bind = function(t) {
var e, n, i, r;
if (t.length > 0) {
for (r = [], n = 0, i = t.length; i > n; n++) e = t[n], r.push(ko.applyBindings(this.components, e));
return r;
}
return console.warn("Cannot find .navigator");
}, e.prototype.hideAllEditors = function() {
return this.logo.hideEditorHandler();
}, e;
}(Bobcat.Component), Bobcat.Footer = function(t) {
function e(t) {
var n, i = this;
n = {
socialMedia:{
create:function(t) {
return new Bobcat[t.data.type](t.data, i);
}
},
copyright:{
create:function(t) {
return new Bobcat[t.data.type](t.data, i);
}
}
}, e.__super__.constructor.call(this, t, n);
}
return n(e, t), e.prototype.bind = function(t) {
return t.length > 0 ? (ko.applyBindings(this, t.get(0)), this.socialMedia.bind()) :console.warn("Cannot find #footer");
}, e;
}(Bobcat.Component), Bobcat.Media = function(e) {
function i(e) {
this.inEditorAndHasNoContent = t(this.inEditorAndHasNoContent, this), this.hasContentOrIsEditMode = t(this.hasContentOrIsEditMode, this), 
this.hasContent = t(this.hasContent, this), this.showImage = t(this.showImage, this), 
this.showVideo = t(this.showVideo, this), this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), 
this.clickEditorHandler = t(this.clickEditorHandler, this);
var n, r = this;
n = {
video:{
create:function(t) {
return new Bobcat.Video(t.data, r);
}
},
image:{
create:function(t) {
return new Bobcat.Image(t.data, {}, r);
}
}
}, i.__super__.constructor.call(this, e, n);
}
return n(i, e), i.prototype.clickEditorHandler = function(t) {
return i.__super__.clickEditorHandler.call(this, t), this.image.clickEditorHandler(t), 
this.video.clickEditorHandler(t);
}, i.prototype.clickCancelEditorHandler = function(t) {
return this.hideEditorHandler(), this.image.hideEditorHandler(t), this.video.hideEditorHandler(t);
}, i.prototype.showVideo = function() {
return "video" === this.current() && this.video.html() && this.video.html().length > 0;
}, i.prototype.showImage = function() {
return "image" === this.current();
}, i.prototype.hasContent = function() {
return "video" === this.current() && this.video.html() || "image" === this.current() && this.image.url() && !this.isImageTransparent(this.image.url());
}, i.prototype.hasContentOrIsEditMode = function() {
return this.hasContent() || !window.edit_page.isShowPage;
}, i.prototype.inEditorAndHasNoContent = function() {
return !this.isState("editor") && ("video" === this.current() && (!this.video.html() || 0 === this.video.html().length) || "image" === this.current() && 0 === this.image.url().length);
}, i;
}(Bobcat.Component), Bobcat.EmailForm = function(e) {
function i(e) {
this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), this.clickEditorHandler = t(this.clickEditorHandler, this), 
this.hasMessageBox = t(this.hasMessageBox, this), this.hasNameBox = t(this.hasNameBox, this), 
this.hasEmailBox = t(this.hasEmailBox, this), this.isEmailInvalid = t(this.isEmailInvalid, this), 
this.isNameEmpty = t(this.isNameEmpty, this), this.isSuccess = t(this.isSuccess, this), 
this.isError = t(this.isError, this), this.submit = t(this.submit, this), e.isLoading = !1, 
e.recipient || (e.recipient = ""), this.isNull(e.hideMessageBox) && (e.hideMessageBox = !1), 
this.isNull(e.hide_name) && (e.hide_name = !1), this.isNull(e.hide_email) && (e.hide_email = !1), 
this.isNull(e.thanksMessage) && (e.thanksMessage = "Thanks for your message!"), 
this.isNull(e.name_label) && (e.name_label = "Name", e.email_label = "Email", e.message_label = "Message"), 
this.isNull(e.submit_label) && (e.submit_label = "Submit"), i.__super__.constructor.call(this, e), 
this.status = ko.observable(""), this.invalidEmail = ko.observable(!1), this.invalidName = ko.observable(!1);
}
return n(i, e), i.include(Bobcat.UrlHelper), i.prototype.isRecipientEmailValid = function() {
return 0 === this.recipient().length || this.isEmail(this.recipient());
}, i.prototype.reset = function() {
return this.invalidEmail(!1), this.invalidName(!1), this.isLoading(!1);
}, i.prototype.submit = function(t) {
var e = this;
if (window.edit_page.isShowPage) return this.reset(), this.isLoading(!0), t.closest("form").ajaxSubmit({
success:function(t) {
return console.log(t), e.status(t.status), e.isLoading(!1), _gaq.push([ "_trackEvent", "Actions", "EmailCollected" ]), 
_gaq.push([ "b._trackEvent", "Actions", "EmailCollected" ]), window.edit_page.Event.publish("Site.contactForm.submit");
},
error:function(t) {
var n;
if (n = jQuery.parseJSON(t.responseText), console.log(n), e.status(n.status), e.isLoading(!1), 
!n.message) throw alert(n.html), n.html;
return n.message.invalid_email && e.invalidEmail(!0), n.message.invalid_name ? e.invalidName(!0) :void 0;
}
});
}, i.prototype.isError = function() {
return "error" === this.status();
}, i.prototype.isSuccess = function() {
return "ok" === this.status();
}, i.prototype.isNameEmpty = function() {
return this.invalidName();
}, i.prototype.isEmailInvalid = function() {
return this.invalidEmail();
}, i.prototype.hasEmailBox = function() {
return !this.hide_email();
}, i.prototype.hasNameBox = function() {
return !this.hide_name();
}, i.prototype.hasMessageBox = function() {
return !this.hideMessageBox();
}, i.prototype.clickEditorHandler = function(t) {
return i.__super__.clickEditorHandler.call(this, t);
}, i.prototype.clickCancelEditorHandler = function() {
return this.hideEditorHandler();
}, i;
}(Bobcat.Component);
}.call(this), function() {
var t = function(t, e) {
return function() {
return t.apply(e, arguments);
};
}, e = {}.hasOwnProperty, n = function(t, n) {
function i() {
this.constructor = t;
}
for (var r in n) e.call(n, r) && (t[r] = n[r]);
return i.prototype = n.prototype, t.prototype = new i(), t.__super__ = n.prototype, 
t;
};
Bobcat.HtmlComponent = function(e) {
function i(e) {
this.done = t(this.done, this), this.clickCancelEditorHandler = t(this.clickCancelEditorHandler, this), 
this.doneClickHandler = t(this.doneClickHandler, this), this.clickEditorHandler = t(this.clickEditorHandler, this), 
this.initWhenBound = t(this.initWhenBound, this), this.deselectApp = t(this.deselectApp, this), 
this.selectAppClickHandler = t(this.selectAppClickHandler, this), this.loadAppConfig = t(this.loadAppConfig, this), 
this.saveAppConfig = t(this.saveAppConfig, this), this.saveComponent = t(this.saveComponent, this), 
this.addAppToList = t(this.addAppToList, this), this.reloadIframe = t(this.reloadIframe, this), 
this.createApp = t(this.createApp, this), this.isAppEditorState = t(this.isAppEditorState, this), 
this.goToAppEditorState = t(this.goToAppEditorState, this), this.destroy = t(this.destroy, this), 
e.htmlValue = this.htmlDecode(e.value), e.appEditorState = 0, e.app = null, e.selected_app_name || (e.selected_app_name = null), 
"undefined" == typeof e.render_as_iframe && (e.render_as_iframe = !1), e.app_list || (e.app_list = "{}"), 
e.editorIframeSrc = "/s/html_editor/" + e.id, i.__super__.constructor.call(this, e), 
this.appList = jQuery.parseJSON(e.app_list), this.originalIframeSrc = this.editorIframeSrc();
}
return n(i, e), i.include(Bobcat.HtmlHelper), i.prototype.destroy = function() {
var t;
return t = $.ajax({
url:"/s/components/" + this.id(),
type:"DELETE",
dataType:"json",
beforeSend:function(t) {
return t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
}
}), t.success(function(t) {
return console.log(t);
}), t.error(function(t) {
var e;
return e = jQuery.parseJSON(t.responseText), console.log(e);
});
}, i.prototype.goToAppEditorState = function(t) {
return "selector" === t ? this.appEditorState(0) :"loading" === t ? this.appEditorState(1) :"editor" === t ? this.appEditorState(2) :void 0;
}, i.prototype.isAppEditorState = function(t) {
return "selector" === t && 0 === this.appEditorState() ? !0 :"loading" === t && 1 === this.appEditorState() ? !0 :"editor" === t && 2 === this.appEditorState() ? !0 :!1;
}, i.prototype.createApp = function(t, e) {
return e.name = t, new Bobcat[t](e, this);
}, i.prototype.reloadIframe = function() {
return console.log("reloadIframe"), this.iframeSrcQ || (this.iframeSrcQ = 0), this.editorIframeSrc("" + this.originalIframeSrc + "?q=" + ++this.iframeSrcQ);
}, i.prototype.addAppToList = function(t, e) {
return this.appList[t] = e.id, this.app_list(JSON.stringify(this.appList));
}, i.prototype.saveComponent = function() {
var t, e = this;
return t = ko.mapping.toJS(this), console.log(t), $.ajax({
url:"/s/components/" + this.id(),
dataType:"json",
type:"PUT",
data:{
component:{
value:ko.toJSON(t)
}
},
success:function(t) {
return e.reloadIframe(), console.log(t);
}
});
}, i.prototype.saveAppConfig = function() {
var t, e;
return t = this.app().exportConfig(), this.selected_app_name(t.name), e = t.id, 
$.ajax({
url:"/s/app_configs/" + e + ".jsm",
dataType:"json",
type:"PUT",
data:{
app_config:{
id:e,
config:ko.toJSON(t),
component_id:this.id(),
app_name:t.name
}
},
success:function() {}
});
}, i.prototype.loadAppConfig = function(t, e, n) {
var i = this;
return this.appList[t] ? $.ajax({
url:"/s/app_configs/" + this.appList[t] + ".jsm",
dataType:"json",
type:"GET",
success:function(n) {
return "redirect" === n.status ? (alert(n.html), window.location = n.to, void 0) :e(t, n.message);
},
error:function(e) {
return n(t, e);
}
}) :$.ajax({
url:"/s/app_configs.jsm",
dataType:"json",
type:"POST",
data:{
app_config:{
app_name:t,
page_id:window.edit_page.page_id,
component_id:this.id()
}
},
beforeSend:function(t) {
return t.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
success:function(n) {
return "redirect" === n.status ? (alert(n.html), window.location = n.to, void 0) :(i.addAppToList(t, n.message), 
e(t, n.message));
},
error:function(e) {
return n(t, e);
}
});
}, i.prototype.selectAppClickHandler = function(t) {
var e, n, i, r = this;
return i = t.attr("data-app-name"), t.addClass("se-loading"), Bobcat.AE.track("Editor - App Store - Select App", {
appName:i
}), e = function(e, n) {
return r.app(r.createApp(i, n)), r.goToAppEditorState("editor"), r.app().initAndShow(t), 
t.removeClass("se-loading");
}, n = function(e, n) {
return alert(I18n.t("js.pages.edit.errors.network_error")), _gaq.push([ "_trackEvent", "AppError", n.responseText ]), 
t.removeClass("se-loading");
}, this.loadAppConfig(i, e, n);
}, i.prototype.deselectApp = function() {
return this.goToAppEditorState("selector");
}, i.prototype.initWhenBound = function(t) {
var e;
return 0 === this.value().length && (this.gotoState("overlay"), this.clickEditorHandler(t.parent())), 
e = t.parent().find("iframe").first(), Bobcat.TH.resizeIFrame(e);
}, i.prototype.clickEditorHandler = function(t) {
var e;
if (i.__super__.clickEditorHandler.call(this, t)) return this.textarea = t.find(Bobcat.DOM.EDITOR).find("textarea").first(), 
this.originText = this.textarea.val(), this.selected_app_name() ? (e = t.find("li.app-item a[data-app-name='" + this.selected_app_name() + "']"), 
this.selectAppClickHandler(e)) :void 0;
}, i.prototype.doneClickHandler = function(t) {
return this.done(t) !== !1 ? i.__super__.doneClickHandler.call(this, t) :void 0;
}, i.prototype.clickCancelEditorHandler = function() {
return this.cancel(), this.hideEditorHandler();
}, i.prototype.done = function(t) {
var e, n;
return e = this.app().done(t, this.textarea), e === !1 ? !1 :(this.saveAppConfig(), 
n = this.textarea.val(), this.value(this.htmlEncode(n)), this.htmlValue(n), this.originText = n, 
this.saveComponent());
}, i.prototype.cancel = function() {
return this.value(this.htmlEncode(this.originText)), this.htmlValue(this.originText);
}, i.prototype.viewMoreApps = function() {
return Bobcat.AE.track("Editor - App Store - More"), $.fancybox({
href:"/assets/app-icons/more-apps.jpg",
padding:0,
scrolling:"no"
});
}, i;
}(Bobcat.Component), Bobcat.App = function(e) {
function i(e, n) {
this.parent = n, this.done = t(this.done, this), this.createScriptTag = t(this.createScriptTag, this), 
this.onScriptLoad = t(this.onScriptLoad, this), this.exportConfig = t(this.exportConfig, this), 
i.__super__.constructor.call(this, e);
}
return n(i, e), i.include(Bobcat.HtmlHelper), i.prototype.exportConfig = function() {
return ko.mapping.toJS(this);
}, i.prototype.onScriptLoad = function() {
return this.runScript ? this.runScript() :void 0;
}, i.prototype.createScriptTag = function(t, e) {
var n = this;
return jQuery.getScript(e, function() {
var e;
return e = $("<div></div>").addClass(t).appendTo($("#app-script-root")), n.onScriptLoad();
});
}, i.prototype.done = function() {}, i.prototype.addStrikinglyContainer = function(t, e) {
return "<div class='" + e + "'>" + t + "</div>";
}, i;
}(Bobcat.Component), Bobcat.GoogleMapApp = function(e) {
function i(e, n) {
this.parent = n, this.done = t(this.done, this), this.runScript = t(this.runScript, this), 
this.initAndShow = t(this.initAndShow, this), e.location || (e.location = ""), e.zoom || (e.zoom = ""), 
i.__super__.constructor.call(this, e, this.parent);
}
return n(i, e), i.prototype.initAndShow = function(t) {
var e, n = this;
return e = t.closest(".editor").find(".google-maps-location-input")[0], $("#app-script-root .google-maps-script").length ? google.maps.places ? this.autocomplete = new google.maps.places.Autocomplete(e) :void 0 :(window.strikinglyGoogleMapsCallback = function() {
return google.maps.places ? n.autocomplete = new google.maps.places.Autocomplete(e) :void 0;
}, this.createScriptTag("google-maps-script", "https://maps.googleapis.com/maps/api/js?key=" + $S.conf.google_maps_key + "&sensor=false&libraries=places&callback=strikinglyGoogleMapsCallback"));
}, i.prototype.runScript = function() {}, i.prototype.done = function(t) {
var e, n, i;
return i = t.closest(".editor").find(".google-maps-location-input").first().val(), 
this.location(i), n = $.trim(this.location().replace(/\ /g, "+")), "" === n ? (alert(I18n.t("js.pages.edit.html_editor.google_maps.enter_location")), 
!1) :(e = '<div class="strikingly-map-container">              <iframe height="420" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="/c/apps/google_map?loc=' + n + '"></iframe>              <small class="view-larger-map">                <a target="_blank" href="http://maps.google.com/maps?q=' + n + "&oe=UTF-8&ie=UTF8&hq=&hnear=" + n + '&gl=us&z=&source=embed" style="">' + I18n.t("js.pages.edit.html_editor.google_maps.view_larger_map") + "</a>              </small>            </div>", 
this.parent.value(this.htmlEncode(e)), this.parent.htmlValue(e), this.parent.render_as_iframe(!1));
}, i;
}(Bobcat.App), Bobcat.EcwidApp = function(e) {
function i(e, n) {
this.parent = n, this.submit = t(this.submit, this), this.runScript = t(this.runScript, this), 
this.initAndShow = t(this.initAndShow, this), e.storeId || (e.storeId = ""), i.__super__.constructor.call(this, e, this.parent);
}
return n(i, e), i.prototype.initAndShow = function() {}, i.prototype.runScript = function() {}, 
i.prototype.submit = function() {
var t, e;
return (e = $.trim(this.storeId())) ? (t = '<div>          <script type="text/javascript" src="http://app.ecwid.com/script.js?' + e + '" charset="utf-8">          </script>          <script type="text/javascript">            if (Bobcat.TH.isSmallScreen()) {              xProductBrowser("categoriesPerRow=3","views=table(20)","categoryView=table","searchView=list","style=","responsive=yes");            } else {               xProductBrowser("categoriesPerRow=3","views=grid(3,3) list(10) table(20)","categoryView=grid","searchView=list","style=","responsive=yes");            }           </script>          <noscript>Your browser does not support JavaScript. Please proceed to <a href="https://app.ecwid.com/jsp/#{id}/catalog">HTML version of this store</a>          </noscript>        </div>', 
t = this.addStrikinglyContainer(t, "strikingly-ecwid-container-2"), this.parent.value(this.htmlEncode(t)), 
this.parent.htmlValue(t), this.parent.render_as_iframe(!1), this.parent.doneClickHandler()) :(alert(I18n.t("js.pages.edit.html_editor.ecwid.enter_store_id")), 
!1);
}, i;
}(Bobcat.App), Bobcat.HtmlApp = function(e) {
function i(e, n) {
this.parent = n, this.done = t(this.done, this), this.runScript = t(this.runScript, this), 
this.initAndShow = t(this.initAndShow, this), i.__super__.constructor.call(this, e, this.parent);
}
return n(i, e), i.prototype.initAndShow = function() {}, i.prototype.runScript = function() {}, 
i.prototype.done = function(t, e) {
var n, i;
return n = e.val(), i = this.checkClosingTags(n), i || window.confirm("We detected unmatched tags in the HTML you entered. Please preview to make sure it's working as intended. Click OK to save anyway.") ? !0 :!1;
}, i;
}(Bobcat.App), Bobcat.WufooFormApp = function(e) {
function i(e, n) {
this.parent = n, this.runScript = t(this.runScript, this), this.initAndShow = t(this.initAndShow, this), 
i.__super__.constructor.call(this, e, this.parent);
}
return n(i, e), i.prototype.initAndShow = function() {
return $("#app-script-root .wufoo-script").length ? this.runScript() :this.createScriptTag("wufoo-script", "http://wufoo.com/scripts/iframe/formEmbedKit.js");
}, i.prototype.runScript = function() {
var t, e, n, i = this;
$("#wufoo-view").length > 0 && $("#wufoo-view").remove(), t = $("<div></div>").attr("id", "wufoo-view"), 
$("#app-view-root").append(t), e = function(t) {
var e, r;
return r = JSON.parse(t), e = r.setup + r.display, e = i.addStrikinglyContainer(e, "strikingly-wufoo-container"), 
i.parent.htmlValue(e), i.parent.value(i.htmlEncode(e)), i.parent.render_as_iframe(!1), 
console.log("Running Wufoo Embed Kit User Callback"), console.log(e), n.destroy(), 
$.fancybox.close(), i.parent.doneClickHandler();
};
try {
return n = WufooFormEmbedKit({
userDefinedCallback:e,
displayElement:"wufoo-view"
}), n.display(), this.fancybox = $.fancybox({
href:"#wufoo-view",
padding:0,
scrolling:"no"
});
} catch (r) {
return console.log("Wufoo Embed Kit Error!"), console.log(r);
}
}, i;
}(Bobcat.App), Bobcat.FacebookCommentsApp = function(e) {
function i(e, n) {
this.parent = n, this.done = t(this.done, this), this.runScript = t(this.runScript, this), 
this.initAndShow = t(this.initAndShow, this), null == e.useCurrentUrl && (e.useCurrentUrl = !0), 
e.url || (e.url = window.social_media_config.get("url")), e.commentsNumber || (e.commentsNumber = 10), 
i.__super__.constructor.call(this, e, this.parent);
}
return n(i, e), i.prototype.initAndShow = function() {}, i.prototype.runScript = function() {}, 
i.prototype.done = function() {
var t;
return t = '<div id="fb-root"></div><script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";  fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>', 
this.useCurrentUrl() && this.url(window.social_media_config.get("url")), t += '<div class="fb-comments" data-href="' + this.url() + '" data-num_posts="' + this.commentsNumber() + '" data-width="470"></div>', 
this.parent.value(this.htmlEncode(t)), this.parent.htmlValue(t), this.parent.render_as_iframe(!1);
}, i;
}(Bobcat.App), Bobcat.SoundcloudApp = function(e) {
function i(e, n) {
this.parent = n, this.done = t(this.done, this), this.runScript = t(this.runScript, this), 
this.initAndShow = t(this.initAndShow, this), this.validHostname = "soundcloud.com", 
e.soundcloudUrl || (e.soundcloudUrl = ""), i.__super__.constructor.call(this, e, this.parent);
}
return n(i, e), i.include(Bobcat.UrlHelper), i.prototype.initAndShow = function() {}, 
i.prototype.runScript = function() {}, i.prototype.done = function() {
var t, e, n, i, r, o;
return e = this.createUrlParser(this.soundcloudUrl()), e.hostname === this.validHostname ? (i = e.pathname, 
r = i.split("/"), n = 3 === r.length && "groups" !== r[1] ? 166 :450, o = encodeURI("https://w.soundcloud.com/player/?url=http://api.soundcloud.com" + i), 
t = '<iframe width="100%" height="' + n + '" scrolling="no" frameborder="no" src="' + o + '"></iframe>', 
this.parent.value(this.htmlEncode(t)), this.parent.htmlValue(t), this.parent.render_as_iframe(!1)) :(alert(I18n.t("js.pages.edit.html_editor.soundcloud.errors.invalid_url")), 
!1);
}, i;
}(Bobcat.App), Bobcat.SlidesApp = function(e) {
function i(e, n) {
this.parent = n, this.done = t(this.done, this), this.runScript = t(this.runScript, this), 
this.initAndShow = t(this.initAndShow, this), this.validHostname = "slid.es", e.slidesUrl || (e.slidesUrl = ""), 
null == e.setDefault && (e.setDefault = !0), (e.setDefault || !e.slideWidth) && (e.slideWidth = 576), 
(e.setDefault || !e.slideHeight) && (e.slideHeight = 420), i.__super__.constructor.call(this, e, this.parent);
}
return n(i, e), i.include(Bobcat.UrlHelper), i.prototype.initAndShow = function() {}, 
i.prototype.runScript = function() {}, i.prototype.done = function() {
var t, e;
return e = this.createUrlParser(this.slidesUrl()), e.hostname === this.validHostname ? (this.setDefault() && (this.slideWidth(576), 
this.slideHeight(420)), t = '<iframe src="' + this.slidesUrl() + '/embed" width="' + this.slideWidth() + '" height="' + this.slideHeight() + '" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', 
this.parent.value(this.htmlEncode(t)), this.parent.htmlValue(t), this.parent.render_as_iframe(!1)) :(alert(I18n.t("js.pages.edit.html_editor.slides.errors.invalid_url")), 
!1);
}, i;
}(Bobcat.App);
}.call(this), function() {
ko.bindingHandlers.runWhenBound = {
init:function(t, e) {
return e()($(t));
}
}, ko.bindingHandlers.enterKey = {
init:function(t, e, n, i) {
var r, o;
return o = function(t) {
return 13 === t.which ? e().call(this, t) :void 0;
}, r = function() {
return {
keyup:o
};
}, ko.bindingHandlers.event.init(t, r, n, i);
}
}, ko.bindingHandlers.enterKeyPress = {
init:function(t, e, n, i) {
var r, o;
return o = function(n) {
return 13 === n.which ? e().call(this, n, t) :!0;
}, r = function() {
return {
keypress:o
};
}, ko.bindingHandlers.event.init(t, r, n, i);
}
}, ko.bindingHandlers.className = {
update:function(t, e) {
var n;
return t.__ko__previousClassValue__ && $(t).removeClass(t.__ko__previousClassValue__), 
n = ko.utils.unwrapObservable(e()), $(t).addClass(n), t.__ko__previousClassValue__ = n;
}
}, ko.bindingHandlers.htmlValue = {
init:function(t, e, n) {
return ko.utils.registerEventHandler(t, "blur", function() {
var i, r, o;
return o = e(), r = t.innerHTML, ko.isWriteableObservable(o) ? o(r) :(i = n(), i._ko_property_writers && i._ko_property_writers.htmlValue ? i._ko_property_writers.htmlValue(r) :void 0);
});
},
update:function(t, e) {
var n;
return n = ko.utils.unwrapObservable(e()), (null === n || void 0 === n) && (n = ""), 
"textarea" === t.tagName.toLowerCase() ? $(t).val(n) :t.innerHTML = n;
}
}, ko.bindingHandlers.escapedValue = {
init:ko.bindingHandlers.value.init,
update:function(t, e) {
var n, i, r;
return r = ko.utils.unwrapObservable(e()), n = /<script\b[^>]*>([\s\S]*?)<\/script>/gim, 
i = /<\/script>/gim, r && (r = r.replace(n, "").replace(i, "")), e()(r), ko.bindingHandlers.value.update(t, e);
}
}, ko.bindingHandlers.mouseenter = {
init:function(t, e) {
return $(t).mouseenter(function(t) {
return e()($(this), t);
});
},
update:function() {}
}, ko.bindingHandlers.mouseleave = {
init:function(t, e) {
return $(t).mouseleave(function(t) {
return e()($(this), t);
});
},
update:function() {}
}, ko.bindingHandlers.mouseover = {
init:function(t, e) {
return $(t).mouseover(function(t) {
return e()($(this), t);
});
},
update:function() {}
}, ko.bindingHandlers.mouseout = {
init:function(t, e) {
return $(t).mouseout(function(t) {
return e()($(this), t);
});
},
update:function() {}
}, ko.bindingHandlers.mouseclick = {
init:function(t, e) {
return $(t).click(function(t) {
return e()($(this), t);
});
},
update:function() {}
}, ko.bindingHandlers.fadeVisible = {
init:function(t, e) {
return $(t).toggle(ko.utils.unwrapObservable(e()));
},
update:function(t, e) {
return ko.utils.unwrapObservable(e()) ? $(t).css("visibility", "visible").stop().fadeTo(600, 1) :$(t).stop().fadeTo(400, 0, function() {
return $(t).css("visibility", "hidden");
});
}
}, ko.bindingHandlers.fadeVisibleAndHide = {
init:function(t, e) {
return $(t).toggle(ko.utils.unwrapObservable(e()));
},
update:function(t, e) {
return ko.utils.unwrapObservable(e()) ? $(t).css("visibility", "visible").stop().fadeTo(600, 1) :$(t).stop().hide();
}
}, ko.bindingHandlers.data = {
update:function(t, e) {
var n, i, r, o;
r = ko.utils.unwrapObservable(e()) || {}, o = [];
for (n in r) i = r[n], i = ko.utils.unwrapObservable(i), "other" === n && "bananas" !== i && console.log(i), 
o.push($(t).data(n, i));
return o;
}
}, ko.bindingHandlers.bind = {
init:function(t, e) {
var n, i, r;
return r = ko.utils.unwrapObservable(e()), n = ko.utils.unwrapObservable(r.data), 
i = ko.utils.unwrapObservable(r.html), i ? ($(t).html(i), ko.applyBindings(n, t)) :void 0;
},
update:function(t, e) {
var n, i, r;
return r = ko.utils.unwrapObservable(e()), n = ko.utils.unwrapObservable(r.data), 
i = ko.utils.unwrapObservable(r.html), i ? ($(t).html(i), ko.applyBindings(n, t)) :void 0;
}
}, ko.bindingHandlers.slideVisible = {
init:function(t, e) {
var n;
return n = e(), $(t).toggle(n), $(t).data("animating", !1);
},
update:function(t, e) {
var n;
return n = e(), n ? ($(t).data("animating", !0), $(t).stop().slideDown(600, "swing", function() {
return $(this).data("animating", !1);
})) :($(t).data("animating", !0), $(t).slideUp(600, "swing", function() {
return $(this).data("animating", !1);
}));
}
}, ko.bindingHandlers.slideVisibleAndMoveTo = {
init:function(t, e) {
var n;
return n = e(), $(t).toggle(n), $(t).data("animating", !1);
},
update:function(t, e) {
var n;
return n = e(), n ? ($(t).data("animating", !0), $("html, body").stop().animate({
scrollTop:$(t).parent().offset().top - 100
}, 1200, "easeInOutQuart", function() {
return $(t).slideDown(600, "swing", function() {
return $(this).data("animating", !1);
});
})) :($(t).data("animating", !0), $(t).slideUp(600, "swing", function() {
return $(this).data("animating", !1);
}));
}
}, ko.bindingHandlers.bannerVisible = {
init:function(t, e, n, i) {
return i.isFirst() && i.select(), $(t).show().css({
left:"0%"
});
},
update:function(t, e, n, i) {
var r, o, a, s;
if (s = $(t), a = ko.utils.unwrapObservable(e()), r = i.parent.direction(), window.lol = i.parent, 
a) {
if (i.animated) return;
return console.log("show " + i.index() + " " + r), o = r > 0 ? "100%" :"-100%", 
s.stop().css({
left:o
}).animate({
left:"0%"
}), i.animated = !0;
}
return i.animated !== !1 ? (console.log("hide " + i.index() + " " + r), o = r > 0 ? "-100%" :"100%", 
s.stop().css({
left:"0%"
}).animate({
left:o
}), i.animated = !1) :void 0;
}
}, ko.bindingHandlers.slidyButtonSlide = {
init:function() {},
update:function(t, e) {
var n, i, r;
if (r = e()) ; else if (n = $(t).children(".icon"), i = $(t).children(".title"), 
!$(t).data("mouseover")) return i.stop(!0), i.css("left", "0"), i.hide("slide", {
direction:"left"
}, 250), i.removeClass("hover"), n.removeClass("hover");
}
}, ko.bindingHandlers.slideVisibleWidth = {
init:function(t, e) {
var n;
return n = e(), $(t).toggle(n);
},
update:function(t, e) {
var n;
return n = e(), n ? $(t).show("slide", {
direction:"right"
}, 600) :$(t).hide("slide", {
direction:"right"
}, 600);
}
}, ko.bindingHandlers.theme = {
init:function(t, e) {
var n;
return n = ko.utils.unwrapObservable(e()), $(t).addClass(n), $(t).data("theme", n);
},
update:function(t, e) {
var n;
return n = ko.utils.unwrapObservable(e()), $(t).removeClass($(t).data("theme")), 
$(t).addClass(n), $(t).data("theme", n);
}
}, ko.bindingHandlers.currentDisabled = {
init:function(t, e) {
var n;
return n = ko.utils.unwrapObservable(e()), n && n.style && n.style.fontFamily ? $(t).removeAttr("disabled") :$(t).attr("disabled", "disabled");
},
update:function(t, e) {
var n;
return n = ko.utils.unwrapObservable(e()), n && n.style && n.style.fontFamily ? $(t).removeAttr("disabled") :$(t).attr("disabled", "disabled");
}
}, ko.bindingHandlers.ensureVisible = {
init:function() {},
update:function(t, e) {
var n, i, r, o, a, s;
if (ko.utils.unwrapObservable(e())) return n = $(t), i = n.parent(), s = n.position().top, 
r = s + n.height(), a = i.scrollTop(), o = i.height(), a > s || r > o ? i.scrollTo(n) :void 0;
}
}, ko.bindingHandlers.background = {
init:function(t, e) {
var n;
return n = ko.utils.unwrapObservable(e()), $(t).attr("src", n);
},
update:function(t, e) {
var n;
return n = ko.utils.unwrapObservable(e()), $(t).attr("src", n);
}
}, ko.bindingHandlers.inverseChecked = {
init:function(t, e, n) {
var i, r, o;
return o = e(), i = ko.dependentObservable({
read:function() {
return !o();
},
write:function(t) {
return o(!t);
},
disposeWhenNodeIsRemoved:t
}), r = function() {
return i;
}, ko.utils.domData.set(t, "newValueAccessor", r), ko.bindingHandlers.checked.init(t, r, n);
},
update:function(t) {
return ko.bindingHandlers.checked.update(t, ko.utils.domData.get(t, "newValueAccessor"));
}
}, ko.bindingHandlers.computedStyles = {
init:function() {}
};
}.call(this), function() {
var t, e = [].indexOf || function(t) {
for (var e = 0, n = this.length; n > e; e++) if (e in this && this[e] === t) return e;
return -1;
};
t = window.Bobcat || {}, t.SocialMediaConfig = function() {
function t(t) {
this.settings = t;
}
return t.prototype.get = function(t) {
return this.settings[t];
}, t.prototype.getDefaultButtonListData = function() {
return [ {
type:"Facebook",
show_button:!0,
url:""
}, {
type:"Twitter",
show_button:!0,
url:""
}, {
type:"GPlus",
show_button:!0,
url:""
}, {
type:"LinkedIn",
show_button:!1,
url:""
} ];
}, t.prototype.updateButtonListData = function(t) {
var n, i, r, o, a, s, l, c;
for (n = this.getDefaultButtonListData(), o = function() {
var e, n, r, o;
for (r = t.button_list, o = [], e = 0, n = r.length; n > e; e++) i = r[e], o.push(i.type);
return o;
}(), c = [], a = 0, s = n.length; s > a; a++) r = n[a], l = r.type, e.call(o, l) < 0 ? c.push(t.button_list.push(r)) :c.push(void 0);
return c;
}, t;
}();
}.call(this), function() {}.call(this);