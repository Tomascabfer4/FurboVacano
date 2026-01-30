import React, { useState } from "react";
import { LinkItem } from "../types";
import { ExternalLink, Loader2 } from "lucide-react";
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
        () => resolve(true),
        () => reject(false)
      );
    });
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = item.url;

    // --- FASE 1: APPS NATIVAS (Magma, FCTV, etc) ---
    if (isNative && item.packageName) {
      try {
        await launchApp(item.packageName);
        return;
      } catch (err) {
        console.log("App no instalada, procediendo a descarga/web...");
      }
    }

    // --- FASE 2: MANEJO DE ENLACES ---

    // 1. SI EL BOTÓN YA ES UN ENLACE ESPECIAL (Acestream directo)
    if (
      url.startsWith("acestream://") ||
      url.startsWith("magnet:") ||
      url.startsWith("intent:") ||
      url.startsWith("whatsapp:") ||
      url.startsWith("tg:")
    ) {
      const target = isNative ? "_system" : "_blank";
      window.open(url, target);
      return;
    }

    // 2. DESCARGA DE APK
    if (url.endsWith(".apk") && isNative) {
      if (loading) return;
      setLoading(true);
      setProgress({ downloadedMB: "0.0", totalMB: "?", percentage: 0 });

      setTimeout(async () => {
        await installApk(url, item.title, (info) => setProgress(info));
        setLoading(false);
      }, 100);
      return;
    }

    // 3. NAVEGADOR INTERNO (Aquí está la corrección para tu error)
    if (url.startsWith("http") || url.startsWith("https")) {
      if (isNative) {
        const cordova = (window as any).cordova;

        if (cordova && cordova.InAppBrowser) {
          const options =
            "location=yes,toolbar=yes,hardwareback=yes,zoom=no,beforeload=yes," +
            "toolbarcolor=#0f172a,navigationbuttoncolor=#ffffff,closebuttoncolor=#ffffff,hideurlbar=yes";

          const browser = cordova.InAppBrowser.open(url, "_blank", options);

          // 💉 LA VACUNA: INYECTAR SCRIPT AL CARGAR LA WEB
          // Esto evita que window.open abra ventanas nuevas y den error.
          browser.addEventListener("loadstop", () => {
            browser.executeScript({
              code: `
                // Sobrescribimos la función window.open
                window.open = function(url) {
                    // Forzamos que cargue en la MISMA ventana
                    window.location.href = url;
                };
              `,
            });
          });

          // 🛡️ EL INTERCEPTOR
          browser.addEventListener(
            "beforeload",
            (params: any, callback: any) => {
              const clickedUrl = params.url;

              // Detectamos protocolos externos
              if (
                clickedUrl.startsWith("acestream://") ||
                clickedUrl.startsWith("magnet:") ||
                clickedUrl.startsWith("intent:") ||
                clickedUrl.startsWith("whatsapp:") ||
                clickedUrl.startsWith("tg:")
              ) {
                // A) Abrimos en el sistema (App externa)
                window.open(clickedUrl, "_system");

                // B) IMPORTANTE: NO llamamos al callback.
                // Esto cancela la carga en el navegador interno y evita el error blanco.
              } else {
                // Si es navegación normal, permitimos que siga
                if (callback) callback(clickedUrl);
              }
            }
          );
        } else {
          // Fallback si no hay plugin
          window.open(url, "_system");
        }
      } else {
        // En PC
        window.open(url, "_blank");
      }
      return;
    }

    // Fallback final
    if (isNative) {
      window.location.href = url;
    } else {
      window.open(url, "_blank");
    }
  };

  // --- RENDERIZADO VISUAL ---
  const { downloadedMB, totalMB, percentage } = progress;
  let mainText = item.title;
  let subText = isNative ? item.description : "Click para abrir";

  if (loading) {
    let finalTotalString = totalMB;
    if (finalTotalString === "?" && item.size)
      finalTotalString = item.size.replace(" MB", "");

    if (finalTotalString !== "?") {
      mainText = percentage > 0 ? `Descargando ${percentage}%` : "Descargando...";
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