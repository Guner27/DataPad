import config from './../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';

const url = `${config.API_BASE_URL}${config.endpoints.PRODUCTS}`;
const url_getAll = `${config.API_BASE_URL}${config.endpoints.PRODUCTS_GET_ALL}`;
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const navigateToLogin = () => {
    console.log('Token expired or invalid');
    dispatch({type: 'REMOVE_USER'});
    Alert.alert('HATA!', 'Lütfen tekrar giriş yapınız. Süreniz Doldu..');
  };

  const fetchProducts = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setLoading(true);
    try {
      const response = await axios.get(url_getAll, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı Authorization başlığında gönderiyoruz
          'Content-Type': 'application/json',
        },
      });
      setProducts(response.data);
    } catch (e: any) {
      if (e.response && e.response.status === 404) {
        Alert.alert('Ürün Bulunamadı!');
      }
      setError(e.message);
      //Token geçerlilik Kontrolü:
      if (e.response && e.response.status === 401) {
        navigateToLogin();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (itemId: string) => {
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
      fetchProducts();
    } catch (e: any) {
      console.error('Ürün silinemedi:', e.message);
      setError(e.message);
      if (e.response && e.response.status === 401) {
        navigateToLogin();
      }
    }
  };

  const createProduct = async (data: any) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.post(url, data, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı Authorization başlığında gönderiyoruz
          'Content-Type': 'application/json',
        },
      });
      console.info(response.data);
      fetchProducts();
    } catch (e: any) {
      console.error('Ürün Eklenemedi:', e.message);
      setError(e.message);

      if (e.response && e.response.status === 401) {
        navigateToLogin();
      }
    }
  };

  const editProduct = async (data: any) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.patch(url, data, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı Authorization başlığında gönderiyoruz
          'Content-Type': 'application/json',
        },
        params: {id: data.id},
      });
      console.info(response.data);
      fetchProducts();
    } catch (e: any) {
      console.error('Ürün Eklenemedi:', e.message);
      setError(e.message);
      if (e.response && e.response.status === 401) {
        navigateToLogin();
      }
    }
  };

  useEffect(() => {
      fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    deleteProduct,
    createProduct,
    editProduct,
    setError,
  };
};

export default useProducts;
