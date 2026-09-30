<?php

require "db_connect.php";

$errorMessage = "";
$successMessage = "";

if (isset($_GET["action"]) && $_GET["action"] === "delete" && isset($_GET["id"])) {
    $stmt = $pdo->prepare("DELETE FROM appointments WHERE appointment_id = ?");
    $stmt->execute([$_GET["id"]]);
    $successMessage = "Appointment #" . htmlspecialchars($_GET["id"]) . " was deleted.";
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["add_appointment"])) {
    try {
        $stmt = $pdo->prepare(
            "INSERT INTO appointments
                (patient_id, clinic_id, staff_id, appointment_date, appointment_time, reason, status)
             VALUES (?, ?, ?, ?, ?, ?, 'Booked')"
        );
        $stmt->execute([
            $_POST["patient_id"],
            $_POST["clinic_id"],
            $_POST["staff_id"],
            $_POST["appointment_date"],
            $_POST["appointment_time"],
            $_POST["reason"]
        ]);
        $successMessage = "New appointment was added.";
    } catch (PDOException $e) {
        $errorMessage = "Could not add appointment: " . $e->getMessage();
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["update_appointment"])) {
    $stmt = $pdo->prepare(
        "UPDATE appointments
         SET appointment_date = ?, appointment_time = ?, status = ?, reason = ?
         WHERE appointment_id = ?"
    );
    $stmt->execute([
        $_POST["appointment_date"],
        $_POST["appointment_time"],
        $_POST["status"],
        $_POST["reason"],
        $_POST["appointment_id"]
    ]);
    $successMessage = "Appointment #" . htmlspecialchars($_POST["appointment_id"]) . " was updated.";
}

$appointments = $pdo->query(
    "SELECT a.appointment_id, a.appointment_date, a.appointment_time,
            a.reason, a.status,
            p.full_name AS patient_name,
            s.full_name AS staff_name,
            c.clinic_name
     FROM appointments a
     JOIN patients p ON a.patient_id = p.patient_id
     JOIN staff s ON a.staff_id = s.staff_id
     JOIN clinics c ON a.clinic_id = c.clinic_id
     ORDER BY a.appointment_date, a.appointment_time"
)->fetchAll();

$patients = $pdo->query("SELECT patient_id, full_name FROM patients")->fetchAll();
$staffList = $pdo->query("SELECT staff_id, full_name FROM staff")->fetchAll();
$clinics = $pdo->query("SELECT clinic_id, clinic_name FROM clinics")->fetchAll();

$editingAppointment = null;
if (isset($_GET["action"]) && $_GET["action"] === "edit" && isset($_GET["id"])) {
    $stmt = $pdo->prepare("SELECT * FROM appointments WHERE appointment_id = ?");
    $stmt->execute([$_GET["id"]]);
    $editingAppointment = $stmt->fetch();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Appointments - Database Test Page</title>
    <style>
        body { font-family: Arial, sans-serif; background: #F5F6FA; padding: 24px; color: #1E1E2D; }
        h1 { color: #574FD6; }
        .message { padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-size: 14px; }
        .success { background: #E3F9E5; color: #1B7B2E; }
        .error { background: #FDE8E8; color: #C0392B; }
        table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; margin-bottom: 30px; }
        th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #E4E4F0; font-size: 13px; }
        th { background: #6C63FF; color: #fff; }
        a.action-link { color: #0088FF; text-decoration: none; margin-right: 10px; font-weight: 600; }
        a.action-link.delete { color: #E74C3C; }
        form.card { background: #fff; padding: 18px; border-radius: 12px; max-width: 420px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        form.card label { display: block; font-size: 12px; font-weight: 600; margin-top: 10px; margin-bottom: 4px; }
        form.card input, form.card select { width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid #E4E4F0; font-size: 13px; }
        form.card button { margin-top: 16px; background: #6C63FF; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .status-Booked { color: #0088FF; font-weight: 600; }
        .status-Cancelled { color: #E74C3C; font-weight: 600; }
        .status-Completed { color: #1B7B2E; font-weight: 600; }
        .status-No-show { color: #999; font-weight: 600; }
    </style>
</head>
<body>

    <h1>Appointments - Database Test Page</h1>
    <p>This page talks directly to the <code>appointments</code> table in MySQL. Use it to add, edit, and delete real rows, and take your screenshots here.</p>

    <?php if ($successMessage): ?>
        <div class="message success"><?= htmlspecialchars($successMessage) ?></div>
    <?php endif; ?>

    <?php if ($errorMessage): ?>
        <div class="message error"><?= htmlspecialchars($errorMessage) ?></div>
    <?php endif; ?>

    <h2>All Appointments (READ)</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Staff</th>
            <th>Clinic</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
        <?php foreach ($appointments as $appt): ?>
        <tr>
            <td><?= $appt["appointment_id"] ?></td>
            <td><?= htmlspecialchars($appt["patient_name"]) ?></td>
            <td><?= htmlspecialchars($appt["staff_name"]) ?></td>
            <td><?= htmlspecialchars($appt["clinic_name"]) ?></td>
            <td><?= $appt["appointment_date"] ?></td>
            <td><?= substr($appt["appointment_time"], 0, 5) ?></td>
            <td><?= htmlspecialchars($appt["reason"]) ?></td>
            <td class="status-<?= $appt["status"] ?>"><?= $appt["status"] ?></td>
            <td>
                <a class="action-link" href="appointments.php?action=edit&amp;id=<?= $appt["appointment_id"] ?>">Edit</a>
                <a class="action-link delete" href="appointments.php?action=delete&amp;id=<?= $appt["appointment_id"] ?>"
                   onclick="return confirm('Delete this appointment?');">Delete</a>
            </td>
        </tr>
        <?php endforeach; ?>
        <?php if (count($appointments) === 0): ?>
        <tr><td colspan="9">No appointments yet - add one below.</td></tr>
        <?php endif; ?>
    </table>

    <?php if ($editingAppointment): ?>
        <h2>Update Appointment #<?= $editingAppointment["appointment_id"] ?> (UPDATE)</h2>
        <form class="card" method="POST" action="appointments.php">
            <input type="hidden" name="appointment_id" value="<?= $editingAppointment["appointment_id"] ?>" />

            <label>Date</label>
            <input type="date" name="appointment_date" value="<?= $editingAppointment["appointment_date"] ?>" required />

            <label>Time</label>
            <input type="time" name="appointment_time" value="<?= substr($editingAppointment["appointment_time"], 0, 5) ?>" required />

            <label>Reason</label>
            <input type="text" name="reason" value="<?= htmlspecialchars($editingAppointment["reason"]) ?>" required />

            <label>Status</label>
            <select name="status">
                <?php foreach (["Booked", "Cancelled", "Completed", "No-show"] as $statusOption): ?>
                    <option value="<?= $statusOption ?>" <?= $editingAppointment["status"] === $statusOption ? "selected" : "" ?>>
                        <?= $statusOption ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <button type="submit" name="update_appointment">Save Changes</button>
        </form>
    <?php endif; ?>

    <h2>Book a New Appointment (CREATE)</h2>
    <form class="card" method="POST" action="appointments.php">
        <label>Patient</label>
        <select name="patient_id" required>
            <?php foreach ($patients as $p): ?>
                <option value="<?= $p["patient_id"] ?>"><?= htmlspecialchars($p["full_name"]) ?></option>
            <?php endforeach; ?>
        </select>

        <label>Staff Member</label>
        <select name="staff_id" required>
            <?php foreach ($staffList as $s): ?>
                <option value="<?= $s["staff_id"] ?>"><?= htmlspecialchars($s["full_name"]) ?></option>
            <?php endforeach; ?>
        </select>

        <label>Clinic</label>
        <select name="clinic_id" required>
            <?php foreach ($clinics as $c): ?>
                <option value="<?= $c["clinic_id"] ?>"><?= htmlspecialchars($c["clinic_name"]) ?></option>
            <?php endforeach; ?>
        </select>

        <label>Date</label>
        <input type="date" name="appointment_date" required />

        <label>Time</label>
        <input type="time" name="appointment_time" required />

        <label>Reason</label>
        <input type="text" name="reason" placeholder="e.g. Check-up" required />

        <button type="submit" name="add_appointment">Add Appointment</button>
    </form>

</body>
</html>
