function login() {

    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value.trim();

    if (mobile === "") {
        alert("Please enter Mobile Number");
        return;
    }

    if (password === "") {
        alert("Please enter Password");
        return;
    }

    alert("Login Successful!");

    window.location.href = "resident.html";
}
