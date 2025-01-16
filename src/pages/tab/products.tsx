import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

export default function ProductsScreen(){
    const navigation = useNavigation<any>();
    return(
        // eslint-disable-next-line react-native/no-inline-styles
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text> Ürünler Sayfası</Text>
            <Button title="Ürünler" onPress={() => navigation.navigate('login')} />
        </SafeAreaView>
    );
}
