import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Fixed token
const FLUX_TOKEN = 'Hsue8p20snchw734ambncMD';

// 判断文本是否包含中文
function containsChinese(text) {
  return /[\u4e00-\u9fa5]/.test(text);
}

// 简化版中文转英文 - 使用简单的映射表示例
function simpleChineseToEnglish(text) {
  if (!containsChinese(text)) {
    console.error('Prompt does not contain Chinese, using as is');
    return text;
  }
  
  console.error('Converting Chinese prompt to English');
  
  // 简单的中文到英文的映射
  const translations = {
    '山水': 'landscape',
    '风景画': 'scenery painting',
    '中国风': 'Chinese style',
    '天空': 'sky',
    '云彩': 'clouds',
    '森林': 'forest',
    '树木': 'trees',
    '河流': 'river',
    '大海': 'ocean',
    '湖泊': 'lake',
    '山脉': 'mountains',
    '瀑布': 'waterfall',
    '日出': 'sunrise',
    '日落': 'sunset',
    '花朵': 'flowers',
    '草地': 'grassland',
    '雪景': 'snow scene',
    '月亮': 'moon',
    '星星': 'stars',
    '动物': 'animals',
    '鸟类': 'birds',
    '城市': 'city',
    '乡村': 'countryside',
    '建筑': 'buildings',
    '桥梁': 'bridge',
    '道路': 'road',
    '街道': 'street',
    '古代': 'ancient',
    '现代': 'modern',
    '未来': 'future',
    '科技': 'technology',
    '梦幻': 'dreamlike',
    '写实': 'realistic',
    '抽象': 'abstract',
    '人物': 'characters',
    '美丽': 'beautiful',
    '壮观': 'magnificent',
    '宁静': 'peaceful',
    '热闹': 'lively',
    '明亮': 'bright',
    '黑暗': 'dark',
    '彩色': 'colorful',
    '水墨': 'ink painting',
    '油画': 'oil painting',
    '插画': 'illustration',
    '漫画': 'cartoon',
    '摄影': 'photography',
    '电影': 'movie',
    '风格': 'style',
    '画面': 'scene',
    '场景': 'setting',
    '视角': 'perspective',
    '光影': 'light and shadow',
    '色彩': 'colors',
    '质感': 'texture',
    '氛围': 'atmosphere',
    '情绪': 'emotion',
    '效果': 'effect',
    '高清': 'high definition',
    '细节': 'details'
  };
  
  // 尝试替换已知的中文词汇
  let result = text;
  for (const [cn, en] of Object.entries(translations)) {
    if (text.includes(cn)) {
      result = result.replace(new RegExp(cn, 'g'), en);
    }
  }
  
  // 如果结果中仍有中文，用占位符替换
  if (containsChinese(result)) {
    console.error('Warning: Some Chinese characters could not be translated');
    // 如果无法完全翻译，但我们知道是风景类的（根据翻译出的部分判断）
    if (result.includes('landscape') || result.includes('scenery') || 
        result.includes('mountain') || result.includes('nature')) {
      result = 'beautiful landscape painting with ' + result.replace(/[\u4e00-\u9fa5]/g, '');
    } else {
      // 通用替换，保留所有非中文字符
      result = 'beautiful image with ' + result.replace(/[\u4e00-\u9fa5]/g, '');
    }
    result = result.replace(/\s+/g, ' ').trim();
  }
  
  console.error(`Translated to: ${result}`);
  return result;
}

// Simple Flux service
class SimpleFluxService {
  constructor() {
    // Find worker URL
    const curDir = process.cwd();
    const possiblePaths = [
      path.join(curDir, 'worker_url.txt'),
      path.join(curDir, '..', 'worker_url.txt')
    ];
    
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        this.workerUrl = fs.readFileSync(p, 'utf8').trim();
        console.error(`Worker URL: ${this.workerUrl}`);
        break;
      }
    }
    
    if (!this.workerUrl) {
      this.workerUrl = 'https://flux.aipeipei.net';
      console.error(`Using default Worker URL: ${this.workerUrl}`);
    }
  }
  
  // 保存图片到文件系统
  saveBase64Image(base64String, outputDir, filename) {
    try {
      // 创建输出目录（如果不存在）
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // 从base64字符串中提取数据部分
      const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string format');
      }
      
      const type = matches[1];
      const data = matches[2];
      const buffer = Buffer.from(data, 'base64');
      
      // 确定文件扩展名
      const extension = type.split('/')[1] || 'png';
      const filePath = path.join(outputDir, `${filename}.${extension}`);
      
      // 保存文件
      fs.writeFileSync(filePath, buffer);
      console.error(`Image saved to: ${filePath}`);
      
      return filePath;
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  }
  
  async generateImage(prompt, steps = 5, outputDir = null, filename = null) {
    try {
      // 检测并翻译中文提示词
      const englishPrompt = simpleChineseToEnglish(prompt);
      
      console.error(`Sending request to ${this.workerUrl}`);
      console.error(`Original Prompt: ${prompt}`);
      console.error(`English Prompt: ${englishPrompt}`);
      console.error(`Steps: ${steps}`);
      
      // 准备请求数据 - 使用简单格式避免复杂JSON问题
      const requestData = {
        prompt: englishPrompt,
        steps: steps
      };
      
      console.error('Request data:', JSON.stringify(requestData, null, 2));
      
      // Make request to worker with correct headers
      const response = await fetch(this.workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${FLUX_TOKEN}`
        },
        body: JSON.stringify(requestData)
      });
      
      console.error(`Response status: ${response.status} ${response.statusText}`);
      
      // 尝试读取响应文本以便调试
      const responseText = await response.text();
      console.error('Response text:', responseText);
      
      if (!response.ok) {
        console.error(`API error: ${response.status} - ${responseText}`);
        throw new Error(`API Error: ${response.status} - ${responseText}`);
      }
      
      // 尝试解析响应为JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.error('Successfully parsed response JSON');
        
        // 如果请求要求保存图片且响应包含图片数据
        if (outputDir && data.image) {
          // 生成默认文件名（如果未提供）
          const actualFilename = filename || `flux_image_${Date.now()}`;
          
          // 保存图片
          const imagePath = this.saveBase64Image(data.image, outputDir, actualFilename);
          
          // 在返回数据中添加保存的图片路径
          data.saved_image_path = imagePath;
        }
        
      } catch (err) {
        console.error('Failed to parse response as JSON:', err);
        throw new Error(`Failed to parse response: ${err.message}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error calling Flux API:', error);
      throw error;
    }
  }
}

// Set up the service
const fluxService = new SimpleFluxService();

// Set up the server
const server = new McpServer({
  name: "cf-flux-simple",
  version: "1.0.0"
});

// Register the image generation tool
server.tool(
  "generate-flux-image",
  "Generate an image based on a prompt",
  {
    prompt: z.string().describe("Text prompt for image generation"),
    steps: z.number().min(1).max(8).optional().describe("Number of steps (1-8)"),
    output_dir: z.string().optional().describe("Directory path to save the generated image"),
    filename: z.string().optional().describe("Filename to save the image (without extension)")
  },
  async (params) => {
    try {
      console.error(`Generating with prompt: ${params.prompt}`);
      const result = await fluxService.generateImage(
        params.prompt, 
        params.steps || 5,
        params.output_dir,
        params.filename
      );
      
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error: ${error.message}`
        }]
      };
    }
  }
);

// Start the server
async function main() {
  console.error("Starting Flux MCP Server...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Flux MCP Server running on stdio");
}

main().catch(error => {
  console.error("Error:", error);
  process.exit(1);
}); 