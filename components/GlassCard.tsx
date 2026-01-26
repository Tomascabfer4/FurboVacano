import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void; // Añado onClick por si lo necesitas para navegar
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  delay = 0,
  onClick,
}) => {
  return (
    <motion.div
      // 1. Animación más corta y con menos desplazamiento para aliviar la CPU
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay, ease: "easeOut" }}
      onClick={onClick}
      className={`
        relative overflow-hidden
        
        /* 2. OPTIMIZACIÓN CLAVE: 
           En lugar de cristal transparente (que requiere blur),
           usamos un color oscuro al 95% de opacidad. 
           Se ve elegante igual, pero vuela en rendimiento. */
        bg-[#0f172a]/95
        
        /* Borde sutil para mantener el estilo premium */
        border border-white/10
        
        /* Sombra estándar de Tailwind (más optimizada) */
        shadow-xl
        
        rounded-2xl 
        p-5
        ${className}
      `}
    >
      {/* 3. Trucos visuales baratos (GPU Friendly) */}

      {/* Línea de luz superior (simula reflejo de cristal sin coste) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

      {/* Gradiente suave arriba */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
