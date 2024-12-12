import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  mangaName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteDialog({ isOpen, mangaName, onClose, onConfirm }: Props) {
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
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-teal-900 p-6 shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <Dialog.Title className="text-lg font-medium text-amber-400">
                    Delete Manga
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-gray-300">
                    Are you sure you want to delete "{mangaName}"? This action
                    cannot be undone.
                  </p>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={onConfirm}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}