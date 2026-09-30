<?php

$host     = "localhost";
$dbname   = "smart_clinic";
$username = "root";
$password = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage() .
        "<br>Check that MySQL is running in XAMPP, and that you have " .
        "imported database/smart_clinic_schema.sql in phpMyAdmin.");
}
