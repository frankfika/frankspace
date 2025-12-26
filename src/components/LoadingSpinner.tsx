import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
  </div>
);

export default LoadingSpinner;
