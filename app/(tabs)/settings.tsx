import React, { useState, useMemo } from 'react';
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
import { useTheme } from '@/hooks/useTheme';

export default function SettingsScreen() {
  const { colors, theme, setSpecificTheme } = useTheme();
  const [settings, setSettings] = useState({
    soundEffects: true,
    autoPlay: false,
    notifications: true,
    highQualityAudio: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleThemeChange = () => {
    if (theme === 'light') {
      setSpecificTheme('dark');
    } else {
      setSpecificTheme('light');
    }
  };

  const getThemeDisplayName = () => {
    return theme === 'dark' ? 'Dark' : 'Light';
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
        },
        header: {
          paddingHorizontal: 16,
          paddingVertical: 20,
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        title: {
          fontSize: 28,
          fontWeight: '700',
          color: colors.text,
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
          color: colors.textSecondary,
          marginLeft: 16,
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        sectionContent: {
          backgroundColor: colors.surface,
          borderRadius: 12,
          marginHorizontal: 16,
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        },
        footer: {
          padding: 15,
          alignItems: 'center',
        },
        footerText: {
          fontSize: 14,
          color: colors.textTertiary,
          textAlign: 'center',
          marginBottom: 4,
        },
      }),
    [colors]
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>Settings</Text>
      </View>

      <ScrollView
        style={dynamicStyles.scrollView}
        contentContainerStyle={dynamicStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Audio</Text>
          <View style={dynamicStyles.sectionContent}>
            <SettingItem
              icon={
                <Volume2 key="soundEffects" size={20} color={colors.primary} />
              }
              title="Sound Effects"
              subtitle="Play sounds for interactions"
              value={settings.soundEffects}
              onToggle={() => toggleSetting('soundEffects')}
            />
            <SettingItem
              icon={<Mic size={20} color={colors.primary} />}
              title="High Quality Audio"
              subtitle="Better audio quality, uses more data"
              value={settings.highQualityAudio}
              onToggle={() => toggleSetting('highQualityAudio')}
            />
            <SettingItem
              icon={<Volume2 key="autoPlay" size={20} color={colors.primary} />}
              title="Auto Play"
              subtitle="Automatically play audio when viewing stories"
              value={settings.autoPlay}
              onToggle={() => toggleSetting('autoPlay')}
            />
          </View>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>General</Text>
          <View style={dynamicStyles.sectionContent}>
            <SettingItem
              icon={
                <Bell key="notifications" size={20} color={colors.success} />
              }
              title="Notifications"
              subtitle="Daily practice reminders"
              value={settings.notifications}
              onToggle={() => toggleSetting('notifications')}
            />
            <SettingItem
              icon={<Moon key="darkMode" size={20} color={colors.primary} />}
              title="Dark Mode"
              subtitle={`Current: ${getThemeDisplayName()}`}
              value={theme === 'dark'}
              onToggle={handleThemeChange}
            />
            <SettingItem
              icon={<Globe size={20} color={colors.warning} />}
              title="Language Preferences"
              subtitle="Set primary learning language"
              showArrow
            />
          </View>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Support</Text>
          <View style={dynamicStyles.sectionContent}>
            <SettingItem
              icon={<HelpCircle size={20} color={colors.textTertiary} />}
              title="Help & FAQ"
              subtitle="Get help and answers"
              showArrow
            />
            <SettingItem
              icon={<Star size={20} color={colors.warning} />}
              title="Rate the App"
              subtitle="Help us improve"
              showArrow
            />
          </View>
        </View>

        <View style={dynamicStyles.footer}>
          <Text style={dynamicStyles.footerText}>Version 1.0.0</Text>
          <Text style={dynamicStyles.footerText}>
            Made with Hong for language learners❤
          </Text>
          <Text style={dynamicStyles.footerText}>
            Powered by Cursor🦊
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
