var craft = require('craft')

var a_box = craft.make(function($$$){
	return $$$.cube()
})

craft.viewer.view(a_box)
