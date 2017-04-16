var writeExamples = function () {

  var creator = function (id, text) {
    var parent = document.getElementById(id)
    var p = document.createElement('p')
    var code = document.createElement('code')
    var textNode = document.createTextNode(text)
    code.appendChild(textNode)
    p.appendChild(code)
    parent.appendChild(p)
  }

  var href = window.location.href
  creator('input', href + 'new/https://www.google.com')
  creator('input', href + 'new/http://foo.com:80')
  creator('output', '{ "original_url":"http://foo.com:80", "short_url":"' + href + '8170" }')
  creator('usage', href + '2871')
}

writeExamples()
