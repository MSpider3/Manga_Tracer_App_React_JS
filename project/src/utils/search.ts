import type { Manga, MangaFilters } from '../types';

export function searchManga(manga: Manga, filters: MangaFilters): boolean {
  // If no active search filters, include all manga
  if (
    !filters.search.trim() &&
    filters.type === 'All' &&
    filters.status === 'All'
  ) {
    return true;
  }

  // Check type and status filters
  const matchesType =
    filters.type === 'All' || manga.type === filters.type;
  const matchesStatus =
    filters.status === 'All' || manga.status === filters.status;

  // If search text is empty, only check type and status
  if (!filters.search.trim()) {
    return matchesType && matchesStatus;
  }

  // Split search text into individual terms
  const searchTerms = filters.search.toLowerCase().trim().split(/\s+/);

  // Split manga name into words
  const mangaWords = manga.name.toLowerCase().split(/\s+/);

  // Check if all search terms match at least one word in the manga name
  const matchesSearch = searchTerms.every(searchTerm =>
    // A search term matches if any word in the manga name contains it
    mangaWords.some(word => word.includes(searchTerm))
  );

  return matchesSearch && matchesType && matchesStatus;
}