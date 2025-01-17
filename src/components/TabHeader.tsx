import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import MText from './MText';
import {Colors} from '../constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign';

interface TabHeaderProps {
  children?: React.ReactNode;
  title: string;
  buttonName: string;
  buttonColor?: string;
  buttonOnPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export default function TabHeader({
  children,
  title,
  buttonOnPress,
  buttonName,
  buttonColor,
}: TabHeaderProps) {
  const colorScheme = useColorScheme();

  const styles = getStyles(colorScheme || 'light');
  if (buttonColor === undefined) {
    buttonColor = Colors[colorScheme || 'light'].icon;
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconTitle}>
        <View style={styles.icon}>{children}</View>
        <MText type="title">
           {title}
        </MText>
      </View>
      <TouchableOpacity onPress={buttonOnPress}>
        <Icon
          style={styles.butonIcon}
          name={buttonName}
          color={buttonColor}
          size={32}
        />
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 18,
      height: 68,
      backgroundColor: Colors[colorScheme].headerbackground,
      borderBottomWidth:1,
      borderBottomColor:Colors[colorScheme].tabBorder,
    },
    icon: {
      marginHorizontal: 14,
      color: Colors[colorScheme].icon,
      //  backgroundColor:'red',
    },
    butonIcon: {
      marginHorizontal: 16,
    },
    iconTitle: {
        flexDirection:'row',
    },
  });
};
