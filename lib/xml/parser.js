var css = require('css');

var parser = module.exports = {}

parser.parse = function(xmlstring) {
    // TODO: use jsdom to make this work in headless mode too
    var dom = window.$.parseHTML(xmlstring)

    process_style(dom)

    var root = $(dom)[0]
    var ret = dom2craftdom(root)
    
    //console.debug(JSON.stringify(ret))
    return ret
}

function dom2craftdom(dom_node) {
    var craftdom_node = {
        name: dom_node.nodeName.toLowerCase(),
    }

    // collect attributes        
    var attributes = {}
    for (var att, i = 0, atts = dom_node.attributes, n = atts.length; i < n; i++) {
        att = atts[i]
        // except for the 'style' property
        if (att.nodeName != 'style') {
            attributes[att.nodeName] = att.value
        }
    }    

    // text
    if ($(dom_node).children().length==0){
        attributes.text = $(dom_node).text()
    }

    craftdom_node.attributes = attributes

    // style
    craftdom_node.style = dom_node.custom_style

    // collect children
    craftdom_node.children = _.map(dom_node.children, function(child) {
        return dom2craftdom(child)
    })

    return craftdom_node
}

function process_style(dom) {
    // TODO: read this off from config data
    var default_css = '* {padding: 0;}\n board {display: block; padding: 2;}\n p {display: block;} div {display: block;} h1 {display: block;}';

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