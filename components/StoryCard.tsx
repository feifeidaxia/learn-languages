import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Story } from '@/types/Story';
import { Volume2, Headphones } from 'lucide-react-native';

interface StoryCardProps {
  story: Story;
  onPlayAudio: (text: string, language: 'zh' | 'en' | 'ja') => void;
  isPlaying: boolean;
}

export default function StoryCard({ story, onPlayAudio, isPlaying }: StoryCardProps) {
  const getDifficultyColor = (difficulty: Story['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return '#10b981';
      case 'intermediate':
        return '#f59e0b';
      case 'advanced':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(story.difficulty) }]}>
          <Text style={styles.difficultyText}>{story.difficulty}</Text>
        </View>
        <Text style={styles.category}>{story.category.replace('_', ' ')}</Text>
      </View>

      {/* Chinese Section */}
      <View style={styles.languageSection}>
        <View style={styles.languageHeader}>
          <Text style={[styles.languageTitle, { color: '#dc2626' }]}>中文</Text>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => onPlayAudio(story.chinese.text, 'zh')}
            disabled={isPlaying}
          >
            {isPlaying ? (
              <Headphones size={20} color="#dc2626" />
            ) : (
              <Volume2 size={20} color="#dc2626" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.mainText}>{story.chinese.text}</Text>
        <Text style={styles.phoneticText}>{story.chinese.pinyin}</Text>
      </View>

      {/* English Section */}
      <View style={styles.languageSection}>
        <View style={styles.languageHeader}>
          <Text style={[styles.languageTitle, { color: '#2563eb' }]}>English</Text>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => onPlayAudio(story.english.text, 'en')}
            disabled={isPlaying}
          >
            {isPlaying ? (
              <Headphones size={20} color="#2563eb" />
            ) : (
              <Volume2 size={20} color="#2563eb" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.mainText}>{story.english.text}</Text>
        <Text style={styles.phoneticText}>{story.english.ipa}</Text>
      </View>

      {/* Japanese Section */}
      <View style={styles.languageSection}>
        <View style={styles.languageHeader}>
          <Text style={[styles.languageTitle, { color: '#7c3aed' }]}>日本語</Text>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => onPlayAudio(story.japanese.text, 'ja')}
            disabled={isPlaying}
          >
            {isPlaying ? (
              <Headphones size={20} color="#7c3aed" />
            ) : (
              <Volume2 size={20} color="#7c3aed" />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.mainText}>{story.japanese.text}</Text>
        <Text style={styles.phoneticText}>{story.japanese.hiragana}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  languageSection: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
    color: '#111827',
    marginBottom: 8,
    fontWeight: '500',
  },
  phoneticText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});