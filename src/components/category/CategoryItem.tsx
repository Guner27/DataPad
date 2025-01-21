import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {default as AntDesignIcon} from 'react-native-vector-icons/AntDesign';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';

import {Colors} from '../../constants/Colors';
import CategoryModal from './CategoryModal';
import MText from '../MText';

export function CategoryItem({data, onDelete, onEdit}: any) {
  // Cihazın tema tercihini alıyoruz: 'light' veya 'dark'
  const colorScheme = useColorScheme();
  // Light ve Dark modları için stil seçenekleri
  const styles = getStyles(colorScheme || 'light');

  const handleDelete = () => {
    Alert.alert(
      'Kategoriyi Sil',
      'Bu kategoriyi silmek istediğinizden emin misiniz?',
      [
        {
          text: 'Hayır',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => onDelete(data.id),
        },
      ],
    );
  };
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = (newName: string) => {
    data.name = newName; //Callback'den gelen yeni değeri güncelle
    onEdit(data); //Data'yı hooka Gönder
    setModalVisible(false);
  };
  function onClose() {
    setModalVisible(!modalVisible);
  }
  return (
    <View style={styles.container}>
      <MText style={styles.text}>{data.name}</MText>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setModalVisible(true)}>
        <AntDesignIcon style={styles.editIcon} name="edit" size={moderateScale(30)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={handleDelete}>
        <MaterialIcons
          style={styles.deleteIcon}
          name="delete-outline"
          size={moderateScale(30)}
        />
      </TouchableOpacity>
      <CategoryModal
        visible={modalVisible}
        onClose={onClose}
        onSave={handleEdit}
        initialName={data.name}/>
    </View>
  );
}
export default CategoryItem;

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      margin: 2,
      padding: 8,
      borderRadius: 5,
      borderBottomColor: Colors[colorScheme].tint,
      //borderBottomWidth: 1,
    },
    text: {
      flex: 6,
    },
    icon: {
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1,
    },
    editIcon:{
      color: Colors.common.editIcon,
    },
    deleteIcon:{
      textAlign: 'center',
      color:Colors.common.removeIcon,
    },
    modal: {
      backgroundColor: 'green',
      height: 30,
    },
  });
};
