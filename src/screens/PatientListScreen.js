import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { patients } from '../data/mockData';

export default function PatientListScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return patients;
    return patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>My Patients</Text>

        <TextInput
          style={styles.search}
          placeholder="Search patients..."
          placeholderTextColor={colors.ink400}
          value={query}
          onChangeText={setQuery}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          {filtered.map((p) => (
            <TouchableOpacity
              key={p.id}
              onPress={() => navigation.navigate('PatientHistory', { patientId: p.id })}
            >
              <Card style={{ marginBottom: 10 }}>
                <View style={styles.row}>
                  <Avatar initials={p.initials} size={44} fontSize={14} />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={styles.name}>{p.name}</Text>
                    <Text style={styles.meta}>
                      {p.age} yrs · {p.gender}
                    </Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
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
  search: {
    backgroundColor: '#fff', borderWidth: 1.4, borderColor: colors.line, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 11, fontSize: 13, color: colors.ink900, marginBottom: 16,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 13.5, fontWeight: '700', color: colors.ink900 },
  meta: { fontSize: 11.5, color: colors.ink400, marginTop: 1 },
  chevron: { fontSize: 18, color: colors.ink400 },
});
