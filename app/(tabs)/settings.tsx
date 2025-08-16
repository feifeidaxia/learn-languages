import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {
  Volume2,
  Mic,
  Bell,
  Moon,
  Globe,
  HelpCircle,
  Star,
  ChevronRight,
} from 'lucide-react-native';
import SettingItem from '../../components/SettingItem';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    soundEffects: true,
    autoPlay: false,
    notifications: true,
    darkMode: false,
    highQualityAudio: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audio</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<Volume2 key="soundEffects" size={20} color="#6366f1" />}
              title="Sound Effects"
              subtitle="Play sounds for interactions"
              value={settings.soundEffects}
              onToggle={() => toggleSetting('soundEffects')}
            />
            <SettingItem
              icon={<Mic size={20} color="#6366f1" />}
              title="High Quality Audio"
              subtitle="Better audio quality, uses more data"
              value={settings.highQualityAudio}
              onToggle={() => toggleSetting('highQualityAudio')}
            />
            <SettingItem
              icon={<Volume2 key="autoPlay" size={20} color="#6366f1" />}
              title="Auto Play"
              subtitle="Automatically play audio when viewing stories"
              value={settings.autoPlay}
              onToggle={() => toggleSetting('autoPlay')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<Bell key="notifications" size={20} color="#10b981" />}
              title="Notifications"
              subtitle="Daily practice reminders"
              value={settings.notifications}
              onToggle={() => toggleSetting('notifications')}
            />
            <SettingItem
              icon={<Moon key="darkMode" size={20} color="#7c3aed" />}
              title="Dark Mode"
              subtitle="Use dark theme"
              value={settings.darkMode}
              onToggle={() => toggleSetting('darkMode')}
            />
            <SettingItem
              icon={<Globe size={20} color="#f59e0b" />}
              title="Language Preferences"
              subtitle="Set primary learning language"
              showArrow
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={<HelpCircle size={20} color="#64748b" />}
              title="Help & FAQ"
              subtitle="Get help and answers"
              showArrow
            />
            <SettingItem
              icon={<Star size={20} color="#fbbf24" />}
              title="Rate the App"
              subtitle="Help us improve"
              showArrow
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerText}>
            Made with ❤️ for language learners
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 4,
  },
});
