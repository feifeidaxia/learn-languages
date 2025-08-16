import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

type Props = {
  icon: ReactElement;
  title: string;
  subtitle?: string;
  value?: boolean;
  onToggle?: () => void;
  showArrow?: boolean;
};

const SettingItem: React.FC<Props> = ({
  icon,
  title,
  subtitle,
  value,
  onToggle,
  showArrow = false,
}) => {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>{icon}</View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {value !== undefined ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#e5e7eb', true: '#6366f1' }}
          thumbColor="#ffffff"
        />
      ) : showArrow ? (
        <ChevronRight size={20} color="#9ca3af" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
});

export default React.memo(SettingItem);
