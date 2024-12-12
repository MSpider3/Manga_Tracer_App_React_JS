interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <section className="rounded-lg bg-teal-900 overflow-hidden">
      <div className="border-b border-teal-800 bg-teal-900/50 px-6 py-4">
        <h2 className="text-lg font-medium text-amber-400">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}