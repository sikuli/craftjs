module.exports = function(craft){
	craft.pack()
		.addFolder(__dirname + '/basic')
		.addFolder(__dirname + '/texture')
		.addFolder(__dirname + '/access')
		.addFolder(__dirname + '/map')
}