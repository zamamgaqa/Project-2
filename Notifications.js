function updateCount() {
    const unread = document.querySelectorAll(".notification.unread").length;
    const count = document.getElementById("notificationCount");

    count.innerText = unread;

    if (unread === 0) {
        count.style.display = "none";
    } else {
        count.style.display = "flex";
    }
}

function markRead(notification) {
    if (notification.classList.contains("unread")) {
        notification.classList.remove("unread");

        const dot = notification.querySelector(".unread-dot");

        if (dot) {
            dot.remove();
        }

        updateCount();
    }
}

function markAllRead() {
    const notifications = document.querySelectorAll(".notification.unread");

    notifications.forEach(function(notification) {
        notification.classList.remove("unread");

        const dot = notification.querySelector(".unread-dot");

        if (dot) {
            dot.remove();
        }
    });

    updateCount();

    alert("All notifications marked as read.");
}

function deleteNotification(event, button) {
    event.stopPropagation();

    const notification = button.parentElement;

    notification.remove();

    updateCount();

    checkEmpty();
}

function filterNotifications(type, button) {
    const filters = document.querySelectorAll(".filter");

    filters.forEach(function(filter) {
        filter.classList.remove("active");
    });

    button.classList.add("active");

    const notifications = document.querySelectorAll(".notification");

    notifications.forEach(function(notification) {
        if (
            type === "all" ||
            notification.dataset.type === type
        ) {
            notification.style.display = "flex";
        } else {
            notification.style.display = "none";
        }
    });
}

function checkEmpty() {
    const notifications = document.querySelectorAll(".notification");
    const empty = document.getElementById("empty");

    if (notifications.length === 0) {
        empty.style.display = "block";
    } else {
        empty.style.display = "none";
    }
}

function goBack() {
    alert("Returning to Doctor Dashboard...");
}

function goToDashboard() {
    alert("Opening Doctor Dashboard...");
}

function goToAppointments() {
    alert("Opening Appointments...");
}

function goToProfile() {
    alert("Opening Doctor Profile...");
}

updateCount();