
package com.smartclinicsystem.smartapp.domain;

/**
 *
 * @author bonan
 */
public class LoggedInUser {   
public int userId;
    public String role;
    public String displayName;
        public LoggedInUser(int userId, String role, String displayName) {
            this.userId = userId;
            this.role = role;
            this.displayName = displayName; 
        }
    }  

