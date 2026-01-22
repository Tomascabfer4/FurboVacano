import React from 'react';
import { MY_LINK_PASTE_CODES } from '../data';
import { CopyButton } from './CopyButton';
import { motion } from 'framer-motion';

export const PasteGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {MY_LINK_PASTE_CODES.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="relative group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 flex flex-col justify-between transition-all hover:scale-[1.03] hover:shadow-xl hover:border-white/20"
        >
          <div className="mb-3">
            <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-1">Nombre</div>
            <h3 className="font-semibold text-white truncate pr-2">{item.name}</h3>
          </div>
          
          <div className="flex items-center justify-between bg-black/40 rounded-lg p-2 border border-white/5">
            <code className="text-[10px] sm:text-xs font-mono text-cyan-300 truncate max-w-[80px] sm:max-w-[100px]">
              {item.code}
            </code>
            <CopyButton textToCopy={item.code} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};