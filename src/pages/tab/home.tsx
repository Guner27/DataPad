import React from 'react';
import PageView from '../../components/PageView';
import MText from '../../components/MText';
import TabHeader from '../../components/TabHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation<any>();
    function logout(){
        AsyncStorage.removeItem('userToken');
        navigation.replace('login');
        console.log('Çıkış Başarılı!');
      }
  return (
    <>
      <TabHeader
        title="Merhaba!"
        buttonName="export"
        buttonColor="#d62828"
        buttonOnPress={logout}>
        <Icon name="manage-accounts" size={32} color="#FB8500"/>
      </TabHeader>
      <PageView>
        <MText type="title">Başlık</MText>
        <MText> Home Sayfası</MText>
      </PageView>
    </>
  );
}
