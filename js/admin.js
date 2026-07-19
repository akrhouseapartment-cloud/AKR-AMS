/* ==========================================
   AKR AMS
   Admin Dashboard
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
const pendingCount = document.getElementById("pendingCount");
const vacantCount = document.getElementById("vacantCount");
const pendingResidents = document.getElementById("pendingResidents");
const logoutBtn = document.getElementById("logoutBtn");

loadDashboard();

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    localStorage.removeItem("akrAdmin");

    window.location.href = "admin-login.html";

});

async function loadDashboard() {

    pendingResidents.innerHTML = "";

    let totalResidents = 0;
    let pendingResidentsCount = 0;

    const residentSnapshot = await getDocs(collection(db, "residents"));

    residentSnapshot.forEach((documentItem) => {

        totalResidents++;

        const resident = documentItem.data();

        if (resident.status === "Pending") {

            pendingResidentsCount++;

            pendingResidents.innerHTML += `

<tr>

<td>${resident.fullName}</td>

<td>${resident.flat}</td>

<td>${resident.mobile}</td>

<td>

<button class="approveBtn"
onclick="approveResident('${documentItem.id}')">

Approve

</button>

<button class="rejectBtn"
onclick="rejectResident('${documentItem.id}')">

Reject

</button>

</td>

</tr>

`;

        }

    });

    residentCount.textContent = totalResidents;

    pendingCount.textContent = pendingResidentsCount;

    loadVacantFlats();

}

async function loadVacantFlats() {

    let vacant = 0;

    const flatSnapshot = await getDocs(collection(db, "flats"));

    flatSnapshot.forEach((flatDoc) => {

        const flat = flatDoc.data();

        if (flat.status === "Vacant") {

            vacant++;

        }

    });

    vacantCount.textContent = vacant;

}

window.approveResident = async function (id) {

    await updateDoc(doc(db, "residents", id), {

        status: "Approved"

    });

    alert("Resident Approved Successfully");

    loadDashboard();

}

window.rejectResident = async function (id) {

    if (!confirm("Reject this resident?")) return;

    await deleteDoc(doc(db, "residents", id));

    alert("Resident Rejected");

    loadDashboard();

}
