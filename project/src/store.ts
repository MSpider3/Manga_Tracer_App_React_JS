import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Manga, MangaFilters } from './types';

interface MangaStore {
  mangas: Manga[];
  filters: MangaFilters;
  activeSearch: MangaFilters | null;
  isFirstVisit: boolean;
  addManga: (manga: Omit<Manga, 'id'>) => boolean;
  updateManga: (id: string, manga: Omit<Manga, 'id'>) => boolean;
  deleteManga: (id: string) => void;
  setFilters: (filters: Partial<MangaFilters>) => void;
  applySearch: () => void;
  resetSearch: () => void;
  setFirstVisit: (value: boolean) => void;
  hasDuplicate: (name: string, type: string, currentId?: string) => boolean;
}

export const useMangaStore = create<MangaStore>()(
  persist(
    (set, get) => ({
      mangas: [],
      filters: {
        search: '',
        type: 'All',
        status: 'All',
      },
      activeSearch: null,
      isFirstVisit: true,
      hasDuplicate: (name: string, type: string, currentId?: string) => {
        return get().mangas.some(
          (manga) =>
            manga.name.toLowerCase() === name.toLowerCase() &&
            manga.type === type &&
            manga.id !== currentId
        );
      },
      addManga: (manga) => {
        if (get().hasDuplicate(manga.name, manga.type)) {
          return false;
        }
        set((state) => ({
          mangas: [...state.mangas, { ...manga, id: crypto.randomUUID() }],
        }));
        return true;
      },
      updateManga: (id, manga) => {
        if (get().hasDuplicate(manga.name, manga.type, id)) {
          return false;
        }
        set((state) => ({
          mangas: state.mangas.map((m) =>
            m.id === id ? { ...manga, id } : m
          ),
        }));
        return true;
      },
      deleteManga: (id) =>
        set((state) => ({
          mangas: state.mangas.filter((m) => m.id !== id),
        })),
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
      applySearch: () =>
        set((state) => ({
          activeSearch: { ...state.filters },
        })),
      resetSearch: () =>
        set(() => ({
          activeSearch: null,
          filters: {
            search: '',
            type: 'All',
            status: 'All',
          },
        })),
      setFirstVisit: (value) =>
        set(() => ({
          isFirstVisit: value,
        })),
    }),
    {
      name: 'manga-storage',
    }
  )
);