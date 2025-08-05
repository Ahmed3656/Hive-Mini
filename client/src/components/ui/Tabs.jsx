import React from 'react';
import { useState, useEffect } from 'react';

export const Tabs = ({ tabs, defaultTab, onTabChange, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  useEffect(() => {
    if (defaultTab !== undefined) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div
      className={`flex space-x-4 sm:space-x-8 border-b border-gray-200 overflow-x-auto ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`pb-3 px-1 text-sm font-medium transition-colors whitespace-nowrap flex items-center space-x-2 ${
            activeTab === tab.id
              ? 'text-[#0075BE] border-b-2 border-[#0075BE]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.id
                  ? 'bg-[#0075BE] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
