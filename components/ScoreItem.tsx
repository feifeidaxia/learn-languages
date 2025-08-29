import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

type ScoreItemProps = {
  language: string;
  score: number;
  date: string;
};

const ScoreItem: React.FC<ScoreItemProps> = ({ language, score, date }) => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  const getScoreColor = (score: number) => {
    if (score >= 90) return colors.success;
    if (score >= 80) return colors.warning;
    return colors.error;
  };

  const dynamicStyles = StyleSheet.create({
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
  });

  return (
    <View style={dynamicStyles.scoreItem}>
      <View style={dynamicStyles.scoreLeft}>
        <Text style={dynamicStyles.scoreLang}>
          {t(language.toLowerCase(), 'languages')}
        </Text>
        <Text style={dynamicStyles.scoreDate}>{date}</Text>
      </View>
      <View style={dynamicStyles.scoreRight}>
        <Text
          style={[
            dynamicStyles.scoreValue,
            { color: getScoreColor(score) },
          ]}
        >
          {score}%
        </Text>
        <View style={dynamicStyles.scoreBar}>
          <View
            style={[
              dynamicStyles.scoreBarFill,
              {
                width: `${score}%`,
                backgroundColor: getScoreColor(score),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default ScoreItem;