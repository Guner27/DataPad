import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

const url = `${config.API_BASE_URL}${config.endpoints.USERS}`;
const url_edit = `${config.API_BASE_URL}${config.endpoints.USERS_UPDATE}`;
const url_delete = `${config.API_BASE_URL}${config.endpoints.USERS_DELETE}`;
export type User = {
  birthDate: string;
  email: string;
  id: number;
  name: string;
  surname: string;
  username: string;
};
const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    email: '',
    username: '',
    id: 0,
    birthDate: '',
  });
  const navigation = useNavigation<any>();

  const navigateToLogin = () => {
    console.log('Token expired or invalid');
    AsyncStorage.removeItem('userToken'); //Mevcut Token'i kaldır
    navigation.replace('login'); //Giriş Sayfasına yönlendir.
  };

  const fetchUser = async () => {
    const userNameOrMail = await AsyncStorage.getItem('userNameOrMail');
    const token = await AsyncStorage.getItem('userToken');

    try {
      const response = await axios.get(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı Authorization başlığında gönderiyoruz
          'Content-Type': 'application/json',
        },
        params: {
          usernameOrEmail: userNameOrMail,
        },
      });
      setUser(response.data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editUser = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.put(url_edit, user, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı Authorization başlığında gönderiyoruz
          'Content-Type': 'application/json',
        },
        params: {
          username: user.username,
        },
      });
      setUser(response.data);
      Alert.alert('Başarılı', 'Profilinizi düzenlediniz.');
    } catch (error: any) {
      console.error(error.message);
      if (error.response && error.response.status === 401) {navigateToLogin();}
    }
  };

  const deleteUser = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.delete(url_delete, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı Authorization başlığında gönderiyoruz
          'Content-Type': 'application/json',
        },
        params: {
          userId: user.id,
        },
      });
      console.info(response.data);
      Alert.alert('Başarılı', 'Silme işlemi başarıyla gerçekleşti.');
      navigateToLogin();
    } catch (error: any) {
      console.error('Ürün silinemedi:', error.message);
      if (error.response && error.response.status === 401) {navigateToLogin();}
    }
  };

  // Eğer ekran Focus'daysa (sayfa aktifse), token kontrolünü yap
  const isFocused = useIsFocused();
  // Ekran yüklendiğinde (useEffect kullanıyoruz), token kontrolünü yapıyoruz
  useEffect(() => {
    if (isFocused) {
      fetchUser();
    }
  }, [isFocused]);
  return {loading, user, fetchUser, editUser, setUser, deleteUser};
};

export default useUser;
