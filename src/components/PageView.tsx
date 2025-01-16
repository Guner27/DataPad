import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';

interface PageViewProps {
    children: React.ReactNode;
    style?: ViewStyle;
  }

export default function PageView( {children, style}: PageViewProps ){
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme || 'light');
    return(
        <SafeAreaView style={[styles.safeArea, style]}>
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

