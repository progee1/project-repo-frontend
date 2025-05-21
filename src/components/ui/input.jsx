// src/components/ui/input.jsx
import React from 'react';

export const Input = ({ type = 'text', value, onChange, placeholder, disabled }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="border rounded px-3 py-2 w-full"
    />
  );
};

export default Input;
