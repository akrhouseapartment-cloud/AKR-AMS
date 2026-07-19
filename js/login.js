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
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", loginResident);

async function loginResident(e){

    e.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    try{

        const user =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        const q=query(
            collection(db,"residents"),
            where("uid","==",user.user.uid)
        );

        const snapshot=await getDocs(q);

        if(snapshot.empty){

            alert("Resident record not found.");

            await signOut(auth);

            return;

        }

        const resident=snapshot.docs[0].data();

        if(resident.status!=="Approved"){

            alert(
                "Your account is waiting for Admin approval."
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

        alert(error.message);

    }

}
