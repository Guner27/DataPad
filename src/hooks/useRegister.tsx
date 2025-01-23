import axios from 'axios';
import {useState} from 'react';
import {Alert} from 'react-native';
import config from '../config';
import { useNavigation } from '@react-navigation/native';

const url = `${config.API_BASE_URL}${config.endpoints.USER_REGISTER}`;
export type User = {
    birthDate: string;
    email: string;
    name: string;
    surname: string;
    username: string;
    password: string;
    profileHexColor?:'#ffffff',
    biography?:' ',
  };

const useRegister = () => {
      const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    email: '',
    username: '',
    birthDate: '',
    password:'',
  });

  const register = async () => {
    if (
      user.username === '' ||
      user.name === '' ||
      user.surname === '' ||
      user.email === '' ||
      user.birthDate === '' ||
      user.password === ''
    ) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz!');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(url, user, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.data;
      console.info(responseData);
      Alert.alert('Başarılı', 'Lütfen mailini kontrol ediniz! Hesabınızı doğruladıktan sonra giriş yapabilirsiniz.');
      navigation.goBack();
    } catch (e :any) {
        console.error(e.message);
      Alert.alert('Hata', 'Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally{
        setLoading(false);
    }
  };

  return {
    user, setUser,
    loading,
    register,
  };
};
export default useRegister;
