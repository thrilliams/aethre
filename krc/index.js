module.exports = io => {
	const express = require('express')
	const app = express.Router()
	let messages = []

	app.use('/', express.static(__dirname + '/krc/static'))

	io.on('connection', socket => {
		for (let m of messages) {
			socket.emit('message', m)
		}

		socket.on('message', data => {
			data.body = data.body.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
			data.sender += ':'
			messages.push(data)
			io.emit('message', data)
		})
	})

	return app
}