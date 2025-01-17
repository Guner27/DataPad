import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import MText from './MText';
import {Colors} from '../constants/Colors';

export type LoginButtonView = TouchableOpacityProps & {
  style?: ViewStyle;
  title: string;
  children?: React.ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined; //TouchableOpecity içerisinde onPress için tanımlanan veri tipi
};

export default function LoginButton({
  title = 'Tamam',
  onPress,
  ...rest
}: LoginButtonView) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} {...rest}>
      <MText type="button">{title}</MText>
    </TouchableOpacity>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: Colors[colorScheme].icon,
      color: Colors[colorScheme].icon,
      padding: 14,
      borderRadius: 10,
      paddingHorizontal: 50,
      marginHorizontal: 16,
    },
  });
};
