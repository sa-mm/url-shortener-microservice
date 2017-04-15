var mongo = require('mongodb').MongoClient
var validUrl = require('valid-url')

var shortener = function (req, res) {
  var re = /^\/new\//
  var url = req.path.replace(re, '')
  if (validUrl.isUri(url)) {
    console.log('Looks like an URI')

    var rand = Math.floor(Math.random() * 1000000)
    var shortUrl = req.protocol + '://' + req.hostname + ':' + (process.env.PORT || 3000) + '/' + rand
    console.log('rand: ' + rand)
    console.log('shortUrl: ' + shortUrl)
    var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/urls'

    mongo.connect(mongoUrl, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err)
      } else {
        console.log('Connection established to', mongoUrl)
        // do some work here with the database.
        var collection = db.collection('urlcollection')
        var find = function () {
          collection.findOne({
            original_url: url
          }, {
              original_url: 1,
              short_url: 1,
              _id: 0
            }, findUrlCallback)
        }
        var findUrlCallback = function (err, result) {
          if (err) {
            console.log(err)
            db.close()
          } else {
            console.log('the result: ' + JSON.stringify(result))
            if (result) {
              console.log('result exists so res.send')
              res.send(result)
              db.close()
            } else {
              insert()
            }
          }
        }
        var insert = function () {
          collection.insertOne({
            'original_url': url,
            'short_url': shortUrl
          }, insertCallback)
        }
        var insertCallback = function (err, result) {
          if (err) {
            console.log('There was a problem adding the object to the collection')
            console.log(err)
          } else {
            find()
          }
          db.close()
        }
        find()
      }
    })
  } else {
    var err = 'Not a URI'
    console.log(err)
    return JSON.stringify({ error: err })
  }
}

module.exports = shortener
