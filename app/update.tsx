import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { Updates } from 'expo-updates';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { RefreshCw } from 'lucide-react-native';

export default function UpdateScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  
  const [isChecking, setIsChecking] = useState(false);

  const checkUpdate = async () => {
    setIsChecking(true);
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert(t('updateAvailableTitle'), t('updateAvailableMessage'));
      } else {
        Alert.alert(t('upToDateTitle'), t('upToDateMessage'));
      }
    } catch (error) {
      Alert.alert(t('updateErrorTitle'), t('updateErrorMessage'));
      console.error(error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <RefreshCw size={48} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>{t('checkUpdate')}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t('checkUpdateDescription')}
        </Text>
        
        {isChecking ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Text 
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={checkUpdate}
          >
            {t('checkUpdateButton')}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 26,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});