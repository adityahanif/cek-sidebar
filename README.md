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

## Cara pasang (Developer mode)

1. Buka `chrome://extensions`
2. Aktifkan **Developer mode** (kanan atas)
3. Klik **Load unpacked** → pilih folder ini (`cek-sidebar`)
4. Klik ikon puzzle → pin **Cek Surat SIDEBAR Jabar**

## Cara pakai

1. Klik ikon extension
2. Ketik/tempel kode 10 digit (atau tempel URL lengkap `.../v/XXXXXXXXXX`, kodenya diekstrak otomatis)
3. Klik **Cek Surat** atau tekan **Enter** → terbuka di tab baru (SIDEBAR v2)
4. 5 kode terakhir tersimpan sebagai riwayat klik-cepat

## Catatan

- Kode dinormalisasi: spasi/strip dibuang, huruf jadi kapital.
- Validasi: harus tepat 10 karakter alfanumerik (`A–Z`, `0–9`).
