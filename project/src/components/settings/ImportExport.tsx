import { Switch } from '../ui/Switch';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { SettingsRow } from './SettingsRow';

const EXPORT_SCHEDULES = [
  { value: 'off', label: 'Off' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export function ImportExport() {
  return (
    <div className="space-y-6">
      <SettingsRow>
        <div className="flex flex-wrap gap-3">
          <Button>Export as Excel</Button>
          <Button>Export as .mt file</Button>
          <Button>Import from .mt file</Button>
        </div>
      </SettingsRow>

      <SettingsRow
        label="Auto-export schedule"
        description="Automatically export your data on a schedule"
      >
        <Select options={EXPORT_SCHEDULES} />
      </SettingsRow>

      <SettingsRow
        label="Export location"
        description="Where to save exported files"
      >
        <div className="flex items-center gap-3">
          <Switch />
          <span className="text-sm text-gray-300">Save to Google Drive</span>
        </div>
      </SettingsRow>
    </div>
  );
}