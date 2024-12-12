import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SettingsState {
  offlineMode: boolean;
  autoSync: boolean;
  syncFrequency: 'realtime' | '15min' | 'hourly' | 'daily';
  storageLocation: 'local' | 'drive';
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  autoExport: 'off' | 'daily' | 'weekly' | 'monthly';
  exportToDrive: boolean;
  encryption: boolean;
  exportAuth: boolean;
}

interface SettingsStore extends SettingsState {
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: SettingsState = {
  offlineMode: false,
  autoSync: true,
  syncFrequency: 'realtime',
  storageLocation: 'local',
  autoBackup: false,
  backupFrequency: 'daily',
  autoExport: 'off',
  exportToDrive: false,
  encryption: false,
  exportAuth: false,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      updateSetting: (key, value) => 
        set((state) => ({ ...state, [key]: value })),
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'settings-storage',
    }
  )
);