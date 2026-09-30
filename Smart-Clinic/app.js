function getCurrentUser() {
  const userData = localStorage.getItem("currentUser");
  if (!userData) {
    return null;
  }
  return JSON.parse(userData);
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (username === "" || password === "") {
      alert("Please enter your username and password.");
      return;
    }

    const user = {
      fullName: username,
      firstName: username.split(" ")[0],
      role: "patient"
    };

    setCurrentUser(user);
    window.location.href = "home.html";
  });

  const demoButtons = document.querySelectorAll(".auth-demo-btn");
  demoButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const user = {
        fullName: btn.dataset.fullname,
        firstName: btn.dataset.firstname,
        role: btn.dataset.role
      };
      setCurrentUser(user);
      window.location.href = "home.html";
    });
  });
}

function initAppLoadingPage() {
  const loadingPage = document.querySelector(".loading-page");
  if (!loadingPage) return;

  setTimeout(function () {
    const user = getCurrentUser();
    if (user) {
      window.location.href = "home.html";
    } else {
      window.location.href = "welcome.html";
    }
  }, 1500);
}

function initRegisterPage() {
  const registerForm = document.getElementById("registerForm");
  if (!registerForm) return;

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("regFullName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    if (fullName === "" || email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const pendingUser = {
      fullName: fullName,
      firstName: fullName.split(" ")[0],
      email: email,
      role: "patient"
    };

    localStorage.setItem("pendingUser", JSON.stringify(pendingUser));
    window.location.href = "verification.html";
  });
}

function initVerificationPage() {
  const otpBoxes = document.querySelectorAll(".otp-box");
  if (otpBoxes.length === 0) return;

  otpBoxes.forEach(function (box, index) {
    box.addEventListener("input", function () {
      box.value = box.value.replace(/[^0-9]/g, "").slice(0, 1);
      if (box.value && index < otpBoxes.length - 1) {
        otpBoxes[index + 1].focus();
      }
    });

    box.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !box.value && index > 0) {
        otpBoxes[index - 1].focus();
      }
    });
  });

  const keypadKeys = document.querySelectorAll(".keypad-key");
  keypadKeys.forEach(function (key) {
    key.addEventListener("click", function () {
      const value = key.dataset.key;

      if (value === "delete") {
        for (let i = otpBoxes.length - 1; i >= 0; i--) {
          if (otpBoxes[i].value) {
            otpBoxes[i].value = "";
            otpBoxes[i].focus();
            break;
          }
        }
        return;
      }

      if (value === "#*") {
        return;
      }

      for (let i = 0; i < otpBoxes.length; i++) {
        if (!otpBoxes[i].value) {
          otpBoxes[i].value = value;
          otpBoxes[i].focus();
          break;
        }
      }
    });
  });

  const pendingUser = JSON.parse(localStorage.getItem("pendingUser") || "null");
  const contactEl = document.getElementById("verifyContact");
  if (pendingUser && pendingUser.email && contactEl) {
    contactEl.textContent = pendingUser.email;
  }

  const verifyBtn = document.getElementById("verifyBtn");
  if (verifyBtn) {
    verifyBtn.addEventListener("click", function () {
      const code = Array.from(otpBoxes).map(function (b) { return b.value; }).join("");

      if (code.length < 4) {
        alert("Please enter the 4-digit code. (This is a demo - any 4 digits work, since there's no real SMS/email being sent yet.)");
        return;
      }

      const pending = JSON.parse(localStorage.getItem("pendingUser") || "null");
      if (pending) {
        setCurrentUser(pending);
        localStorage.removeItem("pendingUser");
      }
      window.location.href = "home.html";
    });
  }
}

function initForgotPasswordPage() {
  const forgotForm = document.getElementById("forgotForm");
  if (!forgotForm) return;

  forgotForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("If an account exists for this email/phone, a reset link has been sent. (This is a demo - no real message is sent yet.)");
    window.location.href = "login.html";
  });
}

function initHomePage() {
  const welcomeEl = document.getElementById("welcomeMessage");
  if (!welcomeEl) return;

  const user = getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  welcomeEl.textContent = "Welcome, " + user.fullName;
  document.getElementById("profileFirstName").textContent = user.firstName;

  const menuNavBtn = document.getElementById("menuNavBtn");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuCloseBtn = document.getElementById("menuCloseBtn");

  menuNavBtn.addEventListener("click", function () {
    menuOverlay.classList.add("open");
  });

  menuCloseBtn.addEventListener("click", function () {
    menuOverlay.classList.remove("open");
  });

  menuOverlay.addEventListener("click", function (e) {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("open");
    }
  });

  const menuLinks = document.querySelectorAll(".menu-link");
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      alert(link.dataset.label + " is not built yet in this prototype.");
    });
  });
}

function initSearchPage() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const quickButtons = document.querySelectorAll(".quick-btn");
  quickButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      searchInput.value = btn.textContent;
      searchInput.focus();
    });
  });

  const recentItems = document.querySelectorAll(".recent-item");
  recentItems.forEach(function (item) {
    item.addEventListener("click", function () {
      searchInput.value = item.dataset.term;
      searchInput.focus();
    });
  });

  const categoryBoxes = document.querySelectorAll(".category-box");
  categoryBoxes.forEach(function (box) {
    box.addEventListener("click", function () {
      searchInput.value = box.dataset.category;
      searchInput.focus();
    });
  });

  const searchNowBtn = document.getElementById("searchNowBtn");
  if (searchNowBtn) {
    searchNowBtn.addEventListener("click", function () {
      alert("Searching for clinics open near you... (not connected to real data yet)");
    });
  }

  const filterBtn = document.getElementById("filterBtn");
  if (filterBtn) {
    filterBtn.addEventListener("click", function () {
      alert("Filter options are not built yet in this prototype.");
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initAppLoadingPage();
  initLoginPage();
  initRegisterPage();
  initVerificationPage();
  initForgotPasswordPage();
  initHomePage();
  initSearchPage();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("service-worker.js").catch(function (err) {
      console.log("Service worker registration failed:", err);
    });
  });
}
