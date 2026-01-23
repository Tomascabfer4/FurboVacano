import { LinkItem, PasteCode, WebChannel, MagmaConfig } from "./types";

export const MAIN_DOWNLOAD_LINK: LinkItem = {
  title: "Carpeta de Descargas (Drive)",
  url: "https://drive.google.com/drive/folders/1eZTpKjQMp2XO2eryD-Un1gjRM3crBcMo?usp=drive_link",
  description:
    "Todas las aplicaciones mencionadas (90Minutos, FCTV, Magma, etc.)",
  icon: "download",
};

export const VPN_TOOLS: LinkItem[] = [
  {
    title: "ProtonVPN",
    url: "https://protonvpn.com/es-es/download",
    description: "Opción A: Evitar restricciones geográficas",
    icon: "shield",
  },
  {
    title: "Cloudflare DNS (1.1.1.1)",
    url: "https://one.one.one.one/",
    description: "Opción B: Mejorar conectividad y privacidad",
    icon: "shield",
  },
  {
    title: "Hotspot Shield VPN",
    url: "https://www.hotspotshield.com/vpn/",
    description: "Opción C: VPN rápida con encriptación militar",
    icon: "shield",
  },
  {
    title: "Psiphon",
    url: "https://psiphon.ca/es/download-store.html",
    description: "Opción D: VPN gratuita para evadir censura",
    icon: "shield",
  },
];

export const MAGMA_DATA: MagmaConfig = {
  server: "tv.m3uts.xyz",
  user: "m",
  pass: "m",
  downloaderCode: "4042816",
};

export const STREAMING_APPS: LinkItem[] = [
  {
    title: "Cricfy TV (Móvil)",
    url: "https://cricfy.net/without-vpn-241/",
    icon: "download",
  },
  {
    title: "Cricfy TV (Android TV)",
    url: "https://cricfy.net/android-tv-151/#dl",
    icon: "download",
  },
  {
    title: "FCTV33 Oficial",
    url: "https://www.fctv33.lol/es",
    description: "Si falla, buscar 'FCTV33' en Google",
    icon: "link",
  },
  {
    title: "Descargar Acestream",
    url: "https://play.google.com/store/apps/details?id=org.acestream.node&hl=es",
    description: "Necesario para enlaces P2P y MyLinkPaste",
    icon: "play",
  },
];

export const ACESTREAM_LISTS: LinkItem[] = [
  {
    title: "Lista 1 (IPFS)",
    url: "https://ipfs.io/ipns/k51qzi5uqu5di462t7j4vu4akwfhvtjhy88qbupktvoacqfqe9uforjvhyi4wr/",
    icon: "play",
  },
  {
    title: "Lista 2 (DWeb)",
    url: "https://k51qzi5uqu5di462t7j4vu4akwfhvtjhy88qbupktvoacqfqe9uforjvhyi4wr.ipns.dweb.link/",
    icon: "play",
  },
  {
    title: "Lista 3 (W3S)",
    url: "https://w3s.link/ipns/k51qzi5uqu5di462t7j4vu4akwfhvtjhy88qbupktvoacqfqe9uforjvhyi4wr/",
    icon: "play",
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

// Deportes de Contacto (UFC, Boxeo, MMA, etc.)
export const CONTACT_SPORTS_CHANNELS: WebChannel[] = [
  {
    name: "Goluchitas",
    url: "https://goluchitas.com/",
    description: "Usar VPN. Recargar o cambiar de enlace si va sobrecargado",
  },
];
