/* ==========================================
   AKR House Apartment Management System
   Firebase Configuration
========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvkY2bxxHuLqtSrVDufsrVgw9Mz__S5Pg",
  authDomain: "akr-ams.firebaseapp.com",
  projectId: "akr-ams",
  storageBucket: "akr-ams.firebasestorage.app",
  messagingSenderId: "595011153068",
  appId: "1:595011153068:web:b8c6fac5e8d1633ea8c309"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Firestore Database
const db = getFirestore(app);

// Export everything
export {
  app,
  auth,
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
};
