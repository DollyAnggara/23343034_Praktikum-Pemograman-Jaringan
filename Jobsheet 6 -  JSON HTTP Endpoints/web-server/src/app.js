const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')

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
  if (!req.query.address) {
    return res.send({
      error: 'Kamu harus memasukan lokasi yang ingin dicari'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, dataPrediksi) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        prediksiCuaca: dataPrediksi,
        lokasi: location,
        address: req.query.address
      })
    })
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

// Halaman 404
app.get(/.*/, (req, res) => {
  res.render('404', {
    judul: '404',
    nama: 'Dolly Anggara',
    pesanKesalahan: 'Halaman tidak ditemukan.'
  })
})

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`)
})
