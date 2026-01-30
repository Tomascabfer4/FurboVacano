import { 
  Download, Smartphone, Tv, Zap, Link as LinkIcon, 
  Play, Shield, Globe, PlayCircle 
} from "lucide-react";

// Traduce el texto del JSON al componente visual
export const getIconComponent = (iconName: string | undefined) => {
  const name = iconName?.toLowerCase() || '';

  const map: any = {
    'download': Download,
    'smartphone': Smartphone,
    'tv': Tv,
    'zap': Zap,
    'link': LinkIcon,
    'play': Play,
    'shield': Shield,
    'globe': Globe,
    'playcircle': PlayCircle
  };

  // Si no encuentra el icono, pone un globo terráqueo por defecto
  return map[name] || Globe;
};