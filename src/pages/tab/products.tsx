import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native';
import PageView from '../../components/PageView';
import MText from '../../components/MText';
import TabHeader from '../../components/TabHeader';

export default function ProductsScreen() {
  const navigation = useNavigation<any>();
  return (
    <>
      <TabHeader title="Ürünler" buttonName="pluscircleo" />
      <PageView>
        <MText> Ürünler Sayfası</MText>
        <Button title="Ürünler" onPress={() => navigation.navigate('login')} />
      </PageView>
    </>
  );
}
