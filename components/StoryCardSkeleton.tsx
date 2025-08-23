// components/StoryCardSkeleton.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from 'moti/skeleton';
import { useTheme } from '@/hooks/useTheme';

export default function StoryCardSkeleton() {
  const { isDark, colors } = useTheme();

  // 定义骨架屏颜色（亮色和暗色不同）
  const skeletonColors = isDark
    ? ['#333', '#444', '#555'] // 夜间模式：深灰渐变
    : ['#e0e0e0', '#f2f2f2', '#e0e0e0']; // 白天模式：浅灰渐变

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Skeleton
          width={90}
          height={24}
          radius={12}
          colors={skeletonColors}
          transition={{ type: 'timing', duration: 1200 }}
        />
        <Skeleton
          width={120}
          height={16}
          radius={8}
          colors={skeletonColors}
          transition={{ type: 'timing', duration: 1200 }}
        />
      </View>

      {/* 3 language sections */}
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={[styles.section, { borderBottomColor: colors.divider }]}
        >
          <Skeleton
            width={80}
            height={18}
            radius={6}
            colors={skeletonColors}
            transition={{ type: 'timing', duration: 1200 }}
          />
          <View style={styles.gap8} />
          <Skeleton
            width={'100%'}
            height={18}
            radius={6}
            colors={skeletonColors}
            transition={{ type: 'timing', duration: 1200 }}
          />
          <View style={styles.gap6} />
          <Skeleton
            width={'92%'}
            height={18}
            radius={6}
            colors={skeletonColors}
            transition={{ type: 'timing', duration: 1200 }}
          />
          <View style={styles.gap6} />
          <Skeleton
            width={'70%'}
            height={14}
            radius={6}
            colors={skeletonColors}
            transition={{ type: 'timing', duration: 1200 }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  gap6: { height: 6 },
  gap8: { height: 8 },
});
