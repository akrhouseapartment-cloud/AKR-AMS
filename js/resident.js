/* ==========================================
   AKR House Apartment Management System
   resident.js
   Version : v0.4
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadResident();

    showGreeting();

    setupLogout();

});

// -----------------------------
// Load Resident Details
// -----------------------------

function loadResident(){

    const data = JSON.parse(localStorage.getItem("akrResident"));

    if(!data){

        alert("Please login first.");

        window.location.href="login.html";

        return;

    }

    const title = document.querySelector(".welcome h2");
    const flat = document.querySelector(".welcome p");

    title.innerHTML = `Welcome, ${data.fullName} 👋`;

    flat.innerHTML = `Flat Number : <strong>${data.flat}</strong>`;

}

// -----------------------------
// Greeting
// -----------------------------

function showGreeting(){

    const hour = new Date().getHours();

    let greet="";

    if(hour<12){

        greet="🌅 Good Morning";

    }else if(hour<17){

        greet="☀️ Good Afternoon";

    }else if(hour<21){

        greet="🌇 Good Evening";

    }else{

        greet="🌙 Good Night";

    }

    console.log(greet);

}

// -----------------------------
// Logout
// -----------------------------

function setupLogout(){

    const logoutCard=document.querySelector('a[href="index.html"]');

    if(!logoutCard) return;

    logoutCard.addEventListener("click",function(e){

        e.preventDefault();

        const confirmLogout=confirm("Are you sure you want to logout?");

        if(confirmLogout){

            localStorage.removeItem("akrResident");

            window.location.href="index.html";

        }

    });

}

// -----------------------------
// Future Notification Function
// -----------------------------

function showNotification(message){

    alert(message);

}
