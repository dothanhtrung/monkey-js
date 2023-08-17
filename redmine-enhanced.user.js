// ==UserScript==
// @name    redmine-enhanced
// @description Redmine Enhanced
// @version  1.6
// @grant    none
// @match    *://*redmine*/*
// ==/UserScript==

// Copyright 2023 Trung Do


// Correct worktime jumping between months
function worktimeMonthJump() {
    let a_elements = document.getElementById("content").getElementsByTagName("a");
    let lastmonth_updated = false;
    let nextmonth_updated = false;

    for (const aElement of a_elements) {
        let href = aElement.getAttribute("href");
        let paramString = href.split('?')[1];
        let queryString = new URLSearchParams(paramString);
        let month = queryString.get("month");
        let year = queryString.get("year");

        if (aElement.innerHTML === "&gt;&gt;") {
            let first_working_day = 1;
            let first_day = new Date(year, month - 1, 1).getDay();
            if (first_day === 0) {
                first_working_day += 1;
            } else if (first_day === 6) {
                first_working_day += 2;
            }
            href = href.replace(/day=\d*&/, "day=" + first_working_day + "&");
            aElement.setAttribute("href", href);

            nextmonth_updated = true;
        } else if (aElement.innerHTML === "&lt;&lt;") {
            let last_working_day = new Date(year, month, 0).getDate();
            let last_day = new Date(year, month, 0).getDay();
            if (last_day === 0) {
                last_working_day -= 2;
            } else if (last_day === 6) {
                last_working_day -= 1;
            }
            href = href.replace(/day=\d*&/, "day=" + last_working_day + "&");
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

// Remove future weeks and weeks in previous terms out of select list
function cleanWRSelectDate() {
    let now = new Date();
    let current_month = now.getMonth();
    let begin_of_term = new Date();
    begin_of_term.setDate(1);

    // month start from 0 to 11
    if (current_month > 8 || current_month < 3) {
        begin_of_term.setMonth(3);
    } else {
        begin_of_term.setMonth(9);
    }

    let select_date = document.getElementById("select_date");
    let options = select_date.getElementsByTagName("option");

    for (let i = 0; i < options.length; i++) {
        let item = options[i];
        let start_date = item.value;
        let end_date = item.innerHTML.split("--&gt;")[1];
        start_date = new Date(start_date);
        end_date = new Date(end_date);

        if (start_date > now || end_date < begin_of_term) {
            select_date.removeChild(item);
            i--;
        }
    }
}

function assignToMe() {
    let issue_assigned = document.getElementById("issue_assigned_to_id");
    for (let i = 0; i < issue_assigned.length; i++) {
        if (issue_assigned[i].text === "<< me >>") {
            issue_assigned.value = issue_assigned[i].value;
            console.log(issue_assigned[i].value);
        }
    }

}

// ================= main =================

let url = window.location.pathname;

if (url.includes('/work_time/')) {
    worktimeMonthJump();
    worktimeProjectJump()
} else if (url.includes('/issues/gantt')) {
    fixGanttScroll();
} else if (url.includes('/issues/new')) {
    assignToMe();
} else if (url.includes('/issues')) {
    fixSidebarCoverContextMenu();
} else if (url.includes('/weeklyreport/')) {
    cleanWRSelectDate();
}