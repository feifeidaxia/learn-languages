import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { TrendingUp, Award, Target, Clock } from 'lucide-react-native';

export default function ProgressScreen() {
  const stats = [
    {
      icon: <TrendingUp size={24} color="#6366f1" />,
      title: 'Stories Completed',
      value: '12',
      subtitle: '+3 this week',
    },
    {
      icon: <Award size={24} color="#10b981" />,
      title: 'Average Score',
      value: '87%',
      subtitle: '+5% improvement',
    },
    {
      icon: <Target size={24} color="#f59e0b" />,
      title: 'Pronunciation Goal',
      value: '90%',
      subtitle: '3% to reach',
    },
    {
      icon: <Clock size={24} color="#ef4444" />,
      title: 'Practice Time',
      value: '2.5h',
      subtitle: 'This week',
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
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIcon}>{stat.icon}</View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
            </View>
          ))}
        </View>

        <View style={styles.recentScoresSection}>
          <Text style={styles.sectionTitle}>Recent Scores</Text>
          {recentScores.map((score, index) => (
            <View key={index} style={styles.scoreItem}>
              <View style={styles.scoreLeft}>
                <Text style={styles.scoreLang}>{score.language}</Text>
                <Text style={styles.scoreDate}>{score.date}</Text>
              </View>
              <View style={styles.scoreRight}>
                <Text style={[styles.scoreValue, { color: getScoreColor(score.score) }]}>
                  {score.score}%
                </Text>
                <View style={styles.scoreBar}>
                  <View
                    style={[
                      styles.scoreBarFill,
                      {
                        width: `${score.score}%`,
                        backgroundColor: getScoreColor(score.score),
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <Award size={20} color="#fbbf24" />
              <Text style={styles.achievementText}>First Perfect Score!</Text>
            </View>
            <View style={styles.achievementItem}>
              <Target size={20} color="#34d399" />
              <Text style={styles.achievementText}>Practice Streak: 7 days</Text>
            </View>
            <View style={styles.achievementItem}>
              <TrendingUp size={20} color="#60a5fa" />
              <Text style={styles.achievementText}>Consistent Improvement</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
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
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  recentScoresSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  scoreLeft: {
    flex: 1,
  },
  scoreLang: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  scoreDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  scoreRight: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  scoreBar: {
    width: 60,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  achievementsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 12,
  },
});