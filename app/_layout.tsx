import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/hooks/useLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import React from 'react';

export default function RootLayout() {
  useFrameworkReady();
  const [initialRoute, setInitialRoute] = useState('(tabs)');

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasSeenCover = await AsyncStorage.getItem('@hasSeenCover');
      console.log('hasSeenCover:', hasSeenCover);
      // 首次安装（未看过引导页）→ 初始路由设为 cover；否则设为 splash
      setInitialRoute(hasSeenCover ? 'splash' : 'cover');
    };
    checkFirstLaunch();
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Stack 
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRoute}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="cover"  />
          <Stack.Screen name="splash" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </LanguageProvider>
  );
}