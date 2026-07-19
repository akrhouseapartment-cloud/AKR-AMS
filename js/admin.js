
/* ==========================================
   AKR House Apartment Management System
   admin.js
   Version : v0.5
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("AKR AMS Admin Dashboard Loaded");

    welcomeMessage();

    animateCards();

    setupLogout();

});

// -----------------------------
// Welcome Message
// -----------------------------
function welcomeMessage(){

    const hour = new Date().getHours();

    let greeting = "";

    if(hour < 12){
        greeting = "🌅 Good Morning Admin";
    }else if(hour < 17){
        greeting = "☀️ Good Afternoon Admin";
    }else if(hour < 21){
        greeting = "🌇 Good Evening Admin";
    }else{
        greeting = "🌙 Good Night Admin";
    }

    const heading = document.querySelector(".welcome h2");

    if(heading){
        heading.innerHTML = greeting + " 👋";
    }

}

// -----------------------------
// Card Animation
// -----------------------------
function animateCards(){

    const cards = document.querySelectorAll(".card");

    cards.forEach((card,index)=>{

        card.style.opacity="0";
        card.style.transform="translateY(30px)";

        setTimeout(()=>{

            card.style.transition="0.5s";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*120);

    });

}

// -----------------------------
// Logout
// -----------------------------
function setupLogout(){

    const logout=document.getElementById("logoutBtn");

    if(!logout) return;

    logout.addEventListener("click",function(e){

        e.preventDefault();

        if(confirm("Logout from Admin Panel?")){

            localStorage.removeItem("akrResident");

            window.location.href="index.html";

        }

    });

}

// -----------------------------
// Future Statistics
// -----------------------------
function updateStatistics(){

    console.log("Statistics will load from Google Sheets");

}
