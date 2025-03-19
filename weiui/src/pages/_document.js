import { Html, Head, Main, NextScript } from 'next/document';

/**
 * 自定义文档组件
 * @returns {JSX.Element} 文档组件
 */
export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="description" content="Cloudflare-Flux Schnell WebUI - 基于Cloudflare Workers AI的文生图应用" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 