onmessage = function(event) {
	var template = event.data;
	// var craft = require()
	require(['../../../../lib/craft'], function(craft) {
		postMessage("hello");
	});
}
