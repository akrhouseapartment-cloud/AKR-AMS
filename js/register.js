
// ==========================================
// AKR House Apartment Management System
// File : register.js
// Version : v0.3
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullName = document.getElementById("fullname").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const email = document.getElementById("email").value.trim();
        const flat = document.getElementById("flat").value;
        const residentType = document.getElementById("residentType").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (fullName.length < 3) {
            alert("Please enter your full name.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            alert("Enter a valid 10-digit mobile number.");
            return;
        }

        if (!email.includes("@")) {
            alert("Enter a valid email address.");
            return;
        }

        if (flat === "") {
            alert("Please select your flat number.");
            return;
        }

        if (residentType === "") {
            alert("Please select Resident Type.");
            return;
        }

        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Temporary local storage
        const resident = {
            fullName,
            mobile,
            email,
            flat,
            residentType
        };

        localStorage.setItem("akrResident", JSON.stringify(resident));

        alert("Registration Successful!\nYour account will be approved by the Admin.");

        window.location.href = "login.html";

    });

});
