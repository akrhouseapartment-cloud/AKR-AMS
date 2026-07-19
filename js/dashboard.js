// =====================================
// AKR AMS Dashboard
// =====================================

import {
    db
} from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const TOTAL_FLATS = 30;

async function loadDashboard() {

    try {

        const residentsSnapshot = await getDocs(
            collection(db, "residents")
        );

        let totalResidents = 0;
        let occupied = 0;
        let pending = 0;

        const tbody = document.getElementById("pendingResidents");

        if (tbody) {
            tbody.innerHTML = "";
        }

        residentsSnapshot.forEach((docSnap) => {

            const resident = docSnap.data();

            totalResidents++;

            if (resident.status === "Approved") {
                occupied++;
            }

            if (resident.status === "Pending") {

                pending++;

                if (tbody) {

                    tbody.innerHTML += `
<tr>

<td>${resident.fullName}</td>

<td>${resident.flat}</td>

<td>${resident.mobile}</td>

<td>

<button
class="approve"
onclick="approveResident('${docSnap.id}')">

Approve

</button>

<button
class="reject"
onclick="rejectResident('${docSnap.id}')">

Reject

</button>

</td>

</tr>
`;

                }

            }

        });

        if (tbody && pending === 0) {

            tbody.innerHTML =
                `<tr>
<td colspan="4">
No Pending Approvals
</td>
</tr>`;

        }

        document.getElementById("residentCount").textContent = totalResidents;
        document.getElementById("occupiedCount").textContent = occupied;
        document.getElementById("vacantCount").textContent = TOTAL_FLATS - occupied;
        document.getElementById("pendingCount").textContent = pending;

    } catch (error) {

        console.error(error);

    }

}

loadDashboard();

      // =====================================
// Approve / Reject Residents
// =====================================

import {
    updateDoc,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Make functions available to HTML buttons
window.approveResident = approveResident;
window.rejectResident = rejectResident;

async function approveResident(docId) {

    try {

        await updateDoc(doc(db, "residents", docId), {
            status: "Approved"
        });

        await addActivity("Resident approved");

        alert("Resident approved successfully.");

        loadDashboard();

    } catch (error) {

        console.error(error);

        alert("Unable to approve resident.");

    }

}

async function rejectResident(docId) {

    try {

        await updateDoc(doc(db, "residents", docId), {
            status: "Rejected"
        });

        await addActivity("Resident rejected");

        alert("Resident rejected successfully.");

        loadDashboard();

    } catch (error) {

        console.error(error);

        alert("Unable to reject resident.");

    }

}

// =====================================
// Latest Notices
// =====================================

async function loadNotices() {

    const noticeBox = document.getElementById("latestNotices");

    if (!noticeBox) return;

    noticeBox.innerHTML = "";

    try {

        const noticeSnapshot = await getDocs(
            collection(db, "notices")
        );

        if (noticeSnapshot.empty) {

            noticeBox.innerHTML =
                "<p>No notices available.</p>";

            return;

        }

        noticeSnapshot.forEach((notice) => {

            const data = notice.data();

            noticeBox.innerHTML += `
                <p>
                    <strong>${data.title}</strong><br>
                    ${data.message}
                </p>
                <hr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =====================================
// Recent Activities
// =====================================

async function addActivity(message) {

    try {

        await addDoc(collection(db, "activities"), {

            activity: message,

            createdAt: new Date()

        });

    } catch (error) {

        console.error(error);

    }

}

async function loadActivities() {

    const list = document.getElementById("recentActivities");

    if (!list) return;

    list.innerHTML = "";

    try {

        const activitySnapshot = await getDocs(
            collection(db, "activities")
        );

        if (activitySnapshot.empty) {

            list.innerHTML =
                "<li>No recent activities.</li>";

            return;

        }

        activitySnapshot.forEach((activity) => {

            const data = activity.data();

            list.innerHTML += `
                <li>${data.activity}</li>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// Load dashboard extras
loadNotices();
loadActivities();

// =====================================
// Admin Profile
// =====================================

async function loadAdminProfile() {

    try {

        const adminRef = doc(db, "admins", "superadmin");

        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {

            const admin = adminSnap.data();

            const adminName = document.getElementById("adminName");

            if (adminName) {
                adminName.textContent = admin.name;
            }

        }

    } catch (error) {

        console.error("Admin Profile Error:", error);

    }

}

// =====================================
// Complaint Count
// =====================================

async function loadComplaintCount() {

    try {

        const snapshot = await getDocs(
            collection(db, "complaints")
        );

        const element = document.getElementById("complaintCount");

        if (element) {
            element.textContent = snapshot.size;
        }

    } catch (error) {

        console.log(error);

    }

}

// =====================================
// Visitor Count
// =====================================

async function loadVisitorCount() {

    try {

        const snapshot = await getDocs(
            collection(db, "visitors")
        );

        const element = document.getElementById("visitorCount");

        if (element) {
            element.textContent = snapshot.size;
        }

    } catch (error) {

        console.log(error);

    }

}

// =====================================
// Refresh Dashboard
// =====================================

async function refreshDashboard() {

    await loadDashboard();

    await loadAdminProfile();

    await loadComplaintCount();

    await loadVisitorCount();

    await loadNotices();

    await loadActivities();

}

refreshDashboard();

// Auto refresh every 30 seconds
setInterval(refreshDashboard, 30000);

// =====================================
// Firebase Logout
// =====================================

import {
    auth
} from "./firebase.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (!confirmLogout) return;

        try {

            await signOut(auth);

            localStorage.clear();

            window.location.href = "login.html";

        } catch (error) {

            alert("Logout failed.");

            console.error(error);

        }

    });

}


