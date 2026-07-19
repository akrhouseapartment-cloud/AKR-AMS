import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const table = document.getElementById("maintenanceTable");

const totalCollection = document.getElementById("totalCollection");
const paidAmount = document.getElementById("paidAmount");
const pendingAmount = document.getElementById("pendingAmount");
const overdueAmount = document.getElementById("overdueAmount");

const searchBox = document.getElementById("searchMaintenance");

let maintenanceData = [];

/* Load Maintenance Records */

async function loadMaintenance() {

    table.innerHTML = "";

    maintenanceData = [];

    let total = 0;
    let paid = 0;
    let pending = 0;
    let overdue = 0;

    const snapshot = await getDocs(collection(db, "maintenance"));

    snapshot.forEach((docSnap) => {

        const data = docSnap.data();

        maintenanceData.push({
            id: docSnap.id,
            ...data
        });

        total += Number(data.amount || 0);

        if (data.status === "Paid") {

            paid += Number(data.amount || 0);

        } else if (data.status === "Pending") {

            pending += Number(data.amount || 0);

        } else {

            overdue += Number(data.amount || 0);

        }

        table.innerHTML += `

<tr>

<td>${data.flat}</td>

<td>${data.owner}</td>

<td>${data.month}</td>

<td>₹${data.amount}</td>

<td>${data.dueDate}</td>

<td class="${data.status.toLowerCase()}">
${data.status}
</td>

<td>

<button class="editBtn"
data-id="${docSnap.id}">
Edit
</button>

</td>

</tr>

`;

    });

    totalCollection.textContent = "₹" + total;
    paidAmount.textContent = "₹" + paid;
    pendingAmount.textContent = "₹" + pending;
    overdueAmount.textContent = "₹" + overdue;

}

loadMaintenance();

/* ===========================
   Search Maintenance Records
=========================== */

searchBox.addEventListener("keyup", () => {

    const value = searchBox.value.toLowerCase();

    const rows = table.querySelectorAll("tr");

    rows.forEach((row) => {

        const flat = row.cells[0]?.textContent.toLowerCase() || "";

        if (flat.includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});

/* ===========================
   Generate Monthly Bills
=========================== */

const generateBtn = document.getElementById("generateBills");

generateBtn.addEventListener("click", async () => {

    const monthInput = document.getElementById("billMonth");

    if (!monthInput.value) {

        alert("Please select a month.");

        return;

    }

    const month = monthInput.value;

    const flatsSnapshot = await getDocs(collection(db, "flats"));

    for (const flatDoc of flatsSnapshot.docs) {

        const flat = flatDoc.data();

        const billId = `${flatDoc.id}_${month}`;

        await setDoc(doc(db, "maintenance", billId), {

            flat: flatDoc.id,
            owner: flat.ownerName || "",
            month: month,
            amount: Number(flat.maintenance || 1000),
            dueDate: month + "-10",
            status: "Pending"

        }, { merge: true });

    }

    alert("Monthly maintenance bills generated successfully.");

    loadMaintenance();

});


/* ===========================
   Payment Modal
=========================== */

const paymentModal = document.getElementById("paymentModal");

const flatNumber = document.getElementById("flatNumber");
const ownerName = document.getElementById("ownerName");
const paymentMonth = document.getElementById("paymentMonth");
const maintenanceAmount = document.getElementById("maintenanceAmount");
const dueDate = document.getElementById("dueDate");
const paymentStatus = document.getElementById("paymentStatus");

const savePayment = document.getElementById("savePayment");
const closePaymentModal = document.getElementById("closePaymentModal");

let selectedBillId = "";

/* Open Edit Modal */

table.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("editBtn")) return;

    selectedBillId = e.target.dataset.id;

    const record = maintenanceData.find(item => item.id === selectedBillId);

    if (!record) return;

    flatNumber.value = record.flat;
    ownerName.value = record.owner;
    paymentMonth.value = record.month;
    maintenanceAmount.value = record.amount;
    dueDate.value = record.dueDate;
    paymentStatus.value = record.status;

    paymentModal.style.display = "flex";

});

/* Close Modal */

closePaymentModal.addEventListener("click", () => {

    paymentModal.style.display = "none";

});

/* Close when clicking outside */

window.addEventListener("click", (e) => {

    if (e.target === paymentModal) {

        paymentModal.style.display = "none";

    }

});

/* Save Payment */

savePayment.addEventListener("click", async () => {

    if (!selectedBillId) return;

    await setDoc(doc(db, "maintenance", selectedBillId), {

        flat: flatNumber.value,
        owner: ownerName.value,
        month: paymentMonth.value,
        amount: Number(maintenanceAmount.value),
        dueDate: dueDate.value,
        status: paymentStatus.value

    }, { merge: true });

    alert("Maintenance payment updated successfully.");

    paymentModal.style.display = "none";

    loadMaintenance();

});

                             
