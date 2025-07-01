// components/ComponentSection.tsx
import React from "react";

interface ComponentSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ComponentSection: React.FC<ComponentSectionProps> = ({ title, children }) => {
  return (
    <div>
      <h2 className='text-xl font-bold text-static-black mb-8'>{title}</h2>
      {children}
    </div>
  );
};
