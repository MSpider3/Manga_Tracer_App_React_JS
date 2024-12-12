export type MangaType = 'Manga' | 'Manhwa' | 'Manhua';
export type MangaStatus = 'Reading' | 'Completed' | 'On-Break' | 'Dropped';

export interface Manga {
  id: string;
  name: string;
  chapter: number;
  type: MangaType;
  status: MangaStatus;
}

export interface MangaFilters {
  search: string;
  type: MangaType | 'All';
  status: MangaStatus | 'All';
}