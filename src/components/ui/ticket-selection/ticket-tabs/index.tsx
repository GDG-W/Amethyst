import React from "react";

interface TabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Tab: React.FC<TabProps> = ({ children, isActive, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 rounded-md px-2 py-2 text-sm font-medium transition-colors md:px-4 ${
        isActive
          ? "border border-[#EBEBEB] bg-white text-black shadow-sm shadow-[#0E121B08]"
          : "bg-transparent text-[#A3A3A3] hover:text-gray-700"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
    >
      {children}
    </button>
  );
};

interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs?: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs = [], activeTab, onTabChange, className = "" }) => {
  return (
    <div
      className={`-mx-4 flex gap-1 border border-y-[#EBEBEB] bg-[#F7F7F7] px-2 py-2 md:px-3 ${className}`}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={tab.id || index}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          disabled={tab.disabled}
        >
          <p className="text-xs md:text-base">{tab.label}</p>
        </Tab>
      ))}
    </div>
  );
};

export default Tabs;
