import { Tabs } from 'expo-router';
import { BookOpen, Mic, BarChart3, Settings } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import React from 'react';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const { colors ,isDark} = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          // borderTopColor: isDark === true ? colors.border : "transparent",
          // paddingBottom: 8,
          paddingTop: 4,
          height: 66,
          // elevation: 0, // 移除安卓阴影
          // shadowOpacity: 0, // 移除iOS阴影
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={{ color: 'transparent' }}
            style={({ pressed }) => [
              props.style,
              pressed && { opacity: 0.7 }
            ]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('stories', 'tabs'),
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: t('practice', 'tabs'),
          tabBarIcon: ({ size, color }) => <Mic size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: t('progress', 'tabs'),
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings', 'tabs'),
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
