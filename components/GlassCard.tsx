import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      className={`
        relative overflow-hidden
        bg-white/5 
        backdrop-blur-xl 
        border border-white/10 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] 
        rounded-3xl 
        p-6 
        ${className}
      `}
    >
      {/* Glossy gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};