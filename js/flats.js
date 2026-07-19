import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ----------------------------
// DOM Elements
// ----------------------------

const flatGrid = document.getElementById("flatGrid");

const searchFlat = document.getElementById("searchFlat");

const refreshBtn = document.getElementById("refreshBtn");

const flatModal = document.getElementById("flatModal");

const closeFlatModal = document.getElementById("closeFlatModal");

const modalFlatNo = document.getElementById("modalFlatNo");

const modalStatus = document.getElementById("modalStatus");

const modalOwner = document.getElementById("modalOwner");

const modalTenant = document.getElementById("modalTenant");

const modalMobile = document.getElementById("modalMobile");

const modalMaintenance = document.getElementById("modalMaintenance");

// ----------------------------
// Global Variable
// ----------------------------

let flats = [];

// ----------------------------
// Load Flats
// ----------------------------

async function loadFlats(){

    try{

        const snapshot = await getDocs(collection(db,"flats"));

        flats = [];

        snapshot.forEach((docItem)=>{

            flats.push({

                id:docItem.id,

                ...docItem.data()

            });

        });

        updateFlatCards();

updateStatistics();

updateStatusColors();

    }

    catch(error){

        console.error(error);

        alert("Unable to load flats.");

    }

}

// ----------------------------
// Update Cards
// ----------------------------

function updateFlatCards(){

    flats.forEach((flat)=>{

        const statusElement =
        document.getElementById("status"+flat.id);

        const ownerElement =
        document.getElementById("owner"+flat.id);

        if(!statusElement || !ownerElement){
            return;
        }

        statusElement.textContent =
        flat.status || "Vacant";

        statusElement.className =
        flat.status === "Occupied"
        ? "occupied"
        : "vacant";

        ownerElement.textContent =
        "Owner : " +
        (flat.ownerName || "-");

    });

}

// ----------------------------
// Refresh
// ----------------------------

refreshBtn.addEventListener("click",loadFlats);

// ----------------------------
// Initial Load
// ----------------------------

loadFlats();


// ----------------------------
// Search Flats
// ----------------------------

searchFlat.addEventListener("input", () => {

    const keyword = searchFlat.value
        .trim()
        .toLowerCase();

    const cards = document.querySelectorAll(".flat-card");

    cards.forEach((card) => {

        const flatNumber = card.dataset.flat.toLowerCase();

        if(flatNumber.includes(keyword)){
            card.style.display = "";
        }else{
            card.style.display = "none";
        }

    });

});

// ----------------------------
// View Flat Details
// ----------------------------

window.viewFlat = async function(flatNumber){

    try{

        const flatRef = doc(db,"flats",flatNumber);

        const flatSnap = await getDoc(flatRef);

        if(!flatSnap.exists()){

            alert("Flat not found.");

            return;

        }

        const flat = flatSnap.data();

        modalFlatNo.textContent = flatNumber;

        modalStatus.textContent =
        flat.status || "Vacant";

        modalOwner.textContent =
        flat.ownerName || "-";

        modalTenant.textContent =
        flat.tenantName || "-";

        modalMobile.textContent =
        flat.mobile || "-";

        modalMaintenance.textContent =
        flat.maintenance || "0";

        flatModal.style.display = "flex";

    }

    catch(error){

        console.error(error);

        alert("Unable to load flat details.");

    }

};

// ----------------------------
// Close Modal
// ----------------------------

closeFlatModal.addEventListener("click",()=>{

    flatModal.style.display="none";

});

window.addEventListener("click",(event)=>{

    if(event.target===flatModal){

        flatModal.style.display="none";

    }

});


// ----------------------------
// Flat Statistics
// ----------------------------

function updateStatistics(){

    const total = flats.length;

    const occupied = flats.filter(flat =>
        (flat.status || "").toLowerCase() === "occupied"
    ).length;

    const vacant = total - occupied;

    console.log("Total Flats :", total);
    console.log("Occupied :", occupied);
    console.log("Vacant :", vacant);

    const totalElement = document.getElementById("totalFlats");
    const occupiedElement = document.getElementById("occupiedFlats");
    const vacantElement = document.getElementById("vacantFlats");

    if(totalElement){
        totalElement.textContent = total;
    }

    if(occupiedElement){
        occupiedElement.textContent = occupied;
    }

    if(vacantElement){
        vacantElement.textContent = vacant;
    }

}

// ----------------------------
// Update Status Colors
// ----------------------------

function updateStatusColors(){

    flats.forEach((flat)=>{

        const statusElement =
        document.getElementById("status"+flat.id);

        if(!statusElement){
            return;
        }

        statusElement.classList.remove(
            "occupied",
            "vacant"
        );

        if((flat.status || "").toLowerCase() === "occupied"){

            statusElement.classList.add("occupied");

        }else{

            statusElement.classList.add("vacant");

        }

    });

}

// ----------------------------
// Reload Everything
// ----------------------------

async function refreshDashboard(){

    await loadFlats();

    updateStatistics();

    updateStatusColors();

}

// ----------------------------
// Auto Refresh
// ----------------------------

setInterval(refreshDashboard,30000);

// ----------------------------
// Refresh Button
// ----------------------------

refreshBtn.addEventListener("click",refreshDashboard);

// ----------------------------
// Initialize
// ----------------------------

refreshDashboard();
