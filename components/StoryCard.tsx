import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Story } from '@/types/Story';
import { Volume2, Headphones } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

interface StoryCardProps {
  story: Story;
  onPlayAudio: (text: string, language: 'zh' | 'en' | 'ja') => void;
  isPlaying: boolean;
}

export default function StoryCard({
  story,
  onPlayAudio,
  isPlaying,
}: StoryCardProps) {
  const [playingLanguage, setPlayingLanguage] = useState<
    'zh' | 'en' | 'ja' | null
  >(null);
  const { colors } = useTheme();

  const getDifficultyColor = (difficulty: Story['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return colors.success;
      case 'intermediate':
        return colors.warning;
      case 'advanced':
        return colors.error;
      default:
        return colors.textTertiary;
    }
  };

  const handlePlayAudio = (text: string, language: 'zh' | 'en' | 'ja') => {
    if (playingLanguage === language) {
      // 如果点击的是正在播放的语言，停止播放
      setPlayingLanguage(null);
    } else {
      // 开始播放新的语言
      setPlayingLanguage(language);
      onPlayAudio(text, language);
    }
  };

  // 当全局播放状态变为false时，重置所有语言状态
  React.useEffect(() => {
    if (!isPlaying) {
      setPlayingLanguage(null);
    }
  }, [isPlaying]);

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 20,
          marginHorizontal: 16,
          marginVertical: 8,
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
          borderWidth: 1,
          borderColor: colors.border,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        },
        difficultyBadge: {
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 12,
        },
        difficultyText: {
          color: '#ffffff',
          fontSize: 12,
          fontWeight: '600',
          textTransform: 'capitalize',
        },
        category: {
          fontSize: 14,
          color: colors.textSecondary,
          fontWeight: '500',
          textTransform: 'capitalize',
        },
        languageSection: {
          marginBottom: 16,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.divider,
        },
        languageHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        },
        languageTitle: {
          fontSize: 16,
          fontWeight: '700',
        },
        playButton: {
          padding: 4,
        },
        mainText: {
          fontSize: 18,
          lineHeight: 26,
          color: colors.text,
          marginBottom: 8,
          fontWeight: '500',
        },
        phoneticText: {
          fontSize: 14,
          color: colors.textSecondary,
          fontStyle: 'italic',
          lineHeight: 20,
        },
      }),
    [colors]
  );

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <View
          style={[
            dynamicStyles.difficultyBadge,
            { backgroundColor: getDifficultyColor(story.difficulty) },
          ]}
        >
          <Text style={dynamicStyles.difficultyText}>{story.difficulty}</Text>
        </View>
        <Text style={dynamicStyles.category}>
          {story.category.replace('_', ' ')}
        </Text>
      </View>

      {/* Chinese Section */}
      <View style={dynamicStyles.languageSection}>
        <View style={dynamicStyles.languageHeader}>
          <Text style={[dynamicStyles.languageTitle, { color: '#dc2626' }]}>
            中文
          </Text>
          <TouchableOpacity
            style={dynamicStyles.playButton}
            onPress={() => handlePlayAudio(story.chinese.text, 'zh')}
            disabled={isPlaying && playingLanguage !== 'zh'}
          >
            {playingLanguage === 'zh' && isPlaying ? (
              <Headphones size={20} color="#dc2626" />
            ) : (
              <Volume2 size={20} color="#dc2626" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={dynamicStyles.mainText}>{story.chinese.text}</Text>
        <Text style={dynamicStyles.phoneticText}>{story.chinese.pinyin}</Text>
      </View>

      {/* English Section */}
      <View style={dynamicStyles.languageSection}>
        <View style={dynamicStyles.languageHeader}>
          <Text style={[dynamicStyles.languageTitle, { color: '#2563eb' }]}>
            English
          </Text>
          <TouchableOpacity
            style={dynamicStyles.playButton}
            onPress={() => handlePlayAudio(story.english.text, 'en')}
            disabled={isPlaying && playingLanguage !== 'en'}
          >
            {playingLanguage === 'en' && isPlaying ? (
              <Headphones size={20} color="#2563eb" />
            ) : (
              <Volume2 size={20} color="#2563eb" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={dynamicStyles.mainText}>{story.english.text}</Text>
        <Text style={dynamicStyles.phoneticText}>{story.english.ipa}</Text>
      </View>

      {/* Japanese Section */}
      <View style={dynamicStyles.languageSection}>
        <View style={dynamicStyles.languageHeader}>
          <Text style={[dynamicStyles.languageTitle, { color: '#7c3aed' }]}>
            日本語
          </Text>
          <TouchableOpacity
            style={dynamicStyles.playButton}
            onPress={() => handlePlayAudio(story.japanese.text, 'ja')}
            disabled={isPlaying && playingLanguage !== 'ja'}
          >
            {playingLanguage === 'ja' && isPlaying ? (
              <Headphones size={20} color="#7c3aed" />
            ) : (
              <Volume2 size={20} color="#7c3aed" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={dynamicStyles.mainText}>{story.japanese.text}</Text>
        <Text style={dynamicStyles.phoneticText}>
          {story.japanese.hiragana}
        </Text>
      </View>
    </View>
  );
}
