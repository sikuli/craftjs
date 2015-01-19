craftjs
=======

## Installation

	npm install craftjs --save

## Usage


## Development

Clonse the repo

	git clone git@github.com:sikuli/craftjs.git

Install node modules

	npm install

To build and view a model:

	bin/craft model [name]

e.g.,

	bin/craft model canvas
	bin/craft model pin

To build and view a design file:

	bin/craft xml [path-to-xml]

e.g.,

	bin/craft xml examples/xml/patterns.xml


# Deployment 

## Website

In www/, build for production

	$ gulp --production

Commit generated webpack bundles (e.g., app.css, main.bundle.js, worker.bundle.js)

	$ git commit -a -m 'ready to deploy'

In project root,  	

	$ git subtree push --prefix www/public origin gh-pages


## Contributing


## Release History