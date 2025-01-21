import React from 'react';
import {View, useColorScheme, StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';
import MText from '../MText';

export function CategoryLabel() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');

  return (
    <View style={styles.container}>
      <MText type="defaultSemiBold" style={styles.name}>
        İsim
      </MText>
      <MText type="defaultSemiBold" style={styles.icon}>Düzenle</MText>
      <MText type="defaultSemiBold" style={styles.icon}>Sil</MText>
    </View>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      margin: 2,
      padding: 6,
      borderRadius: 5,
      borderBottomColor: Colors[colorScheme].tint,
      borderBottomWidth: 1,
    },
    name: {
      flex: 5,
    },
    icon: {
      flex: 1,
      textAlign: 'center',
    },
  });
};
