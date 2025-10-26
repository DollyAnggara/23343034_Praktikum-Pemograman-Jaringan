const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = 4000

// Menentukan path folder public dan templates
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine dan lokasi views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory untuk file publik
app.use(express.static(publicDirectoryPath))

// Halaman utama
app.get('', (req, res) => {
  res.render('index', {
    judul: 'Aplikasi Cek Cuaca',
    nama: 'Dolly Anggara'
  })
})

// Halaman tentang
app.get('/tentang', (req, res) => {
  res.render('tentang', {
    judul: 'Tentang Saya',
    nama: 'Dolly Anggara'
  })
})

// Halaman informasi cuaca
app.get('/infoCuaca', (req, res) => {
  res.send({
    prediksiCuaca: 'Cuaca sedang hujan',
    lokasi: 'Padang'
  })
})

// Halaman bantuan
app.get('/bantuan', (req, res) => {
  res.render('bantuan', {
    judul: 'Halaman Bantuan',
    teksBantuan: 'Ini halaman bantuan (FAQ)',
    nama: 'Dolly Anggara'
  })
})

// Halaman 404 khusus untuk URL bantuan yang tidak ditemukan 
app.get(/^\/bantuan\/.*/, (req, res) => {
  res.render('404', {
    judul: '404',
    nama: 'Dolly Anggara',
    pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
  })
})

// Halaman 404 umum untuk URL lain yang tidak ditemukan
app.get(/.*/, (req, res) => {
  res.render('404', {
    judul: '404',
    nama: 'Dolly Anggara',
    pesanKesalahan: 'Halaman tidak ditemukan.'
  })
})

// Menjalankan server di port 4000
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`)
})
