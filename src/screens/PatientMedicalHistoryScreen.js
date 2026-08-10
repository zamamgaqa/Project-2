import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { patients } from '../data/mockData';

export default function PatientMedicalHistoryScreen({ route, navigation }) {
  const { patientId } = route.params;
  const patient = patients.find((p) => p.id === patientId) || patients[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <Avatar initials={patient.initials} size={56} fontSize={18} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.name}>{patient.name}</Text>
            <Text style={styles.meta}>
              {patient.age} yrs · {patient.gender} · ID: PTY{patient.id.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Allergies</Text>
        <Card style={{ marginBottom: 16 }}>
          {patient.allergies.map((a, i) => (
            <Text key={i} style={styles.meta}>{a}</Text>
          ))}
        </Card>

        <Text style={styles.sectionLabel}>Conditions</Text>
        <Card style={{ marginBottom: 16 }}>
          {patient.conditions.length === 0 ? (
            <Text style={styles.meta}>No chronic conditions on file</Text>
          ) : (
            patient.conditions.map((c, i) => (
              <Text key={i} style={styles.meta}>{c}</Text>
            ))
          )}
        </Card>

        <Text style={styles.sectionLabel}>Current Medications</Text>
        <Card style={{ marginBottom: 16 }}>
          {patient.medications.length === 0 ? (
            <Text style={styles.meta}>No active medications</Text>
          ) : (
            patient.medications.map((m, i) => (
              <Text key={i} style={styles.meta}>{m}</Text>
            ))
          )}
        </Card>

        <Text style={styles.sectionLabel}>Vitals</Text>
        <View style={styles.vitalsRow}>
          <View style={styles.vital}>
            <Text style={styles.vitalNum}>{patient.bloodPressure}</Text>
            <Text style={styles.vitalLabel}>BP</Text>
          </View>
          <View style={styles.vital}>
            <Text style={styles.vitalNum}>{patient.pulse}</Text>
            <Text style={styles.vitalLabel}>Pulse</Text>
          </View>
          <View style={styles.vital}>
            <Text style={styles.vitalNum}>{patient.temperature}</Text>
            <Text style={styles.vitalLabel}>Temp</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WritePrescription', { patientId: patient.id })}
        >
          <Text style={styles.buttonText}>Write Prescription</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  container: { padding: 18, paddingBottom: 40 },
  backBtn: {
    width: 30, height: 30, borderRadius: 9, backgroundColor: '#fff', borderWidth: 1,
    borderColor: colors.line, alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 16, fontWeight: '800', color: colors.purple900 },
  meta: { fontSize: 12, color: colors.ink400, marginTop: 2 },
  sectionLabel: {
    fontSize: 11, fontWeight: '800', color: colors.ink600, textTransform: 'uppercase',
    letterSpacing: 0.5, marginBottom: 8,
  },
  vitalsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  vital: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: colors.line,
    padding: 12, alignItems: 'center',
  },
  vitalNum: { fontSize: 14, fontWeight: '800', color: colors.purple900 },
  vitalLabel: { fontSize: 9.5, fontWeight: '700', color: colors.ink400, marginTop: 3, textTransform: 'uppercase' },
  button: {
    backgroundColor: colors.purple600, borderRadius: 12, paddingVertical: 15, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
