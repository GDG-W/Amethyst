// components/SubSection.tsx
import React from "react";

import { Card } from "../ui/card";

interface SubSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ComponentSubSection: React.FC<SubSectionProps> = ({ title, children }) => {
  return (
    <Card className='p-5 bg-static-white border-none outline-none shadow-none'>
      <h3 className='text-base font-medium text-gray-700'>{title}</h3>

      <div className='space-y-3'>{children}</div>
    </Card>
  );
};
