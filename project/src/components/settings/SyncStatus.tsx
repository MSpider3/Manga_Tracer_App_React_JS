import { useSyncStatus } from '../../hooks/useSyncStatus';
import { Button } from '../ui/Button';
import { SettingsRow } from './SettingsRow';

export function SyncStatus() {
  const { isOnline, lastSync, pendingChanges, isSyncing, sync } = useSyncStatus();

  const formattedLastSync = lastSync 
    ? new Date(lastSync).toLocaleString()
    : 'Never';

  return (
    <div className="space-y-6">
      <SettingsRow
        label="Connection status"
        description="Current connection state"
      >
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              isOnline ? 'bg-green-400' : 'bg-red-400'
            }`}
          />
          <span className="text-sm text-gray-300">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </SettingsRow>

      <SettingsRow
        label="Last synced"
        description="When your data was last synchronized"
      >
        <div className="text-sm text-gray-300">{formattedLastSync}</div>
      </SettingsRow>

      <SettingsRow
        label="Pending changes"
        description="Number of changes waiting to be synced"
      >
        <div className="text-sm text-gray-300">
          {pendingChanges} {pendingChanges === 1 ? 'change' : 'changes'}
        </div>
      </SettingsRow>

      <SettingsRow>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={sync}
            disabled={!isOnline || isSyncing}
          >
            {isSyncing ? 'Syncing...' : 'Force sync now'}
          </Button>
          <Button variant="outline">
            View sync history
          </Button>
        </div>
      </SettingsRow>
    </div>
  );
}