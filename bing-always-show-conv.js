// ==UserScript==
// @name     bing-always-show-conv
// @description  Prevent Bing Chat redirect to search page after chatting for a while
// @version  1.0
// @grant    none
// @match    https://www.bing.com/search*
// ==/UserScript==

// Copyright 2023 Trung Do


function alwaysShowConv() {
  let urlObj = new URL(window.location.href);
  var s = urlObj.searchParams.get("showconv");

  if (s != undefined && s != 1) {
    urlObj.searchParams.set("showconv", 1);
    window.location.replace(urlObj.toString());
  }
}

alwaysShowConv();

// recheck every 2 seconds
let intervalID = setInterval(alwaysShowConv, 2000);
