import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Play, Pause, Square, Mic, MicOff } from 'lucide-react-native';
import { AudioState } from '@/types/Story';
import { useTheme } from '@/hooks/useTheme';

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
  const { colors } = useTheme();

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 16,
          margin: 16,
          borderWidth: 1,
          borderColor: colors.border,
        },
        progressContainer: {
          marginBottom: 16,
        },
        progressBar: {
          height: 6,
          backgroundColor: colors.surfaceVariant,
          borderRadius: 3,
          marginBottom: 8,
          overflow: 'hidden',
        },
        progressFill: {
          height: '100%',
          backgroundColor: colors.primary,
          borderRadius: 3,
        },
        timeText: {
          fontSize: 14,
          color: colors.textSecondary,
          textAlign: 'center',
        },
        controlsContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 16,
        },
        controlButton: {
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.surfaceVariant,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
        },
        recordingButton: {
          backgroundColor: colors.error,
          borderColor: colors.error,
        },
      }),
    [colors]
  );

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.progressContainer}>
        <View style={dynamicStyles.progressBar}>
          <View
            style={[
              dynamicStyles.progressFill,
              {
                width:
                  audioState.duration > 0
                    ? `${(audioState.position / audioState.duration) * 100}%`
                    : '0%',
              },
            ]}
          />
        </View>
        <Text style={dynamicStyles.timeText}>
          {formatTime(audioState.position)} / {formatTime(audioState.duration)}
        </Text>
      </View>

      <View style={dynamicStyles.controlsContainer}>
        <TouchableOpacity
          style={dynamicStyles.controlButton}
          onPress={audioState.isPlaying ? onPause : onPlay}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : audioState.isPlaying ? (
            <Pause size={24} color={colors.primary} />
          ) : (
            <Play size={24} color={colors.primary} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={dynamicStyles.controlButton}
          onPress={onStop}
          disabled={isLoading}
        >
          <Square size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            dynamicStyles.controlButton,
            audioState.isRecording && dynamicStyles.recordingButton,
          ]}
          onPress={audioState.isRecording ? onStopRecording : onStartRecording}
          disabled={isLoading}
        >
          {audioState.isRecording ? (
            <MicOff size={24} color="#ffffff" />
          ) : (
            <Mic size={24} color={colors.error} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
