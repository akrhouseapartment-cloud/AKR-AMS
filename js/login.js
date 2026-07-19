/* ==========================================
   AKR AMS
   Firebase Login
========================================== */

import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", loginUser);

async function loginUser(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try{

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const uid = userCredential.user.uid;

        /* ===============================
           Check Admin
        =============================== */

        const adminQuery = query(
            collection(db,"admins"),
            where("uid","==",uid)
        );

        const adminSnapshot = await getDocs(adminQuery);

        if(!adminSnapshot.empty){

            const admin = adminSnapshot.docs[0].data();

            localStorage.setItem(
                "akrAdmin",
                JSON.stringify(admin)
            );

            window.location.href="admin.html";

            return;

        }

        /* ===============================
           Check Resident
        =============================== */

        const residentQuery = query(
            collection(db,"residents"),
            where("uid","==",uid)
        );

        const residentSnapshot = await getDocs(
            residentQuery
        );

        if(residentSnapshot.empty){

            alert("User record not found.");

            await signOut(auth);

            return;

        }

        const resident =
            residentSnapshot.docs[0].data();

        if(resident.status==="Pending"){

            alert(
                "Your account is waiting for Admin approval."
            );

            await signOut(auth);

            return;

        }

        if(resident.status==="Rejected"){

            alert(
                "Your registration has been rejected."
            );

            await signOut(auth);

            return;

        }

        localStorage.setItem(
            "akrResident",
            JSON.stringify(resident)
        );

        window.location.href="resident.html";

    }

    catch(error){

        switch(error.code){

            case "auth/invalid-email":
                alert("Invalid email address.");
                break;

            case "auth/user-not-found":
                alert("Account not found.");
                break;

            case "auth/wrong-password":
                alert("Incorrect password.");
                break;

            case "auth/invalid-credential":
                alert("Incorrect email or password.");
                break;

            case "auth/too-many-requests":
                alert("Too many attempts. Try again later.");
                break;

            default:
                alert(error.message);

        }

    }

}
