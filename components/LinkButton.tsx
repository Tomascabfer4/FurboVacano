import React, { useState } from "react";
import { LinkItem } from "../types";
import { ExternalLink, Loader2, Download, Globe } from "lucide-react";
import { installApk, DownloadProgress } from "../apkInstaller";
import { Capacitor } from "@capacitor/core";
// YA NO IMPORTAMOS AppLauncher AQUÍ

interface LinkButtonProps {
  item: LinkItem;
  primary?: boolean;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  item,
  primary = false,
}) => {
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState<DownloadProgress>({
    downloadedMB: "0.0",
    totalMB: "?",
    percentage: 0,
  });

  const Icon = item.icon || ExternalLink;
  const isNative = Capacitor.isNativePlatform();

  // Función auxiliar para lanzar app (promesa)
  const launchApp = (packageName: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const launcher = (window as any).plugins?.launcher;
      if (!launcher) {
        reject("Plugin no disponible");
        return;
      }

      launcher.launch(
        { packageName: packageName },
        () => resolve(true), // Éxito: Se abrió
        () => reject(false), // Error: No instalada
      );
    });
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // --- FASE 1: INTENTAR ABRIR SI YA LA TIENES ---
    if (isNative && item.packageName) {
      try {
        console.log("Intentando abrir:", item.packageName);
        // Intentamos lanzar la app
        await launchApp(item.packageName);
        // Si no dio error, es que se abrió. ¡Terminamos!
        return;
      } catch (err) {
        // Si cae aquí, es que NO la tienes instalada.
        console.log("App no instalada, descargando...");
        // Dejamos que el código siga hacia abajo para descargarla
      }
    }

    // --- FASE 2: DESCARGAR O NAVEGAR ---

    // CASO A: Descarga de APK
    if (item.url.endsWith(".apk") && isNative) {
      if (loading) return;
      setLoading(true);
      setProgress({ downloadedMB: "0.0", totalMB: "?", percentage: 0 });

      setTimeout(async () => {
        await installApk(item.url, item.title, (info) => setProgress(info));
        setLoading(false);
      }, 100);
      return;
    }

    // CASO B: Navegador Interno
    if (item.url.startsWith("http") || item.url.startsWith("https")) {
      if (isNative) {
        const cordova = (window as any).cordova;

        if (cordova && cordova.InAppBrowser) {
          const options =
            "location=yes,toolbar=yes,hardwareback=yes,zoom=no,beforeload=yes," +
            "toolbarcolor=#0f172a,navigationbuttoncolor=#ffffff,closebuttoncolor=#ffffff,hideurlbar=yes";

          const browser = cordova.InAppBrowser.open(
            item.url,
            "_blank",
            options,
          );

          browser.addEventListener(
            "beforeload",
            (params: any, callback: any) => {
              const url = params.url;
              if (url.startsWith("acestream://") || url.startsWith("magnet:")) {
                window.open(url, "_system");
              } else {
                if (callback) callback(url);
              }
            },
          );
        } else {
          window.open(item.url, "_system");
        }
      } else {
        window.open(item.url, "_blank");
      }
      return;
    }

    // CASO C: Otros
    if (isNative) {
      window.location.href = item.url;
    }
  };

  // --- VISUAL (Igual) ---
  const { downloadedMB, totalMB, percentage } = progress;
  let mainText = item.title;
  let subText = isNative ? item.description : "Click para abrir";

  if (loading) {
    let finalTotalString = totalMB;
    if (finalTotalString === "?" && item.size)
      finalTotalString = item.size.replace(" MB", "");

    if (finalTotalString !== "?") {
      mainText =
        percentage > 0 ? `Descargando ${percentage}%` : "Descargando...";
      subText = `${downloadedMB} MB / ${finalTotalString} MB`;
    } else {
      mainText = "Descargando...";
      subText = `${downloadedMB} MB recibidos`;
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`
        cursor-pointer
        relative group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 overflow-hidden
        ${
          primary
            ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/20"
            : "bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10"
        }
        ${item.color ? `bg-gradient-to-r ${item.color} border-none` : ""}
      `}
    >
      {loading && percentage > 0 && (
        <div
          className="absolute inset-0 bg-white/20 transition-all duration-300 ease-out z-0"
          style={{ width: `${percentage}%` }}
        />
      )}
      {loading && percentage <= 0 && (
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMjBMMjAgMEgwTDIwIDIwIiBmaWxsPSIjZmZmZiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwKSIvPjwvc3ZnPg==')] animate-progress-stripes" />
      )}

      <div
        className={`relative z-10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${primary ? "bg-white/20" : "bg-white/10"}`}
      >
        {loading ? <Loader2 className="animate-spin" /> : <Icon size={24} />}
      </div>

      <div className="relative z-10 flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate pr-2">{mainText}</h3>
        {subText && (
          <p className="text-sm text-white/60 truncate font-mono">{subText}</p>
        )}
      </div>

      {!loading && (
        <ExternalLink
          size={18}
          className="relative z-10 text-white/40 group-hover:text-white transition-colors"
        />
      )}
    </div>
  );
};
