import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView, // Good practice for forms on mobile
  Platform, // Used with KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }

    // Clear any previous error
    setError('');

    // --- Authentication Logic Placeholder ---
    
    // For demonstration, let's just show an alert
    Alert.alert(
      'Login Successful!',
      `Logged in as: ${email}`,
      [
        // In a real app, you would navigate away here (e.g., using Expo Router or React Navigation)
        { text: 'OK' }
      ]
    );

    // Reset fields after successful (simulated) login
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true} // Hides the input text
            autoCapitalize="none"
          />
        </View>

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Login Button */}
        <Pressable 
          style={styles.loginButton} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
        
        {/* Forgot Password Link */}
        <Pressable style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </Pressable>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginForm;

// --- Stylesheet ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f7f7f7',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#007bff', // Primary blue color
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  forgotPassword: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  }
});