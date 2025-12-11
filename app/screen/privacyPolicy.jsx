import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function PrivacyPolicy() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      
      {/* Header */}
      <View
        style={{
          backgroundColor: "#4F46E5",
          paddingVertical: 18,
          paddingHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "700",
            marginLeft: 15,
          }}
        >
          Privacy Policy
        </Text>
      </View>

      {/* Body */}
      <ScrollView
        style={{ padding: 18 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
          Introduction
        </Text>
        <Text style={{ fontSize: 15, color: "#444", marginBottom: 20 }}>
          We value your trust. This Privacy Policy explains how we collect,
          use, and safeguard your information when you use our mobile
          application.
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
          Information We Collect
        </Text>
        <Text style={{ fontSize: 15, color: "#444", marginBottom: 20 }}>
          • Personal details such as name, email, or phone number. {"\n"}
          • Device information and usage statistics. {"\n"}
          • App activity and preference data.
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
          How We Use Your Information
        </Text>
        <Text style={{ fontSize: 15, color: "#444", marginBottom: 20 }}>
          • To improve app performance and user experience. {"\n"}
          • To send important updates and notifications. {"\n"}
          • To ensure user security and prevent misuse.
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
          Data Protection
        </Text>
        <Text style={{ fontSize: 15, color: "#444", marginBottom: 20 }}>
          We use advanced security measures to protect your information.
          However, no method of transmission is 100% secure.
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
          Your Rights
        </Text>
        <Text style={{ fontSize: 15, color: "#444", marginBottom: 20 }}>
          • You may request deletion of your data. {"\n"}
          • You may correct or update personal info. {"\n"}
          • You may opt-out of notifications anytime.
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
          Contact Us
        </Text>
        <Text style={{ fontSize: 15, color: "#444", marginBottom: 60 }}>
          If you have any questions regarding this Privacy Policy, feel free to
          contact us at: support@example.com
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
