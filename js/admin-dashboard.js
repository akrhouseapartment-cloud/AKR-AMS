document.addEventListener("DOMContentLoaded", () => {

const residents =
JSON.parse(localStorage.getItem("akrResidents")) || [];

const complaints =
JSON.parse(localStorage.getItem("akrComplaints")) || [];

const visitors =
JSON.parse(localStorage.getItem("akrVisitors")) || [];

const maintenance =
JSON.parse(localStorage.getItem("akrMaintenance")) || [];

document.getElementById("totalResidents").textContent =
residents.length;

document.getElementById("openComplaints").textContent =
complaints.filter(c => c.status !== "Resolved").length;

document.getElementById("todayVisitors").textContent =
visitors.length;

let collected = 0;
let pending = 0;

maintenance.forEach(item => {
    if (item.status === "Paid") {
        collected += Number(item.amount);
    } else {
        pending += Number(item.amount);
    }
});

document.getElementById("maintenanceCollected").textContent =
"₹" + collected;

document.getElementById("pendingDues").textContent =
"₹" + pending;

});
