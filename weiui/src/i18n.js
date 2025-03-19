import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入语言文件
import translationEN from './locales/en/translation.json';
import translationZH_CN from './locales/zh_CN/translation.json';
import translationZH_TW from './locales/zh_TW/translation.json';
import translationRU from './locales/ru/translation.json';
import translationAR from './locales/ar/translation.json';
import translationFR from './locales/fr/translation.json';
import translationDE from './locales/de/translation.json';
import translationES from './locales/es/translation.json';

// 资源文件
const resources = {
  en: {
    translation: translationEN
  },
  zh_CN: {
    translation: translationZH_CN
  },
  zh_TW: {
    translation: translationZH_TW
  },
  ru: {
    translation: translationRU
  },
  ar: {
    translation: translationAR
  },
  fr: {
    translation: translationFR
  },
  de: {
    translation: translationDE
  },
  es: {
    translation: translationES
  }
};

i18n
  // 使用语言检测插件
  .use(LanguageDetector)
  // 使用react-i18next
  .use(initReactI18next)
  // 初始化i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // 不转义，React已经处理了XSS
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18n',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n; 