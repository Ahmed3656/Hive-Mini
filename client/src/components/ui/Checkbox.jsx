import React from 'react';

export const Checkbox = ({ label, error, className = '', id, ...props }) => {
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center">
      <input
        id={checkboxId}
        type="checkbox"
        className={`w-4 h-4 text-[#0075BE] border-gray-300 rounded focus:ring-[#0075BE] ${className}`}
        {...props}
      />
      {label && (
        <label htmlFor={checkboxId} className="ml-2 text-sm text-gray-600">
          {label}
        </label>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
