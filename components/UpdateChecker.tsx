import React, { useEffect, useState } from "react";
import { App } from "@capacitor/app";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { Download, X } from "lucide-react";
import { GlassCard } from "./GlassCard";

// CAMBIA ESTO POR LA URL DE TU JSON EN GITHUB/VERCEL
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
    try {
      // 1. Obtener versión actual de la App
      const appInfo = await App.getInfo();
      const currentVersion = appInfo.version; // Ej: "1.0.0"

      // 2. Consultar versión en la nube
      const response = await fetch(VERSION_JSON_URL);
      const data = await response.json();

      // 3. Comparar versiones (Lógica simple)
      if (isNewerVersion(currentVersion, data.version)) {
        setUpdateAvailable(data);
      }
    } catch (error) {
      console.error("Error buscando actualizaciones:", error);
    }
  };

  // Función auxiliar para comparar "1.0.0" vs "1.0.1"
  const isNewerVersion = (oldVer: string, newVer: string) => {
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

    try {
      // 1. Descargar el APK como Blob
      const response = await fetch(updateAvailable.downloadUrl);
      const blob = await response.blob();

      // Simulación de progreso (fetch no da progreso fácil en JS nativo)
      setProgress(50);

      // 2. Convertir a Base64 para guardar
      const base64Data = (await blobToBase64(blob)) as string;
      const fileName = "update.apk";

      // 3. Guardar en el dispositivo
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Cache, // Usamos caché para no ensuciar
      });

      setProgress(100);

      // 4. Abrir el instalador
      await FileOpener.open({
        filePath: savedFile.uri,
        contentType: "application/vnd.android.package-archive",
      });

      setDownloading(false);
    } catch (error) {
      console.error("Error actualizando:", error);
      alert("Error en la descarga. Inténtalo de nuevo.");
      setDownloading(false);
    }
  };

  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <GlassCard className="max-w-sm w-full !bg-slate-900/90 border border-purple-500/30">
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
            <Download size={24} />
          </div>

          <h3 className="text-xl font-bold text-white">
            ¡Nueva Actualización!
          </h3>

          <div className="bg-white/5 p-3 rounded-lg text-left">
            <p className="text-sm text-white/60">
              Versión actual: <span className="text-red-400">Old</span>
            </p>
            <p className="text-sm text-white/90 font-bold">
              Nueva versión:{" "}
              <span className="text-green-400">{updateAvailable.version}</span>
            </p>
            <p className="text-xs text-white/50 mt-2 border-t border-white/10 pt-2">
              {updateAvailable.releaseNotes}
            </p>
          </div>

          {downloading ? (
            <div className="space-y-2">
              <p className="text-sm text-purple-300 animate-pulse">
                Descargando e instalando...
              </p>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setUpdateAvailable(null)}
                className="flex-1 py-2 rounded-lg text-white/60 hover:bg-white/10 text-sm font-medium"
              >
                Después
              </button>
              <button
                onClick={downloadAndInstall}
                className="flex-1 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold shadow-lg shadow-purple-500/20"
              >
                Actualizar
              </button>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default UpdateChecker;
