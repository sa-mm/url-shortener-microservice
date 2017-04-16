var express = require('express')
var path = require('path')
var dotenv = require('dotenv')
var shortener = require('./lib/shortener.js')
var checkAndRedirect = require('./lib/checkAndRedirect.js')
var app = express()

dotenv.config()

app.enable('trust proxy')
app.set('port', (process.env.PORT || 3000))

const publicDir = path.join(__dirname, 'public')

app.get('/', function (req, res) {
  res.sendFile(path.join(publicDir, '/index.html'))
})

app.get('/script.js', function (req, res) {
  res.sendFile(path.join(publicDir, '/script.js'))
})

app.get('/new/*', function (req, res) {
  shortener(req, res)
})

app.get('/*', function (req, res) {
  checkAndRedirect(req, res)
})

app.listen(app.get('port'), function () {
  console.log('URL Shortener Microservice listening on port ' + app.get('port'))
})