function filterCases(priority, button) {
    const filters = document.querySelectorAll(".filter");

    filters.forEach(function(filter) {
        filter.classList.remove("active");
    });

    button.classList.add("active");

    const cases = document.querySelectorAll(".case");
    let visible = 0;

    cases.forEach(function(caseItem) {
        if (
            priority === "all" ||
            caseItem.dataset.priority === priority
        ) {
            caseItem.style.display = "block";
            visible++;
        } else {
            caseItem.style.display = "none";
        }
    });

    document.getElementById("empty").style.display =
        visible === 0 ? "block" : "none";
}

function viewCase(patient) {
    document.getElementById("popupTitle").innerText = patient;

    document.getElementById("popupMessage").innerText =
        "Emergency case details for " +
        patient +
        ". Review the patient's symptoms, medical history and current emergency status before taking appropriate action.";

    document.getElementById("popup").style.display = "block";
}

function callPatient(patient) {
    document.getElementById("popupTitle").innerText =
        "Calling Patient";

    document.getElementById("popupMessage").innerText =
        "Starting an emergency call with " +
        patient +
        ".";

    document.getElementById("popup").style.display = "block";
}

function resolveCase(button) {
    const confirmResolve = confirm(
        "Are you sure you want to mark this emergency case as resolved?"
    );

    if (confirmResolve) {
        const caseItem = button.closest(".case");

        caseItem.remove();

        updateCaseCount();
    }
}

function updateCaseCount() {
    const cases = document.querySelectorAll(".case");

    document.getElementById("caseCount").innerText =
        cases.length + " Active";

    if (cases.length === 0) {
        document.getElementById("empty").style.display = "block";
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
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

function goProfile() {
    alert("Opening Doctor Profile...");
}