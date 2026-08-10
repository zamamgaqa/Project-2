import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import StatusBadge from '../components/StatusBadge';
import { doctor, appointments } from '../data/mockData';

function StatBox({ num, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statNum}>{num}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.row}>
            <Avatar initials={doctor.initials} size={44} fontSize={15} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.greeting}>Hi, {doctor.name.split(' ')[1]} 👋</Text>
              <Text style={styles.meta}>{doctor.specialty}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bell}>
            <Text>🔔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <StatBox num={appointments.length} label="Today" />
          <StatBox num="5" label="New Patients" />
          <StatBox num="$850" label="Earnings" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Today's Schedule</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
            <Text style={styles.link}>View all</Text>
          </TouchableOpacity>
        </View>

        {appointments.map((appt) => (
          <TouchableOpacity
            key={appt.id}
            onPress={() => navigation.navigate('AppointmentDetails', { appointmentId: appt.id })}
          >
            <Card style={{ marginBottom: 10 }}>
              <View style={styles.between}>
                <View style={styles.row}>
                  <Avatar initials={appt.initials} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.name}>{appt.patientName}</Text>
                    <Text style={styles.meta}>
                      {appt.time} · {appt.type}
                    </Text>
                  </View>
                </View>
                <StatusBadge status={appt.status} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  container: { padding: 18, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  row: { flexDirection: 'row', alignItems: 'center' },
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bell: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff',
    borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center',
  },
  greeting: { fontSize: 16, fontWeight: '800', color: colors.purple900 },
  meta: { fontSize: 11.5, color: colors.ink400, marginTop: 1 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  stat: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1,
    borderColor: colors.line, padding: 14, alignItems: 'flex-start',
  },
  statNum: { fontSize: 20, fontWeight: '800', color: colors.purple900 },
  statLabel: { fontSize: 10, fontWeight: '700', color: colors.ink400, marginTop: 2, textTransform: 'uppercase' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionLabel: { fontSize: 12, fontWeight: '800', color: colors.ink600, textTransform: 'uppercase', letterSpacing: 0.5 },
  link: { color: colors.purple700, fontWeight: '700', fontSize: 12 },
  name: { fontSize: 13.5, fontWeight: '700', color: colors.ink900 },
});
