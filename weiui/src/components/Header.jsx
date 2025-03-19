import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * 页面顶部导航组件
 * @returns {JSX.Element} 页面顶部导航
 */
const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="w-full py-4 px-6 glass-effect sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-glow"></div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
            {t('header.title')}
          </h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <a 
                href="https://developers.cloudflare.com/workers/ai/" 
                className="text-gray-300 hover:text-primary-400 transition-colors flex items-center" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Image src="/cloudflare.svg" alt="Cloudflare" width={40} height={19} className="mr-2" />
                <span>Cloudflare AI</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/Time-X-super/" className="text-gray-300 hover:text-primary-400 transition-colors" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 