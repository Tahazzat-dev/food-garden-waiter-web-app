import { Circle } from 'lucide-react';
import React from 'react';

const LoadingSpinner = ({ className = '' }: { className?: string }) => {
  return <Circle className={`max-w-6 ${className} !animate-spin`} />;
};

export default LoadingSpinner;
