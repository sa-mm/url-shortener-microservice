var writeExamples = function() {
  var input = document.getElementById('input')
  var p1 = document.createElement('p')
  var p2 = document.createElement('p')
  var code1 = document.createElement('code')
  var code2 = document.createElement('code')
  console.log(window.location.href)
  var text1 = document.createTextNode(window.location.href + 'new/https://www.google.com')
  var text2 = document.createTextNode(window.location.href + 'new/http://foo.com:80')
  code1.appendChild(text1)
  code2.appendChild(text2)

  p1.appendChild(code1)
  p2.appendChild(code2)
  input.appendChild(p1)
  input.appendChild(p2)

  var output = document.getElementById('output')
  p1 = document.createElement('p')
  code1 = document.createElement('code')
  text1 = document.createTextNode('{ "original_url":"http://foo.com:80", "short_url":"' + document.location.href + '8170" }')
  code1.appendChild(text1)
  p1.appendChild(code1)
  output.appendChild(p1)

  var usage = document.getElementById('usage')
  p1 = document.createElement('p')
  code1 = document.createElement('code')
  text1 = document.createTextNode(document.location.href + '2871')
  code1.appendChild(text1)
  p1.appendChild(code1)
  usage.appendChild(p1)
}

writeExamples()