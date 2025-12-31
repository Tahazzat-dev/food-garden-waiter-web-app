import { LoaderCircle } from 'lucide-react';

const LoadingSpinner = ({ className = '' }: { className?: string }) => {
  return <LoaderCircle className={`max-w-6 ${className} !animate-spin`} />;
};

export default LoadingSpinner;
