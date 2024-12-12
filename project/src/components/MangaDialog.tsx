import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X } from 'lucide-react';
import type { Manga, MangaType, MangaStatus } from '../types';
import { useMangaStore } from '../store';

const types: MangaType[] = ['Manga', 'Manhwa', 'Manhua'];
const statuses: MangaStatus[] = ['Reading', 'Completed', 'On-Break', 'Dropped'];

interface Props {
  isOpen: boolean;
  manga?: Omit<Manga, 'id'>;
  onClose: () => void;
  onSave: (manga: Omit<Manga, 'id'>) => void;
}

export function MangaDialog({ isOpen, manga, onClose, onSave }: Props) {
  const [error, setError] = useState('');
  const { hasDuplicate } = useMangaStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const type = formData.get('type') as MangaType;
    const status = formData.get('status') as MangaStatus;
    const chapter = parseFloat(formData.get('chapter') as string);

    if (!type || !status) {
      setError('Please select both Type and Status');
      return;
    }
    
    if (hasDuplicate(name, type, manga?.id)) {
      setError(`A ${type} with the name "${name}" already exists`);
      return;
    }

    setError('');
    onSave({
      name,
      chapter,
      type,
      status,
    });
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog 
        onClose={() => {
          setError('');
          onClose();
        }} 
        className="relative z-50"
      >
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

        <div className="fixed inset-0 flex items-center justify-center p-4">
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
                  {manga ? 'Edit Manga' : 'Add New Manga'}
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border-2 border-red-500/50 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={manga?.name}
                    className="block w-full rounded-lg bg-teal-800 border-2 border-teal-700 text-white py-2.5 shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-400/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Chapter
                  </label>
                  <input
                    type="number"
                    name="chapter"
                    required
                    step="0.1"
                    min="0"
                    defaultValue={manga?.chapter}
                    className="block w-full rounded-lg bg-teal-800 border-2 border-teal-700 text-white py-2.5 shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-400/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Type
                  </label>
                  <select
                    name="type"
                    required
                    defaultValue={manga?.type ?? ''}
                    className="block w-full rounded-lg bg-teal-800 border-2 border-teal-700 text-white py-2.5 shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-400/20"
                  >
                    <option value="" disabled>Select Type</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    required
                    defaultValue={manga?.status ?? ''}
                    className="block w-full rounded-lg bg-teal-800 border-2 border-teal-700 text-white py-2.5 shadow-sm focus:border-amber-400 focus:ring focus:ring-amber-400/20"
                  >
                    <option value="" disabled>Select Status</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-lg border-2 border-amber-400 bg-amber-400 px-5 py-2.5 text-sm font-medium text-teal-900 hover:bg-amber-500 hover:border-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}