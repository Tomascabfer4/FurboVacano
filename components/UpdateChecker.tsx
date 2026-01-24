import React, { useEffect, useState } from "react";
import { App } from "@capacitor/app";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { Download } from "lucide-react";
import { GlassCard } from "./GlassCard";

// Tu URL (Asegúrate de que es correcta)
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
      // 1. Ver qué versión tiene la App
      const appInfo = await App.getInfo();
      const currentVersion = appInfo.version;

      // ALERTA 1: Para saber si el código arranca
      // alert(`CHEQUEANDO... \nMi versión es: ${currentVersion}`);

      // 2. Truco Anti-Caché: Añadimos ?t=tiempo para obligar a refrescar
      const response = await fetch(`${VERSION_JSON_URL}?t=${Date.now()}`);

      if (!response.ok) {
        alert("Error: No se pudo conectar con GitHub");
        return;
      }

      const data = await response.json();

      // ALERTA 2: Para saber qué lee de GitHub
      alert(`DIAGNÓSTICO:\nMi App: ${currentVersion}\nGitHub: ${data.version}`);

      // 3. Comparar
      if (isNewerVersion(currentVersion, data.version)) {
        setUpdateAvailable(data);
      } else {
        // ALERTA 3: Solo si quieres confirmar que no hay update
        // alert("No hay actualización necesaria.");
      }
    } catch (error: any) {
      alert("ERROR GRAVE: " + JSON.stringify(error));
    }
  };

  const isNewerVersion = (oldVer: string, newVer: string) => {
    // Si alguna versión viene vacía, salimos
    if (!oldVer || !newVer) return false;

    const oldParts = oldVer.split(".").map(Number);
    const newParts = newVer.split(".").map(Number);

    for (let i = 0; i < 3; i++) {
      if (newParts[i] > oldParts[i]) return true;
      if (newParts[i] < oldParts[i]) return false;
    }
    return false;
  };

  // ... (El resto de funciones downloadAndInstall y el return déjalos igual) ...
  // Para no pegar todo el bloque gigante, mantén tu parte de 'downloadAndInstall'
  // y el 'return' de abajo tal cual los tenías.

  const downloadAndInstall = async () => {
    if (!updateAvailable) return;
    setDownloading(true);

    try {
      // 1. Verificar si el enlace existe antes de descargar
      const response = await fetch(updateAvailable.downloadUrl);

      if (!response.ok) {
        throw new Error(`Error HTTP del Servidor: ${response.status}`);
      }

      // 2. Descargar
      const blob = await response.blob();

      // Protección: Si lo que baja es muy pequeño (ej: página de error 404 de GitHub), abortar
      if (blob.size < 1000) {
        throw new Error(
          "El archivo es demasiado pequeño. ¿Es el enlace correcto?",
        );
      }

      setProgress(50);

      // 3. Convertir y Guardar
      const base64Data = (await blobToBase64(blob)) as string;
      const fileName = "update.apk";

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Cache,
      });

      setProgress(100);

      // 4. Abrir instalador
      await FileOpener.open({
        filePath: savedFile.uri,
        contentType: "application/vnd.android.package-archive",
      });

      setDownloading(false);
    } catch (error: any) {
      console.error(error);
      // AQUÍ ESTÁ EL CAMBIO: Usamos .message en vez de stringify
      alert("Fallo: " + (error.message || JSON.stringify(error)));
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
