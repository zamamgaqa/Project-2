import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import StatusBadge from '../components/StatusBadge';
import { appointments } from '../data/mockData';

const TABS = ['All', 'Confirmed', 'Completed'];

export default function AppointmentsScreen({ navigation }) {
  const [tab, setTab] = useState('All');

  const filtered = useMemo(() => {
    if (tab === 'All') return appointments;
    return appointments.filter((a) => a.status === tab);
  }, [tab]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Appointments</Text>

        <View style={styles.tabs}>
          {TABS.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, tab === t && styles.tabActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          {filtered.length === 0 && (
            <Text style={styles.empty}>No appointments in this category.</Text>
          )}
          {filtered.map((appt) => (
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
                      <Text style={styles.meta}>{appt.type}</Text>
                    </View>
                  </View>
                  <StatusBadge status={appt.status} />
                </View>
                <View style={styles.divider} />
                <View style={styles.between}>
                  <Text style={styles.meta}>{appt.time}</Text>
                  <Text style={styles.link}>Details ›</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  container: { flex: 1, padding: 18 },
  title: { fontSize: 19, fontWeight: '800', color: colors.purple900, marginBottom: 14 },
  tabs: { flexDirection: 'row', backgroundColor: colors.purple100, borderRadius: 11, padding: 3, marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 9, alignItems: 'center' },
  tabActive: { backgroundColor: '#fff' },
  tabText: { fontSize: 12, fontWeight: '700', color: colors.purple700 },
  tabTextActive: { color: colors.purple900 },
  row: { flexDirection: 'row', alignItems: 'center' },
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 13.5, fontWeight: '700', color: colors.ink900 },
  meta: { fontSize: 11.5, color: colors.ink400, marginTop: 1 },
  link: { color: colors.purple700, fontWeight: '700', fontSize: 12 },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 10 },
  empty: { textAlign: 'center', color: colors.ink400, marginTop: 40, fontSize: 13 },
});
