import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ActionButtons } from './ActionButtons';

export function Layout() {
  const location = useLocation();
  const isSettingsPage = location.pathname === '/settings';

  return (
    <div className="min-h-screen bg-teal-950">
      <Sidebar />
      <div className="pl-16 lg:pl-64 transition-all duration-300">
        <main className="container mx-auto p-6">
          <Outlet />
        </main>
      </div>
      {!isSettingsPage && <ActionButtons />}
    </div>
  );
}