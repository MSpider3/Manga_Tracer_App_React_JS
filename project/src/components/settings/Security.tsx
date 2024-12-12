import { Switch } from '../ui/Switch';
import { Button } from '../ui/Button';
import { SettingsRow } from './SettingsRow';

export function Security() {
  return (
    <div className="space-y-6">
      <SettingsRow
        label="Enable encryption"
        description="Encrypt your data for additional security"
      >
        <Switch />
      </SettingsRow>

      <SettingsRow
        label="Require authentication for export"
        description="Request password before exporting data"
      >
        <Switch />
      </SettingsRow>

      <SettingsRow>
        <div className="flex flex-wrap gap-3">
          <Button>Change encryption key</Button>
          <Button variant="danger">Clear all data and reset</Button>
        </div>
      </SettingsRow>
    </div>
  );
}