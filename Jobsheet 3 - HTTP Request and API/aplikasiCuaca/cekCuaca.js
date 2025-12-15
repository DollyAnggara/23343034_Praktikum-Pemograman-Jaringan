const request = require('postman-request')

// latihan 1 - Ambil data cuaca dari Weatherstack
const urlCuaca =
  'http://api.weatherstack.com/current?access_key=f967c5f0f4761a19a1bff0caeddc3a85&query=-0.8980323611374166,100.35051338911944&units=m'

request({ url: urlCuaca, json: true }, (error, response) => {
  if (error) {
    console.log('Tidak dapat terhubung ke layanan cuaca!')
  } else if (response.body.error) {
    console.log('Lokasi tidak ditemukan!')
  } else {
    console.log(
      'Saat ini suhu di luar mencapai ' +
        response.body.current.temperature +
        '°C, dengan kemungkinan hujan sebesar ' +
        response.body.current.precip +
        '%. Cuacanya saat ini: ' +
        response.body.current.weather_descriptions[0] +
        '.'
    )
  }
})

// latihan 2 - Ambil koordinat dari Mapbox
const geocodeURL =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/Padang.json?access_token=pk.eyJ1IjoiZG9sbHlhMjIiLCJhIjoiY21oNmVqbXd4MGc2YjJsb2FsdTJkeGIyeCJ9.pVg5qAs0FHru0CBrzx1fDw&limit=1'

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log('Tidak dapat terhubung ke layanan Mapbox!')
  } else {
    const latitude = response.body.features[0].center[1]
    const longitude = response.body.features[0].center[0]
    console.log(latitude, longitude)
  }
})

// latihan 3 - Gabungkan Mapbox dan Weatherstack
const tempat = 'Padang'
const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  tempat
)}.json?access_token=pk.eyJ1IjoiZG9sbHlhMjIiLCJhIjoiY21oNmVqbXd4MGc2YjJsb2FsdTJkeGIyeCJ9.pVg5qAs0FHru0CBrzx1fDw&limit=1`

request({ url: mapboxURL, json: true }, (error, response) => {
  if (error) {
    console.log('Tidak dapat terhubung ke layanan Mapbox!')
  } else if (response.body.features.length === 0) {
    console.log('Lokasi tidak ditemukan!')
  } else {
    const latitude = response.body.features[0].center[1]
    const longitude = response.body.features[0].center[0]
    const place_name = response.body.features[0].place_name
    const place_type = response.body.features[0].place_type[0]

    console.log(
      `Koordinat lokasi anda adalah ${latitude}, ${longitude}`
    )
    console.log(`Data yang anda cari adalah: ${tempat}`)
    console.log(`Data yang ditemukan adalah: ${place_name}`)
    console.log(`Tipe lokasi adalah: ${place_type}`)

    const urlWeather = `http://api.weatherstack.com/current?access_key=f967c5f0f4761a19a1bff0caeddc3a85&query=${latitude},${longitude}&units=m`

    request({ url: urlWeather, json: true }, (error, response) => {
      if (error) {
        console.log('Tidak dapat terhubung ke layanan cuaca!')
      } else if (response.body.error) {
        console.log('Tidak dapat menemukan data cuaca!')
      } else {
        console.log(
          `Saat ini suhu di ${tempat} mencapai ${response.body.current.temperature} derajat celcius.`
        )
        console.log(
          `Kemungkinan terjadinya hujan adalah ${response.body.current.precip}%`
        )
      }
    })
  }
})
