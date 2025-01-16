import React from 'react';
import { ColorSchemeName, StyleSheet, Text,useColorScheme,ViewStyle,type TextProps } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Colors } from '../constants/Colors';

export type MTextProps = TextProps & {
    style?:ViewStyle;
    children: React.ReactNode;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  };

export default function MText({ children, style, type = 'default', ...rest}: MTextProps){
    const colorScheme = useColorScheme();

    const styles = getStyles(colorScheme);
    return(
        <Text style={[,
            type === 'default' ? styles.default : undefined,
            type === 'title' ? styles.title : undefined,
            type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
            type === 'subtitle' ? styles.subtitle : undefined,
            type === 'link' ? styles.link : undefined,
            style,
          ]}
          {...rest}>
            {children}
        </Text>
    );
}

const getStyles = (colorScheme:ColorSchemeName) => {

    const getTextColor = ()=>{
        return colorScheme === 'dark'
                  ? Colors.dark.text
                  : Colors.light.text;
    };

    return StyleSheet.create({
    default: {
      fontSize: moderateScale(14),
      lineHeight: moderateScale(22),
      color:getTextColor(),
    },
    defaultSemiBold: {
      fontSize: moderateScale(14),
      lineHeight: moderateScale(22),
      fontWeight: '600',
      color:getTextColor(),
    },
    title: {
      fontSize: 34,
      fontWeight: 'bold',
      lineHeight: 32,
      color:getTextColor(),
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color:getTextColor(),
    },
    link: {
      lineHeight: moderateScale(20),
      fontSize: moderateScale(14),
      color: '#0a7ea4',
    },
  });};
