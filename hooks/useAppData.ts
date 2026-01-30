import { useState, useEffect } from 'react';
import { 
  STREAMING_APPS, 
  VPN_TOOLS, 
  ACESTREAM_LISTS,
  WEB_CHANNELS, 
  CONTACT_SPORTS_CHANNELS 
} from '../data';

// 🔴🔴🔴 PEGA AQUÍ TU URL RAW DE GITHUB (la del Paso 1) 🔴🔴🔴
const JSON_URL = "https://raw.githubusercontent.com/TU_USUARIO/TU_REPO/main/furbo-data.json";

export const useAppData = () => {
  // Inicializamos con los datos locales (Offline First)
  const [streamingApps, setStreamingApps] = useState(STREAMING_APPS);
  const [acestreamLists, setAcestreamLists] = useState(ACESTREAM_LISTS);
  const [vpnTools, setVpnTools] = useState(VPN_TOOLS);
  const [webChannels, setWebChannels] = useState(WEB_CHANNELS);
  const [contactSports, setContactSports] = useState(CONTACT_SPORTS_CHANNELS);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔄 Buscando configuración remota...");
        // Añadimos timestamp para evitar que la caché nos engañe
        const response = await fetch(`${JSON_URL}?t=${Date.now()}`);
        
        if (!response.ok) throw new Error("Error al conectar con GitHub");
        
        const data = await response.json();
        
        // Actualizamos solo si hay datos nuevos
        if(data.streamingApps) setStreamingApps(data.streamingApps);
        if(data.acestreamLists) setAcestreamLists(data.acestreamLists);
        if(data.vpnTools) setVpnTools(data.vpnTools);
        if(data.webChannels) setWebChannels(data.webChannels);
        if(data.contactSports) setContactSports(data.contactSports);
        
        console.log("✅ Datos actualizados desde la Nube");
      } catch (error) {
        console.log("⚠️ Usando datos locales (Offline/Error)");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { 
    streamingApps, 
    acestreamLists, 
    vpnTools, 
    webChannels, 
    contactSports, 
    loading 
  };
};