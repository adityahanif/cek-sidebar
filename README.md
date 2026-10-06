# Cek Surat SIDEBAR Jabar

Chrome extension super ringan (tanpa framework, tanpa build, tanpa dependensi) untuk cek surat SIDEBAR — Sistem Informasi Dokumen Elektronik Jawa Barat.

Masukkan **10 digit kode surat** → langsung dibuka ke `https://sidebar-v2.jabarprov.go.id/v/[KODE]`.

## Isi folder

```
manifest.json   → Manifest V3
popup.html      → UI popup
popup.css       → styling (tanpa framework)
popup.js        → logika (vanilla JS)
icons/          → ikon PNG (16/32/48/128)
```

Total < 20 KB. Tidak ada tracking, tidak ada request background.

## Cara pasang

Extension ini murni HTML/CSS/JS tanpa dependensi — tidak perlu `npm`, `pip`, atau build step. Cukup ambil source-nya lalu load sebagai unpacked extension.

### 1. Ambil source (pilih salah satu)

**A. Clone via git (terminal):**

```bash
git clone https://github.com/adityahanif/cek-sidebar.git
```

**B. Tanpa git — PowerShell (Windows):**

```powershell
Invoke-WebRequest -Uri "https://github.com/adityahanif/cek-sidebar/archive/refs/heads/main.zip" -OutFile "$env:TEMP\cek-sidebar.zip"
Expand-Archive -Path "$env:TEMP\cek-sidebar.zip" -DestinationPath "$env:USERPROFILE\Documents" -Force
```

Folder hasil extract ada di `Documents\cek-sidebar-main`.

**C. Tanpa git — bash (Linux/macOS/Git Bash):**

```bash
curl -L -o cek-sidebar.zip https://github.com/adityahanif/cek-sidebar/archive/refs/heads/main.zip
unzip cek-sidebar.zip
```

**D. Tanpa terminal:** buka repo di GitHub → tombol hijau **Code** → **Download ZIP** → extract.

### 2. Load ke Chrome (Developer mode)

1. Buka `chrome://extensions`
2. Aktifkan **Developer mode** (kanan atas)
3. Klik **Load unpacked** → pilih folder `cek-sidebar` (hasil clone/extract)
4. Klik ikon puzzle di toolbar → pin **Cek Surat SIDEBAR Jabar**

### 3. Update ke versi terbaru

```bash
cd cek-sidebar
git pull
```

Lalu klik **Reload** di `chrome://extensions`.

## Cara pakai

1. Klik ikon extension
2. Ketik/tempel kode 10 digit (atau tempel URL lengkap `.../v/XXXXXXXXXX`, kodenya diekstrak otomatis)
3. Klik **Cek Surat** atau tekan **Enter** → terbuka di tab baru (SIDEBAR v2)
4. 5 kode terakhir tersimpan sebagai riwayat klik-cepat

## Catatan

- Kode dinormalisasi: spasi/strip dibuang, huruf jadi kapital.
- Validasi: harus tepat 10 karakter alfanumerik (`A–Z`, `0–9`).
