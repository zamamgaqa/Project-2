function openChat(name, image) {
    document.getElementById("chatName").innerText = name;
    document.getElementById("chatProfile").src = image;
    document.getElementById("chatScreen").style.display = "block";
    document.getElementById("mainMessages").style.display = "none";

    const conversations = document.querySelectorAll(".conversation");

    conversations.forEach(function(conversation) {
        if (conversation.dataset.name === name) {
            conversation.classList.remove("unread");

            const unread = conversation.querySelector(".unread-count");

            if (unread) {
                unread.remove();
            }
        }
    });
}

function closeChat() {
    document.getElementById("chatScreen").style.display = "none";
    document.getElementById("mainMessages").style.display = "block";
}

function sendMessage() {
    const input = document.getElementById("messageText");
    const message = input.value.trim();

    if (message === "") {
        alert("Please type a message.");
        return;
    }

    const chatMessages = document.getElementById("chatMessages");
    const messageContainer = document.createElement("div");

    messageContainer.className = "chat-message doctor-message";

    messageContainer.innerHTML = `
        <p>${message}</p>
        <span class="message-time">
            Now ✓✓
        </span>
    `;

    chatMessages.appendChild(messageContainer);

    input.value = "";

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function addEmoji() {
    const input = document.getElementById("messageText");
    input.value += " 😊";
    input.focus();
}

function attachFile() {
    alert("Attachment feature selected.");
}

function startVideoCall() {
    alert("Starting video consultation...");
}

function searchMessages() {
    const input = document.getElementById("searchInput");
    const search = input.value.toLowerCase();

    const conversations = document.querySelectorAll(".conversation");

    let found = false;

    conversations.forEach(function(conversation) {
        const name = conversation.dataset.name.toLowerCase();

        if (name.includes(search)) {
            conversation.style.display = "flex";
            found = true;
        } else {
            conversation.style.display = "none";
        }
    });

    document.getElementById("noResults").style.display =
        found ? "none" : "block";
}

function newMessage() {
    alert("New message screen will open here.");
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