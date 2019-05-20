var subdomain = require('express-subdomain')
var express = require('express')
var marked = require('marked')
var fs = require('fs')
var app = express()
// var io = require('socket.io')()

// app.use(subdomain('krc', require('./within/index.js')(io)))

app.use('/static', express.static('static'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.get('/pages', (req, res) => {
	fs.readdir('pages', (err, items) => {
		if (err) {
            res.status(500).end(err)
            return console.log(err)
        }

        res.json(items)
	})
})

app.get('/pages/*', (req, res) => {
    res.end(marked(fs.readFileSync(req.url.slice(1), 'utf8')))
})

console.log(`Listening on port ${process.env.PORT || 8080}`)
app.listen(process.env.PORT || 8080)
