// packages
var express = require('express')
var subdomain = require('express-subdomain')

// subdomains
var nrdb = express.Router()
var emu = express.Router()
var bypass = express.Router()

// app
var app = express()

// routing
nrdb.use(express.static('dist/netrunner'))
app.use(subdomain('netrunner', nrdb))

emu.use(express.static('dist/emu'))
app.use(subdomain('emu', emu))

emu.use(express.static('dist/hedit'))
app.use(subdomain('hedit', bypass))


app.get('/', (req, res) => {
  var sub = req.subdomains.reverse().join('.')
  console.log(sub)
  res.sendFile(__dirname + '/dist/index.html')
})

// listen
app.listen(process.env.PORT || 8080)
