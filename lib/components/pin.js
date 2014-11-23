var O = require('openscad');

var component = exports;

component.info = {	
	name: 'pin',
	author: 'doubleshow',
	version: '1.0.0'
}

component.generate = function(params){
	var head = params.head || {};
	var head_radius = head.radius || 2;
	var head_depth = head.depth || 1;

	var depth = params.depth || 5;


	needle = O.cylinder({r: 1, h: depth, center:[true,true,false]});	
	head = O.cylinder({r: head_radius, h: head_depth, center:[true,true,false]});
	head.addConnector('containerConnector', [0, 0, 0], [0, 0, -1], [1, 0, 0]);

	head = head.translate([0,0,depth]);

	needle.addConnector('connector', [0, 0, 0], [0, 0, -1], [1, 0, 0]);
	

	return O.union(head,needle);
}

component.examples = [
	{
		description: 'default pin',
		parameters: {
		}
	},
	{
		description: 'a tall pin',
		parameters: {
			depth: 10
		}
	},	
	{
		description: 'a pin with a wider head',
		parameters: {
			head: {
				radius: 5 
			}
		}
	},
	{
		description: 'a tall pin with a wider/thicker head',
		parameters: {
			depth: 10,
			head: {
				radius: 5,
				depth: 3
			}
		}
	}	
];