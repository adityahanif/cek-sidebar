const BASE_URL = "https://sidebar-v2.jabarprov.go.id/v/";

const kodeEl = document.getElementById("kode");
const errorEl = document.getElementById("error");
const previewEl = document.getElementById("preview");
const cekBtn = document.getElementById("cek");
const riwayatWrap = document.getElementById("riwayat-wrap");
const riwayatEl = document.getElementById("riwayat");
const hapusBtn = document.getElementById("hapus");

// Terima input mentah: kode polos ATAU tempelan URL lengkap.
// Contoh: "https://sidebar.jabarprov.go.id/v/A1B2C3D4E5" -> "A1B2C3D4E5"
function extractKode(raw) {
  if (!raw) return "";
  const t = raw.trim().replace(/\s+/g, "");
  const m = t.match(/\/v\/([A-Za-z0-9_-]{1,64})/i);
  const kandidat = m ? m[1] : t;
  return kandidat.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
}

function buildUrl(kode) {
  return BASE_URL + kode;
}

// Wrapper storage yang aman di semua versi Chrome:
// API promise di Chrome baru, callback di Chrome lama.
function storeGet(defaults) {
  try {
    const p = chrome && chrome.storage && chrome.storage.local.get(defaults);
    if (p && typeof p.then === "function") return p.catch(() => ({ ...defaults }));
  } catch { /* lanjut ke mode callback */ }
  return new Promise((resolve) => {
    try {
      chrome.storage.local.get(defaults, (s) => resolve({ ...defaults, ...(s || {}) }));
    } catch {
      resolve({ ...defaults });
    }
  });
}

function storeSet(obj) {
  try {
    const p = chrome && chrome.storage && chrome.storage.local.set(obj);
    if (p && typeof p.then === "function") return p.catch(() => {});
  } catch { /* abaikan */ }
  return Promise.resolve();
}

function renderPreview() {
  const kode = extractKode(kodeEl.value);
  if (!kode) {
    previewEl.hidden = true;
    return;
  }
  previewEl.hidden = false;
  previewEl.textContent = "↗ " + buildUrl(kode);
}

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = !msg;
}

async function loadState() {
  const s = await storeGet({ riwayat: [] });
  renderRiwayat(s.riwayat);
}

function renderRiwayat(list) {
  riwayatEl.innerHTML = "";
  riwayatWrap.hidden = !list || list.length === 0;
  (list || []).forEach((item) => {
    const kode = String(typeof item === "string" ? item : (item && item.kode) || "");
    if (!kode) return;
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    const c = document.createElement("code");
    c.textContent = kode;
    b.appendChild(c);
    b.addEventListener("click", () => buka(kode));
    li.appendChild(b);
    riwayatEl.appendChild(li);
  });
}

async function saveRiwayat(kode) {
  const s = await storeGet({ riwayat: [] });
  const norm = (s.riwayat || []).map((x) => (typeof x === "string" ? x : x && x.kode)).filter(Boolean);
  const list = [kode, ...norm.filter((x) => x !== kode)].slice(0, 5);
  await storeSet({ riwayat: list });
  renderRiwayat(list);
}

async function buka(kode) {
  await saveRiwayat(kode);
  const url = buildUrl(kode);
  try {
    await chrome.tabs.create({ url });
  } catch {
    window.open(url, "_blank", "noopener");
  }
  window.close();
}

async function onCek() {
  const kode = extractKode(kodeEl.value);
  if (kode.length !== 10) {
    showError(`Kode harus 10 karakter alfanumerik. Terbaca ${kode.length} karakter${kode ? ` ("${kode}")` : ""}.`);
    kodeEl.focus();
    kodeEl.select();
    return;
  }
  showError("");
  await buka(kode);
}

kodeEl.addEventListener("input", () => {
  showError("");
  renderPreview();
});
cekBtn.addEventListener("click", onCek);
kodeEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") onCek();
});
hapusBtn.addEventListener("click", async () => {
  await storeSet({ riwayat: [] });
  renderRiwayat([]);
});

loadState()
  .catch(() => renderRiwayat([]))
  .then(() => {
    renderPreview();
    try {
      kodeEl.focus();
    } catch { /* abaikan */ }
  });
