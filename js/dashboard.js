/* ==========================================
   AKR AMS
   Dashboard
========================================== */

import { auth, db } from "./firebase.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const residentCount = document.getElementById("residentCount");
const occupiedCount = document.getElementById("occupiedCount");
const vacantCount = document.getElementById("vacantCount");
const pendingCount = document.getElementById("pendingCount");

const pendingResidents = document.getElementById("pendingResidents");

const adminName = document.getElementById("adminName");

const logoutBtn = document.getElementById("logoutBtn");

const admin = JSON.parse(localStorage.getItem("akrAdmin"));

if(admin){
    adminName.textContent = admin.name;
}

loadDashboard();

logoutBtn.addEventListener("click",logout);

async function logout(){

    await signOut(auth);

    localStorage.removeItem("akrAdmin");

    window.location.href="admin-login.html";

}

async function loadDashboard(){

    pendingResidents.innerHTML="";

    let totalResidents=0;
    let occupied=0;
    let vacant=0;
    let pending=0;

    // Residents

    const residents=await getDocs(collection(db,"residents"));

    residents.forEach((residentDoc)=>{

        totalResidents++;

        const resident=residentDoc.data();

        if(resident.status==="Pending"){

            pending++;

            pendingResidents.innerHTML+=`

            <tr>

            <td>${resident.fullName}</td>

            <td>${resident.flat}</td>

            <td>${resident.mobile}</td>

            <td>${resident.status}</td>

            <td>

            <button
            class="approveBtn"
            onclick="approveResident('${residentDoc.id}')">

            Approve

            </button>

            <button
            class="rejectBtn"
            onclick="rejectResident('${residentDoc.id}')">

            Reject

            </button>

            </td>

            </tr>

            `;

        }

    });

    residentCount.textContent=totalResidents;

    pendingCount.textContent=pending;

    // Flats

    const flats=await getDocs(collection(db,"flats"));

    flats.forEach((flatDoc)=>{

        const flat=flatDoc.data();

        if(flat.status==="Vacant"){

            vacant++;

        }else{

            occupied++;

        }

    });

    occupiedCount.textContent=occupied;

    vacantCount.textContent=vacant;

}

window.approveResident=async function(id){

    await updateDoc(doc(db,"residents",id),{

        status:"Approved"

    });

    alert("Resident Approved");

    loadDashboard();

}

window.rejectResident=async function(id){

    if(!confirm("Reject resident?")) return;

    await deleteDoc(doc(db,"residents",id));

    alert("Resident Rejected");

    loadDashboard();

}
