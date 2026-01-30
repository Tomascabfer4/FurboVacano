# ⚽ Furbo Vacano - TV Box Edition

![Banner](android/app/src/main/res/drawable/banner.png)

> **El centro multimedia definitivo para Android TV y TV Box.** > Fútbol, Deportes y Herramientas en un solo lugar. Optimizado para mando a distancia.

![Android](https://img.shields.io/badge/Platform-Android_TV-green?style=for-the-badge&logo=android)
![React](https://img.shields.io/badge/Built_with-React-blue?style=for-the-badge&logo=react)
![Capacitor](https://img.shields.io/badge/Powered_by-Capacitor-sky?style=for-the-badge&logo=capacitor)

---

## 📺 ¿Qué es Furbo Vacano?

**Furbo Vacano** es una aplicación nativa para Android TV diseñada para simplificar el acceso a contenido deportivo. Olvídate de navegar por webs llenas de publicidad en tu televisor o de buscar APKs imposibles.

Esta app actúa como un **Lanzador Inteligente**: detecta las herramientas que necesitas (reproductores, AceStream, VPNs), las abre si las tienes, o te ayuda a descargarlas si te faltan.

## ✨ Características Principales

* **🎮 Optimizado para TV:** Interfaz navegable 100% con mando a distancia (D-Pad).
* **🧠 Smart App Detection:** * ¿Tienes *Acestream* instalado? → Lo abre automáticamente.
    * ¿No lo tienes? → Inicia la descarga e instalación.
* **🌐 Navegador Integrado "Anti-Frustración":**
    * Navegación web dentro de la app sin salir a Chrome.
    * **Interceptor de Enlaces:** Detecta automáticamente enlaces `acestream://` o `magnet:` y lanza la app externa sin errores.
    * Modo Oscuro y UI limpia.
* **📥 Instalador de APKs:** Descarga e instala aplicaciones directamente desde la App con barra de progreso.
* **🎨 Diseño Adaptativo:** * Iconos y Banners nativos para Android TV.
    * Splash Screen horizontal.

## 📸 Capturas de Pantalla

| Menú Principal | Navegador Integrado | Instalador APK |
|:---:|:---:|:---:|
| <img src="screenshots/MenuPrincipal.png" width="300" /> | <img src="screenshots/NavegadorPropio.png" width="300" /> | <img src="screenshots/DescargaAutomatica.png" width="300" /> |

*(Sube tus capturas a la carpeta `screenshots/` y actualiza estos enlaces)*

## 🚀 Instalación (Para Usuarios)

1.  Ve a la sección **[Releases](https://github.com/TU_USUARIO/FurboVacano/releases)** de este repositorio.
2.  Descarga el último archivo `.apk` (ej: `FurboVacano_v1.0.apk`).
3.  Pásalo a tu TV Box (vía USB o usando la app "Send Files to TV").
4.  Instala el APK y ¡a disfrutar!

> **Nota:** Necesitas aceptar la instalación de "Orígenes desconocidos" en tu dispositivo.

## 🛠️ Desarrollo (Para Programadores)

Si quieres compilar la app tú mismo o contribuir:

### Requisitos
* Node.js 18+
* Android Studio (con SDK de Android configurado)

### Pasos
1.  Clonar el repositorio:
    ```bash
    git clone [https://github.com/TU_USUARIO/FurboVacano.git](https://github.com/TU_USUARIO/FurboVacano.git)
    cd FurboVacano
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Sincronizar con Capacitor:
    ```bash
    npm run build
    npx cap sync
    ```
4.  Abrir en Android Studio y compilar:
    ```bash
    npx cap open android
    ```

## 🧱 Tecnologías Usadas

* **Frontend:** React + Vite + Tailwind CSS
* **Core:** Capacitor 6
* **Plugins Clave:**
    * `cordova-plugin-inappbrowser`: Para la navegación web controlada.
    * `cordova-plugin-app-launcher`: Para detectar y abrir apps externas.
    * `capacitor-community/file-opener`: Para instalar APKs.

## ⚠️ Aviso Legal (Disclaimer)

Esta aplicación es un **gestor de enlaces y herramientas**. 
* **No aloja** ningún contenido protegido por derechos de autor en sus servidores.
* **No distribuye** señales de vídeo propias.
* Todos los enlaces son externos y responsabilidad de sus creadores.
* El usuario es responsable del uso que haga de las herramientas proporcionadas.

---
Hecho con ⚽ y ❤️ por Tomás Cabello Fernández
