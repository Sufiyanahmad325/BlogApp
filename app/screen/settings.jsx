import React from 'react';
import { View, Text, Pressable, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

const SettingsScreen = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Settings List */}
      <View style={styles.section}>

        <View style={styles.item}>
          <Text style={styles.text}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <Pressable style={styles.item} onPress={() => router.push('/screen/changePassword')}>
          <Text style={styles.text}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </Pressable>

        <Pressable style={styles.item} onPress={() => router.push('/screen/privacyPolicy')}>
          <Text style={styles.text}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </Pressable>

        <Pressable style={styles.item} onPress={() => router.push('/screen/terms')}>
          <Text style={styles.text}>Terms & Conditions</Text>
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </Pressable>

      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  section: {
    marginTop: 20,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    color: '#222',
  },
});
