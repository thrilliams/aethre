let socket = io.connect()
let username = localStorage.getItem('username') || prompt('username')
localStorage.setItem('username', username)

socket.on('message', message => {
	$('.messages').append(`<div><span>${message.sender}</span><span>${message.body}</span></div>`)
	$('.messages').scrollTop($('.messages').prop('scrollHeight'))
})

$('.send').submit(e => {
	e.preventDefault()
	if ($('.send > input').val() !== '') {
		socket.emit('message', {
			sender: username,
			body: $('.send > input').val()
		})
	}
	$('.send > input').val('')
})