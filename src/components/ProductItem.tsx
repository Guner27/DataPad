import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {default as AntDesgnIcon} from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../constants/Colors';
import MText from './MText';

export function ProductItem({data, onDelete}: any) {
  const navigation = useNavigation<any>();
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');
  const [isVisible, setIsVisible] = useState(false);

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

  const handleEdit = () => {
    navigation.navigate('productsAdd', {
      title: 'Ürünü Düzenle',
      product: JSON.stringify(data),
    });
  };

  const isValidUrl = (url: string) => {
    // URL'nin geçerli bir formatta olup olmadığını kontrol et
    return url && (url.startsWith('http://') || url.startsWith('https://'));
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setIsVisible(!isVisible);
      }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: isValidUrl(data.images)
              ? data.images
              : 'https://img.icons8.com/bubbles/512/react.png',
          }}
        />
        <View style={styles.inner_container}>
          <View style={styles.card_header}>
            <MText type="defaultSemiBold"> {data.name} </MText>
            <MText type="defaultSemiBold" style={styles.price}>
              {data.price} ₺
            </MText>
          </View>
          <View style={styles.double}>
            <MText style={styles.category}> {data.categoryName}</MText>
            <MText> Marka: {data.brand}</MText>
          </View>
          <MText> Açıklama: {data.description}</MText>
        </View>
      </View>
      {isVisible ? (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.icon} onPress={handleEdit}>
            <AntDesgnIcon
              name="edit"
              size={32}
              color={Colors.common.editIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <MaterialIcons
              style={styles.icon}
              name="delete-outline"
              size={32}
              color={Colors.common.removeIcon}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
export default ProductItem;

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      margin: 8,
      padding: 4,
      borderColor: Colors[colorScheme].inputBorder,
      borderRadius: 5,
      borderRightWidth: 1,
      borderBottomWidth: 2,
      borderTopRightRadius: 16,
    },
    image: {
      flex: 1,
      minHeight: 120,
      resizeMode: 'contain',
      borderRadius: 10,
    },
    inner_container: {
      flex: 2,
    },
    card_header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 2,
    },
    price: {
      fontWeight: 'bold',
      color: 'green',
    },
    double: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 2,
    },
    category: {
      fontWeight: 'light',
      fontStyle: 'italic',
    },

    footer: {
      flex: 1,
      justifyContent: 'space-around',
      alignContent: 'space-around',
      flexDirection: 'row',
    },
    icon: {
      padding: 7,
      borderRadius: 50,
      borderColor: Colors[colorScheme].tint,
      borderBottomWidth: 2,
      borderRightWidth: 1,
    },
  });
};
