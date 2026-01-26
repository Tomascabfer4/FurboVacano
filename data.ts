import { LinkItem, PasteCode, WebChannel, MagmaConfig } from "./types";
// Importamos los iconos necesarios para que se vean bien visualmente
import {
  Download,
  Smartphone,
  Tv,
  Zap,
  Link as LinkIcon,
  Play,
  Shield,
  Globe,
} from "lucide-react";

export const MAIN_DOWNLOAD_LINK: LinkItem = {
  title: "Carpeta de Descargas (Drive)",
  url: "https://drive.google.com/drive/folders/1eZTpKjQMp2XO2eryD-Un1gjRM3crBcMo?usp=drive_link",
  description: "Respaldo de todas las aplicaciones.",
  icon: Download, // Icono importado
};

export const VPN_TOOLS: LinkItem[] = [
  {
    title: "ProtonVPN",
    url: "https://protonvpn.com/es-es/download",
    description: "Opción A: Evitar restricciones geográficas",
    icon: Shield,
  },
  {
    title: "Cloudflare DNS (1.1.1.1)",
    url: "https://one.one.one.one/",
    description: "Opción B: Mejorar conectividad y privacidad",
    icon: Shield,
  },
  {
    title: "Hotspot Shield VPN",
    url: "https://www.hotspotshield.com/vpn/",
    description: "Opción C: VPN rápida con encriptación militar",
    icon: Shield,
  },
  {
    title: "Psiphon",
    url: "https://psiphon.ca/es/download-store.html",
    description: "Opción D: VPN gratuita para evadir censura",
    icon: Shield,
  },
];

export const MAGMA_DATA: MagmaConfig = {
  server: "tv.m3uts.xyz",
  user: "m",
  pass: "m",
  downloaderCode: "4042816",
};

// --- AQUÍ ESTÁ LA ACTUALIZACIÓN CON TUS ENLACES DE GITHUB ---
export const STREAMING_APPS: LinkItem[] = [
  {
    title: "Magma Player",
    description: "El reproductor más estable. Recomendado para listas M3U.",
    icon: Play,
    url: "https://github.com/Tomascabfer4/FurboVacano/releases/download/apps-tools/Magma_v10.apk",
    color: "from-orange-500 to-red-600",
    size: "19.5",
  },
  {
    title: "FCTV (Móvil)",
    description: "Fútbol en directo optimizado para pantallas táctiles.",
    icon: Smartphone,
    url: "https://github.com/Tomascabfer4/FurboVacano/releases/download/apps-tools/com.fctv77.app-release-314-v3.0.314.apk",
    color: "from-blue-500 to-blue-700",
    size: "18.8",
  },
  {
    title: "FCTV (TV Box/FireStick)",
    description: "Versión especial para mando a distancia.",
    icon: Tv,
    url: "https://github.com/Tomascabfer4/FurboVacano/releases/download/apps-tools/com.fctv77.tv-release-314-v3.0.314.apk",
    color: "from-indigo-500 to-purple-700",
    size: "18.8",
  },
  {
    title: "90 Minutos",
    description: "Alternativa ligera y rápida.",
    icon: Zap,
    url: "https://github.com/Tomascabfer4/FurboVacano/releases/download/apps-tools/90Minutos.apk",
    color: "from-green-500 to-emerald-700",
    size: "30.4",
  },
  {
    title: "Zona Deportiva Plus",
    description: "Eventos deportivos variados.",
    icon: Zap,
    url: "https://github.com/Tomascabfer4/FurboVacano/releases/download/apps-tools/Zonadeportivaplus.apk",
    color: "from-red-500 to-pink-700",
    size: "15.9",
  },
  {
    title: "Info Deportes TV",
    description: "Noticias y resultados en tu TV Box.",
    icon: Tv,
    url: "https://github.com/Tomascabfer4/FurboVacano/releases/download/apps-tools/InfoDeportestvbox.apk",
    color: "from-yellow-500 to-amber-700",
    size: "20.4",
  },
  {
    title: "MyLinkPaste",
    description: "Gestor de enlaces necesario para los códigos.",
    icon: LinkIcon,
    url: "https://github.com/Tomascabfer4/FurboVacano/releases/download/apps-tools/MylinkPaste-v4.3.apk",
    color: "from-gray-500 to-gray-700",
    size: "5.46",
  },
  // --- NUEVOS ACESTREAM DARK MOD ---
  {
    title: "Acestream Dark (Universal)",
    description:
      "Versión MOD sin anuncios. Funciona en casi todos los dispositivos (ARM7).",
    icon: Play,
    url: "https://archive.org/download/ace-stream-mc-klaus-appss-dark-mod-arm-7/Ace%20Stream%20%40McKlaus_Appss%20Dark%20MOD%20Arm7.apk",
    color: "from-emerald-600 to-teal-800",
    size: "110",
  },
  {
    title: "Acestream Dark (Potente)",
    description: "Optimizado para móviles modernos de 64 bits (ARM8).",
    icon: Play,
    url: "https://archive.org/download/ace-stream-mc-klaus-appss-dark-mod-arm-8/Ace%20Stream%20%40McKlaus_Appss%20Dark%20MOD%20Arm8.apk",
    color: "from-emerald-600 to-teal-800",
    size: "118",
  },
];

export const ACESTREAM_LISTS: LinkItem[] = [
  {
    title: "Lista 1 (IPFS)",
    url: "https://ipfs.io/ipns/k51qzi5uqu5di462t7j4vu4akwfhvtjhy88qbupktvoacqfqe9uforjvhyi4wr/",
    icon: Play,
  },
  {
    title: "Lista 2 (DWeb)",
    url: "https://k51qzi5uqu5di462t7j4vu4akwfhvtjhy88qbupktvoacqfqe9uforjvhyi4wr.ipns.dweb.link/",
    icon: Play,
  },
  {
    title: "Lista 3 (W3S)",
    url: "https://w3s.link/ipns/k51qzi5uqu5di462t7j4vu4akwfhvtjhy88qbupktvoacqfqe9uforjvhyi4wr/",
    icon: Play,
  },
];

export const MY_LINK_PASTE_CODES: PasteCode[] = [
  { name: "Tokyo", code: "695d5309d05ee80b5cd7efad" },
  { name: "Elcano", code: "681fc74c1833d17ffd9a9c59" },
  { name: "Mamandurrias", code: "682cb7103451b27a40bc9aa2" },
  { name: "Shickat", code: "68769ab93451b27a40bc9f6b" },
  { name: "Nanobox", code: "68ce6e8c3451b27a40bca302" },
  { name: "Nanostreams", code: "68a975d43451b27a40bca0b3" },
  { name: "Euphorbia H.", code: "693d4f7c0f2a412c815036ce" },
  { name: "Euphorbia X", code: "69442bead05ee80b5cd7ea08" },
  { name: "Matteo", code: "68b1dfe33451b27a40bca11d" },
  { name: "Icastresana", code: "69618ec6d05ee80b5cd7f636" },
];

export const WEB_CHANNELS: WebChannel[] = [
  {
    name: "Andres Deportes TV",
    url: "https://delta.andresconv.online/",
    accessCode: "123601",
  },
  {
    name: "Flipax (Agenda)",
    url: "https://foknaretre.foroactivo.com/h1-agenda",
  },
  {
    name: "Canale TV",
    url: "https://rds.live/canale-tv-gratis/",
    description:
      "Ve a la barra derecha → selecciona 'Sport'. Los canales PrimaSport (5 en total) suelen tener los partidos principales.",
  },
  { name: "Futbol Libre", url: "https://librefutboltv.su/home/" },
  { name: "FCTV33", url: "https://www.fctv33.lol/es" },
  { name: "LIVETV", url: "https://m.livetv.sx/enx/" },
  {
    name: "BATMANSTREAM",
    url: "https://batmanstream.vip/",
    description:
      "Usar VPN, Abrir pestaña del partido q se desea ver y pulsar uno de los enlaces Flash. El enlace se abrirá en una nueva ventana.",
  },
];

export const CONTACT_SPORTS_CHANNELS: WebChannel[] = [
  {
    name: "Goluchitas",
    url: "https://goluchitas.com/",
    description: "Usar VPN. Recargar o cambiar de enlace si va sobrecargado",
  },
];
