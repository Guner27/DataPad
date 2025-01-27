import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import PageView from '../components/PageView';
import HeaderEdit from '../components/HeaderEdit';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../constants/Colors';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useProducts from '../hooks/useProducts';
import useCategories from '../hooks/useCategories';
import RNPickerSelect from 'react-native-picker-select';
import MText from '../components/MText';
import {launchImageLibrary} from 'react-native-image-picker';

export default function ProductAddScreen(props: any) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');
  const navigation = useNavigation();

  const title = props.route.params.title;
  const product = props.route.params.product;

  const [imageName, setImageName] = useState('');
  const [data, setData] = useState({
    barcode: 'string',
    name: '',
    description: '',
    brand: '',
    images: '',
    price: '',
    stock: '',
    categoryId: null,
  });

  const {createProduct, editProduct} = useProducts();

  const sendData = async () => {
    if (
      data.name === '' ||
      data.description === '' ||
      data.price === '' ||
      data.brand === '' ||
      data.stock === '' ||
      data.images === '' ||
      data.categoryId === null
    ) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    title === 'Ürünü Düzenle' ? editProduct(data) : createProduct(data);
    navigation.goBack();
  };

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, response => {
      if (response.assets) {
        const image = response.assets[0];
        const base64Image = image.base64; // Resim base64 formatında burada olacak
        setData({...data, images: base64Image || ''});
        setImageName(image.fileName || '');
      }
    });
  };

  //Combobox işlemleri..
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {categories} = useCategories();

  const categoryItems = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));
  const handleValueChange = (value: any) => {
    setSelectedCategory(value);
    setData({...data, categoryId: value});
  };

  const isValidUrl = (url: string) => {
    // URL'nin geçerli bir formatta olup olmadığını kontrol et
    return url && (url.startsWith('http://') || url.startsWith('https://'));
  };

  useEffect(() => {
    if (product) {
      //Fiyat ve Stok bilgileri number olduğu için input içerisine yerleştirme..
      const jsondata = JSON.parse(product.toString());
      jsondata.price = jsondata.price.toString();
      jsondata.stock = jsondata.stock.toString();
      setData(jsondata);
    }
  }, [product]);
  return (
    <>
      <HeaderEdit title={title} onSave={sendData} />
      <PageView>
        <ScrollView style={styles.container}>
          <View style={styles.group}>
            <MText type="label">Ürün Adı</MText>
            <TextInput
              style={styles.input}
              placeholder="Ürün Adını giriniz"
              value={data.name}
              onChangeText={value => setData({...data, name: value})}
            />
          </View>

          <View style={styles.double_input}>
            <View style={styles.double_item}>
              <MText type="label">Fiyat</MText>
              <TextInput
                style={styles.input}
                placeholder="0 ₺"
                value={data.price}
                onChangeText={value => setData({...data, price: value})}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.double_item}>
              <MText type="label">Stok</MText>
              <TextInput
                style={styles.input}
                placeholder="0"
                value={data.stock}
                onChangeText={value => setData({...data, stock: value})}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.group}>
            <MText type="label">Açıklama</MText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Açıklama Giriniz.."
              value={data.description}
              multiline={true}
              numberOfLines={3}
              onChangeText={value => setData({...data, description: value})}
            />
          </View>

          <View style={styles.group}>
            <MText type="label">Marka</MText>
            <TextInput
              style={styles.input}
              placeholder="Marka"
              value={data.brand}
              onChangeText={value => setData({...data, brand: value})}
            />
          </View>
          <View style={styles.group}>
            <MText type="label">Resim (URL)</MText>
            <TextInput
              multiline={true}
              style={styles.input}
              numberOfLines={3}
              placeholder="https://..."
              value={data.images}
              onChangeText={value => setData({...data, images: value})}
              keyboardType="url"
            />
          </View>
          <View style={styles.group}>
            <MText type="label" >Resim seçiniz</MText>
            <TouchableOpacity onPress={selectImage} style={styles.imageInput}>
              <MText>{imageName}</MText>
            </TouchableOpacity>
          </View>

          <View style={styles.group}>
            <MText type="label">Kategori</MText>
            <View style={styles.combobox}>
              <RNPickerSelect
                onValueChange={handleValueChange}
                items={categoryItems}
                placeholder={{label: 'Bir kategori seçin...', value: null}}
                value={selectedCategory}
                style={{placeholder: {color: 'gray'}}}
              />
            </View>
          </View>

          {data.images ? (
            <View style={styles.image_container}>
              <Image
                style={styles.image}
                source={{
                  uri: isValidUrl(data.images)
                    ? data.images
                    : 'https://img.icons8.com/bubbles/512/react.png',
                }}
              />
            </View>
          ) : null}
        </ScrollView>
      </PageView>
    </>
  );
}

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    group: {},
    input: {
      borderColor: Colors[colorScheme].inputBorder,
      backgroundColor: Colors.common.inputBackground,
      borderWidth: 1,
      marginBottom: 20,
      marginHorizontal: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      fontSize: moderateScale(14),
    },
    imageInput: {
      borderColor: Colors[colorScheme].inputBorder,
      backgroundColor: Colors.common.inputBackground,
      borderWidth: 1,
      marginBottom: 20,
      marginHorizontal: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      fontSize: moderateScale(14),
      height: 40,
      justifyContent:'center',
      },
    combobox: {
      borderColor: Colors[colorScheme].inputBorder,
      backgroundColor: Colors.common.inputBackground,
      borderWidth: 1,
      marginBottom: 20,
      marginHorizontal: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      fontSize: moderateScale(14),
    },
    double_input: {
      justifyContent: 'space-between',
      alignContent: 'space-between',
      flexDirection: 'row',
    },
    double_item: {
      flex: 1,
    },
    textArea: {
      height: 75, // 3 satır için uygun yükseklik (isteğe göre ayarlanabilir)
      textAlignVertical: 'top', // Metni üstte hizalar
      paddingVertical: 10,
      borderRadius: 10,
    },
    image_container: {
      alignItems: 'center',
    },
    image: {
      width: 300,
      height: 300,
    },
  });
};
