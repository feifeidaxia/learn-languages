import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { Story, PronunciationScore } from '@/types/Story';
import { getRandomStory } from '@/data/stories';
import StoryCard from '@/components/StoryCard';
import AudioControls from '@/components/AudioControls';
import PronunciationFeedback from '@/components/PronunciationFeedback';
import { useAudio } from '@/hooks/useAudio';
import { useTheme } from '@/hooks/useTheme';

export default function PracticeScreen() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'zh' | 'en' | 'ja'>(
    'en'
  );
  const [pronunciationScore, setPronunciationScore] =
    useState<PronunciationScore | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { colors } = useTheme();

  const {
    audioState,
    isLoading,
    recordingUri,
    playTextToSpeech,
    startRecording,
    stopRecording,
    playRecording,
    pausePlayback,
    stopPlayback,
    analyzePronunciation,
  } = useAudio();

  useEffect(() => {
    loadNewStory();
  }, []);

  const loadNewStory = () => {
    const newStory = getRandomStory();
    setCurrentStory(newStory);
    setPronunciationScore(null);
    setShowFeedback(false);
  };

  const handlePlayAudio = (text: string, language: 'zh' | 'en' | 'ja') => {
    setSelectedLanguage(language);
    playTextToSpeech(text, language);
  };

  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to start recording. Please check microphone permissions.'
      );
    }
  };

  const handleStopRecording = async () => {
    try {
      await stopRecording();
      // Analyze pronunciation after recording
      setTimeout(async () => {
        const score = await analyzePronunciation();
        setPronunciationScore(score);
        setShowFeedback(true);
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording.');
    }
  };

  const getSelectedText = () => {
    if (!currentStory) return '';

    switch (selectedLanguage) {
      case 'zh':
        return currentStory.chinese.text;
      case 'en':
        return currentStory.english.text;
      case 'ja':
        return currentStory.japanese.text;
      default:
        return '';
    }
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
        },
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
        title: {
          fontSize: 28,
          fontWeight: '700',
          color: colors.text,
        },
        refreshButton: {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: colors.surfaceVariant,
          justifyContent: 'center',
          alignItems: 'center',
        },
        practiceSection: {
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 20,
          margin: 16,
          marginTop: 24,
          borderWidth: 1,
          borderColor: colors.border,
        },
        sectionTitle: {
          fontSize: 20,
          fontWeight: '700',
          color: colors.text,
          marginBottom: 16,
        },
        selectedText: {
          fontSize: 18,
          lineHeight: 26,
          color: colors.text,
          marginBottom: 16,
          fontWeight: '500',
          backgroundColor: colors.surfaceVariant,
          padding: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.border,
        },
        instruction: {
          fontSize: 16,
          lineHeight: 24,
          color: colors.textSecondary,
          marginBottom: 20,
        },
        recordingStatus: {
          backgroundColor: colors.success + '20',
          padding: 16,
          borderRadius: 8,
          marginTop: 16,
          borderWidth: 1,
          borderColor: colors.success + '40',
        },
        recordingText: {
          fontSize: 16,
          color: colors.success,
          textAlign: 'center',
          fontWeight: '500',
        },
      }),
    [colors]
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>Practice</Text>
        <TouchableOpacity
          style={dynamicStyles.refreshButton}
          onPress={loadNewStory}
          disabled={isLoading}
        >
          <RefreshCw size={24} color={colors.primary} />
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

        <View style={dynamicStyles.practiceSection}>
          <Text style={dynamicStyles.sectionTitle}>Practice Section</Text>
          <Text style={dynamicStyles.selectedText}>{getSelectedText()}</Text>

          <Text style={dynamicStyles.instruction}>
            1. Listen to the original pronunciation{'\n'}
            2. Press the record button and speak{'\n'}
            3. Stop recording to get feedback
          </Text>

          <AudioControls
            audioState={audioState}
            onPlay={playRecording}
            onPause={pausePlayback}
            onStop={stopPlayback}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            isLoading={isLoading}
          />

          {recordingUri && (
            <View style={dynamicStyles.recordingStatus}>
              <Text style={dynamicStyles.recordingText}>
                ✓ Recording saved - Press play to listen
              </Text>
            </View>
          )}
        </View>

        <PronunciationFeedback
          score={pronunciationScore}
          isVisible={showFeedback}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
});
