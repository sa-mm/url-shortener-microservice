var express = require('express')
var path = require('path')
var dotenv = require('dotenv')
var shortener = require('./lib/shortener.js')
var checkAndRedirect = require('./lib/checkAndRedirect.js')
var app = express()

dotenv.config()

app.enable('trust proxy')
app.set('port', (process.env.PORT || 3000))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/script.js', function (req, res) {
  res.sendFile(path.join(__dirname, '/script.js'))
})

app.get('/new/*', function (req, res) {
  console.log(req.hostname)
  console.log(req.host)
  console.log(req.protocol)
  console.log(req.url)
  console.log(req)
  shortener(req, res)
  // res.send(out)
})

app.get('/*', function (req, res) {
  checkAndRedirect(req, res)
})

app.listen(app.get('port'), function () {
  console.log('URL Shortener Microservice listening on port ' + app.get('port'))
})