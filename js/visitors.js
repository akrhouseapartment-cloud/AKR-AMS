import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const table = document.getElementById("visitorsTable");

const totalVisitors = document.getElementById("totalVisitors");
const checkedInVisitors = document.getElementById("checkedInVisitors");
const checkedOutVisitors = document.getElementById("checkedOutVisitors");
const todayVisitors = document.getElementById("todayVisitors");

const searchBox = document.getElementById("searchVisitor");
const statusFilter = document.getElementById("visitorStatusFilter");

let visitorsData = [];

/* ===========================
   Load Visitors
=========================== */

async function loadVisitors(){

    table.innerHTML = "";

    visitorsData = [];

    let total = 0;
    let checkedIn = 0;
    let checkedOut = 0;
    let today = 0;

    const todayDate = new Date().toLocaleDateString("en-GB");

    const snapshot = await getDocs(collection(db,"visitors"));

    snapshot.forEach((docSnap)=>{

        const data = docSnap.data();

        visitorsData.push({
            id:docSnap.id,
            ...data
        });

        total++;

        if(data.status==="Checked In"){

            checkedIn++;

        }else if(data.status==="Checked Out"){

            checkedOut++;

        }

        if(data.date===todayDate){

            today++;

        }

        const statusClass = data.status
            .toLowerCase()
            .replace(/\s+/g,"-");

        table.innerHTML += `

<tr>

<td>${docSnap.id}</td>

<td>${data.name}</td>

<td>${data.mobile}</td>

<td>${data.flat}</td>

<td>${data.purpose}</td>

<td>${data.checkIn}</td>

<td>${data.checkOut || "-"}</td>

<td class="${statusClass}">
${data.status}
</td>

<td>

<button
class="editVisitor"
data-id="${docSnap.id}">

Edit

</button>

</td>

</tr>

`;

    });

    totalVisitors.textContent = total;
    checkedInVisitors.textContent = checkedIn;
    checkedOutVisitors.textContent = checkedOut;
    todayVisitors.textContent = today;

}

loadVisitors();


