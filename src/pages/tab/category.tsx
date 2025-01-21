import React, {useState} from 'react';
import PageView from '../../components/PageView';
import TabHeader from '../../components/TabHeader';
import {ActivityIndicator, Alert, FlatList, RefreshControl} from 'react-native';
import useCategories from '../../hooks/useCategories';
import CategoryItem from '../../components/category/CategoryItem';
import CategoryModal from '../../components/category/CategoryModal';
import {CategoryLabel} from '../../components/category/CategoryLabel';

export default function CategoryScreen() {
  const {
    categories,
    loading,
    error,
    deleteCategory,
    editCategory,
    createCategory,
    fetchCategories,
    setError,
  } = useCategories();


  //Create Modal ~
  const [modalVisible, setModalVisible] = useState(false);
  function onClose() {
    setModalVisible(!modalVisible);
  }
  function handleCreate() {
    setModalVisible(!modalVisible);
  }
  function successModal(data: any) {
    setModalVisible(!modalVisible);
    createCategory(data);
  }

  if (error) {
    Alert.alert('Bir Hata Oluştu', 'Hata Mesajı: ' + error);
    setError(null);
  }

  //Refreshing ~
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    fetchCategories();
    setRefreshing(false);
  };

  const renderCateggory = ({item}: any) => (
    <CategoryItem data={item} onDelete={deleteCategory} onEdit={editCategory} />
  );

  return (
    <>
      <TabHeader
        title="Kategoriler"
        buttonName="pluscircleo"
        buttonOnPress={handleCreate}
      />
      <PageView>
        <CategoryModal
          visible={modalVisible}
          onClose={onClose}
          onSave={successModal}
          modalType={false}
          initialName={''}
        />
        <CategoryLabel />
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={categories}
            renderItem={renderCateggory}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </PageView>
    </>
  );
}
