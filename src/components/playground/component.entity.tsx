import React from "react";

interface ComponentEntityProps {
  title: string;
  children: React.ReactNode;
}

const ComponentEntity: React.FC<ComponentEntityProps> = ({ children, title }) => {
  return (
    <div className='space-y-2'>
      <h4 className='text-sm text-gray-400 font-medium'>{title}</h4>
      {children}
    </div>
  );
};

export default ComponentEntity;
