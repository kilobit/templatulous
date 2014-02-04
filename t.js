var fs = require("fs");
var lxml = require("libxmljs");
var assert = require("assert");

console.log("Hello World!");

// fs.readFile("index.html", "utf-8", function(err, data) {
// 
//     if(err) {console.log(err); return err;}
// 
//     html = lxml.parseHtml(data);
//     assert.equal('html', html.root().name());
// 
//     for(var p in html.root()) {
// 
// 	console.log(p + ": " + html.root()[p]);
// 
//     }
// 
// });



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
    console.log(data.title);

    var tnode = html.get("head/title");

    tnode.text(title);

    return html;
}

var tmplt = templateFactory("index.html", entitle, consolehandler);

tmplt({title: "Hello World!"});
