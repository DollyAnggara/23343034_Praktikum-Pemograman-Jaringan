# 23343034_Praktikum-Pemograman-Jaringan

📚 **Repositori Praktikum Pemrograman Jaringan**

Repositori ini berisi kumpulan tugas (jobsheet) praktikum untuk mata kuliah Pemrograman Jaringan. Setiap jobsheet fokus pada topik berbeda (Node.js dasar, modul, HTTP/API, Express, JSON endpoints, MongoDB, Socket programming). Di bawah ini dijelaskan secara rinci setiap jobsheet beserta file program penting dan cara menjalankannya.

---

## 🔍 Daftar Jobsheet

### ✅ Jobsheet 1 - Pengantar NodeJS

**Pendahuluan:** Pada jobsheet ini Anda akan merasakan bagaimana sebuah server web bekerja dari nol — tanpa framework. Dengan satu file kecil Anda dapat membuat server yang menerima permintaan dari browser atau alat seperti `curl`, lalu membalasnya. Ini adalah fondasi penting untuk memahami bagaimana web modern berkomunikasi, dan juga memperlihatkan kekuatan Node.js: model event-driven dan non-blocking yang memungkinkan banyak koneksi ditangani secara efisien pada satu thread.

**Tujuan:** Tujuan jobsheet ini adalah agar mahasiswa memahami konsep dasar Node.js (event loop, single-threaded non-blocking I/O), cara kerja protokol HTTP pada level aplikatif, serta mampu menulis server sederhana yang menangani request dan response. Selain itu, mahasiswa belajar membaca properti `req` untuk mendeteksi path dan method, serta membentuk response yang benar (status, headers, body).

**Bagaimana cara kerjanya:** Program menggunakan modul bawaan `http`. Ketika `http.createServer` dipanggil, kita memberikan sebuah callback yang akan dieksekusi setiap kali ada koneksi masuk. Callback menerima dua objek: `req` (mengandung informasi request seperti URL, method, headers) dan `res` (dipakai untuk membangun dan mengirim response). Alur dasar:
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

---

### ✅ Jobsheet 2 - Node.js Module System

**Pendahuluan:** Pada jobsheet ini Anda mempelajari praktik terbaik penataan kode: membagi aplikasi menjadi modul-modul kecil dengan tanggung jawab jelas. Pendekatan modular membuat kode lebih mudah diuji, dikembangkan, dan direuse—fundamental saat aplikasi berkembang dari skrip sederhana menjadi proyek yang lebih besar.

**Tujuan:** Mahasiswa diharapkan menguasai pembuatan modul (ES Modules / CommonJS), teknik I/O file dasar untuk persistence sederhana, dan membangun antarmuka CLI yang ramah pengguna menggunakan `yargs`. Selain itu, mahasiswa belajar menggunakan utilitas pihak ketiga (`validator`, `chalk`) untuk meningkatkan kualitas input dan output.

**Bagaimana cara kerjanya:** `app.js` berfungsi sebagai entrypoint yang mengonfigurasi command-line interface (`yargs`) dan mendispatch perintah ke fungsi yang ada di `catatan.js`. `catatan.js` bertanggung jawab membaca data dari file (mis. `catatan.json`), memanipulasi struktur data (tambah, hapus, baca), lalu menulis kembali ke disk. `yargs` menyediakan parsing argumen, validation tingkat dasar, dan help otomatis sehingga CLI menjadi mudah digunakan.

**Penjelasan kode (annotated):**
- Import & setup:
  ```js
  import fs from 'fs'
  import yargs from 'yargs/yargs'
  import { hideBin } from 'yargs/helpers'
  import { tambahCatatan, hapusCatatan, listCatatan, bacaCatatan } from './catatan.js'
  ```
- Contoh definisi command `tambah`:
  ```js
  yargs(hideBin(process.argv))
    .command({
      command: 'tambah',
      describe: 'tambah sebuah catatan baru',
      builder: { judul: { demandOption: true, type: 'string' }, isi: { demandOption: true, type: 'string' } },
      handler(argv) { tambahCatatan(argv.judul, argv.isi) }
    })
    .parse()
  ```
- Contoh logika di `catatan.js`:
  - `tambahCatatan(judul, isi)` → baca file, cek duplikasi judul, push object baru, tulis lagi.
  - `hapusCatatan(judul)` → baca file, filter berdasarkan judul, tulis ulang jika berubah.
  - `listCatatan()` → tampilkan judul yang ada.
  - `bacaCatatan(judul)` → cari entri dan tampilkan isi jika ditemukan.

**Bagian program penting & fungsinya:**
- `app.js`: konfigurasi CLI (`yargs`) dan pemetakan perintah ke fungsi.
- `catatan.js`: semua operasi domain untuk manajemen catatan (CRUD ringan) dan handling error sederhana.
- `catatan.json` / `catatan.txt`: penyimpanan lokal yang memudahkan demonstrasi persistence tanpa DB.
- `validator` dan `chalk`: meningkatkan UX (validasi input dan pewarnaan output).

**Tips debugging & optimasi singkat:**
- Cetak struktur data sebelum dan sesudah operasi untuk memastikan perubahan file sesuai harapan.
- Gunakan try/catch saat melakukan I/O dan pastikan file di-create jika belum ada.
- Hindari operasi synchronous di loop yang sering dipanggil; gunakan `fs.promises` untuk versi asinkron ketika skalabilitas diperlukan.

**Contoh penggunaan & uji cepat:**
- Tambah catatan: `node "Jobsheet 2 - Node.Js Module System/buku-catatan/app.js" tambah --judul="Belanja" --isi="Beli beras"`
- List semua: `node "Jobsheet 2 - Node.Js Module System/buku-catatan/app.js" list`
- Baca: `node "Jobsheet 2 - Node.Js Module System/buku-catatan/app.js" baca --judul="Belanja"`

---
---

### ✅ Jobsheet 3 - HTTP Request and API

**Pendahuluan:** Jobsheet ini mengajarkan teknik praktis mengambil data dari layanan web nyata: bagaimana memanggil API, memvalidasi respons, dan menyajikan data yang relevan kepada pengguna. Anda akan melihat bagaimana dua layanan dapat digabungkan (Mapbox + Weatherstack) untuk memberikan informasi yang lebih berguna daripada memanggil satu API saja.

**Tujuan:** Mahasiswa diharapkan memahami cara membuat permintaan HTTP/HTTPS, mem-parsing JSON, menangani error jaringan dan API, serta membuat alur chaining API (panggil satu layanan untuk data dasar lalu gunakan hasilnya sebagai input layanan lain).

**Bagaimana cara kerjanya:** Alur umum:
1. Siapkan URL endpoint dengan parameter yang diperlukan (mis. query lokasi atau koordinat).
2. Panggil API menggunakan HTTP client (`postman-request` pada contoh ini) dengan opsi `json: true` agar respons langsung diparsing.
3. Periksa error koneksi (network) dan error pada body respons (API-level error).
4. Ekstrak data yang diperlukan (mis. temperature, precip, weather_descriptions) dan format untuk ditampilkan atau dikirim kembali ke client.
5. Untuk chaining: panggil Mapbox untuk konversi nama lokasi → mendapatkan `latitude`/`longitude` → gunakan koordinat tersebut untuk memanggil Weatherstack.

**Contoh kode (annotated):**
```js
const request = require('postman-request')

const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(tempat)}.json?access_token=<KEY>&limit=1`
request({ url: mapboxURL, json: true }, (error, response) => {
  if (error) return console.log('Tidak dapat tersambung ke layanan Mapbox')
  if (response.body.features.length === 0) return console.log('Lokasi tidak ditemukan')
  const [lon, lat] = response.body.features[0].center

  const weatherURL = `http://api.weatherstack.com/current?access_key=<KEY>&query=${lat},${lon}&units=m`
  request({ url: weatherURL, json: true }, (error, response) => {
    if (error) return console.log('Tidak dapat terhubung ke layanan cuaca')
    if (response.body.error) return console.log('Error dari Weather API:', response.body.error)
    console.log(`Suhu: ${response.body.current.temperature}°C, ${response.body.current.weather_descriptions[0]}`)
  })
})
```

**Bagian program penting & fungsinya:**
- `aplikasiCuaca/cekCuaca.js`: contoh lengkap chaining Mapbox → Weatherstack, penanganan error, dan parsing JSON.
- `aplikasiCuaca/app.js`: contoh panggilan sederhana untuk percobaan langsung.

**Tips & best-practices:**
- Jangan hard-code API keys: simpan di `.env` dan baca lewat `process.env`.
- Selalu gunakan `json: true` (atau set Content-type) untuk menghindari manual JSON.parse dan potensi error.
- Tangani timeout dan error jaringan; tampilkan pesan yang informatif untuk pengguna.
- Pertimbangkan caching respons (mis. Redis atau cache in-memory) untuk mengurangi jumlah panggilan ke layanan eksternal dan menghindari rate-limiting.
- Untuk kode lebih bersih, gunakan Promise (`util.promisify`) atau ganti ke `axios` / `fetch` agar chaining lebih mudah di-handle dengan `async/await`.

**Contoh penggunaan & uji cepat:**
- Jalankan: `node "Jobsheet 3 - HTTP Request and API/aplikasiCuaca/cekCuaca.js"`
- (Opsional) Tambahkan CLI/argumen untuk mengganti lokasi secara dinamis.

---

### ✅ Jobsheet 4 - JavaScript Essentials

**Pendahuluan:** Jobsheet ini membahas dasar-dasar JavaScript yang esensial untuk pengembangan aplikasi web dan Node.js: tipe data, variabel (`var`/`let`/`const`), scope & hoisting, fungsi (termasuk closure), array & objek, serta fitur ES6+ seperti arrow functions, template literals, destructuring, spread/rest, classes, dan modules. Bagian penting lain adalah asinkronitas (callbacks, Promises, async/await) yang sering dipakai untuk I/O dan API.

**Tujuan:** Mahasiswa memahami pola pemrograman JavaScript modern, mampu menulis fungsi yang bersih, memahami closure & scope, dan menangani alur asinkron dengan benar.

**Bagaimana cara kerjanya (ringkas):**
- Variabel & scope: gunakan `let`/`const` untuk menghindari perilaku hoisting yang tidak diinginkan.
- Fungsi & closure: fungsi dapat 'menangkap' variabel dari lingkungan luar; pahami implikasinya.
- Async: gunakan `async/await` untuk alur Promise yang lebih mudah dibaca.

**Contoh singkat:**
```js
// Arrow + async/await + destructuring
const fetchData = async (url) => {
  const res = await fetch(url)
  const { data } = await res.json()
  return data
}
```

**Bagian penting & fungsinya:**
- Latihan berisi implementasi fungsi murni, manipulasi array (map/filter/reduce), serta konversi callback → Promise → async/await.

**Tips & best-practices:**
- Gunakan `const` bila tidak perlu diubah; `let` bila perlu diubah; hindari `var`.
- Favor `async/await` atas callback nesting.
- Gunakan ESLint dan Prettier untuk konsistensi kode.

**Contoh penggunaan & uji cepat:**
- Jalankan file latihan dengan `node` dan periksa output console.
- Buat test sederhana (mis. dengan `assert`) untuk fungsi murni.

---

### ✅ Jobsheet 5 - Web Server and ExpressJs

**Pendahuluan:** Jobsheet ini membawa Anda dari server Node.js dasar ke penggunaan framework populer — Express — yang menyederhanakan pembuatan aplikasi web. Anda akan melihat bagaimana routes, template engine, dan file statis bekerja sama untuk menyajikan halaman web dinamis yang ramah pengguna.

**Tujuan:** Mahasiswa akan memahami konsep routing, view rendering dengan Handlebars (`hbs`), penggunaan partials untuk komponen yang dapat dipakai ulang (header/footer), dan bagaimana menyajikan aset statis (file CSS, JavaScript, gambar) sehingga tampilan aplikasi menjadi lengkap dan responsif.

**Bagaimana cara kerjanya:** `src/app.js` menginisialisasi Express, mengatur path untuk folder `public` yang berisi file statis, dan mengkonfigurasi view engine Handlebars serta lokasi `views` dan `partials`. Ketika route terpanggil (mis. `/`, `/bantuan`, `/tentang`), Express merender template terkait, menyuntikkan data (seperti `judul` dan `nama`), dan mengirim HTML ke browser. Untuk rute yang tidak ditemukan, server merender halaman 404 khusus.

**Penjelasan kode (annotated):**
```js
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', { judul: 'Aplikasi Cek Cuaca', nama: 'Dolly Anggara' })
})

app.get('/bantuan', (req, res) => {
  res.render('bantuan', { judul: 'Halaman Bantuan', teksBantuan: 'Ini halaman bantuan (FAQ)' })
})

// 404 handlers
app.get(/^\/bantuan\/.*/, (req, res) => {
  res.render('404', { judul: '404', pesanKesalahan: 'Artikel yang dicari tidak ditemukan.' })
})
app.get(/.*/, (req, res) => {
  res.render('404', { judul: '404', pesanKesalahan: 'Halaman tidak ditemukan.' })
})
```

**Bagian program penting & fungsinya:**
- `src/app.js`: konfigurasi Express, view engine, static assets, dan route handlers.
- `public/`: berisi CSS (`public/css`), client JS (`public/js`), dan aset lain (gambar, file HTML statis untuk latihan).
- `templates/views/*.hbs`: view templates yang dirender oleh Handlebars.
- `templates/partials/*`: header, footer, dan elemen reusable.
- `public/js/app.js`: contoh interaksi sisi klien (mengambil data dari server atau menjalankan script sederhana).

**Tips & best-practices:**
- Pisahkan route ke file terpisah ketika jumlah route tumbuh (gunakan `express.Router`).
- Jangan meletakkan data sensitif di view — gunakan environment variables untuk konfigurasi.
- Gunakan middleware seperti `helmet` untuk meningkatkan keamanan HTTP headers saat aplikasi berkembang.
- Manfaatkan partials untuk menghindari duplikasi markup di beberapa view.

**Contoh penggunaan & uji cepat:**
- Instal (jika perlu): `npm install`
- Jalankan server: `node "Jobsheet 5 - Web Server and ExpressJs/web-server/src/app.js"`
- Buka browser: `http://localhost:4000/` (sesuaikan port jika berbeda)

---

### ✅ Jobsheet 6 - JSON HTTP Endpoints

**Pendahuluan:** Jobsheet ini mengajarkan pembuatan API sederhana yang mengembalikan data JSON — pola yang sering dipakai untuk backend modern. Dibahas juga pemisahan tanggung jawab (routing vs business logic), cara memanggil layanan eksternal secara aman, dan pembuatan respons yang konsisten sehingga mudah digunakan oleh klien lain (web app, mobile app, CLI).

**Tujuan:** Mahasiswa diharapkan bisa membuat endpoint HTTP yang menerima parameter, memanggil modul util untuk mengambil data eksternal (Mapbox, Weatherstack), dan mengembalikan respons JSON yang terstruktur serta menangani kondisi error dengan baik.

**Bagaimana cara kerjanya:** Alur dasar endpoint `/cuaca`:
1. Klien mengirim `GET /cuaca?alamat=<nama>`.
2. `src/app.js` memeriksa parameter `alamat`; jika kosong kembalikan error JSON.
3. Panggil `geocode(address, callback)` untuk mengonversi nama lokasi menjadi `latitude`, `longitude`, dan `location`.
4. Dengan koordinat yang berhasil diperoleh, panggil `forecast(latitude, longitude, callback)` untuk mengambil data cuaca.
5. Gabungkan hasil menjadi respons JSON: `{ lokasi, prediksi, error }` dan kirim ke klien.

**Contoh kode util (annotated):**
- `src/utils/geocode.js` (callback style):
```js
const request = require('postman-request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=<MAPBOX_KEY>&limit=1'

  request({ url, json: true }, (error, response) => {
    if (error) return callback('Tidak dapat terkoneksi ke layanan Mapbox', undefined)
    if (!response.body.features || response.body.features.length === 0) return callback('Lokasi tidak ditemukan', undefined)

    const feature = response.body.features[0]
    callback(undefined, { latitude: feature.center[1], longitude: feature.center[0], location: feature.place_name })
  })
}

module.exports = geocode
```

- `src/utils/prediksiCuaca.js` (callback style):
```js
const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=<WEATHER_KEY>&query=${latitude},${longitude}&units=m`
  request({ url, json: true }, (error, response) => {
    if (error) return callback('Tidak dapat terkoneksi ke layanan cuaca', undefined)
    if (response.body && response.body.error) return callback('Error dari layanan cuaca', undefined)

    const current = response.body.current
    callback(undefined, { temperature: current.temperature, precip: current.precip, description: current.weather_descriptions[0] })
  })
}

module.exports = forecast
```

**Bagian program penting & fungsinya:**
- `src/app.js`: menangani route `/cuaca`, validasi parameter, memanggil `geocode` dan `forecast`, dan membentuk respons JSON.
- `src/utils/geocode.js`: memisahkan detail HTTP request ke Mapbox dan normalisasi hasil.
- `src/utils/prediksiCuaca.js`: memanggil Weatherstack dan menyusun data cuaca menjadi objek terstruktur.

**Tips & best-practices:**
- Simpan API keys di environment variables (`.env`) dan jangan commit ke repo.
- Konsistenkan format JSON response: sertakan `error` jika ada dan `data` saat sukses (contoh: `{ error: '...', data: { lokasi, prediksi } }`).
- Tangani kasus edge: alamat tidak ditemukan, rate limit, atau respons tidak terduga.
- Pertimbangkan menggunakan caching sederhana (in-memory atau Redis) untuk mengurangi beban pada API eksternal.
- Untuk code modern, pertimbangkan mengubah callback ke `async/await` (axios atau node-fetch) agar alur lebih jelas.

**Contoh penggunaan & uji cepat:**
- Jalankan server: `node "Jobsheet 6 -  JSON HTTP Endpoints/web-server/src/app.js"`
- Panggil endpoint: `curl "http://localhost:4000/cuaca?alamat=Padang"`
- Respons contoh (sukses):
  ```json
  {"data":{"lokasi":"Padang, Indonesia","prediksi":{"temperature":28,"precip":0,"description":"Sunny"}},"error":null}
  ```

---

### ✅ Jobsheet 7 - Version Control, Git and App Deployment

**Pendahuluan:** Jobsheet ini mengajarkan kontrol versi dengan Git (init, add, commit, branch, merge), penggunaan remote (GitHub/GitLab), serta proses deploy aplikasi ke platform seperti Vercel untuk continuous deployment.

**Tujuan:** Mahasiswa memahami workflow Git dasar, membuat branch untuk fitur/bugfix, melakukan PR/merge, dan melakukan deployment otomatis ke Vercel dari repository Git.

**Bagaimana cara kerjanya (ringkas):**
- Git: commit sering dengan pesan jelas, gunakan branch untuk pengembangan, lakukan review sebelum merge.
- Vercel: hubungkan repo GitHub/GitLab/Bitbucket, atur build command dan output directory; setiap push memicu build & deploy otomatis.

**Catatan Vercel (Anda dideploy menggunakan Vercel):**
- Pastikan build command (`npm run build` atau `npm install && npm run build`) dan output folder (mis. `public` atau `build`) dikonfigurasi di dashboard Vercel.
- Set environment variables (API keys, dsb.) melalui Vercel Dashboard → Settings → Environment Variables.
- Vercel membuat Preview Deploy untuk setiap PR dan Production Deploy saat push ke branch utama.
- Pantau log build & deployment di Dashboard Vercel untuk debug; ganti `<VERCEL_URL>` dengan URL hasil deploy Anda bila ingin menautkannya di README.

**Contoh cepat (Git → Vercel):**
```bash
git add .
git commit -m "Menambahkan fitur X"
git push origin main
```
- Vercel otomatis membuild & deploy; cek hasil di dashboard Vercel atau gunakan `vercel` CLI untuk kontrol lebih lanjut.

---

### ✅ Jobsheet 8 - MongoDB and Database Server

**Pendahuluan:** Di dunia aplikasi nyata, penyimpanan file lokal memiliki batasan — transaksi, query kompleks, dan skalabilitas menjadi kendala. Jobsheet ini memperkenalkan MongoDB, sebuah database NoSQL berbasis dokumen (JSON-like) yang cocok untuk pengembangan cepat dan perubahan skema yang sering. Anda akan mempelajari pola dasar berinteraksi dengan MongoDB menggunakan driver `mongodb` native di Node.js.

**Tujuan:** Mahasiswa diharapkan memahami model dokumen, cara membuka koneksi aman ke server MongoDB, penggunaan `ObjectId` sebagai identifier unik, serta menjalankan operasi CRUD (Create, Read, Update, Delete) secara aman dan efisien.

**Bagaimana cara kerjanya:** Alur umum:
1. Buat instance `MongoClient` dengan URI koneksi (mis. `mongodb://127.0.0.1:27017` atau connection string Atlas).
2. `await client.connect()` untuk membuka koneksi asinkron.
3. Pilih database (`client.db('task-manager')`) dan koleksi (`db.collection('tugas')`).
4. Jalankan operasi seperti `insertOne`, `insertMany`, `find`, `updateOne`, `deleteOne`.
5. Tutup koneksi dengan `client.close()` di blok `finally` untuk mencegah kebocoran koneksi.

**Contoh kode (annotated) — potongan dari `insertDocument.js` :**
```js
const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const namaDatabase = 'task-manager'

async function main() {
  try {
    await client.connect()
    const db = client.db(namaDatabase)
    const clPengguna = db.collection('pengguna')

    // insertOne dengan _id yang dibuat manual
    const id = new ObjectId()
    const insertPengguna = await clPengguna.insertOne({ _id: id, nama: 'Dolly', usia: 22 })
    console.log('Memasukkan data Pengguna =>', insertPengguna)

    // insertMany contoh pada koleksi tugas
    const insertTugas = await db.collection('tugas').insertMany([
      { Deskripsi: 'Membersihkan rumah', StatusPenyelesaian: true },
      { Deskripsi: 'Mengerjakan tugas kuliah', StatusPenyelesaian: false }
    ])
    console.log('Memasukkan data Tugas =>', insertTugas)

  } catch (err) {
    console.error(err)
  } finally {
    client.close()
  }
}

main()
```
- `ObjectId()` menghasilkan ID unik yang juga menyimpan timestamp (berguna untuk audit).
- Hasil `insertOne` / `insertMany` berisi metadata (insertedId, insertedCount, dsb).

**Bagian program penting & fungsinya:**
- `insertDocument.js`: contoh inisialisasi koneksi, pembuatan `_id`, dan operasi `insertOne`/`insertMany`.
- `readDocument.js`: contoh query dan penggunaan `find()` / `findOne()` untuk membaca dokumen.
- `updateDocument.js`: memperlihatkan penggunaan operator update (`$set`, `$inc`) dan filter berbasis ObjectId.
- `deleteDocument.js`: contoh `deleteOne` / `deleteMany` untuk menghapus data.

**Tips & best-practices:**
- Jangan commit credential; gunakan environment variables untuk URI (`process.env.MONGODB_URI`).
- Tutup koneksi (`client.close()`) di `finally` agar koneksi tidak bocor saat error.
- Gunakan indexing pada field yang sering dipakai di filter untuk meningkatkan performa.
- Gunakan `ObjectId.isValid(id)` sebelum mengubah/menquery berdasarkan ID yang berasal dari input pengguna.
- Pertimbangkan transaksi (`session`) untuk operasi multi-dokumen yang harus bersifat atomik.

**Contoh penggunaan & uji cepat:**
- Pastikan MongoDB berjalan (lokal atau Atlas).
- Jalankan: `node "Jobsheet 8 - MongoDB and Database Server/task-manager/insertDocument.js"`
- Output contoh (ringkasan):
  ```text
  <ObjectId hex string>
  Berhasil terhubung ke MongoDB database server
  Memasukkan data Pengguna => { acknowledged: true, insertedId: ObjectId(...) }
  Memasukkan data Tugas => { acknowledged: true, insertedCount: 3, insertedIds: { '0': ObjectId(...), ... } }
  ```

**Catatan penting:** Jika Anda menggunakan MongoDB Atlas, pastikan IP Anda di-whitelist (atau gunakan akses yang sesuai) dan URI disimpan di environment variable.

---

### ✅ Jobsheet 9 - Socket Programming

**Pendahuluan:** Jobsheet ini memperkenalkan komunikasi real-time menggunakan WebSocket melalui `socket.io`. Anda akan belajar membangun aplikasi chat sederhana yang mampu mengirim dan menerima pesan instan, membagikan lokasi, dan menampilkan daftar pengguna di sebuah room — semua tanpa refresh halaman.

**Tujuan:** Mahasiswa diharapkan memahami dasar-dasar `socket.io`: lifecycle koneksi, pengelompokan ke room, broadcasting pesan, penanganan event custom, serta manajemen state pengguna di sisi server (tambah/hapus dan validasi).

**Bagaimana cara kerjanya:** Alur utama:
1. Server membuat HTTP server dan mengikat Socket.io ke atasnya.
2. Saat klien tersambung, server mendengarkan event `join` dan menempatkan socket ke sebuah `room` menggunakan `socket.join(room)`.
3. Klien mengirim `kirimPesan` atau `kirimLokasi`; server memvalidasi (mis. filter kata kasar dengan `bad-words`), lalu mem-broadcast ke anggota room dengan `io.to(room).emit(...)`.
4. Saat socket disconnect, server menghapus pengguna dan menginformasikan room agar UI bisa diperbarui.

**Potongan kode server (annotated):**
```js
io.on('connection', (socket) => {
  // join: validasi pengguna, masukkan ke room
  socket.on('join', (options, callback) => {
    const { error, user } = tambahPengguna({ id: socket.id, ...options })
    if (error) return callback(error)
    socket.join(user.room)

    // kirim pesan sambutan hanya ke user yang bergabung
    socket.emit('pesan', generateMessage('Admin', 'Selamat datang!'))

    // broadcast ke room lain bahwa ada user baru
    socket.broadcast.to(user.room).emit('pesan', generateMessage('Admin', `${user.username} telah bergabung`))

    // kirim data room (nama room + daftar users) ke semua client di room
    io.to(user.room).emit('roomData', { room: user.room, users: ambilPenggunaDariRoom(user.room) })

    callback()
  })

  // terima pesan dari client, filter, lalu broadcast
  socket.on('kirimPesan', (pesan, callback) => {
    const user = ambilPengguna(socket.id)
    const filter = new Filter()
    if (filter.isProfane(pesan)) return callback('Pesan tidak boleh mengandung kata kasar')
    io.to(user.room).emit('pesan', generateMessage(user.username, pesan))
    callback()
  })

  // terima lokasi dan broadcast sebagai link
  socket.on('kirimLokasi', (coords, callback) => {
    const user = ambilPengguna(socket.id)
    io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`))
    callback()
  })

  // saat disconnect, hapus user dan update room
  socket.on('disconnect', () => {
    const user = hapusPengguna(socket.id)
    if (user) {
      io.to(user.room).emit('pesan', generateMessage('Admin', `${user.username} telah keluar`))
      io.to(user.room).emit('roomData', { room: user.room, users: ambilPenggunaDariRoom(user.room) })
    }
  })
})
```

**Potongan kode klien (annotated, `public/js/chat.js`):**
```js
// kirim pesan
socket.emit('kirimPesan', pesan, (error) => { /* enable button, clear input */ })

// kirim lokasi
navigator.geolocation.getCurrentPosition((pos) => {
  socket.emit('kirimLokasi', { latitude: pos.coords.latitude, longitude: pos.coords.longitude }, () => { /* enable button */ })
})

// menerima pesan dan render dengan Mustache
socket.on('pesan', (message) => { /* render messageTemplate dengan message.username, message.text, message.createdAt */ })
```

**Bagian program penting & fungsinya:**
- `src/index.js`: mengatur server, event handling socket, dan integrasi util `users`/`messages`.
- `src/utils/messages.js`: membuat format pesan (`generateMessage`, `generateLocationMessage`) yang menyertakan timestamp.
- `src/utils/users.js`: menyimpan/manipulasi daftar pengguna (tambah, hapus, ambil, ambilPenggunaDariRoom).
- `public/js/chat.js`: sisi klien—mengirim event, menerima event, dan merender UI (Mustache + moment untuk waktu).

**Tips & best-practices:**
- Jalankan beberapa tab/browser untuk menguji chat antar-client.
- Validasi input di sisi server (mis. nama unik per room) untuk mencegah bentrok.
- Gunakan filter kata kasar (`bad-words`) di server agar kontrol moderasi terpusat.
- Jangan mempercayai data yang datang dari client; selalu lakukan verifikasi di server.
- Untuk development, gunakan `nodemon` agar server otomatis restart saat file berubah.

**Contoh penggunaan & uji cepat:**
- Instal: `npm install` di folder `Jobsheet 9 - Socket Programming/ruangobrol` jika diperlukan.
- Jalankan server: `node "Jobsheet 9 - Socket Programming/ruangobrol/src/index.js"` (atau `npm start` jika tersedia).
- Buka browser: `http://localhost:3000/` (port configurable).
- Buka dua tab dan bergabung ke room yang sama; coba kirim pesan dan kirim lokasi.

**Contoh output console (server):**
```
New WebSocket connection
Server is running on port 3000!
```

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
