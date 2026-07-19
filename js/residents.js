// =====================================
// AKR AMS - Residents Management
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

const residentTable = document.getElementById("residentTableBody");
const searchInput = document.getElementById("searchInput");

let residents = [];

// ===============================
// Load Residents
// ===============================

async function loadResidents() {

    residents = [];

    residentTable.innerHTML = "";

    let approved = 0;
    let pending = 0;
    let rejected = 0;

    try {

        const snapshot = await getDocs(collection(db, "residents"));

        snapshot.forEach((docSnap) => {

            const resident = {
                id: docSnap.id,
                ...docSnap.data()
            };

            residents.push(resident);

            if (resident.status === "Approved") approved++;
            if (resident.status === "Pending") pending++;
            if (resident.status === "Rejected") rejected++;

            residentTable.innerHTML += createRow(resident);

        });

        document.getElementById("totalResidents").textContent = residents.length;
        document.getElementById("approvedResidents").textContent = approved;
        document.getElementById("pendingResidents").textContent = pending;
        document.getElementById("rejectedResidents").textContent = rejected;

        if (residents.length === 0) {

            residentTable.innerHTML = `
                <tr>
                    <td colspan="6">No residents found.</td>
                </tr>
            `;

        }

    } catch (error) {

        console.error(error);

    }

}

// ===============================
// Create Table Row
// ===============================

function createRow(resident) {

    let badge = "status-pending";

    if (resident.status === "Approved")
        badge = "status-approved";

    if (resident.status === "Rejected")
        badge = "status-rejected";

    return `

<tr>

<td>${resident.fullName}</td>

<td>${resident.flat}</td>

<td>${resident.mobile}</td>

<td>${resident.email}</td>

<td>

<span class="status ${badge}">
${resident.status}
</span>

</td>

<td>

<button
class="action-btn approve-btn"
onclick="approveResident('${resident.id}')">

Approve

</button>

<button
class="action-btn reject-btn"
onclick="rejectResident('${resident.id}')">

Reject

</button>

<button
class="action-btn edit-btn"
onclick="editResident('${resident.id}')">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="deleteResident('${resident.id}')">

Delete

</button>

</td>

</tr>

`;

}

loadResidents();


// =====================================
// Modal
// =====================================

const modal = document.getElementById("residentModal");
const addResidentBtn = document.getElementById("addResidentBtn");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const residentForm = document.getElementById("residentForm");

addResidentBtn.onclick = () => {

    residentForm.reset();

    document.getElementById("residentId").value = "";

    document.getElementById("modalTitle").textContent = "Add Resident";

    modal.style.display = "flex";

};

closeModal.onclick = () => modal.style.display = "none";

cancelBtn.onclick = () => modal.style.display = "none";

window.onclick = function(e){

    if(e.target == modal){

        modal.style.display = "none";

    }

};

// =====================================
// Save Resident
// =====================================

residentForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const id = document.getElementById("residentId").value;

    const resident = {

        fullName: document.getElementById("fullName").value.trim(),

        flat: document.getElementById("flat").value.trim(),

        mobile: document.getElementById("mobile").value.trim(),

        email: document.getElementById("email").value.trim(),

        status: document.getElementById("status").value

    };

    try{

        if(id){

            await updateDoc(doc(db,"residents",id), resident);

            alert("Resident updated successfully.");

        }else{

            await addDoc(collection(db,"residents"), resident);

            alert("Resident added successfully.");

        }

        modal.style.display="none";

        residentForm.reset();

        loadResidents();

    }catch(error){

        console.error(error);

        alert("Unable to save resident.");

    }

});

// =====================================
// Edit Resident
// =====================================

window.editResident = async function(id){

    try{

        const snap = await getDoc(doc(db,"residents",id));

        if(!snap.exists()) return;

        const resident = snap.data();

        document.getElementById("residentId").value=id;

        document.getElementById("fullName").value=resident.fullName;

        document.getElementById("flat").value=resident.flat;

        document.getElementById("mobile").value=resident.mobile;

        document.getElementById("email").value=resident.email;

        document.getElementById("status").value=resident.status;

        document.getElementById("modalTitle").textContent="Edit Resident";

        modal.style.display="flex";

    }catch(error){

        console.error(error);

    }

};

// =====================================
// Delete Resident
// =====================================

window.deleteResident = async function(id){

    if(!confirm("Delete this resident?")) return;

    try{

        await deleteDoc(doc(db,"residents",id));

        alert("Resident deleted.");

        loadResidents();

    }catch(error){

        console.error(error);

    }

};


// =====================================
// Live Search
// =====================================

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase().trim();

    residentTable.innerHTML = "";

    const filtered = residents.filter((resident) => {

        return (
            resident.fullName.toLowerCase().includes(keyword) ||
            resident.flat.toLowerCase().includes(keyword) ||
            resident.mobile.includes(keyword) ||
            resident.email.toLowerCase().includes(keyword)
        );

    });

    if (filtered.length === 0) {

        residentTable.innerHTML = `
        <tr>
            <td colspan="6">No residents found.</td>
        </tr>
        `;

        return;

    }

    filtered.forEach((resident) => {

        residentTable.innerHTML += createRow(resident);

    });

});

// =====================================
// Approve Resident
// =====================================

window.approveResident = async function(id){

    try{

        await updateDoc(doc(db,"residents",id),{

            status:"Approved"

        });

        loadResidents();

    }catch(error){

        console.error(error);

        alert("Unable to approve resident.");

    }

};

// =====================================
// Reject Resident
// =====================================

window.rejectResident = async function(id){

    try{

        await updateDoc(doc(db,"residents",id),{

            status:"Rejected"

        });

        loadResidents();

    }catch(error){

        console.error(error);

        alert("Unable to reject resident.");

    }

};

// =====================================
// Refresh
// =====================================

setInterval(() => {

    loadResidents();

},30000);

// =====================================
// Initial Load
// =====================================

document.addEventListener("DOMContentLoaded",()=>{

    loadResidents();

});


