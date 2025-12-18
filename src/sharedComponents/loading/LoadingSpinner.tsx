import { Loader } from 'lucide-react';

const LoadingSpinner = ({ className = '' }: { className?: string }) => {
  return <Loader className={`max-w-6 ${className} !animate-spin`} />;
};

export default LoadingSpinner;
