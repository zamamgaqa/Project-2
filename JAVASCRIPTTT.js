function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function setError(inputEl, errorEl, message) {
  if (message) {
    inputEl.classList.add('error');
    errorEl.textContent = message;
    errorEl.classList.add('show');
  } else {
    inputEl.classList.remove('error');
    errorEl.classList.remove('show');
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ---- Login page logic ----
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const usernameErr = document.getElementById('usernameError');
  const passwordErr = document.getElementById('passwordError');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    if (!username.value.trim()) {
      setError(username, usernameErr, 'Username is required');
      valid = false;
    } else {
      setError(username, usernameErr, '');
    }

    if (!password.value) {
      setError(password, passwordErr, 'Password is required');
      valid = false;
    } else if (password.value.length < 6) {
      setError(password, passwordErr, 'Password must be at least 6 characters');
      valid = false;
    } else {
      setError(password, passwordErr, '');
    }

    if (!valid) return;

    // Demo credential check (replace with real API call)
    if (username.value === 'staff' && password.value === 'staff123') {
      showToast('Welcome back, staff!');
    } else if (username.value === 'jane' && password.value === 'jane123') {
      showToast('Welcome back, Jane!');
    } else {
      showToast('Logging in...');
    }
  });
}

// ---- Register page logic ----
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const password = document.getElementById('regPassword');
  const confirmPassword = document.getElementById('confirmPassword');

  const fullNameErr = document.getElementById('fullNameError');
  const emailErr = document.getElementById('emailError');
  const passwordErr = document.getElementById('regPasswordError');
  const confirmErr = document.getElementById('confirmPasswordError');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    if (!fullName.value.trim()) {
      setError(fullName, fullNameErr, 'Full name is required');
      valid = false;
    } else {
      setError(fullName, fullNameErr, '');
    }

    if (!email.value.trim()) {
      setError(email, emailErr, 'Email is required');
      valid = false;
    } else if (!isValidEmail(email.value)) {
      setError(email, emailErr, 'Enter a valid email');
      valid = false;
    } else {
      setError(email, emailErr, '');
    }

    if (!password.value) {
      setError(password, passwordErr, 'Password is required');
      valid = false;
    } else if (password.value.length < 6) {
      setError(password, passwordErr, 'Password must be at least 6 characters');
      valid = false;
    } else {
      setError(password, passwordErr, '');
    }

    if (!confirmPassword.value) {
      setError(confirmPassword, confirmErr, 'Please confirm your password');
      valid = false;
    } else if (confirmPassword.value !== password.value) {
      setError(confirmPassword, confirmErr, 'Passwords do not match');
      valid = false;
    } else {
      setError(confirmPassword, confirmErr, '');
    }

    if (!valid) return;

    showToast('Account created! Redirecting to sign in...');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  });
}

// ---- Forgot Password page logic ----
function initForgotPasswordForm() {
  const form = document.getElementById('forgotForm');
  if (!form) return;

  const contact = document.getElementById('contact');
  const contactErr = document.getElementById('contactError');
  const cancelBtn = document.getElementById('cancelBtn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = contact.value.trim();
    const isEmail = isValidEmail(value);
    const isPhone = /^[0-9+()\-\s]{7,}$/.test(value);

    if (!value) {
      setError(contact, contactErr, 'Email or phone is required');
      return;
    }
    if (!isEmail && !isPhone) {
      setError(contact, contactErr, 'Enter a valid email or phone number');
      return;
    }
    setError(contact, contactErr, '');

    showToast('Reset link sent!');
    setTimeout(() => {
      window.location.href = 'verification.html';
    }, 1200);
  });

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      window.location.href = 'login.html';
    });
  }
}

// ---- Verification page logic ----
function initVerificationPage() {
  const boxes = document.querySelectorAll('.code-box');
  const verifyBtn = document.getElementById('verifyBtn');
  const keys = document.querySelectorAll('.key-btn');
  if (!boxes.length || !verifyBtn) return;

  let activeIndex = 0;

  function focusBox(index) {
    activeIndex = Math.max(0, Math.min(boxes.length - 1, index));
    boxes[activeIndex].focus();
  }

  function setDigit(digit) {
    if (activeIndex >= boxes.length) return;
    boxes[activeIndex].value = digit;
    boxes[activeIndex].classList.remove('error');
    if (activeIndex < boxes.length - 1) {
      focusBox(activeIndex + 1);
    }
  }

  function backspace() {
    if (boxes[activeIndex].value) {
      boxes[activeIndex].value = '';
    } else if (activeIndex > 0) {
      focusBox(activeIndex - 1);
      boxes[activeIndex].value = '';
    }
  }

  boxes.forEach((box, i) => {
    box.addEventListener('focus', () => { activeIndex = i; });

    box.addEventListener('input', function () {
      const val = box.value.replace(/[^0-9]/g, '').slice(-1);
      box.value = val;
      if (val && i < boxes.length - 1) {
        focusBox(i + 1);
      }
    });

    box.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !box.value && i > 0) {
        focusBox(i - 1);
      }
    });
  });

  keys.forEach((key) => {
    key.addEventListener('click', function () {
      const digit = key.getAttribute('data-digit');
      const action = key.getAttribute('data-action');
      if (action === 'backspace') {
        backspace();
      } else if (digit) {
        setDigit(digit);
      }
    });
  });

  verifyBtn.addEventListener('click', function () {
    const code = Array.from(boxes).map(b => b.value).join('');
    let valid = true;

    boxes.forEach((box) => {
      if (!box.value) {
        box.classList.add('error');
        valid = false;
      }
    });

    if (!valid) {
      showToast('Please enter the full code');
      return;
    }

    showToast('Verifying code...');
  });

  focusBox(0);
}

document.addEventListener('DOMContentLoaded', function () {
  initLoginForm();
  initRegisterForm();
  initForgotPasswordForm();
  initVerificationPage();
  initSplash();
  initMenuSheet();
  initTabs();
  initBookingForm();
  initToggleGroups();
  initChipToggles();
});

// ---- Splash auto redirect ----
function initSplash() {
  const splash = document.getElementById('splashScreen');
  if (!splash) return;
  setTimeout(() => {
    window.location.href = 'welcome.html';
  }, 1800);
}

// ---- Menu bottom sheet (shared across app pages) ----
function initMenuSheet() {
  const overlay = document.getElementById('menuSheetOverlay');
  const openBtn = document.getElementById('menuNavBtn');
  const closeBtn = document.getElementById('closeMenuSheet');
  if (!overlay || !openBtn) return;

  openBtn.addEventListener('click', function (e) {
    e.preventDefault();
    overlay.classList.add('show');
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) overlay.classList.remove('show');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => overlay.classList.remove('show'));
  }
}

// ---- Tabs (Upcoming / Past, etc.) ----
function initTabs() {
  const tabGroups = document.querySelectorAll('.tabs');
  tabGroups.forEach((group) => {
    const buttons = group.querySelectorAll('.tab-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', function () {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.getAttribute('data-target');
        if (!target) return;
        document.querySelectorAll('.tab-panel').forEach((panel) => {
          panel.style.display = panel.id === target ? '' : 'none';
        });
      });
    });
  });
}

// ---- Generic toggle groups (e.g. gender selector) ----
function initToggleGroups() {
  document.querySelectorAll('.toggle-row').forEach((row) => {
    const buttons = row.querySelectorAll('.toggle-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', function () {
        buttons.forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  });
}

// ---- Chip toggles (search filters) ----
function initChipToggles() {
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', function () {
      chip.classList.toggle('selected');
    });
  });
}

// ---- Booking form: calendar + time slots ----
function initBookingForm() {
  const calendarEl = document.getElementById('calendarGrid');
  if (!calendarEl) return;

  const monthLabel = document.getElementById('monthLabel');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');
  const timeSlots = document.querySelectorAll('.time-slot');
  const confirmBtn = document.getElementById('confirmBookingBtn');
  const cancelBtn = document.getElementById('cancelBookingBtn');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let current = new Date(2026, 3, 1); // April 2026, matches mockup
  let selectedDay = 28;

  function renderCalendar() {
    calendarEl.innerHTML = '';
    monthLabel.textContent = months[current.getMonth()];

    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((d) => {
      const head = document.createElement('div');
      head.className = 'cal-head';
      head.textContent = d;
      calendarEl.appendChild(head);
    });

    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1);
    let startOffset = (firstDay.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    for (let i = 0; i < startOffset; i++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'cal-day other-month';
      dayEl.textContent = daysInPrevMonth - startOffset + i + 1;
      calendarEl.appendChild(dayEl);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'cal-day';
      dayEl.textContent = d;
      if (d === selectedDay) dayEl.classList.add('selected');
      dayEl.addEventListener('click', function () {
        selectedDay = d;
        renderCalendar();
      });
      calendarEl.appendChild(dayEl);
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => {
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    current.setMonth(current.getMonth() + 1);
    renderCalendar();
  });

  timeSlots.forEach((slot) => {
    slot.addEventListener('click', function () {
      timeSlots.forEach((s) => s.classList.remove('selected'));
      slot.classList.add('selected');
    });
  });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', function () {
      showToast('Booking confirmed!');
      setTimeout(() => {
        window.location.href = 'confirm-appointment.html';
      }, 900);
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      window.location.href = 'appointments.html';
    });
  }

  renderCalendar();
}