var express = require('express')
var app = express()

app.get('/', (req, res) => {
  console.log(req.subdomains)
  res.end()
})

app.listen(process.env.PORT || 8080)