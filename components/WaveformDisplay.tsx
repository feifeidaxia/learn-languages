import React, { useMemo } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface WaveformDisplayProps {
  waveform: number[]; // 0~1
  width?: number;
  height?: number;
  barWidth?: number;
  barSpacing?: number;
  color?: string;
}

export default function WaveformDisplay({
  waveform,
  width = 300,
  height = 80,
  barWidth = 4,
  barSpacing = 2,
  color = '#4ade80', // 默认绿色渐变
}: WaveformDisplayProps) {
  const animatedBars = useMemo(
    () =>
      waveform.map((value, index) => {
        const anim = new Animated.Value(value);
        Animated.timing(anim, {
          toValue: value,
          duration: 100,
          useNativeDriver: false,
        }).start();
        return anim;
      }),
    [waveform]
  );

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height }}>
      {animatedBars.map((bar, index) => (
        <Animated.View
          key={index}
          style={{
            width: barWidth,
            marginRight: barSpacing,
            borderRadius: barWidth / 2,
            backgroundColor: color,
            height: bar.interpolate({
              inputRange: [0, 1],
              outputRange: [2, height],
            }),
          }}
        />
      ))}
    </View>
  );
}
