
function selectDay(day, date) {

    const days = document.querySelectorAll(".day");

    days.forEach(function(item) {
        item.classList.remove("active");
    });

    day.classList.add("active");

    document.getElementById("selectedDay").innerText = date;
}


function openAddSlot() {

    document.getElementById("popup").style.display = "block";
}

function closePopup() {

    document.getElementById("popup").style.display = "none";


function addSlot() {

    const start = document.getElementById("startTime").value;

    const end = document.getElementById("endTime").value;

    if (start === "" || end === "") {

        alert("Please select a start and end time.");

        return;
    }

    if (start >= end) {

        alert("End time must be after start time.");

        return;
    }

    const slots = document.getElementById("slots");

    const slot = document.createElement("div");

    slot.className = "slot";

    slot.innerHTML = `

        <div class="slot-left">

            <div class="slot-icon">
                🕘
            </div>

            <div>

                <div class="slot-time">
                    ${formatTime(start)} - ${formatTime(end)}
                </div>

                <div class="slot-status available">
                    ● Available
                </div>

            </div>

        </div>


        <button
            class="delete"
            onclick="deleteSlot(this)">
            🗑
        </button>

    `;

    slots.appendChild(slot);

    closePopup();

    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";

    alert("Availability added successfully!");
}

function formatTime(time) {

    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return hours + ":" + minutes + " " + ampm;
}

function deleteSlot(button) {

    const confirmDelete = confirm(
        "Remove this availability slot?"
    );

    if (confirmDelete) {

        button.parentElement.remove();
    }
}

function goBack() {

    alert("Returning to Doctor Dashboard...");
}

function goHome() {

    alert("Opening Doctor Dashboard...");
}

function goMessages() {

    alert("Opening Messages...");
}

function goProfile() {

    alert("Opening Doctor Profile...");
}
}