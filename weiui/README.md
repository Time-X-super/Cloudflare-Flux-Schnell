# Cloudflare-Flux Schnell WebUI - 文生图应用

基于Cloudflare Workers AI的文生图应用，提供简洁美观的界面，支持在Windows环境下一键运行。

## 功能特点

- 🚀 **一键运行**：在Windows环境下双击即可启动
- 🎨 **文生图**：基于Cloudflare Workers AI的flux-1-schnell模型生成图像
- 🛠️ **简易部署**：集成向导引导完成Cloudflare Workers部署
- 💾 **历史记录**：保存生成的图像历史记录，方便重用
- 📱 **响应式设计**：支持桌面和移动设备，界面自适应
- 🔧 **配置灵活**：支持自定义API URL和Token

## 快速开始

### 先决条件

1. 安装 [Node.js](https://nodejs.org/zh-cn/) (推荐v16.0.0以上版本)
2. 拥有 [Cloudflare 账户](https://dash.cloudflare.com/sign-up)

### 运行方式

#### Windows用户 (推荐)

1. 下载本项目并解压
2. 双击`start-weiui.bat`文件
3. 等待应用启动，浏览器会自动打开应用页面
4. 按照向导配置并部署Cloudflare Workers
5. 开始使用文生图功能

#### 手动运行

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建项目
npm run build

# 启动项目
npm run start
```

## 项目结构

```
weiui/
├── public/               # 静态资源目录
├── src/
│   ├── components/       # 组件目录
│   ├── pages/            # 页面目录
│   ├── styles/           # 样式目录
│   └── utils/            # 工具函数目录
├── .gitignore            # Git忽略文件
├── next.config.js        # Next.js配置
├── package.json          # 项目依赖
├── postcss.config.js     # PostCSS配置
├── README.md             # 项目说明
├── start-weiui.bat       # Windows启动脚本
└── tailwind.config.js    # Tailwind CSS配置
```

## Cloudflare Workers配置

本项目需要配合Cloudflare Workers使用，您需要：

1. 在Cloudflare上创建并部署Workers项目
2. 在`wrangler.jsonc`中配置AI绑定
3. 将Workers URL和Token配置到本应用中

详细配置步骤请参考应用内的部署向导。

## 静态部署

构建完成后，可以将`out`目录部署到任何静态网站托管服务：

```bash
npm run export  # 生成静态文件到out目录
```

## 技术栈

- [Next.js](https://nextjs.org/) - React框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Cloudflare Workers](https://workers.cloudflare.com/) - 无服务器平台
- [Workers AI](https://developers.cloudflare.com/workers/ai/) - AI服务

## 致谢

感谢Cloudflare提供强大的Workers AI平台，让更多人能够体验文生图的魅力。

## 许可证

MIT 