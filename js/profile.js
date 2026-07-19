document.addEventListener("DOMContentLoaded", () => {

const user = JSON.parse(localStorage.getItem("akrResident"));

if(!user) return;

document.getElementById("residentName").textContent = user.name || "-";
document.getElementById("flatNumber").textContent = user.flat || "-";
document.getElementById("mobile").textContent = user.mobile || "-";
document.getElementById("email").textContent = user.email || "-";
document.getElementById("vehicle").textContent = user.vehicle || "-";

});
