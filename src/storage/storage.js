// src/storage/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dil tercihini al
export const getLanguageFromStorage = async () => {
  const storedLanguage = await AsyncStorage.getItem('language');
  return storedLanguage || 'en'; // Varsayılan olarak 'en' dilini döndürür
};

// Dil tercihini kaydet
export const saveLanguageToStorage = async (language) => {
  await AsyncStorage.setItem('language', language);
};
