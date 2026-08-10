import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import StatusBadge from '../components/StatusBadge';
import { appointments } from '../data/mockData';

export default function AppointmentDetailsScreen({ route, navigation }) {
  const { appointmentId } = route.params;
  const appt = appointments.find((a) => a.id === appointmentId) || appointments[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topbar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Appointment Details</Text>
        </View>

        <Card style={styles.patientCard}>
          <Avatar initials={appt.initials} size={44} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>{appt.patientName}</Text>
            <Text style={styles.meta}>Patient</Text>
          </View>
        </Card>

        <Card style={{ marginTop: 12 }}>
          <View style={styles.row}>
            <Text style={styles.meta}>Date &amp; Time</Text>
            <Text style={styles.value}>Today, {appt.time}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.meta}>Type</Text>
            <Text style={styles.value}>{appt.type}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.meta}>Status</Text>
            <StatusBadge status={appt.status} />
          </View>
        </Card>

        <Text style={styles.sectionLabel}>Reason for Visit</Text>
        <Card style={{ marginBottom: 20 }}>
          <Text style={styles.meta}>{appt.reason}</Text>
        </Card>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.ghostButton}
            onPress={() => navigation.navigate('UploadNotes', { appointmentId: appt.id })}
          >
            <Text style={styles.ghostButtonText}>Upload Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tealButton}
            onPress={() => navigation.navigate('WritePrescription', { patientId: appt.patientId })}
          >
            <Text style={styles.tealButtonText}>Write Prescription</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  container: { padding: 18, paddingBottom: 40 },
  topbar: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  backBtn: {
    width: 30, height: 30, borderRadius: 9, backgroundColor: '#fff', borderWidth: 1,
    borderColor: colors.line, alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  title: { fontSize: 16, fontWeight: '800', color: colors.purple900 },
  patientCard: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 14, fontWeight: '700', color: colors.ink900 },
  meta: { fontSize: 12, color: colors.ink400 },
  value: { fontSize: 12.5, fontWeight: '700', color: colors.ink900 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 10 },
  sectionLabel: {
    fontSize: 11, fontWeight: '800', color: colors.ink600, textTransform: 'uppercase',
    letterSpacing: 0.5, marginTop: 18, marginBottom: 8,
  },
  buttonRow: { flexDirection: 'row', gap: 10 },
  ghostButton: {
    flex: 1, borderWidth: 1.4, borderColor: colors.purple600, borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  ghostButtonText: { color: colors.purple700, fontWeight: '700', fontSize: 13 },
  tealButton: {
    flex: 1, backgroundColor: colors.teal600, borderRadius: 12, paddingVertical: 14, alignItems: 'center',
  },
  tealButtonText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
