import axios from 'axios';

/**
 * 创建API服务
 * @param {string} baseURL - API基础URL
 * @param {string} token - 认证令牌
 * @returns {Object} API服务对象
 */
export const createApiService = (baseURL, token) => {
  // 确保baseURL是完整的URL，包含协议前缀
  let apiBaseUrl = baseURL;
  
  // 如果baseURL没有以协议开头，添加https://
  if (apiBaseUrl && !apiBaseUrl.startsWith('http://') && !apiBaseUrl.startsWith('https://')) {
    apiBaseUrl = `https://${apiBaseUrl}`;
  }
  
  // 创建带有默认设置的axios实例
  const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return {
    /**
     * 生成图像
     * @param {string} prompt - 提示词
     * @param {number} steps - 步数
     * @returns {Promise<Object>} 包含生成图像的响应
     */
    generateImage: async (prompt, steps = 4) => {
      try {
        const response = await api.post('', {
          prompt,
          steps,
          token, // 后端需要验证token
        });
        return response.data;
      } catch (error) {
        console.error('生成图像出错:', error);
        throw error;
      }
    },
    
    /**
     * 部署Cloudflare Worker
     * @param {Object} deployConfig - 部署配置
     * @returns {Promise<Object>} 部署结果
     */
    deployWorker: async (deployConfig) => {
      // 此方法只是模拟，实际部署需要在用户本地执行npm命令
      return {
        success: true,
        message: '部署命令已准备就绪，请在命令行执行',
        command: `cd cf-flux-schnell && npm install && npm run deploy`
      };
    }
  };
}; 