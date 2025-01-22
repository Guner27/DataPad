import axios from 'axios';
import {useState} from 'react';
import {Alert} from 'react-native';
import config from '../config';
import {useNavigation} from '@react-navigation/native';


const useFotgot = () => {
  const [pageChange, setPageChange] = useState(true);
  const navigation = useNavigation();

  const url_request = `${config.API_BASE_URL}${config.endpoints.USER_REQUEST_PASSWORD_RESET}`;
  const url_reset = `${config.API_BASE_URL}${config.endpoints.USER_RESET_PASSWORD}`;
  const requestPasswordReset = async (mailOrUserName: string) => {
    const data = {
      email: mailOrUserName,
    };
    try {
      const response = await axios.post(url_request, data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPageChange(!pageChange);
      console.info(response.data);
      Alert.alert(
        'Başarılı',
        'Şifre sıfırlama e-postası gönderildi. E-postanızı kontrol ediniz.',
      );
    } catch (error: any) {
      Alert.alert('Hata', 'Lütfen e-posta adresini kontrol ediniz!');

      console.error(error.message);
    }
  };
  const resetPassword = async (data: {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await axios.post(url_reset, data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.info(response.data);
      Alert.alert(
        'Başarılı',
        'Şifre sıfırlama Başarıyla gerçekleşti yeni şifrenizle giriş yapınız!',
      );
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Hata', 'Lütfen bilgileri kontrol ediniz!');
      console.error(error.message);
    }
    console.info(data);
  };

  return {pageChange, setPageChange, requestPasswordReset, resetPassword};
};
export default useFotgot;
