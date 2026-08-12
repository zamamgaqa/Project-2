import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

// Same note as LoginScreen: on a physical phone via Expo Go, replace
// "localhost" with your computer's local network IP, e.g. "http://192.168.1.5:5000".
const API_URL = 'http://localhost:5000';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing info', 'Name, email, and password are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match", 'Please re-enter your password.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Weak password', 'Use at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, specialty }),
      });
      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Registration failed', data.message || 'Please try again.');
        return;
      }

      // data.token and data.doctor are available here too, same as login —
      // could log the doctor straight in instead of sending them to Login.
      Alert.alert('Account created', 'You can now log in with your new account.', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
    } catch (err) {
      Alert.alert(
        'Connection error',
        'Could not reach the server. Make sure the backend is running and API_URL is correct.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Register as Doctor</Text>
        <Text style={styles.subtitle}>Create your account to manage patients and appointments</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Dr. Sarah Miller"
          placeholderTextColor={colors.ink400}
          value={name}
          onChangeText={setName}
        />

        <Text style={[styles.label, { marginTop: 14 }]}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="dr.sarah@smartclinic.com"
          placeholderTextColor={colors.ink400}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={[styles.label, { marginTop: 14 }]}>Specialty</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Cardiologist"
          placeholderTextColor={colors.ink400}
          value={specialty}
          onChangeText={setSpecialty}
        />

        <Text style={[styles.label, { marginTop: 14 }]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="At least 8 characters"
          placeholderTextColor={colors.ink400}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={[styles.label, { marginTop: 14 }]}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          placeholderTextColor={colors.ink400}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Account</Text>}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.replace('Login')}>
            Log In
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgApp },
  container: { padding: 24, paddingBottom: 40 },
  backBtn: {
    width: 30, height: 30, borderRadius: 9, backgroundColor: '#fff', borderWidth: 1,
    borderColor: colors.line, alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  title: { fontSize: 21, fontWeight: '800', color: colors.purple900 },
  subtitle: { fontSize: 13, color: colors.ink400, marginTop: 4, marginBottom: 20 },
  label: { fontSize: 12, fontWeight: '700', color: colors.ink600, marginBottom: 6 },
  input: {
    backgroundColor: '#fff', borderWidth: 1.4, borderColor: colors.line, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: colors.ink900,
  },
  button: {
    backgroundColor: colors.purple600, borderRadius: 12, paddingVertical: 15,
    alignItems: 'center', marginTop: 24,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  link: { color: colors.purple700, fontWeight: '700' },
  footerText: { textAlign: 'center', color: colors.ink400, fontSize: 12.5, marginTop: 18 },
});
