import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.title}>Terms & Conditions</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.cardText}>
            By using this application, you agree to these Terms & Conditions.
            Please read them carefully. If you do not agree, please do not use
            the app.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>2. Use of Service</Text>
          <Text style={styles.cardText}>
            The app provides features for reading, creating and sharing content.
            You must use the service lawfully and must not abuse or interfere
            with other users' experience.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>3. Account Responsibility</Text>
          <Text style={styles.cardText}>
            You are responsible for maintaining your account credentials and
            for all activity that occurs under your account. Notify us
            immediately if you suspect unauthorized access.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>4. Content & Intellectual Property</Text>
          <Text style={styles.cardText}>
            All content you create remains yours, but by posting you grant the
            app a license to display and share it. Do not upload content that
            violates others’ rights or applicable law.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>5. Privacy</Text>
          <Text style={styles.cardText}>
            We collect and use data as described in our Privacy Policy. Using
            the app indicates acceptance of the Privacy Policy as well.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>6. Limitation of Liability</Text>
          <Text style={styles.cardText}>
            To the maximum extent permitted by law, the app is provided "as
            is" and we are not liable for indirect or consequential losses.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>7. Changes to Terms</Text>
          <Text style={styles.cardText}>
            We may update these Terms periodically. We'll notify changes via
            in-app notice or email; continued use after changes constitutes
            acceptance.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>8. Contact</Text>
          <Text style={styles.cardText}>
            For questions about these Terms, contact support@example.com.
          </Text>
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>

      {/* CTA / Accept Button */}
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.acceptBtn}
          onPress={() => {
            // Example action — close or navigate
            router.back();
          }}
        >
          <Text style={styles.acceptText}>I Agree</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7F8FB",
  },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E6E9F2",
    backgroundColor: "#fff",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    // subtle shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
  },

  bottom: {
    padding: 16,
    backgroundColor: "transparent",
  },

  acceptBtn: {
    backgroundColor: "#0F172A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  acceptText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  footerSpace: {
    height: 24,
  },
});
