import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { colors } from '../theme/colors';
import Card from '../components/Card';
import { patients } from '../data/mockData';

export default function WritePrescriptionScreen({ route, navigation }) {
  const { patientId } = route.params;
  const patient = patients.find((p) => p.id === patientId) || patients[0];

  const [medications, setMedications] = useState(
    patient.medications.length
      ? patient.medications.map((m, i) => ({ id: String(i), text: m }))
      : [{ id: '0', text: '' }]
  );
  const [notes, setNotes] = useState('');

  const addMedication = () => {
    setMedications((prev) => [...prev, { id: String(prev.length), text: '' }]);
  };

  const updateMedication = (id, text) => {
    setMedications((prev) => prev.map((m) => (m.id === id ? { ...m, text } : m)));
  };

  const handleSave = () => {
    // TODO: send prescription to backend
    Alert.alert('Prescription saved', `Saved for ${patient.name}`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topbar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Write Prescription</Text>
        </View>

        <Text style={styles.label}>Patient</Text>
        <View style={styles.readonlyBox}>
          <Text style={styles.readonlyText}>{patient.name}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Medications</Text>
          <TouchableOpacity onPress={addMedication}>
            <Text style={styles.link}>+ Add Medication</Text>
          </TouchableOpacity>
        </View>

        {medications.map((m, i) => (
          <Card key={m.id} style={{ marginBottom: 10 }}>
            <Text style={styles.medIndex}>{i + 1}.</Text>
            <TextInput
              style={styles.medInput}
              placeholder="e.g. Amoxicillin 500mg — twice daily"
              placeholderTextColor={colors.ink400}
              value={m.text}
              onChangeText={(text) => updateMedication(m.id, text)}
            />
          </Card>
        ))}

        <Text style={[styles.label, { marginTop: 16 }]}>Notes for patient</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Take rest and stay hydrated..."
          placeholderTextColor={colors.ink400}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Prescription</Text>
        </TouchableOpacity>
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
  label: { fontSize: 12, fontWeight: '700', color: colors.ink600, marginBottom: 6 },
  readonlyBox: {
    backgroundColor: '#fff', borderWidth: 1.4, borderColor: colors.line, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16,
  },
  readonlyText: { fontSize: 13.5, fontWeight: '700', color: colors.ink900 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionLabel: {
    fontSize: 11, fontWeight: '800', color: colors.ink600, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  link: { color: colors.purple700, fontWeight: '700', fontSize: 12 },
  medIndex: { fontSize: 11, fontWeight: '700', color: colors.ink400, marginBottom: 4 },
  medInput: { fontSize: 13, color: colors.ink900, padding: 0 },
  notesInput: {
    backgroundColor: '#fff', borderWidth: 1.4, borderColor: colors.line, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 13, color: colors.ink900,
    minHeight: 90, textAlignVertical: 'top', marginBottom: 24,
  },
  saveButton: { backgroundColor: colors.teal600, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
