const request = require('postman-request')
const url = 'http://api.weatherstack.com/current?access_key=f967c5f0f4761a19a1bff0caeddc3a85&query=-0.8980323611374166,100.35051338911944'
request({ url: url }, (error, response) => {
  //console.log(response)
  const data = JSON.parse(response.body)
  //console.log(data)
  //console.log(data.current)
  console.log(data.current.temperature)
})