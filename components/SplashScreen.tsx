import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onLoadingComplete?: () => void;
}

const FloatingWord: React.FC<{ word: string; delay: number; index: number }> = ({ word, delay, index }) => {
  const [anim] = useState(new Animated.Value(0));
  
  // 为每个单词生成随机位置
  const randomLeft = Math.random() * (width - 100) + 20;
  const randomTop = Math.random() * (height - 100) + 50;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 5000 + Math.random() * 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 5000 + Math.random() * 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        )
      ]).start();
    };
    animate();
  }, []);

  const opacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.1, 1, 0.1],
  });

  const scale = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.9, 1.1, 0.9],
  });

  return (
    <Animated.Text
      style={[
        styles.floatingWord,
        {
          left: randomLeft,
          top: randomTop,
          transform: [{ scale }],
          opacity,
          fontSize: 18 + Math.random() * 8,
        },
      ]}
    >
      {word}
    </Animated.Text>
  );
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadingComplete }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const [progress] = useState(new Animated.Value(0));
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [logoScale] = useState(new Animated.Value(0));
  const [currentPercent, setCurrentPercent] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  // 使用翻译函数获取加载文本
  const loadingTexts = [
    t('loadingResources', 'splash'),
    t('initializingVoice', 'splash'),
    t('preparingContent', 'splash'),
    t('startingJourney', 'splash')
  ];

  const languageWords = ['Hello', '你好', 'こんにちは', 'Hola', 'Bonjour', '안녕하세요'];

  useEffect(() => {
    // Logo弹跳动画
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // 监听进度变化，更新百分比
    const progressListener = progress.addListener(({ value }) => {
      const percent = Math.floor(value * 100);
      setCurrentPercent(percent);
    });

    // 模拟加载进度
    Animated.timing(progress, {
      toValue: 1,
      duration: 3400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    // 切换加载文本
    const textInterval = setInterval(() => {
      setLoadingTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 850);

    // 模拟加载完成
    const timer = setTimeout(() => {
      clearInterval(textInterval);
      progress.removeListener(progressListener);
      setHasCompleted(true);
      if (onLoadingComplete) {
        onLoadingComplete();
      } else {
        // 如果没有传入回调，则自动导航到主界面
        router.replace('/(tabs)');
      }
    }, 3400);

    return () => {
      clearInterval(textInterval);
      progress.removeListener(progressListener);
      clearTimeout(timer);
    };
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const logoScaleStyle = {
    transform: [
      {
        scale: logoScale.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
  };

  const pulseAnim = progress.interpolate({
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: [1, 1.1, 0.9, 1],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#4a569d']}
        style={styles.background}
      >
        {/* 浮动语言单词 */}
        {languageWords.map((word, index) => (
          <FloatingWord 
            key={word} 
            word={word} 
            delay={index * 300}
            index={index}
          />
        ))}

        <View style={styles.content}>
          {/* 动画logo */}
          <Animated.View style={[styles.logoContainer, logoScaleStyle]}>
              <Ionicons name="language" size={80} color="#fff" />
            <Animated.Text 
              style={[
                styles.appName,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              LinguaLearn
            </Animated.Text>
          </Animated.View>

          {/* 加载文本 */}
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              {loadingTexts[loadingTextIndex]}
            </Text>
          </View>

          {/* 进度条 */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <Animated.View 
                style={[
                  styles.progressBar, 
                  { width: progressWidth },
                  {
                    transform: [
                      {
                        scaleY: progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1.2],
                        }),
                      },
                    ],
                  }
                ]}
              />
            </View>
            <Animated.Text 
              style={[
                styles.progressText,
                {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                }
              ]}
            >
              {currentPercent}%
            </Animated.Text>
          </View>

          {/* 装饰性语言图标 */}
          <View style={styles.languageIcons}>
            {['chatbubble', 'book', 'mic', 'headset'].map((icon) => (
              <View key={icon} style={styles.iconContainer}>
                <Ionicons 
                  name={icon as any} 
                  size={24} 
                  color="rgba(255,255,255,0.8)" 
                />
              </View>
            ))}
          </View>

          <Text style={styles.tagline}>
            {t('tagline', 'splash')}
          </Text>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  loadingContainer: {
    marginBottom: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressContainer: {
    width: width * 0.7,
    marginBottom: 40,
    alignItems: 'center',
  },
  progressBackground: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  languageIcons: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  iconContainer: {
    marginHorizontal: 12,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  floatingWord: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.7)',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
  },
});

export default SplashScreen;