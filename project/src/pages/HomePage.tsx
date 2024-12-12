import { useState } from 'react';
import { MangaGrid } from '../components/library/MangaGrid';
import { ViewToggle } from '../components/library/ViewToggle';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { useMangaStore } from '../store';

export function HomePage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { mangas, activeSearch, setEditManga, setDeleteTarget } = useMangaStore();

  return (
    <>
      <WelcomeScreen />
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-amber-400">My Library</h1>
          <ViewToggle view={view} onChange={setView} />
        </header>

        {activeSearch && (
          <div className="animate-fade-in rounded-lg bg-teal-800/50 p-4 text-gray-200 space-y-1">
            <div>Search for: <span className="text-amber-400">{activeSearch.search}</span></div>
            {activeSearch.type !== 'All' && (
              <div>Type: <span className="text-amber-400">{activeSearch.type}</span></div>
            )}
            {activeSearch.status !== 'All' && (
              <div>Status: <span className="text-amber-400">{activeSearch.status}</span></div>
            )}
          </div>
        )}

        <MangaGrid
          mangas={mangas}
          view={view}
          activeSearch={activeSearch}
          onEdit={setEditManga}
          onDelete={setDeleteTarget}
        />
      </div>
    </>
  );
}