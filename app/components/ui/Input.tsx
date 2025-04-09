import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, fullWidth = false, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-600 focus:ring-purple-500 focus:border-purple-500';
    
    return (
      <div className={`mb-4 ${widthClass}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-200 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`bg-gray-800 border ${errorClass} text-white rounded-md px-3 py-2 text-sm w-full shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-gray-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

