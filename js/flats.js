// =====================================
// AKR AMS - Flats Management
// =====================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const flatContainer = document.getElementById("flatContainer");
const searchFlat = document.getElementById("searchFlat");

let flats = [];

// =====================================
// Load Flats
// =====================================

async function loadFlats(){

    flatContainer.innerHTML="";

    flats=[];

    let occupied=0;
    let vacant=0;

    try{

        const snapshot=await getDocs(collection(db,"flats"));

        snapshot.forEach((docSnap)=>{

            const flat={

                id:docSnap.id,

                ...docSnap.data()

            };

            flats.push(flat);

            if(flat.status==="Occupied") occupied++;
            else vacant++;

            flatContainer.innerHTML+=createCard(flat);

        });

        document.getElementById("occupiedFlats").textContent=occupied;

        document.getElementById("vacantFlats").textContent=vacant;

        document.getElementById("residentCount").textContent=occupied;

        document.getElementById("totalFlats").textContent=occupied+vacant;

    }

    catch(error){

        console.log(error);

    }

}

loadFlats();

// =====================================
// Flat Card
// =====================================

function createCard(flat){

const badge=

flat.status==="Occupied"

?

"status status-occupied"

:

"status status-vacant";

return `

<div class="flat-card">

<h2>Flat ${flat.flatNo}</h2>

<p><strong>Floor :</strong> ${flat.floor}</p>

<p><strong>Resident :</strong> ${flat.residentName||"-"}</p>

<p><strong>Mobile :</strong> ${flat.mobile||"-"}</p>

<p><strong>Type :</strong> ${flat.residentType||"-"}</p>

<p><strong>Members :</strong> ${flat.members||0}</p>

<p><strong>Vehicle :</strong> ${flat.vehicle||"-"}</p>

<p>

<span class="${badge}">

${flat.status}

</span>

</p>

<button

class="edit-btn"

onclick="editFlat('${flat.id}')">

Edit

</button>

</div>

`;

}


// =====================================
// Modal Controls
// =====================================

const modal = document.getElementById("flatModal");
const flatForm = document.getElementById("flatForm");

document.getElementById("addFlatBtn").onclick = () => {

    flatForm.reset();

    document.getElementById("docId").value = "";

    document.getElementById("modalTitle").textContent = "Add Flat";

    modal.style.display = "flex";

};

document.getElementById("closeModal").onclick = () => {

    modal.style.display = "none";

};

document.getElementById("cancelBtn").onclick = () => {

    modal.style.display = "none";

};

window.onclick = function(e){

    if(e.target===modal){

        modal.style.display="none";

    }

};

// =====================================
// Save Flat
// =====================================

flatForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const id=document.getElementById("docId").value;

    const flat={

        flatNo:document.getElementById("flatNo").value.trim(),

        floor:document.getElementById("floor").value,

        status:document.getElementById("status").value,

        residentName:document.getElementById("residentName").value.trim(),

        mobile:document.getElementById("mobile").value.trim(),

        residentType:document.getElementById("residentType").value,

        members:Number(document.getElementById("members").value)||0,

        vehicle:document.getElementById("vehicle").value.trim()

    };

    try{

        if(id){

            await updateDoc(doc(db,"flats",id),flat);

            alert("Flat updated successfully.");

        }else{

            await addDoc(collection(db,"flats"),flat);

            alert("Flat added successfully.");

        }

        modal.style.display="none";

        loadFlats();

    }catch(error){

        console.error(error);

        alert("Unable to save flat.");

    }

});

// =====================================
// Edit Flat
// =====================================

window.editFlat=async(id)=>{

    try{

        const snap=await getDoc(doc(db,"flats",id));

        if(!snap.exists()) return;

        const flat=snap.data();

        document.getElementById("docId").value=id;

        document.getElementById("flatNo").value=flat.flatNo;

        document.getElementById("floor").value=flat.floor;

        document.getElementById("status").value=flat.status;

        document.getElementById("residentName").value=flat.residentName||"";

        document.getElementById("mobile").value=flat.mobile||"";

        document.getElementById("residentType").value=flat.residentType||"Owner";

        document.getElementById("members").value=flat.members||0;

        document.getElementById("vehicle").value=flat.vehicle||"";

        document.getElementById("modalTitle").textContent="Edit Flat";

        modal.style.display="flex";

    }catch(error){

        console.error(error);

    }

};

// =====================================
// Delete Flat
// =====================================

window.deleteFlat=async(id)=>{

    if(!confirm("Delete this flat?")) return;

    try{

        await deleteDoc(doc(db,"flats",id));

        loadFlats();

    }catch(error){

        console.error(error);

        alert("Unable to delete flat.");

    }

};



// =====================================
// Live Search
// =====================================

searchFlat.addEventListener("input", function () {

    const keyword = this.value.toLowerCase().trim();

    flatContainer.innerHTML = "";

    const filtered = flats.filter((flat) => {

        return (
            flat.flatNo.toLowerCase().includes(keyword) ||
            (flat.residentName || "").toLowerCase().includes(keyword) ||
            (flat.mobile || "").includes(keyword)
        );

    });

    if (filtered.length === 0) {

        flatContainer.innerHTML = `
        <div class="flat-card">
            <h2>No Flats Found</h2>
            <p>No matching records available.</p>
        </div>
        `;

        return;

    }

    filtered.forEach((flat) => {

        flatContainer.innerHTML += createCard(flat);

    });

});

// =====================================
// Occupancy Filter
// =====================================

window.filterFlats = function(status){

    flatContainer.innerHTML = "";

    const filtered = flats.filter(flat => flat.status === status);

    if(filtered.length === 0){

        flatContainer.innerHTML = `
        <div class="flat-card">
            <h2>No ${status} Flats</h2>
        </div>
        `;

        return;

    }

    filtered.forEach(flat=>{

        flatContainer.innerHTML += createCard(flat);

    });

};

// =====================================
// Show All Flats
// =====================================

window.showAllFlats = function(){

    flatContainer.innerHTML = "";

    flats.forEach(flat=>{

        flatContainer.innerHTML += createCard(flat);

    });

};

// =====================================
// Refresh Dashboard
// =====================================

async function refreshFlats(){

    await loadFlats();

}

refreshFlats();

// Refresh every 30 seconds

setInterval(refreshFlats,30000);

// =====================================
// Empty Firestore Check
// =====================================

if(flats.length===0){

    flatContainer.innerHTML=`
    <div class="flat-card">

        <h2>No Flats Available</h2>

        <p>Add your first flat.</p>

    </div>
    `;

}

// =====================================
// Page Loaded
// =====================================

document.addEventListener("DOMContentLoaded",()=>{

    loadFlats();

});

console.log("AKR AMS Flats Module Loaded Successfully");
