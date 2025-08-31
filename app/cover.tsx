import * as React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface LanguageBubbleProps {
  text: string;
  style: object;
}

const LanguageBubble: React.FC<LanguageBubbleProps> = ({ text, style }) => (
  <View style={[styles.languageBubble, style]}>
    <Text style={styles.languageBubbleText}>{text}</Text>
  </View>
);

interface FeatureItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIconContainer}>
      <Ionicons name={icon} size={28} color="#fff" />
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const CoverScreen: React.FC = () => {
  const router = useRouter();

const handleGetStarted = async () => {
  try {
    await AsyncStorage.setItem('@hasSeenCover', 'true'); // 标记“已看过引导页”
    router.replace('/(tabs)'); // 直接跳主页面
  } catch (error) {
    console.error('Failed to set storage flags:', error);
    router.replace('/(tabs)');
  }
};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>L</Text>
              </View>
              <Text style={styles.appName}>LinguaLearn</Text>
            </View>
            
            <Text style={styles.tagline}>探索语言的奇妙世界</Text>
            
            <View style={styles.featuresContainer}>
              <FeatureItem icon="chatbubble-outline" text="智能对话练习" />
              <FeatureItem icon="book-outline" text="情境化学习" />
              <FeatureItem icon="globe-outline" text="多语言支持" />
            </View>
            
            <TouchableOpacity 
              style={styles.getStartedButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.getStartedText}>立即开始</Text>
            </TouchableOpacity>
            
            <Text style={styles.communityText}>
              加入超过100万用户的学习社区
            </Text>
          </View>
          
          {/* 装饰性语言气泡 */}
          <LanguageBubble text="你好" style={styles.bubble1} />
          <LanguageBubble text="Hello" style={styles.bubble2} />
          <LanguageBubble text="Bonjour" style={styles.bubble3} />
          <LanguageBubble text="Hola" style={styles.bubble4} />
          <LanguageBubble text="こんにちは" style={styles.bubble5} />
        </SafeAreaView>
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
    width: '100%',
  },
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3b5998',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    opacity: 0.9,
    marginBottom: 40,
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  featureItem: {
    alignItems: 'center',
    width: width / 3.5,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b5998',
  },
  communityText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#fff',
    opacity: 0.8,
  },
  languageBubble: {
    position: 'absolute',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  languageBubbleText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  bubble1: {
    top: '15%',
    left: '10%',
  },
  bubble2: {
    top: '25%',
    right: '15%',
  },
  bubble3: {
    bottom: '30%',
    left: '20%',
  },
  bubble4: {
    bottom: '20%',
    right: '25%',
  },
  bubble5: {
    top: '50%',
    left: '15%',
  },
});

export default CoverScreen;