// ==UserScript==
// @name     mangafox-reader
// @version  1
// @grant    none
// @match    http://fanfox.net/*
// ==/UserScript==

// Copyright 2018 Trung Do

var numberpage = document.getElementById("top_bar").getElementsByClassName("m")[0].getElementsByClassName("m")[0].length;
var chapter_link = window.location.href;
var arry_link = chapter_link.split('/');
arry_link.pop();
chapter_link = arry_link.join('/');
var imgholder = document.getElementById("viewer");
while (imgholder.firstChild) {
    imgholder.removeChild(imgholder.firstChild);
}

for (var i = 1; i < numberpage; i++) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", chapter_link + "/" + i + ".html", false);
	xmlhttp.send(null);
	var parser = new DOMParser();
	var d = parser.parseFromString(xmlhttp.responseText, "text/html");
	var image = d.getElementById("image");
	imgholder.appendChild(document.createTextNode(i));
	imgholder.appendChild(image);
}