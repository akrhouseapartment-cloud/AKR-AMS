/* ==========================================
   AKR AMS
   Firebase Resident Registration
========================================== */

import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const form = document.getElementById("registerForm");

if (form) {
    form.addEventListener("submit", registerResident);
}

async function registerResident(e) {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const flat = document.getElementById("flat").value;

    if (fullName === "") {
        alert("Enter your full name.");
        return;
    }

    if (mobile.length !== 10) {
        alert("Enter a valid mobile number.");
        return;
    }

    if (flat === "") {
        alert("Select your flat.");
        return;
    }

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        await addDoc(collection(db, "residents"), {

            uid: userCredential.user.uid,

            fullName: fullName,

            mobile: mobile,

            email: email,

            flat: flat,

            role: "Resident",

            status: "Pending",

            createdAt: serverTimestamp()

        });

        alert(
            "Registration completed successfully.\n\nYour account is waiting for Admin approval."
        );

        form.reset();

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

        console.error(error);

    }

}
