import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PronunciationScore } from '@/types/Story';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react-native';

interface PronunciationFeedbackProps {
  score: PronunciationScore | null;
  isVisible: boolean;
}

export default function PronunciationFeedback({ score, isVisible }: PronunciationFeedbackProps) {
  if (!isVisible || !score) {
    return null;
  }

  const getScoreColor = (value: number) => {
    if (value >= 80) return '#10b981';
    if (value >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreIcon = (value: number) => {
    if (value >= 80) return <CheckCircle size={16} color="#10b981" />;
    if (value >= 60) return <AlertCircle size={16} color="#f59e0b" />;
    return <XCircle size={16} color="#ef4444" />;
  };

  const ScoreItem = ({ label, value }: { label: string; value: number }) => (
    <View style={styles.scoreItem}>
      <View style={styles.scoreHeader}>
        {getScoreIcon(value)}
        <Text style={styles.scoreLabel}>{label}</Text>
      </View>
      <View style={styles.scoreBarContainer}>
        <View style={styles.scoreBar}>
          <View
            style={[
              styles.scoreBarFill,
              { width: `${value}%`, backgroundColor: getScoreColor(value) },
            ]}
          />
        </View>
        <Text style={[styles.scoreValue, { color: getScoreColor(value) }]}>
          {value}%
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronunciation Analysis</Text>
      
      <ScoreItem label="Accuracy" value={score.accuracy} />
      <ScoreItem label="Fluency" value={score.fluency} />
      <ScoreItem label="Completeness" value={score.completeness} />
      
      <View style={styles.overallScore}>
        <Text style={styles.overallLabel}>Overall Score</Text>
        <Text style={[styles.overallValue, { color: getScoreColor(score.overall) }]}>
          {score.overall}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  scoreItem: {
    marginBottom: 12,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  scoreBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'right',
  },
  overallScore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  overallLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  overallValue: {
    fontSize: 24,
    fontWeight: '700',
  },
});