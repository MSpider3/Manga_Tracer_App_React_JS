import { LayoutGrid, List } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg border-2 border-teal-700 p-1">
      <button
        onClick={() => onChange('grid')}
        className={cn(
          'rounded-md p-2 transition-colors',
          view === 'grid'
            ? 'bg-teal-700 text-white'
            : 'text-gray-400 hover:text-white'
        )}
        title="Grid view"
      >
        <LayoutGrid className="h-5 w-5" />
      </button>
      <button
        onClick={() => onChange('list')}
        className={cn(
          'rounded-md p-2 transition-colors',
          view === 'list'
            ? 'bg-teal-700 text-white'
            : 'text-gray-400 hover:text-white'
        )}
        title="List view"
      >
        <List className="h-5 w-5" />
      </button>
    </div>
  );
}