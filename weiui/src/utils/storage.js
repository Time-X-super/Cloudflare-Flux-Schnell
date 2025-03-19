/**
 * 本地存储键名
 */
export const STORAGE_KEYS = {
  API_URL: 'flux_api_url',
  API_TOKEN: 'flux_api_token',
  IS_DEPLOYED: 'flux_is_deployed',
  DEPLOYMENT_STATUS: 'flux_deployment_status',
  GENERATED_IMAGES: 'flux_generated_images',
};

/**
 * 保存数据到本地存储
 * @param {string} key - 存储键名
 * @param {any} value - 要存储的值
 */
export const saveToStorage = (key, value) => {
  try {
    const serializedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`保存到本地存储出错 (${key}):`, error);
  }
};

/**
 * 从本地存储获取数据
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值（如果键不存在）
 * @returns {any} 存储的值或默认值
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    
    // 尝试解析JSON
    try {
      return JSON.parse(value);
    } catch {
      // 如果不是JSON则返回原始值
      return value;
    }
  } catch (error) {
    console.error(`从本地存储获取数据出错 (${key}):`, error);
    return defaultValue;
  }
};

/**
 * 从本地存储删除数据
 * @param {string} key - 存储键名
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`从本地存储删除数据出错 (${key}):`, error);
  }
};

/**
 * 获取API配置
 * @returns {Object} API配置
 */
export const getApiConfig = () => {
  return {
    apiUrl: getFromStorage(STORAGE_KEYS.API_URL, ''),
    apiToken: getFromStorage(STORAGE_KEYS.API_TOKEN, ''),
    isDeployed: getFromStorage(STORAGE_KEYS.IS_DEPLOYED, false),
  };
};

/**
 * 保存API配置
 * @param {Object} config - API配置
 */
export const saveApiConfig = (config) => {
  const { apiUrl, apiToken, isDeployed } = config;
  
  if (apiUrl) saveToStorage(STORAGE_KEYS.API_URL, apiUrl);
  if (apiToken) saveToStorage(STORAGE_KEYS.API_TOKEN, apiToken);
  if (isDeployed !== undefined) saveToStorage(STORAGE_KEYS.IS_DEPLOYED, isDeployed);
}; 