# AIOS Local CLI Testing Guide

Panduan lengkap untuk menguji, memverifikasi, dan mensimulasikan penggunaan CLI `@donihadimas/aios` secara lokal di komputer sebelum dipublikasikan ke NPM Registry.

---

## 1. Persiapan Build & Assets

Sebelum melakukan pengujian dalam bentuk apa pun, pastikan bundel aset lokal telah disinkronkan dan kode TypeScript terkompilasi tanpa error:

```powershell
# Masuk ke direktori CLI
cd cli

# Sinkronkan aset AIOS kit ke folder dist/assets
npm run sync-assets

# Kompilasi kode TypeScript
npm run build
```

---

## 2. Metode Pengujian Lokal

### Metode 1: Eksekusi Langsung via Node.js (Paling Cepat)

Metode ini sangat cocok untuk memverifikasi perintah secara cepat tanpa mengubah konfigurasi global komputer.

```powershell
# Jalankan di dalam folder cli/
node dist/src/index.js --help
node dist/src/index.js -v

# Uji coba perintah pada repositori saat ini
node dist/src/index.js validate .
node dist/src/index.js map .
node dist/src/index.js verify .
node dist/src/index.js export .
node dist/src/index.js update --clean .
```

---

### Metode 2: Link CLI ke Global System (`npm link`) (Rekomendasi Utama)

Metode ini menghubungkan executable `aios` lokal ke PATH sistem Anda, sehingga Anda bisa menggunakan perintah `aios` di direktori mana saja seperti paket ter-install resmi.

#### A. Mengaktifkan Link Global
```powershell
# Jalankan di dalam folder cli/
npm link
```

#### B. Pengujian di Mana Saja
Buka terminal baru atau pindah ke folder projek lain:
```powershell
# Cek versi yang terhubung (harus menampilkan versi lokal)
aios --version

# Uji alur interaktif
aios

# Uji coba perintah CLI
aios validate
aios verify
aios map
aios export
aios integration add caveman
```

#### C. Memperbarui Kode saat Ter-link
Jika Anda mengubah kode TypeScript di `cli/src/`, Anda **tidak perlu** melakukan `npm link` ulang. Cukup jalankan:
```powershell
# Di folder cli/
npm run build
```
Perintah `aios` global akan otomatis menggunakan kode hasil kompilasi terbaru.

#### D. Melepas Link Global (`npm unlink`)
Jika pengujian lokal selesai dan Anda ingin kembali menggunakan paket NPM publik:
```powershell
# Jalankan di dalam folder cli/
npm unlink -g @donihadimas/aios
```

---

### Metode 3: Pengujian Tarball Paket (`npm pack`)

Metode ini mensimulasikan proses publish NPM untuk memastikan seluruh aset (`dist/`, `templates/`, `project-skeleton/`, `assets/`) terbawa secara lengkap dalam arsip `.tgz`.

```powershell
# 1. Buat file tarball lokal di folder cli/
npm pack

# Perintah di atas akan menghasilkan file seperti: donihadimas-aios-0.7.3.tgz

# 2. Uji coba eksekusi tarball di folder projek lain menggunakan npx
npx C:\path\to\donihadimas-aios-0.7.3.tgz validate
npx C:\path\to\donihadimas-aios-0.7.3.tgz adopt
```

---

## 3. Automated Test Suite

Pastikan seluruh unit & integration test lulus 100%:

```powershell
# Jalankan di folder cli/
npm test
```

---

## 4. Checklist Verifikasi Sebelum Release/Publish

Sebelum melakukan publish ke NPM registry (`npm publish`), pastikan item berikut sudah terpenuhi:

- [ ] `npm test` lulus 100% tanpa kegagalan (110+ test suite).
- [ ] Versi pada `cli/package.json` sudah dinaikkan (`version`).
- [ ] Asset terbaru disinkronkan via `npm run sync-assets`.
- [ ] `CHANGELOG.md` sudah diperbarui dengan entri versi baru.
- [ ] Dokumen release notes dibuat di `docs/releases/<version>-release.md`.
- [ ] Test `npm pack --dry-run` mengonfirmasi semua file aset masuk dalam paket tarball.
