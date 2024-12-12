import { useMemo } from 'react';
import type { Manga } from '../../types';
import { MangaCard } from './MangaCard';
import { searchManga } from '../../utils/search';

interface MangaGridProps {
  mangas: Manga[];
  view: 'grid' | 'list';
  activeSearch: {
    search: string;
    type: string;
    status: string;
  } | null;
  onEdit: (manga: Manga) => void;
  onDelete: (manga: Manga) => void;
}

export function MangaGrid({ mangas, view, activeSearch, onEdit, onDelete }: MangaGridProps) {
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

  if (filteredAndSortedMangas.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No manga found matching your criteria
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(mangasByLetter).map(([letter, mangas]) => (
        <div key={letter} className="animate-fade-in">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">{letter}</h2>
          <div className={view === 'grid' 
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'space-y-4'
          }>
            {mangas.map((manga) => (
              <MangaCard
                key={manga.id}
                manga={manga}
                view={view}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}