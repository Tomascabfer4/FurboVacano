import React, { useState } from 'react';
import { Server, User, Key, Download, Info, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAGMA_DATA } from '../data';
import { CopyButton } from './CopyButton';
import { GlassCard } from './GlassCard';

export const MagmaCard: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <GlassCard className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 !border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Magma Player
                </h2>
                <p className="text-sm text-white/50">Configuración SMARTERS</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/10">
                <Download size={14} className="text-orange-400" />
                <span className="text-xs text-white/70 uppercase tracking-wider">Downloader</span>
                <span className="font-mono font-bold text-orange-300">{MAGMA_DATA.downloaderCode}</span>
                <CopyButton textToCopy={MAGMA_DATA.downloaderCode} className="ml-1" />
            </div>
        </div>

        {/* Instructions Toggle */}
        <button 
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between text-left mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
        >
            <div className="flex items-center gap-2 text-blue-200">
                <Info size={16} />
                <span className="text-sm font-medium">¿Dónde pongo estos datos?</span>
            </div>
            <ChevronDown size={16} className={`text-blue-200 transition-transform ${showInstructions ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
            {showInstructions && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="bg-black/20 rounded-lg p-4 mb-4 text-sm text-white/70 space-y-2 border border-white/5">
                        <p>1. Abre la aplicación <b>Magma Player</b> (o IPTV Smarters).</p>
                        <p>2. Selecciona la opción que dice: <b className="text-white">"Login with Xtream Codes API"</b>.</p>
                        <p>3. En el primer campo pon cualquier nombre (ej: "Casa").</p>
                        <p>4. Copia y pega el <b>Usuario</b>, <b>Contraseña</b> y <b>URL (Servidor)</b> de abajo en sus casillas correspondientes.</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      <div className="space-y-3">
        {/* Server Field */}
        <div className="group relative overflow-hidden bg-black/30 rounded-xl p-4 border border-white/5 transition-all hover:border-white/20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
                        <Server size={18} />
                    </div>
                    <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Servidor (URL)</div>
                        <div className="font-mono text-white text-lg tracking-tight break-all sm:break-normal">{MAGMA_DATA.server}</div>
                    </div>
                </div>
                <CopyButton textToCopy={MAGMA_DATA.server} />
            </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-black/30 rounded-xl p-4 border border-white/5 flex items-center justify-between hover:border-white/20 transition-all">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                        <User size={18} />
                    </div>
                    <div>
                         <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Usuario</div>
                         <div className="font-mono text-white text-lg">{MAGMA_DATA.user}</div>
                    </div>
                </div>
                <CopyButton textToCopy={MAGMA_DATA.user} />
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/5 flex items-center justify-between hover:border-white/20 transition-all">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-pink-500/20 text-pink-300">
                        <Key size={18} />
                    </div>
                    <div>
                         <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Contraseña</div>
                         <div className="font-mono text-white text-lg">{MAGMA_DATA.pass}</div>
                    </div>
                </div>
                <CopyButton textToCopy={MAGMA_DATA.pass} />
            </div>
        </div>
      </div>
    </GlassCard>
  );
};