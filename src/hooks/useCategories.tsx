// useCategories.js
import {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import config from './../config';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const url = `${config.API_BASE_URL}${config.endpoints.CATEGORY}`;
const urlGetAll = `${config.API_BASE_URL}${config.endpoints.GET_CATEGORIES}`;

//URL_Put + `${data.id}`
const useCategories = () => {
  const [categories, setCategories] = useState([{id: '', name: ''}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const navigateToLogin = () => {
    console.log('Token expired or invalid');
    dispatch({type: 'REMOVE_USER'});
    Alert.alert('HATA!', 'Lütfen tekrar giriş yapınız. Süzeriniz Doldu..');
  };

  const fetchCategories = async () => {
    //Token'i Al
    const token = await AsyncStorage.getItem('userToken');
    setLoading(true);
    try {
      const response = await axios.get(urlGetAll, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı Authorization başlığında gönderiyoruz
          'Content-Type': 'application/json',
        },
      });
      setCategories(response.data);
    } catch (e: any) {
      setError(e.message);
      if (e.response && e.response.status === 401) {
        navigateToLogin();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (itemId: any) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.delete(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı Authorization başlığında gönderiyoruz
          'Content-Type': 'application/json',
        },
        params: {
          id: itemId,
        },
      });
      console.info(response.data);
      fetchCategories();
    } catch (e: any) {
      console.error('Kategori silinemedi:', e.message);
      setError(e.message);
      if (e.response && e.response.status === 401) {
        navigateToLogin();
      }
    }
  };

  const editCategory = async (data: any) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.put(url, data, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı Authorization başlığında gönderiyoruz
          'Content-Type': 'application/json',
        },
        params: {id: data.id},
      });
      console.log(response.data);
      fetchCategories();
    } catch (e: any) {
      if (e.response && e.response.status === 401) {
        navigateToLogin();
      }
      console.error('Kategori güncellenemedi:', e.message);
      setError(e.message);
    }
  };

  const createCategory = async (data: string) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        url,
        {name: data},
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`, // Token'ı Authorization başlığında gönderiyoruz
            'Content-Type': 'application/json',
          },
        },
      );
      console.info(response.data);
      fetchCategories();
    } catch (e: any) {
      console.error('Kategori Eklenemedi:', e.message);
      setError(e.message);
      if (e.response && e.response.status === 401) {
        navigateToLogin();
      }
    }
  };


  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      fetchCategories();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    deleteCategory,
    editCategory,
    createCategory,
    setError,
  };
};

export default useCategories;
