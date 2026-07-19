import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const table = document.getElementById("complaintsTable");

const totalComplaints = document.getElementById("totalComplaints");
const openComplaints = document.getElementById("openComplaints");
const progressComplaints = document.getElementById("progressComplaints");
const resolvedComplaints = document.getElementById("resolvedComplaints");

const searchBox = document.getElementById("searchComplaint");
const statusFilter = document.getElementById("statusFilter");

let complaintsData = [];

/* ===========================
   Load Complaints
=========================== */

async function loadComplaints(){

    table.innerHTML = "";

    complaintsData = [];

    let total = 0;
    let open = 0;
    let progress = 0;
    let resolved = 0;

    const snapshot = await getDocs(collection(db,"complaints"));

    snapshot.forEach((docSnap)=>{

        const data = docSnap.data();

        complaintsData.push({
            id:docSnap.id,
            ...data
        });

        total++;

        if(data.status==="Open"){

            open++;

        }else if(data.status==="In Progress"){

            progress++;

        }else if(data.status==="Resolved"){

            resolved++;

        }

        const statusClass = data.status
            .toLowerCase()
            .replace(/\s+/g,"-");

        const priorityClass = data.priority
            .toLowerCase();

        table.innerHTML += `

<tr>

<td>${docSnap.id}</td>

<td>${data.flat}</td>

<td>${data.resident}</td>

<td>${data.category}</td>

<td class="${priorityClass}">
${data.priority}
</td>

<td class="${statusClass}">
${data.status}
</td>

<td>${data.date}</td>

<td>

<button class="editComplaint"
data-id="${docSnap.id}">

Edit

</button>

</td>

</tr>

`;

    });

    totalComplaints.textContent = total;
    openComplaints.textContent = open;
    progressComplaints.textContent = progress;
    resolvedComplaints.textContent = resolved;

}

loadComplaints();


/* ===========================
   Search & Filter
=========================== */

function filterComplaints(){

    const search = searchBox.value.toLowerCase().trim();

    const status = statusFilter.value;

    const rows = table.querySelectorAll("tr");

    rows.forEach((row)=>{

        const flat = row.cells[1]?.textContent.toLowerCase() || "";
        const rowStatus = row.cells[5]?.textContent.trim();

        const searchMatch = flat.includes(search);
        const statusMatch = status === "" || rowStatus === status;

        row.style.display = (searchMatch && statusMatch)
            ? ""
            : "none";

    });

}

searchBox.addEventListener("keyup", filterComplaints);

statusFilter.addEventListener("change", filterComplaints);

/* ===========================
   Complaint Modal
=========================== */

const complaintModal =
document.getElementById("complaintModal");

const addComplaintBtn =
document.getElementById("addComplaintBtn");

const closeComplaintModal =
document.getElementById("closeComplaintModal");

const complaintFlat =
document.getElementById("complaintFlat");

const complaintResident =
document.getElementById("complaintResident");

const complaintCategory =
document.getElementById("complaintCategory");

const complaintPriority =
document.getElementById("complaintPriority");

const complaintDescription =
document.getElementById("complaintDescription");

const complaintStatus =
document.getElementById("complaintStatus");

const saveComplaint =
document.getElementById("saveComplaint");

let selectedComplaintId = "";

/* New Complaint */

addComplaintBtn.addEventListener("click",()=>{

    selectedComplaintId = "";

    complaintFlat.value = "";
    complaintResident.value = "";
    complaintCategory.value = "";
    complaintPriority.value = "Low";
    complaintDescription.value = "";
    complaintStatus.value = "Open";

    complaintModal.style.display = "flex";

});

/* Close Modal */

closeComplaintModal.addEventListener("click",()=>{

    complaintModal.style.display = "none";

});

window.addEventListener("click",(e)=>{

    if(e.target===complaintModal){

        complaintModal.style.display="none";

    }

});



/* ===========================
   Edit Complaint
=========================== */

table.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("editComplaint")) return;

    selectedComplaintId = e.target.dataset.id;

    const complaint = complaintsData.find(
        item => item.id === selectedComplaintId
    );

    if(!complaint) return;

    complaintFlat.value = complaint.flat;
    complaintResident.value = complaint.resident;
    complaintCategory.value = complaint.category;
    complaintPriority.value = complaint.priority;
    complaintDescription.value = complaint.description;
    complaintStatus.value = complaint.status;

    complaintModal.style.display = "flex";

});

/* ===========================
   Save Complaint
=========================== */

saveComplaint.addEventListener("click", async()=>{

    if(
        complaintFlat.value.trim()==="" ||
        complaintResident.value.trim()==="" ||
        complaintCategory.value===""
    ){

        alert("Please fill all required fields.");

        return;

    }

    if(selectedComplaintId===""){

        selectedComplaintId =
            "CMP" + Date.now();

    }

    await setDoc(
        doc(db,"complaints",selectedComplaintId),
        {

            flat: complaintFlat.value.trim(),

            resident: complaintResident.value.trim(),

            category: complaintCategory.value,

            priority: complaintPriority.value,

            description: complaintDescription.value.trim(),

            status: complaintStatus.value,

            date: new Date().toLocaleDateString("en-GB")

        },
        { merge:true }
    );

    alert("Complaint saved successfully.");

    complaintModal.style.display = "none";

    selectedComplaintId = "";

    loadComplaints();

});

/* ===========================
   Refresh After Save
=========================== */

window.addEventListener("focus",()=>{

    loadComplaints();

});


