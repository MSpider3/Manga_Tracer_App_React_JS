import { SettingsSection } from '../components/settings/SettingsSection';
import { DataManagement } from '../components/settings/DataManagement';
import { GoogleDrive } from '../components/settings/GoogleDrive';
import { ImportExport } from '../components/settings/ImportExport';
import { SyncStatus } from '../components/settings/SyncStatus';
import { Security } from '../components/settings/Security';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-amber-400">Settings</h1>
      </header>
      
      <div className="space-y-6">
        <SettingsSection title="Data Management">
          <DataManagement />
        </SettingsSection>

        <SettingsSection title="Google Drive Integration">
          <GoogleDrive />
        </SettingsSection>

        <SettingsSection title="Import/Export">
          <ImportExport />
        </SettingsSection>

        <SettingsSection title="Sync Status">
          <SyncStatus />
        </SettingsSection>

        <SettingsSection title="Security">
          <Security />
        </SettingsSection>
      </div>
    </div>
  );
}