// ==UserScript==
// @name    redmine-enhanced
// @description Redmine Enhanced
// @version  1.1
// @grant    none
// @match    *://*redmine*/*
// ==/UserScript==

// Copyright 2022 Trung Do


// Correct worktime jumping between month
function worktimeJumpCorrect() {
    let a_elements = document.getElementById("content").getElementsByTagName("a");
    let lastmonth_updated = false;
    let nextmonth_updated = false;

    for (const aElement of a_elements) {
        if (aElement.innerHTML === "&gt;&gt;") {
            let href = aElement.getAttribute("href");
            href = href.replace(/day=\d*&/, "day=1&");
            aElement.setAttribute("href", href);

            nextmonth_updated = true;
        } else if (aElement.innerHTML === "&lt;&lt;") {
            let href = aElement.getAttribute("href");
            let paramString = href.split('?')[1];
            let queryString = new URLSearchParams(paramString);
            let month = queryString.get("month");
            let year = queryString.get("year");
            let last_day = new Date(year, month, 0).getDate();
            href = href.replace(/day=\d*&/, "day=" + last_day + "&");
            aElement.setAttribute("href", href);

            lastmonth_updated = true;
        }

        if (lastmonth_updated && nextmonth_updated) {
            break;
        }
    }
}


let url = window.location;
if (url.pathname.includes('/work_time/')) {
    worktimeJumpCorrect();
}