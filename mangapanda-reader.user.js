// ==UserScript==
// @name     mangapanda-reader
// @version  1
// @grant    none
// @match    https://www.mangapanda.com/*
// ==/UserScript==

// Copyright 2018 Trung Do

var numberpage = document.getElementById("pageMenu").length;
var chapter_link = window.location.href;
var imgholder = document.getElementById("imgholder");
while (imgholder.firstChild) {
    imgholder.removeChild(imgholder.firstChild);
}

for (var i = 1; i <= numberpage; i++) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", chapter_link + "/" + i, false);
	xmlhttp.send(null);
	var parser = new DOMParser();
	var d = parser.parseFromString(xmlhttp.responseText, "text/html");
	var image = d.getElementById("img");
	imgholder.appendChild(document.createTextNode(i));
	imgholder.appendChild(image);
}