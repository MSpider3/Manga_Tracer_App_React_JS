import { useSettingsStore } from '../../store/settingsStore';
import { useGoogleDrive } from '../../hooks/useGoogleDrive';
import { Switch } from '../ui/Switch';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { SettingsRow } from './SettingsRow';

const BACKUP_FREQUENCIES = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
] as const;

export function GoogleDrive() {
  const { autoBackup, backupFrequency, updateSetting } = useSettingsStore();
  const { 
    isConnected, 
    lastBackup, 
    availableStorage,
    isLoading,
    connect,
    disconnect
  } = useGoogleDrive();

  const formattedLastBackup = lastBackup 
    ? new Date(lastBackup).toLocaleString()
    : 'Not available';

  return (
    <div className="space-y-6">
      <SettingsRow
        label="Google Drive Account"
        description="Connect your Google Drive account to enable backup"
      >
        <Button
          variant={isConnected ? 'outline' : 'default'}
          onClick={isConnected ? disconnect : connect}
          disabled={isLoading}
        >
          {isLoading 
            ? 'Connecting...' 
            : isConnected 
              ? 'Disconnect Account' 
              : 'Connect Account'
          }
        </Button>
      </SettingsRow>

      <SettingsRow
        label="Auto backup to Drive"
        description="Automatically backup your data to Google Drive"
      >
        <Switch
          checked={autoBackup}
          onChange={(checked) => updateSetting('autoBackup', checked)}
          disabled={!isConnected}
        />
      </SettingsRow>

      <SettingsRow
        label="Backup frequency"
        description="How often should we backup your data"
      >
        <Select
          value={backupFrequency}
          onChange={(value) => updateSetting('backupFrequency', value as typeof backupFrequency)}
          options={BACKUP_FREQUENCIES}
          disabled={!isConnected}
        />
      </SettingsRow>

      <SettingsRow
        label="Last backup"
        description="When your data was last backed up"
      >
        <div className="text-sm text-gray-300">
          {formattedLastBackup}
        </div>
      </SettingsRow>

      <SettingsRow
        label="Available storage"
        description="Remaining Google Drive storage space"
      >
        <div className="text-sm text-gray-300">
          {availableStorage || 'Not available'}
        </div>
      </SettingsRow>

      <SettingsRow>
        <Button disabled={!isConnected}>
          Manage backups
        </Button>
      </SettingsRow>
    </div>
  );
}