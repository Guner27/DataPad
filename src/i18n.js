import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import tr from './locales/tr.json';

const resources = {
  en: { translation: en },
  tr: { translation: tr },
};

i18n
  .use(initReactI18next) // React ile uyumlu bir şekilde i18next'i başlatıyoruz.
  .init({
    compatibilityJSON: 'v3',  // i18next'in uyumlu bir JSON formatını kullanmasını sağlar. Bu, eski sürümlerle uyumluluğu artırır.
    resources,           // Dil kaynaklarını burada belirtiriz.
    fallbackLng: 'en' , // Eğer seçilen dilde bir çeviri yoksa 'en' diline (İngilizce) geri döneriz.
    interpolation: {
      escapeValue: false,// Çevirilerde değerler kaçış yapmadan kullanılabilir. React'ta XSS saldırılarına karşı koruma sağlamak için genellikle `true` yapılır ama burada kapalı.
    },
  });

function findBestAvailableLanguage() {
  const availableLanguages = Object.keys(resources); // Mevcut dillerin listesi.
  const { languageTag } = RNLocalize.findBestAvailableLanguage(availableLanguages) || {};
  return languageTag || 'en'; // Varsayılan dil
}

//cihazın dilini otomatik tespit edip, doğru dildeki çeviriyi yüklemesini sağlıyoruz.
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: findBestAvailableLanguage,
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
