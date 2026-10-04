
package com.smartclinicsystem.smartapp.gui;

//import com.smartclinicsystem.smartapp.dao.SmartClinicDAO;

import com.smartclinicsystem.smartapp.dao.SmartClinicDAO;
import com.smartclinicsystem.smartapp.domain.Appointment;
import com.smartclinicsystem.smartapp.domain.Patient;
import java.awt.BorderLayout;
import java.awt.CardLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;
import static java.awt.font.TextAttribute.FONT;
import java.util.List;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.ButtonGroup;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.ListSelectionModel;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableModel;


/**
 *
 * @author 240292243
 */
public class SmartClinicGUI extends JFrame implements ActionListener{
    //COLOR
 private final Color PURPLE = new Color(105,92, 235);
 private final Color LIGHT_PURPLE = new Color(125,114, 238);   
 private final Color DARK = new Color(32,32, 32);   
 private final Color GREY = new Color(144,144, 144);  
 private final Color HINT_GREY = new Color(159, 159,159);
 private final Color TEXT_BLACK = new Color(19,19,19);
 
 
  //MAIN PANELS
 private CardLayout cardLayout;
 private JPanel main;

 
 //DAO
 private SmartClinicDAO clinicDAO;
 
 
 
 //LOGIN
 private JTextField txtUsername;
 private JPasswordField txtPassword;

 private JButton btnLogin  ;
 private JButton  btnRegisterPage ; 
 private JButton  btnForgotPassword ; 
 private JButton btnConfirm;
 private JButton btnCancel;
 private JButton btnManageTbl;
 private JButton btnNoficationBack;   
 
 private JButton btnComfirmContinue;
 
 
 
 
 
 
 
 
  //register
 private JTextField txtFullName ;
 private JTextField txtEmail ;   
 private JPasswordField txtRegisterPassword ;   
 private JPasswordField txtConfirmPassword ; 
private JTextField txtDate;
private JTextField txtTime;
 private JTextField txtDOB;
 private JTextField txtGender;
 private JTextField txtPhoneNumber;
    
 private JButton btnRegister;
 private JButton btnBackLogin;
 
 //home
 private JButton btnBookAppointment ;
  private JButton btnViewAppointments ;  
  private JButton btnSearch ;  
  private JButton btnPatient ;  
    
    //appointment
  private JTextField txtPatientId; ;
  private JComboBox<String> cmbDoctor;
  private ButtonGroup btnCategory;
  private JRadioButton[] CatRadio;
  private JButton[] timeBtn;
  private String selectedTime = "";
  private JTextArea txtReason;
  
 
  
  
  
  
  private String bookingDoctor ="";
  private String bookingCategory ="";
  private String bookingDate ="";
  private String bookingReason ="";
  
  private JLabel lblConfirmDoc ;
  private JLabel lblConfirmCat ;
  private JLabel lblConfirmTime ;
  private JLabel lblConfirmDate ;
  private JLabel lblCONFIRM ;
  private JLabel lblCancel ;
  private JLabel lblConfirmOkay ;
  private JButton btnCondirmOkay;
  
  private JButton btnUpcoming;
  private JButton btnPast;
  private JPanel appointmentContainer;
  private JButton btnTable;
  
  private JButton btnNotification;
  
  
   private JButton btnCreateAppointment;
   private JButton btnBackHome;
   
   //appointment table
   private JTable appointmentTable;
   private DefaultTableModel model;
    
   private JButton btnRefresh ; 
   private JButton btnUpdate ;  
    private JButton btnDelete ; 
    private JButton btnBack; 
    
   // search
    private JTextField txtSearch;
    private JButton btnSearchPatient ;
    private JButton btnSearchAppointment ;
    private JButton btnBackSearch ;
    private JTextArea txtSearchResults;
    private Object patientId;
    
    //constructor
    public SmartClinicGUI(){
        
     clinicDAO = new SmartClinicDAO();   
        
      setTitle("Smart Clinic System Management");  
        
      //Phone size screen
      setSize(390, 844);
      setResizable(false);
      setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      setLocationRelativeTo(null);
      cardLayout = new CardLayout();
      main = new JPanel(cardLayout);
      
      //All screens
main.add(loginScreen(), "Login screen");
main.add(registerScreen(), "Register screen");
main.add(homeScreen(), "Home screen");
main.add(bookAppointments(), "Book screen");
main.add(summaryScreen(), "Summary screen");
main.add(appointmentConfirmedScreen(), "Confirmed booking screen");
main.add(Appointments(), "Appointment screen");
main.add(appointmentBoxScreen(), "Appointment box screen");
main.add(searchScreen(), "Search screen");
main.add(createForgotScreen(), "Forgot screen");
main.add(notificationScreen(), "Notification screen");
 add(main);

    }
public void setGUI(){
    setVisible(true);
    cardLayout.show(main,"Login screen");

}
//screen nav




//login screen
private JPanel loginScreen(){
    JPanel panel = basePanel();
    JPanel context = contextPanel();
    context.add(purpleDecor());
    context.add(Box.createVerticalStrut(20));
    context.add(createClinicIcon());
    context.add(Box.createVerticalStrut(15));
    context.add(heading("Welcome Back"));
    
    context.add(subTitle("Manage your appointments"));
    
    context.add(Box.createVerticalStrut(30));
    txtUsername = createTextField("");
    context.add(txtUsername);
    
    context.add(Box.createVerticalStrut(15));
    txtPassword = createPasswordField("");
    context.add(txtPassword);
    
    context.add(Box.createVerticalStrut(8));
    btnForgotPassword = linkButton("Forgot password");
    context.add(btnForgotPassword);
    
    context.add(Box.createVerticalStrut(25));
    btnLogin =purpleButton("Login");
    context.add(btnLogin);
    context.add(Box.createVerticalStrut(25));
    
JPanel register = new JPanel(new FlowLayout(FlowLayout.CENTER));
register.setBackground(Color.WHITE);
register.add(new JLabel("Don't have an acoount here!"));

btnRegisterPage = linkButton("Regsiter here");

register.add(btnRegisterPage);
context.add(register);
panel.add(context, BorderLayout.CENTER);
return panel;
}

//register screen
private JPanel registerScreen(){
    JPanel panel =basePanel();
    JPanel context =contextPanel();
    context.add(purpleDecor());
    context.add(createClinicIcon());
    context.add(heading("Welcome to smart Clinic"));
    context.add(subTitle("Create a patient account"));
    
    context.add(Box.createVerticalStrut(20));
    txtFullName =createTextField("Enter full name");
    context.add(txtFullName);
    
    context.add(Box.createVerticalStrut(12));
    txtEmail =createTextField("Enter email");
    context.add(txtEmail);
    
    context.add(Box.createVerticalStrut(12));
    txtDOB =createTextField("Enter Date of birth");
    context.add(txtDOB);
    
    context.add(Box.createVerticalStrut(12));
    txtGender =createTextField("Enter Gender");
    context.add(txtGender);
    
    context.add(Box.createVerticalStrut(12));
    txtPhoneNumber =createTextField("Enter phone number");
    context.add(txtPhoneNumber);
    
    context.add(Box.createVerticalStrut(12));
    txtRegisterPassword =createPasswordField("Enter password");
    context.add(txtRegisterPassword);
    
    context.add(Box.createVerticalStrut(12));
    txtConfirmPassword =createPasswordField("Confirm Password");
    context.add(txtConfirmPassword);
    
    context.add(Box.createVerticalStrut(20));
    btnRegister = purpleButton("Register");
    context.add(btnRegister);
    
    context.add(Box.createVerticalStrut(15));
    btnBackLogin =outlineButton("Back to Login");
    context.add(btnBackLogin);

     panel.add(context,BorderLayout.CENTER);
     
     return panel;
}

//Home screen
private JPanel homeScreen(){
    JPanel panel =basePanel();
    JPanel context =contextPanel();
    context.add(purpleDecor());
    context.add(heading("Smart Clinic"));
    context.add(subTitle("Manage your appointments here"));
    context.add(Box.createVerticalStrut(25));                                  
    btnBookAppointment =purpleButton("+ Book Appointment");                                     //create
    context.add(btnBookAppointment);
    context.add(Box.createVerticalStrut(15));                               
     btnViewAppointments = outlineButton("My appointments list");                             //read
     context.add(btnViewAppointments);
     context.add(Box.createVerticalStrut(15));                            
     btnSearch =outlineButton("Search");                                                  //search
     context.add(btnSearch);
     context.add(Box.createVerticalStrut(15));
    btnPatient =outlineButton("More Patient details");
    context.add(btnPatient);
    panel.add(context, BorderLayout.CENTER);
    panel.add(bottomNav(),BorderLayout.SOUTH);
    return panel;
}
//forgot password
 private JPanel createForgotScreen() {
     JPanel panel =basePanel();
    JPanel context =contextPanel();
    context.add(purpleDecor());
    context.add(new JLabel("Forgot password"));
    JButton back= purpleButton("Search");
    
    back.addActionListener(new ActionListener(){
        @Override
        public void actionPerformed(ActionEvent e){
        JOptionPane.showMessageDialog(null,"Smart Clinic menu");
            cardLayout.show(main, "Login screen"); 
        }} );    
            
    
    context.add(back);
    panel.add(context, BorderLayout.CENTER);   
     return panel;
    }

//create appointment screen
private JPanel bookAppointments(){
    JPanel panel =basePanel();
    JPanel context =contextPanel();
    context.add(purpleDecor());
    context.add(heading("Book Appointment"));
    context.add(subTitle("1.Details > 2.Date > 3.Time > 4.Confirm Booking"));
    context.add(Box.createVerticalStrut(15));
    
    txtPatientId = createTextField("Patient id");
    context.add(txtPatientId);
    context.add(Box.createVerticalStrut(14));
    
    JLabel doctorsName = new JLabel("Slect any doctor");
    doctorsName.setFont(new Font("Arial", Font.BOLD, 12));
    doctorsName.setAlignmentX(Component.LEFT_ALIGNMENT);
    context.add(doctorsName);
    context.add(Box.createVerticalStrut(8));
    
    cmbDoctor = new JComboBox<>(new String[]{
        "Dr J.Micheal(Emergency)",
        "Dr J.Kenneth (General Practitioner",
        "Dr T.Sarah(Dentist Specialist)",
        "Dr Xiang Glen (Ophthalmologist Specialist)",
        "Dr S.Jacobs(D6 Clinic)"});
    cmbDoctor.setMaximumSize(new Dimension(320, 39));
    cmbDoctor.setAlignmentX(Component.LEFT_ALIGNMENT);
    context.add(cmbDoctor);
    context.add(Box.createVerticalStrut(14));
    
    JLabel category = new JLabel("Ctegory");
    category.setFont(new Font("Arial", Font.BOLD, 12));
    category.setAlignmentX(Component.LEFT_ALIGNMENT);
    context.add(category);
    context.add(Box.createVerticalStrut(5));
    
    String[] categoryNames = {"Emergency","Antenatal","Child Health","Normal Checkup","Old",
                               "Fmaly Planning","HIV Testing","Papsmears","STI Treatment","TB Scanning",
                               "Post-Natal","Vit A and Deworming"};
    btnCategory = new ButtonGroup();
    CatRadio = new JRadioButton[categoryNames.length];
    for(int i =0; i <categoryNames.length; i++){
        JRadioButton radio = new JRadioButton(categoryNames[i]);
        radio.setBackground(Color.WHITE);
        radio.setAlignmentX(Component.LEFT_ALIGNMENT);
        btnCategory.add(radio);
        CatRadio[i] = radio;
        context.add(radio);
    }
    context.add(Box.createVerticalStrut(14));
    
    JLabel date = new JLabel("Choose Date Available");
    date.setFont(new Font("Arial", Font.BOLD, 12));
    date.setAlignmentX(Component.LEFT_ALIGNMENT);
    context.add(date);
    context.add(Box.createVerticalStrut(5));
    
     JTextField txtDate = createTextField("(YYYY/MM/DD) Date");
     context.add(txtDate);
     context.add(Box.createVerticalStrut(14));
    
    JLabel time = new JLabel("Time available");
    time.setFont(new Font("Arial", Font.BOLD, 12));
    context.add(time);
    context.add(Box.createVerticalStrut(5));
    
    String[] times = {"08:30AM","09:00AM","09:30AM","10:00AM","10:30AM","11:00AM","12:45PM"};   
    JPanel timePanel = new JPanel(new GridLayout(3,2,8,8));
    timePanel.setBackground(Color.WHITE);
    timePanel.setAlignmentX(Component.LEFT_ALIGNMENT);
    timePanel.setMaximumSize(new Dimension(320, 138));
    timeBtn = new JButton[times.length];
    for(int i =0; i<times.length; i++){
        JButton timeButton = new JButton(times[i]);
        timeButton.setBackground(Color.WHITE);
        timeButton.setFocusPainted(false);
        final int index = i;
        timeButton.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e){
                selectedTime(times[index], timeBtn[index]);
    }});
        timeBtn[i] = timeButton;
        timePanel.add(timeButton);
    }
    context.add(timePanel);
    context.add(Box.createVerticalStrut(14));
    
    JLabel lblReason = new JLabel("Reason for the appointment");
    lblReason.setFont(new Font("Arial", Font.BOLD, 12));
    lblReason.setAlignmentX(Component.LEFT_ALIGNMENT);
    context.add(lblReason);
    context.add(Box.createVerticalStrut(5));
    txtReason = new JTextArea(3, 21);
    txtReason.setFont(new Font("Arial", Font.PLAIN, 12));
    JScrollPane reasonToScroll = new JScrollPane(txtReason);
    reasonToScroll.setAlignmentX(Component.LEFT_ALIGNMENT);
    reasonToScroll.setMaximumSize(new Dimension(320, 70));
    context.add(reasonToScroll);
    context.add(Box.createVerticalStrut(18));
  
    JButton btnConfirm = purpleButton("Confirm the Booking");
    context.add(btnConfirm);
    context.add(Box.createVerticalStrut(10));
    
     JButton btnCancel = outlineButton("Cancel Booking");
    context.add(btnCancel);
    
    btnBackHome = outlineButton("Back to Home");
    context.add(btnBackHome);
    
    JScrollPane scrollPane = new JScrollPane(context);
    panel.add(scrollPane, BorderLayout.CENTER);
    
    return panel;
}

//to highlight selected time button
private void selectedTime(String time, JButton selected){
    selectedTime = time;
    for(JButton btn: timeBtn){
        btn.setBackground(Color.WHITE);
    }
    selected.setBackground(new Color(255,255,0));
}
//READS WHICH CATEGORY RADI BUTTON IS SELECTED
private String getSelectedCategory(){
    if(CatRadio != null){
        for(JRadioButton radio: CatRadio){
            if(radio.isSelected()){
                return radio.getText();
            }
        }
    }
    return "";
}

//confirm summary screen
private JPanel summaryScreen(){
    JPanel panel =basePanel();
    JPanel context =contextPanel();
    context.add(purpleDecor());
    context.add(Box.createVerticalStrut(18));
    context.add(heading("Confirm our appointment"));
    context.add(subTitle("You have an upcoming appointment scheduled at: "));
    context.add(Box.createVerticalStrut(20));

    lblConfirmDoc = new JLabel("Doctor: ");
    lblConfirmDoc.setFont(new Font("Arial", Font.PLAIN, 13));
    lblConfirmDoc.setAlignmentX(Component.LEFT_ALIGNMENT);
    context.add(lblConfirmDoc);
    context.add(Box.createVerticalStrut(9));
    
    lblConfirmCat = new JLabel("Category: ");
    lblConfirmCat.setFont(new Font("Arial", Font.PLAIN, 13));
    lblConfirmCat.setAlignmentX(Component.LEFT_ALIGNMENT);
    context.add(lblConfirmCat);
    context.add(Box.createVerticalStrut(9));

lblConfirmTime = new JLabel("Time: ");
lblConfirmTime.setFont(new Font("Arial", Font.PLAIN, 13));
lblConfirmTime.setAlignmentX(Component.LEFT_ALIGNMENT);
context.add(lblConfirmTime);
context.add(Box.createVerticalStrut(10));

lblConfirmDate = new JLabel("Date: ");
lblConfirmDate.setFont(new Font("Arial", Font.PLAIN, 13));
lblConfirmDate.setAlignmentX(Component.LEFT_ALIGNMENT);
context.add(lblConfirmDate);
context.add(Box.createVerticalStrut(22));

btnConfirm = purpleButton("Confirm appointment");
context.add(btnConfirm);
context.add(Box.createVerticalStrut(9));

btnCancel = outlineButton("Cancel appointment");
context.add(btnCancel);

panel.add(context, BorderLayout.CENTER);
panel.add(bottomNav(), BorderLayout.SOUTH);
return panel;
}

//Booking confirmed screen
private JPanel appointmentConfirmedScreen(){
   JPanel panel =basePanel();
    JPanel context =contextPanel();
    context.add(purpleDecor());
    context.add(Box.createVerticalStrut(40));
    
    JPanel box = new JPanel();
    box.setLayout(new BoxLayout(box, BoxLayout.Y_AXIS));
    box.setBackground(Color.WHITE);
    box.setBorder(new EmptyBorder(30,20,30,20));
    box.setAlignmentX(Component.CENTER_ALIGNMENT);
    
    JLabel view = new JLabel("\u2713", JLabel.CENTER);
    view.setFont(new Font("Arial", Font.BOLD, 39));
    view.setForeground(Color.WHITE);
    view.setOpaque(true);
    view.setBackground(PURPLE);
    view.setPreferredSize(new Dimension(68, 68));
    view.setMaximumSize(new Dimension(68,68));
    view.setAlignmentX(Component.CENTER_ALIGNMENT);
    box.add(view);
    box.add(Box.createVerticalStrut(19));
    
    box.add(heading("Appointment has been confirmed"));
    box.add(Box.createVerticalStrut(9));
    box.add(subTitle("You can view your appointment on home screen"));
    box.add(Box.createVerticalStrut(18));
    
    btnConfirm = outlineButton("OKAY");
    box.add(btnConfirm);
    context.add(box);
    panel.add(context, BorderLayout.CENTER);
    panel.add(bottomNav(), BorderLayout.SOUTH);
     return panel;
    
}

//READ /UPDATE/ DELETE SCREEN
private JPanel Appointments(){
    JPanel panel =basePanel();
    JPanel context =new JPanel(new BorderLayout(5, 10));
    context.setBackground(Color.WHITE);
    context.setBorder(new EmptyBorder(20,15,20,15));
    JLabel title = heading("my appointments");
    context.add(title, BorderLayout.NORTH);
    
                                                                                                                 //TABLE
     model = new DefaultTableModel(new String[]{"ID","DCOTOR","DATE","TIME","STATUS"},0);
     appointmentTable =new JTable(model);
     appointmentTable.setRowHeight(29);
     appointmentTable.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
     
     JScrollPane scroll = new JScrollPane(appointmentTable);
     context.add(scroll,BorderLayout.CENTER);
     
     //Buttons
     JPanel buttons = new JPanel(new GridLayout(4,1,5,5));
     buttons.setBackground(Color.WHITE);
     
     btnRefresh =purpleButton("Refresh or read appointments");
     btnUpdate = outlineButton("Update status");
     btnDelete = outlineButton("Cancel or delete appointment");
     btnBack = outlineButton("Back to home");
     
     buttons.add(btnRefresh);
buttons.add(btnUpdate);
buttons.add(btnDelete);
buttons.add(btnBack);

context.add(buttons, BorderLayout.SOUTH);
panel.add(context, BorderLayout.CENTER);

return panel;
}

//appointment card list screen
private JPanel appointmentBoxScreen(){
   JPanel panel =basePanel();
    JPanel context = new JPanel();
    context.setLayout(new BoxLayout(context,BoxLayout.Y_AXIS));
    context.setBackground(Color.WHITE);
    context.setBorder(new EmptyBorder(14,19,14,19));
    context.add(purpleDecor());
    context.add(Box.createVerticalStrut(14));
    
    JPanel sections = new JPanel(new GridLayout(1,2,5,5));
    sections.setBackground(Color.WHITE);
    sections.setMaximumSize(new Dimension(320, 39));
    sections.setAlignmentX(Component.LEFT_ALIGNMENT);
    
    btnUpcoming = new JButton("Upcoming Appointment");
    btnPast = new JButton("Past Appointments");
    btnUpcoming.setFocusPainted(false);
    btnPast.setFocusPainted(false);
    btnUpcoming.addActionListener(this);
    btnPast.addActionListener(this);
    sections.add(btnUpcoming);
    sections.add(btnPast);
    context.add(sections);
    context.add(Box.createVerticalStrut(14));
    
    appointmentContainer = new JPanel();
    appointmentContainer.setLayout(new BoxLayout(appointmentContainer, BoxLayout.Y_AXIS));
    appointmentContainer.setBackground(Color.WHITE);
    appointmentContainer.setAlignmentX(Component.LEFT_ALIGNMENT);
    
    JScrollPane scrollPane = new JScrollPane(appointmentContainer);
    scrollPane.setBorder(null);
    scrollPane.setAlignmentX(Component.LEFT_ALIGNMENT);
    context.add(scrollPane);
    context.add(Box.createVerticalStrut(9));
    
    btnManageTbl = outlineButton("Manage appointments(VIEW)");
    context.add(btnManageTbl);
    
    panel.add(context, BorderLayout.CENTER);
    panel.add(bottomNav(), BorderLayout.SOUTH);
    return panel;
 
}

//loads card list for whichever section or tab is action from the dao no threads
private void loadAppointmentSection(String section){
    if(section.equals("Upcoming")){
           btnUpcoming.setBackground(DARK);
           btnUpcoming.setForeground(Color.WHITE);
           btnPast.setBackground(new Color(235,235,235));
           btnPast.setForeground(DARK);
        
      }else{ btnPast.setBackground(DARK);
             btnPast.setForeground(Color.white);
             btnUpcoming.setBackground(new Color(235,35,235));
             btnUpcoming.setForeground(DARK);
    }appointmentContainer.removeAll();
boolean found = false;
List <Appointment> appointments = clinicDAO.getAllApp();
   for(Appointment appointment: appointments){
       boolean isPast = "Completed".equalsIgnoreCase(appointment.status)
                      || "Pending".equalsIgnoreCase(appointment.status)
                      || "Cancel".equalsIgnoreCase(appointment.status);
       
          if((section.equals("Upcoming") && !isPast) || (section.equals("Past") && isPast)){
                JPanel box = AppointmentCard(appointment); 
                box.setAlignmentX(Component.LEFT_ALIGNMENT);
                appointmentContainer.add(box);
                appointmentContainer.add(Box.createVerticalStrut(10));
                found = true;
   }}
if(found == false){
    JLabel empty = new JLabel("No"+section.toLowerCase()+"appointments");
    empty.setForeground(GREY);
    appointmentContainer.add(empty);
}

appointmentContainer.revalidate();
appointmentContainer.repaint();
}


  private JPanel AppointmentCard(Appointment appointment) {
      JPanel box = new JPanel();
      box.setLayout(new BoxLayout(box, BoxLayout.Y_AXIS));
      box.setBackground(Color.WHITE);
      box.setBorder(new EmptyBorder(11,11,11,11));
      box.setMaximumSize(new Dimension(320, 109));
      
      JLabel doctor = new JLabel(appointment.doctorsName);
      doctor.setFont(new Font("Arial", Font.PLAIN, 13));
      box.add(doctor);
      
      JLabel category = new JLabel(appointment.category);
      category.setFont(new Font("Arial", Font.PLAIN, 11));
      category.setForeground(GREY);
      box.add(category);
      
      JLabel time = new JLabel(appointment.date+" "+appointment.time);
      time.setFont(new Font("Arial", Font.PLAIN, 11));
      time.setForeground(GREY);
      box.add(time);
      
      return box;
      
  
    }

//Notification screen
  private JPanel notificationScreen(){
   JPanel panel =basePanel();
    JPanel context =new JPanel();
    context.setLayout(new BoxLayout(context, BoxLayout.Y_AXIS));
    context.setBackground(Color.WHITE);
    context.setBorder(new EmptyBorder(14,20,15,20));
    
    JPanel top = new JPanel(new FlowLayout(FlowLayout.LEFT));
    top.setBackground(Color.WHITE);
    top.setAlignmentX(Component.LEFT_ALIGNMENT);
    btnNoficationBack = new JButton("< Notification");
    btnNoficationBack.setBorderPainted(false);
    btnNoficationBack.setBackground(Color.WHITE);
    btnNoficationBack.setFont(new Font("Arial", Font.BOLD, 16));
    btnNoficationBack.addActionListener(this);
    top.add(btnNoficationBack);
    context.add(top);
    context.add(Box.createVerticalStrut(14));
    
    JPanel section1 = new JPanel();
    section1.setLayout(new BoxLayout(section1, BoxLayout.Y_AXIS));
    section1.setBackground(Color.WHITE);
    section1.setBorder(new EmptyBorder(11,11,11,11));
    section1.setAlignmentX(Component.LEFT_ALIGNMENT);
    JLabel sec1Title = new JLabel("Appointment Reminder");
    sec1Title.setFont(new Font("Arial", Font.BOLD, 12));
    section1.add(sec1Title);
    JLabel sec1Body = new JLabel("<html> You have an appointment coimg up soon</html>");
    sec1Body.setForeground(GREY);
    sec1Body.setFont(new Font("Arial", Font.PLAIN, 11));
    section1.add(sec1Body);
    context.add(section1);
    context.add(Box.createVerticalStrut(9));
    
    
    JPanel section2 = new JPanel();
    section2.setLayout(new BoxLayout(section2, BoxLayout.Y_AXIS));
    section2.setBackground(Color.WHITE);
    section2.setBorder(new EmptyBorder(11,11,11,11));
    section2.setAlignmentX(Component.LEFT_ALIGNMENT);
    JLabel sec2Title = new JLabel("Appointment Reminder");
    sec1Title.setFont(new Font("Arial", Font.BOLD, 12));
    section2.add(sec2Title);
    JLabel sec2Body = new JLabel("<html> You latest appointment status has been updated now </html>");
    sec2Body.setForeground(GREY);
    sec2Body.setFont(new Font("Arial", Font.PLAIN, 11));
    section2.add(sec2Body);
    context.add(section2);
    
    panel.add(context, BorderLayout.CENTER);
    panel.add(bottomNav(), BorderLayout.SOUTH);
    return panel;
    
  
  }
 
  

//search screen

private JPanel searchScreen(){
    JPanel panel =basePanel();
    JPanel context =contextPanel();
    context.add(purpleDecor());
    context.add(heading("Search"));
    context.add(subTitle("Lets find an appointment or a patient"));
    context.add(Box.createVerticalStrut(25));
    
    txtSearch = new JTextField();
    txtSearch.setFont(new Font("Arial", Font.PLAIN, 13));
    txtSearch.setPreferredSize(new Dimension(320,49));
    txtSearch.setMaximumSize(new Dimension(Integer.MAX_VALUE, 47));
    
    context.add(txtSearch);
    context.add(Box.createVerticalStrut(15));
    
    btnSearchPatient =purpleButton("Search patient");
    context.add(btnSearchPatient);
    context.add(Box.createVerticalStrut(10));
    
   btnSearchAppointment =outlineButton("Search appointments");
   context.add(btnSearchAppointment);
   context.add(Box.createVerticalStrut(20));
   
   txtSearchResults =new JTextArea();
   txtSearchResults.setEditable(false);
   txtSearchResults.setFont(new Font("Arial", Font.PLAIN, 13));
   
   JScrollPane resultScroll =new JScrollPane(txtSearchResults);
   resultScroll.setPreferredSize(new Dimension(320, 180));
   context.add(resultScroll);
   context.add(Box.createVerticalStrut(10));
   
   btnBackSearch =outlineButton("Back to home");
   context.add(btnBackSearch);
   panel.add(context, BorderLayout.CENTER);
   return panel;
}

//Buttons actions
@Override
public void actionPerformed(ActionEvent e){
     Object btnComfirm = null;
      //Log in
 
if(e.getSource()== btnLogin){
   JOptionPane.showMessageDialog(this,"Login button clicked");
String username =txtUsername.getText().trim();
String password = new String(txtPassword.getPassword()).trim();

    System.out.println("Unsername has been entered"+username);
    System.out.println("Password has been entered"+password);
    
if(username.isEmpty() || password.isEmpty()){
    JOptionPane.showMessageDialog(null,"username and password is required here","ERROR",JOptionPane.ERROR_MESSAGE);
return;
}
        //database log in

    boolean user = clinicDAO.login(username,password);

if(user){
JOptionPane.showMessageDialog(this,"Log in was successful");
cardLayout.show(main, "Home screen");

}
else{
 JOptionPane.showMessageDialog(null,"Username or password is invalid try again","ERROR",JOptionPane.ERROR_MESSAGE);
}}

//register page1
else if(e.getSource()==btnRegisterPage){
    cardLayout.show(main, "Register screen");
}
//register 2
//create
else if( e.getSource()==btnRegister){
    String name =txtFullName.getText().trim();
    String email =txtEmail.getText().trim();
    String dob =txtDOB.getText().trim();
    String gender =txtGender.getText().trim();
    String phone_number =txtPhoneNumber.getText().trim();
    String password =new String(txtRegisterPassword.getPassword());
    String confirm =new String(txtConfirmPassword.getPassword());
    
    if(name.isEmpty()|| email.isEmpty()||dob.isEmpty()||gender.isEmpty()||phone_number.isEmpty()||password.isEmpty()||confirm.isEmpty()){
    JOptionPane.showMessageDialog(null,"All fields must be filled","ERROR",JOptionPane.ERROR_MESSAGE);
    return;
}
   if(!password.equals(confirm)){
       JOptionPane.showMessageDialog(null,"Passwords don't match try again","ERROR",JOptionPane.ERROR_MESSAGE);
       return;
   }
     //create a patient
    long userId =clinicDAO.registerPat(name,email,dob,gender,phone_number ,password);
    
    if(userId != -1){
        JOptionPane.showMessageDialog(this,"Patient has been registered\n"+"user id" +userId);
        
        cardLayout.show(main, "Login screen");
    }else{
        JOptionPane.showMessageDialog(null,"Patient registertion has fail try again","ERROR",JOptionPane.ERROR_MESSAGE);
    }
}
//back to login
else if(e.getSource()==btnBackLogin){
    cardLayout.show(main, "Login screen");
}
//forgot screen
else if(e.getSource()==btnForgotPassword){
   JOptionPane.showMessageDialog(this, "Can't find it, register new account");
    cardLayout.show(main, "Register screen");
}

//book appointment
else if(e.getSource()==btnBookAppointment){
    cardLayout.show(main, "Book screen");
}

//create appointment
//step1
else if(e.getSource()==btnConfirm){
    ConfirmSummary();
}
else if(e.getSource()== btnCancel || e.getSource()==btnBack){
     cardLayout.show(main, "Home screen");
}
//step2
else if(e.getSource()==btnComfirmContinue){
      continueBooking();
}
else if(e.getSource()==btnCancel){
    cardLayout.show(main, "Home screen");
}
//step3
else if(e.getSource()==btnCondirmOkay){
      loadAppointmentSection("Upcoming");
      cardLayout.show(main,"Appointment box screen");
}

//read appointments
else if(e.getSource()==btnViewAppointments){
    loadAppointmentSection("Upcoming");
    cardLayout.show(main, "Appointment box screen");
}
else if(e.getSource()==btnUpcoming){
    loadAppointmentSection("Upcoming");
}
else if(e.getSource()==btnPast){
    loadAppointmentSection("Past");
}
else if(e.getSource()==btnManageTbl){
    loadAppointments();
    cardLayout.show(main, "Appointment screen");
}

//refresh
else if(e.getSource()==btnRefresh){
    loadAppointments();
}

//update
else if(e.getSource()==btnUpdate){
    updateAppointment();
}

//delete appointment
else if(e.getSource()==btnDelete){
    deleteAppointment();
}

//search
else if(e.getSource()==btnSearch){
    cardLayout.show(main, "Search screen");
}

//search patient
else if(e.getSource()==btnSearchPatient){
    searchPatient();
}

//search appointments
else if(e.getSource()==btnSearchAppointment){
    searchAppointment();
}
//notification
else if(e.getSource()== btnNoficationBack){
       cardLayout.show(main,"Home screen");
}

//back home
else if( e.getSource()== btnBack || e.getSource()==btnBackSearch){
    cardLayout.show(main, "Home screen");
}}

//validate booking form   //GO ABOVE YOU HAVE TO FIX showScreen AND showError
 private void ConfirmSummary() { //done
     String patientText = txtPatientId.getText().trim();
     String doctor = (String) cmbDoctor.getSelectedItem();
     String category =getSelectedCategory();
     String date = txtDate.getText().trim();
     String reason = txtReason.getText().trim();
     
     if(patientText.isEmpty() || category.isEmpty() || date.isEmpty() || selectedTime.isEmpty() || reason.isEmpty()){
          JOptionPane.showMessageDialog(null,"Please fill all fields, choose category and select time", "You cant skill field",JOptionPane.ERROR_MESSAGE);
          return;
     }
     try{Integer.parseInt(patientText);
     }catch(NumberFormatException nfe){
         JOptionPane.showMessageDialog(null,"Patient id must be numbers","ERROR",JOptionPane.ERROR_MESSAGE);
         return;
     }
     bookingDoctor = doctor;
     bookingCategory = category;
     bookingDate = date;
     bookingReason = reason;
     
     lblConfirmDoc.setText("Doctor: "+bookingDoctor);
     lblConfirmCat.setText("Category: "+bookingCategory);
     lblConfirmTime.setText("Time: "+selectedTime);
     lblConfirmDate.setText("Date: "+bookingDate);
     
     cardLayout.show(main, "Summary screen");
     
     
 }
  //saves appointment to the database
 //finilize booking
private void continueBooking(){
    int patientId = Integer.parseInt(txtPatientId.getText().trim());
    
    long appointmentId = clinicDAO.createAppointment(patientId, 003, bookingDoctor,bookingCategory,bookingDate,selectedTime, bookingReason);
    
    if(appointmentId != -1){
        clearAppointmentFields();
        cardLayout.show(main, "Confirmed booking screen");
    } else{
                JOptionPane.showMessageDialog(null,"Appointment failed to be created","ERROR",JOptionPane.ERROR_MESSAGE);
 
    } 
}

//read appointments
private void loadAppointments(){
    model.setRowCount(0);
List<Appointment> appointments =clinicDAO.getAllApp();

for(Appointment appointment: appointments){
  model.addRow(new Object[]{
            appointment.appointmentId,
            appointment.doctorsName,
            appointment.date,
            appointment.time,
            appointment.status    
    });
}
}

//update
private void updateAppointment(){
    int selectedRow = appointmentTable.getSelectedRow();
if(selectedRow == -1){
    JOptionPane.showMessageDialog(null,"Select appointment first","ERROE",JOptionPane.ERROR_MESSAGE);
    return;
}
int appointmentId = Integer.parseInt(model.getValueAt(selectedRow, 0).toString());
String[] statuses = {"Completed","Confirmed","Pending","Cancelled"};
String newStatus =(String)JOptionPane.showInputDialog(this,"Choose new status","Update appointemnt",JOptionPane.QUESTION_MESSAGE,null,statuses,statuses[0]);

if(newStatus == null){
    return;
}
int rows =clinicDAO.updateAppointmentStatus(appointmentId, newStatus);
if(rows > 0){
    JOptionPane.showMessageDialog(this,"Appointment has been successfully updated");
    loadAppointments();
}
else{
    JOptionPane.showMessageDialog(null,"You have failed to update appointment","ERROR",JOptionPane.ERROR_MESSAGE);
}
}
//delete
private void deleteAppointment(){
    int selectedRow =appointmentTable.getSelectedRow();
    if(selectedRow == -1){
        JOptionPane.showMessageDialog(null,"Select appointment first","ERROR",JOptionPane.ERROR_MESSAGE);
        return;
    }
int appointmentId =Integer.parseInt(model.getValueAt(selectedRow, 0).toString());
int confirm =JOptionPane.showConfirmDialog(this,"Are you sure you want to delete?","Delete appointment",JOptionPane.YES_NO_OPTION);

        if(confirm == JOptionPane.YES_OPTION){
         int rows =clinicDAO.deleteAppointmentRow(appointmentId);
            
            if(rows > 0){
                JOptionPane.showMessageDialog(this,"Appointment has been deleted");
                loadAppointments();
            }
            else{
                JOptionPane.showMessageDialog(null,"Appointment cannot be deleted","ERROR",JOptionPane.ERROR_MESSAGE);
}}}







//search patient
private void searchPatient(){
      String text =txtSearch.getText().trim();
        if(text.isEmpty()){
            JOptionPane.showMessageDialog(null,"Enter patient id","ERROR",JOptionPane.ERROR_MESSAGE);
            return;
        }
       try{int patientId =Integer.parseInt(text);
        Patient patient =clinicDAO.getPatientById(patientId);
        
          if(patient != null){
              txtSearchResults.setText(
                  "Patient has been found\n\n"+    
                   "Patient id"+
                    patient.patientId+
                    "\n\n"+
                    "full name"+
                    patient.fullName+
                      "\n\n"+
                      "Date of birth"+
                      patient.dob+
                      "\n\n"+
                      "gender"+
                      patient.gender+
                      "\n\n"+
                      patient.phoneNumber+
                      "\n\n"+
                      "email"+
                      patient.email );
          }
          else{
              txtSearchResults.setText("No patient available with this ID");
          }
       }catch(NumberFormatException ex){
        JOptionPane.showMessageDialog(null,"Patient id has to be numbers","ERROR",JOptionPane.ERROR_MESSAGE);
    }
}

//search appointment
private void searchAppointment(){
    
        String text = txtSearch.getText().trim();
        if(text.isEmpty()){
            JOptionPane.showMessageDialog(null,"Enter patient id","ERROR",JOptionPane.ERROR_MESSAGE);
            return;}
        try{ int patientId =Integer.parseInt(text);
        List<Appointment> appointments =clinicDAO.getAppointmentsForPatient(patientId);
        if(appointments.isEmpty()){
        txtSearchResults.setText("The are no appointments for this patientId" +patientId);
        return;
        }
        StringBuilder result =new StringBuilder();
        result.append("Appointments that are found\n");
        for(Appointment appointment :appointments){
                        
                      result.append("appointment id: ")
                      .append(appointment.appointmentId)
                      .append("\n");
                      
                      result.append("Doctor's name: ")
                      .append(appointment.doctorsName)
                      .append("\n");
                      
                      result.append("Category: ")
                       .append(appointment.category)
                       .append("\n");
                      
                      result.append("appointment date: ")
                      .append(appointment.date)
                      .append("\n");
                      
                      result.append("Appointment time: ")
                       .append(appointment.time)
                      .append('\n');
                      
                      result.append("appointment status: ")
                      .append(appointment.status)
                      .append("\n");
                      result.append("\n\n\n");
        }
        
                   txtSearchResults.setText(result.toString());
       
        
        }catch(NumberFormatException ex){
                JOptionPane.showMessageDialog(null,"Enter valid patient id(Numbers)!!","ERROR",JOptionPane.ERROR_MESSAGE);
                }}


  //clear appointment fields
private void clearAppointmentFields(){
    txtPatientId.setText("");
     txtDate.setText("");                 
     txtReason.setText("");                                
     if(btnCategory != null){
         btnCategory.clearSelection();
     }selectedTime ="";
     if(timeBtn != null){
         for(JButton btn: timeBtn){
             btn.setBackground(Color.WHITE);
 }}}





             
                      
 //My DESIGN COMPONENTS                     
   private JPanel basePanel(){
       JPanel panel = new JPanel(new BorderLayout());
       panel.setBackground(Color.WHITE);
         return panel;             
   }
   private JPanel contextPanel(){
       JPanel panel =new JPanel();
       panel.setLayout(new BoxLayout(panel,BoxLayout.Y_AXIS));
       panel.setBackground(Color.WHITE);
       panel.setBorder(new EmptyBorder(15,30,15,30));
        return panel;
   }
   private JPanel purpleDecor(){
       JPanel panel =new JPanel();
       panel.setBackground(Color.WHITE);
       panel.setPreferredSize(new Dimension(320, 70));
       
       JPanel circle =new JPanel();
       circle.setBackground(PURPLE);
        circle.setPreferredSize(new Dimension(110, 70));
        panel.setLayout(new FlowLayout(FlowLayout.LEFT,0,0));
        panel.add(circle);
        return panel;
   }
   
   private JLabel createClinicIcon(){
       JLabel label = new JLabel("");
       label.setFont(new Font("Arial",Font.PLAIN, 65));
       label.setAlignmentX(Component.CENTER_ALIGNMENT);
       return label;
        }
   
   private JLabel heading(String text){
       JLabel label = new JLabel(text);
       label.setFont(new Font("Arial",Font.BOLD,22));
       label.setForeground(DARK);
       label.setAlignmentX(Component.CENTER_ALIGNMENT);
       return label;
   }
   
   private JLabel subTitle(String text){
       JLabel label = new JLabel("<html><center>"+text+"</center></html>");
       label.setFont(new Font("Arial",Font.PLAIN,12));
       label.setForeground(GREY);
       label.setAlignmentX(Component.CENTER_ALIGNMENT);
       return label;
    }
   
private JTextField createTextField(String text){
    JTextField field = new JTextField(text);
    field.setFont(new Font("Arial",Font.PLAIN,13));
   field.setForeground(GREY);
field.setPreferredSize(new Dimension(320, 48));
field.setMaximumSize(new Dimension(Integer.MAX_VALUE,47));
return field;
}

private JPasswordField createPasswordField(String text){
    JPasswordField field =new JPasswordField(text);
    field.setFont(new Font("Arial",Font.PLAIN,14));
    field.setPreferredSize(new Dimension(320, 48));
    field.setMaximumSize(new Dimension(Integer.MAX_VALUE,48));
    return field;
}

private JButton purpleButton(String text){
    JButton button =new JButton(text);
    button.setBackground(PURPLE);
    button.setForeground(Color.WHITE);
    button.setFont(new Font("Arial",Font.BOLD,13));
    button.setFocusPainted(false);
    button.setPreferredSize(new Dimension(320,50));
    button.setMaximumSize(new Dimension(Integer.MAX_VALUE,49));
    button.addActionListener(this);
    return button;
}

private JButton outlineButton(String text){
 JButton button = new JButton(text);
 button.setBackground(Color.WHITE);
 button.setForeground(DARK);
button.setFont(new Font("Arial",Font.BOLD,14));
button.setFocusPainted(false);
button.setPreferredSize(new Dimension(320,50));
button.setMaximumSize(new Dimension(Integer.MAX_VALUE,50));
button.addActionListener(this);
return button;
}
//done
private JButton linkButton(String text){ 
    JButton button = new JButton(text);
    button.setBackground(Color.WHITE);
    button.setForeground(PURPLE);
    button.setBorderPainted(false);
   button.setFocusPainted(false);
   button.addActionListener(this);
   return button;
}


//bottom nav/navigation - done
private JPanel bottomNav(){
    JPanel panel =new JPanel(new GridLayout(1,3));
    panel.setBackground(Color.WHITE);
    JButton appointments = new JButton("Appointments");
    JButton home = new JButton("Home screen");
    JButton menu = new JButton("Menu");
    home.addActionListener(new ActionListener(){
        @Override
        public void actionPerformed(ActionEvent e){
          cardLayout.show(main, "Home screen");  
        }});       
    appointments.addActionListener(new ActionListener(){
        @Override
        public void actionPerformed(ActionEvent e){
           loadAppointmentSection("Upcoming"); 
           cardLayout.show(main, "Appointment box screen");
        }});
       menu.addActionListener(new ActionListener(){
        @Override
        public void actionPerformed(ActionEvent e){
             cardLayout.show(main, "Notification screen"); 
        }});
  panel.add(home);
  panel.add(appointments);
  panel.add(menu);
  return panel;
  
}}















































































































































































































































      

   
        
        
        
        
        
        
        
        
        
        
        
        
        
    

  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

