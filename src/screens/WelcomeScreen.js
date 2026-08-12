import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { colors } from '../theme/colors';

function RoleButton({ emoji, label, sublabel, onPress, primary }) {
  return (
    <TouchableOpacity
      style={[styles.roleCard, primary && styles.roleCardPrimary]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.roleIcon, primary && styles.roleIconPrimary]}>
        <Text style={{ fontSize: 22 }}>{emoji}</Text>
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={[styles.roleLabel, primary && styles.roleLabelPrimary]}>{label}</Text>
        <Text style={[styles.roleSub, primary && styles.roleSubPrimary]}>{sublabel}</Text>
      </View>
      <Text style={[styles.chevron, primary && styles.roleLabelPrimary]}>›</Text>
    </TouchableOpacity>
  );
}

export default function WelcomeScreen({ navigation }) {
  const comingSoon = (role) =>
    Alert.alert(
      `${role} perspective`,
      "This part of the app is being built by a teammate — check back once it's merged in."
    );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.brandIcon}>
          <Text style={{ fontSize: 30 }}>🩺</Text>
        </View>

        <Text style={styles.title}>Welcome to Smart Clinic</Text>
        <Text style={styles.subtitle}>
          Fast, simple access to care — for patients, doctors, and clinic staff.
        </Text>

        <View style={{ gap: 12, marginTop: 32 }}>
          <RoleButton
            emoji="🧑‍⚕️"
            label="I'm a Doctor"
            sublabel="Manage patients, appointments & prescriptions"
            primary
            onPress={() => navigation.navigate('Login')}
          />
          <RoleButton
            emoji="🧍"
            label="I'm a Patient"
            sublabel="Book appointments & view your records"
            onPress={() => comingSoon('Patient')}
          />
          <RoleButton
            emoji="🗂️"
            label="Clinic Staff / Admin"
            sublabel="Manage doctors, users & clinic settings"
            onPress={() => comingSoon('Admin')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  brandIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.purple600,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.purple900,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: colors.ink400,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
    paddingHorizontal: 12,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: colors.line,
    borderRadius: 16,
    padding: 14,
  },
  roleCardPrimary: {
    backgroundColor: colors.purple600,
    borderColor: colors.purple600,
  },
  roleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.purple100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleIconPrimary: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  roleLabel: { fontSize: 14.5, fontWeight: '800', color: colors.ink900 },
  roleLabelPrimary: { color: '#fff' },
  roleSub: { fontSize: 11, color: colors.ink400, marginTop: 2 },
  roleSubPrimary: { color: 'rgba(255,255,255,0.8)' },
  chevron: { fontSize: 20, color: colors.ink400, marginLeft: 6 },
});
