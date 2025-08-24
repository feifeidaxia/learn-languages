import React, { useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { PronunciationScore } from '@/types/Story';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import { JSX } from 'react/jsx-runtime';

interface PronunciationFeedbackProps {
  score: PronunciationScore | null;
  isVisible: boolean;
}

interface ScoreItemStyles {
  scoreItem: ViewStyle;
  scoreHeader: ViewStyle;
  scoreLabel: TextStyle;
  scoreBarContainer: ViewStyle;
  scoreBar: ViewStyle;
  scoreBarFill: ViewStyle;
  scoreValue: TextStyle;
}

const ScoreItem = ({
  label,
  value,
  getScoreColor,
  getScoreIcon,
  styles,
}: {
  label: string;
  value: number;
  getScoreColor: (v: number) => string;
  getScoreIcon: (v: number) => JSX.Element;
  styles: ScoreItemStyles;
}) => (
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

export default function PronunciationFeedback({
  score,
  isVisible,
}: PronunciationFeedbackProps) {
  const { colors } = useTheme();

  // 🔹 Hook 顶层调用，永远执行
  const getScoreColor = useCallback(
    (value: number) => {
      if (value >= 80) return colors.success;
      if (value >= 60) return colors.warning;
      return colors.error;
    },
    [colors]
  );

  const getScoreIcon = useCallback(
    (value: number) => {
      if (value >= 80) return <CheckCircle size={16} color={colors.success} />;
      if (value >= 60) return <AlertCircle size={16} color={colors.warning} />;
      return <XCircle size={16} color={colors.error} />;
    },
    [colors]
  );

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        margin: 16,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      } as ViewStyle,
      title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 16,
        textAlign: 'center',
      } as TextStyle,
      scoreItem: { marginBottom: 12 } as ViewStyle,
      scoreHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
      } as ViewStyle,
      scoreLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        marginLeft: 8,
      } as TextStyle,
      scoreBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      } as ViewStyle,
      scoreBar: {
        flex: 1,
        height: 8,
        backgroundColor: colors.surfaceVariant,
        borderRadius: 4,
        overflow: 'hidden',
      } as ViewStyle,
      scoreBarFill: { height: '100%', borderRadius: 4 } as ViewStyle,
      scoreValue: {
        fontSize: 14,
        fontWeight: '700',
        minWidth: 40,
        textAlign: 'right',
      } as TextStyle,
      overallScore: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
        alignItems: 'center',
      } as ViewStyle,
      overallLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textSecondary,
        marginBottom: 8,
      } as TextStyle,
      overallValue: { fontSize: 24, fontWeight: '700' } as TextStyle,
    });
  }, [colors]);

  const scoreItemStyles: ScoreItemStyles = {
    scoreItem: styles.scoreItem,
    scoreHeader: styles.scoreHeader,
    scoreLabel: styles.scoreLabel,
    scoreBarContainer: styles.scoreBarContainer,
    scoreBar: styles.scoreBar,
    scoreBarFill: styles.scoreBarFill,
    scoreValue: styles.scoreValue,
  };

  // 🔹 条件渲染时保持 Hook 不变
  if (!isVisible || !score) {
    return null; // ❌ 不要在 return 前调用 Hook
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronunciation Analysis</Text>

      <ScoreItem
        label="Accuracy"
        value={score.accuracy}
        getScoreColor={getScoreColor}
        getScoreIcon={getScoreIcon}
        styles={scoreItemStyles}
      />
      <ScoreItem
        label="Fluency"
        value={score.fluency}
        getScoreColor={getScoreColor}
        getScoreIcon={getScoreIcon}
        styles={scoreItemStyles}
      />
      <ScoreItem
        label="Completeness"
        value={score.completeness}
        getScoreColor={getScoreColor}
        getScoreIcon={getScoreIcon}
        styles={scoreItemStyles}
      />

      <View style={styles.overallScore}>
        <Text style={styles.overallLabel}>Overall Score</Text>
        <Text
          style={[styles.overallValue, { color: getScoreColor(score.overall) }]}
        >
          {score.overall}%
        </Text>
      </View>
    </View>
  );
}
