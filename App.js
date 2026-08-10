import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import { colors } from './src/theme/colors';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import PatientListScreen from './src/screens/PatientListScreen';
import PatientMedicalHistoryScreen from './src/screens/PatientMedicalHistoryScreen';
import AppointmentDetailsScreen from './src/screens/AppointmentDetailsScreen';
import WritePrescriptionScreen from './src/screens/WritePrescriptionScreen';
import UploadNotesScreen from './src/screens/UploadNotesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS = { Home: '🏠', Appointments: '🗓️', Patients: '👥' };

function TabIcon({ label, focused }) {
  return (
    <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.45 }}>{TAB_ICONS[label]}</Text>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.purple700,
        tabBarInactiveTintColor: colors.ink400,
        tabBarStyle: { borderTopColor: colors.line, height: 62, paddingBottom: 8, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
        tabBarIcon: ({ focused }) => <TabIcon label={route.name} focused={focused} />,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Patients" component={PatientListScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bgApp } }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="PatientHistory" component={PatientMedicalHistoryScreen} />
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
        <Stack.Screen name="WritePrescription" component={WritePrescriptionScreen} />
        <Stack.Screen name="UploadNotes" component={UploadNotesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
