import React from "react";

export const DesignSystemContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='p-8 max-w-6xl mx-auto'>{children}</div>
);

export const DesignSystemHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='flex items-start justify-between'>{children}</div>
);

export const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className='text-3xl font-bold text-gray-900 mb-8'>{children}</h1>
);

export const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className='mb-12'>{children}</section>
);

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className='text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200'>
    {children}
  </h2>
);

export const ComponentGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>{children}</div>
);

export const ComponentCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='bg-gray-50 rounded-lg p-6 flex flex-col gap-4'>{children}</div>
);

export const ComponentTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className='text-base font-medium text-gray-700 m-0'>{children}</h3>
);

export const ComponentVariant: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='flex flex-col gap-2'>{children}</div>
);

export const VariantLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className='text-sm text-gray-500 m-0'>{children}</p>
);
