// ==========================================
// AKR House Apartment Management System
// File : auth.js
// Version : v0.2
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const mobile = document.getElementById("mobile").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        // Mobile validation
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        // Password validation
        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        // Role validation
        if (role === "") {
            alert("Please select your role.");
            return;
        }

        // Temporary login (until Google Sheets integration)
        if (role === "resident") {
            alert("Resident Login Successful");
            window.location.href = "resident.html";
        }

        if (role === "admin") {
            alert("Admin Login Successful");
            window.location.href = "admin.html";
        }

    });

});
