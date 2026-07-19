/* ==========================================
   AKR AMS - visitors.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadVisitors();

    const form = document.getElementById("visitorForm");

    if(form){

        form.addEventListener("submit", saveVisitor);

    }

});

function saveVisitor(e){

    e.preventDefault();

    const visitor = {

        name: document.getElementById("visitorName").value.trim(),
        phone: document.getElementById("visitorPhone").value.trim(),
        vehicle: document.getElementById("vehicle").value.trim(),
        purpose: document.getElementById("purpose").value,
        date: new Date().toLocaleString()

    };

    let visitors = JSON.parse(localStorage.getItem("akrVisitors")) || [];

    visitors.push(visitor);

    localStorage.setItem("akrVisitors", JSON.stringify(visitors));

    alert("Visitor registered successfully.");

    document.getElementById("visitorForm").reset();

    loadVisitors();

}

function loadVisitors(){

    let visitors = JSON.parse(localStorage.getItem("akrVisitors")) || [];

    const count = document.getElementById("visitorCount");

    if(count){

        count.textContent = visitors.length;

    }

}
