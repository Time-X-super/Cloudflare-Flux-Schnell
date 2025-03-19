import React from 'react';

/**
 * 按钮组件
 * @param {Object} props - 组件属性
 * @param {string} props.type - 按钮类型 (primary, secondary, outline)
 * @param {boolean} props.loading - 是否显示加载状态
 * @param {Function} props.onClick - 点击事件处理函数
 * @param {React.ReactNode} props.children - 按钮内容
 * @param {string} props.className - 额外的样式类名
 * @returns {JSX.Element} 按钮组件
 */
const Button = ({ 
  type = 'primary', 
  loading = false, 
  onClick, 
  children, 
  className = '',
  ...rest 
}) => {
  // 基础样式
  const baseStyles = "rounded-lg px-5 py-2.5 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center";
  
  // 类型样式
  const typeStyles = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 focus:ring-primary-400",
    secondary: "bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-500",
    outline: "border border-primary-500 text-primary-500 hover:bg-primary-50 hover:bg-opacity-10 focus:ring-primary-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  
  // 禁用和加载状态样式
  const disabledStyles = loading ? "opacity-70 cursor-not-allowed" : "";
  
  return (
    <button
      className={`${baseStyles} ${typeStyles[type]} ${disabledStyles} ${className}`}
      onClick={loading ? undefined : onClick}
      disabled={loading}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button; 