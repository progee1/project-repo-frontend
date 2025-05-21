// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, className = '', size = 'md', ...props }) => {
  const baseStyles = 'rounded px-4 py-2 font-semibold focus:outline-none focus:ring';

  let sizeStyles = '';
  if (size === 'sm') sizeStyles = 'text-sm py-1 px-3';
  else if (size === 'md') sizeStyles = 'text-base';
  else if (size === 'lg') sizeStyles = 'text-lg py-3 px-6';

  return (
    <button
      className={`${baseStyles} ${sizeStyles} bg-blue-600 text-white hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
