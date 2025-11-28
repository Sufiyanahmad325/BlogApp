import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../../ReduxToolkit/BlogRedux";
import { router } from "expo-router";

const SignupScreen = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!form.fullName || !form.username || !form.email || !form.password) {
      return Alert.alert("Error", "All fields are required");
    }

    try {
      setLoading(true);
      const res = await dispatch(registerUser(form)).unwrap();
      if (res.success) {
        Alert.alert("Success", res.message);
        router.push("/(tabs)/userProfileTab");
      }
    } catch (err) {
      Alert.alert("Signup Failed", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subTitle}>Sign up to get started</Text>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        value={form.fullName}
        onChangeText={(text) => setForm({ ...form, fullName: text })}
      />

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Choose a username"
        value={form.username}
        onChangeText={(text) => setForm({ ...form, username: text })}
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        keyboardType="email-address"
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
      />

      {/* Button */}
      <Pressable style={[styles.button, loading && { opacity: 0.7 }]} onPress={handleSignup} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Create Account</Text>}
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={{ fontWeight: "700" }}>Login</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 15,
  },
});
