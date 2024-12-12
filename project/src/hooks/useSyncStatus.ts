import { useState, useEffect, useCallback } from 'react';

interface SyncState {
  isOnline: boolean;
  lastSync: string | null;
  pendingChanges: number;
  isSyncing: boolean;
  error: string | null;
}

export function useSyncStatus() {
  const [state, setState] = useState<SyncState>({
    isOnline: navigator.onLine,
    lastSync: null,
    pendingChanges: 0,
    isSyncing: false,
    error: null,
  });

  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const sync = useCallback(async () => {
    setState(prev => ({ ...prev, isSyncing: true, error: null }));
    try {
      // Simulate sync
      await new Promise(resolve => setTimeout(resolve, 1500));
      setState(prev => ({
        ...prev,
        lastSync: new Date().toISOString(),
        pendingChanges: 0,
        isSyncing: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to sync',
        isSyncing: false,
      }));
    }
  }, []);

  return {
    ...state,
    sync,
  };
}