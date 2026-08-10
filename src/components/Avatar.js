import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function Avatar({ initials, size = 40, round = true, fontSize = 13 }) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: round ? size / 2 : 10,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.purple100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.purple700,
    fontWeight: '800',
  },
});
