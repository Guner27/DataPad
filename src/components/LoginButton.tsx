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
  outline?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined; //TouchableOpecity içerisinde onPress için tanımlanan veri tipi
};

export default function LoginButton({
  title = 'Tamam',
  outline = true,
  onPress,
  ...rest
}: LoginButtonView) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');
  return (
    <TouchableOpacity onPress={onPress} style={outline ? styles.button : styles.button_outline} {...rest}>
      <MText type="button" style={outline ? styles.text : styles.text_outline}>{title}</MText>
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
    button_outline:{
      alignItems: 'center',
      backgroundColor: Colors[colorScheme].background,
      color: Colors[colorScheme].icon,
      borderWidth:1,
      borderColor:Colors[colorScheme].icon,
      padding: 12,
      borderRadius: 10,
      paddingHorizontal: 50,
      marginHorizontal: 16,
    },
    text:{},
    text_outline:{
      color:Colors[colorScheme].icon,
    },
  });
};
