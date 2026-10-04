
package com.smartclinicsystem.smartapp.domain;

/**
 *
 * @author bonan
 */
public class Patient {
  
    public int patientId;
    public String fullName;
    public String dob;
    public String gender;
    public String phoneNumber;
    public String email;

    public Patient() {
    }

    public Patient(int patientId, String fullName, String dob, String gender, String phoneNumber, String email) {
        this.patientId = patientId;
        this.fullName = fullName;
        this.dob = dob;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public int getPatientId() {
        return patientId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getDob() {
        return dob;
    }

    public String getGender() {
        return gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Patient{" + "patientId=" + patientId + ", fullName=" + fullName + ", dob=" + dob + ", gender=" + gender + ", phoneNumber=" + phoneNumber + ", email=" + email + '}';
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
