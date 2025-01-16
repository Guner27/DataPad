import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen(){
    const navigation = useNavigation<any>();
    return(
        // eslint-disable-next-line react-native/no-inline-styles
        <SafeAreaView  style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text> Login Sayfası</Text>
            <Button title="Ürünler" onPress={() => navigation.navigate('tab',{ screen: 'category' })} />
        </SafeAreaView>
    );
}
