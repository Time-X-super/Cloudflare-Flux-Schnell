# 获取Cloudflare Worker URL指南

Flux Schnell应用需要一个Cloudflare Worker URL才能正常运行。本指南将帮助您部署Cloudflare Worker并获取所需的URL。

## 方法一：使用自动化脚本（推荐）

Flux Schnell提供了便捷的脚本，可以自动部署Worker并获取URL。

### 使用主启动脚本

1. 双击运行`start-flux-schnell.bat`
2. 在主菜单选择"2. 部署Worker并获取URL，然后启动WeiUI"
3. 系统会自动安装依赖并开始部署过程
4. 部署时会自动打开浏览器，请在浏览器中登录您的Cloudflare账户并授权
5. 部署成功后，命令行会显示Worker URL，并自动保存到`saved_worker_url.txt`文件
6. 应用会自动启动WeiUI，您可以在界面中输入刚获取的URL

### 单独使用获取URL工具

如果您只想获取Worker URL而不启动WeiUI，可以：

1. 双击运行`get-worker-url.bat`
2. 按照屏幕提示完成部署
3. 部署过程会自动打开浏览器请求登录和授权
4. 部署成功后，脚本会显示Worker URL并自动保存

## 方法二：手动部署

如果自动化脚本无法满足您的需求，您也可以手动部署Worker：

1. 确保您已安装Node.js和npm
2. 打开命令提示符，执行以下命令：

```
cd cf-flux-schnell
npm install
npm run deploy
```

3. 部署过程中，系统会自动打开浏览器请求登录Cloudflare账户并授权
4. 登录并授权后，部署将继续进行
5. 部署成功后，命令行会显示类似以下内容：
   ```
   Deploying your application to Cloudflare's global network...
   ✨ Success! Uploaded cf-flux-schnell (2.34 sec)
   Worker URL: https://cf-flux-schnell.xxx.workers.dev
   ```
6. 复制显示的Worker URL，随后在WeiUI中使用

## 方法三：从Cloudflare仪表板获取URL

如果您的Worker已经部署，可以直接从Cloudflare仪表板获取URL：

1. 访问 https://dash.cloudflare.com/
2. 登录您的Cloudflare账户
3. 点击侧边栏中的"Workers & Pages"
4. 在Workers列表中找到"cf-flux-schnell"
5. 复制显示的URL（通常是`https://cf-flux-schnell.xxx.workers.dev`格式）

## 常见问题

### Q: 部署时浏览器没有自动打开怎么办？

A: 您可以手动访问命令行中显示的URL进行登录，或者直接访问 https://dash.cloudflare.com/ 登录您的账户。

### Q: 部署时显示"A project with this name already exists"错误

A: 您之前可能已经部署过此Worker。您可以使用以下方式解决：
1. 从Cloudflare仪表板删除已有的Worker，然后重新部署
2. 直接从Cloudflare仪表板获取现有Worker的URL

### Q: 部署后找不到Worker URL怎么办？

A: 有以下几种解决方法：
1. 在部署输出日志中搜索"Worker URL"
2. 查看自动创建的`saved_worker_url.txt`文件
3. 登录Cloudflare仪表板，在Workers & Pages部分查找

## 获取帮助

如果您遇到其他问题，请：

1. 检查命令行输出中的错误信息
2. 查看完整的部署日志以获取详细信息
3. 访问Cloudflare Worker的文档: https://developers.cloudflare.com/workers/

## 下一步

成功获取Worker URL后，您需要将其输入到Flux Schnell的界面中。这将使WeiUI能够连接到您的Worker并进行文生图操作。 