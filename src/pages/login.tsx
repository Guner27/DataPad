import React, {useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import PageView from '../components/PageView';
import {Colors} from '../constants/Colors';
import MText from '../components/MText';
import useLogin from '../hooks/useLogin';
import LoginButton from '../components/LoginButton';
import {useTranslation} from 'react-i18next';
import {saveLanguageToStorage} from '../storage/storage';
import RNPickerSelect from 'react-native-picker-select';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const colorScheme = useColorScheme();
  const styles = getStyle(colorScheme || 'light');
  const {email, password, setEmail, setPassword, loading, handleLogin} =
    useLogin();
  const {t, i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Başlangıçta seçili dil

  // Dil değişim fonksiyonu
  const changeLanguage = async (lng: any) => {
    setSelectedLanguage(lng); // Seçili dili güncelle
    await i18n.changeLanguage(lng);
    await saveLanguageToStorage(lng); // Dil tercihini kaydediyoruz
  };
  const languageOptions = [
    {label: 'English', value: 'en'},
    {label: 'Türkçe', value: 'tr'},
  ];

  // Eğer loading durumu varsa, loading gösterebiliriz
  loading ? <ActivityIndicator size="large" /> : null;
  return (
    <PageView style={styles.container} lockToPortrait={true}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={Colors[colorScheme || 'light'].background}
      />
      <View style={styles.picker}>
      <RNPickerSelect
      style={{inputAndroid:styles.picker}  }
        onValueChange={changeLanguage} // Dil değişimini sağlayacak fonksiyon
        value={selectedLanguage} // Başlangıçta seçili olan dil
        items={languageOptions} // Dil seçenekleri
        placeholder={{}}
      /></View>
      <View>
        <Icon style={styles.icon} name="login" size={100} />
        <View style={styles.inputContainer}>
          <Icon name="user" size={24} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={t('login.placeholder.email')}
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="key" size={24} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={t('login.placeholder.password')}
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <LoginButton title={t('login.button.signIn')} onPress={handleLogin} />
        )}

        <TouchableOpacity onPress={() => navigation.navigate('forgorPassword')}>
          <MText type="subtitle" style={styles.passwprdText}>
            {t('login.button.password')}
          </MText>
        </TouchableOpacity>
      </View>
      <LoginButton
        title={t('login.button.signUp')}
        outline={false}
        onPress={() => {
          navigation.navigate('register');
        }}
      />
    </PageView>
  );
}

const getStyle = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      justifyContent: 'space-around',
    },
    icon: {
      fontSize: 90,
      fontWeight: 'bold',
      color: Colors[colorScheme].icon,
      marginBottom: 50,
      textAlign: 'center',
    },
    input: {
      color: Colors[colorScheme].text,
      flex: 1,
      height: 60,
    },
    inputContainer: {
      flexDirection: 'row',
      height: 60,
      borderColor: Colors[colorScheme].inputBorder,
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 10,
      marginHorizontal: 16,
      borderRadius: 16,
    },
    inputIcon: {
      alignSelf: 'center',
      color: Colors[colorScheme].icon,
      width: 25,
    },

    passwprdText: {
      padding: 24,
      textAlign: 'center',
      marginBottom: 80,
    },
    picker:{
      width:120,
      alignSelf:'center',
      color:Colors[colorScheme || 'light'].text,
    },
  });
};
