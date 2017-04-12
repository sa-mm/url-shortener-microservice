var express = require('express')
var path = require('path')
var shortener = require('./lib/shortener.js')
var app = express()

app.set('port', (process.env.PORT || 3000))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/new/*', function (req, res) {
  var out = shortener(req.path)
  res.send(out)
})

app.listen(app.get('port'), function () {
  console.log('URL Shortener Microservice listening on port ' + app.get('port'))
})