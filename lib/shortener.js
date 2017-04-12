var shortener = function (path) {
  var re = /^\/new\//
  var url = path.replace(re, '')
  var rand = Math.floor(Math.random() * 1000000)
  console.log(rand)
  return url
}

module.exports = shortener
