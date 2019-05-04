$.ajax({
	type: 'GET',
	url: '/pages',
	dataType: 'json',
	success: data => {
		data = data.sort(_ => Math.random())
		for (var i = 0; i < data.length; i++) {
			$.ajax({
				type: 'GET',
				url: '/pages/' + data[i],
				dataType: 'text',
				success: page => {
					article = $('<div><h1>' + $(page)[0].innerText + '</h1></div>')
					$('#content').append(article)
					article.click(e => {
						$('#article').html(`<div><span class="x"></span>${page}</div>`)
						$('.x').click(e => {
							$('#article').html('')
							$('#content').removeClass('hidden')
							$('#article').addClass('hidden')
							window.scrollTo(0, 0)
						})
						$('#article').removeClass('hidden')
						$('#content').addClass('hidden')
						window.scrollTo(0, 0)
					})
				}
			})
		}
	}
})