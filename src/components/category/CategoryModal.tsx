import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import MText from '../MText';

const CategoryModal = ({
  visible = false,
  modalType = true, //true : edit
  onClose,
  onSave,
  initialName = '',
}: any) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme || 'light');
  const [name, setName] = useState(initialName);

  const handleSave = () => {
    onSave(name); //Parent'e yeni değeri gönder (CategoryItem'deki handleEdit)
    setName('');
  };

  const modeElement = {
    okText: 'Düzenle',
    heaederText: 'Kategoriyi düzenle',
  };
  //true =edit, false: add
  if (!modalType) {
    modeElement.okText = 'Ekle';
    modeElement.heaederText = 'Yeni Kategori';
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.conteiner}>
        <View style={styles.innerConteiner}>
          <MText type="subtitle" style={styles.header}>
            {modeElement.heaederText}
          </MText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Kategori Adı"
          />
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleSave} style={styles.buttonLeft}>
              <MText type="button">{modeElement.okText}</MText>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.buttonRight}>
              <MText type="default" >İptal</MText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    conteiner: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    innerConteiner: {
      backgroundColor: Colors[colorScheme].background,
      padding: 20,
      borderRadius: 10,
    },
    header: {
      marginBottom: 10,
      padding: 5,
    },
    input: {
      height: 50,
      borderColor: Colors[colorScheme].inputBorder,
      backgroundColor: Colors.common.inputBackground,
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 10,
      minWidth: 100,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 2,
    },
    buttonLeft: {
      backgroundColor: Colors.common.editIcon,
      borderRadius: 5,
      padding: 10,
    },
    buttonRight: {
      backgroundColor: Colors.common.removeIcon,
      borderRadius: 5,
      padding: 10,
    },
  });
};

export default CategoryModal;
