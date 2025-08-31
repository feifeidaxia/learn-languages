import * as React from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/useTheme';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  
  // 动画值
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  
  useEffect(() => {
  ExpoSplashScreen.preventAutoHideAsync();

  const showSplashAndRedirect = async () => {
    try {
      // 闪屏动画逻辑（保持原有动画代码）
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(async () => {
          await ExpoSplashScreen.hideAsync();
          router.replace('/(tabs)'); // 动画结束后跳主页面
        });
      }, 2000);
    } catch (error) {
      console.error('Error in splash screen:', error);
      router.replace('/(tabs)');
    }
  };

  showSplashAndRedirect();
}, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={isDark ? 
          ['#1a2151', '#2d3a80', '#3b4db0'] : 
          ['#e6f2ff', '#c1dfff', '#99ccff']}
        style={styles.background}
      >
        <Animated.View 
          style={[
            styles.contentContainer,
            { 
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }] 
            }
          ]}
        >
          {/* Logo */}
          <View style={[styles.logoCircle, { backgroundColor: colors.surface }]}>
            <Text style={[styles.logoText, { color: colors.primary }]}>L</Text>
          </View>
          
          {/* 应用名称 */}
          <Text style={[styles.appName, { color: colors.text }]}>LinguaLearn</Text>
          
          {/* 标语 */}
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>探索语言的奇妙世界</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
});

export default SplashScreen;