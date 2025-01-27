import React, {useEffect} from 'react';
import Router from './Router';
import AProvider from './context/AProvider/AProvider';
import i18n from './i18n';
import {I18nextProvider} from 'react-i18next';
import {getLanguageFromStorage} from './storage/storage';
export default () => {
  useEffect(() => {
    const setLanguage = async () => {
      const language = await getLanguageFromStorage(); // AsyncStorage'dan dil bilgisini alıyoruz
      i18n.changeLanguage(language);
    };
    setLanguage();
  }, []);
  return (
    <AProvider>
      <I18nextProvider i18n={i18n}>
        <Router />
      </I18nextProvider>
    </AProvider>
  );
};
