import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Search, X, XCircle } from 'lucide-react';
import { useMangaStore } from '../store';
import type { MangaFilters } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: Props) {
  const { filters, setFilters, applySearch } = useMangaStore();

  const handleChange = (key: keyof MangaFilters, value: string) => {
    setFilters({ [key]: value });
  };

  const handleSearch = () => {
    if (hasFilters) {
      applySearch();
      onClose();
    }
  };

  const handleClear = () => {
    setFilters({
      search: '',
      type: 'All',
      status: 'All',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const hasFilters = filters.search.trim() || filters.type !== 'All' || filters.status !== 'All';

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-start justify-center p-4 pt-16">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-teal-900 p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-xl font-medium text-amber-400">
                  Search Manga
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleChange('search', e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search manga..."
                    className="block w-full rounded-lg bg-teal-800 border-2 border-teal-700 text-white py-3 px-4 text-lg shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-400/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleChange('type', e.target.value)}
                      className="block w-full rounded-lg bg-teal-800 border-2 border-teal-700 text-white py-2.5 shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-400/20"
                    >
                      <option value="All">All</option>
                      <option value="Manga">Manga</option>
                      <option value="Manhwa">Manhwa</option>
                      <option value="Manhua">Manhua</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                      className="block w-full rounded-lg bg-teal-800 border-2 border-teal-700 text-white py-2.5 shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-400/20"
                    >
                      <option value="All">All</option>
                      <option value="Reading">Reading</option>
                      <option value="Completed">Completed</option>
                      <option value="On-Break">On-Break</option>
                      <option value="Dropped">Dropped</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={handleClear}
                    disabled={!hasFilters}
                    className="inline-flex justify-center items-center gap-2 rounded-lg border-2 border-gray-500 px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-500/10 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </button>
                  <button
                    onClick={handleSearch}
                    disabled={!hasFilters}
                    className="inline-flex justify-center items-center gap-2 rounded-lg border-2 border-amber-400 bg-amber-400 px-5 py-2.5 text-sm font-medium text-teal-900 hover:bg-amber-500 hover:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}