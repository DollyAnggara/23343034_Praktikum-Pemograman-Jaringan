# 23343034_Praktikum-Pemograman-Jaringan

📚 **Repositori Praktikum Pemrograman Jaringan**

Repositori ini berisi kumpulan tugas (jobsheet) praktikum untuk mata kuliah Pemrograman Jaringan. Setiap jobsheet fokus pada topik berbeda (Node.js dasar, modul, HTTP/API, Express, JSON endpoints, MongoDB, Socket programming). Di bawah ini dijelaskan secara rinci setiap jobsheet beserta file program penting dan cara menjalankannya.

---

## 🔍 Daftar Jobsheet

### ✅ Jobsheet 1 - Pengantar NodeJS

**Pendahuluan menarik:** Pada jobsheet ini Anda akan merasakan bagaimana sebuah server web bekerja dari nol — tanpa framework. Dengan satu file kecil Anda dapat membuat server yang menerima permintaan dari browser atau alat seperti `curl`, lalu membalasnya. Ini adalah fondasi penting untuk memahami bagaimana web modern berkomunikasi, dan juga memperlihatkan kekuatan Node.js: model event-driven dan non-blocking yang memungkinkan banyak koneksi ditangani secara efisien pada satu thread.

**Tujuan (paragraf):** Tujuan jobsheet ini adalah agar mahasiswa memahami konsep dasar Node.js (event loop, single-threaded non-blocking I/O), cara kerja protokol HTTP pada level aplikatif, serta mampu menulis server sederhana yang menangani request dan response. Selain itu, mahasiswa belajar membaca properti `req` untuk mendeteksi path dan method, serta membentuk response yang benar (status, headers, body).

**Bagaimana cara kerjanya (paragraf rinci):** Program menggunakan modul bawaan `http`. Ketika `http.createServer` dipanggil, kita memberikan sebuah callback yang akan dieksekusi setiap kali ada koneksi masuk. Callback menerima dua objek: `req` (mengandung informasi request seperti URL, method, headers) dan `res` (dipakai untuk membangun dan mengirim response). Alur dasar:
- Baca `req.url` dan `req.method` untuk menentukan tindakan (routing sederhana).
- Siapkan headers dan status via `res.statusCode` dan `res.setHeader`.
- Kirim body response via `res.end()`.
Server kemudian dijalankan dengan `server.listen(port, hostname)` untuk mulai menerima koneksi.

**Penjelasan kode (annotated):** Contoh `hello.js` di folder jobsheet ini sangat ringkas namun informatif:

```js
const http = require('http')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  // Anda bisa cek req.url dan req.method di sini untuk routing
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
```

- Line pertama mengimpor modul `http` — tidak perlu instalasi tambahan.
- `req` & `res` adalah objek yang mewakili permintaan dan jawaban HTTP.
- `res.setHeader('Content-Type', 'text/plain')` menjelaskan tipe konten sehingga browser tahu cara menampilkan.
- `server.listen` memulai listener; callback pada `listen` dijalankan ketika server sukses start.

**Praktik yang disarankan (eksperimen):**
1. Uji server dengan browser pada `http://localhost:3000/` dan lihat hasilnya.
2. Gunakan `curl -i http://localhost:3000/` untuk melihat headers dan body.
3. Tambahkan routing sederhana: jika `req.url === '/about'`, kirim informasi berbeda.
4. Coba tangani method POST (baca body request) untuk memahami I/O asinkron.

**Bagian program penting & fungsinya:**
- `http.createServer((req, res) => {...})` — event handler untuk setiap request.
- `req.url` / `req.method` — untuk routing dan kontrol alur.
- `res.statusCode`, `res.setHeader()` — mengatur metadata response.
- `res.end()` — mengirimkan body dan menutup koneksi.
- `server.listen(port, hostname)` — membuat server siap menerima koneksi.

**Tips debugging & optimasi singkat:**
- Cetak `req.url`/`req.method` untuk melihat apa yang dikirim client.
- Jangan blok event loop: hindari operasi synchronous yang berat (mis. `while` loop atau `fs.readFileSync` pada pathway permintaan yang sering dipanggil).
- Gunakan `nodemon` saat mengembangkan agar server otomatis restart saat file berubah.

**Contoh penggunaan & uji cepat:**
- Jalankan: `node "Jobsheet 1 - Pengantar NodeJS/hello.js"`
- Tes dari terminal: `curl -i http://127.0.0.1:3000/`
  - Anda akan melihat header `Content-Type: text/plain` dan body `Hello World`.

**Latihan singkat untuk lanjut:**
- Tambahkan rute `/json` yang mengembalikan JSON: `res.setHeader('Content-Type', 'application/json')` dan `res.end(JSON.stringify({ msg: 'Halo' }))`.
- Buat log sederhana yang mencatat waktu dan path setiap request.

---

### ✅ Jobsheet 2 - Node.js Module System

**Tujuan (paragraf):** Jobsheet ini bertujuan mengajarkan cara memecah kode menjadi modul (ES Modules dan CommonJS), melakukan operasi file dasar, dan membuat antarmuka baris perintah (CLI) yang interaktif. Tujuannya agar mahasiswa mampu menstrukturkan aplikasi menjadi modul-modul yang terpisah dan dapat dipanggil ulang serta memahami pola penyimpanan sederhana pada file.

**Bagaimana cara kerjanya (paragraf):** `app.js` berperan sebagai entrypoint yang mengimpor modul utilitas (mis. `catatan.js`) dan paket pihak ketiga (`yargs`, `validator`, `chalk`). Operasi I/O dilakukan melalui modul `fs` (mis. `writeFileSync`, `appendFileSync`) untuk menyimpan atau membaca data. `yargs` digunakan untuk mendefinisikan command (`tambah`, `hapus`, `list`, `baca`) sehingga pengguna dapat berinteraksi lewat CLI. Proses validasi (mis. URL) menggunakan `validator`, sementara `chalk` memberi warna output agar mudah dibaca.

**Bagian program penting & fungsinya:**
- `app.js`: entrypoint, konfigurasi `yargs`, parsing argumen CLI, dan pemanggilan handler.
- `catatan.js`: modul yang mengelola operasi data (menambahkan, menghapus, membaca, menulis catatan ke file JSON/txt).
- `catatan.txt` / `catatan.json`: penyimpanan sederhana untuk hasil catatan (contoh implementasi persistence tanpa database).
- `yargs` commands (`tambah`, `hapus`, `list`, `baca`): memudahkan interaksi CLI dengan parameter seperti `--judul` dan `--isi`.

**Contoh penggunaan:** `node app.js tambah --judul="Belanja" --isi="Beli beras"`

---

### ✅ Jobsheet 3 - HTTP Request and API

**Tujuan (paragraf):** Jobsheet ini mengajarkan cara mengakses API eksternal menggunakan HTTP client, menangani respons JSON, dan menggabungkan beberapa layanan web (geocoding untuk lokasi + layanan cuaca) untuk membangun aplikasi sederhana yang mengambil data riil dari internet.

**Bagaimana cara kerjanya (paragraf):** Program menggunakan library HTTP client (`postman-request`) untuk melakukan permintaan GET ke endpoint eksternal. Data yang diterima biasanya dalam format JSON sehingga perlu diparsing (atau menggunakan opsi `json: true` untuk parsing otomatis). Pelajaran penting di sini adalah menulis kode yang tahan terhadap kesalahan jaringan (memeriksa `error`) dan respons yang tidak valid (memeriksa `response.body.error` atau `features.length === 0`). Latihan menggabungkan Mapbox (untuk mendapatkan koordinat dari nama lokasi) dan Weatherstack (untuk data cuaca) memperlihatkan cara chaining request: ambil koordinat dulu, lalu gunakan koordinat untuk memanggil API cuaca.

**Bagian program penting & fungsinya:**
- `cekCuaca.js`: berisi contoh kasus — panggilan langsung ke API cuaca, pemanggilan Mapbox untuk geocoding, dan kombinasi keduanya.
- `app.js`: contoh kecil menampilkan pengambilan data cuaca menggunakan URL statis.
- Penanganan error: blok if untuk `error` dan `response.body.error` penting untuk UX yang baik.

**Contoh penggunaan:** `node cekCuaca.js` atau panggil fungsi geocode+forecast untuk lokasi lain.

---

### ✅ Jobsheet 5 - Web Server and ExpressJs

**Tujuan (paragraf):** Jobsheet ini bertujuan mengajarkan pembangunan aplikasi web menggunakan framework Express dan template engine Handlebars (`hbs`). Fokusnya adalah pada routing, penyajian konten dinamis melalui templates, dan penyajian file statis (CSS, JS, gambar) agar frontend dapat diakses oleh browser.

**Bagaimana cara kerjanya (paragraf):** `src/app.js` menginisialisasi Express, mengatur folder publik (menggunakan `express.static`) untuk melayani aset, dan mengkonfigurasi engine template Handlebars serta lokasi partials/views. Ketika rute di-hit (mis. `/`, `/tentang`, `/bantuan`), Express merender view terkait dan menyuntikkan data (seperti `judul` atau `nama`) ke template sebelum dikirim sebagai HTML ke client. Error handling juga diperlihatkan dengan halaman 404 yang berbeda untuk kasus khusus.

**Bagian program penting & fungsinya:**
- `src/app.js`: konfigurasi server, views, partials, dan route handlers.
- `public/`: file statis (CSS, JS) yang melengkapi tampilan dan interaksi sisi klien.
- `templates/views/*.hbs`: file view yang dirender; menggunakan placeholder supaya konten dinamis dapat ditampilkan.
- `templates/partials/*`: header/footer yang dapat dipakai ulang di beberapa view.

---

### ✅ Jobsheet 6 - JSON HTTP Endpoints

**Tujuan (paragraf):** Jobsheet ini mengajarkan pembuatan endpoint HTTP yang mengembalikan data JSON (bukan HTML) dan pemisahan logika aplikasi ke modul util. Tujuannya agar mahasiswa memahami pembuatan API sederhana yang dapat diakses oleh client (web app, mobile app, atau CLI) untuk mengambil data terstruktur.

**Bagaimana cara kerjanya (paragraf):** Modul util seperti `geocode.js` dan `prediksiCuaca.js` mengenkapsulasi komunikasi dengan layanan eksternal (Mapbox dan Weatherstack). `src/app.js` menerima permintaan dari klien (mis. `GET /cuaca?alamat=Padang`), memanggil `geocode` untuk mendapatkan koordinat, lalu meneruskan koordinat tersebut ke `forecast` yang mengembalikan ringkasan cuaca. Respon dikirim sebagai JSON dengan informasi yang jelas (lokasi, ringkasan cuaca, error jika ada).

**Bagian program penting & fungsinya:**
- `src/utils/geocode.js`: konversi alamat ke koordinat (latitude, longitude) dan penanganan error.
- `src/utils/prediksiCuaca.js`: memanggil API cuaca dan merubah respons menjadi pesan yang mudah dibaca.
- `src/app.js`: menggabungkan kedua util dan membentuk endpoint JSON (`/cuaca`) yang dapat diakses oleh client.

**Contoh panggilan endpoint:** `http://localhost:4000/cuaca?alamat=Padang`

---

### ✅ Jobsheet 8 - MongoDB and Database Server

**Tujuan (paragraf):** Jobsheet ini memperkenalkan konsep penyimpanan data pada database NoSQL (MongoDB) dan operasi CRUD dasar: memasukkan data (create), membaca (read), memperbarui (update), dan menghapus (delete). Fokusnya adalah memahami koneksi ke server MongoDB, struktur dokumen, dan penggunaan `ObjectId` sebagai primary key.

**Bagaimana cara kerjanya (paragraf):** Skrip menggunakan `MongoClient` untuk menghubungkan ke server MongoDB lokal. Setelah koneksi terbentuk, kita memilih database dan koleksi, lalu menjalankan operasi seperti `insertOne`, `insertMany`, `find`, `updateOne`, atau `deleteOne`. Contoh di `insertDocument.js` juga memperlihatkan cara membuat `ObjectId` secara eksplisit dan menampilkan informasi terkait ID.

**Bagian program penting & fungsinya:**
- `insertDocument.js`: contoh inisialisasi koneksi, pembuatan `ObjectId`, dan operasi `insertOne`/`insertMany`.
- `readDocument.js`: contoh kueri / pencarian data dalam koleksi.
- `updateDocument.js` dan `deleteDocument.js`: contoh operasi mutasi data.

**Catatan:** Pastikan layanan MongoDB berjalan pada `mongodb://127.0.0.1:27017` sebelum mengeksekusi skrip.

---

### ✅ Jobsheet 9 - Socket Programming

**Tujuan (paragraf):** Jobsheet ini bertujuan memperkenalkan pemrograman real-time menggunakan WebSocket (melalui `socket.io`) untuk membangun aplikasi yang membutuhkan komunikasi dua arah instan, seperti chat room. Mahasiswa belajar menangani event koneksi, broadcasting ke room, serta manajemen pengguna di sisi server.

**Bagaimana cara kerjanya (paragraf):** Server menginisialisasi Socket.io dan menunggu koneksi klien. Saat klien bergabung, server menerima event `join` dengan data user/room lalu memasukkan socket ke room yang sesuai. Ketika klien mengirim pesan (`kirimPesan`) atau lokasi (`kirimLokasi`), server mem-broadcast pesan tersebut ke anggota room menggunakan event khusus, dan juga mengelola pengguna yang terhubung (tambah/hapus). Kode klien menerima event, merender pesan menggunakan template (Mustache), dan mengatur auto-scroll untuk UX.

**Bagian program penting & fungsinya:**
- `src/index.js`: logika server: menangani event `connection`, `join`, `kirimPesan`, `kirimLokasi`, `disconnect`, serta broadcasting dan room management.
- `public/js/chat.js`: logika klien untuk mengirim pesan/lokasi, menerima pesan dari server, dan merender UI menggunakan Mustache & moment.
- `src/utils/messages.js` dan `src/utils/users.js`: utilitas untuk format pesan dan manajemen daftar pengguna/room.

---

## ⚙️ Cara Umum Menjalankan Proyek
- Masuk ke folder jobsheet yang relevan, jalankan:
  - `npm install` (jika ada `package.json`)
  - `node <file>` (contoh: `node src/app.js` atau `node app.js`)
- Untuk proyek berbasis Express, buka `http://localhost:<port>` (port dijelaskan di `src/app.js`).

---

## 💡 Catatan Pengembangan & Tips
- Perhatikan variabel environment (API keys) yang hard-coded di beberapa file — sebaiknya pindahkan ke `.env` jika ingin produksi.
- Untuk mempelajari lebih dalam: coba ekstrak lebih banyak logic menjadi modul yang dapat diuji (unit test).

---

## 📄 Lisensi & Kontribusi
- Materi ini dibuat untuk keperluan praktikum perkuliahan. Untuk kontribusi, ajukan pull request atau hubungi pemilik repo.

---

Jika Anda ingin, saya dapat:
- Menambahkan instruksi instalasi npm per jobsheet ✅
- Menambahkan snippet penting lain atau file `example.env` untuk API keys ✅
