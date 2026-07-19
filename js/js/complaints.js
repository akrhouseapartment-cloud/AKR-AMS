/* ==========================================
   AKR House Apartment Management System
   complaints.js
   Version : v0.6
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("complaintForm");

    if (!form) return;

    loadComplaintCount();

    form.addEventListener("submit", saveComplaint);

});

// -----------------------------
// Save Complaint
// -----------------------------

function saveComplaint(e){

    e.preventDefault();

    const category = document.getElementById("category").value;
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if(category===""){
        alert("Please select a complaint category.");
        return;
    }

    if(title.length<5){
        alert("Complaint title is too short.");
        return;
    }

    if(description.length<10){
        alert("Please provide more details.");
        return;
    }

    const complaint = {

        complaintId : "CMP" + Date.now(),

        category,

        title,

        description,

        status : "Pending",

        date : new Date().toLocaleString()

    };

    let complaints =
        JSON.parse(localStorage.getItem("akrComplaints")) || [];

    complaints.push(complaint);

    localStorage.setItem(
        "akrComplaints",
        JSON.stringify(complaints)
    );

    alert("Complaint submitted successfully.");

    document.getElementById("complaintForm").reset();

    loadComplaintCount();

}

// -----------------------------
// Complaint Count
// -----------------------------

function loadComplaintCount(){

    let complaints =
        JSON.parse(localStorage.getItem("akrComplaints")) || [];

    let pending=0;
    let progress=0;
    let resolved=0;

    complaints.forEach(c=>{

        if(c.status==="Pending") pending++;

        if(c.status==="In Progress") progress++;

        if(c.status==="Resolved") resolved++;

    });

    const card=document.querySelectorAll(".card")[1];

    if(card){

        card.innerHTML=`

        <h3>Complaint Status</h3>

        <p>Pending : ${pending}</p>

        <p>In Progress : ${progress}</p>

        <p>Resolved : ${resolved}</p>

        <p>Total : ${complaints.length}</p>

        `;

    }

}
