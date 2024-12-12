import { Edit2, Trash2 } from 'lucide-react';
import type { Manga } from '../../types';
import { cn } from '../../utils/cn';

interface MangaCardProps {
  manga: Manga;
  view: 'grid' | 'list';
  onEdit: (manga: Manga) => void;
  onDelete: (manga: Manga) => void;
}

export function MangaCard({ manga, view, onEdit, onDelete }: MangaCardProps) {
  const isGrid = view === 'grid';

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg bg-teal-800 transition-all duration-300',
        'hover:bg-teal-700/80 hover:shadow-lg',
        isGrid ? 'p-4' : 'p-4 sm:px-6'
      )}
    >
      <div className={cn(
        'flex items-start gap-4',
        isGrid ? 'flex-col' : 'flex-row'
      )}>
        <div className={cn(
          'relative aspect-[3/4] overflow-hidden rounded-lg bg-teal-900/50',
          isGrid ? 'w-full' : 'w-16 flex-shrink-0'
        )}>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-teal-700">
            {manga.name[0].toUpperCase()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className={cn(
            'flex items-start justify-between gap-4',
            isGrid && 'flex-col'
          )}>
            <div>
              <h3 className="font-medium text-white truncate">{manga.name}</h3>
              <p className="mt-1 text-sm text-gray-300">
                Chapter {manga.chapter.toFixed(1)}
              </p>
            </div>

            <div className={cn(
              'flex items-center gap-2',
              isGrid ? 'self-end' : 'flex-shrink-0'
            )}>
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  manga.type === 'Manga' && 'bg-blue-100 text-blue-800',
                  manga.type === 'Manhwa' && 'bg-purple-100 text-purple-800',
                  manga.type === 'Manhua' && 'bg-green-100 text-green-800'
                )}
              >
                {manga.type}
              </span>
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  manga.status === 'Reading' && 'bg-green-100 text-green-800',
                  manga.status === 'Completed' && 'bg-blue-100 text-blue-800',
                  manga.status === 'On-Break' && 'bg-yellow-100 text-yellow-800',
                  manga.status === 'Dropped' && 'bg-red-100 text-red-800'
                )}
              >
                {manga.status}
              </span>
            </div>
          </div>

          <div className={cn(
            'absolute right-4 flex -translate-y-1/2 gap-2 opacity-0 transition-all duration-200',
            'group-hover:translate-y-0 group-hover:opacity-100',
            isGrid ? 'top-4' : 'top-1/2'
          )}>
            <button
              onClick={() => onEdit(manga)}
              className="rounded-full bg-amber-400 p-2 text-teal-900 shadow-lg hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
              title="Edit"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(manga)}
              className="rounded-full bg-red-500 p-2 text-white shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}