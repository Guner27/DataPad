import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  ViewStyle,
  type TextProps,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../constants/Colors';

export type MTextProps = TextProps & {
  style?: ViewStyle;
  children: React.ReactNode;
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'button'
    | 'label';
};

export default function MText({
  children,
  style,
  type = 'default',
  ...rest
}: MTextProps) {
  const colorScheme = useColorScheme();

  const styles = getStyles(colorScheme || 'light');
  return (
    <Text
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'button' ? styles.button : undefined,
        type === 'label' ? styles.label : undefined,
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    default: {
      fontSize: moderateScale(14),
      lineHeight: moderateScale(22),
      color: Colors[colorScheme].text,
    },
    defaultSemiBold: {
      fontSize: moderateScale(14),
      lineHeight: moderateScale(22),
      fontWeight: '600',
      color: Colors[colorScheme].text,
    },
    title: {
      fontSize: moderateScale(24),
      fontWeight: '500',
      lineHeight: 32,
      color: Colors[colorScheme].titleText,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors[colorScheme].text,
    },
    button: {
      fontSize: moderateScale(15),
      color: Colors[colorScheme].background,
    },
    link: {
      lineHeight: moderateScale(20),
      fontSize: moderateScale(15),
      color: '#0a7ea4',
    },
    label:{
      marginLeft: 10,
      color:Colors[colorScheme].text,
      fontSize: moderateScale(12),
    },
  });
};
