// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

// Firestore
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Authentication
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "akr-ams.firebaseapp.com",
  projectId: "akr-ams",
  storageBucket: "akr-ams.firebasestorage.app",
  messagingSenderId: "595011153068",
  appId: "1:595011153068:web:b8c6fac5e8d1633ea8c309"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
