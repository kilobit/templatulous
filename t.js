/* Copyright (C) 2014 Kilobit */
/* This software is released under the GPLv3 see LICENSE */

/* t.js */

var fs = require("fs");
var lxml = require("libxmljs");
var assert = require("assert");

function templateFactory(filename, mogrifyer, handler) {

    if(!handler) {handler = console.log;}

    return function(data) {

	fs.readFile(filename, "utf-8", function(err, fdata) {
	    
	    if(err) {return err;}

	    html = lxml.parseHtml(fdata);

	    var result = mogrifyer(html, data);

	    handler(result.toString());
	});
    };
}

var consolehandler = function(result) {

    console.log("<!DOCTYPE html>");
    console.log(result);
}

var entitle = function(html, data) {

    var title = data.title || 'The Title';

    var tnode = html.get("head/title");

    tnode.text(title);

    return html;
}

var tmplt = templateFactory("index.html", entitle, consolehandler);

tmplt({title: "Hello World!"});
