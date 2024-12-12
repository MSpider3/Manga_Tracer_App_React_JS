import { Plus, Search, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { MangaDialog } from '../MangaDialog';
import { SearchDialog } from '../SearchDialog';
import { useMangaStore } from '../../store';

export function ActionButtons() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const { addManga, activeSearch, resetSearch } = useMangaStore();

  const handleSave = (manga: Parameters<typeof addManga>[0]) => {
    const success = addManga(manga);
    if (success) {
      setIsAddDialogOpen(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-20 flex flex-col gap-4">
        <button
          onClick={() => setIsSearchDialogOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-800 text-amber-400 shadow-lg hover:bg-teal-700 transition-colors"
          title="Search (Ctrl+F)"
        >
          <Search className="h-6 w-6" />
        </button>

        {activeSearch && (
          <button
            onClick={resetSearch}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors"
            title="Reset Search"
          >
            <RotateCcw className="h-6 w-6" />
          </button>
        )}

        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-teal-900 shadow-lg hover:bg-amber-500 transition-colors"
          title="Add Manga (Ctrl+N)"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      <MangaDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleSave}
      />

      <SearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => setIsSearchDialogOpen(false)}
      />
    </>
  );
}