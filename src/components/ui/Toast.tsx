'use client';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const icons = {
    success: <CheckCircleIcon className="w-5 h-5 text-green-400" />,
    error: <XCircleIcon className="w-5 h-5 text-red-400" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`
        fixed bottom-4 right-4 z-50
        flex items-center gap-3 p-4
        rounded-xl backdrop-blur-xl
        border border-white/20
        ${type === 'success' ? 'bg-green-500/10' : 'bg-red-500/10'}
      `}
    >
      {icons[type]}
      <p className="text-white/90">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-full transition-colors"
        title="Close"
        type="button"
      >
        <XMarkIcon className="w-4 h-4 text-white/70" />
      </button>
    </motion.div>
  );
} 