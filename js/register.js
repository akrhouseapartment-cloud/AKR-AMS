import {
  auth,
  db,
  collection,
  addDoc
} from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", registerResident);

async function registerResident(e){

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const flat = document.getElementById("flat").value;

    try{

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        await addDoc(
            collection(db,"residents"),
            {
                uid:userCredential.user.uid,
                fullName,
                mobile,
                email,
                flat,
                role:"resident",
                status:"Pending",
                createdAt:new Date()
            }
        );

        alert(
            "Registration successful. Please wait for admin approval."
        );

        form.reset();

        window.location.href="login.html";

    }catch(error){

        alert(error.message);

    }

}
