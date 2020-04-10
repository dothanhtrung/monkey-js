// ==UserScript==
// @name     youtube-nocookie
// @description  Replace frame youtube embed by youtube-nocookie
// @version  1.1
// @grant    none
// @match    *://*/*
// ==/UserScript==

// Copyright 2020 Trung Do

var iframes = document.getElementsByTagName("iframe");

for (var i = 0; i < iframes.length; i++) {
	var iframe = iframes[i];
  
	var link = iframe.src;
  if (link) {
    var new_link = link.replace("youtube.com/embed","youtube-nocookie.com/embed");
    iframe.src = new_link;
  }
  
  link = iframe.getAttribute("data-embed-src");
  if (link) {
    var new_link = link.replace("youtube.com/embed","youtube-nocookie.com/embed");
    iframe.setAttribute("data-embed-src", new_link);
  }
}
