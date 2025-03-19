import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 语言切换组件
 * @returns {JSX.Element} 语言切换组件
 */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // 支持的语言列表
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh_CN', name: '简体中文', flag: '🇨🇳' },
    { code: 'zh_TW', name: '繁體中文', flag: '🇹🇼' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];
  
  // 获取当前语言
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  /**
   * 切换语言
   * @param {string} langCode - 语言代码
   */
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button 
        className="flex items-center px-3 py-1 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2">{currentLanguage.flag}</span>
        <span className="text-sm">{currentLanguage.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="py-1">
            {languages.map(language => (
              <button
                key={language.code}
                className={`w-full text-left px-4 py-2 text-sm ${
                  language.code === i18n.language ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                } flex items-center`}
                onClick={() => changeLanguage(language.code)}
              >
                <span className="mr-2">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 