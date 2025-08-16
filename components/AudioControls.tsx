import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Play, Pause, Square, Mic, MicOff } from 'lucide-react-native';
import { AudioState } from '@/types/Story';

interface AudioControlsProps {
  audioState: AudioState;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isLoading?: boolean;
}

export default function AudioControls({
  audioState,
  onPlay,
  onPause,
  onStop,
  onStartRecording,
  onStopRecording,
  isLoading = false,
}: AudioControlsProps) {
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: audioState.duration > 0
                  ? `${(audioState.position / audioState.duration) * 100}%`
                  : '0%',
              },
            ]}
          />
        </View>
        <Text style={styles.timeText}>
          {formatTime(audioState.position)} / {formatTime(audioState.duration)}
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={audioState.isPlaying ? onPause : onPlay}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#6366f1" />
          ) : audioState.isPlaying ? (
            <Pause size={24} color="#6366f1" />
          ) : (
            <Play size={24} color="#6366f1" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={onStop}
          disabled={isLoading}
        >
          <Square size={24} color="#6366f1" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            audioState.isRecording && styles.recordingButton,
          ]}
          onPress={audioState.isRecording ? onStopRecording : onStartRecording}
          disabled={isLoading}
        >
          {audioState.isRecording ? (
            <MicOff size={24} color="#ffffff" />
          ) : (
            <Mic size={24} color="#ef4444" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recordingButton: {
    backgroundColor: '#ef4444',
  },
});