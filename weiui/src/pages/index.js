import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import ImageGenerator from '../components/ImageGenerator';
import Input from '../components/Input';
import Button from '../components/Button';
import { getApiConfig, saveApiConfig } from '../utils/storage';

/**
 * 主页组件
 * @returns {JSX.Element} 主页组件
 */
export default function Home() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [apiConfig, setApiConfig] = useState({
    apiUrl: '',
    isDeployed: false,
  });
  const [inputApiUrl, setInputApiUrl] = useState('');
  const [showUrlForm, setShowUrlForm] = useState(true);
  
  // 初始化apiConfig
  useEffect(() => {
    setIsClient(true);
    // 获取保存的API URL，或者从saved_worker_url.txt读取
    const config = getApiConfig();
    
    // 检查配置中的URL是否有效
    if (config.apiUrl && typeof config.apiUrl === 'string' && config.apiUrl.trim() !== '') {
      console.log('找到已保存的Worker URL:', config.apiUrl);
      setApiConfig({
        ...config,
        apiUrl: config.apiUrl.trim()
      });
      setShowUrlForm(false);
    } else {
      console.log('未找到有效的Worker URL，尝试从saved_worker_url.txt读取');
      // 使用fetch从当前目录的saved_worker_url.txt读取
      fetch('/saved_worker_url.txt')
        .then(response => {
          if (response.ok) return response.text();
          throw new Error(t('apiConfig.emptyUrlError'));
        })
        .then(url => {
          const trimmedUrl = url.trim();
          if (trimmedUrl) {
            console.log('从saved_worker_url.txt读取到URL:', trimmedUrl);
            const newConfig = { 
              ...config, 
              apiUrl: trimmedUrl, 
              isDeployed: true 
            };
            setApiConfig(newConfig);
            saveApiConfig(newConfig);
            setShowUrlForm(false);
          } else {
            console.log('saved_worker_url.txt为空或内容无效');
            setShowUrlForm(true);
          }
        })
        .catch(err => {
          console.error(t('apiConfig.emptyUrlError') + ':', err);
          setShowUrlForm(true);
        });
    }
  }, [t]);
  
  /**
   * 处理保存API URL
   */
  const handleSaveApiUrl = () => {
    if (inputApiUrl && inputApiUrl.trim() !== '') {
      const trimmedUrl = inputApiUrl.trim();
      const newConfig = {
        ...apiConfig,
        apiUrl: trimmedUrl,
        isDeployed: true
      };
      
      setApiConfig(newConfig);
      saveApiConfig(newConfig);
      
      // 显示保存成功的消息
      alert(t('apiConfig.saveSuccess'));
      
      // 成功保存后再切换到生成图像界面
      setShowUrlForm(false);
    } else {
      alert(t('apiConfig.emptyUrlError'));
    }
  };
  
  /**
   * 处理重置设置
   */
  const handleReset = () => {
    if (window.confirm(t('common.resetConfig') + '?')) {
      const newConfig = {
        apiUrl: '',
        isDeployed: false,
      };
      setApiConfig(newConfig);
      saveApiConfig(newConfig);
      setInputApiUrl('');
      setShowUrlForm(true);
    }
  };
  
  /**
   * 处理输入URL的变化
   */
  const handleUrlInputChange = (e) => {
    setInputApiUrl(e.target.value);
  };
  
  // 渲染URL输入表单
  const renderUrlForm = () => {
    return (
      <div className="max-w-2xl mx-auto p-6 tech-border rounded-xl">
        <h2 className="text-2xl font-bold mb-4">{t('apiConfig.title')}</h2>
        <p className="mb-6 text-gray-300">
          {t('apiConfig.description')}
        </p>
        <Input
          label={t('apiConfig.urlLabel')}
          placeholder={t('apiConfig.urlPlaceholder')}
          value={inputApiUrl}
          onChange={handleUrlInputChange}
          required
        />
        <div className="mt-4">
          <Button onClick={handleSaveApiUrl}>
            {t('apiConfig.saveButton')}
          </Button>
        </div>
        <div className="mt-4 text-sm text-gray-400">
          <p>{t('apiConfig.guideTitle')}</p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li dangerouslySetInnerHTML={{__html: t('apiConfig.guideSteps.step1')}} />
            <li dangerouslySetInnerHTML={{__html: t('apiConfig.guideSteps.step2')}} />
            <li dangerouslySetInnerHTML={{__html: t('apiConfig.guideSteps.step3')}} />
            <li dangerouslySetInnerHTML={{__html: t('apiConfig.guideSteps.step4')}} />
          </ol>
        </div>
      </div>
    );
  };
  
  // 渲染图像生成界面
  const renderImageGenerator = () => {
    return (
      <>
        <div className="flex justify-end p-4">
          <button 
            onClick={handleReset}
            className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
          >
            {t('common.resetConfig')}
          </button>
        </div>
        <ImageGenerator apiUrl={apiConfig.apiUrl} />
      </>
    );
  };
  
  // 页面内容
  const renderContent = () => {
    if (!isClient) {
      return <div className="flex justify-center items-center h-96">{t('common.loading')}</div>;
    }
    
    return showUrlForm ? renderUrlForm() : renderImageGenerator();
  };
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>{t('common.appName')} - {t('header.subtitle')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        {renderContent()}
      </main>
      
      <footer className="py-8 mt-12 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <p className="mt-2">{t('footer.poweredBy')}</p>
        </div>
      </footer>
    </div>
  );
} 