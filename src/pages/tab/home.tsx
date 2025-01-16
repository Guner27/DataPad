import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function HomeScreen(){
    return(
        // eslint-disable-next-line react-native/no-inline-styles
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text> Home Sayfası</Text>
        </SafeAreaView>
    );
}
