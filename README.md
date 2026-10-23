# User Directory — Neo-Brutalism Dashboard

A Single Page Application (SPA) built with **React.js + Vite + TailwindCSS** that fetches user data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users) and displays it in a bold, neo-brutalist UI.

## Features

- **User Grid** — Users displayed as cards with color-coded strips, avatars, names, emails, and company info.
- **Realtime Search** — Filter users by name or email instantly (client-side). Results count updates live.
- **User Detail Modal** — Click any user to see full details: contact info, address (street, city, zipcode, geo coordinates), and company (name, catchphrase, business scope).
- **Loading State** — Skeleton cards with pulse animation while data is being fetched.
- **Error Handling** — Friendly error message with a retry button if the API call fails.
- **Empty State** — Helpful "no results" message when search returns nothing.
- **Keyboard Support** — Close the modal with the Escape key.
- **Responsive** — 1 column on mobile, 2 on tablet, 3 on desktop.

## Tech Stack

| Tool | Why |
|------|-----|
| React 18 | UI library, with `useDeferredValue` for search performance |
| Vite | Fast dev server and build tool |
| TailwindCSS 3 | Utility-first styling, custom theme for neo-brutalism |
| Space Grotesk + Space Mono | Typography pairing (geometric sans + monospace labels) |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Folder Structure

```
FRONTEND_MAGANG/
├── design-demos/           # Three design direction mockups (HTML)
│   ├── dir-1.html          # Aurora — Dark Glassmorphism
│   ├── dir-2.html          # Precision — Swiss Monochrome
│   ├── dir-3.html          # Bold — Neo-Brutalism (selected)
│   └── direction-approved.md
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── UserCard.jsx
│   │   ├── UserModal.jsx
│   │   ├── LoadingState.jsx
│   │   ├── ErrorState.jsx
│   │   └── EmptyState.jsx
│   ├── hooks/              # Custom React hooks
│   │   └── useUsers.js
│   ├── App.jsx             # Root component — orchestrates state + layout
│   ├── main.jsx            # React entry point
│   └── index.css           # Tailwind directives + global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## Pertanyaan Pemahaman

### 1. State Management & Lifecycle

**Bagaimana cara Anda melakukan fetching data di React? Jika Anda menggunakan useEffect, jelaskan bagaimana cara Anda mencegah terjadinya memory leak atau pemanggilan API berulang (infinite loop).**

Fetching data dilakukan di custom hook `useUsers()` (`src/hooks/useUsers.js`) menggunakan `useEffect`. Hook ini mengembalikan tiga state: `users`, `loading`, dan `error`, plus function `refetch` untuk retry manual.

**Mencegah memory leak:**

Saya menggunakan `AbortController` di dalam `useEffect`. Controller ini membatalkan request yang sedang berjalan jika component unmount sebelum fetch selesai. Tanpa ini, jika user navigasi cepat dan component unmount, callback fetch tetap mencoba `setUsers()` pada component yang sudah tidak ada — yang memunculkan warning "state update on unmounted component" (dan di versi lama React, memory leak yang sesungguhnya).

```js
useEffect(() => {
  const controller = new AbortController()

  async function fetchUsers() {
    try {
      const res = await fetch(url, { signal: controller.signal })
      // ...
    } catch (err) {
      if (err.name === 'AbortError') return  // cleanup, bukan error asli
      setError(err.message)
    }
  }

  fetchUsers()
  return () => controller.abort()  // cleanup saat unmount
}, [])
```

**Mencegah infinite loop:**

`useEffect` diberi dependency array kosong `[]`, artinya effect hanya berjalan sekali — saat component pertama kali mount. Jika dependency array dihilangkan atau berisi state yang berubah setiap render (seperti `users`), effect akan re-run setiap kali state berubah, fetch lagi, set state lagi, dan begitu seterusnya — infinite loop. Dengan `[]`, fetch terjadi satu kali, data masuk ke state, dan selesai.

**Tambahan:** di blok `finally`, saya cek `if (!controller.signal.aborted)` sebelum `setLoading(false)` untuk mencegah state update pada component yang sudah di-abort.

---

### 2. Struktur Folder

**Mengapa Anda menstrukturisasi folder/file seperti yang ada di project Anda saat ini? Jelaskan alasannya.**

Struktur folder mengikuti prinsip **separation of concerns** — memisahkan berdasarkan tanggung jawab, bukan tipe file:

- **`components/`** — Semua komponen UI yang reusable. Setiap komponen punya satu tanggung jawab (misalnya `UserCard` hanya menampilkan satu user, `UserModal` hanya menampilkan detail). Komponen yang kecil dan fokus lebih mudah dibaca, dites, dan dipakai ulang. Jika grid butuh berubah ke tabel, cukup ganti komponen card — search dan modal tetap utuh.

- **`hooks/`** — Custom hook `useUsers` mengenkapsulasi semua logic fetching (panggilan API, loading state, error handling, AbortController cleanup). Component tidak perlu tahu detail fetch — cukup konsumsi `{ users, loading, error, refetch }`. Jika API URL berubah atau logic retry bertambah, hanya file ini yang diubah, tidak menyentrungi komponen UI.

- **`App.jsx`** — Root component yang meng-orkestrasi: mengambil data dari hook, mengatur state (search query, selected user), dan memutuskan apa yang dirender (loading / error / empty / grid). App tidak berisi logic fetch atau markup detail — hanya menggabungkan.

Alasan pendek: jika suatu hari UI berubah (misalnya tambah sorting, pagination, atau dark mode), perubahan terlokalisasi di satu tempat, tidak menyebar ke seluruh codebase.

---

### 3. Optimasi Kinerja (Performance)

**Anggaplah API tiba-tiba mengembalikan 10.000 data user sekaligus dan membuat aplikasi lag saat diketik di kolom pencarian. Pendekatan apa (fitur React apa) yang akan Anda gunakan untuk mengatasi lag tersebut?**

Ada dua lapis solusi yang sudah saya terapkan dan satu tambahan untuk skala ekstrem:

**Lapis 1 — `useDeferredValue` (sudah dipakai):**

React 18 menyediakan `useDeferredValue`. Input pencarian dirender pada **high priority** (langsung responsif saat user mengetik), sementara filtering dan re-render list dijadwalkan pada **low priority**. Hasilnya: input tetap instan, list update "mengikuti" dengan delay kecil yang tidak mengganggu. Ini mencegah lag saat mengetik karena React tidak memblokir input untuk filtering 10.000 baris.

```js
const deferredQuery = useDeferredValue(query)

const filteredUsers = useMemo(() => {
  // filtering pakai deferredQuery, bukan query langsung
}, [users, deferredQuery])
```

**Lapis 2 — `useMemo` (sudah dipakai):**

Hasil filter di-memoize dengan `useMemo`. Jika `deferredQuery` tidak berubah (misalnya user mengetik lalu menghapus kembali ke nilai sebelumnya), React menggunakan hasil cache tanpa re-filter. Jika `users` tidak berubah, juga tidak re-compute.

**Lapis 3 — Virtualisasi (untuk skala ekstrem):**

Jika 10.000 baris tetap perlu dirender (meskipun sudah terfilter), DOM akan berat. Solusinya adalah **windowing/virtualization** dengan library seperti `react-window` atau `@tanstack/react-virtual`. Prinsipnya: hanya render baris yang visible di viewport (misal 20 baris), bukan 10.000. Saat user scroll, baris baru di-mount dan baris lama di-unmount. Ini mengurangi DOM node dari 10.000 ke ~20.

Jika saya menambah virtualization, strukturnya cukup ganti container grid di `App.jsx` dengan komponen virtualized list — komponen `UserCard` tetap sama karena virtualizer hanya mengatur mounting.
