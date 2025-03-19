import React from 'react';

/**
 * 输入框组件
 * @param {Object} props - 组件属性
 * @param {string} props.label - 输入框标签
 * @param {string} props.type - 输入框类型
 * @param {string} props.value - 输入框值
 * @param {Function} props.onChange - 值变化事件处理函数
 * @param {string} props.placeholder - 占位文本
 * @param {string} props.error - 错误信息
 * @param {boolean} props.required - 是否必填
 * @returns {JSX.Element} 输入框组件
 */
const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  ...rest
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2 bg-gray-800 bg-opacity-50 border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 transition-colors`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input; 