(function() {
var e, t, n, i, r, o;
o = $B.TH.isSmallScreen(), t = !1, n = function() {
return !$B.TH.isSmallScreen() && !$B.TH.isAndroid() && $("#header-container").is(":visible");
}, e = function() {
return $("#header-container .logo").height() + 18;
}, i = function() {
var t, r, a, s, l, c, u;
return o = Bobcat.TH.isSmallScreen(), t = $("#header-container"), r = $("#header-spacer"), 
u = $("li.slide").first().find(".spacer"), n() ? (s = t.height() - 0, r.show().css("height", s), 
l = $("#header-container .logo").height(), $("a.section-anchor").css("top", -s + l + 20), 
$("a.section-anchor").first().css("top", -s)) :($(".spacer").hide(), r.hide()), 
$("#header-container .logo img").load(i), c = $(".header .logo img").first().attr("src"), 
o && (!c || c.indexOf("assets/icons/transparent.png") > -1) ? ($(".header .power").hide(), 
t.css("height", 0)) :($(".header .power").show(), t.css("height", "auto")), a = $(window).height(), 
$(".resize").each(function(n) {
var i, r, s, l, c, u, d;
return d = $(this), i = d.find(".container").first(), u = a, 0 === n && d.parent().is(":first-child") ? o ? u -= t.outerHeight() :t.is(":visible") && (u -= t.height()) :t.is(":visible") && (u -= t.height() - e()), 
r = d.outerHeight(), Math.abs(r - u) < 64 && $B.TH.isSmallScreen() ? void 0 :i.outerHeight(!1) < u ? (s = .5 * (u - i.outerHeight(!1)), 
c = Math.min(400, Math.floor(s)), l = Math.min(400, Math.ceil(s)), d.stop().animate({
"padding-top":c,
"padding-bottom":l
})) :void 0;
}), $B.TH.isIpad() ? $("#header-container").addClass("no-flicker") :void 0;
}, r = function() {
var i, r, o, a, s;
if (n()) if (i = $("#header-container"), s = $(window).scrollTop(), o = -parseInt(i.css("margin-top"), 10), 
o > s - 15) a = -(s - 15), a > 0 && (a = 0), i.stop().css("margin-top", a); else {
if (t) return;
if (r = e(), s > i.height()) return i.stop().animate({
"margin-top":-r + "px"
}, 500, "swing");
}
}, window.runAfterDomBinding.add("fresh", function() {
var e;
return Bobcat.TH.applyTouchNav(), i(), setTimeout(i, 1e3), window.edit_page.Event.subscribe("Slide.afterAdd", function() {
return i();
}), $(window).resize(i), $("#navbar-top-button img").click(function() {
return window.location = "#1";
}), window.edit_page.Event.subscribe("Menu.beforeChange", function() {
return t = !0;
}), window.edit_page.Event.subscribe("Menu.afterChange", function() {
return t = !1, r();
}), $(window).scroll(r), $(window).scroll(), window.edit_page.isShowPage && (e = $(".wide"), 
e.each(function(t, n) {
var i, r;
return r = $(n), i = e.eq(t + 1), r.hasClass("image") || r.hasClass("gray") || !i.length || i.hasClass("image") || i.hasClass("gray") ? r.removeClass("white-next") :r.addClass("white-next");
})), $(".signup-form-container").each(function() {
return $(this).find(".input").each(function() {
var e, t, n;
return n = $(this).find("label.outside"), "none" !== n.css("display") ? (t = $(this).find("input, textarea"), 
e = function() {
return "" === t.val() ? n.show() :n.hide();
}, t.keypress(function() {
return "" === t.val() ? n.hide() :void 0;
}), t.keyup(e), t.blur(e), t.focus(function() {
return n.hide();
}), n.click(function() {
return t.focus();
})) :void 0;
});
});
});
}).call(this);