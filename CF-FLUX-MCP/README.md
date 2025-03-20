# CF-FLUX-MCP (简化版)

这是一个简化版的Cloudflare Flux MCP服务器，用于Cursor编辑器集成。

## 功能特点

- 基于Cloudflare Workers的AI图像生成
- 简单直接的MCP集成
- 最小化依赖和复杂性

## 使用方法

1. 确保安装了Node.js
2. 运行`final-simple.bat`查看启动信息
3. 在Cursor编辑器中配置MCP:
   - 打开设置 -> Copilot设置 -> MCP程序
   - 添加新程序，使用完整的命令路径: `node D:\Desktop\CF-FLUX1.0\CF-FLUX-MCP\simple-server-final.js`
   - 名称: CF-Flux-Simple
   - 描述: Flux图像生成

4. 在Cursor编辑器中使用命令:
   ```
   /generate-flux-image prompt="美丽的山脉风景" steps=5
   ```

## 参数说明

- `prompt`: 图像描述文本 (必填)
- `steps`: 生成步数，范围1-8 (可选，默认5)

## API格式

请求格式:
```
POST https://XXXXXXXXXXXXXXXXXXXXXXXXXXXX
Headers:
  Content-Type: application/json
  Authorization: Bearer Hsue8p20snchw734ambncMD
  
Body:
{
  "prompt": "图像描述",
  "steps": 5  // 可选参数，范围1-8
}
```

## 故障排除

如果遇到问题:
1. 检查`worker_url.txt`文件是否存在且包含正确的URL
2. 确保Cursor设置中的命令路径正确
3. 查看命令行输出是否有错误信息
4. 尝试调整`steps`参数到其他值(1-8之间)

## 文件说明

- `simple-server-final.js`: 主要的MCP服务器文件
- `final-simple.bat`: 启动批处理文件
- `package.json`: 项目依赖
- `worker_url.txt`: Worker URL配置 