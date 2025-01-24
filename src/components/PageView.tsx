import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import {Colors} from '../constants/Colors';
import Orientation from 'react-native-orientation-locker';

interface PageViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  lockToPortrait?: boolean;
}

export default function PageView({
  children,
  style,
  lockToPortrait = false,
}: PageViewProps) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');

  //Sadece Authentication sayfalarında ekran döndürmeyi kilitlemek istediğim için buraya tanımladım.
  lockToPortrait
    ? Orientation.lockToPortrait()
    : Orientation.unlockAllOrientations();

  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors[colorScheme || 'light'].headerbackground}
      />
      {children}
    </SafeAreaView>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor:
        colorScheme === 'dark'
          ? Colors.dark.background
          : Colors.light.background,
    },
  });
};
