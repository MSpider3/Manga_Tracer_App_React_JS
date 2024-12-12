interface SettingsRowProps {
  label?: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsRow({ label, description, children }: SettingsRowProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      {(label || description) && (
        <div className="space-y-1">
          {label && (
            <label className="text-sm font-medium text-gray-200">{label}</label>
          )}
          {description && (
            <p className="text-sm text-gray-400">{description}</p>
          )}
        </div>
      )}
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}