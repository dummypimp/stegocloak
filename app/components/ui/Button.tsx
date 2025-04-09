import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  type = 'button',
  fullWidth = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out';
  
  const variantStyles = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 disabled:bg-purple-400',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 disabled:bg-gray-600',
    outline: 'bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600/10 disabled:opacity-50'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

