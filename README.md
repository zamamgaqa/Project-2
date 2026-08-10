# Smart Clinic Access System — Doctor App (React Native / Expo)

First 8 doctor screens, matching the Figma direction (indigo/purple primary,
teal for confirm/consult actions, lavender background, rounded 12–14px cards).

## Screens included
1. **Login** — `src/screens/LoginScreen.js`
2. **Doctor Dashboard** — `src/screens/DashboardScreen.js`
3. **Today's Appointments** — `src/screens/AppointmentsScreen.js`
4. **Patient List** — `src/screens/PatientListScreen.js`
5. **Patient Medical History** — `src/screens/PatientMedicalHistoryScreen.js`
6. **Appointment Details** — `src/screens/AppointmentDetailsScreen.js`
7. **Write Prescription** — `src/screens/WritePrescriptionScreen.js`
8. **Upload Notes / Diagnosis** — `src/screens/UploadNotesScreen.js`

All data is mocked in `src/data/mockData.js` — swap that for real API calls
once your backend is ready.

## Run it in VS Code

1. Install the recommended extensions: **ES7+ React/Redux/React-Native
   snippets** and **React Native Tools**.
2. Install Node.js (LTS) if you don't have it.
3. From the project folder:
   ```bash
   npm install
   npx expo start
   ```
4. Scan the QR code with the **Expo Go** app on your phone (iOS or Android)
   to see it live — no simulator setup required. Press `w` in the terminal
   to preview in a browser instead.

## Project structure
```
smart-clinic-app/
  App.js                       # navigation setup (stack + bottom tabs)
  src/
    theme/colors.js             # single source of truth for the palette
    data/mockData.js            # mock doctor / patients / appointments
    components/                 # Card, Avatar, StatusBadge (reused everywhere)
    screens/                    # the 8 screens listed above
```

## Navigation flow
- `Login` → `MainTabs` (bottom tabs: Home / Appointments / Patients)
- Dashboard or Appointments → tap a patient card → `AppointmentDetails`
- Patients tab → tap a patient → `PatientHistory`
- `AppointmentDetails` → `WritePrescription` or `UploadNotes`
- `PatientHistory` → `WritePrescription`

## Next steps for your team
- Replace `mockData.js` with real API/fetch calls (or Firebase, Supabase, etc.)
- Add form validation on Login and Write Prescription
- Wire up `expo-document-picker` in `UploadNotesScreen` for real file uploads
- Add the remaining screens from your doctor list (Video Consultation,
  Notifications, Messages/Chat, Availability Schedule, Earnings, Profile
  Settings, Emergency Cases) following the same component/color patterns
