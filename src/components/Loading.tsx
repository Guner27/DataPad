import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React from 'react';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image source={require('./../assets/images/DataPad.png')} style={styles.image}/>
        <ActivityIndicator size={'large'} />
        <View style={ styles.box}/>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 250, // Genişlik
      height: 200, // Yükseklik
      resizeMode: 'contain', // Resmin sığması için uygun bir düzenleme
    },
    box:{
        height:200,
    },
  });

