import React from 'react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  description,
  disabled = false,
}) => {
  return (
    <div className="flex items-start mb-4">
      <div className="flex items-center h-5">
        <button
          type="button"
          onClick={() => !disabled && onChange(!checked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
          }`}
          role="switch"
          aria-checked={checked}
          disabled={disabled}
        >
          <span
            className={`${
              checked ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-400'
            } inline-block h-4 w-4 transform rounded-full transition duration-200 ease-in-out ${
              checked ? 'bg-white' : 'bg-gray-400'
            }`}
          />
          <span
            className={`absolute inset-0 rounded-full ${
              checked ? 'bg-purple-600' : 'bg-gray-700'
            } transition duration-200 ease-in-out`}
          />
        </button>
      </div>
      <div className="ml-3 text-sm">
        <label className="font-medium text-gray-200 cursor-pointer" onClick={() => !disabled && onChange(!checked)}>
          {label}
        </label>
        {description && <p className="text-gray-400 text-xs mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default Toggle;

