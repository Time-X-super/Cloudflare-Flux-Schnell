import '../styles/globals.css';
import '../i18n'; // 导入i18n配置

/**
 * App组件
 * @param {Object} props - 组件属性
 * @param {React.Component} props.Component - 页面组件
 * @param {Object} props.pageProps - 页面属性
 * @returns {JSX.Element} App组件
 */
function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App; 