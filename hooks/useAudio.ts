import { useState, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import { AudioState, RecordingResult, PronunciationScore } from '@/types/Story';

export const useAudio = () => {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    isRecording: false,
    duration: 0,
    position: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  const soundRef = useRef<Audio.Sound | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const initializeAudio = useCallback(async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }, []);

  const playTextToSpeech = useCallback(async (text: string, language: 'zh' | 'en' | 'ja') => {
    try {
      setIsLoading(true);
      setAudioState(prev => ({ ...prev, isPlaying: true }));

      const languageMap = {
        zh: 'zh-CN',
        en: 'en-US',
        ja: 'ja-JP',
      };

      if (Platform.OS === 'web') {
        // Web implementation - basic functionality
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = languageMap[language];
        utterance.onend = () => {
          setAudioState(prev => ({ ...prev, isPlaying: false }));
          setIsLoading(false);
        };
        speechSynthesis.speak(utterance);
      } else {
        await Speech.speak(text, {
          language: languageMap[language],
          onDone: () => {
            setAudioState(prev => ({ ...prev, isPlaying: false }));
            setIsLoading(false);
          },
          onError: () => {
            setAudioState(prev => ({ ...prev, isPlaying: false }));
            setIsLoading(false);
          },
        });
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setAudioState(prev => ({ ...prev, isPlaying: false }));
      setIsLoading(false);
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setIsLoading(true);
      await initializeAudio();

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      recordingRef.current = recording;
      setAudioState(prev => ({ ...prev, isRecording: true }));
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsLoading(false);
    }
  }, [initializeAudio]);

  const stopRecording = useCallback(async () => {
    try {
      setIsLoading(true);
      
      if (!recordingRef.current) return;

      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      
      if (uri) {
        setRecordingUri(uri);
      }
      
      recordingRef.current = null;
      setAudioState(prev => ({ ...prev, isRecording: false }));
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      setIsLoading(false);
    }
  }, []);

  const playRecording = useCallback(async () => {
    try {
      if (!recordingUri) return;

      setIsLoading(true);
      
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
      soundRef.current = sound;

      await sound.playAsync();
      setAudioState(prev => ({ ...prev, isPlaying: true }));
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setAudioState(prev => ({
            ...prev,
            duration: status.durationMillis || 0,
            position: status.positionMillis || 0,
            isPlaying: status.isPlaying,
          }));
          
          if (status.didJustFinish) {
            setAudioState(prev => ({ ...prev, isPlaying: false }));
          }
        }
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to play recording:', error);
      setIsLoading(false);
    }
  }, [recordingUri]);

  const pausePlayback = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
      }
      if (Platform.OS === 'web') {
        speechSynthesis.cancel();
      } else {
        Speech.stop();
      }
      setAudioState(prev => ({ ...prev, isPlaying: false }));
    } catch (error) {
      console.error('Failed to pause playback:', error);
    }
  }, []);

  const stopPlayback = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      if (Platform.OS === 'web') {
        speechSynthesis.cancel();
      } else {
        Speech.stop();
      }
      setAudioState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        position: 0 
      }));
    } catch (error) {
      console.error('Failed to stop playback:', error);
    }
  }, []);

  const analyzePronunciation = useCallback(async (): Promise<PronunciationScore> => {
    // Simulated pronunciation analysis - in a real app, you'd use a speech recognition service
    const baseScore = Math.floor(Math.random() * 40) + 60; // 60-100 range
    const variation = Math.floor(Math.random() * 20) - 10; // -10 to +10 variation
    
    return {
      accuracy: Math.max(0, Math.min(100, baseScore + variation)),
      fluency: Math.max(0, Math.min(100, baseScore + variation)),
      completeness: Math.max(0, Math.min(100, baseScore + variation)),
      overall: Math.max(0, Math.min(100, baseScore)),
    };
  }, []);

  return {
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
  };
};