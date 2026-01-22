import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CopyButtonProps {
  textToCopy: string;
  label?: string; // Optional label to show next to button
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, label, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
        {label && <span className="text-sm font-medium text-white/70">{label}</span>}
        <button
        onClick={handleCopy}
        className="relative group flex items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all active:scale-95 outline-none focus:ring-2 focus:ring-white/30"
        aria-label="Copy to clipboard"
        >
        <AnimatePresence mode='wait' initial={false}>
            {copied ? (
            <motion.div
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
            >
                <Check size={16} className="text-green-400" />
            </motion.div>
            ) : (
            <motion.div
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
            >
                <Copy size={16} className="text-white/80 group-hover:text-white" />
            </motion.div>
            )}
        </AnimatePresence>
        
        {/* Tooltip/Toast */}
        <AnimatePresence>
            {copied && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: -35 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] font-bold rounded-lg pointer-events-none whitespace-nowrap backdrop-blur-md"
            >
                ¡Copiado!
            </motion.div>
            )}
        </AnimatePresence>
        </button>
    </div>
  );
};