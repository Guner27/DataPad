import AsyncStorage from '@react-native-async-storage/async-storage';
//import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState} from 'react';
import {Alert} from 'react-native';
import config from '../config';
import { useDispatch } from 'react-redux';

const url = `${config.API_BASE_URL}${config.endpoints.USERS_LOGIN}`;
const useLogin = () => {
  const [email, setEmail] = useState('can4');
  const [password, setPassword] = useState('123456');
  //const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    const loginData = {
      usernameOrMail: email, // API'deki alan ismine göre
      password: password,
    };
    try {
      setLoading(true);
      // API'ye POST isteği gönderiyoruz
      const response = await axios.post(url, loginData, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.data;
      // Eğer API başarılı bir token dönerse
      if (response) {
        dispatch({type: 'SET_USER',  payload:{responseData}});
        // Token'ı saklamak
        //await AsyncStorage.setItem('userToken', responseData);
        await AsyncStorage.setItem('userNameOrMail', email);
        //navigation.replace('tab', {screen: 'home'});
        console.info('Giriş Başarılı!');
        setLoading(false);
      } else {
        // Hata durumunda
        Alert.alert('Hata', responseData.message || 'Bir hata oluştu');

      }
    } catch (e:any) {
      // Network hataları için
      Alert.alert('Hata', 'Bağlantı hatası. Lütfen tekrar deneyin.' + e.message);
    }
    finally{
      setLoading(false);
    }
  };

  /*
  // Eğer ekran Focus'daysa (sayfa aktifse), token kontrolünü yap
  const isFocused = useIsFocused();

  // Token kontrol fonksiyonu
  const checkToken = useCallback( async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // Token varsa, ana sayfaya yönlendir
        console.log('Token found, navigating to home...');

        navigation.replace('tab', {screen: 'home'}); //Eski sayfa geçmişten silinir..
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.error('Error checking token:', error);
    } finally {
      setLoading(false); // Loading işlemini bitir
    }
  },[navigation]);

  // Ekran yüklendiğinde (useEffect kullanıyoruz), token kontrolünü yapıyoruz
  useEffect(() => {
    if (isFocused) {
      checkToken(); // Token'ı kontrol et
    }
  }, [isFocused,checkToken]);
*/
  return {email, setEmail, password,setPassword, loading, handleLogin, setLoading, useEffect};
};
export default useLogin;
