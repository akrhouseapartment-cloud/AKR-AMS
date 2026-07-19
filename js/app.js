// =====================================
// AKR House Apartment Management System
// Version : v0.1
// File    : app.js
// =====================================

// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

    console.log("AKR AMS Loaded Successfully");

    // Fade animation for cards
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";

        setTimeout(() => {
            card.style.transition = "0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 150);
    });

    // Welcome message
    showGreeting();

});

// Greeting based on time
function showGreeting() {

    const hour = new Date().getHours();

    let greeting = "";

    if (hour < 12) {
        greeting = "🌅 Good Morning!";
    } else if (hour < 17) {
        greeting = "☀️ Good Afternoon!";
    } else if (hour < 21) {
        greeting = "🌇 Good Evening!";
    } else {
        greeting = "🌙 Good Night!";
    }

    console.log(greeting);
}

// Future feature
function showNotification(message) {
    alert(message);
}

// Login
function openLogin() {
    window.location.href = "login.html";
}

// Register
function openRegister() {
    window.location.href = "register.html";
}
