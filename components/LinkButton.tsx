import React, { useState } from "react";
import { LinkItem } from "../types";
import { ExternalLink, Loader2, Download } from "lucide-react";
import { installApk, DownloadProgress } from "../apkInstaller";
import { Capacitor } from "@capacitor/core";

interface LinkButtonProps {
  item: LinkItem;
  primary?: boolean;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  item,
  primary = false,
}) => {
  const [loading, setLoading] = useState(false);

  // Estado inicial
  const [progress, setProgress] = useState<DownloadProgress>({
    downloadedMB: "0.0",
    totalMB: "?",
    percentage: 0,
  });

  const Icon = item.icon || ExternalLink;
  const isNative = Capacitor.isNativePlatform();

  const handleClick = async (e: React.MouseEvent) => {
    if (item.url.endsWith(".apk") && isNative) {
      e.preventDefault();
      if (loading) return;

      setLoading(true);
      setProgress({ downloadedMB: "0.0", totalMB: "?", percentage: 0 });

      setTimeout(async () => {
        await installApk(item.url, item.title, (info) => setProgress(info));
        setLoading(false);
      }, 100);
    }
  };

  // --- LÓGICA DE TEXTO (LA PARTE QUE TE INTERESA) ---
  const { downloadedMB, totalMB, percentage } = progress;

  let mainText = item.title;
  let subText = isNative ? item.description : "Click para descargar";

  if (loading) {
    // 1. Intentamos obtener el TOTAL del servidor
    let finalTotalString = totalMB;

    // 2. Si el servidor no lo da ("?"), usamos el manual de data.ts (item.size)
    if (finalTotalString === "?" && item.size) {
      finalTotalString = item.size.replace(" MB", ""); // Quitamos " MB" si lo pusiste, para formatear igual
    }

    // 3. Decidimos qué mostrar
    if (finalTotalString !== "?") {
      // CASO A: TENEMOS EL TOTAL (Del servidor o manual)
      // Mostramos: "15.4 MB / 110.0 MB"
      mainText = "Descargando...";
      subText = `${downloadedMB} MB / ${finalTotalString} MB`;

      // Si tenemos porcentaje real del servidor, lo mostramos en el título
      if (percentage > 0) {
        mainText = `Descargando ${percentage}%`;
      }
    } else {
      // CASO B: NO TENEMOS NINGÚN TOTAL (Ni servidor ni manual)
      mainText = "Descargando...";
      subText = `${downloadedMB} MB recibidos`;
    }
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`
        relative group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 overflow-hidden
        ${
          primary
            ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/20"
            : "bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10"
        }
        ${item.color ? `bg-gradient-to-r ${item.color} border-none` : ""}
      `}
    >
      {/* 1. BARRA DE PROGRESO (Solo si el servidor nos da el % real) */}
      {loading && percentage > 0 && (
        <div
          className="absolute inset-0 bg-white/20 transition-all duration-300 ease-out z-0"
          style={{ width: `${percentage}%` }}
        />
      )}

      {/* 2. ANIMACIÓN RAYADA (Si estamos tirando de manual o no sabemos el %) */}
      {loading && percentage <= 0 && (
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMjBMMjAgMEgwTDIwIDIwIiBmaWxsPSIjZmZmZiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwKSIvPjwvc3ZnPg==')] animate-progress-stripes" />
      )}

      <div
        className={`
        relative z-10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110
        ${primary ? "bg-white/20" : "bg-white/10"}
      `}
      >
        {loading ? <Loader2 className="animate-spin" /> : <Icon size={24} />}
      </div>

      <div className="relative z-10 flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate pr-2">{mainText}</h3>
        {subText && (
          <p className="text-sm text-white/60 truncate font-mono">{subText}</p>
        )}
      </div>

      {!loading ? (
        <ExternalLink
          size={18}
          className="relative z-10 text-white/40 group-hover:text-white transition-colors"
        />
      ) : (
        <Download
          size={18}
          className="relative z-10 text-white animate-bounce"
        />
      )}
    </a>
  );
};
