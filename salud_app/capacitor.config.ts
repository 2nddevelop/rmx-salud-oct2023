import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.salud',
  appName: 'Salud',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
