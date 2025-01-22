import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import PageView from '../../components/PageView';
import TabHeader from '../../components/TabHeader';
import useProducts from '../../hooks/useProducts';
import ProductItem from '../../components/ProductItem';

export default function ProductsScreen() {
  const navigation = useNavigation<any>();
  const {products, loading, error, fetchProducts, deleteProduct, setError} =
    useProducts();

  //Refreshing ~
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  };
  const renderProducts = ({item}: any) => (
    <ProductItem data={item} onDelete={deleteProduct} />
  );
  function handleCreate() {
    navigation.navigate('productsAdd', {
      title: 'Yeni Ürün',
    });
  }
  if (error) {
    console.error('Profil: ' + error);
    setError(null);
  }
  return (
    <>
      <TabHeader title="Ürünler" buttonOnPress={handleCreate} />
      <PageView>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={products}
            renderItem={renderProducts}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </PageView>
    </>
  );
}
