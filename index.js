var express = require('express')
var app = express()

app.get('/', (req, res) => {
  console.log(req.subdomains)
  res.end()
})