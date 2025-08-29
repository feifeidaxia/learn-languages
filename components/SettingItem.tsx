import React, { ReactElement, useMemo } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

type Props = {
  icon: ReactElement;
  title: string;
  subtitle?: string;
  value?: boolean;
  onToggle?: () => void;
  showArrow?: boolean;
  onPress?: () => void;
};

const SettingItem: React.FC<Props> = ({
  icon,
  title,
  subtitle,
  value,
  onToggle,
  showArrow = false,
  onPress,
}) => {
  const { colors } = useTheme();

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        settingItem: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.divider,
          backgroundColor: colors.surface,
        },
        settingIcon: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.surfaceVariant,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        settingTitle: {
          fontSize: 16,
          fontWeight: '600',
          color: colors.text,
        },
        settingSubtitle: {
          fontSize: 14,
          color: colors.textSecondary,
          marginTop: 2,
        },
      }),
    [colors]
  );

  const content = (
    <View style={dynamicStyles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={dynamicStyles.settingIcon}>{icon}</View>
        <View style={styles.settingText}>
          <Text style={dynamicStyles.settingTitle}>{title}</Text>
          {subtitle && (
            <Text style={dynamicStyles.settingSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {value !== undefined ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: colors.surfaceVariant, true: colors.primary }}
          thumbColor={colors.surface}
        />
      ) : showArrow ? (
        <ChevronRight size={20} color={colors.textTertiary} />
      ) : null}
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {content}
    </TouchableOpacity>
  ) : (
    content
  );
};

const styles = StyleSheet.create({
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
});

export default React.memo(SettingItem);
