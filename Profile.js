function toggleAvailability() {
    const toggle = document.getElementById("availabilityToggle");
    const text = document.getElementById("availabilityText");
    const dot = document.getElementById("statusDot");

    toggle.classList.toggle("off");

    if (toggle.classList.contains("off")) {
        text.innerText = "Currently unavailable";
        dot.style.background = "#e53935";
    } else {
        text.innerText = "Available for consultations";
        dot.style.background = "#2eaa58";
    }
}

function changePhoto() {
    alert("Profile photo selection opened.");
}

function editProfile() {
    document.getElementById("editPopup").style.display = "block";
}

function saveProfile() {
    const name = document.getElementById("doctorName").value;
    const speciality = document.getElementById("speciality").value;

    if (name === "" || speciality === "") {
        alert("Please complete your profile.");
        return;
    }

    document.querySelector(".profile-section h3").innerText = name;
    document.querySelector(".profile-section p").innerText = speciality;

    closePopup();

    alert("Profile updated successfully!");
}

function closePopup() {
    document.getElementById("editPopup").style.display = "none";
}

function professionalInfo() {
    alert("Professional information settings opened.");
}

function securitySettings() {
    alert("Security settings opened.");
}

function notificationSettings() {
    alert("Notification settings opened.");
}

function languageSettings() {
    alert("Language settings opened.");
}

function privacySettings() {
    alert("Privacy settings opened.");
}

function logout() {
    const confirmLogout = confirm(
        "Are you sure you want to log out?"
    );

    if (confirmLogout) {
        alert("You have been logged out.");
    }
}

function goBack() {
    alert("Returning to Doctor Dashboard...");
}

function goHome() {
    alert("Opening Doctor Dashboard...");
}

function goAppointments() {
    alert("Opening Appointments...");
}

function goMessages() {
    alert("Opening Messages...");
}