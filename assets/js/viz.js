/* =========================================================================
   viz.js — interaktivitas ringan untuk diagram
   - Segmented toggle: [data-viz] berisi .viz-seg button[data-state] + [data-show]
   - Hotspot tooltip: [data-tip="Judul|Isi"] (hover/focus/tap)
   - Meter animasi saat masuk viewport: .meter__fill[data-w]
   ========================================================================= */
(function () {
  "use strict";

  /* ---- Segmented toggles ---- */
  document.querySelectorAll("[data-viz]").forEach(function (root) {
    var btns = root.querySelectorAll(".viz-seg [data-state]");
    var panels = root.querySelectorAll("[data-show]");
    function activate(state) {
      btns.forEach(function (b) { b.classList.toggle("is-on", b.getAttribute("data-state") === state); });
      panels.forEach(function (p) { p.classList.toggle("is-on", p.getAttribute("data-show") === state); });
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { activate(b.getAttribute("data-state")); }); });
    // default: first button
    if (btns.length) activate(btns[0].getAttribute("data-state"));
  });

  /* ---- Tooltip (single shared element) ---- */
  var tip = document.createElement("div");
  tip.className = "viz-tip";
  tip.setAttribute("role", "tooltip");
  document.body.appendChild(tip);
  var tipTarget = null;

  function showTip(el) {
    var raw = el.getAttribute("data-tip");
    if (!raw) return;
    var parts = raw.split("|");
    tip.innerHTML = parts.length > 1
      ? "<strong>" + esc(parts[0]) + "</strong>" + esc(parts.slice(1).join("|"))
      : esc(parts[0]);
    tip.classList.add("show");
    tipTarget = el;
    positionTip(el);
  }
  function hideTip() { tip.classList.remove("show"); tipTarget = null; }
  function positionTip(el) {
    var r = el.getBoundingClientRect();
    var tr = tip.getBoundingClientRect();
    var x = r.left + r.width / 2 - tr.width / 2;
    var y = r.top - tr.height - 10;
    x = Math.max(10, Math.min(x, window.innerWidth - tr.width - 10));
    if (y < 10) y = r.bottom + 10;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  document.querySelectorAll("[data-tip]").forEach(function (el) {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    el.classList.add("viz-hot");
    el.addEventListener("mouseenter", function () { showTip(el); });
    el.addEventListener("mouseleave", hideTip);
    el.addEventListener("focus", function () { showTip(el); });
    el.addEventListener("blur", hideTip);
    el.addEventListener("click", function (e) {
      e.stopPropagation();
      if (tipTarget === el) hideTip(); else showTip(el);
    });
  });
  window.addEventListener("scroll", function () { if (tipTarget) positionTip(tipTarget); }, { passive: true });
  document.addEventListener("click", function (e) { if (tipTarget && !e.target.closest("[data-tip]")) hideTip(); });

  /* ---- Deferred AI image loader ----
     Each .ai-img has an <img data-src="assets/img/x.webp">. We probe that path;
     if the file exists, swap it in and reveal. If not (placeholder phase),
     keep the marked placeholder. No broken static references, no console 404
     from the page itself. Once Claude Code drops files in assets/img/, they
     appear automatically on next load. */
  document.querySelectorAll(".ai-img").forEach(function (fig) {
    var img = fig.querySelector("img[data-src]");
    if (!img) return;
    var src = img.getAttribute("data-src");
    var probe = new Image();
    probe.onload = function () {
      img.src = src;
      fig.classList.remove("ai-img--empty");
    };
    probe.onerror = function () {
      fig.classList.add("ai-img--empty");
    };
    probe.src = src;
  });

  /* ---- Animated meters ---- */
  var meters = document.querySelectorAll(".meter__fill[data-w]");
  if (meters.length) {
    if (!("IntersectionObserver" in window)) {
      meters.forEach(function (m) { m.style.width = m.getAttribute("data-w"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var m = en.target;
            requestAnimationFrame(function () { m.style.width = m.getAttribute("data-w"); });
            io.unobserve(m);
          }
        });
      }, { threshold: .3 });
      meters.forEach(function (m) { io.observe(m); });
    }
  }
})();
