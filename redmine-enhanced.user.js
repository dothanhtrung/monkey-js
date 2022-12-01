// ==UserScript==
// @name    redmine-enhanced
// @description Redmine Enhanced
// @version  1.4
// @grant    none
// @match    *://*redmine*/*
// ==/UserScript==

// Copyright 2022 Trung Do


// Correct worktime jumping between months
function worktimeMonthJump() {
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

// Correct worktime jumping between projects
function worktimeProjectJump() {
    let url = window.location.href;
    let project_jump = document.getElementById("project-jump")
    let projects = project_jump.getElementsByClassName("projects")[0].getElementsByTagName("a");
    let all_projects = project_jump.getElementsByClassName("all-projects")[0].getElementsByTagName("a");

    for (const pj of projects) {
        let href = pj.getAttribute("href");
        let pj_id = href.replace(/.*projects\/(.*)\?jump=work_time.*/, "$1");
        if (url.includes('/work_time/show/')) {
            href = url.replace(/(.*work_time\/show\/).*(\?.*)/, "$1" + pj_id + "$2");
        } else if (url.includes('/work_time/index')) {
            href = url.replace(/(.*work_time)\/index(\?.*)/, "$1/show/" + pj_id + "$2");
        }
        pj.setAttribute("href", href);
    }

    for (const item of all_projects) {
        let href = url.replace(/(.*work_time).*(\?.*)/, "$1/index$2");
        item.setAttribute("href", href);
    }
}

// Make gantt chart consistent with label
function fixGanttScroll() {
    let gantt_draw_area = document.getElementById("gantt_draw_area");
    let svgs = gantt_draw_area.getElementsByTagName("svg");
    if (svgs.length > 1) {
        // Remove the last one
        gantt_draw_area.removeChild(svgs[svgs.length - 1]);
    }
}

// Fix sidebar cover the context menu in issue list
function fixSidebarCoverContextMenu() {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.setProperty('z-index', 0);
}

// ================= main =================

let url = window.location.pathname;

if (url.includes('/work_time/')) {
    worktimeMonthJump();
    worktimeProjectJump()
} else if (url.includes('/issues/gantt')) {
    fixGanttScroll();
} else if (url.includes('/issues')) {
    fixSidebarCoverContextMenu();
}
