import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';

export interface ThemeColors {
  // 背景色
  background: string;
  surface: string;
  surfaceVariant: string;

  // 文字色
  text: string;
  textSecondary: string;
  textTertiary: string;

  // 边框和分割线
  border: string;
  divider: string;

  // 主要颜色
  primary: string;
  primaryVariant: string;

  // 状态颜色
  success: string;
  warning: string;
  error: string;
  info: string;

  // 其他
  shadow: string;
  overlay: string;
}

const lightColors: ThemeColors = {
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceVariant: '#f3f4f6',
  text: '#111827',
  textSecondary: '#374151',
  textTertiary: '#6b7280',
  border: '#e5e7eb',
  divider: '#f3f4f6',
  primary: '#6366f1',
  primaryVariant: '#4f46e5',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.1)',
};

const darkColors: ThemeColors = {
  background: '#0f172a',
  surface: '#1e293b',
  surfaceVariant: '#334155',
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  textTertiary: '#94a3b8',
  border: '#334155',
  divider: '#475569',
  primary: '#818cf8',
  primaryVariant: '#a5b4fc',
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171',
  info: '#60a5fa',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.3)',
};

const THEME_STORAGE_KEY = '@theme_preference';

// 全局主题状态
let globalTheme: Theme = 'light';
let themeListeners: Set<(theme: Theme) => void> = new Set();

// 通知所有监听器主题变化
const notifyThemeChange = (newTheme: Theme) => {
  globalTheme = newTheme;
  themeListeners.forEach((listener) => listener(newTheme));
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(globalTheme);
  const [isLoading, setIsLoading] = useState(true);

  // 从存储中加载主题设置
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
          const newTheme = savedTheme as Theme;
          globalTheme = newTheme;
          setTheme(newTheme);
          // console.log('Theme loaded from storage:', newTheme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  // 监听主题变化
  useEffect(() => {
    const handleThemeChange = (newTheme: Theme) => {
      // console.log('Theme changed to:', newTheme);
      setTheme(newTheme);
    };

    themeListeners.add(handleThemeChange);

    return () => {
      themeListeners.delete(handleThemeChange);
    };
  }, []);

  // 获取当前实际使用的颜色
  const getCurrentColors = useCallback((): ThemeColors => {
    const currentColors = theme === 'dark' ? darkColors : lightColors;
    // console.log(
    //   '🎨 [useTheme] Getting colors for theme:',
    //   theme,
    //   'isDark:',
    //   theme === 'dark'
    // );
    // console.log('🎨 [useTheme] Background color:', currentColors.background);
    // console.log('🎨 [useTheme] Surface color:', currentColors.surface);
    // console.log('🎨 [useTheme] Text color:', currentColors.text);
    return currentColors;
  }, [theme]);

  // 切换主题
  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    // console.log('Toggling theme from', theme, 'to', newTheme);

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      notifyThemeChange(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, [theme]);

  // 设置特定主题
  const setSpecificTheme = useCallback(async (newTheme: Theme) => {
    // console.log('Setting specific theme to:', newTheme);

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      notifyThemeChange(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, []);

  // 获取当前主题名称
  const getThemeName = useCallback((): string => {
    return theme === 'dark' ? 'Dark' : 'Light';
  }, [theme]);

  return {
    theme,
    colors: getCurrentColors(),
    isDark: theme === 'dark',
    isLoading,
    toggleTheme,
    setSpecificTheme,
    getThemeName,
  };
};
