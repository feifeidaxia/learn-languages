// components/AudioControls.tsx
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

  const formatTime = (ms: number) => {
    const sec = Math.floor(Math.max(0, ms) / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
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
        progressContainer: { marginBottom: 16 },
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
        controlsContainer: { flexDirection: 'row', justifyContent: 'center' },
        controlButton: {
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.surfaceVariant,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
          marginHorizontal: 8, // 用 margin 代替 gap，兼容性更好
        },
        recordingButton: {
          backgroundColor: colors.error,
          borderColor: colors.error,
        },
        recText: { color: colors.error, fontWeight: '600' },
      }),
    [colors]
  );

  const isRecording = audioState.isRecording;

  // 录音时：duration = position（在 hook 里已处理），否则走正常播放进度
  const percent =
    audioState.duration > 0
      ? Math.min(100, (audioState.position / audioState.duration) * 100)
      : 0;

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.progressContainer}>
        <View style={dynamicStyles.progressBar}>
          <View
            style={[dynamicStyles.progressFill, { width: `${percent}%` }]}
          />
        </View>
        <Text style={dynamicStyles.timeText}>
          {isRecording ? (
            <>
              <Text style={dynamicStyles.recText}>REC • </Text>
              {/* {formatTime(audioState.position)} */}
            </>
          ) : (
            <>
              {formatTime(audioState.position)} /{' '}
              {formatTime(audioState.duration)}
            </>
          )}
        </Text>
      </View>

      <View style={dynamicStyles.controlsContainer}>
        <TouchableOpacity
          style={dynamicStyles.controlButton}
          onPress={audioState.isPlaying ? onPause : onPlay}
          disabled={isLoading || isRecording /* 录音中禁用播放键 */}
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
