import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.furbovacano.app", // Tu ID
  appName: "Furbo Vacano",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
