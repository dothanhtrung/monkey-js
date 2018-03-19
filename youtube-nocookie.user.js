// ==UserScript==
// @name     youtube-nocookie
// @version  1
// @grant    none
// ==/UserScript==

// Copyright 2018 Trung Do

var iframes = document.getElementsByTagName("iframe");

for (var i = 0; i < iframes.length; i++) {
	var iframe = iframes[i];
	var link = iframe.src;

	if (link.indexOf("youtube.com/embed") !== -1){
		var new_link = link.replace("youtube.com/embed","youtube-nocookie.com/embed");
		iframe.src = new_link;
	}
}
