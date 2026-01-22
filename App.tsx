import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Tv, Globe, Shield, Radio, Key, Menu, X } from 'lucide-react';

import { GlassCard } from './components/GlassCard';
import { LinkButton } from './components/LinkButton';
import { MagmaCard } from './components/MagmaCard';
import { PasteGrid } from './components/PasteGrid';
import { CopyButton } from './components/CopyButton';
import { CollapsibleGuide } from './components/CollapsibleGuide';

import { 
  MAIN_DOWNLOAD_LINK, 
  VPN_TOOLS, 
  STREAMING_APPS, 
  ACESTREAM_LISTS, 
  WEB_CHANNELS 
} from './data';

enum Tab {
  GUIDE = 'guide',
  CODES = 'codes',
  WEB = 'web'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.GUIDE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Background Mesh Gradient
  const Background = () => (
    <div className="fixed inset-0 -z-10 bg-black">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_10%,rgba(50,50,150,0.3),transparent_60%)]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(100,50,150,0.3),transparent_50%)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    </div>
  );

  const NavItem = ({ tab, label, icon: Icon }: { tab: Tab, label: string, icon: any }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
      }}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300
        ${activeTab === tab 
          ? 'bg-white/20 text-white shadow-lg backdrop-blur-md border border-white/20' 
          : 'text-white/60 hover:text-white hover:bg-white/5'}
      `}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-purple-500/30">
      <Background />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/10 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Tv size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Furbo Vacano</h1>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Premium Access</p>
                </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex bg-black/20 rounded-full p-1 border border-white/10">
                <NavItem tab={Tab.GUIDE} label="Guía y Apps" icon={Download} />
                <NavItem tab={Tab.CODES} label="Códigos" icon={Key} />
                <NavItem tab={Tab.WEB} label="Web Directa" icon={Globe} />
            </nav>

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden p-2 text-white/80 hover:bg-white/10 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden fixed inset-x-0 top-[73px] z-40 bg-black/90 backdrop-blur-2xl border-b border-white/10 p-4 flex flex-col gap-2 shadow-2xl"
          >
             <NavItem tab={Tab.GUIDE} label="Guía y Apps" icon={Download} />
             <NavItem tab={Tab.CODES} label="Códigos MyLinkPaste" icon={Key} />
             <NavItem tab={Tab.WEB} label="Canales Web" icon={Globe} />
          </motion.div>
      )}

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12 pb-24">
        
        {activeTab === Tab.GUIDE && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                    Centro de Recursos
                </h2>
                <p className="text-white/60 max-w-md mx-auto">
                    Todas las herramientas, APKs y configuraciones necesarias en un solo lugar.
                </p>
            </div>

            <CollapsibleGuide 
                title="¿Nuevo aquí? Empieza por leer esto"
                defaultOpen={true}
                steps={[
                    {
                        title: "Descarga las Apps",
                        description: "Usa el botón 'Pack Principal' de abajo. Te llevará a Google Drive. Descarga e instala las aplicaciones (APKs) en tu dispositivo (Android Móvil o TV Box/FireStick)."
                    },
                    {
                        title: "Permisos de Android",
                        description: "Si es la primera vez que instalas algo fuera de la Play Store, tu dispositivo pedirá permiso para 'Instalar apps desconocidas'. Debes darle 'Permitir'."
                    },
                    {
                        title: "¿Qué App uso?",
                        description: "Recomendamos 'Magma Player' para listas estables o 'Cricfy' para deportes rápidos. Mira sus secciones abajo para instrucciones específicas."
                    }
                ]}
            />

            {/* Main Download */}
            <GlassCard className="!bg-blue-600/10 !border-blue-400/30">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-blue-100 flex items-center gap-2">
                        <Download size={20} /> Pack Principal
                    </h3>
                </div>
                <LinkButton item={MAIN_DOWNLOAD_LINK} primary />
            </GlassCard>

            {/* Magma Section */}
            <MagmaCard />

            {/* VPN Section */}
            <GlassCard delay={0.1}>
                <div className="flex items-center gap-2 mb-4 text-white/80">
                    <Shield size={20} className="text-emerald-400" />
                    <h3 className="text-lg font-semibold">¿Problemas de conexión?</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                    Algunas operadoras bloquean el acceso al fútbol. Si no te carga el contenido, activa una VPN.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    {VPN_TOOLS.map((item) => (
                        <LinkButton key={item.title} item={item} />
                    ))}
                </div>
            </GlassCard>

             {/* Apps Grid */}
            <GlassCard delay={0.2}>
                <div className="flex items-center gap-2 mb-4 text-white/80">
                    <Radio size={20} className="text-purple-400" />
                    <h3 className="text-lg font-semibold">Aplicaciones Específicas</h3>
                </div>
                <div className="grid gap-3">
                    {STREAMING_APPS.map((item) => (
                        <LinkButton key={item.title} item={item} />
                    ))}
                </div>
            </GlassCard>

             {/* Acestream Links */}
             <GlassCard delay={0.3}>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Enlaces P2P (Acestream)</h3>
                    <p className="text-sm text-white/50">Enlaces de respaldo de alta calidad. Requiere App Acestream.</p>
                </div>
                <div className="space-y-3">
                    {ACESTREAM_LISTS.map((item) => (
                        <LinkButton key={item.title} item={item} />
                    ))}
                </div>
            </GlassCard>
          </div>
        )}

        {activeTab === Tab.CODES && (
          <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">MyLinkPaste</h2>
                <p className="text-white/60">Códigos de listas actualizados diariamente</p>
            </div>

            <CollapsibleGuide 
                title="Cómo usar estos códigos"
                icon="info"
                steps={[
                    {
                        title: "Instalar requisitos",
                        description: "Necesitas tener instaladas DOS aplicaciones: 'Acestream' (motor de video) y 'MyLinkPaste' (gestor de enlaces)."
                    },
                    {
                        title: "Configurar",
                        description: "Abre Acestream una vez y acepta los permisos. Luego déjalo cerrado."
                    },
                    {
                        title: "Añadir código",
                        description: (
                            <span>
                                Abre <b>MyLinkPaste</b>. Busca el botón <b>+</b> o "Add New". 
                                Copia uno de los códigos de abajo (ej: <code>695d...</code>), pégalo y dale a "Open".
                            </span>
                        )
                    }
                ]}
            />

            <GlassCard>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 flex gap-3 items-start">
                   <div className="p-1 bg-amber-500/20 rounded-full mt-0.5">
                       <span className="block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                   </div>
                   <p className="text-sm text-amber-200/80 leading-relaxed">
                       <strong>Estado:</strong> Los códigos pueden cambiar. Si uno no funciona, prueba el siguiente.
                   </p>
                </div>
                <PasteGrid />
            </GlassCard>
          </div>
        )}

        {activeTab === Tab.WEB && (
          <div className="space-y-6">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Web Directa</h2>
                <p className="text-white/60">Streaming directo en navegador sin instalar apps</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 text-sm text-center text-white/70">
                ⚠️ Estas webs suelen tener mucha publicidad. Usa un navegador como <b>Brave</b> o instala un bloqueador de anuncios.
            </div>
            
            <div className="grid gap-4">
                {WEB_CHANNELS.map((channel, index) => (
                    <GlassCard 
                        key={channel.name} 
                        delay={index * 0.1}
                    >
                        <div className="flex flex-col gap-8 md:gap-4 md:flex-row md:items-center justify-between relative z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/80 shrink-0">
                                    <Globe size={24} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-lg truncate">{channel.name}</h3>
                                    {channel.accessCode && (
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                            <span className="text-xs text-white/50 uppercase">Acceso:</span>
                                            <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-blue-300">{channel.accessCode}</code>
                                            <CopyButton textToCopy={channel.accessCode} className="scale-75 -ml-1" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <a 
                                href={channel.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:scale-105 active:scale-95 transition-all text-center w-full md:w-auto shadow-lg shadow-white/10 shrink-0"
                            >
                                Ver Ahora
                            </a>
                        </div>
                    </GlassCard>
                ))}
            </div>
          </div>
        )}

      </main>

      <footer className="border-t border-white/5 py-8 text-center text-white/30 text-sm">
        <p>Designed by Tomypollas</p>
      </footer>
    </div>
  );
};

export default App;