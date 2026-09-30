CREATE DATABASE IF NOT EXISTS smart_clinic;
USE smart_clinic;

CREATE TABLE clinics (
    clinic_id       INT AUTO_INCREMENT PRIMARY KEY,
    clinic_name     VARCHAR(150) NOT NULL,
    location        VARCHAR(255) NOT NULL,
    contact_info    VARCHAR(100) NOT NULL,
    opening_time    TIME NOT NULL DEFAULT '08:00:00',
    closing_time    TIME NOT NULL DEFAULT '16:00:00',
    daily_capacity  INT NOT NULL DEFAULT 50,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
    department_id   INT AUTO_INCREMENT PRIMARY KEY,
    clinic_id       INT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id)
);

CREATE TABLE patients (
    patient_id      INT AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(150) NOT NULL,
    contact_number  VARCHAR(20) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    is_blocked      BOOLEAN NOT NULL DEFAULT FALSE,
    blocked_until   DATE NULL,
    registered_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE staff (
    staff_id        INT AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(150) NOT NULL,
    username        VARCHAR(50) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    role            ENUM('Admin', 'Doctor', 'Nurse', 'Receptionist') NOT NULL,
    clinic_id       INT NOT NULL,
    department_id   INT NULL,
    added_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE appointments (
    appointment_id   INT AUTO_INCREMENT PRIMARY KEY,
    patient_id       INT NOT NULL,
    clinic_id        INT NOT NULL,
    staff_id         INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    reason           VARCHAR(255) NOT NULL,
    status           ENUM('Booked', 'Cancelled', 'Completed', 'No-show') NOT NULL DEFAULT 'Booked',
    follow_up_of     INT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
    FOREIGN KEY (follow_up_of) REFERENCES appointments(appointment_id),

    UNIQUE KEY no_double_booking (staff_id, appointment_date, appointment_time)
);

CREATE TABLE patient_records (
    record_id          INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id      INT NOT NULL,
    patient_id          INT NOT NULL,
    staff_id             INT NOT NULL,
    staff_title          VARCHAR(50) NOT NULL,
    note_text            TEXT NOT NULL,
    original_record_id   INT NULL,
    created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
    FOREIGN KEY (original_record_id) REFERENCES patient_records(record_id)
);

CREATE TABLE audit_log (
    log_id              INT AUTO_INCREMENT PRIMARY KEY,
    staff_id             INT NOT NULL,
    accessed_patient_id  INT NOT NULL,
    action_type           VARCHAR(50) NOT NULL,
    purpose                VARCHAR(255) NULL,
    accessed_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
    FOREIGN KEY (accessed_patient_id) REFERENCES patients(patient_id)
);

INSERT INTO clinics (clinic_name, location, contact_info, opening_time, closing_time)
VALUES ('District 6 Clinic', 'Cape Town', '021 555 1234', '08:00:00', '16:00:00');

INSERT INTO departments (clinic_id, department_name)
VALUES (1, 'Dental'), (1, 'Mental Health'), (1, 'Optic'), (1, 'Cardio');

INSERT INTO staff (full_name, username, password_hash, role, clinic_id, department_id)
VALUES ('Dr John Smith', 'drjohnsmith', '$2y$10$examplehashexamplehashexamplehas', 'Doctor', 1, 1);

INSERT INTO patients (full_name, contact_number, email, password_hash)
VALUES ('Mrs Smith', '0821234567', 'mrssmith@example.com', '$2y$10$examplehashexamplehashexamplehas');
