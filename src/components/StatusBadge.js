import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const STYLES = {
  Confirmed: { bg: colors.teal100, fg: colors.teal600 },
  Pending: { bg: colors.amber100, fg: colors.amber500 },
  Cancelled: { bg: colors.red100, fg: colors.red500 },
  Completed: { bg: colors.purple100, fg: colors.purple700 },
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || STYLES.Confirmed;
  return (
    <View style={[styles.badge, { backgroundColor: style.bg }]}>
      <Text style={[styles.text, { color: style.fg }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
  },
});
