var css = require('css');

var parser = module.exports = {}

parser.parse = function(xmlstring) {
    // TODO: use jsdom to make this work in headless mode too
    var dom = $.parseHTML(xmlstring)

    // wrap each text node in 'p' with <text></text>
    // TODO: consider supporting this in other html tags (i.e., div, h1)
    $(dom).find('p').contents()
        .filter(function() {
            return this.nodeType === 3
        }).wrap('<text></text>')

    process_style(dom)

    var root = $(dom)[0]
    var ret = dom2craftdom(root)

    // console.debug(JSON.stringify(ret, null, ' '))
    return ret
}

function dom2craftdom(dom_node) {
    var name, style, attributes, children

    //
    // name
    //    
    name = dom_node.nodeName

    // e.g., PIN --> pin
    name = name.toLowerCase()

    // e.g., #text --> text
    name = name.replace('#', '')

    //
    // attributes        
    //
    attributes = {}

    // copy attributes from dom_node
    _.forEach(dom_node.attributes, function(att){
        attributes[att.nodeName] = att.value
    })

    // delete attributes.style
    delete attributes.style

    // attributes.text    
    if ($(dom_node).children().length == 0) {
        var text = $(dom_node).text().trim()
            // if text is not empty
        if (text.length > 0) {
            // add text as an attribute
            attributes.text = $(dom_node).text().trim()
        }
    }

    //
    // style
    //
    style = dom_node.custom_style || {}

    //
    // children
    //   
    children = _.map(dom_node.children, function(c) {
        return dom2craftdom(c);
    })

    return {
        name: name,
        attributes: attributes,
        style: style,
        children: children
    }
}

function process_style(dom) {
    // TODO: read this off from config data
    var default_css = '* {padding: 0;}\n board {display: block; padding: 2;}\n p {display: block;} div {display: block;} h1 {display: block;}';
    default_css += 'text {font-size: 8;}'
    default_css += 'h1 {display: block; font-size: 16;}'
    default_css += 'h2 {display: block; font-size: 14;}'
    default_css += 'h3 {display: block; font-size: 12;}'
    default_css += 'h4 {display: block; font-size: 10;}'
    default_css += 'h5 {display: block; font-size: 8;}'

    var csstext = $(dom).find("style").text()
    $(dom).find("style").remove()

    var cssdom = css.parse(default_css + csstext)
        // console.log(cssdom)

    function apply_css_rule_to_element(rule, el) {
        rule.declarations.forEach(function(declaration) {
            var prop = declaration.property
            var val = declaration.value
                // console.log(prop, '=>', val)
            if (prop === 'padding') {
                // TODO: conversion for all properties, not just padding
                val = Number(val)
            }

            // convert the css property name to a valid js property name
            // e.g., font-size --> font_size 
            prop = prop.replace('-', '_')

            el.custom_style[prop] = val
        })
    }

    // add a custom style property to each node
    $(dom).find("*").addBack().each(function() {
        // note: addBack() add 'dom' to the set of found elements so we 
        // can get a list of all elements including 'dom' itself
        this.custom_style = {}
    })

    // for each css rule
    cssdom.stylesheet.rules.forEach(function(rule) {
        // for each rule's selector
        rule.selectors.forEach(function(selector) {

            // apply the rule to 

            // matched root node
            $(dom).filter(selector).each(function(i, el) {
                apply_css_rule_to_element(rule, el)
            })

            // matched descendents
            $(dom).find(selector).each(function(i, el) {
                apply_css_rule_to_element(rule, el)
            })
        })
    })
}