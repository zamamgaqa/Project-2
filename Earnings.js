function changePeriod(period, button) {
    const filters = document.querySelectorAll(".filter");

    filters.forEach(function(filter) {
        filter.classList.remove("active");
    });

    button.classList.add("active");

    const earnings = document.getElementById("totalEarnings");
    const chartPeriod = document.getElementById("chartPeriod");

    if (period === "Today") {
        earnings.innerText = "R1,250";
        chartPeriod.innerText = "Today";
    } 
    else if (period === "This Week") {
        earnings.innerText = "R6,850";
        chartPeriod.innerText = "This Week";
    } 
    else if (period === "This Month") {
        earnings.innerText = "R24,850";
        chartPeriod.innerText = "August 2026";
    } 
    else if (period === "This Year") {
        earnings.innerText = "R185,600";
        chartPeriod.innerText = "2026";
    }
}

function downloadReport() {
    document.getElementById("popup").style.display = "block";
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