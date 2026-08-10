import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { colors } from '../theme/colors';
import Card from '../components/Card';

export default function UploadNotesScreen({ route, navigation }) {
  const { appointmentId } = route.params || {};
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleAttach = () => {
    // TODO: wire up expo-document-picker / expo-image-picker here
    setAttachments((prev) => [...prev, `Attachment ${prev.length + 1}.pdf`]);
  };

  const handleSave = () => {
    if (!diagnosis.trim()) {
      Alert.alert('Add a diagnosis', 'Please enter a diagnosis before saving.');
      return;
    }
    // TODO: send diagnosis/notes/attachments to backend
    Alert.alert('Saved', 'Diagnosis and notes were saved to the patient record.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topbar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Upload Notes / Diagnosis</Text>
        </View>

        <Text style={styles.label}>Diagnosis</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Stage 1 Hypertension"
          placeholderTextColor={colors.ink400}
          value={diagnosis}
          onChangeText={setDiagnosis}
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Clinical Notes</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Describe findings, observations, and recommendations..."
          placeholderTextColor={colors.ink400}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={6}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Attachments</Text>
          <TouchableOpacity onPress={handleAttach}>
            <Text style={styles.link}>+ Add File</Text>
          </TouchableOpacity>
        </View>

        {attachments.length === 0 ? (
          <Card style={{ marginBottom: 24 }}>
            <Text style={styles.meta}>No files attached yet — add lab reports, scans, or images.</Text>
          </Card>
        ) : (
          <View style={styles.chipRow}>
            {attachments.map((a, i) => (
              <View key={i} style={styles.chip}>
                <Text style={styles.chipText}>📄 {a}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save to Patient Record</Text>
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
  input: {
    backgroundColor: '#fff', borderWidth: 1.4, borderColor: colors.line, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 13.5, color: colors.ink900,
  },
  textarea: {
    backgroundColor: '#fff', borderWidth: 1.4, borderColor: colors.line, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 13, color: colors.ink900,
    minHeight: 120, textAlignVertical: 'top',
  },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 18, marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 11, fontWeight: '800', color: colors.ink600, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  link: { color: colors.purple700, fontWeight: '700', fontSize: 12 },
  meta: { fontSize: 12, color: colors.ink400 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  chip: { backgroundColor: colors.purple100, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 7 },
  chipText: { fontSize: 11, fontWeight: '700', color: colors.purple700 },
  saveButton: { backgroundColor: colors.purple600, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
