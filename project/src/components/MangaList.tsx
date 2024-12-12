import { Edit2, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useMangaStore } from '../store';
import type { Manga } from '../types';
import { MangaDialog } from './MangaDialog';
import { DeleteDialog } from './DeleteDialog';
import { useState } from 'react';
import { searchManga } from '../utils/search';

export function MangaList() {
  const { mangas, activeSearch, updateManga, deleteManga } = useMangaStore();
  const [editManga, setEditManga] = useState<Manga | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Manga | null>(null);

  const filteredAndSortedMangas = useMemo(() => {
    return mangas
      .filter((manga) => {
        if (!activeSearch) return true;
        return searchManga(manga, activeSearch);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [mangas, activeSearch]);

  const mangasByLetter = useMemo(() => {
    const groups: Record<string, Manga[]> = {};
    filteredAndSortedMangas.forEach((manga) => {
      const firstLetter = manga.name[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(manga);
    });
    return groups;
  }, [filteredAndSortedMangas]);

  const handleEdit = (manga: Manga) => {
    setEditManga(manga);
  };

  const handleDelete = (manga: Manga) => {
    setDeleteTarget(manga);
  };

  const handleUpdate = (updatedManga: Omit<Manga, 'id'>) => {
    if (editManga) {
      updateManga(editManga.id, updatedManga);
      setEditManga(null);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteManga(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  if (filteredAndSortedMangas.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No manga found matching your criteria
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activeSearch && (
        <div className="bg-teal-800/50 p-4 rounded-lg text-gray-200 space-y-1">
          <div>Search for: <span className="text-amber-400">{activeSearch.search}</span></div>
          {activeSearch.type !== 'All' && (
            <div>Type: <span className="text-amber-400">{activeSearch.type}</span></div>
          )}
          {activeSearch.status !== 'All' && (
            <div>Status: <span className="text-amber-400">{activeSearch.status}</span></div>
          )}
        </div>
      )}

      {Object.entries(mangasByLetter).map(([letter, mangas]) => (
        <div key={letter}>
          <h2 className="text-2xl font-bold text-amber-400 mb-3">{letter}</h2>
          <div className="bg-teal-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-teal-900/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-24">
                      Chapter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-24">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-28">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider w-24">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-700">
                  {mangas.map((manga) => (
                    <tr key={manga.id} className="hover:bg-teal-700/30">
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        <div className="break-words pr-4">{manga.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {manga.chapter.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {manga.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            manga.status
                          )}`}
                        >
                          {manga.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleEdit(manga)}
                            className="text-amber-400 hover:text-amber-300"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(manga)}
                            className="text-red-400 hover:text-red-300"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}

      <MangaDialog
        isOpen={!!editManga}
        manga={editManga ?? undefined}
        onClose={() => setEditManga(null)}
        onSave={handleUpdate}
      />

      <DeleteDialog
        isOpen={!!deleteTarget}
        mangaName={deleteTarget?.name ?? ''}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

function getStatusColor(status: Manga['status']) {
  switch (status) {
    case 'Reading':
      return 'bg-green-100 text-green-800';
    case 'Completed':
      return 'bg-blue-100 text-blue-800';
    case 'On-Break':
      return 'bg-yellow-100 text-yellow-800';
    case 'Dropped':
      return 'bg-red-100 text-red-800';
  }
}