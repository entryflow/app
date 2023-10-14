import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'entryflow.app.io',
  appName: 'entryflow-app',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    CapacitorCookies: {
      enabled: true,
    }
  },
};

export default config;
