import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
    title: string;
    description: React.ReactNode;
}

interface CollapsibleGuideProps {
    title: string;
    steps: Step[];
    className?: string;
    defaultOpen?: boolean;
    icon?: 'help' | 'info';
}

export const CollapsibleGuide: React.FC<CollapsibleGuideProps> = ({ 
    title, 
    steps, 
    className = '', 
    defaultOpen = false,
    icon = 'help'
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`overflow-hidden rounded-2xl bg-indigo-500/10 border border-indigo-400/20 ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors group"
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${icon === 'help' ? 'bg-yellow-400/20 text-yellow-200' : 'bg-blue-400/20 text-blue-200'}`}>
                        {icon === 'help' ? <HelpCircle size={20} /> : <Info size={20} />}
                    </div>
                    <div>
                        <span className="font-semibold text-white/90 block">{title}</span>
                        {!isOpen && <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Toca para ver instrucciones</span>}
                    </div>
                </div>
                <div className={`p-1 rounded-full bg-white/5 border border-white/5 transition-all duration-300 ${isOpen ? 'rotate-180 bg-white/10' : ''}`}>
                    <ChevronDown className="text-white/70" size={16} />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 space-y-4">
                            <div className="h-px bg-white/10 mb-4" />
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold font-mono border border-white/20 text-white/80 shadow-inner">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-white/90">{step.title}</h4>
                                        <div className="text-sm text-white/60 leading-relaxed mt-1">
                                            {step.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};