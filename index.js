const subdomain = require('express-subdomain');
const express = require('express');
const marked = require('marked');
const fs = require('fs');
const app = express();
// const io = require('socket.io')(app.listen(process.env.PORT || 8080));

// app.use(subdomain('krc', require('./within/index.js')(io)));

app.use('/static', express.static('static'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.get('/pages', (req, res) => {
    fs.readdir('pages', (err, items) => {
        if (err) {
            res.status(500).end(err);
            return console.log(err);
        }

        res.json(items);
    });
});

app.get('/pages/*', (req, res) => {
    res.end(marked(fs.readFileSync(req.url.slice(1), 'utf8')));
});

console.log(`Listening on port ${process.env.PORT || 8080}`);
app.listen(process.env.PORT || 8080);
