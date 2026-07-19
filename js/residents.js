/* ==========================================
   AKR AMS
   Resident Management
   Part 1
========================================== */

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// ----------------------------
// DOM Elements
// ----------------------------

const residentTable = document.getElementById("residentTable");
const residentForm = document.getElementById("residentForm");
const residentModal = document.getElementById("residentModal");

const addResidentBtn = document.getElementById("addResidentBtn");
const closeModal = document.getElementById("closeModal");

const searchResident = document.getElementById("searchResident");
const statusFilter = document.getElementById("statusFilter");

// Form Fields

const fullName = document.getElementById("fullName");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const flat = document.getElementById("flat");
const status = document.getElementById("status");

// ----------------------------
// Global Variables
// ----------------------------

let residents = [];
let editResidentId = null;

// ----------------------------
// Initial Load
// ----------------------------

loadResidents();

// ----------------------------
// Load Residents
// ----------------------------

async function loadResidents() {

    residentTable.innerHTML = "";

    residents = [];

    const snapshot = await getDocs(
        collection(db, "residents")
    );

    snapshot.forEach((documentItem) => {

        residents.push({

            id: documentItem.id,

            ...documentItem.data()

        });

    });

    displayResidents(residents);

}

// ----------------------------
// Display Residents
// ----------------------------

function displayResidents(data) {

    residentTable.innerHTML = "";

    if (data.length === 0) {

        residentTable.innerHTML = `
        <tr>
            <td colspan="6">
                No Residents Found
            </td>
        </tr>
        `;

        return;

    }

    data.forEach((resident) => {

        residentTable.innerHTML += `

        <tr>

            <td>${resident.fullName}</td>

            <td>${resident.flat}</td>

            <td>${resident.mobile}</td>

            <td>${resident.email}</td>

            <td>${resident.status}</td>

            <td>

                <button
                    class="editBtn"
                    onclick="editResident('${resident.id}')">

                    Edit

                </button>

                <button
                    class="deleteBtn"
                    onclick="deleteResident('${resident.id}')">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}



// ----------------------------
// Modal Events
// ----------------------------

addResidentBtn.addEventListener("click", () => {

    editResidentId = null;

    residentForm.reset();

    status.value = "Pending";

    residentModal.style.display = "flex";

});

closeModal.addEventListener("click", () => {

    residentModal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === residentModal) {

        residentModal.style.display = "none";

    }

});

// ----------------------------
// Save Resident
// ----------------------------

residentForm.addEventListener("submit", saveResident);

async function saveResident(e){

    e.preventDefault();

    const residentData={

        fullName:fullName.value.trim(),

        mobile:mobile.value.trim(),

        email:email.value.trim(),

        flat:flat.value,

        status:status.value

    };

    try{

        if(editResidentId){

            await updateDoc(

                doc(db,"residents",editResidentId),

                residentData

            );

            alert("Resident Updated Successfully");

        }

        else{

            await addDoc(

                collection(db,"residents"),

                residentData

            );

            alert("Resident Added Successfully");

        }

        residentModal.style.display="none";

        residentForm.reset();

        editResidentId=null;

        loadResidents();

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

// ----------------------------
// Edit Resident
// ----------------------------

window.editResident=function(id){

    const resident=residents.find(r=>r.id===id);

    if(!resident){

        alert("Resident not found");

        return;

    }

    editResidentId=id;

    fullName.value=resident.fullName;

    mobile.value=resident.mobile;

    email.value=resident.email;

    flat.value=resident.flat;

    status.value=resident.status;

    residentModal.style.display="flex";

};


// ----------------------------
// Delete Resident
// ----------------------------

window.deleteResident = async function(id){

    const confirmDelete = confirm(
        "Are you sure you want to delete this resident?"
    );

    if(!confirmDelete){
        return;
    }

    try{

        await deleteDoc(
            doc(db,"residents",id)
        );

        alert("Resident Deleted Successfully");

        loadResidents();

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

};

// ----------------------------
// Search Residents
// ----------------------------

searchResident.addEventListener("input", filterResidents);

statusFilter.addEventListener("change", filterResidents);

function filterResidents(){

    const keyword = searchResident.value
        .toLowerCase()
        .trim();

    const selectedStatus = statusFilter.value;

    const filteredResidents = residents.filter((resident)=>{

        const matchesSearch =

            resident.fullName
                .toLowerCase()
                .includes(keyword)

            ||

            resident.mobile
                .toLowerCase()
                .includes(keyword)

            ||

            resident.email
                .toLowerCase()
                .includes(keyword)

            ||

            resident.flat
                .toLowerCase()
                .includes(keyword);

        const matchesStatus =

            selectedStatus === ""

            ||

            resident.status === selectedStatus;

        return matchesSearch && matchesStatus;

    });

    displayResidents(filteredResidents);

}

// ----------------------------
// Refresh Table
// ----------------------------

function refreshResidents(){

    loadResidents();

}
