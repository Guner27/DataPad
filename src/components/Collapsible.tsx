import React, {PropsWithChildren} from 'react';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity, useColorScheme, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MText from './MText';
import {Colors} from '../constants/Colors';

export default function Collapsible({
  children,
  title,
}: PropsWithChildren & {title: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');
  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen(value => !value)}
        activeOpacity={0.8}>
        <Icon name="code" size={20} style={styles.icon} />
        <MText type="defaultSemiBold"> {title}
        </MText>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}
const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    content: {
      marginTop: 6,
      marginLeft: 24,
    },
    icon: {
      color: Colors[colorScheme].text,
    },
  });
};
