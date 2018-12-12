// packages
var express = require('express')
var subdomain = require('express-subdomain')

// subdomains
var crosscode = express.Router()

// app
var app = express()


// routing
crosscode.use(express.static('dist/crosscode'))

app.use(subdomain('crosscode', crosscode))

app.get('/', (req, res) => {
  var sub = req.subdomains.reverse().join('.')
  console.log(sub)
  res.sendFile(__dirname + '/dist/index.html')
})

// listen
app.listen(process.env.PORT || 8080)