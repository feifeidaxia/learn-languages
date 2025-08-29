import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { TrendingUp, Award, Target, Clock } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import ScoreItem from '@/components/ScoreItem';

export default function ProgressScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const stats = [
    {
      icon: <TrendingUp size={24} color={colors.primary} />,
      title: t('storiesCompleted', 'progress'),
      value: '12',
      subtitle: t('thisWeek', 'progress'),
    },
    {
      icon: <Award size={24} color={colors.success} />,
      title: t('averageScore', 'progress'),
      value: '87%',
      subtitle: t('improvement', 'progress'),
    },
    {
      icon: <Target size={24} color={colors.warning} />,
      title: t('pronunciationGoal', 'progress'),
      value: '90%',
      subtitle: t('toReach', 'progress'),
    },
    {
      icon: <Clock size={24} color={colors.error} />,
      title: t('practiceTime', 'progress'),
      value: '2.5h',
      subtitle: t('thisWeekTime', 'progress'),
    },
  ];

  const recentScores = [
    { language: 'English', score: 92, date: '2024-01-15' },
    { language: 'Chinese', score: 85, date: '2024-01-14' },
    { language: 'Japanese', score: 78, date: '2024-01-13' },
    { language: 'English', score: 89, date: '2024-01-12' },
    { language: 'Chinese', score: 82, date: '2024-01-11' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
        },
        header: {
          paddingHorizontal: 16,
          paddingVertical: 20,
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        title: {
          fontSize: 28,
          fontWeight: '700',
          color: colors.text,
        },
        scrollView: {
          flex: 1,
        },
        scrollContent: {
          paddingVertical: 16,
        },
        statsGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: 16,
          paddingVertical: 16,
          gap: 12,
        },
        statCard: {
          width: '47%',
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 16,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        },
        statIcon: {
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.surfaceVariant,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 12,
        },
        statValue: {
          fontSize: 24,
          fontWeight: '700',
          color: colors.text,
          marginBottom: 4,
        },
        statTitle: {
          fontSize: 14,
          fontWeight: '600',
          color: colors.text,
          textAlign: 'center',
          marginBottom: 4,
        },
        statSubtitle: {
          fontSize: 12,
          color: colors.textSecondary,
          textAlign: 'center',
        },
        recentScoresSection: {
          backgroundColor: colors.surface,
          borderRadius: 12,
          margin: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: colors.border,
        },
        sectionTitle: {
          fontSize: 20,
          fontWeight: '700',
          color: colors.text,
          marginBottom: 16,
        },
        scoreItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.divider,
        },
        scoreLeft: {
          flex: 1,
        },
        scoreLang: {
          fontSize: 16,
          fontWeight: '600',
          color: colors.text,
          marginBottom: 4,
        },
        scoreDate: {
          fontSize: 14,
          color: colors.textSecondary,
        },
        scoreRight: {
          alignItems: 'flex-end',
        },
        scoreValue: {
          fontSize: 18,
          fontWeight: '700',
          marginBottom: 8,
        },
        scoreBar: {
          width: 80,
          height: 6,
          backgroundColor: colors.surfaceVariant,
          borderRadius: 3,
          overflow: 'hidden',
        },
        scoreBarFill: {
          height: '100%',
          borderRadius: 3,
        },
        achievementsSection: {
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 20,
          margin: 16,
          borderWidth: 1,
          borderColor: colors.border,
        },
        achievementsList: {
          gap: 12,
        },
        achievementItem: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          backgroundColor: colors.surfaceVariant,
          borderRadius: 8,
        },
        achievementText: {
          fontSize: 14,
          fontWeight: '500',
          color: colors.text,
          marginLeft: 12,
        },
      }),
    [colors]
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>{t('title', 'progress')}</Text>
      </View>

      <ScrollView
        style={dynamicStyles.scrollView}
        contentContainerStyle={dynamicStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={dynamicStyles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={dynamicStyles.statCard}>
              <View style={dynamicStyles.statIcon}>{stat.icon}</View>
              <Text style={dynamicStyles.statValue}>{stat.value}</Text>
              <Text style={dynamicStyles.statTitle}>{stat.title}</Text>
              <Text style={dynamicStyles.statSubtitle}>{stat.subtitle}</Text>
            </View>
          ))}
        </View>

        <View style={dynamicStyles.recentScoresSection}>
          <Text style={dynamicStyles.sectionTitle}>{t('recentScores', 'progress')}</Text>
          {recentScores.map((score, index) => (
            <ScoreItem
              key={index}
              language={score.language}
              score={score.score}
              date={score.date}
            />
          ))}
        </View>

        <View style={dynamicStyles.achievementsSection}>
          <Text style={dynamicStyles.sectionTitle}>{t('achievements', 'progress')}</Text>
          <View style={dynamicStyles.achievementsList}>
            <View style={dynamicStyles.achievementItem}>
              <Award size={20} color={colors.warning} />
              <Text style={dynamicStyles.achievementText}>
                {t('firstPerfectScore', 'progress')}
              </Text>
            </View>
            <View style={dynamicStyles.achievementItem}>
              <Target size={20} color={colors.success} />
              <Text style={dynamicStyles.achievementText}>
                {t('practiceStreak', 'progress')}
              </Text>
            </View>
            <View style={dynamicStyles.achievementItem}>
              <TrendingUp size={20} color={colors.primary} />
              <Text style={dynamicStyles.achievementText}>
                {t('consistentImprovement', 'progress')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
