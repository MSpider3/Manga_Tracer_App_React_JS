import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-teal-900 transition-all duration-300',
        isExpanded ? 'w-64' : 'w-16'
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-teal-900 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isExpanded ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      <div className="flex h-full flex-col gap-2 p-3">
        <div className="flex h-14 items-center justify-center">
          <span
            className={cn(
              'text-xl font-bold text-amber-400 transition-all duration-300',
              isExpanded ? 'opacity-100' : 'opacity-0'
            )}
          >
            Manga Tracker
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-colors',
                'hover:bg-teal-800 hover:text-white',
                'focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2',
                isActive && 'bg-teal-800 text-white'
              )
            }
          >
            <BookOpen className="h-5 w-5 flex-shrink-0" />
            <span
              className={cn(
                'whitespace-nowrap transition-opacity duration-300',
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              )}
            >
              My Library
            </span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-colors',
                'hover:bg-teal-800 hover:text-white',
                'focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2',
                isActive && 'bg-teal-800 text-white'
              )
            }
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            <span
              className={cn(
                'whitespace-nowrap transition-opacity duration-300',
                isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              )}
            >
              Settings
            </span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}