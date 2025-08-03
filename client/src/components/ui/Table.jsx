import React from 'react';

export const Table = ({ children, className = '' }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className={`w-full ${className}`}>{children}</table>
      </div>
    </div>
  );
};

export const TableHeader = ({ children, className = '' }) => {
  return (
    <thead className={`bg-gray-50 border-b border-gray-200 ${className}`}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className = '' }) => {
  return <tbody className={className}>{children}</tbody>;
};

export const TableRow = ({ children, className = '', onClick }) => {
  return (
    <tr
      className={`border-b border-gray-100 hover:bg-gray-50 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className = '' }) => {
  return (
    <th
      className={`text-left py-3 px-4 font-medium text-gray-700 ${className}`}
    >
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = '' }) => {
  return <td className={`py-4 px-4 ${className}`}>{children}</td>;
};
