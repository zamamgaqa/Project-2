
package com.smartclinicsystem.smartapp.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author 240292243 
 */
public class DBConnection {
    
    public static Connection derbyConnection()throws SQLException{
        String DATABASE_URL = "jdbc:derby://localhost:1527/clinicDatabase";
        String username = "Root";
        String password = "password";
        
        Connection connection = DriverManager.getConnection(
                                 DATABASE_URL,
                                 username,
                                 password);
        return connection;
    }

   
}
