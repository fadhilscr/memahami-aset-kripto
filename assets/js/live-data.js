/* =========================================================================
   live-data.js — widget harga live & Fear/Greed Index
   Pakai API publik tanpa auth: CoinGecko & alternative.me
   ========================================================================= */
(function () {
  "use strict";

  /* ---- Harga BTC / ETH (CoinGecko) ---- */
  var wBtc = document.getElementById("widget-btc");
  var wEth = document.getElementById("widget-eth");

  if (wBtc || wEth) {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,idr")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        function fmtUsd(n) {
          return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
        }
        function fmtIdr(n) {
          if (n >= 1e12) return "Rp " + (n / 1e12).toFixed(2) + " T";
          if (n >= 1e9)  return "Rp " + (n / 1e9).toFixed(0)  + " M";
          return "Rp " + (n / 1e6).toFixed(0) + " jt";
        }
        function fill(w, usd, idr) {
          if (!w) return;
          var val = w.querySelector(".wval");
          var sub = w.querySelector(".wsub");
          val.textContent = fmtUsd(usd);
          val.classList.remove("wdash");
          sub.textContent = fmtIdr(idr) + " · CoinGecko";
        }
        if (d.bitcoin)  fill(wBtc, d.bitcoin.usd,  d.bitcoin.idr);
        if (d.ethereum) fill(wEth, d.ethereum.usd, d.ethereum.idr);
      })
      .catch(function () {
        [wBtc, wEth].forEach(function (w) {
          if (w) w.querySelector(".wsub").textContent = "Data tidak tersedia saat ini.";
        });
      });
  }

  /* ---- Bitcoin Circulating Supply (CoinGecko) ---- */
  var btcCircEl   = document.getElementById("btc-circ");
  var btcMeterEl  = document.getElementById("btc-meter");
  var btcChipPct  = document.getElementById("btc-chip-pct");
  var btcChipRem  = document.getElementById("btc-chip-rem");

  if (btcCircEl || btcMeterEl) {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) {
        var b = data[0]; if (!b) return;
        var circ = b.circulating_supply;
        var maxS = b.max_supply || 21000000;
        var pct  = (circ / maxS * 100);
        var rem  = (maxS - circ) / 1e6;
        var fmtN = function (n, dec) { return "≈ " + (n).toFixed(dec).replace(".", ",") + " juta"; };

        if (btcCircEl)  btcCircEl.textContent = fmtN(circ / 1e6, 2);
        if (btcMeterEl) {
          var pctStr = pct.toFixed(1) + "%";
          btcMeterEl.setAttribute("data-w", pctStr);
          btcMeterEl.style.width = pctStr;
        }
        if (btcChipPct) btcChipPct.innerHTML =
          '<span class="d d-gold"></span>' + pct.toFixed(1) + "% pasokan sudah beredar";
        if (btcChipRem) btcChipRem.innerHTML =
          '<span class="d d-cyan"></span>Sisa ' + fmtN(rem, 2) + " ditambang perlahan hingga ± 2140";
      })
      .catch(function () { /* silent — tetap tampil nilai statis */ });
  }

  /* ---- Fear & Greed Index (alternative.me) ---- */
  var wFg = document.querySelector('[data-widget="fear-greed"]');
  if (!wFg) return;

  var fgVal = wFg.querySelector(".wval");
  var fgSub = wFg.querySelector(".wsub");
  var LABELS = {
    "Extreme Fear":  "Ketakutan Ekstrem",
    "Fear":          "Takut",
    "Neutral":       "Netral",
    "Greed":         "Serakah",
    "Extreme Greed": "Keserakahan Ekstrem"
  };
  var COLORS = {
    "Extreme Fear":  "#ff7a8a",
    "Fear":          "#E6A24A",
    "Neutral":       "#E6C667",
    "Greed":         "#9fd86a",
    "Extreme Greed": "#5be0a0"
  };

  fgVal.textContent = "…";
  fgVal.classList.remove("wdash");

  fetch("https://api.alternative.me/fng/?limit=1")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var d   = data.data[0];
      var cls = d.value_classification;
      fgVal.textContent = d.value + " / 100 — " + (LABELS[cls] || cls);
      fgVal.style.color = COLORS[cls] || "var(--ink-strong)";
      fgSub.textContent = "alternative.me · diperbarui harian";
      wFg.removeAttribute("data-widget");
    })
    .catch(function () {
      fgVal.textContent = "—";
      fgVal.classList.add("wdash");
      fgSub.textContent = "Data tidak tersedia saat ini.";
    });
})();
