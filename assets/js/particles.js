/* =========================================================================
   particles.js — animated particle network background
   Partikel melayang + connecting lines saat berdekatan (cyberpunk style)
   - Dark mode: canvas menggantikan body background, menampilkan navy gradient
   - Light mode: canvas bersih, CSS bg yang mengatur
   - Menghormati prefers-reduced-motion
   - 30 fps cap; berhenti saat tab tidak aktif
   ========================================================================= */
(function () {
  "use strict";

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* ---- canvas setup ---- */
  var cvs = document.createElement("canvas");
  cvs.id = "particle-canvas";
  cvs.setAttribute("aria-hidden", "true");
  cvs.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;" +
    "z-index:-1;pointer-events:none;transition:opacity .6s ease;";
  document.body.insertBefore(cvs, document.body.firstChild);
  var ctx = cvs.getContext("2d");

  /* ---- config ---- */
  var MAX_D  = 140;   // max distance to draw connection line
  var FPS    = 30;
  var INTV   = 1000 / FPS;
  var COLORS = ["#2563EB","#2563EB","#2563EB","#57E0E6","#57E0E6","#C9A227"];
  var W, H, pts = [], raf, then = 0;
  var rgbCache = {};

  /* ---- helpers ---- */
  function toRgb(hex) {
    if (rgbCache[hex]) return rgbCache[hex];
    rgbCache[hex] = [
      parseInt(hex.slice(1,3),16),
      parseInt(hex.slice(3,5),16),
      parseInt(hex.slice(5,7),16)
    ];
    return rgbCache[hex];
  }
  function rng(a,b){ return a + Math.random()*(b-a); }

  function isDark() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t === "light") return false;
    if (t === "dark")  return true;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches;
  }

  function applyBodyBg() {
    document.body.style.background = isDark() ? "transparent" : "";
  }

  /* ---- particle factory ---- */
  function mkPt() {
    return {
      x: rng(0,W), y: rng(0,H),
      vx: rng(-0.2,0.2), vy: rng(-0.2,0.2),   // slower = less dizzy
      r:  rng(0.8,1.8),                          // slightly smaller
      col: COLORS[0|(Math.random()*COLORS.length)],
      alpha: rng(0.16,0.40)                       // much lower opacity
    };
  }
  function count(){ return W < 768 ? 18 : 40; }  // fewer particles

  function resize() {
    W = cvs.width  = window.innerWidth;
    H = cvs.height = window.innerHeight;
  }
  function init() {
    resize(); pts = [];
    for (var i=0,n=count();i<n;i++) pts.push(mkPt());
  }

  /* ---- draw navy background + grid ---- */
  function drawBg() {
    var g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,"#080f22");
    g.addColorStop(1,"#0d1b35");
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    // Subtle circuit grid
    ctx.strokeStyle = "rgba(37,99,235,0.055)";
    ctx.lineWidth = 0.5;
    var sp = 80, x, y;
    for(x=0;x<W;x+=sp){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(y=0;y<H;y+=sp){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  }

  /* ---- main animation loop ---- */
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (document.hidden || now - then < INTV) return;
    then = now;

    if (!isDark()) { ctx.clearRect(0,0,W,H); return; }

    drawBg();

    /* connecting lines (O(n²) — OK for n≤70) */
    var i, j, p1, p2, dx, dy, d, la, rgb;
    ctx.lineWidth = 0.9;
    for (i=0;i<pts.length;i++) {
      for (j=i+1;j<pts.length;j++) {
        p1=pts[i]; p2=pts[j];
        dx=p1.x-p2.x; dy=p1.y-p2.y;
        d=Math.sqrt(dx*dx+dy*dy);
        if (d<MAX_D) {
          la = (1 - d/MAX_D) * 0.09;  // lines much more subtle
          rgb = toRgb(p1.col);
          ctx.strokeStyle="rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+la+")";
          ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.stroke();
        }
      }
    }

    /* particles */
    for (i=0;i<pts.length;i++) {
      var p=pts[i];
      // move + wrap
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<-12)p.x=W+12; if(p.x>W+12)p.x=-12;
      if(p.y<-12)p.y=H+12; if(p.y>H+12)p.y=-12;

      rgb = toRgb(p.col);
      // soft outer glow (very subtle)
      ctx.globalAlpha = p.alpha * 0.10;
      ctx.fillStyle = p.col;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r*2.6,0,6.2832); ctx.fill();
      // mid glow
      ctx.globalAlpha = p.alpha * 0.30;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r*1.4,0,6.2832); ctx.fill();
      // core
      ctx.globalAlpha = p.alpha;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.2832); ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  /* ---- resize (debounced) ---- */
  var rTimer;
  window.addEventListener("resize",function(){
    clearTimeout(rTimer); rTimer=setTimeout(init,200);
  });

  /* ---- watch theme toggle ---- */
  new MutationObserver(function(muts){
    muts.forEach(function(m){
      if(m.attributeName==="data-theme") applyBodyBg();
    });
  }).observe(document.documentElement,{attributes:true});

  /* ---- start ---- */
  applyBodyBg();
  init();
  raf = requestAnimationFrame(frame);
})();
