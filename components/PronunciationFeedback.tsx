import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PronunciationScore } from '@/types/Story';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface PronunciationFeedbackProps {
  score: PronunciationScore | null;
  isVisible: boolean;
}

export default function PronunciationFeedback({
  score,
  isVisible,
}: PronunciationFeedbackProps) {
  const { colors } = useTheme();

  if (!isVisible || !score) {
    return null;
  }

  const getScoreColor = (value: number) => {
    if (value >= 80) return colors.success;
    if (value >= 60) return colors.warning;
    return colors.error;
  };

  const getScoreIcon = (value: number) => {
    if (value >= 80) return <CheckCircle size={16} color={colors.success} />;
    if (value >= 60) return <AlertCircle size={16} color={colors.warning} />;
    return <XCircle size={16} color={colors.error} />;
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 16,
          margin: 16,
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
        title: {
          fontSize: 18,
          fontWeight: '700',
          color: colors.text,
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
          color: colors.text,
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
          backgroundColor: colors.surfaceVariant,
          borderRadius: 4,
          overflow: 'hidden',
        },
        scoreBarFill: {
          height: '100%',
          borderRadius: 4,
        },
        scoreValue: {
          fontSize: 14,
          fontWeight: '700',
          minWidth: 40,
          textAlign: 'right',
        },
        overallScore: {
          marginTop: 16,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: colors.divider,
          alignItems: 'center',
        },
        overallLabel: {
          fontSize: 16,
          fontWeight: '600',
          color: colors.textSecondary,
          marginBottom: 8,
        },
        overallValue: {
          fontSize: 24,
          fontWeight: '700',
        },
      }),
    [colors]
  );

  const ScoreItem = ({ label, value }: { label: string; value: number }) => (
    <View style={dynamicStyles.scoreItem}>
      <View style={dynamicStyles.scoreHeader}>
        {getScoreIcon(value)}
        <Text style={dynamicStyles.scoreLabel}>{label}</Text>
      </View>
      <View style={dynamicStyles.scoreBarContainer}>
        <View style={dynamicStyles.scoreBar}>
          <View
            style={[
              dynamicStyles.scoreBarFill,
              { width: `${value}%`, backgroundColor: getScoreColor(value) },
            ]}
          />
        </View>
        <Text
          style={[dynamicStyles.scoreValue, { color: getScoreColor(value) }]}
        >
          {value}%
        </Text>
      </View>
    </View>
  );

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Pronunciation Analysis</Text>

      <ScoreItem label="Accuracy" value={score.accuracy} />
      <ScoreItem label="Fluency" value={score.fluency} />
      <ScoreItem label="Completeness" value={score.completeness} />

      <View style={dynamicStyles.overallScore}>
        <Text style={dynamicStyles.overallLabel}>Overall Score</Text>
        <Text
          style={[
            dynamicStyles.overallValue,
            { color: getScoreColor(score.overall) },
          ]}
        >
          {score.overall}%
        </Text>
      </View>
    </View>
  );
}
