var express = require('express')
var app = express()

app.get('/', (req, res) => {
  var sub = req.subdomains.reverse().join('.')
  console.log(sub)
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(process.env.PORT || 8080)