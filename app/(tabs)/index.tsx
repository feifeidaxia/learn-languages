import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { Story } from '@/types/Story';
import { getRandomStory } from '@/data/stories';
import StoryCard from '@/components/StoryCard';
import { useAudio } from '@/hooks/useAudio';

export default function StoriesScreen() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const { playTextToSpeech, audioState, isLoading } = useAudio();

  useEffect(() => {
    loadNewStory();
  }, []);

  const loadNewStory = () => {
    const newStory = getRandomStory();
    setCurrentStory(newStory);
  };

  const handlePlayAudio = (text: string, language: 'zh' | 'en' | 'ja') => {
    playTextToSpeech(text, language);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Multilingual Stories</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadNewStory}
          disabled={isLoading}
        >
          <RefreshCw size={24} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentStory && (
          <StoryCard
            story={currentStory}
            onPlayAudio={handlePlayAudio}
            isPlaying={audioState.isPlaying}
          />
        )}

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>How to use</Text>
          <Text style={styles.instructionsText}>
            • Tap the refresh button to generate a new random story{'\n'}
            • Tap the speaker icons to hear the pronunciation{'\n'}
            • Switch to Practice tab to record yourself{'\n'}
            • Compare your pronunciation with the original
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  instructions: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    marginTop: 24,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});