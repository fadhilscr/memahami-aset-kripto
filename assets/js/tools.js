/* tools.js — data + filtering for the Bab 7 directory */
(function () {
  "use strict";
  var TOOLS = [
    // 7.1 Data Pasar & FA
    { n: "CoinGecko", cat: "Data Pasar", lvl: "Pemula", d: "Data harga, ranking, market cap, pasokan beredar; sangat lengkap & populer." },
    { n: "CoinMarketCap", cat: "Data Pasar", lvl: "Pemula", d: "Serupa CoinGecko: harga, ranking, kapitalisasi pasar." },
    { n: "Messari", cat: "Data Pasar", lvl: "Menengah", d: "Riset mendalam, profil proyek, data fundamental terstruktur." },
    { n: "Token Terminal", cat: "Data Pasar", lvl: "Lanjut", d: "Metrik keuangan proyek (pendapatan, biaya) ala laporan keuangan." },
    // 7.2 On-Chain
    { n: "Glassnode", cat: "On-Chain", lvl: "Lanjut", d: "Metrik on-chain komprehensif untuk analisis jaringan." },
    { n: "CryptoQuant", cat: "On-Chain", lvl: "Menengah", d: "Data on-chain & aliran dana bursa (exchange flow), aktivitas paus." },
    { n: "Nansen", cat: "On-Chain", lvl: "Lanjut", d: "Pelabelan dompet (wallet labeling) untuk melacak \u201csmart money\u201d." },
    { n: "Santiment", cat: "On-Chain", lvl: "Menengah", d: "Data on-chain, sosial, dan pengembangan; analisis sentimen." },
    { n: "IntoTheBlock", cat: "On-Chain", lvl: "Menengah", d: "Sinyal & analitik on-chain yang disederhanakan." },
    { n: "Arkham", cat: "On-Chain", lvl: "Lanjut", d: "Platform intelijen on-chain untuk menelusuri entitas & aliran dana." },
    { n: "Dune", cat: "On-Chain", lvl: "Lanjut", d: "Dashboard analitik on-chain berbasis kueri komunitas." },
    { n: "DefiLlama", cat: "On-Chain", lvl: "Menengah", d: "Pelacak TVL (Total Value Locked) protokol DeFi lintas jaringan." },
    { n: "Lookonchain", cat: "On-Chain", lvl: "Menengah", d: "Pelacakan pergerakan paus & smart money secara real-time." },
    // 7.3 TA & Charting
    { n: "TradingView", cat: "Charting", lvl: "Semua level", d: "Platform grafik (charting) standar industri untuk analisis teknikal." },
    { n: "Coinglass", cat: "Charting", lvl: "Lanjut", d: "Data pasar derivatif: funding rate, open interest, likuidasi (futures)." },
    // 7.4 Berita
    { n: "CoinDesk", cat: "Berita", lvl: "Semua level", d: "Portal berita utama, liputan industri & sentimen pasar." },
    { n: "Cointelegraph", cat: "Berita", lvl: "Semua level", d: "Berita & analisis kripto populer." },
    { n: "The Block", cat: "Berita", lvl: "Menengah", d: "Berita & riset mendalam untuk kalangan profesional." },
    { n: "Decrypt", cat: "Berita", lvl: "Pemula", d: "Berita dengan gaya yang ramah pemula." },
    { n: "Bitcoin Magazine", cat: "Berita", lvl: "Semua level", d: "Fokus khusus pada Bitcoin." },
    { n: "Coinvestasi", cat: "Berita", lvl: "Pemula", d: "Media berita & edukasi kripto berbahasa Indonesia.", id: true },
    { n: "Blockchain Media Indonesia", cat: "Berita", lvl: "Pemula", d: "Liputan industri kripto & blockchain lokal.", id: true },
    { n: "Pintu News & Academy", cat: "Berita", lvl: "Pemula", d: "Konten berita dan materi belajar berbahasa Indonesia.", id: true },
    { n: "CoinDesk Indonesia", cat: "Berita", lvl: "Pemula", d: "Versi lokal dari portal berita global.", id: true },
    // 7.5 Block Explorer
    { n: "Etherscan", cat: "Explorer", lvl: "Semua level", d: "Block explorer untuk jaringan Ethereum." },
    { n: "BscScan", cat: "Explorer", lvl: "Semua level", d: "Block explorer untuk BNB Smart Chain." },
    { n: "Solscan", cat: "Explorer", lvl: "Semua level", d: "Block explorer untuk jaringan Solana." },
    { n: "Blockchain.com Explorer", cat: "Explorer", lvl: "Pemula", d: "Explorer untuk Bitcoin (dan lainnya)." },
    { n: "Blockchair", cat: "Explorer", lvl: "Menengah", d: "Multi-blockchain (pencarian lintas jaringan)." },
    { n: "Arbiscan / Polygonscan / Basescan", cat: "Explorer", lvl: "Menengah", d: "Explorer untuk jaringan Layer 2 (Arbitrum, Optimism, Polygon, Base)." },
    // 7.6 Portfolio Tracker
    { n: "CoinStats", cat: "Portfolio", lvl: "Pemula", d: "Pelacak portofolio dengan koneksi ke banyak bursa & dompet." },
    { n: "Delta", cat: "Portfolio", lvl: "Pemula", d: "Pelacak portofolio multi-bursa & dompet." },
    { n: "Zerion", cat: "Portfolio", lvl: "Menengah", d: "Pelacak khusus aktivitas DeFi & on-chain berbasis alamat dompet." },
    { n: "DeBank", cat: "Portfolio", lvl: "Menengah", d: "Pelacak aktivitas DeFi & on-chain berbasis alamat dompet." },
    // 7.7 Sentimen
    { n: "Fear & Greed Index", cat: "Sentimen", lvl: "Pemula", d: "Mengukur sentimen pasar dari ketakutan ekstrem hingga keserakahan ekstrem (alternative.me)." }
  ];

  var CATS = ["Semua", "Data Pasar", "On-Chain", "Charting", "Berita", "Explorer", "Portfolio", "Sentimen"];
  var LVLS = ["Semua", "Pemula", "Menengah", "Lanjut"];

  var state = { cat: "Semua", lvl: "Semua" };
  var grid = document.getElementById("tools-grid");
  var countEl = document.getElementById("tools-count");
  var catWrap = document.getElementById("filter-cat");
  var lvlWrap = document.getElementById("filter-lvl");

  function lvlClass(l) {
    if (l === "Pemula") return "badge--pemula";
    if (l === "Menengah") return "badge--menengah";
    if (l === "Lanjut") return "badge--lanjut";
    return "";
  }

  function render() {
    var list = TOOLS.filter(function (t) {
      return (state.cat === "Semua" || t.cat === state.cat) && (state.lvl === "Semua" || t.lvl === state.lvl);
    });
    grid.innerHTML = list.length ? list.map(function (t) {
      return '<div class="card card--hover tool-card reveal in">' +
        '<div class="tc-top"><span class="cat">' + t.cat + (t.id ? " · ID" : "") + '</span>' +
        '<span class="badge ' + lvlClass(t.lvl) + '">' + t.lvl + '</span></div>' +
        '<h4>' + t.n + '</h4>' +
        '<p>' + t.d + '</p>' +
      '</div>';
    }).join("") : '<div class="tool-empty">Tidak ada tools yang cocok dengan filter ini.</div>';
    countEl.textContent = list.length + " dari " + TOOLS.length + " tools";
  }

  function buildChips(wrap, items, key) {
    wrap.innerHTML = items.map(function (it) {
      return '<button class="chip' + (state[key] === it ? " is-on" : "") + '" data-val="' + it + '">' + it + '</button>';
    }).join("");
    wrap.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      state[key] = b.getAttribute("data-val");
      wrap.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("is-on", c === b); });
      render();
    });
  }

  buildChips(catWrap, CATS, "cat");
  buildChips(lvlWrap, LVLS, "lvl");
  render();
})();
