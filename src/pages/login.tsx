import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PageView from '../components/PageView';
import MText from '../components/MText';
export default function LoginScreen(){
    const navigation = useNavigation<any>();
    return(
        <PageView>
            <MText> Login Sayfası</MText>
            <Icon name="home" size={42} color="black"/>
            <Button title="Ürünler" onPress={() => navigation.navigate('tab',{ screen: 'category' })} />
        </PageView>
    );
}

