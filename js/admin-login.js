/* ==========================================
   AKR AMS
   Admin Login
========================================== */

import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const form = document.getElementById("adminLoginForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    const adminRef = doc(db, "admins", "superadmin");
    const adminDoc = await getDoc(adminRef);

    if (!adminDoc.exists()) {

      alert("Admin profile not found.");

      await signOut(auth);

      return;

    }

    const admin = adminDoc.data();

    if (admin.status !== "Active") {

      alert("Admin account is inactive.");

      await signOut(auth);

      return;

    }

    localStorage.setItem(
      "akrAdmin",
      JSON.stringify(admin)
    );

    window.location.href = "admin.html";

  }

  catch (error) {

    alert(error.message);

  }

});
