import React, { useState, useEffect } from 'react';
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

export default function PracticeScreen() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'zh' | 'en' | 'ja'>('en');
  const [pronunciationScore, setPronunciationScore] = useState<PronunciationScore | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

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
      Alert.alert('Error', 'Failed to start recording. Please check microphone permissions.');
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice</Text>
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

        <View style={styles.practiceSection}>
          <Text style={styles.sectionTitle}>Practice Section</Text>
          <Text style={styles.selectedText}>{getSelectedText()}</Text>
          
          <Text style={styles.instruction}>
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
            <View style={styles.recordingStatus}>
              <Text style={styles.recordingText}>
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
  practiceSection: {
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
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  selectedText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#374151',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  instruction: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  recordingStatus: {
    backgroundColor: '#dcfce7',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  recordingText: {
    fontSize: 14,
    color: '#166534',
    textAlign: 'center',
    fontWeight: '500',
  },
});