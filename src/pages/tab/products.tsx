import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import PageView from '../../components/PageView';
import MText from '../../components/MText';

export default function ProductsScreen(){
    const navigation = useNavigation<any>();
    return(
        <PageView>
            <MText> Ürünler Sayfası</MText>
            <Button title="Ürünler" onPress={() => navigation.navigate('login')} />
        </PageView>
    );
}
