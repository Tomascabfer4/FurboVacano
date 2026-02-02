import React, { useEffect, useState } from "react";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core"; 
import { Filesystem, Directory } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { Download } from "lucide-react";
import { GlassCard } from "./GlassCard";

// Tu URL de GitHub
const VERSION_JSON_URL =
  "https://raw.githubusercontent.com/Tomascabfer4/FurboVacano/refs/heads/main/version.json";

const UpdateChecker: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    checkForUpdate();
  }, []);

  const checkForUpdate = async () => {
    // 🛑 FILTRO DE SEGURIDAD
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    try {
      const appInfo = await App.getInfo();
      const currentVersion = appInfo.version;

      const response = await fetch(`${VERSION_JSON_URL}?t=${Date.now()}`);

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      if (isNewerVersion(currentVersion, data.version)) {
        setUpdateAvailable(data);
      }
    } catch (error) {
      console.error("Error buscando actualizaciones:", error);
    }
  };

  const isNewerVersion = (oldVer: string, newVer: string) => {
    if (!oldVer || !newVer) return false;

    const oldParts = oldVer.split(".").map(Number);
    const newParts = newVer.split(".").map(Number);

    for (let i = 0; i < 3; i++) {
      if (newParts[i] > oldParts[i]) return true;
      if (newParts[i] < oldParts[i]) return false;
    }
    return false;
  };

  const downloadAndInstall = async () => {
    if (!updateAvailable) return;
    setDownloading(true);
    setProgress(10); // Feedback inicial

    try {
      const fileName = "update.apk";

      // ⚠️ CAMBIO CRÍTICO: Usamos downloadFile
      // Esto descarga DIRECTAMENTE al disco, sin cargar los 32MB en la RAM.
      // Evita que el Fire TV cierre la app por falta de memoria.
      const result = await Filesystem.downloadFile({
        url: updateAvailable.downloadUrl,
        path: fileName,
        directory: Directory.Cache,
        // recursive: true // Opcional, por seguridad
      });

      // Como downloadFile no reporta progreso granular fácilmente sin listeners complejos,
      // saltamos al 50% y luego al 100% cuando termine.
      setProgress(50);

      if (!result || !result.path) {
        throw new Error("No se obtuvo la ruta del archivo descargado.");
      }

      setProgress(100);

      // Abrir el instalador
      await FileOpener.open({
        filePath: result.path,
        contentType: "application/vnd.android.package-archive",
      });

      setDownloading(false);
    } catch (error: any) {
      console.error("Error detallado:", error);
      alert("Error al actualizar: " + (error.message || "Fallo de conexión"));
      setDownloading(false);
    }
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <GlassCard className="max-w-sm w-full !bg-slate-900/95 border border-purple-500/30 shadow-2xl">
        <div className="text-center space-y-5">
          <div className="mx-auto w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 ring-2 ring-purple-500/20">
            <Download size={28} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              ¡Nueva Actualización!
            </h3>
            <p className="text-white/50 text-sm">
              Hay una nueva versión disponible
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl text-left border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/40 font-medium uppercase tracking-wider">
                Versión
              </span>
              <span className="text-sm font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-md">
                v{updateAvailable.version}
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {updateAvailable.releaseNotes}
            </p>
          </div>

          {downloading ? (
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-xs text-purple-300">
                <span>Descargando...</span>
                {/* Nota: El porcentaje puede saltar de 10 a 100, es normal con este método seguro */}
                <span>{progress > 10 && progress < 100 ? "..." : progress + "%"}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setUpdateAvailable(null)}
                className="flex-1 py-3 rounded-xl text-white/60 hover:bg-white/10 hover:text-white text-sm font-medium transition-colors"
              >
                Ahora no
              </button>
              <button
                onClick={downloadAndInstall}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold shadow-lg shadow-purple-500/25 active:scale-95 transition-all"
              >
                Instalar
              </button>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default UpdateChecker;