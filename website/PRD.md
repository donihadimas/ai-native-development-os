# PRD: AI-Native Development OS Website

## Summary

Membuat situs web publik (Landing Page & Dokumentasi) untuk proyek **AI-Native Development OS**, sebuah CLI toolkit dan sistem operasi kerja yang dirancang untuk pengembang *solo fullstack* yang bekerja berdampingan dengan *AI coding agents* (seperti Codex, Qwen, OpenCode, dll). Situs ini bertujuan untuk memperkenalkan proyek, mendemonstrasikan cara kerjanya, dan menyediakan panduan lengkap yang mudah diakses.

## Background

Saat ini, dokumentasi proyek hanya tersedia di dalam file `README.md` pada repositori GitHub. Mengingat kompleksitas fitur (workflow, CLI commands, templates, skills), pengguna baru membutuhkan portal informasi yang lebih terstruktur, dapat dicari (*searchable*), dan divisualisasikan dengan UI/UX premium yang meyakinkan mereka tentang kualitas proyek ini.

## Target Users

- Primary: Pengembang perangkat lunak (*Solo Fullstack Developers*) yang mulai mengintegrasikan AI agent ke dalam alur kerja harian mereka.
- Secondary: Pengelola tim kecil yang mencari standarisasi alur kerja (PRD, ADR, Task) dalam pembangunan perangkat lunak berbantuan AI.

## Goals

- Menyediakan Landing Page dengan nilai jual (*Value Proposition*) yang sangat jelas.
- Menyediakan Dokumentasi terstruktur yang menggantikan/melengkapi fungsi README.
- Mendapatkan peringkat SEO organik yang tinggi dengan arsitektur *Zero-JS* dari Astro.
- Mengadopsi estetika desain modern (Dark mode, glassmorphism, tipografi yang rapi) sesuai identitas alat developer (*DevTools*).

## Non-Goals

- Membuat web dashboard atau aplikasi web dinamis (SaaS).
- Menyediakan playground *AI coding agent* langsung di dalam browser.

## User Stories

- As a *developer*, I want *to see a clear installation command on the homepage* so that *I can quickly try the AIOS CLI*.
- As an *AI enthusiast*, I want *to browse the available skills and workflows* so that *I understand how this tool controls my AI coding agent*.
- As a *user*, I want *to search through the CLI commands and templates* so that *I can reference them while working in my terminal*.

## Functional Requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-001 | Landing Page Hero Section: Menampilkan Headline, Subheadline, dan tombol CTA "Get Started" & "npm install -g @donihadimas/aios" | Must |
| FR-002 | Value Proposition Section: Menampilkan keunggulan (Reusable workflow, Explicit context, Verifiable tasks) | Must |
| FR-003 | Quickstart / Installation Guide: Langkah-langkah `aios init` dan `aios next` dalam bentuk *code block* | Must |
| FR-004 | Documentation Sidebar: Navigasi hierarki dokumentasi (Setup, CLI Commands, Skills, Templates, Integrations) | Must |
| FR-005 | Global Search: Fitur pencarian terintegrasi untuk mencari seluruh konten dokumentasi | Must |
| FR-006 | Dark / Light Mode Toggle: Tersedia di navigasi atas | Must |

## Non-Functional Requirements

- Performance: Mendapat skor > 95 pada Google Lighthouse (Core Web Vitals) menggunakan Astro SSG.
- Usability: Desain responsif, dapat diakses dan dibaca dengan nyaman dari ponsel pintar hingga layar *ultrawide*.
- Maintainability: Seluruh konten dokumentasi harus ditulis menggunakan format Markdown/MDX agar mudah diperbarui bersamaan dengan pembaruan rilis CLI.
- Estetika: Menggunakan Tailwind CSS v4 dengan elemen *premium DevTools* (misal: efek *glow* halus, border tipis, warna latar belakang kontras tinggi di mode gelap).

## Acceptance Criteria

- [ ] Saat user membuka beranda (`/`), mereka langsung melihat nilai utama "AI-Native Development OS".
- [ ] Terdapat halaman dokumentasi `/getting-started` yang berisi langkah instalasi CLI.
- [ ] Terdapat daftar command CLI yang di-generate rapi sesuai README yang ada.
- [ ] Fungsionalitas pencarian konten bekerja penuh.
- [ ] Perubahan kode didokumentasikan di *monorepo* `website/` tanpa mengganggu kode utama CLI.

## Risks

- **Duplikasi Konten:** Informasi di `README.md` pada *root* repo mungkin jadi tidak sinkron dengan situs web jika tidak dijaga kedisiplinan perbaruannya.

## Open Questions

- Apakah kita akan menaruh URL publik GitHub Pages ini kembali ke dalam *Package.json* NPM dan *README* repo root setelah situsnya *live*?
