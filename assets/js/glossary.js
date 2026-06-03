/* glossary.js — searchable, alphabetical glossary for Bab 8 */
(function () {
  "use strict";
  var TERMS = [
    ["HODL", "Memegang aset jangka panjang tanpa terpancing menjual saat harga bergejolak. Berasal dari salah ketik kata \u201chold\u201d yang menjadi budaya komunitas."],
    ["FOMO", "Fear of Missing Out \u2014 rasa takut ketinggalan yang mendorong membeli secara impulsif saat harga sedang melonjak."],
    ["FUD", "Fear, Uncertainty, Doubt \u2014 penyebaran ketakutan, ketidakpastian, dan keraguan yang dapat menekan harga."],
    ["DYOR", "Do Your Own Research \u2014 lakukan riset Anda sendiri sebelum berinvestasi; prinsip utama dalam kripto."],
    ["Shill", "Mempromosikan suatu aset secara berlebihan, sering kali karena kepentingan pribadi pelakunya."],
    ["Diamond Hands", "Sebutan untuk pemegang aset yang teguh menahan posisi meski harga bergejolak tajam."],
    ["Paper Hands", "Lawan dari diamond hands \u2014 mudah panik dan menjual saat harga turun sedikit."],
    ["Bagholder", "Orang yang masih memegang aset yang nilainya sudah anjlok jauh, terjebak dalam kerugian."],
    ["Moon / To the Moon", "Ungkapan harapan bahwa harga akan naik sangat tinggi."],
    ["Rekt", "Pelafalan dari \u201cwrecked\u201d \u2014 mengalami kerugian besar."],
    ["Whale (Paus)", "Individu atau entitas yang memegang aset kripto dalam jumlah sangat besar sehingga pergerakannya bisa memengaruhi pasar."],
    ["ATH / ATL", "All-Time High (harga tertinggi sepanjang masa) / All-Time Low (harga terendah sepanjang masa)."],
    ["Altseason", "Periode ketika banyak altcoin mengalami kenaikan harga signifikan, biasanya saat dominasi Bitcoin menurun."],
    ["Market Cap", "Kapitalisasi pasar = harga \u00d7 pasokan beredar; ukuran nilai total sebuah aset."],
    ["FDV", "Fully Diluted Valuation = harga \u00d7 total pasokan maksimal; valuasi seandainya semua token sudah beredar."],
    ["Liquidity (Likuiditas)", "Seberapa mudah sebuah aset dibeli/dijual tanpa banyak menggerakkan harganya."],
    ["Slippage", "Selisih antara harga yang diharapkan dan harga eksekusi sebenarnya, sering terjadi pada aset berlikuiditas rendah."],
    ["Satoshi (sat)", "Unit terkecil Bitcoin; 1 Bitcoin = 100.000.000 satoshi. Dinamai dari pencipta Bitcoin."],
    ["Blue Chip Crypto", "Aset kripto besar dan mapan yang dianggap relatif lebih stabil dibanding aset kecil."],
    ["Meme Coin", "Token yang lahir dari budaya internet/meme; sangat spekulatif dan digerakkan sentimen komunitas."],
    ["Gas Fee", "Biaya transaksi yang dibayar untuk memproses aktivitas di blockchain."],
    ["Gas War", "Kondisi ketika banyak orang berebut memproses transaksi, mendorong biaya gas melonjak tinggi."],
    ["dApp", "Decentralized Application \u2014 aplikasi yang berjalan di atas blockchain tanpa server terpusat."],
    ["Smart Contract", "Program yang berjalan otomatis di blockchain saat kondisi tertentu terpenuhi."],
    ["Mining (Menambang)", "Proses memverifikasi transaksi & menciptakan koin baru pada jaringan Proof of Work."],
    ["Staking", "Menjaminkan aset pada jaringan Proof of Stake untuk membantu mengamankan jaringan & memperoleh imbalan."],
    ["Halving", "Pemangkasan setengah imbalan blok Bitcoin yang terjadi kira-kira tiap empat tahun."],
    ["Fork", "Perubahan pada aturan blockchain. Hard fork (tidak kompatibel dengan versi lama, bisa melahirkan koin baru) vs soft fork (masih kompatibel)."],
    ["Seed Phrase", "Rangkaian 12/24 kata yang menjadi cadangan induk dompet; harus dirahasiakan mutlak."],
    ["Private Key / Public Key", "Kunci privat (rahasia, memberi kendali aset) & kunci publik (seperti nomor rekening, boleh dibagikan)."],
    ["Hot Wallet / Cold Wallet", "Dompet daring (praktis) vs dompet luring/perangkat keras (paling aman)."],
    ["Custodial / Non-Custodial", "Kunci dipegang pihak ketiga (mis. bursa) vs dipegang sepenuhnya oleh Anda sendiri."],
    ["CEX / DEX", "Centralized Exchange (bursa terpusat) vs Decentralized Exchange (bursa terdesentralisasi)."],
    ["KYC / AML", "Know Your Customer / Anti-Money Laundering \u2014 proses verifikasi identitas & pencegahan pencucian uang."],
    ["Multisig", "Multi-signature \u2014 dompet yang memerlukan beberapa kunci untuk menyetujui satu transaksi."],
    ["DeFi", "Decentralized Finance \u2014 layanan keuangan terdesentralisasi tanpa perantara."],
    ["NFT", "Non-Fungible Token \u2014 token unik yang mewakili kepemilikan atas suatu objek digital/aset."],
    ["TVL", "Total Value Locked \u2014 total nilai aset yang dikunci dalam sebuah protokol DeFi."],
    ["APY / APR", "Annual Percentage Yield (dengan bunga berbunga) / Annual Percentage Rate (tanpa bunga berbunga)."],
    ["Yield Farming", "Strategi menyediakan likuiditas ke protokol DeFi untuk memperoleh imbalan."],
    ["Liquidity Pool", "Kumpulan dana terkunci yang menyediakan likuiditas bagi DEX/protokol DeFi."],
    ["Impermanent Loss", "Potensi kerugian saat menyediakan likuiditas akibat perubahan harga relatif antaraset."],
    ["Rug Pull", "Penipuan ketika pengembang proyek kabur membawa dana investor."],
    ["Airdrop", "Pembagian token gratis kepada pengguna, sering sebagai promosi atau hadiah loyalitas."],
    ["ICO / IDO / IEO", "Berbagai metode penggalangan dana & penjualan token perdana sebuah proyek (Initial Coin/DEX/Exchange Offering)."],
    ["Stablecoin", "Aset kripto yang nilainya dipatok stabil, biasanya terhadap mata uang seperti dolar AS."],
    ["Depeg", "Kondisi ketika stablecoin kehilangan patokan nilainya (mis. tidak lagi setara 1 dolar)."],
    ["Layer 1 / Layer 2", "Blockchain dasar yang berdiri sendiri vs jaringan tambahan di atasnya untuk skalabilitas."],
    ["DAO", "Decentralized Autonomous Organization \u2014 organisasi yang dikelola kolektif oleh pemegang token."],
    ["Oracle", "Layanan yang memasok data dunia nyata ke dalam smart contract."]
  ];

  function letterOf(term) {
    var c = term.charAt(0).toUpperCase();
    return /[A-Z]/.test(c) ? c : "#";
  }

  // group by letter
  var groups = {};
  TERMS.forEach(function (t) {
    var L = letterOf(t[0]);
    (groups[L] = groups[L] || []).push(t);
  });
  var letters = Object.keys(groups).sort(function (a, b) {
    if (a === "#") return 1; if (b === "#") return -1; return a < b ? -1 : 1;
  });
  letters.forEach(function (L) { groups[L].sort(function (a, b) { return a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1; }); });

  var ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  var navWrap = document.getElementById("alpha-nav");
  navWrap.innerHTML = ALPHA.map(function (L) {
    var has = !!groups[L];
    return has ? '<a href="#g-' + L + '">' + L + '</a>' : '<a class="disabled">' + L + '</a>';
  }).join("");

  var listWrap = document.getElementById("glos-list");
  function esc(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;"); }
  listWrap.innerHTML = letters.map(function (L) {
    return '<section class="glos-letter" id="g-' + L + '"><div class="gl">' + L + '</div><dl>' +
      groups[L].map(function (t) {
        return '<div class="glos-item" data-term="' + esc(t[0]).toLowerCase() + '" data-def="' + esc(t[1]).toLowerCase() + '">' +
          '<dt>' + esc(t[0]) + '</dt><dd>' + esc(t[1]) + '</dd></div>';
      }).join("") + '</dl></section>';
  }).join("");

  // search
  var input = document.getElementById("glos-q");
  var empty = document.getElementById("glos-empty");
  var items = Array.prototype.slice.call(listWrap.querySelectorAll(".glos-item"));
  var sections = Array.prototype.slice.call(listWrap.querySelectorAll(".glos-letter"));

  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();
    var any = false;
    items.forEach(function (it) {
      var hit = !q || it.getAttribute("data-term").indexOf(q) >= 0 || it.getAttribute("data-def").indexOf(q) >= 0;
      it.style.display = hit ? "" : "none";
      if (hit) any = true;
    });
    sections.forEach(function (s) {
      var vis = s.querySelectorAll('.glos-item:not([style*="display: none"])').length > 0;
      // recompute robustly:
      var shown = Array.prototype.slice.call(s.querySelectorAll(".glos-item")).some(function (i) { return i.style.display !== "none"; });
      s.style.display = shown ? "" : "none";
    });
    empty.style.display = any ? "none" : "block";
  });
})();
