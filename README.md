# Flux Schnell

一个基于Cloudflare Worker与AI绑定的文生图应用。

## 快速开始

1. 双击运行`start-flux-schnell.bat`
2. 根据需要选择以下选项之一：
   - 选项1：直接启动WebUI (如果您已有Worker URL)
   - 选项2：部署Worker并获取URL，然后启动WebUI
   - 选项3：从最近部署中自动提取Worker URL
3. 如果选择部署Worker，系统会打开浏览器，请登录您的Cloudflare账户并授权
4. 部署完成后，请复制显示的Worker URL
5. 在WebUI界面中输入Worker URL，点击"保存并继续"按钮开始使用

## 目录结构

- `cf-flux-schnell/` - Cloudflare Worker源代码
- `weiui/` - 图形用户界面
- `*.bat` - 各种帮助脚本

## 特性

- 基于Cloudflare Workers AI的高质量文生图
- 响应式现代化界面设计
- 支持多种语言（英文、简体中文、繁体中文、俄语、阿拉伯语、法语、德语、西班牙语）
- 可调整生成步数，平衡质量与速度
- 生成历史记录与快速重用
- 便捷的图像下载功能
- 全自动部署与配置

## 部署说明

本应用使用Cloudflare Worker提供AI文生图服务，需要您拥有Cloudflare账户（免费）。

### 部署方式

1. **交互式浏览器认证(推荐)**: 
   - 运行`start-flux-schnell.bat`并选择选项2
   - 系统会打开浏览器让您登录Cloudflare账户
   - 部署完成后会自动保存Worker URL
   - 无需手动获取API Token

2. **手动部署**:
   - 进入`cf-flux-schnell`目录
   - 运行`npm install`
   - 运行`npx wrangler deploy`
   - 运行`save-worker-url.bat`保存获取的URL

## API说明

Worker部署后将提供文生图API，可通过以下方式调用：

```
POST https://your-worker-url.workers.dev
Headers:
  Content-Type: application/json
  Authorization: Bearer Hsue8p20snchw734ambncMD
  
Body:
{
  "prompt": "您想生成的图像描述",
  "steps": 4  // 可选参数，范围1-8
}
```

## 多语言支持

本应用支持以下语言：
- 英文 (English)
- 简体中文
- 繁体中文
- 俄语 (Русский)
- 阿拉伯语 (العربية)
- 法语 (Français)
- 德语 (Deutsch)
- 西班牙语 (Español)

语言会自动根据浏览器设置检测，也可以通过界面右上角的语言选择器手动切换。

## 故障排除

- **部署失败**: 确保您登录了正确的Cloudflare账户，并拥有部署Worker的权限
- **不显示Worker URL**: 部署成功后，URL会在命令行中显示；您也可以在Cloudflare仪表板的Workers页面找到URL
- **API调用失败**: 确保在请求中包含正确的Authorization头
- **WebUI无法启动**: 检查是否已安装Node.js，并尝试重新安装依赖（`cd weiui && npm install`）
- **URL保存后不生效**: 尝试重置配置并重新输入URL，确保点击"保存并继续"按钮

## 获取帮助

如需更多帮助，请参考`获取Worker URL指南.md`文档，或访问[Cloudflare Workers文档](https://developers.cloudflare.com/workers/)。

## 特别感谢

感谢Cloudflare提供AI服务，让大家能够体验文生图的魅力。 