import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: replace with real auth call
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.brandIcon}>
          <Text style={{ fontSize: 26 }}>🩺</Text>
        </View>

        <Text style={styles.title}>Welcome back, Doctor</Text>
        <Text style={styles.subtitle}>Log in to manage today's patients</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="dr.sarah@smartclinic.com"
            placeholderTextColor={colors.ink400}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={[styles.label, { marginTop: 14 }]}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            placeholderTextColor={colors.ink400}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 8 }}>
            <Text style={styles.link}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          New to Smart Clinic? <Text style={styles.link}>Register as Doctor</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 6,
  },
  brandIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: colors.purple600,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.purple900,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: colors.ink400,
    textAlign: 'center',
    marginBottom: 24,
  },
  form: { marginBottom: 24 },
  label: { fontSize: 12, fontWeight: '700', color: colors.ink600, marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: colors.line,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.ink900,
  },
  link: { color: colors.purple700, fontWeight: '700', fontSize: 12.5 },
  button: {
    backgroundColor: colors.purple600,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  footerText: {
    textAlign: 'center',
    color: colors.ink400,
    fontSize: 12.5,
    marginTop: 18,
  },
});
