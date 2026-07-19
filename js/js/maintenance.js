/* ==========================================
   AKR AMS - maintenance.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadMaintenance();

});

function loadMaintenance(){

    const maintenance = JSON.parse(localStorage.getItem("akrMaintenance"));

    if(!maintenance){

        console.log("No maintenance data found.");

        return;

    }

    document.getElementById("month").textContent = maintenance.month;
    document.getElementById("amount").textContent = "₹" + maintenance.amount;
    document.getElementById("status").textContent = maintenance.status;
    document.getElementById("dueDate").textContent = maintenance.dueDate;

}
