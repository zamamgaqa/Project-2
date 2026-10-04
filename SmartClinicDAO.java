
package com.smartclinicsystem.smartapp.dao;

import com.smartclinicsystem.smartapp.domain.Patient;
import com.smartclinicsystem.smartapp.domain.Appointment;
import com.smartclinicsystem.smartapp.connection.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.swing.JOptionPane;

/**
 *
 * @author 240292243
 */
public class SmartClinicDAO {
  
    
    private Connection con;
    private Statement stmt;
    
    
    public SmartClinicDAO(){
    
        
        try {
            con = DBConnection.derbyConnection();
            System.out.println("Connection successfully");
            
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null,"Connection has failed\n"+ex.getMessage());
        }
    
       
    }
    
 
    //Login
    public boolean login(String username, String password){
            String sql="SELECT * FROM users WHERE username=? AND password=?";
            try{PreparedStatement pstmt = con.prepareStatement(sql);
                pstmt.setString(1,username);
                pstmt.setString(2,password);   
                ResultSet rs = pstmt.executeQuery();
                if(rs.next()) {
                return true;
         }}catch (SQLException ex) {
         JOptionPane.showMessageDialog(null, "The is an error try again"+ex.getMessage());
        } return false;     
    }
    
    
    //check username of the user
    public boolean usernameExists(String username){
        String sql=" SELECT id  FROM users WHERE username=?";
        try(
            PreparedStatement pstmt = con.prepareStatement(sql)){
                 pstmt.setString(1,username);
                 ResultSet rs = pstmt.executeQuery();
                 return rs.next();
           
    }   catch (SQLException ex) {
        JOptionPane.showMessageDialog(null,"The is an sql error here:"+ex.getMessage());
    }   
        return false;
    }
    
        //Register patient
    public long registerPat(String fullName,String email, String dob,String gender,String phoneNumber,String password){
        String userSQL=" INSERT INTO users "+
                "(username,password,role,display_name)"+
                "VALUES(?,?,?,?)";
        String patientSQL="INSERT INTO patients "+
                "(user_id,full_name,dob,gender,phone_number,email)"+
                "VALUES(?,?,?,?,?,?)";
          try{con.setAutoCommit(false);
           long userId;
                                                                                                                                             //To create any form for the user here
            try(PreparedStatement userStmt = con.prepareStatement(userSQL, Statement.RETURN_GENERATED_KEYS)){
               userStmt.setString(1,email);
                userStmt.setString(2,password);
                userStmt.setString(3,"patient");
                userStmt.setString(4,fullName);
                userStmt.executeUpdate();
                ResultSet keys= userStmt.getGeneratedKeys();
                   if(!keys.next()){
                       con.rollback();
                       return -1; }
                userId = keys.getLong(1);
                                                                                                                                                //To create patient form to be able to create a patient account
                try(PreparedStatement pstmt = con.prepareStatement(patientSQL)){
                    pstmt.setLong(1, userId);
                     pstmt.setString(2, fullName);
                     pstmt.setString(3, dob);
                     pstmt.setString(4, gender);
                     pstmt.setString(5, phoneNumber);
                     pstmt.setString(6, email);
                     pstmt.executeUpdate();  
                }con.commit();
                return userId;
      }}catch(SQLException ex){
          try{con.rollback();      
          }catch(SQLException rollBackException){
              rollBackException.printStackTrace();
          }
          JOptionPane.showMessageDialog(null, "The is an error when trying to register"+ex.getMessage());
        }return -1;
    }
 
        //create staff user(DOCTOR/ADMIN)
    
    public long createStaffUser(String username,String password,String role,String displayName){
        String sql=" INSERT INTO users (username,password,role,display_name) VALUES(?,?,?,?)";
        
        try(
             PreparedStatement pstmt = con.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS)){
             pstmt.setString(1,username); 
             pstmt.setString(2,password);
             pstmt.setString(3,role);
             pstmt.setString(4,displayName);
             pstmt.executeUpdate();
             
             ResultSet keys = pstmt.getGeneratedKeys();
             if(keys.next()){
                 return keys.getLong(1);   
             }
             } catch (SQLException ex){
                     JOptionPane.showMessageDialog(null,"The is an error staff"+ex.getMessage());
             }
             return -1;  
        }
    
    //READ /get all or retrive all patient
  public List<Patient> getAllPatients(){
      List<Patient> list = new ArrayList<>();
      String sql =" SELECT id,full_name,dob,"+
              "gender,phone_number,email FROM patients ORDER BY full_name ASC";
      
      
      try(
          PreparedStatement pstmt = con.prepareStatement(sql);
          ResultSet rs = pstmt.executeQuery()){
          
        while(rs.next()){
            Patient patient = new Patient(
                    rs.getInt("id"), 
                    rs.getString("full_name"),
                    rs.getString("dob"),
                    rs.getString("gender"),
                    rs.getString("phone_number"),
                    rs.getString("email"));
            list.add(patient);
        }
      
  }catch(SQLException ex){
     JOptionPane.showMessageDialog(null,"The is an error can't get patients"+ex.getMessage());
  }
      return list;
}
    
//retrive SIGNLE patient by USER ID
public Patient getPatientById(int patientId){
    String sql= "SELECT id,full_name,dob,"+
                "gender,phone_number,email "+
            "FROM patients "+
            "WHERE id=?";
     
    try(PreparedStatement pstmt = con.prepareStatement(sql)){
        pstmt.setInt(1,patientId);
        
      try(ResultSet rs = pstmt.executeQuery()){
        
        if(rs.next()){
          return new Patient(
            rs.getInt("id"),
            rs.getString("full_name"),
            rs.getString("dob"),
            rs.getString("gender"),
            rs.getString("phone_number"),
            rs.getString("email"));
        }}
    } catch(SQLException ex){
        JOptionPane.showMessageDialog(null,"The is an error for patient"+ ex.getMessage());
    }  return null;
}    
      
//Update patient
public int updatePatient(int patientId,String fullName,String dob,String gender,String phoneNumber){
  String sql = " UPDATE patients SET full_name=?,dob=?,gender=?,phone_number=?"+
               " WHERE id=?";

   try(
        PreparedStatement pstmt = con.prepareStatement(sql)){
       pstmt.setString(1 ,fullName);
       pstmt.setString(2 ,dob);
       pstmt.setString(3 ,gender);
       pstmt.setString(4 ,phoneNumber);
       pstmt.setInt (5 ,patientId);
       
       return pstmt.executeUpdate();
       
   }catch(SQLException ex){
       JOptionPane.showConfirmDialog(null,"The is an error when updating patient"+ ex.getMessage());
   } return 0;
}
    
 //create appointment
public long createAppointment(int patientId,int doctorsId,String doctorsName,String category,String date,String time,String reason){
    String sql = " INSERT INTO appointments" 
           +" (patient_id,doctors_id,doctors_name,category,"
           +" appointment_date,appointment_time,reason,status)"
           + " VALUES(?,?,?,?,?,?,?,?)";
            try(PreparedStatement pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
              pstmt.setInt( 1,patientId);
              pstmt.setInt(2,doctorsId);
              pstmt.setString(3,doctorsName);
              pstmt.setString(4,category);
              pstmt.setString(5,date);
              pstmt.setString(6,time);
              pstmt.setString(7,reason);
              pstmt.setString(8,"Upcoming");
              pstmt.executeUpdate();
              ResultSet keys = pstmt.getGeneratedKeys();        
              if(keys.next()){
             return keys.getLong(1);
    }}catch(SQLException ex){
       JOptionPane.showMessageDialog(null,"The is an error when creating an appointment"+ex.getMessage());
    }
    return -1;  
}    
    
    
 //all appointments = READ
public List<Appointment> getAllApp(){
    return queryAp(null,null);
}   
    
    
 //patient appointments
public List<Appointment> getAppointmentsForPatient(int patientId){
    return queryAp("patient_id=?", new Object[]{patientId});
}   
    
 //doctos appointments
public List<Appointment> getAppointmentsForDoctor(int doctorsId, String status){
    return queryAp("doctors_id=? AND status =?", new Object[]{doctorsId,status});
}   
    
 

//query appointment
private List<Appointment> queryAp(String where, Object[]data){
    List<Appointment> list = new ArrayList<>();
    String sql =" SELECT * FROM appointments";
    if(where != null && !where.trim().isEmpty()){
        sql += " WHERE " +where;
    }
    sql += " ORDER BY appointment_date DESC";
  
    try( PreparedStatement pstmt = con.prepareStatement(sql)){
        
        if(data != null){
            for(int i = 0; i < data.length;i++){
                    pstmt.setObject(i+1, data[i]);
            }
        }
        ResultSet rs = pstmt.executeQuery();
        
              while(rs.next()){
                  
                  Appointment appointment = new Appointment(
                  rs.getInt("appointment_id"),
                  rs.getInt("patient_id"),
                  rs.getInt("doctors_id"),
                  rs.getString("doctors_name"),
                  rs.getString("category"),
                  rs.getString("appointment_date"),
                  rs.getString("appointment_time"),
                  rs.getString("reason"),
                  rs.getString("status")
                
     );
                          list.add(appointment);
    }
                
    }catch(SQLException ex){
        JOptionPane.showConfirmDialog(null,"The is an error while you were searching"+ex.getMessage(), "The is an error while your we searcing",+JOptionPane.ERROR_MESSAGE);
    }
    return list;
}
    
//update appointment status
public int updateAppointmentStatus(int appointmentId,String newStatus){
    String sql ="UPDATE appointments SET status=? WHERE appointment_id=?";
    
try(PreparedStatement pstmt = con.prepareStatement(sql)){
                    pstmt.setString(1,newStatus);
                    pstmt.setInt(2,appointmentId); 
               return pstmt.executeUpdate();                    
}   catch (SQLException ex) {
         JOptionPane.showMessageDialog(null,"Try again updating appointment has failed"+ex.getMessage());
}
    return 0;
     }    
    
 //delete appointment
public int deleteAppointmentRow(int appointmentId){
    String sql =" DELETE FROM appointments WHERE appointment_id =?";
    
   try(PreparedStatement pstmt =con.prepareStatement(sql)){
                     pstmt.setInt(1,appointmentId);
                  return pstmt.executeUpdate();
   } catch(SQLException ex){
           JOptionPane.showMessageDialog(null,"Try again deleting appointment has failed"+ex.getMessage());
   }  
           return 0;
}    

    public long Appointments(int patientId, double d) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

   

    

 
}

