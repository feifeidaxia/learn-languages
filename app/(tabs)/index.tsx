import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import StoryCard from '@/components/StoryCard';
import { useAudio } from '@/hooks/useAudio';
import { useTheme } from '@/hooks/useTheme';
import { useStoryGeneration } from '@/hooks/useStoryGeneration';
import { getRandomStory } from '@/data/stories';

export default function StoriesScreen() {
  const { playTextToSpeech, audioState } = useAudio();
  const { colors } = useTheme();

  const { isGenerating, generateNewStory } = useStoryGeneration();

  const [currentStory, setCurrentStory] = useState<any>(getRandomStory());
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    setCurrentStory(getRandomStory());
    setIsInitialLoading(false);
  }, []);

  const loadNewStory = async (initial = false) => {
    if (initial) {
      // 初次时直接返回本地 story，不调接口
      return getRandomStory();
    }

    try {
      const story = await generateNewStory();
      console.log('📖 加载新故事：');
      setCurrentStory(story);

      // return story;
    } catch {
      return currentStory || getRandomStory();
    }
  };

  const handlePlayAudio = (text: string, language: 'zh' | 'en' | 'ja') => {
    playTextToSpeech(text, language);
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 20,
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        title: { fontSize: 28, fontWeight: '700', color: colors.text },
        refreshButton: {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: colors.surfaceVariant,
          justifyContent: 'center',
          alignItems: 'center',
        },
        instructions: {
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 20,
          margin: 16,
          marginTop: 24,
          borderWidth: 1,
          borderColor: colors.border,
        },
        instructionsTitle: {
          fontSize: 18,
          fontWeight: '700',
          color: colors.text,
          marginBottom: 12,
        },
        instructionsText: {
          fontSize: 16,
          lineHeight: 24,
          color: colors.textSecondary,
        },
      }),
    [colors]
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>Multilingual Stories</Text>
        <TouchableOpacity
          style={dynamicStyles.refreshButton}
          onPress={() => loadNewStory()}
          disabled={isGenerating}
        >
          <RefreshCw size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <StoryCard
            story={currentStory}
            onPlayAudio={handlePlayAudio}
            isPlaying={audioState.isPlaying}
          />
        </View>

        <View style={dynamicStyles.instructions}>
          <Text style={dynamicStyles.instructionsTitle}>How to use</Text>
          <Text style={dynamicStyles.instructionsText}>
            • Tap the refresh button to generate a new random story{'\n'}• Tap
            the speaker icons to hear the pronunciation{'\n'}• Switch to
            Practice tab to record yourself{'\n'}• Compare your pronunciation
            with the original
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  scrollContent: { paddingVertical: 16 },
});
