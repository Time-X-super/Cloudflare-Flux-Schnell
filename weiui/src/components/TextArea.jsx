import React from 'react';

/**
 * 文本域组件
 * @param {Object} props - 组件属性
 * @param {string} props.label - 文本域标签
 * @param {string} props.value - 文本域值
 * @param {Function} props.onChange - 值变化事件处理函数
 * @param {string} props.placeholder - 占位文本
 * @param {string} props.error - 错误信息
 * @param {boolean} props.required - 是否必填
 * @param {number} props.rows - 行数
 * @returns {JSX.Element} 文本域组件
 */
const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 4,
  ...rest
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`w-full px-4 py-2 bg-gray-800 bg-opacity-50 border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 transition-colors resize-none`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea; 