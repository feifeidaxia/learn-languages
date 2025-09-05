import { 
  useEffect, 
  useState 
} from 'react';
import { 
  Stack, 
  useRouter 
} from 'expo-router';
import { 
  ThemeProvider, 
  useThemeContext 
} from '@/components/ThemeProvider';
import { 
  LanguageProvider 
} from '@/hooks/useLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  StatusBar, 
  Platform,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { 
  useFrameworkReady 
} from '@/hooks/useFrameworkReady';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import SplashScreenComponent from '@/components/SplashScreen';
import ThemeAwareStatusBar from '@/components/ThemeAwareStatusBar';

const SafeAreaWrapper = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useThemeContext();
  
  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: colors.background }
    ]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 39 : 0 // Android顶部安全距离
  }
});

export default function RootLayout() {
  useFrameworkReady();
  const [appReady, setAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'cover' | '(tabs)'>('cover');

  useEffect(() => {
    async function prepare() {
      try {
        const hasSeenCover = await AsyncStorage.getItem('@hasSeenCover');
        const nextRoute = hasSeenCover === 'true' ? '(tabs)' : 'cover';
        setInitialRoute(nextRoute);
        
        // 模拟资源加载时间
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };


   return (
    <LanguageProvider>
      <ThemeProvider>
        {showSplash ? (
          <View style={{ flex: 1 }}>
            <SplashScreenComponent onLoadingComplete={handleSplashComplete} />
          </View>
        ) : !appReady ? null : (
          <SafeAreaWrapper>
            <ThemeAwareStatusBar />
            <Stack 
              screenOptions={{ 
                headerShown: false,
                contentStyle: { 
                  flex: 1,
                  backgroundColor: 'transparent' 
                }
              }}
              initialRouteName={initialRoute}
            >
              <Stack.Screen name="cover" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SafeAreaWrapper>
        )}
      </ThemeProvider>
    </LanguageProvider>
  );
}