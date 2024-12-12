import { useSettingsStore } from '../../store/settingsStore';
import { Switch } from '../ui/Switch';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { SettingsRow } from './SettingsRow';

const SYNC_FREQUENCIES = [
  { value: 'realtime', label: 'Real-time' },
  { value: '15min', label: 'Every 15 min' },
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
] as const;

const STORAGE_LOCATIONS = [
  { value: 'local', label: 'Local only' },
  { value: 'drive', label: 'Google Drive' },
] as const;

export function DataManagement() {
  const { offlineMode, autoSync, syncFrequency, storageLocation, updateSetting } = useSettingsStore();

  return (
    <div className="space-y-6">
      <SettingsRow
        label="Enable offline mode"
        description="Access your manga library without an internet connection"
      >
        <Switch
          checked={offlineMode}
          onChange={(checked) => updateSetting('offlineMode', checked)}
        />
      </SettingsRow>

      <SettingsRow
        label="Auto-sync when online"
        description="Automatically sync changes when internet connection is available"
      >
        <Switch
          checked={autoSync}
          onChange={(checked) => updateSetting('autoSync', checked)}
        />
      </SettingsRow>

      <SettingsRow
        label="Sync frequency"
        description="How often should we sync your data"
      >
        <Select
          value={syncFrequency}
          onChange={(value) => updateSetting('syncFrequency', value as typeof syncFrequency)}
          options={SYNC_FREQUENCIES}
        />
      </SettingsRow>

      <SettingsRow
        label="Storage location"
        description="Where to store your manga library data"
      >
        <Select
          value={storageLocation}
          onChange={(value) => updateSetting('storageLocation', value as typeof storageLocation)}
          options={STORAGE_LOCATIONS}
        />
      </SettingsRow>

      <SettingsRow
        label="Storage usage"
        description="Amount of space used by your manga library"
      >
        <div className="text-sm text-gray-300">23.5 MB used</div>
      </SettingsRow>

      <SettingsRow>
        <Button
          variant="danger"
          onClick={() => {
            if (confirm('Are you sure you want to clear all local data? This action cannot be undone.')) {
              // Implement clear data logic
            }
          }}
        >
          Clear local data
        </Button>
      </SettingsRow>
    </div>
  );
}