import React from 'react';
import { View, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage, LanguageCode } from '@/hooks/useLanguage';

const LANGUAGES = [
  { code: 'en', name: 'English', localName: 'English' },
  { code: 'zh', name: 'Chinese', localName: '中文' },
  { code: 'ja', name: 'Japanese', localName: '日本語' },
];

export default function LanguageScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageSelect = (langCode: LanguageCode) => {
    setLanguage(langCode);
    // 短暂延迟后返回，让用户看到选择效果
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{t('title', 'language')}</Text>
      </View>

      <View style={styles.languageList}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageItem,
              { 
                backgroundColor: colors.card,
                shadowColor: colors.shadow
              },
              language === lang.code && { borderColor: colors.primary, borderWidth: 2 }
            ]}
            onPress={() => handleLanguageSelect(lang.code as LanguageCode)}
          >
            <View style={styles.languageInfo}>
              <Text style={[styles.languageName, { color: colors.text }]}>{lang.name}</Text>
              <Text style={[styles.languageLocalName, { color: colors.textSecondary }]}>{lang.localName}</Text>
            </View>
            {language === lang.code && (
              <View style={[styles.checkmark, { backgroundColor: colors.primary }]} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageList: {
    padding: 16,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
  },
  languageLocalName: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
