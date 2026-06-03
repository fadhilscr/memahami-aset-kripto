/* =========================================================================
   site.js — shared chrome + interactions for "Memahami Aset Kripto"
   Injects top nav + footer, handles theme & accent, mobile menu, TOC
   scrollspy, reveal-on-scroll. Vanilla JS, no build step.
   ========================================================================= */
(function () {
  "use strict";

  // ----- page manifest (order = reading order) -----
  var PAGES = [
    { href: "index.html",               label: "Beranda",     short: "Beranda" },
    { href: "pendahuluan.html",          label: "Pendahuluan", short: "Pendahuluan" },
    { href: "bab-1-dasar-dasar.html",    label: "1 · Dasar",   short: "Bab 1 — Dasar-Dasar Aset Kripto" },
    { href: "bab-2-teknologi.html",      label: "2 · Teknologi", short: "Bab 2 — Teknologi di Balik Kripto" },
    { href: "bab-3-ekosistem.html",      label: "3 · Ekosistem", short: "Bab 3 — Ekosistem & Jenis Aset" },
    { href: "bab-4-investasi.html",      label: "4 · Investasi", short: "Bab 4 — Investasi & Analisis" },
    { href: "bab-5-risiko-keamanan.html",label: "5 · Keamanan",  short: "Bab 5 — Risiko & Keamanan" },
    { href: "bab-6-regulasi.html",       label: "6 · Regulasi",  short: "Bab 6 — Regulasi & Pajak" },
    { href: "tools.html",                label: "Tools",       short: "Bab 7 — Tools & Sumber Belajar" },
    { href: "glosarium.html",            label: "Glosarium",   short: "Bab 8 — Glosarium" }
  ];
  // links shown in the top nav (skip Beranda; it's the brand)
  var NAV = PAGES.slice(1);

  var path = location.pathname.split("/").pop() || "index.html";
  if (path === "") path = "index.html";

  var ACCENTS = [
    { id: "blue",   name: "Biru Samudra",  color: "#2563EB" },
    { id: "teal",   name: "Hijau Teal",    color: "#0E8C8B" },
    { id: "violet", name: "Ungu Kripto",   color: "#6D4AE0" }
  ];

  // ---------- theme + accent (persisted) ----------
  var root = document.documentElement;
  try {
    var st = localStorage.getItem("mk-theme");
    if (st) root.setAttribute("data-theme", st);
    else if (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark");
    var sa = localStorage.getItem("mk-accent");
    if (sa) root.setAttribute("data-accent", sa);
  } catch (e) {}

  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("mk-theme", t); } catch (e) {}
  }
  function setAccent(a) {
    root.setAttribute("data-accent", a);
    try { localStorage.setItem("mk-accent", a); } catch (e) {}
    syncAccentUI();
  }
  function curAccent() { return root.getAttribute("data-accent") || "blue"; }

  // ---------- build nav ----------
  function svg(paths, vb) {
    return '<svg viewBox="' + (vb || "0 0 24 24") + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + "</svg>";
  }
  var ICON = {
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>'),
    palette: svg('<circle cx="13.5" cy="6.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r="1.3" fill="currentColor" stroke="none"/><path d="M12 22a10 10 0 1 1 0-20 8.5 8.5 0 0 1 0 17c-1 0-1.5.8-1 1.6.3.6 0 1.4-.9 1.4z"/>'),
    burger: svg('<path d="M3 6h18M3 12h18M3 18h18"/>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>')
  };

  var navLinksHTML = NAV.map(function (p) {
    var on = p.href === path ? " is-active" : "";
    return '<a href="' + p.href + '" class="' + on.trim() + '">' + p.label + "</a>";
  }).join("");

  var accentBtns = ACCENTS.map(function (a) {
    return '<button type="button" data-accent-set="' + a.id + '" role="menuitemradio" aria-checked="false">' +
      '<span class="swatch" style="background:' + a.color + '"></span>' + a.name + "</button>";
  }).join("");

  var navHTML =
    '<a href="#main" class="skip-link">Lewati ke konten</a>' +
    '<header class="topnav"><div class="topnav__inner">' +
      '<a href="index.html" class="brand"><span class="brand__mark"></span><span>Memahami Aset Kripto<small>Panduan Lengkap</small></span></a>' +
      '<nav class="nav-links" aria-label="Bab">' + navLinksHTML + "</nav>" +
      '<div class="nav-tools">' +
        '<div class="accent-menu">' +
          '<button class="iconbtn" id="accentBtn" aria-label="Ganti skema warna" aria-haspopup="true" aria-expanded="false">' + ICON.palette + "</button>" +
          '<div class="accent-pop" id="accentPop" role="menu">' +
            '<div style="font-family:var(--font-mono);font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);padding:.3rem .6rem .5rem">Skema warna</div>' +
            accentBtns +
          "</div>" +
        "</div>" +
        '<button class="iconbtn" id="themeBtn" aria-label="Ganti mode terang/gelap"><span class="sun">' + ICON.sun + '</span><span class="moon">' + ICON.moon + "</span></button>" +
        '<button class="iconbtn nav-burger" id="burgerBtn" aria-label="Buka menu" aria-expanded="false">' + ICON.burger + "</button>" +
      "</div>" +
    "</div></header>" +
    '<div class="mobile-panel" id="mobilePanel">' + NAV.map(function (p) {
      var on = p.href === path ? " is-active" : "";
      return '<a href="' + p.href + '" class="' + on.trim() + '">' + p.label.replace(/^\d+\s·\s/, "") + "</a>";
    }).join("") + "</div>";

  var mount = document.getElementById("site-nav");
  if (mount) mount.innerHTML = navHTML;
  else { var d = document.createElement("div"); d.innerHTML = navHTML; document.body.insertBefore(d, document.body.firstChild); }

  // ---------- footer ----------
  var colA = PAGES.slice(1, 6).map(function (p) { return '<a href="' + p.href + '">' + p.short.replace(/—/g, "·") + "</a>"; }).join("");
  var colB = PAGES.slice(6).map(function (p) { return '<a href="' + p.href + '">' + p.short.replace(/—/g, "·") + "</a>"; }).join("");
  var footHTML =
    '<footer class="site-footer">' +
      '<div class="site-footer__top">' +
        '<div><a href="index.html" class="brand"><span class="brand__mark"></span><span>Memahami Aset Kripto<small>Panduan Lengkap</small></span></a>' +
          '<p class="site-footer__about">Panduan pembelajaran aset kripto dari dasar hingga lanjutan — blockchain, investasi, keamanan, dan regulasi Indonesia, disusun dalam bahasa yang mudah dipahami.</p></div>' +
        '<div><h5>Bab Awal</h5>' + colA + "</div>" +
        '<div><h5>Bab Lanjut</h5>' + colB + "</div>" +
      "</div>" +
      '<div class="disclaimer"><div class="disclaimer__inner">' +
        "<p><strong>Bukan nasihat keuangan.</strong> Seluruh materi bersifat edukasi. Aset kripto sangat fluktuatif dan berisiko tinggi — selalu lakukan riset mandiri (DYOR) dan pertimbangkan profil risiko Anda sebelum berinvestasi.</p>" +
        '<span class="disclaimer__tag">DYOR · Edukasi</span>' +
      "</div></div>" +
    "</footer>";

  var fmount = document.getElementById("site-footer");
  if (fmount) fmount.outerHTML = footHTML;
  else if (!document.querySelector(".site-footer")) document.body.insertAdjacentHTML("beforeend", footHTML);

  // ---------- prev / next pager ----------
  (function () {
    var holder = document.getElementById("site-pager");
    if (!holder) return;
    var idx = PAGES.findIndex(function (p) { return p.href === path; });
    if (idx < 0) return;
    var prev = PAGES[idx - 1], next = PAGES[idx + 1];

    var chevL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
    var chevR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

    function strip(s){ return s.replace(/^Bab \d+\s*[—–-]\s*/,"").replace(/^Bab \d+\s*·\s*/,""); }

    var html = "";
    if (prev) {
      html += '<a href="' + prev.href + '" class="pager__card">' +
        '<span class="pager__dir">' + chevL + " Sebelumnya</span>" +
        '<span class="pager__label">' + prev.label + "</span>" +
        '<span class="pager__name">' + strip(prev.short) + "</span>" +
        "</a>";
    } else { html += "<span></span>"; }

    if (next) {
      html += '<a href="' + next.href + '" class="pager__card pager__card--next">' +
        '<span class="pager__dir">Selanjutnya ' + chevR + "</span>" +
        '<span class="pager__label">' + next.label + "</span>" +
        '<span class="pager__name">' + strip(next.short) + "</span>" +
        "</a>";
    }

    holder.innerHTML = html;
  })();

  // ---------- wire controls ----------
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[id], [data-accent-set]");
    var themeBtn = e.target.closest("#themeBtn");
    if (themeBtn) { setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"); return; }
    var aBtn = e.target.closest("#accentBtn");
    var pop = document.getElementById("accentPop");
    if (aBtn) { var open = pop.classList.toggle("open"); aBtn.setAttribute("aria-expanded", open); return; }
    var setBtn = e.target.closest("[data-accent-set]");
    if (setBtn) { setAccent(setBtn.getAttribute("data-accent-set")); if (pop) pop.classList.remove("open"); return; }
    if (pop && pop.classList.contains("open") && !e.target.closest(".accent-menu")) pop.classList.remove("open");
    var burger = e.target.closest("#burgerBtn");
    if (burger) {
      var mp = document.getElementById("mobilePanel");
      var op = mp.classList.toggle("open");
      burger.setAttribute("aria-expanded", op);
      burger.innerHTML = op ? ICON.close : ICON.burger;
      document.body.style.overflow = op ? "hidden" : "";
      return;
    }
  });

  function syncAccentUI() {
    var c = curAccent();
    document.querySelectorAll("[data-accent-set]").forEach(function (b) {
      b.setAttribute("aria-checked", b.getAttribute("data-accent-set") === c ? "true" : "false");
    });
  }
  syncAccentUI();

  // ---------- TOC scrollspy ----------
  (function () {
    var toc = document.querySelector(".toc");
    if (!toc) return;
    var links = Array.prototype.slice.call(toc.querySelectorAll("a"));
    var map = {};
    var targets = links.map(function (l) {
      var id = l.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) map[id] = l;
      return el;
    }).filter(Boolean);
    if (!("IntersectionObserver" in window) || !targets.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          var a = map[en.target.id];
          if (a) a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px", threshold: 0 });
    targets.forEach(function (t) { io.observe(t); });
  })();

  // ---------- reveal on scroll ----------
  (function () {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    els.forEach(function (e) { io.observe(e); });
  })();

  // ---------- reading time ----------
  (function () {
    var slot = document.querySelector("[data-readtime]");
    if (!slot) return;
    var prose = document.querySelector(".prose");
    if (!prose) return;
    var words = (prose.innerText || "").trim().split(/\s+/).length;
    var mins = Math.max(1, Math.round(words / 200));
    slot.textContent = "± " + mins + " menit baca";
  })();

})();
