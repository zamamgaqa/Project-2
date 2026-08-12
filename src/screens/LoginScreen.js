import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

// Point this at your backend. On a physical phone with Expo Go, "localhost"
// won't work — use your computer's local network IP instead, e.g.
// "http://192.168.1.5:5000". Find it with `ipconfig` (look for IPv4 Address).
const API_URL = 'http://localhost:5000';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        // backend sends { message: "..." } on errors like wrong password
        Alert.alert('Login failed', data.message || 'Please check your credentials.');
        return;
      }

      // data.token and data.doctor are now available.
      // TODO: store data.token somewhere the rest of the app can read it —
      // easiest for now is a simple global/context, or AsyncStorage for
      // persistence across app restarts (npx expo install @react-native-async-storage/async-storage).
      navigation.replace('MainTabs');
    } catch (err) {
      // Network errors usually mean: backend isn't running, wrong API_URL,
      // or phone/computer aren't on the same Wi-Fi network.
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
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text>‹</Text>
        </TouchableOpacity>

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

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          New to Smart Clinic?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
            Register as Doctor
          </Text>
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
  backBtn: {
    position: 'absolute',
    top: 8,
    left: 4,
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
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
