import { useState, useCallback } from 'react';

interface GoogleDriveState {
  isConnected: boolean;
  lastBackup: string | null;
  availableStorage: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useGoogleDrive() {
  const [state, setState] = useState<GoogleDriveState>({
    isConnected: false,
    lastBackup: null,
    availableStorage: null,
    isLoading: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setState(prev => ({
        ...prev,
        isConnected: true,
        lastBackup: new Date().toISOString(),
        availableStorage: '14.5 GB',
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to connect to Google Drive',
        isLoading: false,
      }));
    }
  }, []);

  const disconnect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setState({
        isConnected: false,
        lastBackup: null,
        availableStorage: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to disconnect from Google Drive',
        isLoading: false,
      }));
    }
  }, []);

  return {
    ...state,
    connect,
    disconnect,
  };
}