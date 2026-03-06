import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-600" />;
      case 'info':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div className="fixed top-24 right-4 z-[999] animate-slide-in"> {/* Increased z-index */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 shadow-lg ${getBackgroundColor()} min-w-[300px] max-w-md`}>
        {getIcon()}
        <p className="flex-1 text-sm font-medium text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
