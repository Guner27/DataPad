import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import MText from './MText';
import {moderateScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../constants/Colors';

type HeaderEditProps = {
  title: string;
  onSave: ((event: GestureResponderEvent) => void) | undefined;
};
export default function HeaderEdit({onSave, title}: HeaderEditProps) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <TouchableOpacity
          style={styles.iconView}
          onPress={() => navigation.goBack()}>
          <Icon style={styles.icon} name="close" size={34} />
        </TouchableOpacity>
        <MText type="title" style={styles.title}>
          {' '}
          {title}
        </MText>
      </View>
      <TouchableOpacity style={styles.iconView} onPress={onSave}>
        <Icon style={styles.icon} name="check" size={34} />
      </TouchableOpacity>
    </View>
  );
}
const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 46,
      backgroundColor: Colors[colorScheme].headerbackground,
    },
    leftContent: {
      flexDirection: 'row',
    },
    title: {
      fontWeight: 'light',
      marginBottom: 4,
      fontSize:moderateScale(20),
    },
    iconView: {
      marginHorizontal: 16,
      alignItems: 'center',
    },
    icon: {
      color: Colors[colorScheme].icon,
      alignContent: 'center',
      fontSize: moderateScale(28),
    },
  });
};
