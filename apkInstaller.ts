import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";

export interface DownloadProgress {
  downloadedMB: string;
  totalMB: string;
  percentage: number;
}

export const installApk = async (
  url: string,
  title: string,
  onProgress: (info: DownloadProgress) => void,
) => {
  try {
    // Limpiamos el nombre del archivo para evitar caracteres raros
    const fileName = title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".apk";
    const path = fileName;

    console.log("--- INICIANDO DESCARGA BINARIA SEGURA ---", url);
    const response = await fetch(url);

    if (!response.body) throw new Error("Cuerpo de respuesta vacío");
    if (!response.ok) throw new Error(`Error servidor: ${response.status}`);

    const contentLength = response.headers.get("Content-Length");
    const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;
    const totalMBString =
      totalBytes > 0 ? (totalBytes / (1024 * 1024)).toFixed(1) : "?";

    // 1. CREAR ARCHIVO VACÍO
    await Filesystem.writeFile({
      path: path,
      data: "",
      directory: Directory.Cache,
      encoding: Encoding.UTF8, // UTF8 está bien para crear un archivo vacío
    });

    const reader = response.body.getReader();

    // --- BÚFER BINARIO ---
    let chunks: Uint8Array[] = [];
    let currentBufferSize = 0;
    let totalReceivedBytes = 0;
    const BUFFER_LIMIT = 1024 * 1024; // 1 MB

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      // Acumulamos el trozo binario tal cual llega
      chunks.push(value);
      currentBufferSize += value.length;
      totalReceivedBytes += value.length;

      // SOLO escribimos si superamos el límite
      if (currentBufferSize >= BUFFER_LIMIT) {
        await processAndWriteChunks(path, chunks, currentBufferSize);
        // Reiniciamos el búfer
        chunks = [];
        currentBufferSize = 0;
      }

      // Cálculos para la barra de progreso
      const downloadedMB = (totalReceivedBytes / (1024 * 1024)).toFixed(1);
      let percentage = -1;
      if (totalBytes > 0)
        percentage = Math.round((totalReceivedBytes / totalBytes) * 100);

      onProgress({
        downloadedMB: downloadedMB,
        totalMB: totalMBString,
        percentage: percentage,
      });
    }

    // 2. ESCRIBIR LO QUE QUEDE EN EL BÚFER (Últimos KBs)
    if (chunks.length > 0) {
      await processAndWriteChunks(path, chunks, currentBufferSize);
    }

    console.log("--- DESCARGA FINALIZADA, ABRIENDO ---");

    const uriResult = await Filesystem.getUri({
      path: path,
      directory: Directory.Cache,
    });

    await FileOpener.open({
      filePath: uriResult.uri,
      contentType: "application/vnd.android.package-archive",
    });

    return true;
  } catch (error: any) {
    console.error("ERROR CRÍTICO:", error);
    const msg = error.message || JSON.stringify(error);
    alert("Error al descargar: " + msg);
    return false;
  }
};

// --- FUNCIÓN AUXILIAR PARA ESCRIBIR ---
async function processAndWriteChunks(
  path: string,
  chunks: Uint8Array[],
  totalSize: number,
) {
  // 1. Unimos todos los trocitos en un solo array binario
  const combinedBuffer = new Uint8Array(totalSize);
  let offset = 0;
  for (const chunk of chunks) {
    combinedBuffer.set(chunk, offset);
    offset += chunk.length;
  }

  // 2. Convertimos a Base64 válido
  const base64Data = u8ToBase64(combinedBuffer);

  // 3. Escribimos (SIN encoding, para que Capacitor entienda que es binario/base64)
  await Filesystem.appendFile({
    path: path,
    data: base64Data,
    directory: Directory.Cache,
    // ¡IMPORTANTE! No poner 'encoding' aquí.
  });
}

// Conversor rápido Binario -> Base64
function u8ToBase64(bytes: Uint8Array): string {
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
