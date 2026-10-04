
package com.smartclinicsystem.smartapp.domain;

/**
 *
 * @author bonan
 */
public class Appointment {
  public int appointmentId;
  public int patientId;
  private int doctorsId;
  public String doctorsName;
  public String category;
  public String date;
  public String time;
  private String reason;
  public String status;

    public Appointment() {
    }

    public Appointment(int appointmentId, int patientId, int doctorsId, String doctorsName, String category, String date, String time, String reason, String status) {
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.doctorsId = doctorsId;
        this.doctorsName = doctorsName;
        this.category = category;
        this.date = date;
        this.time = time;
        this.reason = reason;
        this.status = status;
    }

    public int getAppointmentId() {
        return appointmentId;
    }

    public int getPatientId() {
        return patientId;
    }

    public int getDoctorsId() {
        return doctorsId;
    }

    public String getDoctorsName() {
        return doctorsName;
    }

    public String getCategory() {
        return category;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public String getReason() {
        return reason;
    }

    public String getStatus() {
        return status;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public void setDoctorsId(int doctorsId) {
        this.doctorsId = doctorsId;
    }

    public void setDoctorsName(String doctorsName) {
        this.doctorsName = doctorsName;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Appointment{" + "appointmentId=" + appointmentId + ", patientId=" + patientId + ", doctorsId=" + doctorsId + ", doctorsName=" + doctorsName + ", category=" + category + ", date=" + date + ", time=" + time + ", reason=" + reason + ", status=" + status + '}';
    }
  
  
    
    
    
    
    
    
    
    
    
}
