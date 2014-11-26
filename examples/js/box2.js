var craft = require('craft')

var box_model = craft.model.define(function($$$){
	return $$$.cube()
})

var a_box = box_model.generate()

craft.viewer.view(a_box)
