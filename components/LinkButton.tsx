import React from 'react';
import { Download, ExternalLink, Play, Shield } from 'lucide-react';
import { LinkItem } from '../types';

interface LinkButtonProps {
  item: LinkItem;
  primary?: boolean;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ item, primary = false }) => {
  const Icon = () => {
    switch (item.icon) {
      case 'download': return <Download size={20} />;
      case 'play': return <Play size={20} />;
      case 'shield': return <Shield size={20} />;
      default: return <ExternalLink size={20} />;
    }
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300
        ${primary 
          ? 'bg-blue-600/80 hover:bg-blue-500/90 shadow-lg shadow-blue-900/20 text-white border border-blue-400/20' 
          : 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white/90'}
        active:scale-[0.98]
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`
          p-2 rounded-xl 
          ${primary ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'}
          transition-colors
        `}>
          <Icon />
        </div>
        <div className="text-left">
          <div className="font-semibold text-base">{item.title}</div>
          {item.description && (
            <div className={`text-xs mt-0.5 ${primary ? 'text-blue-100' : 'text-white/50'}`}>
              {item.description}
            </div>
          )}
        </div>
      </div>
      
      {/* Arrow indicator */}
      <div className="opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
        <ExternalLink size={16} />
      </div>
    </a>
  );
};