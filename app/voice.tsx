import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const VOICE_KEY = '@user-voice';

const voices = [
  { id: 'alloy', name: 'Alloy' },
  { id: 'echo', name: 'Echo' },
  { id: 'fable', name: 'Fable' },
  { id: 'onyx', name: 'Onyx' },
  { id: 'nova', name: 'Nova' },
  { id: 'shimmer', name: 'Shimmer' },
];

export default function VoiceScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [selectedVoice, setSelectedVoice] = React.useState('alloy');
  const router = useRouter();

  React.useEffect(() => {
    const loadVoice = async () => {
      try {
        const voice = await AsyncStorage.getItem(VOICE_KEY);
        if (voice) setSelectedVoice(voice);
      } catch (error) {
        console.error('Failed to load voice preference:', error);
      }
    };
    loadVoice();
  }, []);

  const selectVoice = async (voiceId: string) => {
    setSelectedVoice(voiceId);
    try {
      await AsyncStorage.setItem(VOICE_KEY, voiceId);
       // 短暂延迟后返回，让用户看到选择效果
      setTimeout(() => {
      router.back();
     }, 300);
    } catch (error) {
      console.error('Failed to save voice preference:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t('voicePreferences')}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {t('voicePreferencesSubtitle')}
      </Text>
      
      <View style={styles.voicesContainer}>
        {voices.map((voice) => (
          <TouchableOpacity
            key={voice.id}
            style={[
              styles.voiceItem,
              { 
                backgroundColor: colors.surface,
                borderColor: voice.id === selectedVoice ? colors.primary : colors.border
              }
            ]}
            onPress={() => selectVoice(voice.id)}
          >
            <Text style={[styles.voiceName, { color: colors.text }]}>
              {voice.name}
            </Text>
            {voice.id === selectedVoice && (
              <Ionicons name="checkmark" size={20} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  voicesContainer: {
    gap: 12,
  },
  voiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  voiceName: {
    fontSize: 16,
  },
});